import { SessionParticipant as PrismaSessionParticipant } from '@prisma/client'

import { SessionParticipant } from '@/domain/enterprise/entities/session-participant'
import { UniqueEntityID } from '@/shared/entities/unique-entity-id'

export class PrismaSessionParticipantMapper {
  static toDomain(raw: PrismaSessionParticipant): SessionParticipant {
    return SessionParticipant.create(
      {
        sessionId: new UniqueEntityID(raw.sessionId),
        participantId: new UniqueEntityID(raw.participantId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    sessionParticipant: SessionParticipant,
  ): PrismaSessionParticipant {
    return {
      id: sessionParticipant.id.toString(),
      sessionId: sessionParticipant.sessionId.toString(),
      participantId: sessionParticipant.participantId.toString(),
      createdAt: sessionParticipant.createdAt,
    }
  }
}
