import { Router } from "express";
import { CityController } from "../controller/city-controller";

const cityRoutes = Router();
cityRoutes.post("/", new CityController().create);

export { cityRoutes };
