import express, { Router } from "express";
import { createProjet}  from "../controllers/projet.controller";
import upload from "../../config/multer.config";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router: Router = express.Router();



router.post("/",  upload.single('image'), jwtMiddleware, adminMiddleware, createProjet);


export default router;

