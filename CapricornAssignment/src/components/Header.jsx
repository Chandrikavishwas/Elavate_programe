import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes, FaCalendarAlt, FaUserMd } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'py-2 bg-white/90 dark:bg-darkBg/90 backdrop-blur-md shadow-md'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container-main flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            MyDocTime
          </h1>
        </div>

       
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#doctors"
            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Find Doctors
          </a>
          <a
            href="#appointments"
            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            My Appointments
          </a>
          <ThemeToggle />
        </nav>

       
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="container-main py-4 flex flex-col space-y-4">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaUserMd className="mr-2" /> Home
            </a>
            <a
              href="#doctors"
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaUserMd className="mr-2" /> Find Doctors
            </a>
            <a
              href="#appointments"
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaCalendarAlt className="mr-2" /> My Appointments
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;