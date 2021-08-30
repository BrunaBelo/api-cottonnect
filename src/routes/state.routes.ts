import { Router } from "express";
import { StateController } from "../controller/state-controller";

const stateRoutes = Router();
stateRoutes.post("/", new StateController().create);

export { stateRoutes };
