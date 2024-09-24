import { FastifyPluginAsync } from 'fastify';

// Register routes
const healthRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get("/", async (request, reply) => {
        reply.send({status: 'ok'});
      })
};

export default healthRoutes;
