import { FastifySchema } from "fastify";

const loginSchema = {
    $id: 'loginSchema',
    type: 'object',
    properties: {
      token: { type: 'string' },
    },
    required: ['token'],
  };


const loginResponseSchema: FastifySchema = {
    body: { $ref: 'loginSchema#' },
    response: {
      201: {
        type: 'object',
        properties: {
          token: { type: 'string' },
          name: { type: 'string' },
        },
        required: ['token', 'name'],
      },
    },
  }

  export { loginResponseSchema, loginSchema };