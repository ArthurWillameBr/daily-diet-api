import { MealRepository } from "@/repositories/meal-repository";

interface GetUserTotalMealsOutsideDietUseCaseRequest {
    userId: string
}

interface GetUserTotalMealsOutsideDietUseCaseResponse {
    mealsOutsideDietCount: number
}

export class GetUserTotalMealsOutsideDietUseCase {
    constructor(private mealsRepository: MealRepository) {}

    async execute({ userId }: GetUserTotalMealsOutsideDietUseCaseRequest): Promise<GetUserTotalMealsOutsideDietUseCaseResponse> {
        const mealsOutsideDietCount = await this.mealsRepository.countTotalMealsOutsideDietByUserId(userId) 

        return {
            mealsOutsideDietCount
        }
    }
}