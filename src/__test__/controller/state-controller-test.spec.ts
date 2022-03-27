import request from 'supertest'
import connection from "../../database/connection";
import { City } from '../../model/city';
import { State } from '../../model/state';
import { app } from "../../server";
import { cityCuritiba, cityGeneric } from '../factories/city-factory';
import { stateGeneric } from '../factories/state-factory';

describe("State", () => {
  let states: State[]
  let city1: City
  let city2: City

  beforeAll(async() => {
    await connection.create();
  })

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
    states = await stateGeneric.createList(2)
    city1 =  await cityCuritiba.create({stateId: states[0].id})
    city2 =  await cityGeneric.create({stateId: states[1].id})
  });

  describe("GET #index", () => {
    it("return all states", async() => {
      const res = await request(app).get('/states')
      expect(res.status).toEqual(200)
      expect(res.body).toMatchObject(JSON.parse(JSON.stringify(states)))
    })
  })

  describe("GET #getCitiesByStateId", () => {

    it("return all cities from a state", async() => {
      const res = await request(app).get(`/states/${states[0].id}/cities`)
      expect(res.status).toEqual(200)
      expect(res.body).toContainEqual(JSON.parse(JSON.stringify(city1)))
    })

    it("dont return a city that is not from the state", async() => {
      const res = await request(app).get(`/states/${states[0].id}/cities`)
      expect(res.status).toEqual(200)
      expect(res.body).toContainEqual(JSON.parse(JSON.stringify(city1)))
      expect(res.body).not.toContainEqual(JSON.parse(JSON.stringify(city2)))
    })
  })
})
