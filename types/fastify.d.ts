import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    token?: string
    user?: Record<string, any> | undefined
    jwt?: string
    userId?: string
  }
}
