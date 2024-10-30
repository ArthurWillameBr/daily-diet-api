import { PrismaMealRepository } from "@/repositories/prisma/prisma-meal-repository";
import { GetUserTotalMealsWithinDietUseCase } from "@/use-cases/get-user-total-meals-within-diet";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetUserTotalMealsWithinDiet(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const mealsRepository = new PrismaMealRepository();
  const getUserTotalMealsWithinDiet = new GetUserTotalMealsWithinDietUseCase(
    mealsRepository
  );

  const { mealsWithinDietCount } = await getUserTotalMealsWithinDiet.execute({
    userId: request.user.sub,
  });

  return reply.send({ mealsWithinDietCount });
}
