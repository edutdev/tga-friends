import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryParticipantsRepository } from 'test/repositories/in-memory-participants-repository'

import { RegisterParticipantUseCase } from './register-participant'

let inMemoryParticipantsRepository: InMemoryParticipantsRepository
let fakeHasher: FakeHasher

let sut: RegisterParticipantUseCase

describe('Register Participant Use Case', () => {
  beforeEach(() => {
    inMemoryParticipantsRepository = new InMemoryParticipantsRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterParticipantUseCase(
      inMemoryParticipantsRepository,
      fakeHasher,
    )
  })

  it('should be able to register a new participant', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      participant: inMemoryParticipantsRepository.items[0],
    })
  })

  it('should hash participant password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryParticipantsRepository.items[0].password).toEqual(
      hashedPassword,
    )
  })
})
