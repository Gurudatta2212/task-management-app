import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);

export default router;