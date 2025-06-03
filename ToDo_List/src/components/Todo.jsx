import { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput("");
    }
  };
  const editTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    setEditId(id);
    setEditText(todo.text);
  };
  const saveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };
  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <div className="max-w-md w-full mx-auto mt-8 p-6 bg-gray-800/20 backdrop-blur-md border border-purple-700/50 rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
        Todo List
      </h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add new task..."
          className="flex-grow min-w-[200px] px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white placeholder-gray-400"
        />
        <button
          onClick={addTodo}
          className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex flex-wrap items-center gap-2 p-3 bg-gray-700/30 border border-gray-600/50 rounded-md"
          >
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow min-w-[150px] px-2 py-1 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-700 text-white"
                />
                <button
                  onClick={saveEdit}
                  className="px-3 py-1 bg-teal-700 text-white rounded hover:bg-teal-600 transition-colors text-sm"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-grow text-white min-w-[150px]">
                  {todo.text}
                </span>
                <button
                  onClick={() => editTodo(todo.id)}
                  className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-500 transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-3 py-1 bg-pink-700 text-white rounded hover:bg-pink-600 transition-colors text-sm"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No tasks yet.</p>
      )}
    </div>
  );
}

export default Todo;
