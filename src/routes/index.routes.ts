import { Router } from "express";
import { cityRoutes } from "./city.routes";

import { roleRoutes } from "./role.routes";
import { stateRoutes } from "./state.routes";
import { userRoutes } from "./user.routes";

const routers = Router();

routers.use("/roles", roleRoutes);
routers.use("/users", userRoutes);
routers.use("/states", stateRoutes);
routers.use("/cities", cityRoutes);

export { routers };
