import { Router } from "express";

import { roleRoutes } from "./role.routes";
import { userRoutes } from "./user.routes";
import { stateRoutes } from "./state.routes";
import { cityRoutes } from "./city.routes";
import { categoryRoutes } from "./category.routes";
import { donationRoutes } from "./donation.routes";
import { auctionRoutes } from "./auction.routes";

const routers = Router();

routers.use("/roles", roleRoutes);
routers.use("/users", userRoutes);
routers.use("/states", stateRoutes);
routers.use("/cities", cityRoutes);
routers.use("/categories", categoryRoutes);
routers.use("/donations", donationRoutes);
routers.use("/auctions", auctionRoutes);

export { routers };
