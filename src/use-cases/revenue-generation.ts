import { AiRevenueGeneration } from "@/service/ai-revenue-generation";

interface RevenueGenerationUseCaseResponse {
  recipe: {
    name: string;
    ingredients: Array<{
      name: string;
      amount: string;
    }>;
    steps: string[];
  };
}

export class RevenueGenerationUseCase {
  constructor(private revenueGeneration: AiRevenueGeneration) {}

  async execute(): Promise<RevenueGenerationUseCaseResponse> {
    const recipe = await this.revenueGeneration.reportGeneration();

    return {
      recipe: {
        name: recipe.name,
        ingredients: recipe.ingredients.map((ingredient) => ({
          name: ingredient.name,
          amount: ingredient.amount,
        })),
        steps: recipe.steps,
      },
    };
  }
}
