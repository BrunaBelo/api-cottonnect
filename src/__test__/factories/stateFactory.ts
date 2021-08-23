import { State } from "../../model/state";
import { Factory } from "./typeorm-factory/Factory";

export const stateParana = new Factory(State)
    .attr("id", "729b3cc8-1088-4f88-a08b-5a40ec913ce4")
    .attr("ibge", 41)
    .attr("name", "Paraná")
