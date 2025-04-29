import React from 'react';
import { FaStar, FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaEye } from 'react-icons/fa';

const DoctorCard = ({ doctor, onBookAppointment, onViewAvailability }) => {
  return (
    <div className="card group hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={doctor.image} 
          alt={doctor.name}
          className="w-full h-56 object-cover object-center" 
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
        <div className="absolute bottom-2 left-3 text-white flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span>{doctor.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{doctor.name}</h3>
        
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex items-center">
          <FaBriefcase className="mr-1 text-primary-500" />
          <span>{doctor.specialization}</span>
        </div>
        
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-300 flex items-center">
          <FaMapMarkerAlt className="mr-1 text-primary-500" />
          <span>{doctor.city}</span>
        </div>
        
        <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          <p className="line-clamp-3">{doctor.summary}</p>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400 italic">{doctor.experience} years exp.</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => onViewAvailability(doctor)}
              className="btn-secondary flex items-center text-sm py-1 px-2"
              aria-label="View doctor's availability"
            >
              <FaEye className="mr-1" />
              Availability
            </button>
            <button 
              onClick={() => onBookAppointment(doctor)}
              className="btn-primary flex items-center text-sm"
            >
              <FaCalendarAlt className="mr-1" />
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;