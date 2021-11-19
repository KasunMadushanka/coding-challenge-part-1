const mongoose = require("mongoose");
const config = {
	host: "127.0.0.1",
	port: "27017",
	db: "todoList",
};

const connectDb = () => {
	return mongoose.connect(
		`mongodb://${config.host}:${config.port}/${config.db}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);
};

module.exports = { connectDb };
