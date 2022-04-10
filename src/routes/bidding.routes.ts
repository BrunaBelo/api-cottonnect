import { Router } from "express";
import { BiddingController } from "../controller/bidding-controller";
import { auth } from "../middleware/auth";

const biddingRoutes = Router();

biddingRoutes.post("/", auth, new BiddingController().create);
biddingRoutes.get("/find-bidding", auth, new BiddingController().getBiddingFromUser);
biddingRoutes.get("/get-winner", auth, new BiddingController().getWinner);

export { biddingRoutes };
