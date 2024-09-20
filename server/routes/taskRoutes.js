const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");

// GET all tasks (only for logged-in users)
router.get("/", protect, taskController.getTasks);

// POST a new task (only for logged-in users)
router.post("/", protect, taskController.createTask);

// PUT (update) a task by ID (only for logged-in users)
router.put("/:id", protect, taskController.updateTask);

// DELETE a task by ID (only for logged-in users)
router.delete("/:id", protect, taskController.deleteTask);

module.exports = router;
