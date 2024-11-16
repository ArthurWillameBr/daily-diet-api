import { MealRepository } from "@/repositories/meal-repository";
import { Meal } from "@prisma/client";

interface UpdateMealUseCaseRequest {
  mealId: string;
  userId: string;
  name: string;
  description: string | null;
  dateTime: string;
  isOnDiet: boolean;
}

interface UpdateMealUseCaseResponse {
  meal: Meal;
}

export class UpdateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    mealId,
    userId,
    name,
    isOnDiet,
    description,
    dateTime,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.mealRepository.findById(mealId);

    if (!meal) {
      throw new Error("Meal not found");
    }

    if (meal.user_id !== userId) {
      throw new Error("Unauthorized");
    }

    const updateMeal = await this.mealRepository.update(mealId, {
      name,
      description,
      date_time: dateTime,
      is_on_diet: isOnDiet,
      user_id: userId,
    });

    return {
      meal: updateMeal,
    };
  }
}
