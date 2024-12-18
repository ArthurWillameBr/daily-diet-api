import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetUserLevelAndExperienceUseCase } from "@/use-cases/get-user-level-and-experience";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetGamificationStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userRepository = new PrismaUserRepository();
  const getUserLevelAndExperience = new GetUserLevelAndExperienceUseCase(
    userRepository
  );

  const {
    experience,
    totalExperienceForNextLevel,
    title,
    level,
    creditsEarned,
  } = await getUserLevelAndExperience.execute({
    userId: request.user.sub,
  });

  return reply.status(201).send({
    experience,
    totalExperienceForNextLevel,
    level,
    title,
    creditsEarned,
  });
}
