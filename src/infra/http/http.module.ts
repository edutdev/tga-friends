import { Module } from '@nestjs/common'

import { AuthenticateParticipantUseCase } from '@/domain/application/use-cases/authenticate-participant'
import { RegisterParticipantUseCase } from '@/domain/application/use-cases/register-participant'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AuthenticateParticipantController } from '@/infra/http/controllers/authenticate-participant.controller'
import { RegisterParticipantController } from '@/infra/http/controllers/register-participant.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    RegisterParticipantController,
    AuthenticateParticipantController,
  ],
  providers: [RegisterParticipantUseCase, AuthenticateParticipantUseCase],
})
export class HttpModule {}
