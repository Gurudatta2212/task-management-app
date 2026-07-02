import Task from "../models/Task.js";

// Add Task
export const addTask = async (req, res) => {
  try {
    const { title, description, user } = req.body;

    if (!title || !user) {
      return res.status(400).json({
        success: false,
        message: "Title and user are required.",
      });
    }

    const task = await Task.create({
      title,
      description,
      user,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get All Tasks
export const getTasks = async (req, res) => {
  try {
    const { user } = req.query;

    const tasks = await Task.find({ user }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};