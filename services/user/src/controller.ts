import { FastifyReply, FastifyRequest } from "fastify";

const registerUserHandler = async(request: FastifyRequest, reply: FastifyReply) => {
    return reply.code(200).send({kaki: 1})
};

export {registerUserHandler}