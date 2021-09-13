import { Router } from "express";
import { RoleController } from "../controller/role-controller";
import { auth } from "../middleware/auth";

const roleRoutes = Router();
roleRoutes.post("/", auth, new RoleController().create);

export { roleRoutes };
