import { Router } from "express";
import { UserController } from "../controller/user-controller";
import { auth } from "../middleware/auth";

const userRoutes = Router();

userRoutes.post("/", auth, new UserController().create);
userRoutes.post("/login", auth, new UserController().login);

export { userRoutes };
