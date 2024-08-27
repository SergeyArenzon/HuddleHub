import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import FastifyFormbody from '@fastify/formbody';
import { loginSchema } from './schemas';

const {ADDRESS, PORT, JWT_SECRET} = process.env;

const fastify = Fastify({logger: true});

fastify.register(FastifyFormbody);
fastify.addSchema(loginSchema);

fastify.get("/healthcheck", async (request, reply) => {
  reply.send({status: 'ok'});
})


fastify.post("/login", {
  schema: { 
    body: { $ref: 'loginSchema#' },
    response: {
      201: {
        type: 'object',
        properties: {
          token: { type: 'string' },
          name: { type: 'string' }
        }
      }
    }
  }
}, async (request: FastifyRequest<{Body: {token: string}}>, reply: FastifyReply) => {  

  const google_url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${request.body.token}`
  reply.code(201).send(request.body);
});


fastify.listen({ port: Number(PORT) , host: String(ADDRESS)  }, (error, address) => {
  console.log(`[Auth] service is running on ${address}`);

  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})





