import request from 'supertest';
import connection from "../../database/connection";
import LoginUserService from '../../service/user/login-user-service';
import { User } from '../../model/user';
import { app } from "../../server";
import { donationFactory } from '../factories/donation-object-factory';
import { userFactory } from '../factories/user-factory';

describe("Donation Object", () => {
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

  describe("POST #create", () => {
    it("create new donation", async() => {
      let donation = await donationFactory({}, false);

      const res = await request(app).post('/donations')
                                    .set({ "x-access-token": user.token })
                                    .send({ ...donation, closingDate: new Date() });

      expect(res.status).toEqual(201);
      expect(res.body.toString()).toEqual([donation].toString());
    });

    it("don't create new donation when attrs is missing", async() => {
      let donation = await donationFactory({}, false);

      const res = await request(app).post('/donations')
                                    .set({ "x-access-token": user.token })
                                    .send(donation);

      expect(res.status).toEqual(400);
      expect(res.body.message).toContain("Erro ao criar doação");
    });
  });
});
