import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

import { AuthenticateParticipantUseCase } from '@/domain/application/use-cases/authenticate-participant'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const authenticateParticipantBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateParticipantBodySchema = z.infer<
  typeof authenticateParticipantBodySchema
>

@Controller('/authenticate')
@Public()
export class AuthenticateParticipantController {
  constructor(
    private authenticateParticipant: AuthenticateParticipantUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateParticipantBodySchema))
  async handle(@Body() body: AuthenticateParticipantBodySchema) {
    const { email, password } = body

    const result = await this.authenticateParticipant.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
