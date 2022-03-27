import { City } from "../../model/city";
import { genericFactory } from "../utils/genericFactory";
import { stateFactory } from "./state-factory";
import faker from 'faker/locale/pt_BR';

interface ICityData {
  name?: string,
  ibge?: number,
  stateId?: string
}

const randomIbge = ():number => Math.floor(Math.random()*10000)

export const cityFactory = async(cityData: ICityData, save = true): Promise<City> => {
  const defaultCity =  { name: faker.address.city(), ibge: randomIbge(), stateId: (await stateFactory({})).id };

  cityData = {
    ...defaultCity,
    ...cityData
  }

  const city = await genericFactory(City, cityData, save);
  return city as City;
}
