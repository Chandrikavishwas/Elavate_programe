import React, { createContext, useState, useContext, useEffect } from 'react';
import { dummyDoctors } from '../data/dummyDoctors';

const DoctorsContext = createContext();

export const useDoctors = () => useContext(DoctorsContext);

export const DoctorsProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

 
  useEffect(() => {
    const savedDoctors = localStorage.getItem('doctors');
    if (savedDoctors) {
      const parsedDoctors = JSON.parse(savedDoctors);
      setDoctors(parsedDoctors);
      setFilteredDoctors(parsedDoctors);
    } else {
      setDoctors(dummyDoctors);
      setFilteredDoctors(dummyDoctors);
      localStorage.setItem('doctors', JSON.stringify(dummyDoctors));
    }
  }, []);

  useEffect(() => {
    if (doctors.length > 0) {
      localStorage.setItem('doctors', JSON.stringify(doctors));
    }
  }, [doctors]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDoctors(doctors);
      return;
    }

    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  const addDoctor = (newDoctor) => {
    const doctorWithId = { ...newDoctor, id: Date.now().toString() };
    setDoctors((prevDoctors) => [...prevDoctors, doctorWithId]);
  };

  return (
    <DoctorsContext.Provider
      value={{
        doctors,
        filteredDoctors,
        searchTerm,
        setSearchTerm,
        addDoctor
      }}
    >
      {children}
    </DoctorsContext.Provider>
  );
};