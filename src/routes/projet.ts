import express, { Router } from "express";
import { createProjet, getAllProjets}  from "../controllers/projet.controller";
import upload from "../config/multer.config";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { validateProjetData } from "../middleware/validateProjetDataMiddleware";


const router: Router = express.Router();



router.post("/",  upload.single('image'),  validateProjetData, jwtMiddleware, adminMiddleware, createProjet);
router.get("/get-all-projets",  getAllProjets);


export default router;

