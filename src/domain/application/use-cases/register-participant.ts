import { Injectable } from '@nestjs/common'

import { HashGenerator } from '@/domain/application/cryptography/hash-generator'
import { ParticipantsRepository } from '@/domain/application/repositories/participants-repository'
import { ParticipantAlreadyExistsError } from '@/domain/application/use-cases/errors/participant-already-exists-error'
import { Participant } from '@/domain/enterprise/entities/participant'
import { Either, left, right } from '@/shared/either'

interface RegisterParticipantUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterParticipantUseCaseResponse = Either<
  ParticipantAlreadyExistsError,
  {
    participant: Participant
  }
>

@Injectable()
export class RegisterParticipantUseCase {
  constructor(
    private participantsRepository: ParticipantsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterParticipantUseCaseRequest): Promise<RegisterParticipantUseCaseResponse> {
    const participantWithSameEmail =
      await this.participantsRepository.findByEmail(email)

    if (participantWithSameEmail) {
      return left(new ParticipantAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const participant = Participant.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.participantsRepository.create(participant)

    return right({
      participant,
    })
  }
}
