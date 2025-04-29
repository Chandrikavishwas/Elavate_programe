import React from 'react';
import { FaCalendarCheck, FaUserMd, FaArrowDown } from 'react-icons/fa';

const Hero = () => {
  const handleScroll = () => {
    const doctorsSection = document.getElementById('doctors');
    if (doctorsSection) {
      doctorsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white">
              <span className="text-primary-600 dark:text-primary-400">Don’t Delay <br /></span>Book Doctor Today!
            </h1>
            
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Book appointments with the best doctors in your city, all from the comfort of your home. No waiting lines, no hassle.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={handleScroll}
                className="btn-primary py-3 text-lg flex items-center justify-center"
              >
                <FaUserMd className="mr-2" />
                Find Doctors
              </button>
              
              <a 
                href="#appointments" 
                className="btn-secondary bg-purple-600 hover:bg-purple-700 py-3 text-lg flex items-center justify-center"
              >
                <FaCalendarCheck className="mr-2" />
                My Appointments
              </a>
            </div>
            
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Specialists</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Patients</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 animation-delay-500">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-400/20 dark:bg-primary-600/20 rounded-full animate-pulse-slow"></div>
              <div className="absolute -bottom-14 -right-14 w-48 h-48 bg-secondary-400/20 dark:bg-secondary-600/20 rounded-full animate-pulse-slow"></div>
              
              <img 
                src="https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Doctor with patient" 
                className="w-full h-auto rounded-2xl shadow-2xl relative z-10 object-cover" 
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center animate-bounce">
          <button 
            onClick={handleScroll}
            className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg text-primary-500"
            aria-label="Scroll down"
          >
            <FaArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;