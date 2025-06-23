import { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

export default function NotesWidget({ widget }) {
  const { updateWidgetData } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(widget.data.content);

  const handleSave = () => {
    updateWidgetData(widget.id, { content });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(widget.data.content);
    setIsEditing(false);
  };

  return (
    <div className="notes-widget">
      {isEditing ? (
        <div className="notes-editor">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your notes here..."
            autoFocus
          />
          <div className="notes-actions">
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="notes-display" onClick={() => setIsEditing(true)}>
          <p>{widget.data.content}</p>
          <div className="notes-hint">Click to edit</div>
        </div>
      )}
    </div>
  );
}