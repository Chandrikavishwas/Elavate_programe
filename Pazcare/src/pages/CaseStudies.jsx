import React from 'react';
import { ExternalLink } from 'lucide-react';
import CaseStudyCard from '../components/CaseStudyCard';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Pazcare Landing Page Optimization",
      summary: "How we improved Pazcare's landing page loading speed and SEO performance",
      description: `
        The Pazcare landing page was experiencing performance issues that affected both user experience and SEO rankings.
        Our analysis identified several Webflow-specific issues that were hindering performance.
      `,
      improvements: [
        {
          title: "Implemented lazy loading for below-the-fold images",
          description: "Reduced initial load time by 35% by only loading visible images initially"
        },
        {
          title: "Added structured data markup",
          description: "Enhanced search results with rich snippets using schema.org markup"
        },
        {
          title: "Optimized CSS delivery",
          description: "Minimized unused CSS and implemented critical CSS inline loading"
        },
        {
          title: "Improved meta tags structure",
          description: "Created unique, descriptive titles and meta descriptions for each page"
        },
        {
          title: "Compressed and properly sized images",
          description: "Reduced image file sizes by 60% while maintaining quality"
        }
      ],
      results: [
        "42% improvement in loading speed",
        "28% increase in organic traffic",
        "15% reduction in bounce rate",
        "Improved Google Page Experience metrics"
      ],
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Fixing a Slow-Loading Blog",
      summary: "How we reduced loading time from 9+ seconds to under 3 seconds",
      description: `
        A popular blog was suffering from extremely slow load times, taking over 9 seconds to fully load.
        This was negatively impacting both user experience and search rankings.
      `,
      improvements: [
        {
          title: "Eliminated render-blocking JavaScript",
          description: "Applied async and defer attributes to non-critical scripts"
        },
        {
          title: "Optimized and compressed images",
          description: "Implemented WebP format and proper sizing for all blog images"
        },
        {
          title: "Reduced HTTP requests",
          description: "Combined CSS/JS files and removed unnecessary third-party scripts"
        },
        {
          title: "Implemented browser caching",
          description: "Set appropriate cache headers for static resources"
        },
        {
          title: "Added CDN integration",
          description: "Distributed content delivery to improve global load times"
        }
      ],
      results: [
        "Loading time reduced from 9.2s to 2.8s",
        "32% improvement in Core Web Vitals scores",
        "24% decrease in bounce rate",
        "18% increase in average session duration"
      ],
      image: "https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Case Studies: Technical SEO Success Stories
        </h1>
        <p className="text-gray-700 mb-8 max-w-3xl">
          Explore real-world examples of how our technical SEO audits have helped websites improve 
          their performance, crawlability, and search engine rankings.
        </p>
        
        <div className="space-y-8">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyCard key={index} caseStudy={caseStudy} />
          ))}
        </div>
      </section>
      
      <section className="bg-primary-50 -mx-4 px-4 py-8 rounded-lg my-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Ready to Create Your Own Success Story?
          </h2>
          <p className="text-gray-700 mb-6">
            Start with a comprehensive technical SEO audit and discover how you can improve your website's performance.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md transition-colors">
              Run Free Audit
            </button>
            <a 
              href="#" 
              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md transition-colors border border-gray-300 flex items-center"
            >
              <span>Learn More</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;