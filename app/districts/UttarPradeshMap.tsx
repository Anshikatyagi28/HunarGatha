"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { motion } from "framer-motion";
import { useState } from "react";

// Colors based on industry type
const industryColors = {
  Textiles: "#fbbf24",
  Leather: "#60a5fa",
  Agriculture: "#34d399",
  Default: "#d1d5db"
};

export default function UttarPradeshMap() {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Uttar Pradesh Industrial Map
      </h2>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [80.9462, 27.0], // Center of UP
          scale: 4000
        }}
        className="w-full h-auto"
      >
        <Geographies geography="/geo/uttar-pradesh.json">
          {({ geographies }) =>
            geographies.map((geo) => {
              const { name, industryType } = geo.properties;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    hoveredDistrict === name
                      ? "#f87171" // Hover color
                      : industryColors[industryType] || industryColors.Default
                  }
                  stroke="#374151"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", cursor: "pointer" },
                    pressed: { outline: "none" }
                  }}
                  onMouseEnter={() => setHoveredDistrict(name)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => alert(`Clicked on ${name}`)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {hoveredDistrict && (
        <motion.div
          className="mt-4 p-3 rounded-lg bg-gray-100 text-center shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg font-medium">{hoveredDistrict}</p>
        </motion.div>
      )}
    </div>
  );
}
