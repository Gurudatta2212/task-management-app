import express from "express";
import { registerUser } from "../controllers/authController.js";

console.log("authRoutes.js Loaded");

const router = express.Router();

router.post("/register", registerUser);

export default router;