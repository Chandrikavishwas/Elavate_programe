import { useState, useRef } from 'react';
import { useDashboard } from '../context/DashboardContext';
import ClockWidget from './widgets/ClockWidget';
import NotesWidget from './widgets/NotesWidget';
import TodoWidget from './widgets/TodoWidget';
import CalendarWidget from './widgets/CalendarWidget';

export default function Widget({ widget }) {
  const { removeWidget, updateWidgetPosition } = useDashboard();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const widgetRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.widget-content')) return;
    
    setIsDragging(true);
    const rect = widgetRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const container = widgetRef.current.parentElement;
    const containerRect = container.getBoundingClientRect();
    
    const newX = Math.max(0, Math.min(
      e.clientX - containerRect.left - dragOffset.x,
      containerRect.width - widgetRef.current.offsetWidth
    ));
    
    const newY = Math.max(0, Math.min(
      e.clientY - containerRect.top - dragOffset.y,
      containerRect.height - widgetRef.current.offsetHeight
    ));
    
    updateWidgetPosition(widget.id, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleRemove = () => {
    removeWidget(widget.id);
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'clock':
        return <ClockWidget widget={widget} />;
      case 'notes':
        return <NotesWidget widget={widget} />;
      case 'todo':
        return <TodoWidget widget={widget} />;
      case 'calendar':
        return <CalendarWidget widget={widget} />;
      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <div
      ref={widgetRef}
      className={`widget widget-${widget.color} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: widget.position.x,
        top: widget.position.y,
        width: widget.size.width,
        height: widget.size.height
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="widget-header">
        <span className="widget-title">{widget.name}</span>
        <button className="widget-remove" onClick={handleRemove}>
          ✕
        </button>
      </div>
      <div className="widget-content">
        {renderWidgetContent()}
      </div>
    </div>
  );
}