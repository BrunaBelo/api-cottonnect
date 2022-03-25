import { Router } from "express";
import { UserController } from "../controller/user-controller";
import { auth } from "../middleware/auth";

const userRoutes = Router();

userRoutes.post("/", new UserController().create);
userRoutes.post("/login", new UserController().login);
userRoutes.get("/validate-user", new UserController().validateUser);
userRoutes.get("/token-renewal", auth, new UserController().tokenRenewal);

export { userRoutes };
