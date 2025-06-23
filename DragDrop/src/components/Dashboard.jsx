import { useDashboard } from '../context/DashboardContext';
import Widget from './Widget';

export default function Dashboard() {
  const { widgets, addWidget, draggedWidget, setDraggedWidget } = useDashboard();

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    
    if (draggedWidget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      addWidget(draggedWidget.type, { x, y });
      setDraggedWidget(null);
    }
  };

  return (
    <div 
      className="dashboard"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {widgets.length === 0 ? (
        <div className="empty-dashboard">
          <div className="empty-message">
            <h3>Welcome to your Dashboard!</h3>
            <p>Drg widgets from the sidebar to get started</p>
          </div>
        </div>
      ) : (
        widgets.map((widget) => (
          <Widget key={widget.id} widget={widget} />
        ))
      )}
    </div>
  );
}