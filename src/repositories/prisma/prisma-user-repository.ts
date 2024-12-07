import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UsersRepository {
  async updateCredits(userId: string, credits: number) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        credits,
      },
    });
  }
  async updateExperience(userId: string, experience: number) {
    await prisma.user.update({
      where: { id: userId },
      data: { experience },
    });
  }

  async updateLevel(userId: string, level: number): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { level },
    });
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}
