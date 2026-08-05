import express from "express";
import {login} from "../controllers/authController.js"

const router = express.Router();

router.post("/login",login);

// Future use
// router.post("/register", register);

export default router;