import React, { useState } from 'react';
import { ChevronDown, ChevronUp, XCircle, AlertTriangle, CheckCircle } from 'lucide-react';

const IssueCard = ({ issue, type }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getIcon = () => {
    switch (type) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-accent-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };
  
  const getHeaderClass = () => {
    switch (type) {
      case 'critical':
        return 'border-l-4 border-accent-500 bg-accent-50';
      case 'warning':
        return 'border-l-4 border-amber-500 bg-amber-50';
      case 'passed':
        return 'border-l-4 border-green-500 bg-green-50';
      default:
        return '';
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div 
        className={`p-4 cursor-pointer ${getHeaderClass()}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getIcon()}
            <h3 className="font-medium text-gray-800 ml-3">{issue.title}</h3>
          </div>
          {isExpanded ? 
            <ChevronUp className="h-5 w-5 text-gray-500" /> : 
            <ChevronDown className="h-5 w-5 text-gray-500" />
          }
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <p className="text-gray-700 mb-4">{issue.description}</p>
          
          {issue.affectedUrls && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Affected URLs:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {issue.affectedUrls.map((url, idx) => (
                  <li key={idx}>{url}</li>
                ))}
              </ul>
            </div>
          )}
          
          {issue.recommendation && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">How to Fix:</h4>
              <p className="text-gray-700">{issue.recommendation}</p>
              
              {issue.codeExample && (
                <div className="mt-3 p-3 bg-gray-100 rounded-md overflow-x-auto">
                  <pre className="text-sm text-gray-800">{issue.codeExample}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IssueCard;