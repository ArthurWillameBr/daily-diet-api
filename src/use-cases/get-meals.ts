import { MealRepository } from "@/repositories/meal-repository";
import { Meal } from "@prisma/client";

interface GetMealsUseCaseRequest {
    userId: string
}

interface GetMealsUseCaseResponse {
    meals: Meal[]
}

export class GetMealsUseCase {
    constructor(private mealRepository: MealRepository) {}

    async execute({userId}: GetMealsUseCaseRequest): Promise<GetMealsUseCaseResponse> {
        const meals = await this.mealRepository.findAllByUserId(userId)

        return {
            meals
        }
    } 
}