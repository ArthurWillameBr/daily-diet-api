import { MealRepository } from "@/repositories/meal-repository";

interface GetBestOnDietSequenceUseCaseRequest {
  userId: string;
}

interface GetBestOnDietSequenceUseCaseResponse {
  bestOnDietSequence: number;
}

export class GetBestOnDietSequenceUseCase {
  constructor(private mealsRepository: MealRepository) {}

  async execute({
    userId,
  }: GetBestOnDietSequenceUseCaseRequest): Promise<GetBestOnDietSequenceUseCaseResponse> {
    const meals = await this.mealsRepository.findAllByUserId(userId);

    const { bestOnDietSequence } = meals.reduce(
      (acc, meal) => {
        if (meal.is_on_diet) {
          acc.currentSequence += 1;
        } else {
          acc.currentSequence = 0;
        }

        if (acc.currentSequence > acc.bestOnDietSequence) {
          acc.bestOnDietSequence = acc.currentSequence;
        }

        return acc;
      },
      { bestOnDietSequence: 0, currentSequence: 0 }
    );

    return {
      bestOnDietSequence,
    };
  }
}
