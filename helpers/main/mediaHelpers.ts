import type { IMediaPayloadData } from '../../types/media'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL ?? '')

const addMediaItemSQLQuery = async (
  mediaData: IMediaPayloadData,
  userId: string
) => {
  switch (mediaData.type) {
    case 'cd':
      return await sql`INSERT INTO music (title, artist, type, release_date, label, barcode, cover_art_url, user_id) VALUES (${mediaData.title}, ${mediaData.artist}, ${mediaData.type}, ${mediaData.release_date}, ${mediaData.label}, ${mediaData.barcode}, ${mediaData.cover_art_url}, ${userId})`
    case 'vinyl':
      return await sql`INSERT INTO music (title, artist, type, release_date, label, barcode, cover_art_url, user_id) VALUES (${mediaData.title}, ${mediaData.artist}, ${mediaData.type}, ${mediaData.release_date}, ${mediaData.label}, ${mediaData.barcode}, ${mediaData.cover_art_url}, ${userId})`
    case 'bluray':
      return await sql`INSERT INTO film (title, director, type, release_date, studio, barcode, cover_art_url, user_id) VALUES (${mediaData.title}, ${mediaData.director}, ${mediaData.type}, ${mediaData.release_date}, ${mediaData.studio}, ${mediaData.barcode}, ${mediaData.cover_art_url}, ${userId})`
    case 'dvd':
      return await sql`INSERT INTO film (title, director, type, release_date, studio, barcode, cover_art_url, user_id) VALUES (${mediaData.title}, ${mediaData.director}, ${mediaData.type}, ${mediaData.release_date}, ${mediaData.studio}, ${mediaData.barcode}, ${mediaData.cover_art_url}, ${userId})`
    default:
      return null
  }
}

const editMediaItemSQLQuery = async (
  mediaData: IMediaPayloadData,
  id: string,
  userId: string
) => {
  switch (mediaData.type) {
    case 'cd':
      return await sql`UPDATE music SET title = ${mediaData.title}, artist = ${mediaData.artist}, type = ${mediaData.type}, release_date = ${mediaData.release_date}, label = ${mediaData.label}, barcode = ${mediaData.barcode}, cover_art_url = ${mediaData.cover_art_url}, user_id = ${userId} WHERE id = ${id}`
    case 'vinyl':
      return await sql`UPDATE music SET title = ${mediaData.title}, artist = ${mediaData.artist}, type = ${mediaData.type}, release_date = ${mediaData.release_date}, label = ${mediaData.label}, barcode = ${mediaData.barcode}, cover_art_url = ${mediaData.cover_art_url}, user_id = ${userId} WHERE id = ${id} `
    case 'bluray':
      return await sql`UPDATE film SET title = ${mediaData.title}, director = ${mediaData.director}, type = ${mediaData.type}, release_date = ${mediaData.release_date}, studio = ${mediaData.studio}, barcode = ${mediaData.barcode}, cover_art_url = ${mediaData.cover_art_url}, user_id = ${userId} WHERE id = ${id} `
    case 'dvd':
      return await sql`UPDATE film SET title = ${mediaData.title}, director = ${mediaData.director}, type = ${mediaData.type}, release_date = ${mediaData.release_date}, studio = ${mediaData.studio}, barcode = ${mediaData.barcode}, cover_art_url = ${mediaData.cover_art_url}, user_id = ${userId} WHERE id = ${id} `
    default:
      return null
  }
}

const getAllMediaItemsSQLQuery = async (type: string, userId: string) => {
  switch (type) {
    case 'cd':
      return await sql`SELECT * FROM music WHERE user_id = ${userId} AND type = ${type}`
    case 'vinyl':
      return await sql`SELECT * FROM music WHERE user_id = ${userId} AND type = ${type}`
    case 'bluray':
      return await sql`SELECT * FROM film WHERE user_id = ${userId} AND type = ${type}`
    case 'dvd':
      return await sql`SELECT * FROM film WHERE user_id = ${userId} AND type = ${type}`
    default:
      return null
  }
}

const getMediaItemSQLQuery = async (type: string, id: string) => {
  switch (type) {
    case 'cd':
      return await sql`SELECT * FROM music WHERE id = ${id}`
    case 'vinyl':
      return await sql`SELECT * FROM music WHERE id = ${id}}`
    case 'bluray':
      return await sql`SELECT * FROM film WHERE id = ${id}`
    case 'dvd':
      return await sql`SELECT * FROM film WHERE id = ${id}`
    default:
      return null
  }
}

const deleteMediaItemSQLQuery = async (type: string, id: string) => {
  switch (type) {
    case 'cd':
      return await sql`DELETE FROM music WHERE id = ${id}`
    case 'vinyl':
      return await sql`DELETE FROM music WHERE id = ${id}}`
    case 'bluray':
      return await sql`DELETE FROM film WHERE id = ${id}`
    case 'dvd':
      return await sql`DELETE FROM film WHERE id = ${id}`
    default:
      return null
  }
}

export default {
  addMediaItemSQLQuery,
  getAllMediaItemsSQLQuery,
  getMediaItemSQLQuery,
  editMediaItemSQLQuery,
  deleteMediaItemSQLQuery,
}
