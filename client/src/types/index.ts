import { UserSchema } from "@/schema";
import { CountrySchema, LanguageSchema } from "@/schema/user.schema";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;
type Language = z.infer<typeof LanguageSchema>;
type Country = z.infer<typeof CountrySchema>;




export type { User, Language, Country };