import request from 'supertest';
import connection from "../../database/connection";
import { User } from '../../model/user';
import { app } from "../../server";
import LoginUserService from '../../service/user/login-user-service';
import { categoryFactory } from '../factories/category-factory';
import { userFactory } from '../factories/user-factory';

describe("category", () => {
  let user: User;

  beforeAll(async() => {
    await connection.create();
  })

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    user = await userFactory({ password: "12345678" });
    user = await new LoginUserService(user.email, "12345678").run();
  });

  describe("GET #getAll", () => {
    it("return all categories", async() => {
      const category01 = await categoryFactory({});
      const category02 = await categoryFactory({});

      const res = await request(app).get('/categories').set({ "x-access-token": user.token });

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual([category01, category02].toString());
    });
  });
});
