import { getCustomRepository } from "typeorm";
import connection from "../../database/connection";
import { State } from "../../model/state";
import { StateRepository } from "../../repository/state-repository";
import CreateService from "../../service/state/create-service";
import { cityFactory } from "../factories/city-factory";
import { stateFactory } from "../factories/state-factory";

describe("State", () => {
  let state01: State;
  let state02: State;
  let stateRepository: StateRepository;

  beforeAll(async () => {
    await connection.create();
    stateRepository = getCustomRepository(StateRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();

    state01 = await stateFactory('Paraná');
    state02 = await stateFactory('Rio de Janeiro');
  });

  describe("Create State", () => {
    it("create new State", async () => {
      let newState = { name: "Ceará", ibge: 123456 } as State;
      newState = await new CreateService(newState).run();

      expect(await stateRepository.findOne(newState.id)).toEqual(newState);
    });
  });

  describe("When state name already exists", () => {
    test("return throw exception", async() => {
      const stateFromDatabase = await stateRepository.findOne();

      const createState = async() => {
        let newState = { name: stateFromDatabase.name, ibge: 654123 } as State;
        newState = await new CreateService(newState).run();
      }

      await expect(async() => await createState())
      .rejects
      .toMatchObject({message: `O nome ${stateFromDatabase.name} já está em uso`})
    });
  })

  describe("When state ibge already exists", () => {
    test("return throw exception", async() => {
      const stateFromDatabase = await stateRepository.findOne();

      const createState = async() => {
        let newState = { name: 'novo nome', ibge: stateFromDatabase.ibge } as State;
        newState = await new CreateService(newState).run();
      }

      await expect(async() => await createState())
      .rejects
      .toMatchObject({message: `O identificador IBGE ${stateFromDatabase.ibge} já está em uso`})
    });
  })

  describe("Get states", () => {
    it("returns all state", async () => {
      const allStates = await stateRepository.find();

      expect(allStates).toContainEqual(state02);
      expect(allStates).toContainEqual(state01);
    });

    it("returns all cities of the state", async () => {
      const state = await stateRepository.findOne();
      const city01 = await cityFactory({ stateId: state.id });
      const city02 = await cityFactory({ name: 'Curitiba', ibge: 78945, stateId: state.id });

      const cities = (await stateRepository.findOne(state.id, { relations: ['cities'] })).cities
      expect(cities).toEqual([city01, city02]);
    });

    it("don't return non-state cities", async () => {
      const state01 = await stateFactory({});
      const state02 = await stateFactory({});
      const city02 = await cityFactory({ stateId: state02.id });
      await cityFactory({ stateId: state01.id });

      const cities = (await stateRepository.findOne(state01.id, { relations: ['cities'] })).cities
      expect(cities).not.toEqual([city02]);
    });
  });
})
