import { useDashboard } from '../context/DashboardContext';

export default function Sidebar() {
  const { availableWidgets, setDraggedWidget } = useDashboard();

  const handleDragStart = (e, widget) => {
    setDraggedWidget(widget);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggedWidget(null);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Widgets</h2>
        <p>Drag to add to your dashboard</p>
      </div>
      
      <div className="widget-list">
        {availableWidgets.map((widget) => (
          <div
            key={widget.id}
            className="widget-item"
            draggable
            onDragStart={(e) => handleDragStart(e, widget)}
            onDragEnd={handleDragEnd}
          >
            <span className="widget-icon">{widget.icon}</span>
            <span className="widget-name">{widget.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}