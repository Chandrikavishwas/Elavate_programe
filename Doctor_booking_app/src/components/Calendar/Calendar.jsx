import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns';
import { useAppContext } from '../../context/AppContext';
import AppointmentForm from '../Appointments/AppointmentForm';

const Calendar = () => {
  const { appointments, doctors } = useAppContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startDay = getDay(monthStart);
  
  const getAppointmentsForDate = (date) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      );
    });
  };
 
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const handleDateClick = (day) => {
    setSelectedDate(day);
  };
  
  const closeAppointmentModal = () => {
    setSelectedDate(null);
    setSelectedDoctor(null);
  };
  
  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointment Calendar</h2>
      
      <div className="bg-white rounded-xl shadow-card p-4 md:p-6">
       
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">{format(currentMonth, 'MMMM yyyy')}</h3>
          <div className="flex space-x-2">
            <button 
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 mb-2">
          {dayNames.map(day => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
        </div>        
       
        <div className="grid grid-cols-7">
         
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day calendar-day-disabled"></div>
          ))}
          
          {monthDays.map(day => {
            const dateAppointments = getAppointmentsForDate(day);
            return (
              <div
                key={day.toString()}
                className="calendar-day"
                onClick={() => handleDateClick(day)}
              >
                <div className="flex justify-between items-start">
                  <span className={`inline-block w-6 h-6 text-center ${
                    format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                      ? 'bg-primary-500 text-white rounded-full'
                      : ''
                  }`}>
                    {format(day, 'd')}
                  </span>
                  
                  {dateAppointments.length > 0 && (
                    <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {dateAppointments.length}
                    </span>
                  )}
                </div>
                
                <div className="mt-1">
                  {dateAppointments.slice(0, 2).map(appointment => (
                    <div key={appointment.id} className="appointment-item">
                      <span className="appointment-dot"></span>
                      {appointment.time} - {appointment.doctorName}
                    </div>
                  ))}
                  
                 
                  {dateAppointments.length > 2 && (
                    <div className="text-xs text-primary-600 font-medium">
                      +{dateAppointments.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>      
    
      {selectedDate && !selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Book Appointment for {format(selectedDate, 'MMMM d, yyyy')}</h2>
              <button onClick={closeAppointmentModal} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="mb-4">Select a doctor to book an appointment with:</p>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {doctors.map(doctor => (
                <div 
                  key={doctor.id}
                  className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-primary-50"
                  onClick={() => selectDoctor(doctor)}
                >
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className="text-sm text-primary-600">{doctor.specialization}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {selectedDate && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Book with {selectedDoctor.name}</h2>
              <button onClick={closeAppointmentModal} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <AppointmentForm 
              doctor={selectedDoctor}
              onClose={closeAppointmentModal}
              initialDate={selectedDate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;