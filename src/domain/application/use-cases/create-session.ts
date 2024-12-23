import { Injectable } from '@nestjs/common'

import { SessionsRepository } from '@/domain/application/repositories/sessions-repository'
import { Session } from '@/domain/enterprise/entities/session'
import { Either, right } from '@/shared/either'
import { UniqueEntityID } from '@/shared/entities/unique-entity-id'

interface CreateSessionUseCaseRequest {
  hostId: string
  name: string
}

type CreateSessionUseCaseResponse = Either<
  null,
  {
    session: Session
    pin: string
  }
>

@Injectable()
export class CreateSessionUseCase {
  constructor(private sessionsRepository: SessionsRepository) {}

  async execute({
    hostId,
    name,
  }: CreateSessionUseCaseRequest): Promise<CreateSessionUseCaseResponse> {
    const session = Session.create({
      hostId: new UniqueEntityID(hostId),
      name,
      state: 'OPENED',
    })

    const pin = Math.floor(100000 + Math.random() * 900000).toString()

    await this.sessionsRepository.create(session)

    return right({
      session,
      pin,
    })
  }
}
