import { FastifyInstance } from "fastify";
import { registerUserHandler } from "./controller";


const userRoutes = async(server: FastifyInstance) =>  {
    server.get('/', registerUserHandler);
};

export default userRoutes;