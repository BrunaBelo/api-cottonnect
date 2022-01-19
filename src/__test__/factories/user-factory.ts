import { User } from "../../model/user";
import { Factory } from "./typeorm-factory/factory";
import faker from 'faker/locale/pt_BR';

export const user01 = new Factory(User)
    .attr("id", faker.datatype.uuid())
    .attr("name", faker.name.findName())
    .attr("email", faker.internet.email())
    .attr("password", faker.internet.password())
    .attr("phoneNumber", faker.phone.phoneNumber())
    .attr("cpf", "124.264.242-06")
    .attr("phoneVerified", true)
    .attr("additionalInformation", faker.lorem.paragraph())
    .attr("cityId", "")
    .attr("roleId", "")
