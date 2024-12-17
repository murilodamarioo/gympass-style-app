import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { InMemoryUsersRepository } from './repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '@/use-cases/register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository()
  sut = new RegisterUseCase(usersRepository)
})

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john.doe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})