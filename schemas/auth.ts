export const registerSchema = {
  body: {
    type: 'object',
    required: ['firstname', 'lastname', 'email', 'password', 'passwordConfirm'],
    properties: {
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      passwordConfirm: { type: 'string' },
    },
  },
}

export const loginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
}
