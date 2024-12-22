import { Participant } from '@/domain/enterprise/entities/participant'

export abstract class ParticipantsRepository {
  abstract findById(id: string): Promise<Participant | null>
  abstract findByEmail(email: string): Promise<Participant | null>
  abstract create(participant: Participant): Promise<void>
}
