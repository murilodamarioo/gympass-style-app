import { InMemoryCheckInsRepository } from './repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from './repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'
import { CheckInUseCase } from '@/use-cases/check-in'
import { randomUUID } from 'crypto'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

beforeEach(() => {
  checkInsRepository = new InMemoryCheckInsRepository()
  gymsRepository = new InMemoryGymsRepository()
  sut = new CheckInUseCase(checkInsRepository, gymsRepository)

  gymsRepository.items.push({
    id: 'gym-01',
    title: 'JavaScript Gym',
    description: '',
    phone: '',
    latitude: new Decimal(0),
    longitude: new Decimal(0)
  })

  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Check-in Use Case', () => {
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: randomUUID(),
      userLatitude: 0,
      userLongitude: 0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 11, 17, 7, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0
    })

    await expect(() => 
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in diferent days', async () => {
    vi.setSystemTime(new Date(2024, 11, 16, 7, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0
    })

    vi.setSystemTime(new Date(2024, 11, 17, 7, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.9434485),
      longitude: new Decimal(-47.0575494)
    })

    await expect(() => 
      sut.execute({
        gymId: 'gym-01',
        userId: randomUUID(),
        userLatitude: -22.9390954,
        userLongitude: -47.0646784
      })
    ).rejects.toBeInstanceOf(Error)
  })
})