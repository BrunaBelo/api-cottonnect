import { Router } from "express";

import { roleRoutes } from "./role.routes";

const routers = Router();

routers.use("/roles", roleRoutes);
export { routers };
