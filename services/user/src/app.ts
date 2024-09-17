import Fastify from 'fastify';
// import registerRoutes from './routes';
import { Channel } from 'amqplib';
import { createConnection } from './queues/connection';
import { consumeAuthMessage } from './queues/auth.consumer';

const {ADDRESS, PORT} = process.env;

const fastify = Fastify({logger: true});

// fastify.register(registerRout, { prefix: '/register'});

fastify.post("/", async (request, reply) => {
  console.log({request});
});



fastify.get("/health", async (request, reply) => {
  reply.send({status: 'ok'});
});



const startQueues = async () => {
  const userChannel = await createConnection() as Channel;
  await consumeAuthMessage(userChannel);
}

fastify.listen({ port: Number(PORT) , host: String(ADDRESS)  }, async(error, address) => {
  console.log(`🚀 [User] service is running on ${address}`);
  await startQueues();

  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})


