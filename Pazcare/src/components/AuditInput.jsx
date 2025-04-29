import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';

const AuditInput = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  
  const validateUrl = (value) => {
    if (!value.trim()) {
      return 'Please enter a URL';
    }
    
    try {
      new URL(value);
      return '';
    } catch (e) {
      return 'Please enter a valid URL (include https://)';
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateUrl(url);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError('');
    onSubmit(url);
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Enter your website URL (e.g., https://example.com)"
          className={`w-full pl-12 pr-32 py-4 rounded-full border ${
            error ? 'border-accent-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-sm`}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError('');
          }}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="h-5 w-5" />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full transition-colors disabled:bg-primary-300"
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              <span>Analyzing...</span>
            </div>
          ) : (
            'Start Audit'
          )}
        </button>
      </div>
      {error && (
        <p className="text-accent-500 mt-2 text-sm">{error}</p>
      )}
    </form>
  );
};

export default AuditInput;