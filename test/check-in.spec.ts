import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from './repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from '@/use-cases/check-in'
import { randomUUID } from 'crypto'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

beforeEach(() => {
  checkInsRepository = new InMemoryCheckInsRepository()
  sut = new CheckInUseCase(checkInsRepository)

  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Check-in Use Case', () => {
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: randomUUID()
    })

    console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 11, 17, 7, 0, 0))

    await sut.execute({
      gymId: randomUUID(),
      userId: 'user-01'
    })

    await expect(() => 
      sut.execute({
        gymId: randomUUID(),
        userId: 'user-01'
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in diferent days', async () => {
    vi.setSystemTime(new Date(2024, 11, 16, 7, 0, 0))

    await sut.execute({
      gymId: randomUUID(),
      userId: 'user-01'
    })

    vi.setSystemTime(new Date(2024, 11, 17, 7, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})