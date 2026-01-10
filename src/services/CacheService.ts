import { redisClient } from '../config/redis';

const CACHE_PREFIX = 'logistima:zones';
const DEFAULT_TTL = 86400;

export class CacheService {
  static async getZone(zoneId: number): Promise<any | null> {
    try {
      const key = `${CACHE_PREFIX}:${zoneId}`;
      const cached = await redisClient.get(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  static async setZone(zoneId: number, data: any, ttl = DEFAULT_TTL): Promise<void> {
    try {
      const key = `${CACHE_PREFIX}:${zoneId}`;
      await redisClient.setex(key, ttl, JSON.stringify(data));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  static async invalidateZone(zoneId: number): Promise<void> {
    try {
      const key = `${CACHE_PREFIX}:${zoneId}`;
      await redisClient.del(key);
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }

  static async getOrSetZone(zoneId: number, fetchFn: () => Promise<any>): Promise<any> {
    const cached = await this.getZone(zoneId);
    if (cached) return cached;

    const freshData = await fetchFn();
    await this.setZone(zoneId, freshData);
    return freshData;
  }
}