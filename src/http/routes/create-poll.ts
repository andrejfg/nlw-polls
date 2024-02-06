import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import z, { ZodError } from 'zod'

export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async ({ body }, reply) => {
    const createPollBody = z.object({
      title: z.string(),
    })
    try {
      const { title } = createPollBody.parse(body)
      const poll = await prisma.poll.create({ data: { title } })

      reply.status(201).send({
        id: poll.id,
      })
    } catch (e) {
      if (e instanceof ZodError) {
        reply.status(400).send({ error: e.issues })
      }
    }
  })
}
