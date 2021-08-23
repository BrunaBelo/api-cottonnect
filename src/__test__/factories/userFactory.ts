import { User } from "../../model/user";
import { Factory } from "./typeorm-factory/Factory";

export const user01 = new Factory(User)
    .attr("id", "7be51fd0-6192-42bc-864c-dc48d873d22c")
    .attr("name", "User 01")
    .attr("email", "user01@gmail.com")
    .attr("password", "1234")
    .attr("phone_number", "4299999999")
    .attr("birth_day", new Date())
    .attr("phone_verified", true)
    .attr("additional_information", "")
    .attr("city_id", "")
    .attr("role_id", "")
