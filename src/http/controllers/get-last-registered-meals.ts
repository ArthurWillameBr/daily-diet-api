import { PrismaMealRepository } from "@/repositories/prisma/prisma-meal-repository";
import { GetLastRegisteredMealsUseCase } from "@/use-cases/get-last-registered-meals";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetLastRegisteredMeals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const mealRepository = new PrismaMealRepository();
  const getLastMealsRegisteredUseCase = new GetLastRegisteredMealsUseCase(
    mealRepository
  );

  const { meals } = await getLastMealsRegisteredUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ meals });
}
