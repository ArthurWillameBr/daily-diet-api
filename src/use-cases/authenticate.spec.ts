import { describe, beforeEach, it, expect } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let UsersRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe("Authenticate use case", () => {
  beforeEach(() => {
    UsersRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(UsersRepository);
  });

  it("should be able to authenticate to user", async () => {
    await UsersRepository.create({
      name: "Arthur",
      email: "arthur@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "arthur@gmail.com",
      password: "123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able to authenticate with wrong email", async () => {
    await UsersRepository.create({
      name: "Arthur",
      email: "arthur@gmail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "arthurerrado@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be to authenticate with wrong password", async () => {
    await UsersRepository.create({
      email: "arthur@gmail.com",
      name: "Arthur",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "arthur@gmail.com",
        password: "1234567890",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
