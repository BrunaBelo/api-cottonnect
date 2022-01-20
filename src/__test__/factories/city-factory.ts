import { City } from "../../model/city";
import { Factory } from "./typeorm-factory/factory";
import faker from 'faker/locale/pt_BR';

export const cityCuritiba = new Factory(City)
  .attr("name", "Curitiba")
  .attr("ibge", 4106902)
  .attr("stateId", "")

export const cityGeneric = new Factory(City)
  .attr("name", "Metropolis")
  .attr("ibge", Math.round(Math.random()*100))
  .attr("stateId", "")
