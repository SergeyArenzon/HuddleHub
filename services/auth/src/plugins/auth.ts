import fastifyPlugin from "fastify-plugin";
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { config } from "../config";

const authPlugin: FastifyPluginCallback = async (fastify, undefined, done) => {
    fastify.register(fastifyJwt, { secret: config.jwtSecret});

    fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (error) {  
            reply.code(401).send({message: "Unauthorized"});
        }
    });
    done();
}

export default fastifyPlugin(authPlugin);