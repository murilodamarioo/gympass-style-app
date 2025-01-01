import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const createGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { query, page } = createGymQuerySchema.parse(request.body)

  const searchGymsuseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsuseCase.execute({ query, page })

  return reply.status(200).send({ gyms })
}