import { UserSchema } from "@/schema";
import { LanguageSchema } from "@/schema/user.schema";
import { CategorySchema } from "@/schema/category.schema";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;
type Language = z.infer<typeof LanguageSchema>;
type Category = z.infer<typeof CategorySchema>;


export type { User, Language, Category };