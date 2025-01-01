import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Register (E2E)', () => {

  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@email.com',
        password: '123456'
      })

      expect(response.statusCode).toEqual(201)
  })
})