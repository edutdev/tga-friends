import { Participant as PrismaParticipant, Prisma } from '@prisma/client'

import { Participant } from '@/domain/enterprise/entities/participant'
import { UniqueEntityID } from '@/shared/entities/unique-entity-id'

export class PrismaParticipantMapper {
  static toDomain(raw: PrismaParticipant): Participant {
    return Participant.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    participant: Participant,
  ): Prisma.ParticipantUncheckedCreateInput {
    return {
      id: participant.id.toString(),
      name: participant.name,
      email: participant.email,
      password: participant.password,
    }
  }
}
