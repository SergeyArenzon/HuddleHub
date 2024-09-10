import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserPublisher } from '../queues/user.producer';

export const loginController = async (request: FastifyRequest<{ Body: { token: string } }>, reply: FastifyReply) => {
  const googleUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${request.body.token}`;
  const res = await fetch(googleUrl);

  if (!res.ok) return reply.code(400).send({ error: 'Invalid token or error fetching user info from Google' });

  const googleUser = await res.json();
  
  try {
    const isValid = await getUserPublisher(googleUser);
    console.log({isValid});
    
    reply.code(200).send({ success: isValid });
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
};
