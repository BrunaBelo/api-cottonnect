import { Router } from "express";

import { roleRoutes } from "./role.routes";
import { userRoutes } from "./user.routes";

const routers = Router();

routers.use("/roles", roleRoutes);
routers.use("/users", userRoutes);

export { routers };
