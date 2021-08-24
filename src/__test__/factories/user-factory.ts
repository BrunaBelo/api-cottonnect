import { User } from "../../model/user";
import { Factory } from "./typeorm-factory/factory";
import faker from 'faker/locale/pt_BR';

export const user01 = new Factory(User)
    .attr("id", faker.datatype.uuid())
    .attr("name", faker.name.findName())
    .attr("email", faker.internet.email())
    .attr("password", faker.internet.password())
    .attr("phone_number", faker.phone.phoneNumber())
    .attr("birth_day", faker.date.past())
    .attr("phone_verified", true)
    .attr("additional_information", faker.lorem.paragraph())
    .attr("city_id", "")
    .attr("role_id", "")
