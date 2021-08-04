import { UserRepositoryInMemory } from "../repository-inmemory/user";
import { UserUseCase } from "../use-cases/userUseCase";

let repository: UserRepositoryInMemory;
let useCase: UserUseCase;
const userSeed = {
  name: "Ana",
  email: "ana@gmail.com",
  password: "1234",
  phone_number: "4299999999",
  birth_day: new Date(),
  phone_verified: true,
  additional_information: "",
  city_id: "",
  role_id: "",
};

describe("create user", () => {
  beforeEach(() => {
    repository = new UserRepositoryInMemory();
    useCase = new UserUseCase(repository);
  });

  it("should create user", async () => {
    const user = await useCase.create(userSeed);
    expect(user).toMatchObject(userSeed);
  });

  it("should not create a user that already exists", async () => {
    let errorMessage = "";
    await useCase.create(userSeed);
    try {
      await useCase.create(userSeed);
    } catch (error) {
      errorMessage = error.message;
    }

    expect(errorMessage).toBe("O email de usuário já existe");
  });
});
