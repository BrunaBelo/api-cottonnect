import { City } from "../../model/city";
import { Factory } from "./typeorm-factory/factory";
import faker from 'faker/locale/pt_BR';

export const cityCuritiba = new Factory(City)
  .attr("id", faker.datatype.uuid())
  .attr("name", "Curitiba")
  .attr("ibge", 4106902)
  .attr("stateId", "")
