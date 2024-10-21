import { MealRepository } from "@/repositories/meal-repository";

interface GetUserTotalMealsWithinDietUseCaseRequest {
  userId: string;
}

interface GetUserTotalMealsWithinDietUseCaseResponse {
  mealsWithinDietCount: number;
}

export class GetUserTotalMealsWithinDietUseCase {
  constructor(private mealsRepository: MealRepository) {}

  async execute({
    userId,
  }: GetUserTotalMealsWithinDietUseCaseRequest): Promise<GetUserTotalMealsWithinDietUseCaseResponse> {
    const mealsWithinDietCount =
      await this.mealsRepository.countTotalMealsWithinDietByUserId(userId);

    return {
      mealsWithinDietCount,
    };
  }
}