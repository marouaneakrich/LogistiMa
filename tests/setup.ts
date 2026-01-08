import 'dotenv/config';
import { sequelize } from '../src/config/database';
import { redisClient } from '../src/config/redis';

beforeAll(async () => {
  console.log('🔄 Synchronizing database...');
  await sequelize.sync({ force: true });
  console.log('✅ Database synchronized');
}, 30000);

afterAll(async () => {
  await sequelize.close();
  await redisClient.quit();
});