import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
} from '@nestjs/common'

import { GetParticipantByIdUseCase } from '@/domain/application/use-cases/get-participant-by-id'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ResourceNotFoundError } from '@/shared/errors/errors/resource-not-found-error'

import { ParticipantPresenter } from '../presenters/participant-presenter'

@Controller('/me')
export class GetParticipantByIdController {
  constructor(private getParticipantById: GetParticipantByIdUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() user: UserPayload) {
    const participantId = user.sub

    const result = await this.getParticipantById.execute({
      participantId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      participant: ParticipantPresenter.toHTTP(result.value.participant),
    }
  }
}
