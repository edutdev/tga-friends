import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeParticipant } from 'test/factories/make-participant'
import { InMemoryParticipantsRepository } from 'test/repositories/in-memory-participants-repository'

import { AuthenticateParticipantUseCase } from './authenticate-participant'

let inMemoryParticipantsRepository: InMemoryParticipantsRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateParticipantUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryParticipantsRepository = new InMemoryParticipantsRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    sut = new AuthenticateParticipantUseCase(
      inMemoryParticipantsRepository,
      fakeHasher,
      encrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeParticipant({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryParticipantsRepository.create(student)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
