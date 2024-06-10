import express, { Router } from "express";
import { createProjet}  from "../controllers/projet.controller";


const router: Router = express.Router();

router.post("/", createProjet);


export default router;

