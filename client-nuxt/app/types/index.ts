import { z } from "zod";
import { UserSchema, LanguageSchema } from "@/schemas";

type User = z.infer<typeof UserSchema>;
type Language = z.infer<typeof LanguageSchema>;


export type { User, Language };