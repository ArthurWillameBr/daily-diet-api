import { PrismaMealRepository } from "@/repositories/prisma/prisma-meal-repository";
import { UpdateMealUseCase } from "@/use-cases/update-meal";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function UpdateMeal(request: FastifyRequest, reply: FastifyReply) {
  const UpdateMealParamsSchema = z.object({
    mealId: z.string().uuid(),
  });
  const UpdateMealBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    dateTime: z.string(),
    isOnDiet: z.boolean(),
  });

  const { name, description, dateTime, isOnDiet } = UpdateMealBodySchema.parse(
    request.body
  );
  const { mealId } = UpdateMealParamsSchema.parse(request.params);

  const mealRepository = new PrismaMealRepository();
  const updateMeal = new UpdateMealUseCase(mealRepository);

  const { meal } = await updateMeal.execute({
    userId: request.user.sub,
    mealId,
    name,
    description,
    dateTime,
    isOnDiet,
  });
  return reply.status(200).send({ meal });
}
