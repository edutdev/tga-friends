import { Module } from '@nestjs/common'

import { ParticipantsRepository } from '@/domain/application/repositories/participants-repository'
import { SessionParticipantsRepository } from '@/domain/application/repositories/session-participants-repository'
import { SessionsRepository } from '@/domain/application/repositories/sessions-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaParticipantsRepository } from '@/infra/database/prisma/repositories/prisma-participants-repository'
import { PrismaSessionParticipantsRepository } from '@/infra/database/prisma/repositories/prisma-session-participants-repository'
import { PrismaSessionsRepository } from '@/infra/database/prisma/repositories/prisma-sessions-repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: ParticipantsRepository,
      useClass: PrismaParticipantsRepository,
    },
    {
      provide: SessionsRepository,
      useClass: PrismaSessionsRepository,
    },
    {
      provide: SessionParticipantsRepository,
      useClass: PrismaSessionParticipantsRepository,
    },
  ],
  exports: [
    PrismaService,
    ParticipantsRepository,
    SessionsRepository,
    SessionParticipantsRepository,
  ],
})
export class DatabaseModule {}
