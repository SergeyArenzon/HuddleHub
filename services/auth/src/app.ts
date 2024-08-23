import Fastify, { FastifyReply, FastifyRequest } from 'fastify';

// import userRoutes from './routes';
// import { userSchemas } from "./schema";

const {ADDRESS, PORT} = process.env;

const server = Fastify({
  logger: true
});


// for (const schema of userSchemas) {
//   server.addSchema(schema)
// }


// server.register(userRoutes);



server.listen({ port: Number(PORT) , host: String(ADDRESS)  }, (error, address) => {
  console.log(`[Auth] service is running on ${address}`);

  if (error) {
    server.log.error(error);
    process.exit(1);
  }
})
