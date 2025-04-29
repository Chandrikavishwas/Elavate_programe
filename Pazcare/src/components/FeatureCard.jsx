import React from 'react';
import * as LucideIcons from 'lucide-react';

const FeatureCard = ({ title, description, icon }) => {
  const Icon = LucideIcons[icon] || LucideIcons.Search;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 hover:border-primary-200">
      <div className="p-3 rounded-full bg-primary-100 inline-block mb-4">
        <Icon className="h-6 w-6 text-primary-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;