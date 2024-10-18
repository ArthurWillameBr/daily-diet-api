import { MealRepository } from "@/repositories/meal-repository";

interface DeleteMealUseCaseRequest {
    mealId: string;
    userId: string;
}

export class DeleteMealUseCase {
    constructor(private mealRepository: MealRepository) {}

    async execute({mealId, userId}: DeleteMealUseCaseRequest) {
        const meal = await this.mealRepository.findById(mealId)

        if (!meal) {
            throw new Error('Meal not found');
        }

        if(meal.user_id !== userId) {
            throw new Error('Unauthorized');
        }

        await this.mealRepository.delete(mealId);
    }
}