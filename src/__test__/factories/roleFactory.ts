import { factory } from "factory-girl";
import { Role } from "../../model/role";

factory.define('roleAdmin', Role, {
    id: "0bffa21b-2d1b-4d19-94c6-33dc388c3158",
    name: "Admin",
});
