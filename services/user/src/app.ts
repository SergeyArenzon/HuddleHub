import Fastify, { FastifyReply, FastifyRequest } from 'fastify';

import userRoutes from './route';
import { userSchemas } from "./schema";

const {ADDRESS, PORT} = process.env;

const server = Fastify({
  logger: true
});

// server.register(fjwt, {
//   secret: "sdfsdfsdfsdf"
// });
// server.decorate("auth", async(request: FastifyRequest, reply: FastifyReply) => {

// })

for (const schema of userSchemas) {
  server.addSchema(schema)
}


server.register(userRoutes);



server.listen({ port: Number(PORT) , host: String(ADDRESS)  }, (error, address) => {
  console.log(`🚀 [User] service is running on ${address}`);

  if (error) {
    server.log.error(error);
    process.exit(1);
  }
})
