import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { format } from 'date-fns';
import AppointmentForm from './AppointmentForm';

const AppointmentList = () => {
  const { appointments, doctors, deleteAppointment } = useAppContext();
  const [editingAppointment, setEditingAppointment] = useState(null);
  
  const findDoctor = (doctorId) => {
    return doctors.find(doctor => doctor.id === doctorId) || {};
  };
  
 
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });
  
  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      deleteAppointment(id);
    }
  };
  
  if (appointments.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Appointments</h2>
        <div className="bg-white rounded-xl shadow-card p-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-xl text-gray-600">No appointments scheduled</h3>
          <p className="text-gray-500 mt-2">Your booked appointments will appear here.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedAppointments.map(appointment => {
          const doctor = findDoctor(appointment.doctorId);
          const appointmentDate = new Date(appointment.date);
          const isUpcoming = appointmentDate >= new Date();
          
          return (
            <div 
              key={appointment.id} 
              className={`card ${isUpcoming ? 'border-l-4 border-l-primary-500' : 'border-l-4 border-l-gray-400'}`}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{appointment.doctorName}</h3>
                  <p className="text-primary-600 text-sm">{doctor.specialization}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{format(appointmentDate, 'MMMM d, yyyy')}</p>
                  <p className="text-primary-600">{appointment.time}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 my-4 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Patient Name</p>
                    <p className="font-medium">{appointment.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{appointment.patientPhone}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-4">
                <button 
                  onClick={() => handleDelete(appointment.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleEdit(appointment)}
                  className="text-primary-500 hover:text-primary-700 text-sm font-medium"
                >
                  Reschedule
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {editingAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Reschedule Appointment</h2>
              <button onClick={() => setEditingAppointment(null)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <AppointmentForm 
              doctor={findDoctor(editingAppointment.doctorId)} 
              existingAppointment={editingAppointment} 
              onClose={() => setEditingAppointment(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;