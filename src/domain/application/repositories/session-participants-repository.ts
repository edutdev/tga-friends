import { Participant } from '@/domain/enterprise/entities/participant'
import { SessionParticipant } from '@/domain/enterprise/entities/session-participant'

export abstract class SessionParticipantsRepository {
  abstract findBySessionAndParticipant(
    sessionId: string,
    participantId: string,
  ): Promise<Participant | null>

  abstract create(sessionParticipant: SessionParticipant): Promise<void>
}
