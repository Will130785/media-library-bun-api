import type { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { router } from '../routes'

export const appSetup = (fastify: FastifyInstance) => {
  fastify.register(cors, {
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
  fastify.register(router)
}
