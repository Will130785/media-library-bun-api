import type { FastifyInstance } from 'fastify'
import {
  checkCorrectLoginDataSupplied,
  checkUser,
  checkPassword,
  generateJWT,
  login,
} from '../controllers/auth/login'
import {
  checkCorrectRegistrationDataSupplied,
  checkIfUserExists,
  hashPassword,
  register,
} from '../controllers/auth/register'
import {
  getTokenFromHeaders,
  verifyToken,
  verifyUser,
} from '../middleware/auth'
import { registerSchema, loginSchema } from '../schemas/auth'
import { tokenVerified } from '../controllers/auth/validation'

export const authRouter = (fastify: FastifyInstance) => {
  fastify.post(
    '/login',
    {
      preHandler: [
        checkCorrectLoginDataSupplied,
        checkUser,
        checkPassword,
        generateJWT,
      ],
      schema: loginSchema,
    },
    login
  )
  fastify.post(
    '/register',
    {
      preHandler: [
        checkCorrectRegistrationDataSupplied,
        checkIfUserExists,
        hashPassword,
      ],
      schema: registerSchema,
    },
    register
  )
  fastify.get(
    '/check-token-is-valid',
    {
      preHandler: [getTokenFromHeaders, verifyToken, verifyUser],
    },
    tokenVerified
  )
}
