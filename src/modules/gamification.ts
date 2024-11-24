const BASE_EXPERIENCE = 20;
const EXPERIENCE_FACTOR = 1.3;

// Calcula o nível a partir da experiência total acumulada
export function calculateLevelFromRelativeExperience(
  experience: number
): number {
  return (
    Math.floor(
      Math.log((experience / BASE_EXPERIENCE) * (EXPERIENCE_FACTOR - 1) + 1) /
        Math.log(EXPERIENCE_FACTOR)
    ) + 1
  );
}

// Calcula o total de experiência necessária para o próximo nível com base no nível atual
export function calculateTotalExperienceToNextLevel(level: number): number {
  return Math.floor(
    BASE_EXPERIENCE *
      ((EXPERIENCE_FACTOR ** level - 1) / (EXPERIENCE_FACTOR - 1)) -
      BASE_EXPERIENCE *
        ((EXPERIENCE_FACTOR ** (level - 1) - 1) / (EXPERIENCE_FACTOR - 1))
  );
}

// Calcula a experiência relativa ao nível atual
export function calculateExperienceWithinLevel(totalExperience: number): {
  level: number;
  relativeExperience: number;
  totalForNextLevel: number;
} {
  const level = calculateLevelFromRelativeExperience(totalExperience);
  const totalExperienceForCurrentLevel =
    BASE_EXPERIENCE *
    ((EXPERIENCE_FACTOR ** (level - 1) - 1) / (EXPERIENCE_FACTOR - 1));

  const relativeExperience = totalExperience - totalExperienceForCurrentLevel;
  const totalForNextLevel = calculateTotalExperienceToNextLevel(level);

  return {
    level,
    relativeExperience,
    totalForNextLevel,
  };
}
