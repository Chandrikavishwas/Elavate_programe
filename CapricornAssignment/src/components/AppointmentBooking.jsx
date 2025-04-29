import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppointments } from '../context/AppointmentsContext';
import { FaTimes, FaClock, FaCalendarAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { format } from 'date-fns';

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '12:00 PM', '2:00 PM', 
  '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', 
  '4:30 PM', '5:00 PM'
];

const AppointmentBooking = ({ doctor, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const { addAppointment, appointments } = useAppointments();

  
  const getAvailableTimeSlots = () => {
    const bookedSlots = appointments.filter(
      (app) => 
        app.doctorId === doctor.id && 
        format(new Date(app.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') &&
        app.status !== 'cancelled'
    ).map(app => app.time);
    
    return timeSlots.filter(slot => !bookedSlots.includes(slot));
  };

  const availableTimeSlots = getAvailableTimeSlots();

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    const appointment = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorEmail: doctor.email,
      date: selectedDate,
      time: selectedTime,
      patientName,
      patientPhone,
      patientEmail,
      notes,
      createdAt: new Date()
    };
    
    addAppointment(appointment);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Book an Appointment</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-4 pb-4 border-b dark:border-gray-700">
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              className="w-16 h-16 rounded-full object-cover mr-4" 
            />
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">{doctor.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.specialization}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.city}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <FaCalendarAlt className="mr-2 text-primary-500" /> Select Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                minDate={new Date()}
                className="input"
                dateFormat="MMMM d, yyyy"
                wrapperClassName="w-full"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <FaClock className="mr-2 text-primary-500" /> Select Time
              </label>
              {availableTimeSlots.length === 0 ? (
                <p className="text-red-500 text-sm italic">No available slots for this date.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-md text-sm ${
                        selectedTime === time
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <FaUser className="mr-2 text-primary-500" /> Your Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                  className="input"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <FaPhone className="mr-2 text-primary-500" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  required
                  className="input"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <FaEnvelope className="mr-2 text-primary-500" /> Email Address
              </label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                required
                className="input"
                placeholder="email@example.com"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                className="input"
                placeholder="Any specific concerns or information for the doctor?"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={!selectedTime || !patientName || !patientPhone || !patientEmail}
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;