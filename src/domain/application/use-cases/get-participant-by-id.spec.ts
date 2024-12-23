import { makeParticipant } from 'test/factories/make-participant'
import { InMemoryParticipantsRepository } from 'test/repositories/in-memory-participants-repository'

import { GetParticipantByIdUseCase } from '@/domain/application/use-cases/get-participant-by-id'
import { ResourceNotFoundError } from '@/shared/errors/errors/resource-not-found-error'

let inMemoryParticipantsRepository: InMemoryParticipantsRepository
let sut: GetParticipantByIdUseCase

describe('Get Participant By ID Use Case', () => {
  beforeEach(() => {
    inMemoryParticipantsRepository = new InMemoryParticipantsRepository()
    sut = new GetParticipantByIdUseCase(inMemoryParticipantsRepository)
  })

  it('should be able to get a participant by ID', async () => {
    const existingParticipant = makeParticipant()
    await inMemoryParticipantsRepository.create(existingParticipant)

    const result = await sut.execute({
      participantId: existingParticipant.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      participant: existingParticipant,
    })
  })

  it('should return an error if participant is not found', async () => {
    const result = await sut.execute({ participantId: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
