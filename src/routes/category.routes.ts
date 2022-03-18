import { Router } from "express";
import { CategoryController } from "../controller/category-controller";
import { auth } from "../middleware/auth";

const categoryRoutes = Router();
categoryRoutes.get("/", auth, new CategoryController().getAll);

export { categoryRoutes };

