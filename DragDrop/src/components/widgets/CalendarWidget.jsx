import { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

export default function CalendarWidget({ widget }) {
  const { updateWidgetData } = useDashboard();
  const [selectedDate, setSelectedDate] = useState(widget.data.selectedDate || new Date().toISOString().split('T')[0]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    updateWidgetData(widget.id, { selectedDate: newDate });
  };

  const getCurrentMonth = () => {
    const date = new Date(selectedDate);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getSelectedDateFormatted = () => {
    const date = new Date(selectedDate);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <h4>{getCurrentMonth()}</h4>
      </div>
      
      <div className="calendar-input">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      
      <div className="calendar-selected">
        <p>Selected:</p>
        <p className="selected-date">{getSelectedDateFormatted()}</p>
      </div>
    </div>
  );
}