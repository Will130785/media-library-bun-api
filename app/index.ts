import type { FastifyInstance } from 'fastify'
import { appSetup } from './appSetup'
import { appStart } from './appStart'

export const fastifyApp = (fastify: FastifyInstance) => {
  appSetup(fastify)
  appStart(fastify)
}
