import { State } from "../../model/state";
import { genericFactory } from "../utils/genericFactory";
import faker from 'faker/locale/pt_BR';

const randomIbge = ():number => Math.floor(Math.random()*10000)

export const stateFactory = async(stateData, save = true): Promise<State> => {
  const defaultState = { name: faker.address.state(), ibge: randomIbge() } as State
  stateData = {
    ...defaultState,
    ...stateData
  }

  const state = await genericFactory(State, stateData, save)

  return state as State
}
