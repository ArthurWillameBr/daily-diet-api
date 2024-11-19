import {
  calculateExperienceToNextLevel,
  calculateLevelFromExperience,
} from "@/modules/gamification";
import { UsersRepository } from "@/repositories/users-repository";

interface GetUserLevelAndExperienceRequest {
  userId: string;
}

interface GetUserLevelAndExperienceResponse {
  experience: number;
  level: number;
  experienceToNextLevel: number;
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

    const { experience } = user;

    const level = calculateLevelFromExperience(experience);

    return {
      level,
      experience,
      experienceToNextLevel: calculateExperienceToNextLevel(level),
    };
  }
}
