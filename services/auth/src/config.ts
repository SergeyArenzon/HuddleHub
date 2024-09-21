import { z } from 'zod';
// Load environment variables from .env file
// Define the schema for expected environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform((val) => Number(val)),
  JWT_SECRET: z.string().min(1),
  ADDRESS: z.string().min(1),
  RABBITMQ_URL: z.string().min(1),

});

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format());
  process.exit(1); // Exit the application if validation fails
}

// Export validated environment variables
export const config = {
  nodeEnv: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
  jwtSecret: parsedEnv.data.JWT_SECRET,
  address: parsedEnv.data.ADDRESS,
  rabbitmqUrl: parsedEnv.data.RABBITMQ_URL,
};
