export interface IMediaPayloadData {
  title: string
  artist: string
  director: string
  type: 'cd' | 'vinyl' | 'bluray' | 'dvd'
  release_date: string
  label: string
  studio: string
  barcode: string
  cover_art_url: string
}
