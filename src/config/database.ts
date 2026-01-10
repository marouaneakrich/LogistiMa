import "dotenv/config";
import { Sequelize } from 'sequelize';

const isTest = process.env.NODE_ENV === 'test';
const databaseUrl = process.env.DATABASE_URL;

const sequelize = databaseUrl
    ? new Sequelize(databaseUrl, {
        dialect: "postgres",
        logging: isTest ? false : console.log,
        dialectOptions: !isTest ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {}
    })
    : new Sequelize({
        database: 'logistima',
        dialect: "postgres",
        logging: console.log,
    });

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connected successfully!");

        console.log("Starting table synchronization...");

        try {
            await sequelize.sync({ alter: true });
            console.log("✅Tables synchronized successfully!");
        } catch (syncError) {
            console.error("❌Error during synchronization :", syncError);
        }

    } catch (error) {
        console.error("❌Error DB connection :", error);
    }
}

export { sequelize, connectDB };
export default sequelize;
