import { Meal, Prisma } from "@prisma/client";

export interface MealRepository {
    create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
}