const TaskController = require("../Controllers/TaskController");
const express = require("express");
const router = express.Router();

// GET /api/tasks
router.get("/", TaskController.getAllTasks);
router.post("/", TaskController.createTask);
router.put("/:id", TaskController.updateTaskById);
router.delete("/:id", TaskController.deleteTaskById);
router.get("/:id", TaskController.getTaskById);
router.get("/search", TaskController.searchTasks);
router.get("/filter", TaskController.filterTasks);
router.get("/sort", TaskController.sortTasks);

module.exports = router;
