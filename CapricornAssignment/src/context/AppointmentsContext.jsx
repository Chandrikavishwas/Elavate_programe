import React, { createContext, useState, useContext, useEffect } from 'react';

const AppointmentsContext = createContext();

export const useAppointments = () => useContext(AppointmentsContext);

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  

  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);


  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    }
  }, [appointments]);

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      status: 'booked'
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const cancelAppointment = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === id ? { ...app, status: 'cancelled' } : app
      )
    );
  };

  const getAppointmentsByDoctor = (doctorId) => {
    return appointments.filter((app) => app.doctorId === doctorId);
  };

  const getAppointmentsByPatient = (patientName, patientPhone) => {
    return appointments.filter(
      (app) => 
        app.patientName === patientName && 
        app.patientPhone === patientPhone
    );
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        cancelAppointment,
        getAppointmentsByDoctor,
        getAppointmentsByPatient
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};