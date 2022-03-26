import { Role } from "../../model/role";
import { genericFactory } from "../utils/genericFactory";

export const roleFactory = async(name = 'user'):Promise<Role> => {
  const data = { name } as Role
  const role = await genericFactory(Role, data)

  return role as Role
}
