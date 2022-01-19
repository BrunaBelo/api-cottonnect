import request from 'supertest'
import connection from "../../database/connection";
import { State } from '../../model/state';
import { app } from "../../server";
import { stateParana } from '../factories/state-factory';

describe("State", () => {
  let states: State[]

  beforeAll(async() => {
    await connection.create();
  })

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    states = await stateParana.createList(1)
  });

  describe("GET #index", () => {
    it("return all states", async() => {
      const res = await request(app).get('/states')
      expect(res.status).toEqual(200)
      expect(res.body).toMatchObject(JSON.parse(JSON.stringify(states)))
    })
  })
})