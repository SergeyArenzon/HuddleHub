import Fastify from 'fastify';
import FastifyFormbody from '@fastify/formbody';
import { createConnection } from './queues/connection';
import { loginSchema } from './schemas/auth';
import authRoutes from './routes/auth';
import healthRoutes from './routes/health';
import { Channel } from 'amqplib';

const {ADDRESS, PORT, JWT_SECRE } = process.env;

const fastify = Fastify({logger: true});

fastify.register(FastifyFormbody);
fastify.addSchema(loginSchema);

// Routes
fastify.register(authRoutes, { prefix: '/' });
fastify.register(healthRoutes, { prefix: '/health' });

let channel: Channel; 

const startQueues = async () => {
  let connection  =   await createConnection();
  if (connection) channel = connection;
};

fastify.listen({ port: Number(PORT) , host: String(ADDRESS)  }, (error, address) => {
  console.log(`[Auth] service is running on ${address}`);
  startQueues();

  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})

export { channel };



