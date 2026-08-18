import React from 'react';

export default function OrbitLogo({ className = "w-8 h-8" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Central Core */}
        <circle cx="20" cy="20" r="5" fill="url(#orbitGrad)" />

        {/* Outer Orbit Path 1 */}
        <ellipse
          cx="20"
          cy="20"
          rx="15"
          ry="7"
          transform="rotate(-28 20 20)"
          stroke="url(#orbitGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="75 15"
        />

        {/* Outer Orbit Path 2 */}
        <ellipse
          cx="20"
          cy="20"
          rx="15"
          ry="7"
          transform="rotate(45 20 20)"
          stroke="url(#orbitGrad)"
          strokeWidth="1.8"
          strokeOpacity="0.75"
          strokeLinecap="round"
          strokeDasharray="60 20"
        />

        {/* Orbit Satellite Particle */}
        <circle cx="31" cy="12" r="2" fill="#34d399" />
      </svg>
    </div>
  );
}