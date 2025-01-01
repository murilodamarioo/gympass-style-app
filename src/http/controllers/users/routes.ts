import { authenticate } from './authenticate'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { register } from './register'
import { profile } from './profile'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', {onRequest: [verifyJwt] }, profile)
}