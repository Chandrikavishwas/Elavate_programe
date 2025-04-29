import React from 'react';
import DoctorCard from './DoctorCard';
import { useDoctors } from '../context/DoctorsContext';

const DoctorsList = ({ onBookAppointment, onViewAvailability }) => {
  const { filteredDoctors } = useDoctors();

  return (
    <div className="py-8">
      <div className="container-main">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Our Specialists
        </h2>
        
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 dark:text-gray-300">No doctors found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard 
                key={doctor.id} 
                doctor={doctor} 
                onBookAppointment={onBookAppointment}
                onViewAvailability={onViewAvailability}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;