export const mediaSchema = {
  body: {
    type: 'object',
    required: ['title', 'type', 'release_date', 'barcode'],
    properties: {
      title: { type: 'string' },
      type: { type: 'string' },
      artist: { type: 'string' },
      director: { type: 'string' },
      label: { type: 'string' },
      studio: { type: 'string' },
      release_date: { type: 'string' },
      barcode: { type: 'string' },
      cover_art_url: { type: 'string' },
    },
  },
}
