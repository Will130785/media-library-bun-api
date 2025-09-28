import Fastify from 'fastify'
import { fastifyApp } from './app'

export const fastify = Fastify({
  logger: true,
})

fastifyApp(fastify)
