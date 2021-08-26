import { Router } from "express";
import { UserController } from "../controller/user-controller";

const userRoutes = Router();

userRoutes.post("/register", new UserController().create);
userRoutes.post("/login", new UserController().login);

export { userRoutes };
