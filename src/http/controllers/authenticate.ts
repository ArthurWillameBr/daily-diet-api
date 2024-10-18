import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const userRepository = new PrismaUserRepository()
        const authenticateUseCase = new AuthenticateUseCase(userRepository)

        await authenticateUseCase.execute({
            email, 
            password
        })
    } catch (error) {
        if(error) {
            return reply.status(400).send({message: "User not found"})
        }
        throw error
    }
    return reply.status(200).send({message: "User authenticated"})
}