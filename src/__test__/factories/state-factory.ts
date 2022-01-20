import { State } from "../../model/state";
import { Factory } from "./typeorm-factory/factory";
import faker from 'faker/locale/pt_BR';

export const stateParana = new Factory(State)
    .attr("ibge", 41)
    .attr("name", "Paraná")

export const stateGeneric = new Factory(State)
    .attr("ibge", Math.round(Math.random()*100))
    .attr("name", "Gothan")
