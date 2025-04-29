import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentsContext';
import { format } from 'date-fns';
import { FaCalendarCheck, FaSearch, FaUserMd, FaClock, FaCalendarDay, FaTrash } from 'react-icons/fa';

const BookedAppointments = () => {
  const { appointments, cancelAppointment } = useAppointments();
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchName && !searchPhone) {
      setFilteredAppointments([]);
      return;
    }
    
    const filtered = appointments.filter(app => {
      const nameMatch = searchName ? 
        app.patientName.toLowerCase().includes(searchName.toLowerCase()) : 
        true;
      
      const phoneMatch = searchPhone ? 
        app.patientPhone.includes(searchPhone) : 
        true;
      
      return nameMatch && phoneMatch;
    });
    
    setFilteredAppointments(filtered);
  };

  
  const sortedAppointments = [...(filteredAppointments.length > 0 ? filteredAppointments : appointments)]
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="py-10" id="appointments">
      <div className="container-main">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
              <FaCalendarCheck className="mr-2 text-primary-500" />
              Your Appointments
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              View and manage your scheduled appointments
            </p>
          </div>
          
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="mt-4 md:mt-0 px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 transition-colors flex items-center"
          >
            <FaSearch className="mr-2" />
            {showSearch ? 'Hide Search' : 'Find My Appointments'}
          </button>
        </div>
        
        {showSearch && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Find Your Appointments
            </h3>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="John Doe"
                  className="input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="input"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        )}
        
        {sortedAppointments.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <FaCalendarCheck className="text-5xl text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Appointments Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredAppointments.length > 0 
                ? "No appointments match your search criteria."
                : "You don't have any scheduled appointments yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAppointments.map((appointment) => (
              <div 
                key={appointment.id}
                className={`card p-4 ${
                  appointment.status === 'cancelled' 
                    ? 'opacity-60 bg-gray-200 dark:bg-gray-800/10' 
                    : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      appointment.status === 'booked' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {appointment.status === 'booked' ? 'Confirmed' : 'Cancelled'}
                    </span>
                  </div>
                  
                  {appointment.status !== 'cancelled' && (
                    <button
                      onClick={() => cancelAppointment(appointment.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Cancel Appointment"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <FaUserMd className="text-primary-600 dark:text-primary-400 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                      {appointment.doctorName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Patient: {appointment.patientName}
                    </p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 pl-1 mb-4">
                  <div className="flex items-center mb-2">
                    <FaCalendarDay className="text-primary-500 mr-2" />
                    <span>{format(new Date(appointment.date), 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-primary-500 mr-2" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                
                {appointment.notes && (
                  <div className="mt-3 pt-3 border-t dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Notes:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{appointment.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedAppointments;