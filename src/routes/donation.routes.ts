import { Router } from "express";
import { DonationObjectController } from "../controller/donation-object-controller";
import { auth } from "../middleware/auth";

const donationRoutes = Router();
donationRoutes.post("/", auth, new DonationObjectController().create);

export { donationRoutes };
