import React, { useState, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ task, index, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      onUpdateTask(task.id, editedTitle);
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border p-2 mb-2 bg-white"
          onDoubleClick={() => setIsEditing(true)}
        >
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleSubmit}
                className="w-full"
                data-testid="edit-task-input"
              />
            </form>
          ) : (
            <div>{task.title}</div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;