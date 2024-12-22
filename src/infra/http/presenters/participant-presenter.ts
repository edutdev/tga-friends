import { Participant } from '@/domain/enterprise/entities/participant'

export class ParticipantPresenter {
  static toHTTP(participant: Participant) {
    return {
      id: participant.id.toString(),
      name: participant.name,
      email: participant.email,
      createdAt: participant.createdAt,
    }
  }
}
