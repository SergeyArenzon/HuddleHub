import { FastifyInstance } from "fastify";
import registerController from "../controllers/register";

const registerRoutes = async(fastify: FastifyInstance) => {
    fastify.post('/', registerController);
}

export default registerRoutes;