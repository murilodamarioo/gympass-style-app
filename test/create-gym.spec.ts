import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from './repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '@/use-cases/create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

beforeEach(() => {
  gymsRepository = new InMemoryGymsRepository()
  sut = new CreateGymUseCase(gymsRepository)
})

describe('Create Gym Use Case', () => {
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.9390954,
      longitude: -47.0646784
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})