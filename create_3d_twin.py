import os

TWIN_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Twin3D\SolarFarm3DVisualizer.jsx"

code = """import React, { useState, useEffect } from "react";
import { 
  Box, 
  Sun, 
  Layers, 
  Eye, 
  RotateCw, 
  Maximize2, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  Thermometer, 
  Zap, 
  Plane,
  Compass
} from "lucide-react";

export default function SolarFarm3DVisualizer({ farm, onNavigateTab }) {
  const [sunAngle, setSunAngle] = useState(45); // 0° to 180°
  const [timeOfDay, setTimeOfDay] = useState("10:30 AM");
  const [viewAngle, setViewAngle] = useState("isometric"); // 'isometric' | 'top' | 'front'
  const [showThermalGlow, setShowThermalGlow] = useState(true);
  const [showDroneFlight, setShowDroneFlight] = useState(true);

  // Compute Tracker Tilt Angle based on Sun Elevation
  const trackerTilt = ((sunAngle - 90) * 0.66).toFixed(1); // -60° to +60°

  const handleTimeChange = (val) => {
    setSunAngle(val);
    const hour = Math.floor(6 + (val / 180) * 12);
    const minute = Math.floor(((val / 180) * 12 % 1) * 60);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    setTimeOfDay(`${displayHour}:${minute < 10 ? "0" : ""}${minute} ${period}`);
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Box className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              3D DIGITAL TWIN & SUN TRAJECTORY ENGINE
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Sector 4 Photorealistic Solar Farm Model
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Interactive 3D Solar Array & Tracker Kinematics
          </h1>
        </div>

        {/* View Angle Switcher */}
        <div className="flex items-center gap-1 border-2 border-primary p-1 bg-white font-mono-data text-xs shadow-xs">
          {["isometric", "top", "front"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewAngle(mode)}
              className={`px-3 py-1 font-bold transition-all cursor-pointer uppercase ${
                viewAngle === mode ? "bg-primary text-white" : "text-secondary hover:bg-surface"
              }`}
            >
              {mode} View
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main 3D Canvas Viewport */}
      <div className="border-2 border-primary bg-white p-6 shadow-xs space-y-4 font-mono-data text-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-primary flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-warning" />
              <span>SUN POSITION: {timeOfDay} ({sunAngle}°)</span>
            </span>
            <span className="text-secondary text-xs">
              Tracker Slew: <strong className="text-primary">{trackerTilt}°</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={showThermalGlow}
                onChange={(e) => setShowThermalGlow(e.target.checked)}
                className="accent-primary"
              />
              <span>Thermal IR Glow</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={showDroneFlight}
                onChange={(e) => setShowDroneFlight(e.target.checked)}
                className="accent-primary"
              />
              <span>Aerial Drone Sweep</span>
            </label>
          </div>
        </div>

        {/* 3D SVG Rendered Solar Farm Scene */}
        <div className="relative border border-border-strong bg-[#090d16] h-80 rounded-none overflow-hidden p-4 flex items-center justify-center">
          <svg viewBox="0 0 600 300" className="w-full h-full">
            {/* Sky Background & Sun Trajectory Arc */}
            <path
              d="M 50 250 Q 300 20 550 250"
              fill="none"
              stroke="#334155"
              strokeDasharray="4,4"
            />

            {/* Moving Sun Orb */}
            <circle
              cx={50 + (sunAngle / 180) * 500}
              cy={250 - Math.sin((sunAngle * Math.PI) / 180) * 230}
              r="14"
              fill="#facc15"
              className="animate-pulse"
            />

            {/* 3D Solar Array Table Rows */}
            {/* Row 1 */}
            <g transform="translate(100, 160)">
              <polygon points="0,30 200,0 220,15 20,45" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="10" y1="40" x2="210" y2="10" stroke="#0ea5e9" strokeWidth="2" />
            </g>

            {/* Row 2 (With Hotspot on Panel 37) */}
            <g transform="translate(140, 195)">
              <polygon points="0,30 200,0 220,15 20,45" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              {showThermalGlow && (
                <polygon points="120,12 160,6 170,14 130,20" fill="rgba(239, 68, 68, 0.7)" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
              )}
              {showThermalGlow && (
                <text x="140" y="3" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="monospace">
                  HOTSPOT +18.4°C (#R12-C37)
                </text>
              )}
            </g>

            {/* Row 3 */}
            <g transform="translate(180, 230)">
              <polygon points="0,30 200,0 220,15 20,45" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="10" y1="40" x2="210" y2="10" stroke="#0ea5e9" strokeWidth="2" />
            </g>

            {/* Animated 3D Drone Sweep */}
            {showDroneFlight && (
              <g transform="translate(260, 90)">
                <circle cx="0" cy="0" r="8" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-ping" />
                <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                <polygon points="0,-6 6,0 0,6 -6,0" fill="#38bdf8" />
                <text x="10" y="3" fill="#38bdf8" fontSize="8" fontFamily="monospace">DJI M300 RTK (35m AGL)</text>
              </g>
            )}
          </svg>

          {/* Real-Time Kinematics HUD Overlay */}
          <div className="absolute bottom-3 left-3 bg-black/85 border border-border-strong px-3 py-1.5 text-[10px] text-white flex items-center gap-4">
            <span>NEXTracker Horizon: <strong className="text-[#38bdf8]">{trackerTilt}° Slew</strong></span>
            <span>Single-Axis Backtracking: <strong className="text-[#22c55e]">Optimal 0.0° Shadow</strong></span>
            <span>Active Modules in 3D: <strong className="text-white">1,200 Panels</strong></span>
          </div>
        </div>

        {/* Sun Trajectory Time-of-Day Slider */}
        <div className="bg-surface p-4 border border-border-subtle space-y-2">
          <div className="flex justify-between text-xs font-bold text-primary">
            <span>06:00 AM (Sunrise: 0°)</span>
            <span>12:00 PM (Solar Noon: 90°)</span>
            <span>06:00 PM (Sunset: 180°)</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            value={sunAngle}
            onChange={(e) => handleTimeChange(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
"""

with open(TWIN_FILE, "w", encoding="utf-8") as f:
    f.write(code)
print("Created SolarFarm3DVisualizer.jsx")
