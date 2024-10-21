import { MealRepository } from "@/repositories/meal-repository";

interface GetUserTotalMealsUseCaseRequest {
  userId: string;
}

interface GetUserTotalMealsUseCaseResponse {
  mealsCount: number;
}

export class GetUserTotalMealsUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    userId,
  }: GetUserTotalMealsUseCaseRequest): Promise<GetUserTotalMealsUseCaseResponse> {
    const mealsCount = await this.mealRepository.countTotalMealsByUserId(
      userId
    );

    return {
      mealsCount,
    };
  }
}