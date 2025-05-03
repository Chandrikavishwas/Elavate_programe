import { useState } from 'react';
import AppointmentForm from '../Appointments/AppointmentForm';

const DoctorCard = ({ doctor }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="card mb-6 hover:border-primary-300 hover:border">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div className="md:w-3/4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-primary-600 font-medium">{doctor.specialization}</p>
              <p className="text-gray-500">{doctor.city}</p>
            </div>
            <button 
              className="btn-primary"
              onClick={() => setShowForm(true)}
            >
              Book Appointment
            </button>
          </div>
          
          <div className="mt-3">
            <p className="text-gray-700">{doctor.summary}</p>
          </div>
          
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              <div className="text-sm bg-gray-100 rounded-full px-3 py-1">
                <span className="font-medium">Email:</span> {doctor.email}
              </div>
              <div className="text-sm bg-gray-100 rounded-full px-3 py-1">
                <span className="font-medium">Phone:</span> {doctor.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Book Appointment with {doctor.name}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <AppointmentForm doctor={doctor} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;