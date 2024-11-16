import { PrismaMealRepository } from "@/repositories/prisma/prisma-meal-repository";
import { GetBestOnDietSequenceUseCase } from "@/use-cases/get-best-on-diet-sequence";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetBestOnDietSequence(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const mealRepository = new PrismaMealRepository();
  const getBestOnDietSequence = new GetBestOnDietSequenceUseCase(
    mealRepository
  );

  const { bestOnDietSequence } = await getBestOnDietSequence.execute({
    userId: request.user.sub,
  });

  reply.status(200).send({
    bestOnDietSequence,
  });
}
