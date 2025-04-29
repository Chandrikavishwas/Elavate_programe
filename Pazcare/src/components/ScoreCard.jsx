import React from 'react';
import * as LucideIcons from 'lucide-react';

const ScoreCard = ({ title, score, label, icon, descriptionText }) => {
  const Icon = LucideIcons[icon] || LucideIcons.Activity;
  
  // Determine the color based on the score
  const getColorClass = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-accent-500';
  };
  
  // Determine the bg color for the circle
  const getBgColorClass = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-amber-100';
    return 'bg-accent-100';
  };
  
  // Determine the progress circle path
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - score) / 100) * circumference;
  
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className={`p-2 rounded-full ${getBgColorClass(score)} mr-3`}>
            <Icon className={`h-5 w-5 ${getColorClass(score)}`} />
          </div>
          <h3 className="font-medium text-gray-800">{title}</h3>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          score >= 90 ? 'bg-green-100 text-green-800' : 
          score >= 70 ? 'bg-amber-100 text-amber-800' : 
          'bg-accent-100 text-accent-800'
        }`}>
          {label}
        </span>
      </div>
      
      <div className="flex items-center justify-center my-4">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r={radius} 
              fill="none" 
              stroke="#F3F4F6" 
              strokeWidth="10"
            />
            <circle 
              cx="50" 
              cy="50" 
              r={radius} 
              fill="none" 
              stroke={score >= 90 ? '#10B981' : score >= 70 ? '#F59E0B' : '#EF4444'} 
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute text-3xl font-bold text-gray-800">{score}</div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 text-center">{descriptionText}</p>
    </div>
  );
};

export default ScoreCard;