import 'dotenv/config';
import { Redis, RedisOptions } from 'ioredis';

const baseConfig: RedisOptions = {
  maxRetriesPerRequest: null,
  retryStrategy: (times: number) => Math.min(times * 50, 2000)
};

export const redisConnection = baseConfig;

export const redisClient = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL, baseConfig)
  : new Redis(baseConfig);

redisClient.on('connect', () => {
  console.log('✅ Redis client connected');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis client error:', err);
});