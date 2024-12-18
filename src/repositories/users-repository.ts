import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  findById(userId: string): Promise<User | null>;
  updateExperience(userId: string, experience: number): Promise<void>;
  updateLevel(userId: string, level: number): Promise<void>;
  updateCredits(userId: string, credits: number): Promise<void>;
}
