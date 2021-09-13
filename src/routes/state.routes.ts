import { Router } from "express";
import { StateController } from "../controller/state-controller";
import { auth } from "../middleware/auth";

const stateRoutes = Router();
stateRoutes.post("/", auth, new StateController().create);

export { stateRoutes };
