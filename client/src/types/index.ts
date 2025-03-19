import { UserSchema } from "@/schema";
import { LanguageSchema } from "@/schema/user.schema";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;
type Language = z.infer<typeof LanguageSchema>;



export type { User, Language };