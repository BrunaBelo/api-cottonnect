import { Role } from "../model/Role";

interface IRolesRepository {
  create(name: string): Promise<Role>;
  findByName(name: string): Promise<Role>;
}

export { IRolesRepository };
