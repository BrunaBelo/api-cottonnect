import { City } from "../../model/city";
import { Factory } from "./typeorm-factory/Factory";

export const cityCuritiba = new Factory(City)
    .attr("id", "c4721895-d4a8-4162-9950-192fbcc98ad0")
    .attr("name", "Curitiba")
    .attr("ibge", 4106902)
    .attr("state_id", "")
