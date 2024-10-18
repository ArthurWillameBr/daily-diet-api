import { MealRepository } from "@/repositories/meal-repository";
import { Meal } from "@prisma/client";

interface CreateMealUseCaseRequest {
  userId: string;
  name: string;
  description: string;
  dateTime: Date;
  isOnDiet: boolean;
}

interface CreateMealUseCaseResponse {
  meal: Meal;
}

export class CreateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    userId,
    name,
    isOnDiet,
    description,
    dateTime,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealRepository.create({
      name,
      description,
      date_time: dateTime,
      is_on_diet: isOnDiet,
      user_id: userId,
    });
    return {
      meal,
    };
  }
}