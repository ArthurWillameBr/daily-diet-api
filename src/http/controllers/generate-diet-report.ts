import { PrismaMealRepository } from "@/repositories/prisma/prisma-meal-repository";
import { AiService } from "@/service/ai-service";
import { GenerateDietReportUseCase } from "@/use-cases/generate-diet-report";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GenerateDietReport(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const mealRepository = new PrismaMealRepository();
  const aiService = new AiService();

  const generateDietReport = new GenerateDietReportUseCase(
    mealRepository,
    aiService
  );

  const { report } = await generateDietReport.execute({
    userId: request.user.sub,
  });

  reply.status(200).send({
    report,
  });
}
