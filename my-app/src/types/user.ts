import { UserSchema } from "@/schema";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;
export type { User };