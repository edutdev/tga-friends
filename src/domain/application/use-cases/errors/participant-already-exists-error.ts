import { UseCaseError } from '@/shared/errors/use-case-error'

export class ParticipantAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`Participant "${identifier}" already exists.`)
  }
}
