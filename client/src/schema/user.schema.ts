import { z } from 'zod';

const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    last_name: z.string(),
    first_name: z.string(),
    image_url: z.string().url(),
    created_at: z.string().transform((val) => new Date(val)),
    updated_at: z.string().transform((val) => new Date(val)),
});


// Define the expected structure of a language object
const LanguageSchema = z.object({
    code: z.string(),
    name: z.string(),
  });



export { UserSchema, LanguageSchema };