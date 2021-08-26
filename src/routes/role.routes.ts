import { Router } from "express";

import { RoleController } from "../controller/role-controller";

const roleRoutes = Router();
roleRoutes.post("/", new RoleController().create);

export { roleRoutes };
