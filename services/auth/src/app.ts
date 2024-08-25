import Fastify from 'fastify';

const {ADDRESS, PORT, JWT_SECRET} = process.env;

const fastify = Fastify({logger: true});


fastify.get("/healthcheck", async (request, reply) => {
  reply.send({status: 'ok'});
});
fastify.post("/", async (request, reply) => {
  console.log({request});
});

fastify.listen({ port: Number(PORT) , host: String(ADDRESS)  }, (error, address) => {
  console.log(`[Auth] service is running on ${address}`);

  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})





