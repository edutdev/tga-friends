import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/unique-entity-id'
import { Optional } from '@/shared/types/optional'

export interface SessionParticipantProps {
  sessionId: UniqueEntityID
  participantId: UniqueEntityID
  createdAt: Date
}

export class SessionParticipant extends Entity<SessionParticipantProps> {
  get sessionId() {
    return this.props.sessionId
  }

  get participantId() {
    return this.props.participantId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<SessionParticipantProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const sessionParticipant = new SessionParticipant(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return sessionParticipant
  }
}
