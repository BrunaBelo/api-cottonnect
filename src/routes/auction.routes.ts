import { Router } from "express";
import multer from "multer";
import { AuctionController } from "../controller/auction-controller";
import { auth } from "../middleware/auth";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

const auctionRoutes = Router();

auctionRoutes.post("/", auth, upload.array('photos'), new AuctionController().create);
auctionRoutes.get("/:id", auth, new AuctionController().findAuction);

export { auctionRoutes };
