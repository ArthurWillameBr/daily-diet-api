import { calculateExperienceWithinLevel } from "@/modules/gamification";
import { UsersRepository } from "@/repositories/users-repository";

interface GetUserLevelAndExperienceRequest {
  userId: string;
}

interface GetUserLevelAndExperienceResponse {
  level: number;
  experience: number;
  totalExperienceForNextLevel: number;
  title: string;
}

export class GetUserLevelAndExperienceUseCase {
  constructor(private userRepository: UsersRepository) {}

  private honorificTitles: { [level: number]: string } = {
    1: "Iniciante Nutricional",
    5: "Explorador de Sabores",
    10: "Conquistador da Saúde",
    20: "Mestre da Nutrição",
    30: "Guru do Bem-Estar",
    40: "Sábio da Alimentação",
    50: "Mestre dos Alimentos",
  };

  private getHonorificTitle(level: number): string {
    if (level >= 1 && level < 5) return "Iniciante Nutricional";
    if (level >= 5 && level < 10) return "Explorador de Sabores";
    if (level >= 10 && level < 20) return "Conquistador da Saúde";
    if (level >= 20 && level < 30) return "Mestre da Nutrição";
    if (level >= 30) return "Guru do Bem-Estar";
    if (level >= 40) return "Sábio da Alimentação";
    if (level >= 50) return "Mestre dos Alimentos";
    return "Sem título";
  }

  async execute({
    userId,
  }: GetUserLevelAndExperienceRequest): Promise<GetUserLevelAndExperienceResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const { experience: totalExperience } = user;

    const { level, relativeExperience, totalForNextLevel } =
      calculateExperienceWithinLevel(totalExperience);

    const title = this.getHonorificTitle(level);

    return {
      level,
      experience: relativeExperience,
      totalExperienceForNextLevel: totalForNextLevel,
      title,
    };
  }
}
