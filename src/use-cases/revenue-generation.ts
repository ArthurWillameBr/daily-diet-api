import { AiRevenueGeneration } from "@/service/ai-revenue-generation";
import { UsersRepository } from "@/repositories/users-repository";

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

interface RevenueGenerationUseCaseRequest {
  userId: string;
}

export class RevenueGenerationUseCase {
  private static readonly CREDITS_REQUIRED = 1;

  constructor(
    private revenueGeneration: AiRevenueGeneration,
    private userRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: RevenueGenerationUseCaseRequest): Promise<RevenueGenerationUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.credits < RevenueGenerationUseCase.CREDITS_REQUIRED) {
      throw new Error("Insufficient credits");
    }

    await this.userRepository.updateCredits(
      userId,
      user.credits - RevenueGenerationUseCase.CREDITS_REQUIRED
    );

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
