import { Injectable } from '@nestjs/common'

import { ParticipantsRepository } from '@/domain/application/repositories/participants-repository'
import { Participant } from '@/domain/enterprise/entities/participant'
import { Either, left, right } from '@/shared/either'
import { ResourceNotFoundError } from '@/shared/errors/errors/resource-not-found-error'

interface GetParticipantByIdUseCaseRequest {
  participantId: string
}

type GetParticipantByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    participant: Participant
  }
>

@Injectable()
export class GetParticipantByIdUseCase {
  constructor(private participantsRepository: ParticipantsRepository) {}

  async execute({
    participantId,
  }: GetParticipantByIdUseCaseRequest): Promise<GetParticipantByIdUseCaseResponse> {
    const participant =
      await this.participantsRepository.findById(participantId)

    if (!participant) {
      return left(new ResourceNotFoundError())
    }

    return right({
      participant,
    })
  }
}
