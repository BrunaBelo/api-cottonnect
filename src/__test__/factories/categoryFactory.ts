import { Category } from "../../model/category";
import { Factory } from "./typeorm-factory/Factory";
import faker from 'faker/locale/pt_BR';

export const category01 = new Factory(Category)
    .attr("id", faker.datatype.uuid())
    .attr("name", faker.lorem.word())
