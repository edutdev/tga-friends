import { Session as PrismaSession } from '@prisma/client'

import { Session } from '@/domain/enterprise/entities/session'
import { UniqueEntityID } from '@/shared/entities/unique-entity-id'

export class PrismaSessionMapper {
  static toDomain(raw: PrismaSession): Session {
    return Session.create(
      {
        hostId: new UniqueEntityID(raw.hostId),
        name: raw.name,
        state: raw.state as 'OPENED' | 'CLOSED' | 'FINISHED',
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(session: Session): PrismaSession {
    return {
      id: session.id.toString(),
      hostId: session.hostId.toString(),
      name: session.name,
      state: session.state,
      createdAt: session.createdAt,
    }
  }
}
