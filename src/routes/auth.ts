import express, { Router } from "express";
import { registerUser, loginUser, logoutUser, deleteUser, updateUser} from "../controllers/auth.controller";
import { jwtMiddleware } from "../middleware/jwtMiddleware";



const router: Router = express.Router();

router.post("/register",registerUser );
router.post("/login",loginUser );
router.post("/logout",jwtMiddleware, logoutUser);
router.delete("/delete-account",jwtMiddleware, deleteUser);
router.put("/update-account",jwtMiddleware, updateUser);


export default router;


