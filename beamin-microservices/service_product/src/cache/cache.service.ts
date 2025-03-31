import { Injectable } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';

@Injectable()
export class CacheService {
  private readonly redisClient: RedisClient;

  constructor() {
    this.redisClient = new Redis(process.env.REDIS_URI || 'redis://localhost:6379'); // Fallback URI
  }

  async setProductCache(key: string, value: any, ttlInSeconds: number): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttlInSeconds);
  }

  async getProductCache(key: string): Promise<any | null> {
    const cachedData = await this.redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }
}