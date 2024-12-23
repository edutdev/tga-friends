import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { CreateSessionUseCase } from '@/domain/application/use-cases/create-session'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CacheRepository } from '@/infra/cache/cache-repository'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createSessionBodySchema = z.object({
  name: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createSessionBodySchema)

type CreateSessionBodySchema = z.infer<typeof createSessionBodySchema>

@Controller('/sessions')
export class CreateSessionController {
  constructor(
    private createSession: CreateSessionUseCase,
    private cacheRepository: CacheRepository,
  ) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateSessionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name } = body
    const hostId = user.sub

    const result = await this.createSession.execute({
      name,
      hostId,
    })

    if (result.isLeft()) {
      throw new BadRequestException('Failed to create session.')
    }

    const { session, pin } = result.value

    await this.cacheRepository.set(pin, session.id.toString())

    return {
      sessionId: session.id.toString(),
      pin,
    }
  }
}
