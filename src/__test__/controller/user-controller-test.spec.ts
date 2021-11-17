import request from 'supertest'
import { app } from '../../../src/server'
import connection from '../../database/connection';
import { User } from '../../model/user';
import { cityCuritiba } from '../factories/city-factory';
import { roleAdmin } from '../factories/role-factory';
import { stateParana } from '../factories/state-factory';
import { user01 } from '../factories/user-factory';

describe("User", () => {
  let user: User;

  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    const city = await cityCuritiba.create({ stateId: (await stateParana.create()).id });
    user = user01.build({ roleId: (await roleAdmin.create()).id, cityId: city.id });
  });

  describe("POST User", () => {
    it("returns 201 to valid response", async () => {
      const res = await request(app).post('/users/').send(user)
      expect(res.status).toEqual(201)
    });
  });
});
