import { Module } from '@nestjs/common'

import { RegisterParticipantUseCase } from '@/domain/application/use-cases/register-participant'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [ReadableByteStreamController],
  providers: [RegisterParticipantUseCase],
})
export class HttpModule {}
