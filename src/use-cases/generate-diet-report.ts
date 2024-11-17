import { MealRepository } from "@/repositories/meal-repository";
import { AiService } from "@/service/ai-service";

interface GenerateDietReportRequest {
  userId: string;
}

interface GenerateDietReportResponse {
  report: string;
}

export class GenerateDietReportUseCase {
  constructor(
    private mealRepository: MealRepository,
    private aiService: AiService
  ) {}

  async execute({
    userId,
  }: GenerateDietReportRequest): Promise<GenerateDietReportResponse> {
    const meals = await this.mealRepository.findAllByUserId(userId);

    if (!meals.length) {
      throw new Error("No meals found for this user.");
    }

    const formattedMeals = meals.map((meal) => ({
      dateTime: meal.date_time.toISOString().split("T")[0],
      name: meal.name,
      description: meal.description || "Sem descrição",
      isOnDiet: meal.is_on_diet,
    }));

    const report = await this.aiService.generateDietReport({
      meals: formattedMeals,
    });

    return { report };
  }
}
