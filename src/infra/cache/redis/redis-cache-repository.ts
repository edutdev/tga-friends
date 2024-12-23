import { Injectable } from '@nestjs/common'

import { CacheRepository } from '@/infra/cache/cache-repository'
import { RedisService } from '@/infra/cache/redis/redis.service'

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  constructor(private readonly redis: RedisService) {}

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value)
  }

  async setWithTTL(key: string, value: string, ttl: number): Promise<void> {
    await this.redis.set(key, value, 'EX', ttl)
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key)
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key)
  }
}
