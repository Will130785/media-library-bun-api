import type { FastifyReply, FastifyRequest } from 'fastify'
import { neon } from '@neondatabase/serverless'
import type { IRegisterUserData } from '../../types/users'

const sql = neon(process.env.DATABASE_URL ?? '')

export const checkCorrectRegistrationDataSupplied = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userRegistrationData = request.body as unknown as IRegisterUserData
  if (
    !userRegistrationData.firstname ||
    !userRegistrationData.lastname ||
    !userRegistrationData.email ||
    !userRegistrationData.password ||
    !userRegistrationData.passwordConfirm
  ) {
    return reply
      .status(400)
      .send({ success: false, message: 'Incorrect data provided' })
  }
}

export const checkIfUserExists = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email } = request.body as unknown as IRegisterUserData
  try {
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`
    if (existingUser.length) {
      return reply
        .status(400)
        .send({ success: false, message: 'User already exists' })
    }
    console.log(existingUser)
  } catch (err) {
    console.log(err, `Error checking if user exists: ${err}`)
    return reply.status(500).send({
      success: false,
      message: `Error checking if user exists: ${err}`,
    })
  }
}

export const hashPassword = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userData = request.body as unknown as IRegisterUserData
  try {
    userData.password = await Bun.password.hash(userData.password, {
      algorithm: 'bcrypt',
    })
  } catch (err) {
    console.log(err, `Error hashing password: ${err}`)
    return reply.status(500).send({
      success: false,
      message: `Error hashing password: ${err}`,
    })
  }
}

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userRegistrationData = request.body as unknown as IRegisterUserData

  try {
    const insertResult =
      await sql`INSERT INTO users (firstname, lastname, email, password) VALUES (${userRegistrationData.firstname}, ${userRegistrationData.lastname}, ${userRegistrationData.email}, ${userRegistrationData.password})`
    if (!insertResult) {
      return reply.status(400).send({ success: false })
    }
    return reply.status(201).send({ success: true })
  } catch (err) {
    console.log(err)
    return reply.status(500).send({ success: false })
  }
}
