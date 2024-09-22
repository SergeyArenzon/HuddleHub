import Fastify from 'fastify';
import FastifyFormbody from '@fastify/formbody';
import { createConnection } from './queues/connection';
import { loginSchema } from './schemas/auth';
import authRoutes from './routes/auth';
import healthRoutes from './routes/health';
import { Channel } from 'amqplib';
import { config } from './config';
import auth from './plugins/auth';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

const fastify = Fastify({logger: true});

console.log({config});

fastify.register(fastifyJwt, {
  secret: config.jwtSecret,
});

fastify.register(fastifyCookie, {
  secret: "my-secret", // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}  // options for parsing cookies
});

fastify.register(FastifyFormbody);
// fastify.register(auth);
fastify.addSchema(loginSchema);


// Routes
fastify.register(authRoutes, { prefix: '/' });
fastify.register(healthRoutes, { prefix: '/health' });


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



