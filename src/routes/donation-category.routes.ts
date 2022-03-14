import { Router } from "express";
import { CategoryController } from "../controller/category-controller";
import { auth } from "../middleware/auth";

const donationCategoryRoutes = Router();
donationCategoryRoutes.get("/", auth, new CategoryController().getAll);

export { donationCategoryRoutes };
