import React from 'react';
import { useDoctors } from '../context/DoctorsContext';
import { FaSearch } from 'react-icons/fa';

const DoctorSearch = () => {
  const { searchTerm, setSearchTerm } = useDoctors();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-purple-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, specialization or city..."
          className="w-full pl-10 pr-4 py-3 rounded-full border dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-md"
        />
      </div>
    </div>
  );
};

export default DoctorSearch;