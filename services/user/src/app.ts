import Fastify from 'fastify';
// import registerRoutes from './routes';



const {ADDRESS, PORT} = process.env;

const fastify = Fastify({logger: true});

// fastify.register(registerRout, { prefix: '/register'});

fastify.post("/", async (request, reply) => {
  console.log({request});
});



fastify.get("/healthcheck", async (request, reply) => {
  reply.send({status: 'ok'});
});


fastify.listen({ port: Number(PORT) , host: String(ADDRESS)  }, (error, address) => {
  console.log(`🚀 [User] service is running on ${address}`);

  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})


