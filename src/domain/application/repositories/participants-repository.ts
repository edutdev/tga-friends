import { Participant } from '@/domain/enterprise/entities/participant'

export abstract class ParticipantsRepository {
  abstract findByEmail(email: string): Promise<Participant | null>
  abstract create(participant: Participant): Promise<void>
}
