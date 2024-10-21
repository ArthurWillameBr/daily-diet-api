import { MealRepository } from "@/repositories/meal-repository";
import { Meal } from "@prisma/client";

interface GetMealByIdUseCaseRequest {
  mealId: string;
  userId: string;
}

interface GetMealByIdUseCaseResponse {
  meal: Meal;
}

export class GetMealByIdUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    mealId,
    userId,
  }: GetMealByIdUseCaseRequest): Promise<GetMealByIdUseCaseResponse> {
    const meal = await this.mealRepository.findByMealIdAndUserId(
      mealId,
      userId
    );
    if (!meal) {
      throw new Error("Meal not found");
    }
    return {
      meal,
    };
  }
}