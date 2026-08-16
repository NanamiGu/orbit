import React from 'react';

const OrbitLogo = ({ className = "w-8 h-8 text-slate-900 dark:text-white" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      className={`transition-colors duration-200 ${className}`}
    >
      {/* النواة المركزية (Central Core) */}
      <circle 
        cx="12" 
        cy="12" 
        r="3.5" 
        fill="currentColor" 
      />
      
      {/* المدار العلوي الأيمن (Top-Right Orbit) */}
      <path 
        d="M 4 12 A 8 8 0 0 1 17.65 6.35" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      
      {/* المدار السفلي الأيسر (Bottom-Left Orbit) */}
      <path 
        d="M 20 12 A 8 8 0 0 1 6.35 17.65" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

export default OrbitLogo;