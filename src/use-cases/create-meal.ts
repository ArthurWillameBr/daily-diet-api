import { MealRepository } from "@/repositories/meal-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Meal } from "@prisma/client";

interface CreateMealUseCaseRequest {
  userId: string;
  name: string;
  description: string | null;
  dateTime: string;
  isOnDiet: boolean;
}

interface CreateMealUseCaseResponse {
  meal: Meal;
}

export class CreateMealUseCase {
  constructor(
    private mealRepository: MealRepository,
    private userRepository?: UsersRepository
  ) {}

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

    const experienceGained = isOnDiet ? 50 : 5;

    const user = await this.userRepository?.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedExperience = user.experience + experienceGained;

    await this.userRepository?.updateExperience(userId, updatedExperience);

    return {
      meal,
    };
  }
}
