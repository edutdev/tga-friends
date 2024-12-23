import { Session } from '@/domain/enterprise/entities/session'

export abstract class SessionsRepository {
  abstract findById(id: string): Promise<Session | null>
  abstract create(session: Session): Promise<void>
}
