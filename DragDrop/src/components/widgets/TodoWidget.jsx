import { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

export default function TodoWidget({ widget }) {
  const { updateWidgetData } = useDashboard();
  const [newItem, setNewItem] = useState('');
  const items = widget.data.items || [];

  const addItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...items, { 
        id: Date.now(), 
        text: newItem.trim(), 
        completed: false 
      }];
      updateWidgetData(widget.id, { items: updatedItems });
      setNewItem('');
    }
  };

  const toggleItem = (itemId) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    updateWidgetData(widget.id, { items: updatedItems });
  };

  const removeItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    updateWidgetData(widget.id, { items: updatedItems });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div className="todo-widget">
      <div className="todo-input">
        <input type="text"  value={newItem} onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."/>
        <button onClick={addItem}>+</button>
      </div>
      
      <div className="todo-list">
        {items.length === 0 ? (
          <p className="empty-todo">No tasks yet. Add one above!</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className={`todo-item ${item.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
              />
              <span className="todo-text">{item.text}</span>
              <button onClick={() => removeItem(item.id)} className="remove-todo">
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}