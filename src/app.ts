import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import deliveryRoutes from './routes/delivery.routes';
import driverRoutes from './routes/DriverRoutes';
import zoneRoutes from './routes/ZoneRoutes';
import { apiReference } from '@scalar/express-api-reference';
import swaggerSpec from './config/docs-api';

const app = express();

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
            imgSrc: ["'self'", "data:", "https://cdn.jsdelivr.net"],
            fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
            connectSrc: ["'self'"]
        }
    }
}));

app.use(cors({
    origin: ['https://logistima.up.railway.app/']
}));
app.use(express.json({ limit: '10mb' }));

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP'
});
app.use('/api/', limiter);

app.use("/api-docs", apiReference({
    spec: {
        content: swaggerSpec,
    },
    theme: 'purple',
    layout: 'modern',
    darkMode: true,
    metaData: {
        title: 'LogistiMa API Documentation',
        description: 'Interactive API documentation for LogistiMa',
    },
    searchHotKey: 'k',
}));

app.use('/api/deliveries', deliveryRoutes);
app.use('/api', driverRoutes);
app.use('/api', zoneRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
});

export default app;