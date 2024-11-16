import { MealRepository } from "@/repositories/meal-repository";
import { Meal } from "@prisma/client";

interface GetLastMealRegisteredMealUseCaseRequest {
  userId: string;
}

interface GetLastMealRegisteredMealUseCaseResponse {
  meals: Meal[];
}

export class GetLastRegisteredMealsUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    userId,
  }: GetLastMealRegisteredMealUseCaseRequest): Promise<GetLastMealRegisteredMealUseCaseResponse> {
    const meals = await this.mealRepository.findAllByUserId(userId);

    if (!meals) {
      throw new Error("Meal not found");
    }

    return {
      meals,
    };
  }
}
