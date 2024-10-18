import { Meal, Prisma } from "@prisma/client";

export interface MealRepository {
    create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
    update(id: string, data: Prisma.MealUncheckedUpdateInput): Promise<Meal>
    findById(id: string): Promise<Meal | null>
}