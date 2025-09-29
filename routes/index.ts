import type { FastifyInstance } from 'fastify'
import { authRouter } from './auth'
import { mediaRouter } from './media'

export const router = (fastify: FastifyInstance) => {
  authRouter(fastify)
  mediaRouter(fastify)
}
