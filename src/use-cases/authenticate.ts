import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateRequest {
    email: string
    password: string
}

interface AuthenticateResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private userRepository: UsersRepository) {}

    async execute({email, password}: AuthenticateRequest): Promise<AuthenticateResponse> {
        const user = await this.userRepository.findByEmail(email)

        if(!user) {
            throw new Error('User not found')
        }

        const doesPasswordMatch = await compare(password, user.password_hash)

        if(!doesPasswordMatch) {
            throw new Error('Incorrect password')
        }

        return {
            user
        }
    }
}