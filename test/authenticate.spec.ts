import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InMemoryUsersRepository } from './repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository()
  sut = new AuthenticateUseCase(usersRepository)
})

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'john.doe@email.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() => 
      sut.execute({
        email: 'john.doe@email.com',
        password: 'CORRECT_PASSWORD'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => 
      sut.execute({
        email: 'john.doe@email.com',
        password: 'WRONG_PASSWORD'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)    
  })
})