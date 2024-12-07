import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AiRevenueGeneration } from "@/service/ai-revenue-generation";
import { RevenueGenerationUseCase } from "@/use-cases/revenue-generation";
import { FastifyReply, FastifyRequest } from "fastify";

export async function RevenueGeneration(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const revenueGeneration = new AiRevenueGeneration();
  const userRepository = new PrismaUserRepository();

  const revenueGenerationUseCase = new RevenueGenerationUseCase(
    revenueGeneration,
    userRepository
  );

  const recipe = await revenueGenerationUseCase.execute({
    userId: request.user.sub,
  });

  reply.status(200).send(recipe);
}
