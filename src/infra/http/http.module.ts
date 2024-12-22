import { Module } from '@nestjs/common'

import { AuthenticateParticipantUseCase } from '@/domain/application/use-cases/authenticate-participant'
// import { CreateSessionUseCase } from '@/domain/application/use-cases/create-session'
import { GetParticipantByIdUseCase } from '@/domain/application/use-cases/get-participant-by-id'
import { RegisterParticipantUseCase } from '@/domain/application/use-cases/register-participant'
import { CacheModule } from '@/infra/cache/cache.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AuthenticateParticipantController } from '@/infra/http/controllers/authenticate-participant.controller'
// import { CreateSessionController } from '@/infra/http/controllers/create-session.controller'
import { GetParticipantByIdController } from '@/infra/http/controllers/get-participant-by-id.controller'
import { RegisterParticipantController } from '@/infra/http/controllers/register-participant.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, CacheModule],
  controllers: [
    RegisterParticipantController,
    AuthenticateParticipantController,
    GetParticipantByIdController,
    // CreateSessionController,
  ],
  providers: [
    RegisterParticipantUseCase,
    AuthenticateParticipantUseCase,
    GetParticipantByIdUseCase,
    // CreateSessionUseCase,
  ],
})
export class HttpModule {}
