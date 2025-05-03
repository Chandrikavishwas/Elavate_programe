import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppContext } from '../../context/AppContext';

const AppointmentForm = ({ doctor, existingAppointment = null, onClose }) => {
  const { addAppointment, editAppointment } = useAppContext();
  const [formData, setFormData] = useState({
    id: existingAppointment?.id || Date.now(),
    doctorId: doctor.id,
    doctorName: doctor.name,
    patientName: existingAppointment?.patientName || '',
    patientPhone: existingAppointment?.patientPhone || '',
    date: existingAppointment?.date ? new Date(existingAppointment.date) : new Date(),
    time: existingAppointment?.time || '',
  });
  
  const [availableTimes, setAvailableTimes] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[formData.date.getDay()].toLowerCase();
    
    
    if (doctor.availability && doctor.availability[dayName]) {
      setAvailableTimes(doctor.availability[dayName]);
    } else {
      setAvailableTimes([]);
    }
    
    
    if (formData.time && !availableTimes.includes(formData.time)) {
      setFormData({
        ...formData,
        time: ''
      });
    }
  }, [formData.date, doctor.availability]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
      time: '' 
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.time) {
      setError('Please select an appointment time');
      return;
    }
    
    if (existingAppointment) {
      editAppointment(formData);
    } else {
      addAppointment(formData);
    }
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          id="patientName"
          name="patientName"
          required
          value={formData.patientName}
          onChange={handleChange}
          className="input-field"
          placeholder="John Doe"
        />
      </div>
      
      <div>
        <label htmlFor="patientPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          id="patientPhone"
          name="patientPhone"
          required
          value={formData.patientPhone}
          onChange={handleChange}
          className="input-field"
          placeholder="+1 (555) 123-4567"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          minDate={new Date()}
          className="input-field w-full"
          dateFormat="MMMM d, yyyy"
        />
      </div>
      
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Appointment Time</label>
        {availableTimes.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map(time => (
              <div key={time} className="flex items-center">
                <input
                  type="radio"
                  id={`time-${time}`}
                  name="time"
                  value={time}
                  checked={formData.time === time}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor={`time-${time}`} className="text-sm text-gray-700">{time}</label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-sm">No available times for this date. Please select another date.</p>
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button 
          type="button" 
          onClick={onClose}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn-primary"
        >
          {existingAppointment ? 'Update Appointment' : 'Book Appointment'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;