import { faker } from '@faker-js/faker'

import {
  Participant,
  ParticipantProps,
} from '@/domain/enterprise/entities/participant'
import { UniqueEntityID } from '@/shared/entities/unique-entity-id'

export function makeParticipant(
  override: Partial<ParticipantProps> = {},
  id?: UniqueEntityID,
) {
  const participant = Participant.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return participant
}
