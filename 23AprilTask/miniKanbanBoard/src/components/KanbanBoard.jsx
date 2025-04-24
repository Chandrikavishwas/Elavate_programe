import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import AddTaskForm from './AddTaskForm';
import { columns as initialColumns } from '../data/initialData';

const KanbanBoard = () => {
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem('kanbanColumns');
    return savedColumns ? JSON.parse(savedColumns) : initialColumns;
  });

  useEffect(() => {
    localStorage.setItem('kanbanColumns', JSON.stringify(columns));
  }, [columns]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const newTasks = Array.from(sourceColumn.tasks);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: newTasks,
        },
      });
    } else {
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedTask);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks,
        },
      });
    }
  };

  const handleAddTask = (title) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title,
    };

    setColumns({
      ...columns,
      'column-1': {
        ...columns['column-1'],
        tasks: [...columns['column-1'].tasks, newTask],
      },
    });
  };

  const handleUpdateTask = (columnId, taskId, newTitle) => {
    const column = columns[columnId];
    const updatedTasks = column.tasks.map(task => 
      task.id === taskId ? { ...task, title: newTitle } : task
    );

    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        tasks: updatedTasks,
      },
    });
  };

  return (
    <div>
      <AddTaskForm onAddTask={handleAddTask} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <Column
              key={columnId}
              columnId={columnId}
              title={column.title}
              tasks={column.tasks}
              onUpdateTask={(taskId, newTitle) => handleUpdateTask(columnId, taskId, newTitle)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;