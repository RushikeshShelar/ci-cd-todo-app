const express = require("express");
const cors = require("cors");
const app = express();
const todosRouter = require("./routes/todos");
const mongoose = require('mongoose');

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use("/todos", todosRouter);

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected ✅'))
    .catch(err => console.error('MongoDB connection failed ❌', err));


// Export the app for testing purposes
module.exports = app;
