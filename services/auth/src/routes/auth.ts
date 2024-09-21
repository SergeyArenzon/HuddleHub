import { FastifyPluginAsync } from 'fastify';
import { loginController } from '../controllers/auth';
import { loginResponseSchema } from '../schemas/auth';


// Register routes
const authRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post( '/', { schema: loginResponseSchema }, loginController);
};

export default authRoutes;
