import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import DoctorList from './components/Doctors/DoctorList';
import Calendar from './components/Calendar/Calendar';
import AppointmentList from './components/Appointments/AppointmentList';

function App() {
  const [activePage, setActivePage] = useState('doctors');

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header setActivePage={setActivePage} />
        
        <main className="pb-16">
          {activePage === 'doctors' && <DoctorList />}
          {activePage === 'calendar' && <Calendar />}
          {activePage === 'appointments' && <AppointmentList />}
        </main>
        
        <footer className="bg-white py-6 border-t">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>© 2025 MediBook. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;