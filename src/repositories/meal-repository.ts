import { Meal, Prisma } from "@prisma/client";

export interface MealRepository {
    create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
    update(id: string, data: Prisma.MealUncheckedUpdateInput): Promise<Meal>
    delete(id: string): Promise<Meal>
    findById(id: string): Promise<Meal | null>
    findAllByUserId(userId: string): Promise<Meal[]>
    findByMealIdAndUserId(mealId: string, userId: string): Promise<Meal | null>
    countTotalMealsByUserId(userId: string): Promise<number>
    countTotalMealsWithinDietByUserId(userId: string): Promise<number>
    countTotalMealsOutsideDietByUserId(userId: string): Promise<number>
}