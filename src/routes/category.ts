import express, { Router } from "express";
import { createCategory, getAllCategory, deleteCategoryById }  from "../controllers/category.controller";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router: Router = express.Router();


router.get("/get-all",   jwtMiddleware, adminMiddleware, getAllCategory);
router.post("/", jwtMiddleware, adminMiddleware, createCategory);
router.delete('/:id', jwtMiddleware, adminMiddleware, deleteCategoryById);




export default router;

