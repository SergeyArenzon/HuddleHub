import { FastifyInstance } from "fastify";
import { tokenHandler } from "./controllers";


const userRoutes = async(server: FastifyInstance) =>  {
    server.post('/token', tokenHandler);
};

export default userRoutes;