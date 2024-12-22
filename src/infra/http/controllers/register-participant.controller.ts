import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

import { ParticipantAlreadyExistsError } from '@/domain/application/use-cases/errors/participant-already-exists-error'
import { RegisterParticipantUseCase } from '@/domain/application/use-cases/register-participant'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const registerParticipantBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type RegisterParticipantBodySchema = z.infer<
  typeof registerParticipantBodySchema
>

@Controller('/participants')
@Public()
export class RegisterParticipantController {
  constructor(private registerParticipant: RegisterParticipantUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerParticipantBodySchema))
  async handle(@Body() body: RegisterParticipantBodySchema) {
    const { name, email, password } = body

    const result = await this.registerParticipant.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ParticipantAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
