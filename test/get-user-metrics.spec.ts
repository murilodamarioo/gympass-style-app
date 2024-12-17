import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics'
import { InMemoryCheckInsRepository } from './repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

beforeEach(async () => {
  checkInsRepository = new InMemoryCheckInsRepository()
  sut = new GetUserMetricsUseCase(checkInsRepository)
})

describe('Get user metrics use case', () => {

  it('should be able to get check-in count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
  
    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01'
    })

    expect(checkInsCount).toEqual(2)
  })
})