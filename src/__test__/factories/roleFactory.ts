import { Factory } from "./typeorm-factory/Factory";
import { Role } from "../../model/role";

export const RoleAdmin = new Factory(Role)
    .attr("id", "0bffa21b-2d1b-4d19-94c6-33dc388c3158")
    .attr("name", "Admin");
