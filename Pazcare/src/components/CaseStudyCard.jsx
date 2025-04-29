import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle } from 'lucide-react';

const CaseStudyCard = ({ caseStudy }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img 
            src={caseStudy.image} 
            alt={caseStudy.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-primary-800/10 flex items-end md:items-center p-4 md:p-6">
            <h3 className="text-white text-xl font-bold drop-shadow-md">
              {caseStudy.title}
            </h3>
          </div>
        </div>
        
        <div className="md:w-2/3 p-6">
          <p className="text-gray-500 mb-2">Case Study</p>
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            {caseStudy.title}
          </h3>
          <p className="text-gray-700 mb-4">
            {caseStudy.summary}
          </p>
          
          <button 
            className="text-primary-600 font-medium flex items-center transition-colors hover:text-primary-700"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>{isExpanded ? 'Show Less' : 'Read Full Case Study'}</span>
            {isExpanded ? 
              <ChevronUp className="ml-1 h-4 w-4" /> : 
              <ChevronDown className="ml-1 h-4 w-4" />
            }
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-6 border-t border-gray-200">
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Challenge</h4>
            <p className="text-gray-700">{caseStudy.description}</p>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Our Solution</h4>
            <div className="space-y-4">
              {caseStudy.improvements.map((improvement, index) => (
                <div key={index} className="flex">
                  <div className="mr-3 mt-1">
                    <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">{improvement.title}</h5>
                    <p className="text-gray-600 text-sm">{improvement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Results</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {caseStudy.results.map((result, index) => (
                <li key={index} className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary-500" />
                  <span className="text-gray-700">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyCard;