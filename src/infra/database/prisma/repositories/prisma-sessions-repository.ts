import { Injectable } from '@nestjs/common'

import { SessionsRepository } from '@/domain/application/repositories/sessions-repository'
import { Session } from '@/domain/enterprise/entities/session'
import { PrismaSessionMapper } from '@/infra/database/prisma/mappers/prisma-session-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaSessionsRepository implements SessionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Session | null> {
    const session = await this.prisma.session.findUnique({
      where: {
        id,
      },
    })

    if (!session) {
      return null
    }

    return PrismaSessionMapper.toDomain(session)
  }

  async create(session: Session): Promise<void> {
    const data = PrismaSessionMapper.toPrisma(session)

    await this.prisma.session.create({
      data,
    })
  }
}
