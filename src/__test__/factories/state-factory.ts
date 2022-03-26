import { State } from "../../model/state";
import { genericFactory } from "../utils/genericFactory";

export const stateFactory = async(name = 'Paraná', ibge = 12456): Promise<State> => {
  const data = { name, ibge } as State
  const state = await genericFactory(State, data)

  return state as State
}

