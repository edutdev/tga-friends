import { ParticipantsRepository } from '@/domain/application/repositories/participants-repository'
import { Participant } from '@/domain/enterprise/entities/participant'

export class InMemoryParticipantsRepository implements ParticipantsRepository {
  public items: Participant[] = []

  async findById(id: string) {
    const participant = this.items.find((item) => item.id.toString() === id)

    if (!participant) {
      return null
    }

    return participant
  }

  async findByEmail(email: string) {
    const participant = this.items.find((item) => item.email === email)

    if (!participant) {
      return null
    }

    return participant
  }

  async create(participant: Participant) {
    this.items.push(participant)
  }
}
