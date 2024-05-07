import express, { Router } from "express";
import admin  from "../controllers/admin.controller";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";



const router: Router = express.Router();

router.get("/dashboard", jwtMiddleware, adminMiddleware, admin);


export default router;

