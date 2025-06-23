import { DashboardProvider } from './context/DashboardContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <DashboardProvider>
      <div className="app">
        <header className="app-header">
          <h1>Smart Dashboard Builder</h1>
          <p>Create your perfect personalized workspace</p>
        </header>
        
        <div className="app-content">
          <Sidebar />
          <Dashboard />
          
        </div>
      </div>
    </DashboardProvider>
  );
}

export default App;