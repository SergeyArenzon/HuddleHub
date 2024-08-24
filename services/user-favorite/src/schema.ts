import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";



const userCore = {
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email(),
    given_name: z.string({
        required_error: "Given name is required",
        invalid_type_error: "Given name must be a string"
    }),
    family_name: z.string({
        required_error: "Family name is required",
        invalid_type_error: "Family name must be a string"
    }),
    picture: z.string({
        required_error: "Picture is required",
        invalid_type_error: "Picture must be a url string"
    }).url()
}


const createUserSchema = z.object({
    ...userCore
});



const createUserResponseSchema = z.object({
    ...userCore
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const {schemas: userSchemas, $ref} = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema
})