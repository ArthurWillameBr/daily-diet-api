import { PrismaMealRepository } from "@/repositories/prisma/prisma-meal-repository";
import { GetUserTotalMealsUseCase } from "@/use-cases/get-user-total-meals";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetUserTotalMeals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const mealsRepository = new PrismaMealRepository();
  const getUserTotalMeals = new GetUserTotalMealsUseCase(
    mealsRepository
  );

  const { mealsCount } = await getUserTotalMeals.execute({
    userId: request.user.sub,
  });

  return reply.send({ mealsCount });
}
