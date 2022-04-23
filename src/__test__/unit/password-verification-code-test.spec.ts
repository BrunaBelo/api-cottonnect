import connection from "../../database/connection";
import { getRepository, Repository } from "typeorm";
import { PasswordVerificationCode } from "../../model/password-verification-code";
import { PasswordVerificationCodeFactory } from "../factories/password-verification-code-factory";

describe("PasswordVerificationCode", () => {
  let repository: Repository<PasswordVerificationCode>;

  beforeAll(async () => {
    await connection.create();
    repository = getRepository(PasswordVerificationCode);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("PasswordVerificationCode", () => {
    it("create new password verification code", async() => {
      let newObject =  await PasswordVerificationCodeFactory({}, false);
      newObject = repository.create(newObject);
      newObject = await repository.save(newObject);

      expect(await repository.find()).toEqual([newObject]);
    });
  });
});
