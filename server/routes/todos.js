const express = require("express");
const router = express.Router();

let todos = [
    { id: 1, task: "Learn CI/CD" },
    { id: 2, task: "Push to GitHub" },
];

// Get all todos
router.get("/", (req, res) => {
    res.json(todos);
});

// Add a new todo
router.post("/", (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(300).json({ error: "Task is required" });
    }
    const newTodo = { id: Date.now(), task };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Delete a todo
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter((todo) => todo.id !== id);
    res.status(204).send();
});

module.exports = router;
