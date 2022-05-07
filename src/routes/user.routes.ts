import { Router } from "express";
import { UserController } from "../controller/user-controller";
import { auth } from "../middleware/auth";

const userRoutes = Router();

userRoutes.post("/", new UserController().create);
userRoutes.get("/confirm-account", new UserController().confirmAccount);
userRoutes.post("/login", new UserController().login);
userRoutes.get("/validate-user", new UserController().validateUser);
userRoutes.get("/confirm-phone-number", new UserController().confirmPhoneAccount);
userRoutes.get("/resend-code-verification-phone", new UserController().resendCodeConfirmPhone);
userRoutes.get("/forgot-account/:email", new UserController().forgotPassword);
userRoutes.post("/change-password", new UserController().changePassword);
userRoutes.get("/token-renewal", auth, new UserController().tokenRenewal);
userRoutes.get("/get-cotton-flakes", auth, new UserController().getCottonFlakes);
userRoutes.get("/:id", auth, new UserController().findUser);
userRoutes.put("/:id", auth, new UserController().update);

export { userRoutes };
