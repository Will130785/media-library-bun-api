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
import { mediaSchema } from '../schemas/media'
import { tokenVerified } from '../controllers/auth/validation'
import {
  getMediaItem,
  getAllMediaItems,
  addMediaItem,
  editMediaItem,
  deleteMediaItem,
} from '../controllers/main/media'

export const mediaRouter = (fastify: FastifyInstance) => {
  fastify.get(
    '/get-media-item/:id',
    {
      preHandler: [getTokenFromHeaders, verifyToken, verifyUser],
    },
    getMediaItem
  )
  fastify.get(
    '/get-all-media-items/:mediaType',
    {
      preHandler: [getTokenFromHeaders, verifyToken, verifyUser],
    },
    getAllMediaItems
  )
  fastify.post(
    '/add-media-item',
    {
      preHandler: [getTokenFromHeaders, verifyToken, verifyUser],
      schema: mediaSchema,
    },
    addMediaItem
  )
  fastify.put(
    '/edit-media-item/:id',
    {
      preHandler: [getTokenFromHeaders, verifyToken, verifyUser],
      schema: mediaSchema,
    },
    editMediaItem
  )
  fastify.delete(
    '/delete-media-item/:id',
    {
      preHandler: [getTokenFromHeaders, verifyToken, verifyUser],
    },
    deleteMediaItem
  )
}
