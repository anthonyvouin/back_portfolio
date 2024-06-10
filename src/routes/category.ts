import express, { Router } from "express";
import { createCategory }  from "../controllers/category.controller";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router: Router = express.Router();

router.post("/", createCategory, jwtMiddleware, adminMiddleware,);


export default router;

