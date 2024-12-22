import { Injectable } from '@nestjs/common'

import { ParticipantsRepository } from '@/domain/application/repositories/participants-repository'
import { Participant } from '@/domain/enterprise/entities/participant'
import { PrismaParticipantMapper } from '@/infra/database/prisma/mappers/prisma-participant-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaParticipantsRepository implements ParticipantsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Participant | null> {
    const participant = await this.prisma.participant.findUnique({
      where: {
        email,
      },
    })

    if (!participant) {
      return null
    }

    return PrismaParticipantMapper.toDomain(participant)
  }

  async create(participant: Participant): Promise<void> {
    const data = PrismaParticipantMapper.toPrisma(participant)

    await this.prisma.participant.create({
      data,
    })
  }
}
