// Imports
const express = require("express");

// Controllers imports
const mainController = require("./controllers/mainController");

// Router
const router = express.Router();

// Routes
router.get("/", mainController.renderHomePage);
router.get("/api/title", mainController.getBoardTitle);
router.post("/api/title", mainController.changeBoardTitle);
router.get("/api/tasks", mainController.getTasks);
router.post("/api/tasks", mainController.createTask);
router.delete("/api/tasks", mainController.deleteTask);

// Exports
module.exports = router;
