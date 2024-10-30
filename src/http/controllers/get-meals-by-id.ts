import { PrismaMealRepository } from "@/repositories/prisma/prisma-meal-repository";
import { GetMealByIdUseCase } from "@/use-cases/get-meal-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function GetMealsById(request: FastifyRequest, reply: FastifyReply) {
    const getMealsByIdParamsSchema = z.object({
        mealId: z.string().uuid()
    })

    const { mealId } = getMealsByIdParamsSchema.parse(request.params)
    
    const mealRepository = new PrismaMealRepository();
    const getMealsById = new GetMealByIdUseCase(mealRepository)


   const { meal } = await getMealsById.execute({
        mealId,
        userId: request.user.sub
    })

    return reply.status(200).send({ meal })

}