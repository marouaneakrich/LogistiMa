import "dotenv/config";
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(



    {
        database: process.env.DATABASE_URL,
       
        dialect: "postgres",
        logging: console.log,
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connecté avec succès !");

        console.log("Début de la synchronisation...");

        try {
            await sequelize.sync({ alter: true });
            console.log("✅Tables synchronisées avec succès !");
        } catch (syncError) {
            console.error("❌Erreur lors de la synchronisation :", syncError);
        }

    } catch (error) {
        console.error("❌Erreur connexion DB :", error);
    }
}

export default sequelize;
export { connectDB };
