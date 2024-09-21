import Fastify from 'fastify';
import FastifyFormbody from '@fastify/formbody';
import { createConnection } from './queues/connection';
import { loginSchema } from './schemas/auth';
import authRoutes from './routes/auth';
import healthRoutes from './routes/health';
import { Channel } from 'amqplib';
import { config } from './config';
import fastifyJwt from '@fastify/jwt';
import auth from './plugins/auth';

const fastify = Fastify({logger: true});

fastify.register(fastifyJwt, {
  secret: config.jwtSecret
});
fastify.register(FastifyFormbody);
// fastify.register(auth);
fastify.addSchema(loginSchema);


// Routes
fastify.register(authRoutes, { prefix: '/' });
fastify.register(healthRoutes, { prefix: '/health' });

// Register a custom method
fastify.decorate('signJwt', (user: any) => {
  return fastify.jwt.sign(user, { expiresIn: '1h' });
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



