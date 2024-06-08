import fastify from 'fastify'


const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})
server.get('/', async (request, reply) => {
  return 'wow\n'
})

const {ADDRESS, PORT} = process.env;


server.listen({ port: Number(PORT) , host: String(ADDRESS)  }, (err, address) => {
  console.log(`🚀 [Auth] service is running on ${address}`);

  if (err) {
    console.error(err)
    process.exit(1)
  }
})
