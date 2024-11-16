import { PrismaMealRepository } from "@/repositories/prisma/prisma-meal-repository";
import { CreateMealUseCase } from "@/use-cases/create-meal";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CreateMeal(request: FastifyRequest, reply: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    dateTime: z.string(), //Conferir isso aqui depois
    isOnDiet: z.boolean(),
  });

  const { name, description, dateTime, isOnDiet } = createMealBodySchema.parse(
    request.body
  );

  const mealRepository = new PrismaMealRepository();
  const createMealUseCase = new CreateMealUseCase(mealRepository);

  await createMealUseCase.execute({
    userId: request.user.sub,
    name,
    description,
    dateTime,
    isOnDiet,
  });

  return reply.status(201).send({ message: "Meal created successfully" });
}
