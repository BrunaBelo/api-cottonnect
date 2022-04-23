import request from 'supertest'
import connection from '../../database/connection';
import faker from 'faker/locale/pt_BR';
import { app } from '../../../src/server'
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import { UserRepository } from '../../repository/user-repository';
import { cityFactory } from '../factories/city-factory';
import { roleFactory } from '../factories/role-factory';
import { userFactory } from '../factories/user-factory';
import LoginUserService from '../../service/user/login-user-service';
import { PasswordVerificationCode } from '../../model/password-verification-code';

describe("User", () => {
  let userRepository: UserRepository;
  let codeRepository: Repository<PasswordVerificationCode>;

  beforeAll(async () => {
    await connection.create();
    userRepository = getCustomRepository(UserRepository);
    codeRepository = getRepository(PasswordVerificationCode);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("GET getUser", () => {
    it("returns user when valid", async () => {
      let user = await userFactory({ password: "12345678" });
      user = await new LoginUserService(user.email, "12345678").run();

      const res = await request(app).get(`/users/${user.id}`)
                                    .set({ "x-access-token": user.token });

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual(user.toString());
    });

    it("returns error when not valid", async () => {
      let user = await userFactory({ password: "12345678" });
      user = await new LoginUserService(user.email, "12345678").run();

      const res = await request(app).get(`/users/${faker.random.uuid}`)
                                    .set({ "x-access-token": user.token });

      expect(res.status).toEqual(400);
      expect(res.body.message).toContain("Usuário não encontrado: ");
    });
  });

  describe("POST User", () => {
    it("returns 201 when valid response", async () => {
      const user = await userFactory({}, false);
      user.cityId = (await cityFactory({})).id;
      user.roleId = (await roleFactory("user")).id;
      const res = await request(app).post('/users/').send(user);

      expect(res.status).toEqual(201);
      expect(await userRepository.findOne(res.body.id)).toBeTruthy();
    });

    it("returns 400 when invalid response", async () => {
      const user = await userFactory({}, false);
      user.email = null;
      const res = await request(app).post('/users/').send(user);

      expect(res.status).toEqual(400);
      expect(await userRepository.findOne()).toBeFalsy();
    });
  });

  describe("POST Login", () => {
    describe("When credentials are correct", () => {
      it("return success", async() => {
        const password = "I like cats very much 123456"
        const user = await userFactory({ password });
        const res = await request(app).post('/users/login').send({email: user.email, password});

        expect(res.status).toEqual(200);
      });
    });

    describe("When credentials are not correct", () => {
      it("return error to wrong email", async() => {
        const password = "I also like dogs very much"
        await userFactory({ password });
        const res = await request(app).post('/users/login').send({email: "luffy@mail.com", password});

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual("Credenciais invalidas");
      });

      it("return error to wrong password", async() => {
        const user = await userFactory({ password: "chapeu de palha" });
        const res = await request(app).post('/users/login').send({email: user.email, password: "capitan ussop"});

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual("Credenciais invalidas");
      });

      it("return error to null email and password", async() => {
        const res = await request(app).post('/users/login').send({email: "", password: ""});

        expect(res.status).toEqual(400);
        expect(res.body.message).toContain("Erro ao logar:")
      })
    });
  });

  describe("GET validateUser", () => {
    describe("when is a valid user", () => {
      it("return a user with valid email", async() => {
        const res = await request(app).get('/users/validate-user').query({type: "email", value: "jon_snow@example.com"});

        expect(res.status).toBe(200);
        expect(res.body.result).toBe(true);
      });

      it("return a user with valid cpf", async() => {
        const res = await request(app).get('/users/validate-user').query({type: "cpf", value: "789.654.123-74"});

        expect(res.status).toBe(200);
        expect(res.body.result).toBe(true);
      });

      it("return a user with valid phone", async() => {
        const res = await request(app).get('/users/validate-user').query({type: "phoneNumber", value: "(21)96546-2232"});

        expect(res.status).toBe(200);
        expect(res.body.result).toBe(true);
      });
    });

    describe("when is a invalid user", () => {
      it("return error to invalid email", async() => {
        const user = await userFactory({});
        const res = await request(app).get('/users/validate-user').query({type: "email", value: user.email});

        expect(res.status).toBe(200);
        expect(res.body.result).toBe(false);
      });

      it("return error to invalid cpf", async() => {
        const user = await userFactory({});
        const res = await request(app).get('/users/validate-user').query({type: "cpf", value: user.cpf});

        expect(res.status).toBe(200);
        expect(res.body.result).toBe(false);
      });

      it("return error to invalid phone", async() => {
        const user = await userFactory({});
        const res = await request(app).get('/users/validate-user').query({type: "phoneNumber", value: user.phoneNumber});

        expect(res.status).toBe(200);
        expect(res.body.result).toBe(false);
      });
    });
  });

  describe("GET renewalToken", () => {
    it("return new token", async () => {
      const password = "123456789";
      const newUser = await userFactory({ password });
      const user = await new LoginUserService(newUser.email, password).run();

      const res = await request(app).get('/users/token-renewal').set({ "x-access-token": user.token });

      expect(res.status).toBe(200);
    });
  });

  describe("GET getCottonFlakes", () => {
    it("return cotton flakes from user", async () => {
      let user = await userFactory({ password: "12345678" });
      user = await new LoginUserService(user.email, "12345678").run();

      const res = await request(app).get('/users/get-cotton-flakes').set({ "x-access-token": user.token });

      expect(res.status).toBe(200);
      expect(user.cottonFlakes).toBe(res.body.cottonFlakes);
    });
  });

  describe("PUT update", () => {
    it("return user updated", async () => {
      let user = await userFactory({ password: "12345678" });
      user = await new LoginUserService(user.email, "12345678").run();

      const city = await cityFactory({});
      const newData = await userFactory({
        ...user,
        email: "novo@gmail.com",
        phoneNumber: "21999999999",
        additionalInformation: "Novas infos",
        cityId: city.id
      }, false);

      const res = await request(app).put(`/users/${user.id}`)
                                    .set({ "x-access-token": user.token })
                                    .send({ userNewData: newData });

      expect(res.status).toBe(200);
      expect(res.body.toString()).toEqual(newData.toString());
    });

    it("return error when email already exist", async () => {
      let user = await userFactory({ password: "12345678" });
      user = await new LoginUserService(user.email, "12345678").run();
      let user2 = await userFactory({ email: "novo@gmail.com" });

      const newData = await userFactory({
        ...user,
        email: user2.email
      }, false);

      const res = await request(app).put(`/users/${user.id}`)
                                    .set({ "x-access-token": user.token })
                                    .send({ userNewData: newData });

      expect(res.status).toBe(400);
      expect(res.body.message).toEqual(`Erro ao atualizar usuário: O email ${user2.email} já está em uso`);

    });

    it("return error when phone number already exist", async () => {
      let user = await userFactory({ password: "12345678" });
      user = await new LoginUserService(user.email, "12345678").run();
      let user2 = await userFactory({ phoneNumber: "21999999999" });

      const newData = await userFactory({
        ...user,
        phoneNumber: user2.phoneNumber
      }, false);

      const res = await request(app).put(`/users/${user.id}`)
                                    .set({ "x-access-token": user.token })
                                    .send({ userNewData: newData });

      expect(res.status).toBe(400);
      expect(res.body.message).toEqual(`Erro ao atualizar usuário: O número de telefone ${user2.phoneNumber} já está em uso`);
    });
  });

  describe("GET forgotPassword", () => {
    it("return success and create new verification code", async () => {
      let user = await userFactory();

      const res = await request(app).get(`/users/forgot-password/${user.id}`);

      const code = await codeRepository.findOne();

      expect(res.status).toBe(200);
      expect(code.userId).toBe(user.id);
    });
  });
});

