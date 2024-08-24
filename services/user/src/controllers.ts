import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client'
import { createUser } from "./service";



const tokenHandler = async(request: FastifyRequest, reply: FastifyReply) => {
    // const request
    // @ts-ignore
    const {access_token} = request.body;
    const prisma = new PrismaClient();

    const googleUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`;

    try {
        const response = await fetch(googleUrl);
        const googleUser = await response.json();
        if (!googleUser) throw new Error("Wrong user auth");

        console.log({googleUser});
        let user = await prisma.user.findUnique({
            where: { email: googleUser.email },
          });

        if (!user) {
            user = await createUser(googleUser);
        }
        return reply.code(201).send(user);
          


       
        
    } catch (error) {
        
    }
    
    reply.code(200)
};

export {tokenHandler}