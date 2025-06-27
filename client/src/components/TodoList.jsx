import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API = `${API_BASE}/todos`;

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        axios.get(API).then((res) => setTodos(res.data));
    }, []);

    const addTodo = async () => {
        if (!task.trim()) return;
        const res = await axios.post(API, { task });
        setTodos([...todos, res.data]);
        setTask("");
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${API}/${id}`);
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div>
            <input
                type="text"
                value={task}
                placeholder="New task..."
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.task}
                        <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: "1rem" }}>
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
