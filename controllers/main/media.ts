import type { FastifyReply, FastifyRequest } from 'fastify'
import { neon } from '@neondatabase/serverless'
import type { IMediaPayloadData } from '../../types/media'

const sql = neon(process.env.DATABASE_URL ?? '')

export const getMediaItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as unknown as { id: string }
  try {
    const mediaItem = await sql`SELECT * FROM media WHERE id = ${parseInt(id)}`
    return reply.status(200).send({ success: true, mediaItem: mediaItem[0] })
  } catch (err) {
    console.log(`Error getting media item id ${id} - ${err}`)
    return reply.status(500).send({
      success: false,
      message: `Error getting media item id ${id} - ${err}`,
    })
  }
}

export const getAllMediaItems = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.userId
  try {
    const mediaItems = await sql`SELECT * FROM media WHERE userid = ${userId}`
    console.log(mediaItems)
    return reply.status(200).send({ success: true, mediaItems })
  } catch (err) {
    console.log(`Error getting all media items for user ${userId} - ${err}`)
    return reply.status(500).send({
      success: false,
      message: `Error getting all media items for user ${userId} - ${err}`,
    })
  }
}

export const addMediaItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const mediaItem = request.body as IMediaPayloadData
  const userId = request.userId
  try {
    await sql`INSERT INTO media (title, mediatype, releasedate, barcode, imageurl, notes, userid) VALUES (${mediaItem.title}, ${mediaItem.mediatype}, ${mediaItem.releasedate}, ${mediaItem.barcode}, ${mediaItem.imageurl}, ${mediaItem.notes}, ${userId})`
    return reply.status(201).send({ success: true })
  } catch (err) {
    console.log(`Error adding media item for user ${userId} - ${err}`)
    return reply.status(500).send({
      success: false,
      message: `Error adding media item for user ${userId} - ${err}`,
    })
  }
}

export const editMediaItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as unknown as { id: string }
  const mediaItem = request.body as IMediaPayloadData
  try {
    await sql`UPDATE media SET title = ${mediaItem.title}, mediatype = ${mediaItem.mediatype}, releasedate = ${mediaItem.releasedate}, barcode = ${mediaItem.barcode}, imageurl = ${mediaItem.imageurl}, notes = ${mediaItem.notes} WHERE id = ${id}`
    return reply.status(200).send({ success: true })
  } catch (err) {
    console.log(`Error editing media item id ${id} - ${err}`)
    return reply.status(500).send({
      success: true,
      message: `Error editing media item id ${id} - ${err}`,
    })
  }
}

export const deleteMediaItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as unknown as { id: string }
  try {
    await sql`DELETE FROM media WHERE id = ${id}`
    return reply.status(200).send({ success: true })
  } catch (err) {
    console.log(`Error deleting item id ${id} - ${err}`)
    return reply.status(500).send({
      success: false,
      message: `Error deleting item id ${id} - ${err}`,
    })
  }
}
