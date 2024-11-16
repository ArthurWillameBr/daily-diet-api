import { PrismaMealRepository } from "@/repositories/prisma/prisma-meal-repository";
import { GetMealsUseCase } from "@/use-cases/get-meals";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetMeals(request: FastifyRequest, reply: FastifyReply) {
  const mealsRepository = new PrismaMealRepository();
  const getMealsUseCase = new GetMealsUseCase(mealsRepository);

  const { meals } = await getMealsUseCase.execute({ userId: request.user.sub });

  const mealsWithHiddenUserId = meals.map((meal) => ({
    ...meal,
    user_id: undefined,
  }));

  return reply.status(200).send({
    meals: mealsWithHiddenUserId,
  });
}
