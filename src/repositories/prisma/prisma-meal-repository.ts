import { Prisma } from "@prisma/client";
import { MealRepository } from "../meal-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMealRepository implements MealRepository {
  async findAllByUserId(userId: string) {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: userId,
      }
    })
    return meals
  }
  async update(id: string, data: Prisma.MealUncheckedUpdateInput) {
    const meal = await prisma.meal.update({
      where: {
        id,
      },
      data,
    });
    return meal;
  }
  async delete(id: string) {
    const meal = await prisma.meal.delete({
      where: {
        id,
      },
    });
    return meal;
  }
  async findById(id: string) {
    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    });
    return meal;
  }
  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({
      data,
    });
    return meal;
  }
}