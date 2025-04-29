import React, { useState } from 'react';
import { XCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import IssueCard from './IssueCard';

const IssueTabs = ({ issues }) => {
  const [activeTab, setActiveTab] = useState('critical');
  
  return (
    <div>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 flex items-center ${
            activeTab === 'critical'
              ? 'border-b-2 border-accent-500 text-accent-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('critical')}
        >
          <XCircle className="h-4 w-4 mr-2" />
          <span>Critical Issues ({issues.critical.length})</span>
        </button>
        <button
          className={`px-4 py-2 flex items-center ${
            activeTab === 'warnings'
              ? 'border-b-2 border-amber-500 text-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('warnings')}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          <span>Warnings ({issues.warnings.length})</span>
        </button>
        <button
          className={`px-4 py-2 flex items-center ${
            activeTab === 'passed'
              ? 'border-b-2 border-green-500 text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('passed')}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          <span>Passed Tests ({issues.passed.length})</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {activeTab === 'critical' && (
          <>
            {issues.critical.map((issue, index) => (
              <IssueCard 
                key={index}
                issue={issue}
                type="critical"
              />
            ))}
          </>
        )}
        
        {activeTab === 'warnings' && (
          <>
            {issues.warnings.map((issue, index) => (
              <IssueCard 
                key={index}
                issue={issue}
                type="warning"
              />
            ))}
          </>
        )}
        
        {activeTab === 'passed' && (
          <>
            {issues.passed.map((issue, index) => (
              <IssueCard 
                key={index}
                issue={issue}
                type="passed"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default IssueTabs;