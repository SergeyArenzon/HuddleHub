import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserPublisher } from '../queues/user.producer';

export const loginController = async (request: FastifyRequest<{ Body: { token: string } }>, reply: FastifyReply) => {
  const googleUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${request.body.token}`;
  const res = await fetch(googleUrl);
  if (!res.ok) return reply.code(400).send({ error: 'Invalid token or error fetching user info from Google' });
  
  const googleUser = await res.json();
  try {
    const user = await getUserPublisher(googleUser);

    if (user) {
       // Create JWT token using fastify-jwt
       const token = request.jwt.sign(user, { expiresIn: '1h' });
      // const token = request.fastify.signJwt(user);
       return reply.code(200).send({ success: true, token });
    } 
    reply.code(200).send({ success: user });
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
};
