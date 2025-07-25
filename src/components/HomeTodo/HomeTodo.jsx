import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeTodo() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Toggle theme and store it
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // On initial load, apply saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Sync document class with theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Load todos of current user
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === currentUser?.email);
    if (user) setTodos(user.todos || []);
  }, []);

  // Save todos for current user
  const saveTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === currentUser.email ? { ...u, todos: updatedTodos } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleAddOrUpdate = () => {
    if (!todoText.trim()) return;

    if (editId !== null) {
      const updated = todos.map((todo) =>
        todo.id === editId ? { ...todo, text: todoText } : todo
      );
      saveTodos(updated);
      setEditId(null);
    } else {
      const newTodo = { id: Date.now(), text: todoText };
      saveTodos([newTodo, ...todos]);
    }
    setTodoText("");
  };

  const handleEdit = (id) => {
    const todo = todos.find((t) => t.id === id);
    setTodoText(todo.text);
    setEditId(id);
  };

  const handleDelete = (id) => {
    const filtered = todos.filter((t) => t.id !== id);
    saveTodos(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Welcome, {currentUser?.name || "User"} 👋
          </h1>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
            >
              {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Input and Add/Update */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Enter todo..."
            className={`w-full px-4 py-2 border rounded shadow-sm
              ${
                theme === "dark"
                  ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                  : "bg-white text-black placeholder-gray-500 border-gray-300"
              }`}
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex justify-between items-center px-4 py-3 rounded shadow
                ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }`}
            >
              <span className="flex-1">{todo.text}</span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(todo.id)} title="Edit">
                  ✏️
                </button>
                <button onClick={() => handleDelete(todo.id)} title="Delete">
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
