import type { FastifyReply, FastifyRequest } from 'fastify'

export const tokenVerified = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // If this route is hit the token is valid
  return reply.status(200).send({ success: true })
}
