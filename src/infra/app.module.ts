import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '@/infra/auth/auth.module'
import { envSchema } from '@/infra/env/env'
import { EnvModule } from '@/infra/env/env.module'
import { HttpModule } from '@/infra/http/http.module'

import { WebSocketModule } from './websocket/websocket.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
    WebSocketModule,
  ],
})
export class AppModule {}
