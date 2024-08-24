import Fastify from 'fastify';


const {ADDRESS, PORT} = process.env;

const server = Fastify({
  logger: true
});


server.listen({ port: Number(PORT) , host: String(ADDRESS)  }, (error, address) => {
  console.log(`🚀 [Event Rating] service is running on ${address}`);

  if (error) {
    server.log.error(error);
    process.exit(1);
  }
})


