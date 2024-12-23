import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/unique-entity-id'
import { Optional } from '@/shared/types/optional'

export interface SessionProps {
  hostId: UniqueEntityID
  name: string
  state: 'OPENED' | 'CLOSED' | 'FINISHED'
  createdAt: Date
}

export class Session extends Entity<SessionProps> {
  get hostId() {
    return this.props.hostId
  }

  get name() {
    return this.props.name
  }

  get state() {
    return this.props.state
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<SessionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const session = new Session(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return session
  }
}
