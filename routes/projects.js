const express = require("express");
const router = express.Router();

const Task = require("../models/task");
const Project = require("../models/project");

// Create a project
router.post("/", async (req, res, next) => {
	const project = new Project(req.body);

	try {
		const result = await project.save();
		res.send(result);
	} catch (error) {
		next(error);
	}
});

// List all projects
router.get("/", async (req, res, next) => {
	try {
		const projects = await Project.find().populate("tasks");
		res.send(projects);
	} catch (error) {
		next(error);
	}
});

// Edit a project
router.put("/:id", async (req, res, next) => {
	try {
		const project = await Project.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.send(project);
	} catch (error) {
		next(error);
	}
});

// Delete a project
router.delete("/:id", async (req, res, next) => {
	try {
		await Project.findByIdAndDelete(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

// Assign a task to a project
router.put("/:id/assign", async (req, res, next) => {
	try {
		const project = await Project.findByIdAndUpdate(
			req.params.id,
			{
				$push: { tasks: req.body.taskId },
			},
			{
				new: true,
			}
		).populate("tasks");
		await Task.findByIdAndUpdate(req.body.taskId, {
			project: req.params.id,
		});
		res.send(project);
	} catch (error) {
		next(error);
	}
});

// Filter tasks by project name
router.get("/:name/tasks", async (req, res, next) => {
	try {
		const project = await Project.findOne({
			name: req.params.name,
		}).populate("tasks");
		
		if (project) {
			res.send(project.tasks);
		} else {
			res.send([]);
		}
	} catch (error) {
		next(error);
	}
});

// Sort projects by start date
router.get("/sorted-by-start-date", async (req, res, next) => {
	try {
		const projectsSorted = await Project.find()
			.sort({
				startDate: "asc",
			})
			.populate("tasks");
		res.send(projectsSorted);
	} catch (error) {
		next(error);
	}
});

// Sort projects by due date
router.get("/sorted-by-due-date", async (req, res, next) => {
	try {
		const projectsSorted = await Project.find()
			.sort({
				dueDate: "asc",
			})
			.populate("tasks");
		res.send(projectsSorted);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
