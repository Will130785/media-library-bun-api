import type { FastifyInstance } from 'fastify'
import { authRouter } from './auth'

export const router = (fastify: FastifyInstance) => {
  authRouter(fastify)
}
