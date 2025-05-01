import { z } from "zod";

const ISOSchema = z.object({
    code: z.string(),
    name: z.string(),
  })
  
  // Define the expected structure of a language object
  const LanguageSchema = ISOSchema
  const CountrySchema = ISOSchema;
  const CitySchema = ISOSchema;
  
  export { LanguageSchema, CountrySchema, CitySchema };