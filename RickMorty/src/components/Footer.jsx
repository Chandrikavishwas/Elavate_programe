import { useState, useEffect } from 'react';
import './Footer.css';

function Footer() {
  const [dateTime, setDateTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = () => {
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[dateTime.getDay()];
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[dateTime.getMonth()];
    
    const date = dateTime.getDate();
    const year = dateTime.getFullYear();
    
    return `${hours}:${minutes}:${seconds} ${day} ${month} ${date}, ${year}`;
  };
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">Rick and Morty Encyclopedia &copy; {dateTime.getFullYear()}</p>
          <p className="clock">{formatTime()}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;