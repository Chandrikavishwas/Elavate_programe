import React, { useState, useEffect } from 'react';
import { useAppointments } from '../context/AppointmentsContext';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, eachDayOfInterval, isToday, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { FaArrowLeft, FaArrowRight, FaTimes, FaCalendarDay, FaClock, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

const DoctorCalendarView = ({ doctor, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { appointments } = useAppointments();

  
  const doctorAppointments = appointments.filter(
    app => app.doctorId === doctor.id && app.status !== 'cancelled'
  );

  const getAppointmentsForDate = (date) => {
    return doctorAppointments.filter(app => 
      isSameDay(parseISO(new Date(app.date).toISOString()), date)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
    setSelectedAppointment(null);
  };

  const viewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeAppointmentDetails = () => {
    setSelectedAppointment(null);
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FaArrowLeft className="text-gray-600 dark:text-gray-300" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FaArrowRight className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map(day => (
          <div key={day} className="text-center font-medium text-sm py-2 text-gray-600 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const dayAppointments = getAppointmentsForDate(day);
        
        days.push(
          <div
            key={day}
            className={`cell relative min-h-[90px] p-1 border border-gray-200 dark:border-gray-700 ${
              !isSameMonth(day, monthStart)
                ? 'text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-800/30'
                : isToday(day)
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                : 'bg-white dark:bg-gray-800'
            } ${
              isSameDay(day, selectedDate) ? 'border-2 border-primary-500' : ''
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex justify-between">
              <span className={`text-sm ${
                isToday(day) ? 'font-bold text-primary-600 dark:text-primary-400' : ''
              }`}>
                {formattedDate}
              </span>
              {dayAppointments.length > 0 && (
                <span className="text-xs bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {dayAppointments.length}
                </span>
              )}
            </div>
            <div className="mt-1 overflow-y-auto max-h-[60px]">
              {dayAppointments.map(appointment => (
                <div
                  key={appointment.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    viewAppointmentDetails(appointment);
                  }}
                  className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 p-1 mb-1 rounded truncate cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-800/40 transition-colors"
                >
                  {appointment.time} - {appointment.patientName}
                </div>
              ))}
            </div>
          </div>
        );
        day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
      }
      
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  const renderAppointmentDetails = () => {
    if (!selectedAppointment) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeAppointmentDetails}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4 p-4" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4 pb-2 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Appointment Details</h3>
            <button onClick={closeAppointmentDetails} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <FaTimes size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FaUser className="mr-3 text-primary-500" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Patient</div>
                <div>{selectedAppointment.patientName}</div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FaPhone className="mr-3 text-primary-500" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                <div>{selectedAppointment.patientPhone}</div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FaEnvelope className="mr-3 text-primary-500" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                <div>{selectedAppointment.patientEmail}</div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FaCalendarDay className="mr-3 text-primary-500" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Date</div>
                <div>{format(new Date(selectedAppointment.date), 'EEEE, MMMM d, yyyy')}</div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FaClock className="mr-3 text-primary-500" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Time</div>
                <div>{selectedAppointment.time}</div>
              </div>
            </div>
            
            {selectedAppointment.notes && (
              <div className="mt-4 pt-4 border-t dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Notes:</div>
                <div className="text-gray-700 dark:text-gray-300">{selectedAppointment.notes}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-auto">
      <div className="container-main py-4">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onClose}
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to Doctors</span>
          </button>
          
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{doctor.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialization}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
          <div className="doctor-calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
        </div>
        
        <div className="mt-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Appointments for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md divide-y dark:divide-gray-700">
            {getAppointmentsForDate(selectedDate).length > 0 ? (
              getAppointmentsForDate(selectedDate).map(appointment => (
                <div 
                  key={appointment.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => viewAppointmentDetails(appointment)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">{appointment.patientName}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{appointment.time}</div>
                    </div>
                    <div className="text-primary-600 dark:text-primary-400">
                      View Details
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No appointments scheduled for this date.
              </div>
            )}
          </div>
        </div>
      </div>
      
      {renderAppointmentDetails()}
    </div>
  );
};

export default DoctorCalendarView;