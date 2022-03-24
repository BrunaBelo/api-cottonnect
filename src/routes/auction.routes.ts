import { Router } from "express";
import { AuctionController } from "../controller/auction-controller";
import { auth } from "../middleware/auth";

const auctionRoutes = Router();
auctionRoutes.get("/:id", auth, new AuctionController().findAuction);

export { auctionRoutes };
