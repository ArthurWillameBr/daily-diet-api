import { AiRevenueGeneration } from "@/service/ai-revenue-generation";
import { RevenueGenerationUseCase } from "@/use-cases/revenue-generation";
import { FastifyReply, FastifyRequest } from "fastify";

export async function RevenueGeneration(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const revenueGeneration = new AiRevenueGeneration();

  const revenueGenerationUseCase = new RevenueGenerationUseCase(
    revenueGeneration
  );

  const recipe = await revenueGenerationUseCase.execute();

  reply.status(200).send(recipe);
}
