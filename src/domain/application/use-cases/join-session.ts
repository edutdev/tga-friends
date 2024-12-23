import { Injectable } from '@nestjs/common'

import { SessionsRepository } from '@/domain/application/repositories/sessions-repository'
import { ParticipantAlreadyInSessionError } from '@/domain/application/use-cases/errors/participant-already-in-session-error'
import { SessionParticipant } from '@/domain/enterprise/entities/session-participant'
import { Either, left, right } from '@/shared/either'
import { UniqueEntityID } from '@/shared/entities/unique-entity-id'
import { NotAllowedError } from '@/shared/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/shared/errors/errors/resource-not-found-error'

import { SessionParticipantsRepository } from '../repositories/session-participants-repository'

interface JoinSessionUseCaseRequest {
  sessionId: string
  participantId: string
}

type JoinSessionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError | ParticipantAlreadyInSessionError,
  {
    sessionParticipant: SessionParticipant
  }
>

@Injectable()
export class JoinSessionUseCase {
  constructor(
    private sessionsRepository: SessionsRepository,
    private sessionParticipantsRepository: SessionParticipantsRepository,
  ) {}

  async execute({
    sessionId,
    participantId,
  }: JoinSessionUseCaseRequest): Promise<JoinSessionUseCaseResponse> {
    const session = await this.sessionsRepository.findById(sessionId)

    if (!session) {
      return left(new ResourceNotFoundError())
    }

    if (session.state !== 'OPENED') {
      return left(new NotAllowedError())
    }

    const participantExists =
      await this.sessionParticipantsRepository.findBySessionAndParticipant(
        sessionId,
        participantId,
      )

    if (participantExists) {
      return left(new ParticipantAlreadyInSessionError(participantId))
    }

    const sessionParticipant = SessionParticipant.create({
      sessionId: new UniqueEntityID(sessionId),
      participantId: new UniqueEntityID(participantId),
    })

    await this.sessionParticipantsRepository.create(sessionParticipant)

    return right({
      sessionParticipant,
    })
  }
}
