import { FastifyReply, FastifyRequest } from "fastify";

export async function VerifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch {
    reply.status(401).send({ message: "Unauthorized" });
  }
}