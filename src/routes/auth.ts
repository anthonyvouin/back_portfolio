import express, { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { jwtMiddleware } from "../middleware/jwtMiddleware";


const router: Router = express.Router();

router.post("/register",registerUser );
router.post("/login",loginUser );


export default router;


