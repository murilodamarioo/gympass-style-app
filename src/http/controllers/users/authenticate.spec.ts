import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Authenticate (E2E)', () => {

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
        name: 'John Doe',
        email: 'john.doe@email.com',
        password: '123456'
      })

    const response = await request(app.server).post('/sessions').send({
        email: 'john.doe@email.com',
        password: '123456'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})