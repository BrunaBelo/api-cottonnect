import { Router } from "express";
import multer from "multer";
import { AuctionController } from "../controller/auction-controller";
import { auth } from "../middleware/auth";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

const auctionRoutes = Router();

auctionRoutes.post("/", auth, upload.array('photos'), new AuctionController().create);
auctionRoutes.get("/", auth, new AuctionController().getAuctions);
auctionRoutes.get("/donated", auth, new AuctionController().getAuctionsDonated);
auctionRoutes.get("/won", auth, new AuctionController().getAuctionsWon);
auctionRoutes.get("/participating", auth, new AuctionController().getAuctionsParticipating);
auctionRoutes.get("/:id", auth, new AuctionController().findAuction);
auctionRoutes.get("/reject/:id", auth, new AuctionController().rejectAuction);
auctionRoutes.get("/accept/:id", auth, new AuctionController().acceptAuction);
auctionRoutes.get("/reactivate/:id", auth, new AuctionController().reactiveAuction);

export { auctionRoutes };
