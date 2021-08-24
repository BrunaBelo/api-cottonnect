import { State } from "../../model/state";
import { Factory } from "./typeorm-factory/factory";
import faker from 'faker/locale/pt_BR';

export const stateParana = new Factory(State)
    .attr("id", faker.datatype.uuid())
    .attr("ibge", 41)
    .attr("name", "Paraná")
