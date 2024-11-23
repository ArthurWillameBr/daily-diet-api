import { MealRepository } from "@/repositories/meal-repository";

interface GetMealsUseCaseRequest {
  userId: string;
}

interface FormattedMeal {
  id: string;
  time: string;
  name: string;
  description: string | null;
  date: Date;
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
        id: meal.id,
        name: meal.name,
        date: meal.date_time,
        description: meal.description,
        isOnDiet: meal.is_on_diet,
      });

      return acc;
    }, {} as Record<string, FormattedMeal[]>);

    // Ordenar as datas de forma decrescente
    const sortedDates = Object.keys(groupedMeals).sort((a, b) => {
      const dateA = new Date(a.split("/").reverse().join("-"));
      const dateB = new Date(b.split("/").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });

    const formattedMeals = sortedDates.map((date) => ({
      date,
      meals: groupedMeals[date].sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.time}:00`).getTime();
        const timeB = new Date(`1970-01-01T${b.time}:00`).getTime();
        return timeB - timeA;
      }),
    }));

    return {
      meals: formattedMeals,
    };
  }
}
