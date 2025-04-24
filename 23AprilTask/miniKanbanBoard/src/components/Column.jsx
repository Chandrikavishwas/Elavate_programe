import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const Column = ({ columnId, title, tasks, onUpdateTask }) => {
  return (
    <div className="border p-2">
      <div className="mb-2">
        <h2>{title} ({tasks.length})</h2>
      </div>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px]"
          >
            {tasks.map((task, index) => (
              <Card 
                key={task.id} 
                task={task} 
                index={index} 
                onUpdateTask={onUpdateTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;