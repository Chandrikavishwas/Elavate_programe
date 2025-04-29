import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner pt-10 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-primary-600 font-bold text-xl mb-4">
              <Search className="h-6 w-6" />
              <span>SEO Audit Tool</span>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive technical SEO audits to improve your website's performance, 
              crawlability, and search engine rankings.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Audit Results
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  SEO Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SEO Audit Tool. All rights reserved.
          </p>
          <div className="flex items-center text-gray-600">
            Made with <Heart className="h-4 w-4 mx-1 text-accent-500 fill-accent-500" /> for better SEO
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;