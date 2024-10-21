import Fastify, { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import FastifyFormbody from '@fastify/formbody';
import { createConnection } from './queues/connection';
import { loginSchema } from './schemas/auth';
import authRoutes from './routes/auth';
import healthRoutes from './routes/health';
import { Channel } from 'amqplib';
import { config } from './config';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';

// Initialize Fastify with custom logger
const fastify: FastifyInstance = Fastify({
  logger: {
    level: 'debug',
    formatters: {
      bindings: (bindings) => {
        return { pid: bindings.pid, hostname: bindings.hostname, service: config.name };
      },
    },
    transport: {
      target: 'pino-socket',
      options: {
        mode: "tcp",
        port: 5044,
        address: "logstash"
      }
    }
  }
});


fastify.register(fastifyCookie, {
  secret: "my-secret", // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}  // options for parsing cookies
});

fastify.register(fastifyCors, {
  origin: 'http://localhost:3000', // Allow only localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if needed
  credentials: true, // If you need to include credentials like cookies
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
  return { message: 'This is a protected route', user: req.user };
});

let channel: Channel; 

const startQueues = async () => {
  let connection  = await createConnection();
  if (connection) channel = connection;
};

fastify.listen({ port: config.port , host: config.address  }, (error, address) => {
  fastify.log.debug({message: "[Auth] Server started"});
  startQueues();

  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})
export { channel, fastify };


