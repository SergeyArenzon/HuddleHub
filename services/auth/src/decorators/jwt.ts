import { FastifyPluginAsync } from 'fastify';
import { FastifyRequest } from 'fastify';

const verifyJwt: FastifyPluginAsync = async (fastify) => {
  // Ensure the method is available on the Fastify instance
  fastify.decorate('authenticate', async (request: FastifyRequest) => {
    try {
      const token = request.headers['authorization']?.split(' ')[1];
      if (!token) throw new Error('No token provided');
      
      // Use the Fastify JWT plugin to verify the token
      const decoded = await fastify.jwt.verify(token);
      console.log({decoded});
      
      request.user = decoded; // Attach user info to the request
    } catch (err) {
    //   throw fastify.unauthorized('Invalid token');
    }
  });
};

export default verifyJwt;