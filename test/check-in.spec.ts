import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from './repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from '@/use-cases/checkin'
import { randomUUID } from 'crypto'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

beforeEach(() => {
  checkInsRepository = new InMemoryCheckInsRepository()
  sut = new CheckInUseCase(checkInsRepository)
})

describe('Check-in Use Case', () => {
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: randomUUID()
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})