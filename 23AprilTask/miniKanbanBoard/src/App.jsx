import React from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Mini Kanban Board</h1>
      <KanbanBoard />
      <p className="text-sm mt-4">Changes are saved to localStorage</p>
    </div>
  );
}

export default App;