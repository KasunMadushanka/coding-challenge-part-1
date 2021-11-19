const express = require("express");
const router = express.Router();

const TaskModel = require("../models/task");

// Create a task
router.post("/", async (req, res, next) => {
	const task = new TaskModel(req.body);

	try {
		const result = await task.save();
		res.send(result);
	} catch (error) {
		next(error);
	}
});

// List all tasks
router.get("/", async (req, res, next) => {
	try {
		const tasks = await TaskModel.find();
		res.send(tasks);
	} catch (error) {
		next(error);
	}
});

// Edit a task
router.put("/:id", async (req, res, next) => {
	try {
		const task = await TaskModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.send(task);
	} catch (error) {
		next(error);
	}
});

// Delete a task
router.delete("/:id", async (req, res, next) => {
	try {
		await TaskModel.findByIdAndDelete(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

// Mark a task as todo/done
router.put("/done/:id", async (req, res, next) => {
	try {
		const task = await TaskModel.findByIdAndUpdate(
			req.params.id,
			{ isDone: true },
			{ new: true }
		);
		res.send(task);
	} catch (error) {
		next(error);
	}
});

// Filter tasks by status
router.get("/by-status", async (req, res, next) => {
	try {
		const tasksByStatus = await TaskModel.find({
			isDone: req.query.isDone,
		});
		res.send(tasksByStatus);
	} catch (error) {
		next(error);
	}
});

// Sort tasks by start date
router.get("/sorted-by-start-date", async (req, res, next) => {
	try {
		const tasksSorted = await TaskModel.find().sort({ startDate: "asc" });
		res.send(tasksSorted);
	} catch (error) {
		next(error);
	}
});

// Sort tasks by due date
router.get("/sorted-by-due-date", async (req, res, next) => {
	try {
		const tasksSorted = await TaskModel.find().sort({ dueDate: "asc" });
		res.send(tasksSorted);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
