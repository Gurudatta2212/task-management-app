import express from "express";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Add Task
router.post("/", addTask);

// Get All Tasks
router.get("/", getTasks);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

export default router;