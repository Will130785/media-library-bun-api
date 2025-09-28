import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ILoginUserData } from '../../types/users'
import { neon } from '@neondatabase/serverless'
import { signJWT } from '../../utils'

const sql = neon(process.env.DATABASE_URL ?? '')

export const checkCorrectLoginDataSupplied = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userLoginData = request.body as unknown as ILoginUserData
  if (!userLoginData || !userLoginData.email || !userLoginData.password) {
    return reply
      .status(400)
      .send({ success: false, message: 'Incorrect data provided' })
  }
}

export const checkUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email } = request.body as unknown as ILoginUserData
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`
    if (!user || !user.length) {
      return reply
        .status(404)
        .send({ success: false, message: 'No user found' })
    }
    request.user = user[0]
  } catch (err) {
    console.log(`Error checking user ${err}`)
    return reply
      .status(500)
      .send({ success: false, message: `Error checking user ${err}` })
  }
}

export const checkPassword = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { password } = request.body as unknown as ILoginUserData
  if (!request.user) {
    return reply.status(400).send({ success: false, message: 'No user' })
  }
  const hashedPassword = request.user.password
  try {
    const passwordCorrect = await Bun.password.verify(password, hashedPassword)
    if (!passwordCorrect) {
      return reply
        .status(403)
        .send({ success: false, message: 'Incorrect password provided' })
    }
  } catch (err) {
    console.log(`Error checking password ${err}`)
    return reply
      .status(500)
      .send({ success: false, message: `Error checking password ${err}` })
  }
  return
}

export const generateJWT = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (!request.user) {
    return reply.status(500).send({ success: false })
  }
  try {
    const JWT = await signJWT(request.user.id as string)
    request.jwt = JWT
  } catch (err) {
    console.log(`Error signing JWT ${err}`)
    return reply
      .status(500)
      .send({ success: false, message: `Error signing JWT ${err}` })
  }
}

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.jwt) {
    return reply.status(400).send({ success: false, message: 'No JWT' })
  }
  const jwt = request.jwt
  if (!jwt) {
    return reply
      .status(500)
      .send({ success: false, message: 'No JWT generated' })
  }
  return reply.status(200).send({ success: true, token: jwt })
}
