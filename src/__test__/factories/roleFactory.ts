import { Factory } from "./typeorm-factory/Factory";
import { Role } from "../../model/role";
import faker from 'faker/locale/pt_BR';

export const roleAdmin = new Factory(Role)
    .attr("id", faker.datatype.uuid())
    .attr("name", "Admin")
