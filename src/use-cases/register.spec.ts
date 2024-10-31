import { describe, beforeEach, it, expect } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let UsersRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    UsersRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(UsersRepository);
  });

  it("should be able to register a new user", async () => {
    const { user } = await sut.execute({
      name: "arthur-test",
      email: "arthurtest@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "arthur-test",
      email: "arthurtest@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register a new user with an email that is already in use", async () => {
    const email = "arthurtest@gmail.com";

    await sut.execute({
      name: "arthur-test",
      email,
      password: "123456",
    });

    await expect(() => 
      sut.execute({
        name: "arthur-test",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  });
});
