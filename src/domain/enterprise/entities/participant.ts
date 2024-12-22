import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/unique-entity-id'
import { Optional } from '@/shared/types/optional'

export interface ParticipantProps {
  name: string
  email: string
  password: string
  createdAt: Date
}

export class Participant extends Entity<ParticipantProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<ParticipantProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const participant = new Participant(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return participant
  }
}
