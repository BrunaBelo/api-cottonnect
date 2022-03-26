import { City } from "../../model/city";
import { genericFactory } from "../utils/genericFactory";
import { stateFactory } from "./state-factory";

interface ICityData {
  name?: string,
  ibge?: number,
  stateId?: string
}

const defaultCity =  { name: 'Prudentópolis', ibge: 1477, stateId: null };

export const cityFactory = async(cityData = defaultCity as ICityData): Promise<City> => {
  if(!cityData.stateId){
    const state = await stateFactory();
    cityData.stateId = state.id;
  }

  cityData = {
    ...defaultCity,
    ...cityData
  }

  const city = await genericFactory(City, cityData);
  return city as City;
}
