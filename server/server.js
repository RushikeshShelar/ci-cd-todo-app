const express = require("express");
const cors = require("cors");
const app = express();
const todosRouter = require("./routes/todos");
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use("/todos", todosRouter);

// Export the app for testing purposes
module.exports = app;
