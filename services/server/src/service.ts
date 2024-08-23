import { CreateUserInput } from "./schema";
// import { hashPassword } from "./utils/hash";
import prisma from "./utils/prisma";


const createUser = async(input: CreateUserInput) => {
    const user = await prisma.user.create({
        // @ts-ignore
        data: input
    });
    return user;
};

export { createUser };