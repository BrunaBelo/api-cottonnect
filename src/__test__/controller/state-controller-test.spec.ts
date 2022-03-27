import request from 'supertest';
import connection from "../../database/connection";
import { app } from "../../server";
import { cityFactory } from '../factories/city-factory';
import { stateFactory } from '../factories/state-factory';

describe("State", () => {
  beforeAll(async() => {
    await connection.create();
  })

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  describe("GET #index", () => {
    it("return all states", async() => {
      const state01 = await stateFactory({});
      const state02 = await stateFactory({});

      const res = await request(app).get('/states');

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual([state01, state02].toString());
    });
  });

  describe("GET #getCitiesByStateId", () => {
    it("return all cities from a state", async() => {
      const state = await stateFactory({});
      const city01 = await cityFactory({ stateId: state.id });
      const city02 = await cityFactory({ stateId: state.id });

      const res = await request(app).get(`/states/${state.id}/cities`);

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual([city01, city02].toString());
    });

    it("dont return a city that is not from the state", async() => {
      const state01 = await stateFactory({});
      const state02 = await stateFactory({});

      const city01 = await cityFactory({ stateId: state01.id });
      const city02 = await cityFactory({ stateId: state02.id });

      const res = await request(app).get(`/states/${state01.id}/cities`);

      expect(res.status).toEqual(200);
      expect(res.body.toString()).toEqual(city01.toString());
      expect(JSON.stringify(res.body)).not.toContainEqual(JSON.stringify(city02));
    });
  });
});
