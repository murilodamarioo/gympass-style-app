import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from './repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from '@/use-cases/search-gyms'
import { title } from 'process'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

beforeEach(async () => {
  gymsRepository = new InMemoryGymsRepository()
  sut = new SearchGymsUseCase(gymsRepository)
})

describe('Search gyms use case', () => {

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.9390954,
      longitude: -47.0646784
    })
  
    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -22.9390954,
      longitude: -47.0646784
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ])
  })

  it('should be able to fecth paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.9390954,
        longitude: -47.0646784
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' })
    ])
  })
})