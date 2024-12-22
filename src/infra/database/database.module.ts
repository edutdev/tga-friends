import { Module } from '@nestjs/common'

import { ParticipantsRepository } from '@/domain/application/repositories/participants-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaParticipantsRepository } from '@/infra/database/prisma/repositories/prisma-participants-repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: ParticipantsRepository,
      useClass: PrismaParticipantsRepository,
    },
  ],
  exports: [PrismaService, ParticipantsRepository],
})
export class DatabaseModule {}
