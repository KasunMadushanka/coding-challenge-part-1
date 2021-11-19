const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project"
	},
	description: {
		type: String,
		required: true,
	},
	isDone: {
		type: Boolean,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	dueDate: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model("Task", TaskSchema);
