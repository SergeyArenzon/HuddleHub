import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client'



const tokenHandler = async(request: FastifyRequest, reply: FastifyReply) => {
    // const request
    // @ts-ignore
    const {access_token} = request.body;
    const prisma = new PrismaClient();


 
    
    const googleUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
    const response = await fetch(googleUrl);
    const body = await response.json();
    
    // try {
    //     const user = await prisma.user.create({
    //       data: {
    //         email: body.email,
            
    //       },
    //     });
    //     reply.code(201).send(user);
    //   } catch (error) {
    //     reply.code(500).send({ error: 'Failed to create user' });
    //   }
    
    reply.code(200)
};

export {tokenHandler}