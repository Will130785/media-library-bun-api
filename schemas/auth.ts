export const registerSchema = {
  body: {
    type: 'object',
    required: [
      'first_name',
      'last_name',
      'email',
      'password',
      'password_confirm',
    ],
    properties: {
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      password_confirm: { type: 'string' },
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
