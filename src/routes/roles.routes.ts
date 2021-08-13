import { Router } from "express";

import { RoleController } from "../controller/roleController";

const roleRoutes = Router();
roleRoutes.post("/", new RoleController().create);

export { roleRoutes };
