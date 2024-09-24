import { FastifyInstance } from "fastify";

declare module "fastify" {
  export interface FastifyInstance {
    verifyToken: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}