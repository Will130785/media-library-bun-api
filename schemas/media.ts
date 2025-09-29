export const mediaSchema = {
  body: {
    type: 'object',
    required: ['title', 'mediatype', 'releasedate', 'barcode'],
    properties: {
      title: { type: 'string' },
      mediatype: { type: 'string' },
      releasedate: { type: 'string' },
      barcode: { type: 'string' },
      imageurl: { type: 'string' },
      notes: { type: 'string' },
    },
  },
}
