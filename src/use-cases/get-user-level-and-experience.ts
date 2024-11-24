import { calculateExperienceWithinLevel } from "@/modules/gamification";
import { UsersRepository } from "@/repositories/users-repository";

interface GetUserLevelAndExperienceRequest {
  userId: string;
}

interface GetUserLevelAndExperienceResponse {
  level: number; // Nível atual do jogador
  experience: number; // Experiência relativa ao nível atual
  totalExperienceForNextLevel: number; // Total de experiência necessária para o próximo nível
}

export class GetUserLevelAndExperienceUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserLevelAndExperienceRequest): Promise<GetUserLevelAndExperienceResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const { experience: totalExperience } = user;

    // Calcula nível, experiência relativa e total necessário para o próximo nível
    const { level, relativeExperience, totalForNextLevel } =
      calculateExperienceWithinLevel(totalExperience);

    return {
      level, // Nível atual
      experience: relativeExperience, // Experiência relativa ao nível atual
      totalExperienceForNextLevel: totalForNextLevel, // Total necessário para o próximo nível
    };
  }
}
