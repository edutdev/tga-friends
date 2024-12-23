import { Injectable } from '@nestjs/common'

import { SessionParticipantsRepository } from '@/domain/application/repositories/session-participants-repository'
import { Participant } from '@/domain/enterprise/entities/participant'
import { SessionParticipant } from '@/domain/enterprise/entities/session-participant'
import { PrismaParticipantMapper } from '@/infra/database/prisma/mappers/prisma-participant-mapper'
import { PrismaSessionParticipantMapper } from '@/infra/database/prisma/mappers/prisma-session-participant-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaSessionParticipantsRepository
  implements SessionParticipantsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findBySessionAndParticipant(
    sessionId: string,
    participantId: string,
  ): Promise<Participant | null> {
    const sessionParticipant = await this.prisma.sessionParticipant.findUnique({
      where: {
        sessionId_participantId: {
          sessionId,
          participantId,
        },
      },
      include: {
        participant: true,
      },
    })

    if (!sessionParticipant) {
      return null
    }

    return PrismaParticipantMapper.toDomain(sessionParticipant.participant)
  }

  async create(sessionParticipant: SessionParticipant): Promise<void> {
    const data = PrismaSessionParticipantMapper.toPrisma(sessionParticipant)

    await this.prisma.sessionParticipant.create({
      data,
    })
  }
}
