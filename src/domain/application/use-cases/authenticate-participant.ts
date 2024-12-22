import { Injectable } from '@nestjs/common'

import { Encrypter } from '@/domain/application/cryptography/encrypter'
import { HashComparer } from '@/domain/application/cryptography/hash-comparer'
import { ParticipantsRepository } from '@/domain/application/repositories/participants-repository'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { Either, left, right } from '@/shared/either'

interface AuthenticateParticipantUseCaseRequest {
  email: string
  password: string
}

type AuthenticateParticipantUseCaseReponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateParticipantUseCase {
  constructor(
    private participantsRepository: ParticipantsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateParticipantUseCaseRequest): Promise<AuthenticateParticipantUseCaseReponse> {
    const participant = await this.participantsRepository.findByEmail(email)

    if (!participant) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      participant.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: participant.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
