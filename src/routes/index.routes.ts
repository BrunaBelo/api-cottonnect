import { Router } from "express";

import { roleRoutes } from "./role.routes";
import { userRoutes } from "./user.routes";
import { stateRoutes } from "./state.routes";
import { cityRoutes } from "./city.routes";
import { donationCategoryRoutes } from "./donation-category.routes";

const routers = Router();

routers.use("/roles", roleRoutes);
routers.use("/users", userRoutes);
routers.use("/states", stateRoutes);
routers.use("/cities", cityRoutes);
routers.use("/donation-categories", donationCategoryRoutes);

export { routers };
