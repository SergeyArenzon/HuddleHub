import fastify from 'fastify'


const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'kosadol\n'
})

const {ADDRESS, PORT} = process.env;


server.listen({ port: Number(PORT) , host: String(ADDRESS)  }, (err, address) => {
  console.log(`🚀  Fastify server running on ${address}`);

  if (err) {
    console.error(err)
    process.exit(1)
  }
})
