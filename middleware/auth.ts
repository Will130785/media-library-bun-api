import type { FastifyRequest, FastifyReply } from 'fastify'
import { verifyJWT } from '../utils'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL ?? '')

export const getTokenFromHeaders = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers.authorization?.split(' ')[1]
  if (!token) {
    return reply.status(403).send({ success: false, message: 'No token' })
  }

  request.token = token
}

export const verifyToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.token
  if (!token) {
    console.log('NO TOKEN')
    return reply.status(403).send({ success: false })
  }
  const isTokenValid = await verifyJWT(token)
  console.log(isTokenValid)
  if (!isTokenValid) {
    console.log('TOKEN INVALID')
    return reply.status(403).send({ success: false })
  }
  request.userId = isTokenValid.payload.userId as string
}

export const verifyUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  console.log(request.userId, 'USERID')
  if (!request.userId) {
    return reply.status(403).send({ success: false })
  }
  const id = parseInt(request.userId)
  console.log(id, '***')
  try {
    const user = await sql`SELECT * FROM users WHERE id = ${id}`
    if (!user || !user.length) {
      return reply.status(403).send({ success: false })
    }
  } catch (err) {
    console.log(`Error checking user ${err}`)
    return reply.status(500).send({ success: false })
  }
}
