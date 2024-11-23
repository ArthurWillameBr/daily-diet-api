import { PrismaMealRepository } from "@/repositories/prisma/prisma-meal-repository";
import { DeleteMealUseCase } from "@/use-cases/delete-meal";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function DeleteMeals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteMealParamsSchema = z.object({
    mealId: z.string().uuid(),
  });

  const { mealId } = deleteMealParamsSchema.parse(request.params);

  const mealsRepository = new PrismaMealRepository();
  const deleteMealsUseCase = new DeleteMealUseCase(mealsRepository);

  await deleteMealsUseCase.execute({
    mealId,
    userId: request.user.sub,
  });

  return reply.status(200).send();
}
