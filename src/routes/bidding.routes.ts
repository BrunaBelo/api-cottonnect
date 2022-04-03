import { Router } from "express";
import { BiddingController } from "../controller/bidding-controller";
import { auth } from "../middleware/auth";

const biddingRoutes = Router();

biddingRoutes.post("/", auth, new BiddingController().create);

export { biddingRoutes };
