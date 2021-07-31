import { Router } from "express";

import { roleRoutes } from "./roles.routes";

const routers = Router();

routers.use("/roles", roleRoutes);
export { routers };
