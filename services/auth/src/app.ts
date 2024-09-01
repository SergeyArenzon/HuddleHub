import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import FastifyFormbody from '@fastify/formbody';
import { loginSchema } from './schemas';
import client, { Channel, Connection } from 'amqplib';

const {ADDRESS, PORT, JWT_SECRE, RABBITMQ_URL} = process.env;

const fastify = Fastify({logger: true});

fastify.register(FastifyFormbody);
fastify.addSchema(loginSchema);

fastify.get("/healthcheck", async (request, reply) => {
  reply.send({status: 'ok'});
})

const connectToRabbit = async (): Promise<Channel | undefined> => {
  try {
    if (!RABBITMQ_URL) {
      console.error('RabbitMQ URL is not defined');
      return undefined;
    }
    console.log({RABBITMQ_URL});
    
    const connection: Connection = await client.connect(RABBITMQ_URL);
    const channel: Channel = await connection.createChannel();
    // Channel is ready for use
    return channel;
  } catch (error: unknown) {
    console.error('Error connecting to RabbitMQ', error);
    return undefined;
  }
};

 connectToRabbit();



fastify.get("/rabbit", async (request, reply) => {
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





