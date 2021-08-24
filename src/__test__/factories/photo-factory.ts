import { Photo } from "../../model/photo";
import { Factory } from "./typeorm-factory/factory";
import faker from 'faker/locale/pt_BR';

export const photo01 = new Factory(Photo)
    .attr("id", faker.datatype.uuid())
    .attr("name", "photo01")
    .attr("type", ".png")
    .attr("uri", "/upload/photo01.png")
    .attr("donation_object_id", "")
