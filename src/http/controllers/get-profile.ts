import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetProfileUseCase } from "@/use-cases/get-profile";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetProfile(request: FastifyRequest, reply: FastifyReply) {
  const userRepository = new PrismaUserRepository();
  const getProfile = new GetProfileUseCase(userRepository);

  const { user } = await getProfile.execute({
    userId: request.user.sub,
  });

  reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
