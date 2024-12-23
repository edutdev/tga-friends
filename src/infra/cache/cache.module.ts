import { Module } from '@nestjs/common'

import { CacheRepository } from '@/infra/cache/cache-repository'
import { RedisService } from '@/infra/cache/redis/redis.service'
import { RedisCacheRepository } from '@/infra/cache/redis/redis-cache-repository'
import { EnvModule } from '@/infra/env/env.module'

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
