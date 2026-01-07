import { sequelize } from '../src/config/database';
import { redisClient } from '../src/config/redis';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
  await redisClient.quit();
});