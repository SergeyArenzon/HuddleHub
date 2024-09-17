import { z } from "zod";

// Base schema for common fields
const BaseModel = z.object({
    id: z.string().uuid(),
    created_at: z.string().datetime(), // ISO string format for DateTime
    updated_at: z.string().datetime(),
  });

  const User = z.object({
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    image_url: z.string().url(),
  })
  
const UserModel = User.merge(BaseModel);

export { User, UserModel };