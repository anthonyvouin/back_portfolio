import express, { Router } from "express";
import testController from "../controllers/test.controller";


const router: Router = express.Router();

router.get("/test", testController);


export default router;


