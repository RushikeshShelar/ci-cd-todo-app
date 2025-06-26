import React from "react";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", width: "50vw", margin: "auto" }}>
      <h2>📝 CI/CD Todo App</h2>
      <TodoList />
    </div>
  );
}

export default App;
