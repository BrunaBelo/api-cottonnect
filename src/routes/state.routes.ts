import { Router } from "express";
import { StateController } from "../controller/state-controller";
import { auth } from "../middleware/auth";

const stateRoutes = Router();

stateRoutes.post("/", auth, new StateController().create);
stateRoutes.get("/", new StateController().index);
stateRoutes.get("/:stateId/cities", new StateController().getCitiesByStateId)

export { stateRoutes };
