export const loginSchema = {
  $id: 'loginSchema',
  type: 'object',
  properties: {
    token: { type: 'string' },
  },
  required: ['token'],
};