import { Router } from "express";

import { RoleController } from "../controller/role";

const roleRoutes = Router();
roleRoutes.post("/", new RoleController().create);

export { roleRoutes };
