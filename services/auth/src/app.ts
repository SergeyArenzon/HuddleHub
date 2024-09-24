import Fastify, { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import FastifyFormbody from '@fastify/formbody';
import { createConnection } from './queues/connection';
import { loginSchema } from './schemas/auth';
import authRoutes from './routes/auth';
import healthRoutes from './routes/health';
import { Channel } from 'amqplib';
import { config } from './config';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

const fastify: FastifyInstance = Fastify({logger: true});


fastify.register(fastifyJwt, {
  secret: config.jwtSecret,
});

fastify.register(fastifyCookie, {
  secret: "my-secret", // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}  // options for parsing cookies
});


fastify.register(FastifyFormbody);
fastify.addSchema(loginSchema);


// Routes
fastify.register(authRoutes, { prefix: '/' });
fastify.register(healthRoutes, { prefix: '/health' });

// Middleware to verify token
fastify.decorate('verifyToken', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
      await request.jwtVerify();
  } catch (err) {
      return reply.send(err);
  }
});

fastify.get('/protected',{ preHandler: [fastify.verifyToken] }, async (req: FastifyRequest, reply: FastifyReply) => {
  // If token is verified, you can access req.user
  return { message: 'This is a protected route', user: req.user };
});

let channel: Channel; 

const startQueues = async () => {
  let connection  = await createConnection();
  if (connection) channel = connection;
};


fastify.listen({ port: config.port , host: config.address  }, (error, address) => {
  console.log(`[Auth] service is running on ${address}`);
  startQueues();
  
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})

export { channel };



