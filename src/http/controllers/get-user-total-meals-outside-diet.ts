import { PrismaMealRepository } from "@/repositories/prisma/prisma-meal-repository";
import { GetUserTotalMealsOutsideDietUseCase } from "@/use-cases/get-user-total-meals-outside-diet";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetUserTotalMealsOutsideDiet(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const mealsRepository = new PrismaMealRepository();
  const getUserTotalMealsWithinDiet = new GetUserTotalMealsOutsideDietUseCase(
    mealsRepository
  );

  const { mealsOutsideDietCount } = await getUserTotalMealsWithinDiet.execute({
    userId: request.user.sub,
  });

  return reply.send({ mealsOutsideDietCount });
}
