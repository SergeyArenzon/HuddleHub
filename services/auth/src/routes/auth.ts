import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { loginResponseSchema } from '../schemas/auth';
import { getUserPublisher } from '../queues/user.producer';


// Auth routes
const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post( '/', { schema: loginResponseSchema },  
        async (request: FastifyRequest<{ Body: { token: string } }>, reply: FastifyReply) => {
        const googleUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${request.body.token}`;
        const res = await fetch(googleUrl);
        if (!res.ok) return reply.code(400).send({ error: 'Invalid token or error fetching user info from Google' });
        const googleUser = await res.json();
        try {
          const user = await getUserPublisher(googleUser);
          const token = fastify.jwt.sign(user);
          if (user) {
            reply.setCookie('token', token)
            return reply.code(200).send({user, token});
          } 
          throw new Error('User not found');
        } catch (error) {
            console.log({error});
            reply.code(500).send(error);
        }
      });
};

export default authRoutes;
