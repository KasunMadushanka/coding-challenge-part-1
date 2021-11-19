const express = require("express");
const app = express();
const config = require("./config/config");
const mongodb = require("./config/db");
const tasks = require("./routes/tasks");
const projects = require("./routes/projects");

app.use(express.json());
app.use("/todo", tasks);
app.use("/projects", projects);

// Error handling middleware
app.use((error, req, res, next) => {
	res.status(error.status || 500).send({
		error: {
			status: error.status || 500,
			message: error.message || "Internal Server Error",
		},
	});
});

// Intialize MongoDB connection
mongodb
	.connectDb()
	.then(() => {
		console.log("MongoDB connected");

		app.listen(config.port, (error) => {
			if (error) {
				return console.log("error: ", error);
			}
			console.log(`ToDoApp listening on port ${config.port}`);
		});
	})
	.catch((error) => console.log(error));
