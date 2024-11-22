import { MealRepository } from "@/repositories/meal-repository";

interface GetMealsUseCaseRequest {
  userId: string;
}

interface FormattedMeal {
  time: string;
  name: string;
  isOnDiet: boolean;
}

interface GetMealsUseCaseResponse {
  meals: Array<{
    date: string;
    meals: FormattedMeal[];
  }>;
}

export class GetMealsUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    userId,
  }: GetMealsUseCaseRequest): Promise<GetMealsUseCaseResponse> {
    const meals = await this.mealRepository.findAllByUserId(userId);

    // Agrupar por data
    const groupedMeals = meals.reduce((acc, meal) => {
      const date = new Date(meal.date_time).toLocaleDateString("pt-BR");
      const time = new Date(meal.date_time).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push({
        time,
        name: meal.name,
        isOnDiet: meal.is_on_diet,
      });

      return acc;
    }, {} as Record<string, FormattedMeal[]>);

    // Ordenar as datas de forma decrescente
    const sortedDates = Object.keys(groupedMeals).sort((a, b) => {
      const dateA = new Date(a.split("/").reverse().join("-"));
      const dateB = new Date(b.split("/").reverse().join("-"));
      return dateB.getTime() - dateA.getTime(); // Mais recente primeiro
    });

    const formattedMeals = sortedDates.map((date) => ({
      date,
      meals: groupedMeals[date],
    }));

    return {
      meals: formattedMeals,
    };
  }
}
