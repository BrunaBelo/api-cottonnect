import { Router } from "express";
import { DonationObjectController } from "../controller/donation-object-controller";
import { auth } from "../middleware/auth";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

const donationRoutes = Router();

export { donationRoutes };
