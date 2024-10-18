import { Prisma } from "@prisma/client";
import { MealRepository } from "../meal-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMealRepository implements MealRepository {
   async create(data: Prisma.MealUncheckedCreateInput) {
        const meal = await prisma.meal.create({
            data,
        })
        return meal
    }
}