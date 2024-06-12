import { CreateUserInput } from "./schema"
import prisma from "./utils/prisma"

const createUser = async(input: CreateUserInput) => {
    const user = await prisma.user.create({
        data: input
    })

}