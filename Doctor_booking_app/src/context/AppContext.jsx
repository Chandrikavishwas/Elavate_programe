import { createContext, useState, useEffect, useContext } from 'react';
import { doctorsData } from '../data/doctorsData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [doctors, setDoctors] = useState(doctorsData);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  
  
  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      try {
        setAppointments(JSON.parse(savedAppointments));
      } catch (e) {
        console.error('Error loading appointments from localStorage', e);
      }
    }
  }, []);
  
  
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);
  
  
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredDoctors(doctors);
      return;
    }
    
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(lowercasedTerm) ||
      doctor.specialization.toLowerCase().includes(lowercasedTerm) ||
      doctor.city.toLowerCase().includes(lowercasedTerm)
    );
    
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);
  
  const addDoctor = (newDoctor) => {
    const doctorWithId = {
      ...newDoctor,
      id: doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1
    };
    setDoctors([...doctors, doctorWithId]);
  }; 
  
  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };
  
  
  const deleteAppointment = (appointmentId) => {
    setAppointments(appointments.filter(appt => appt.id !== appointmentId));
  };
  
  
  const editAppointment = (updatedAppointment) => {
    setAppointments(appointments.map(appt => 
      appt.id === updatedAppointment.id ? updatedAppointment : appt
    ));
  };

  return (
    <AppContext.Provider value={{
      doctors,
      filteredDoctors,
      searchTerm,
      setSearchTerm,
      addDoctor,
      appointments,
      addAppointment,
      deleteAppointment,
      editAppointment
    }}>
      {children}
    </AppContext.Provider>
  );
};