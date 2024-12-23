import { UseCaseError } from '@/shared/errors/use-case-error'

export class ParticipantAlreadyInSessionError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`Participant "${identifier}" already in session.`)
  }
}
