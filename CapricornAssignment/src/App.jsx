import React, { useState } from 'react';
import ParticlesComponent from './components/Particle';
import { ThemeProvider } from './context/ThemeContext';
import { DoctorsProvider } from './context/DoctorsContext';
import { AppointmentsProvider } from './context/AppointmentsContext';
import Header from './components/Header';
import Hero from './components/Hero';
import DoctorSearch from './components/DoctorSearch';
import DoctorsList from './components/DoctorsList';
import AddDoctorForm from './components/AddDoctorForm';
import AppointmentBooking from './components/AppointmentBooking';
import BookedAppointments from './components/BookedAppointments';
import DoctorCalendarView from './components/DoctorCalendarView';
import Footer from './components/Footer';

function App() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCalendarViewOpen, setIsCalendarViewOpen] = useState(false);
  const [calendarDoctor, setCalendarDoctor] = useState(null);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingOpen(true);
  };

  const handleViewAvailability = (doctor) => {
    setCalendarDoctor(doctor);
    setIsCalendarViewOpen(true);
  };

  const closeCalendarView = () => {
    setIsCalendarViewOpen(false);
    setCalendarDoctor(null);
  };

  return (
    <ThemeProvider>
      <DoctorsProvider>
        <AppointmentsProvider>
          <div className="relative min-h-screen">
            <ParticlesComponent id="tsparticles" />
            
            <Header />
            
            <Hero />
            
            <div className="py-10" id="doctors">
              <div className="container-main">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Find the Right Doctor
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Search from our network of qualified healthcare professionals to find the specialist that meets your needs.
                  </p>
                </div>
                
                <div className="mb-8">
                  <DoctorSearch />
                </div>
                
                <div className="mb-4 flex justify-end">
                  <button
                    onClick={() => setIsAddDoctorOpen(true)}
                    className="btn-secondary"
                  >
                    Add New Doctor
                  </button>
                </div>
                
                <DoctorsList 
                  onBookAppointment={handleBookAppointment}
                  onViewAvailability={handleViewAvailability} 
                />
              </div>
            </div>
            
            <BookedAppointments />
            
            <Footer />
            
            
            <AddDoctorForm
              isOpen={isAddDoctorOpen}
              onClose={() => setIsAddDoctorOpen(false)}
            />
            
            {selectedDoctor && (
              <AppointmentBooking
                doctor={selectedDoctor}
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
              />
            )}
            
            {isCalendarViewOpen && calendarDoctor && (
              <DoctorCalendarView
                doctor={calendarDoctor}
                onClose={closeCalendarView}
              />
            )}
          </div>
        </AppointmentsProvider>
      </DoctorsProvider>
    </ThemeProvider>
  );
}

export default App;