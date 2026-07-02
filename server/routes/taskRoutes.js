import express from "express";
import { addTask, getTasks } from "../controllers/taskController.js";

const router = express.Router();

// Add Task
router.post("/", addTask);

// Get All Tasks
router.get("/", getTasks);

export default router;