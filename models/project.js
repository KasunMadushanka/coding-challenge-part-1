const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task"
		},
	],
	startDate: {
		type: Date,
		required: true,
	},
	dueDate: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model("Project", ProjectSchema);
