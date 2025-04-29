import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Download, AlertTriangle, XCircle, 
  CheckCircle, Printer, Share2 
} from 'lucide-react';
import ScoreCard from '../components/ScoreCard';
import IssueTabs from '../components/IssueTabs';
import { mockAuditResults } from '../data/mockData';

const AuditResults = () => {
  const location = useLocation();
  const [auditData, setAuditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setAuditData(mockAuditResults);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 border-r-transparent mb-4"></div>
        <p className="text-gray-700 text-lg">Analyzing your website...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              SEO Audit Results
            </h1>
            <p className="text-gray-600">
              {location.state?.url || "example.com"}
            </p>
          </div>
          
          <div className="flex space-x-4">
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              <span>Download Report</span>
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors border border-gray-300 flex items-center">
              <Printer className="h-4 w-4 mr-2" />
              <span>Print</span>
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors border border-gray-300 flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              <span>Share</span>
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Overall Performance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScoreCard 
              title="Overall Score" 
              score={auditData.overall.score}
              label={auditData.overall.label}
              icon="Activity"
              descriptionText="Your overall SEO health score"
            />
            <ScoreCard 
              title="Performance" 
              score={auditData.performance.score}
              label={auditData.performance.label}
              icon="BarChart2"
              descriptionText="Core Web Vitals & loading speed"
            />
            <ScoreCard 
              title="Crawlability" 
              score={auditData.crawlability.score}
              label={auditData.crawlability.label}
              icon="Search"
              descriptionText="How search engines can crawl your site"
            />
            <ScoreCard 
              title="Mobile Experience" 
              score={auditData.mobile.score}
              label={auditData.mobile.label}
              icon="Smartphone"
              descriptionText="Mobile-friendly performance"
            />
          </div>
        </div>
      </section>
      
      <section>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-1 text-gray-800">
            Key Issues Found
          </h2>
          <p className="text-gray-600 mb-6">
            We identified {auditData.issues.critical.length} critical and {auditData.issues.warnings.length} warning issues.
          </p>
          
          <IssueTabs issues={auditData.issues} />
        </div>
      </section>
      
      <section className="bg-primary-50 -mx-4 px-4 py-8 rounded-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Executive Summary
          </h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              Top 5 Issues Found
            </h3>
            
            <ul className="space-y-3">
              {auditData.executiveSummary.topIssues.map((issue, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="h-5 w-5 mr-3 text-accent-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">{issue.title}</p>
                    <p className="text-sm text-gray-600">{issue.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Recommended Fixes
            </h3>
            
            <ul className="space-y-3">
              {auditData.executiveSummary.recommendedFixes.map((fix, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">{fix.title}</p>
                    <p className="text-sm text-gray-600">{fix.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuditResults;