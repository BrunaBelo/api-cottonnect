import { getRepository } from "typeorm";
import { City } from "../../model/city";
import { State } from "../../model/state";
import { stateParana } from "./stateFactory";

export const cityCuritiba: City = {
    id: "c4721895-d4a8-4162-9950-192fbcc98ad0",
    name: "Curitiba",
    ibge: 4106902,
    state_id: ""
}
