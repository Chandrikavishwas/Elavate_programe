import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, BarChart2, FileText, BookOpen } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-primary-600 font-bold text-xl"
            >
              <Search className="h-6 w-6" />
              <span>SEO Audit Tool</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
            >
              <BarChart2 className="mr-1 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/results" 
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
            >
              <FileText className="mr-1 h-4 w-4" />
              <span>Audit Results</span>
            </Link>
            <Link 
              to="/case-studies" 
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
            >
              <BookOpen className="mr-1 h-4 w-4" />
              <span>Case Studies</span>
            </Link>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors">
              Start Audit
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-500 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="flex items-center px-2 py-2 text-gray-700 hover:bg-primary-100 hover:text-primary-600 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/results" 
                className="flex items-center px-2 py-2 text-gray-700 hover:bg-primary-100 hover:text-primary-600 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>Audit Results</span>
              </Link>
              <Link 
                to="/case-studies" 
                className="flex items-center px-2 py-2 text-gray-700 hover:bg-primary-100 hover:text-primary-600 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Case Studies</span>
              </Link>
              <button 
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Start Audit
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;