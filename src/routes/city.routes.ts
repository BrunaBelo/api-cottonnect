import { Router } from "express";
import { CityController } from "../controller/city-controller";
import { auth } from "../middleware/auth";

const cityRoutes = Router();

cityRoutes.post("/", auth, new CityController().create);

export { cityRoutes };
