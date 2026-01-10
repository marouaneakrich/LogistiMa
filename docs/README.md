# LogistiMa 🚚

> High-performance urban logistics infrastructure for Morocco

LogistiMa is a scalable microservices-based logistics management system built with Node.js, TypeScript, and modern cloud technologies. It provides robust delivery tracking, driver dispatch, and real-time package management capabilities.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)

## 🌟 Features

- **Real-time Delivery Tracking**: Monitor package status and location updates in real-time
- **Intelligent Dispatch System**: Automated driver assignment based on zone optimization
- **Queue Management**: Background job processing with BullMQ for async operations
- **Caching Layer**: Redis-powered caching for high-performance data retrieval
- **RESTful API**: Well-structured Express.js API with validation and rate limiting
- **Zone-based Routing**: Efficient delivery management across urban zones
- **Scalable Architecture**: Separate API and worker processes for horizontal scaling
- **Production-ready**: Dockerized deployment with health checks and monitoring

## 🏗️ Architecture

LogistiMa follows a microservices architecture with the following components:

- **API Server**: Handles HTTP requests, validates input, and manages business logic
- **Worker Process**: Processes background jobs for deliveries, notifications, and dispatching
- **PostgreSQL**: Primary database for persistent data storage
- **Redis**: Message queue and caching layer
- **BullMQ**: Reliable job queue for async task processing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.x
- **npm** >= 9.x
- **PostgreSQL** >= 15.x
- **Redis** >= 7.x
- **Docker** & **Docker Compose** (optional, for containerized deployment)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/marouaneakrich/LogistiMa.git
cd LogistiMa
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Configure the following environment variables:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://logistima:password@localhost:5432/logistima
REDIS_URL=redis://:password@localhost:6379
QUEUE_NAME=deliveries
```

### 4. Database Setup

Ensure PostgreSQL is running and create the database:

```bash
psql -U postgres
CREATE DATABASE logistima;
```

The application will automatically sync database models on startup.

### 5. Start Redis

```bash
# Using Docker
docker run -d -p 6379:6379 redis:7-alpine redis-server --requirepass password

# Or if Redis is installed locally
redis-server
```

### 6. Run the Application

#### Development Mode

Run both API and worker processes concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - API Server
npm run dev:api

# Terminal 2 - Worker Process
npm run dev:worker
```

#### Production Mode

Build and start the application:

```bash
npm run build
npm start
```

The API server will be available at `http://localhost:3000`

## 🐳 Docker Deployment

### Using Docker Compose

The easiest way to deploy LogistiMa with all dependencies:

```bash
# Start all services
npm run docker:up

# Stop all services
npm run docker:down
```

This will start:
- API server on port 3000
- Worker process
- PostgreSQL database
- Redis server

### Building Docker Image Manually

```bash
docker build -t logistima:latest .
docker run -p 3000:3000 --env-file .env logistima:latest
```

## 🧪 Testing

LogistiMa includes comprehensive unit and integration tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run stress tests
npm run test:stress
```

## 📚 API Documentation

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-01-08T14:00:00.000Z"
}
```

### Delivery Endpoints

#### Create Delivery

```http
POST /api/deliveries
Content-Type: application/json

{
  "parcelId": "123",
  "zoneId": "zone-1",
  "pickupAddress": "123 Main St, Casablanca",
  "deliveryAddress": "456 Oak Ave, Rabat"
}
```

#### Get Package Status

```http
GET /api/deliveries/:parcelId/status
```

#### Update Delivery

```http
PUT /api/deliveries/:deliveryId
Content-Type: application/json

{
  "status": "delivered",
  "notes": "Package delivered successfully"
}
```

For complete API documentation, see the Postman collection in `/docs/postman/`.

## 🗂️ Project Structure

```
logistima/
├── src/
│   ├── app.ts              # Express application setup
│   ├── server.ts           # API server entry point
│   ├── worker.ts           # Background worker entry point
│   ├── config/             # Configuration files
│   │   ├── database.ts     # Sequelize configuration
│   │   └── redis.ts        # Redis and BullMQ setup
│   ├── controllers/        # Request handlers
│   │   └── DeliveryController.ts
│   ├── models/             # Database models
│   │   ├── Delivery.ts
│   │   ├── Driver.ts
│   │   ├── Parcel.ts
│   │   ├── Zone.ts
│   │   └── index.ts
│   ├── routes/             # API routes
│   │   └── delivery.routes.ts
│   ├── services/           # Business logic
│   │   ├── CacheService.ts
│   │   ├── DispatcherService.ts
│   │   └── QueueService.ts
│   └── types/              # TypeScript type definitions
├── tests/
│   ├── unit/               # Unit tests
│   └── integration/        # Integration tests
├── docs/                   # Documentation
├── scripts/                # Utility scripts
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose setup
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe development

### Database & Caching
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for database operations
- **Redis** - Caching and message broker

### Queue Management
- **BullMQ** - Distributed job queue

### Security & Middleware
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting
- **Zod** - Schema validation

### DevOps
- **Docker** - Containerization
- **Jest** - Testing framework
- **Supertest** - API testing
- **Nodemon** - Development hot-reload

## 🔒 Security

LogistiMa implements multiple security layers:

- **Helmet.js**: Sets secure HTTP headers
- **Rate Limiting**: Prevents API abuse (100 requests per minute)
- **Input Validation**: Zod schema validation for all inputs
- **CORS Configuration**: Restricted origins for production
- **Environment Variables**: Sensitive data stored in `.env`

## 📊 Performance

- **Caching**: Redis caching reduces database load
- **Queue Processing**: Background jobs prevent API blocking
- **Connection Pooling**: Optimized database connections
- **Horizontal Scaling**: Separate API and worker processes

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📮 Postman Collection

[📥 Download Postman Collection](./docs/LogistiMa.postman_collection.json)

## 📘 API Docs

[🌐 View Presentation](https://logistima.up.railway.app/)

## UML Diagram

![LogistiMa UML Diagram](./docs/uml/diagram.png)

[📥 Download UML Diagram](./docs/uml/diagram.png)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**LogistiMa Team**

- GitHub: [@MarouaneAkrich](https://github.com/marouaneakrich) & [@HananRagban](https://github.com/reghanan06-hue)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for Moroccan logistics**
