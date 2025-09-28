import type { FastifyInstance } from 'fastify'

export const appStart = (fastify: FastifyInstance) => {
  fastify.listen({
    port: 4000,
    host: '0.0.0.0',
  })
}
