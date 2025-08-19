'use client';

import { useState } from 'react';

export default function DistrictMap({ 
  districts, 
  selectedDistrict, 
  hoveredDistrict,
  onDistrictClick, 
  onDistrictHover 
}) {
  
  const getDistrictColor = (district, isSelected, isHovered) => {
    if (isSelected) return '#7B2D26';
    if (isHovered) return '#D6A400';
    
    // A more explicit and scalable color mapping
    const industryColors = {
      'Handicraft': '#B66E41',
      'Handloom': '#4E6E58',
      'Manufacturing': '#D6A400',
    };
    
    // Return the color of the first matching industry, or a default.
    return industryColors[district.industryType] || '#B66E41';
  };

  const hoveredDistrictData = districts.find(d => d.id === hoveredDistrict);
  
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Map Background */}
      <div className="relative bg-gradient-to-br from-[#F8F3EC] to-white rounded-xl p-8 border-2 border-[#B66E41]/20">
        <svg
          viewBox="0 0 100 60"
          className="w-full h-auto"
          style={{ maxHeight: '400px' }}
        >
          {/* UP State Outline (simplified) */}
          <path
            d="M10,25 L15,20 L25,18 L35,15 L50,12 L70,15 L85,20 L90,25 L88,35 L85,40 L80,45 L70,48 L50,50 L35,48 L25,45 L15,40 L12,35 Z"
            fill="rgba(180, 110, 65, 0.1)"
            stroke="#B66E41"
            strokeWidth="0.5"
            strokeDasharray="2,1"
          />
          
          {/* District Points */}
          {districts.map((district) => {
            const isSelected = selectedDistrict?.id === district.id;
            const isHovered = hoveredDistrict === district.id;
            const color = getDistrictColor(district, isSelected, isHovered);
            
            return (
              <g key={district.id}>
                {/* District Dot */}
                <circle
                  cx={district.coordinates.x}
                  cy={district.coordinates.y}
                  r={isSelected ? "3" : isHovered ? "2.5" : "2"}
                  fill={color}
                  stroke="white"
                  strokeWidth="1"
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => onDistrictClick(district)}
                  onMouseEnter={() => onDistrictHover(district.id)}
                  onMouseLeave={() => onDistrictHover(null)}
                />
                
                {/* District Label */}
                <text
                  x={district.coordinates.x}
                  y={district.coordinates.y - 4}
                  textAnchor="middle"
                  className="text-xs fill-[#2C2A4A] font-semibold cursor-pointer"
                  onClick={() => onDistrictClick(district)}
                  onMouseEnter={() => onDistrictHover(district.id)}
                  onMouseLeave={() => onDistrictHover(null)}
                >
                  {district.name}
                </text>
                
                {/* Craft Label on Hover/Selection */}
                {(isSelected || isHovered) && (
                  <text
                    x={district.coordinates.x}
                    y={district.coordinates.y + 8}
                    textAnchor="middle"
                    className="text-xs fill-[#B66E41] font-medium"
                  >
                    {district.crafts[0]}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Compass */}
          <g transform="translate(85, 50)">
            <circle cx="0" cy="0" r="5" fill="white" stroke="#B66E41" strokeWidth="0.5" />
            <text x="0" y="1" textAnchor="middle" className="text-xs fill-[#B66E41] font-bold">N</text>
            <line x1="0" y1="-3" x2="0" y2="-1" stroke="#B66E41" strokeWidth="1" markerEnd="url(#arrow)" />
          </g>
          
          {/* Arrow Marker */}
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#B66E41" />
            </marker>
          </defs>
        </svg>
        
        {/* Hover Tooltip */}
        {hoveredDistrictData && (
          <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-10">
            <div>
              <p className="font-semibold text-[#2C2A4A]">{hoveredDistrictData.name}</p>
              <p className="text-sm text-[#B66E41]">{hoveredDistrictData.crafts.join(', ')}</p>
              <p className="text-xs text-[#3A3A3A]">{hoveredDistrictData.industryType}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-center">
        <p className="text-sm text-[#3A3A3A]">
          🖱️ Click on districts to explore • 🎨 Hover for quick info
        </p>
      </div>
    </div>
  );
}