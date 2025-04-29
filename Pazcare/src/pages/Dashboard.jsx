import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import AuditInput from '../components/AuditInput';
import FeatureCard from '../components/FeatureCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleStartAudit = (url) => {
    setIsLoading(true);
    

    setTimeout(() => {
      setIsLoading(false);
      navigate('/results', { state: { url } });
    }, 2000);
  };

  const features = [
    {
      title: 'Core Web Vitals',
      description: 'Analyze LCP, FID, CLS and other vital performance metrics that directly impact your search rankings.',
      icon: 'BarChart2',
    },
    {
      title: 'Crawlability Check',
      description: 'Inspect robots.txt, sitemaps, and canonical tags to ensure search engines properly crawl your content.',
      icon: 'Spider',
    },
    {
      title: 'Indexation Issues',
      description: 'Identify duplicate content, improper meta robots tags, and other issues affecting indexation.',
      icon: 'FileSearch',
    },
    {
      title: 'HTTPS & Security',
      description: 'Verify your site uses secure connections and follows security best practices for SEO.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Mobile-Friendliness',
      description: 'Test how well your site performs on mobile devices, a critical factor for rankings.',
      icon: 'Smartphone',
    },
    {
      title: 'Redirect Analysis',
      description: 'Identify broken or excessive redirects that may impact user experience and crawl budget.',
      icon: 'ArrowRightCircle',
    }
  ];

  return (
    <div className="space-y-10">
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 inline-block text-transparent bg-clip-text">
          Comprehensive Technical SEO Audit Tool
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Analyze your website's technical SEO performance with our professional audit tool. 
          Get actionable insights to improve your search engine rankings.
        </p>
        
        <AuditInput onSubmit={handleStartAudit} isLoading={isLoading} />
        
        <div className="flex justify-center space-x-8 mt-12">
          <div className="flex items-center text-gray-700">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span>Fast Analysis</span>
          </div>
          <div className="flex items-center text-gray-700">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span>Detailed Reports</span>
          </div>
          <div className="flex items-center text-gray-700">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span>Actionable Fixes</span>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Our Audit Covers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>
      
      <section className="bg-primary-50 -mx-4 px-4 py-10 rounded-lg shadow-inner">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Ready to Improve Your SEO Performance?</h2>
          <p className="text-gray-700 mb-6">
            Start your technical SEO audit today and get a comprehensive report with actionable recommendations.
          </p>
          <button 
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md transition-colors flex items-center mx-auto"
          >
            <span>Start Free Audit</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;