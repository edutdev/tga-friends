import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { ParticipantAlreadyInSessionError } from '@/domain/application/use-cases/errors/participant-already-in-session-error'
import { JoinSessionUseCase } from '@/domain/application/use-cases/join-session'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CacheRepository } from '@/infra/cache/cache-repository'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { NotAllowedError } from '@/shared/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/shared/errors/errors/resource-not-found-error'
import { joining } from '@/utils/session-pub-sub'

const joinSessionBodySchema = z.object({
  pin: z.string().length(6),
})

const bodyValidationPipe = new ZodValidationPipe(joinSessionBodySchema)

type JoinSessionBodySchema = z.infer<typeof joinSessionBodySchema>

@Controller('/join-session')
export class JoinSessionController {
  constructor(
    private joinSessionUseCase: JoinSessionUseCase,
    private cacheRepository: CacheRepository,
  ) {}

  @Post()
  @HttpCode(200)
  async execute(
    @Body(bodyValidationPipe) body: JoinSessionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { pin } = body
    const participantId = user.sub

    const sessionId = await this.cacheRepository.get(pin)

    if (!sessionId) {
      throw new NotFoundException()
    }

    const result = await this.joinSessionUseCase.execute({
      sessionId,
      participantId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException()
        case NotAllowedError:
          throw new ConflictException()
        case ParticipantAlreadyInSessionError:
          throw new ConflictException()
        default:
          throw new BadRequestException()
      }
    }

    joining.publish(sessionId, {
      sessionId,
      participantId,
    })
  }
}
