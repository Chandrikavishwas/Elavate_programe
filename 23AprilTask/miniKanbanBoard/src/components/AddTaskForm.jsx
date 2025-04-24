import React, { useState } from "react";

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="border p-1 mr-2"
        data-testid="add-task-input"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="border p-1"
        data-testid="add-task-button"
      >
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
