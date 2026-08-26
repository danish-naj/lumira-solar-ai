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
  Compass,
  Wind,
  Cloud,
  CloudRain,
  CloudSun,
  Sliders,
  Play,
  Pause,
  ArrowRight
} from "lucide-react";

export default function SolarFarm3DVisualizer({ farm, onNavigateTab }) {
  // 1. Sun & Celestial Mechanics State
  const [sunAngle, setSunAngle] = useState(65); // 0° (Dawn 06:00) to 90° (Noon 12:00) to 180° (Dusk 18:00)
  const [timeOfDay, setTimeOfDay] = useState("10:20 AM");
  const [isOrbiting, setIsOrbiting] = useState(false);

  // 2. 3D Viewport Controls
  const [viewAngle, setViewAngle] = useState("isometric"); // 'isometric' | 'top' | 'front'
  const [showDirectRays, setShowDirectRays] = useState(true);
  const [showThermalGlow, setShowThermalGlow] = useState(false);
  const [showDroneFlight, setShowDroneFlight] = useState(true);

  // 3. Dynamic Cloud & Atmospheric Shadow Physics State
  const [cloudCoverage, setCloudCoverage] = useState(25); // %
  const [cloudSpeed, setCloudSpeed] = useState(8.0); // m/s
  const [cloudShadowOpacity, setCloudShadowOpacity] = useState(65); // %
  const [cloudOffset, setCloudOffset] = useState(120); // x-position loop

  // 4. Weather Forecasting & Microclimate Presets
  const [activeWeatherPreset, setActiveWeatherPreset] = useState("clear"); // 'clear' | 'cumulus' | 'dust' | 'monsoon'

  // Calculations:
  // Sun Elevation Angle (0° at horizon to 90° at solar noon)
  const sunElevationRad = (sunAngle * Math.PI) / 180;
  const sunElevationDeg = Math.round(Math.sin(sunElevationRad) * 90);

  // NEXTracker Horizon Single-Axis Tracker Kinematics (-60° East to +60° West)
  const trackerTilt = Number(((sunAngle - 90) * 0.66).toFixed(1));

  // Sun 3D Position Coordinates
  const sun3DX = 200 + 160 * Math.cos(sunElevationRad + Math.PI);
  const sun3DY = 190 - 150 * Math.sin(sunElevationRad);

  // Direct Solar Ray Angle of Incidence on Panel
  const incidenceAngleDeg = Math.abs(sunElevationDeg - Math.abs(trackerTilt));
  const directIlluminationFraction = Math.max(0.1, Math.cos((incidenceAngleDeg * Math.PI) / 180));

  // Weather Preset Values
  const weatherSpecs = {
    clear: { label: "Clear Desert Sky", ghi: 942, dni: 860, dhi: 120, ambientC: 41.8, moduleC: 58.4, cloudFactor: 1.0 },
    cumulus: { label: "Transient Cloud Shadows", ghi: 760, dni: 520, dhi: 260, ambientC: 38.5, moduleC: 51.2, cloudFactor: 0.78 },
    dust: { label: "Desert Dust Haze / Sandstorm", ghi: 620, dni: 380, dhi: 280, ambientC: 43.0, moduleC: 54.0, cloudFactor: 0.65 },
    monsoon: { label: "Monsoon Overcast Rain", ghi: 280, dni: 80, dhi: 210, ambientC: 32.0, moduleC: 36.5, cloudFactor: 0.32 },
  };

  const currentW = weatherSpecs[activeWeatherPreset] || weatherSpecs.clear;

  // Real-time Fleet Output Calculation
  const fleetCapacityMW = 50.0;
  const currentFleetOutputMW = Number(
    (fleetCapacityMW * directIlluminationFraction * currentW.cloudFactor * Math.sin(sunElevationRad)).toFixed(1)
  );

  // Per-Panel Generation (LONGi 540 Wp nominal)
  const panelNominalWp = 540;
  const panelLiveWp = Math.round(panelNominalWp * directIlluminationFraction * currentW.cloudFactor * Math.sin(sunElevationRad));

  // Time-of-Day Formatter
  const handleSunSliderChange = (val) => {
    setSunAngle(val);
    const hour = Math.floor(6 + (val / 180) * 12);
    const minute = Math.floor((((val / 180) * 12) % 1) * 60);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    setTimeOfDay(`${displayHour}:${minute < 10 ? "0" : ""}${minute} ${period}`);
  };

  // Automated Sun Celestial Orbit Loop
  useEffect(() => {
    let interval = null;
    if (isOrbiting) {
      interval = setInterval(() => {
        setSunAngle((prev) => {
          const next = prev >= 180 ? 0 : prev + 1;
          handleSunSliderChange(next);
          return next;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isOrbiting]);

  // Dynamic Cloud Drifting Animation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCloudOffset((prev) => (prev >= 440 ? -40 : prev + (cloudSpeed / 4)));
    }, 100);
    return () => clearInterval(interval);
  }, [cloudSpeed]);

  return (
    <div className="space-y-6 font-sans select-none">
      {/* 1. Sub-Header & 3D Celestial Engine Title */}
      <div className="border-b-2 border-primary pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Box className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              3D DIGITAL TWIN & REAL-TIME CELESTIAL RAY ENGINE
            </span>
            <span className="font-mono-data text-xs text-secondary">
              NEXTracker ±60° Kinematics · Per-Panel Direct Ray Vector Physics
            </span>
          </div>
          <h2 className="font-headline-lg text-xl font-bold text-primary tracking-tight">
            Interactive 3D Solar Array, Direct Sun Ray Vectors & Cloud Shadow Dynamics
          </h2>
        </div>

        {/* Total Live Generation Gauge */}
        <div className="border-2 border-primary bg-white px-4 py-2 text-right font-mono-data text-xs shadow-xs">
          <span className="text-[10px] text-secondary uppercase font-bold block">REAL-TIME FLEET POWER GENERATION</span>
          <strong className="text-xl font-bold text-primary block">
            {currentFleetOutputMW} <span className="text-xs text-secondary font-normal font-sans">MW / 50.0 MW</span>
          </strong>
        </div>
      </div>

      {/* 2. Top Weather & Atmospheric Presets Bar */}
      <div className="bg-white border border-border-strong p-4 flex flex-wrap items-center justify-between gap-4 font-mono-data text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-secondary font-bold uppercase text-[10px] font-sans">ATMOSPHERIC PRESET:</span>
          {[
            { id: "clear", label: "Clear Sky", icon: Sun },
            { id: "cumulus", label: "Passing Clouds", icon: CloudSun },
            { id: "dust", label: "Dust Haze", icon: Wind },
            { id: "monsoon", label: "Monsoon Rain", icon: CloudRain },
          ].map((preset) => {
            const Icon = preset.icon;
            const isSelected = activeWeatherPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setActiveWeatherPreset(preset.id);
                  if (preset.id === "clear") setCloudCoverage(5);
                  else if (preset.id === "cumulus") setCloudCoverage(45);
                  else if (preset.id === "dust") setCloudCoverage(30);
                  else if (preset.id === "monsoon") setCloudCoverage(85);
                }}
                className={`px-3 py-1.5 font-bold uppercase transition-all cursor-pointer border flex items-center gap-1.5 text-xs ${
                  isSelected ? "bg-primary text-white border-primary shadow-xs" : "bg-surface text-secondary border-border-subtle hover:border-primary"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-6 text-[11px] text-secondary font-mono-data">
          <span>GHI: <strong className="text-primary">{currentW.ghi} W/m²</strong></span>
          <span>DNI: <strong className="text-primary">{currentW.dni} W/m²</strong></span>
          <span>DHI: <strong className="text-primary">{currentW.dhi} W/m²</strong></span>
          <span>Module Temp: <strong className="text-critical">{currentW.moduleC}°C</strong></span>
        </div>
      </div>

      {/* 3. Main 3D Canvas Viewport (12 Cols) */}
      <div className="border-2 border-primary bg-white p-6 shadow-xs space-y-4 font-mono-data text-xs">
        {/* Viewport Top Bar Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-3 gap-3">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-primary flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-warning" />
              <span>SUN POSITION: {timeOfDay} ({sunAngle}° Azimuth / {sunElevationDeg}° Elevation)</span>
            </span>
            <span className="text-secondary text-xs">
              NEXTracker Slew: <strong className="text-primary">{trackerTilt}°</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={showDirectRays}
                onChange={(e) => setShowDirectRays(e.target.checked)}
                className="accent-primary"
              />
              <span>Direct Photon Rays</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={showThermalGlow}
                onChange={(e) => setShowThermalGlow(e.target.checked)}
                className="accent-primary"
              />
              <span>Thermal IR Heatmap</span>
            </label>
            <button
              onClick={() => setIsOrbiting(!isOrbiting)}
              className={`px-3 py-1 text-xs uppercase font-bold border flex items-center gap-1.5 cursor-pointer transition-all ${
                isOrbiting ? "bg-critical text-white border-critical animate-pulse" : "bg-surface text-primary border-border-strong hover:border-primary"
              }`}
            >
              {isOrbiting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isOrbiting ? "Pause Orbit" : "Auto Orbit"}</span>
            </button>
          </div>
        </div>

        {/* 3D SVG Render Canvas */}
        <div className="relative border border-border-strong bg-[#0f172a] h-96 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 400 240" className="w-full h-full">
            {/* Desert Ground Plane */}
            <polygon points="20,170 380,170 340,230 60,230" fill="#1e293b" stroke="#334155" strokeWidth="1" />

            {/* Passing Cloud Shadow Cone (Dynamic Drifting) */}
            <g transform={`translate(${cloudOffset}, 0)`}>
              <ellipse 
                cx="100" 
                cy="195" 
                rx="65" 
                ry="22" 
                fill="rgba(0, 0, 0, 0.45)" 
                filter="blur(3px)"
              />
            </g>

            {/* 6 Solar Panel Tables with Dynamic Tracker Kinematics Rotation */}
            {[
              { id: 1, x: 70, y: 190, row: "Table Row 1" },
              { id: 2, x: 120, y: 190, row: "Table Row 2" },
              { id: 3, x: 170, y: 190, row: "Table Row 3" },
              { id: 4, x: 220, y: 190, row: "Table Row 4" },
              { id: 5, x: 270, y: 190, row: "Table Row 5" },
              { id: 6, x: 320, y: 190, row: "Table Row 6" },
            ].map((table) => {
              // Calculate panel perspective height and tilt skew based on trackerTilt
              const tiltOffset = trackerTilt * 0.25;
              const isUnderCloud = Math.abs((table.x) - (cloudOffset + 100)) < 45;
              const panelFill = showThermalGlow
                ? (isUnderCloud ? "#3b82f6" : "#f97316")
                : (isUnderCloud ? "#1e293b" : "#0284c7");

              return (
                <g key={table.id}>
                  {/* Tracker Support Torque Tube */}
                  <line x1={table.x} y1="190" x2={table.x} y2="215" stroke="#64748b" strokeWidth="2.5" />
                  <circle cx={table.x} cy="190" r="2.5" fill="#94a3b8" />

                  {/* PV Module Table Surface with Perspective Tilt */}
                  <polygon
                    points={`
                      ${table.x - 18},${190 - 20 + tiltOffset}
                      ${table.x + 18},${190 - 20 - tiltOffset}
                      ${table.x + 18},${190 + 20 - tiltOffset}
                      ${table.x - 18},${190 + 20 + tiltOffset}
                    `}
                    fill={panelFill}
                    stroke={isUnderCloud ? "#64748b" : "#38bdf8"}
                    strokeWidth="1"
                    className="transition-all duration-150"
                  />

                  {/* Direct Sun Ray Beam Vector */}
                  {showDirectRays && sunElevationDeg > 5 && !isUnderCloud && (
                    <line
                      x1={sun3DX}
                      y1={sun3DY}
                      x2={table.x}
                      y2={190 - 10}
                      stroke="#fbbf24"
                      strokeWidth="0.75"
                      strokeDasharray="2,2"
                      opacity="0.65"
                    />
                  )}

                  {/* Direct Hit Point Marker */}
                  <circle 
                    cx={table.x} 
                    cy={190 + tiltOffset * 0.3} 
                    r="2" 
                    fill={isUnderCloud ? "#94a3b8" : "#fbbf24"} 
                  />
                  <text x={table.x - 12} y="228" fill="#64748b" fontSize="6" fontFamily="monospace">R{table.id}</text>
                </g>
              );
            })}

            {/* Drifting Clouds in Sky Dome */}
            <g transform={`translate(${cloudOffset}, 0)`}>
              <path
                d="M 60 45 Q 75 30 95 40 Q 115 25 135 45 Q 155 35 160 55 Q 165 70 145 75 L 65 75 Q 45 65 60 45 Z"
                fill="#ffffff"
                opacity={cloudCoverage / 100}
              />
            </g>

            {/* The 3D Sun Celestial Body */}
            <g transform={`translate(${sun3DX}, ${sun3DY})`}>
              <circle cx="0" cy="0" r="14" fill="#fbbf24" opacity="0.4" className="animate-pulse" />
              <circle cx="0" cy="0" r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
            </g>

            {/* Autonomous Inspection Drone in Flight */}
            {showDroneFlight && (
              <g transform="translate(180, 100)">
                <circle cx="0" cy="0" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" />
                <rect x="-4" y="-3" width="8" height="6" fill="#ef4444" />
                <text x="8" y="2" fill="#ef4444" fontSize="7" fontWeight="bold" fontFamily="monospace">DJI M300</text>
              </g>
            )}
          </svg>
        </div>

        {/* 4. Interactive Sun Orbit & Cloud Physics Sliders (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface p-5 border border-border-strong font-sans text-xs">
          {/* Left Column: Sun Celestial Orbit Physics */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-border-subtle pb-1.5">
              <strong className="font-mono-data text-primary text-xs uppercase flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-warning" />
                <span>1. CELESTIAL SUN POSITION & RAY TRAJECTORY:</span>
              </strong>
              <strong className="font-mono-data text-primary">{timeOfDay} ({sunAngle}°)</strong>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-secondary">
                <span>06:00 AM (Dawn 0°)</span>
                <span>12:00 PM (Noon 90°)</span>
                <span>06:00 PM (Dusk 180°)</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                value={sunAngle}
                onChange={(e) => handleSunSliderChange(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono-data text-[11px] bg-white p-2.5 border border-border-subtle">
              <div><span className="text-secondary">Solar Elevation Angle:</span> <strong className="text-primary block">{sunElevationDeg}° AGL</strong></div>
              <div><span className="text-secondary">Tracker Optimal Slew:</span> <strong className="text-primary block">{trackerTilt}°</strong></div>
              <div><span className="text-secondary">Direct Ray Incidence:</span> <strong className="text-[#027a48] block">cos(θi) = {(directIlluminationFraction).toFixed(2)}</strong></div>
              <div><span className="text-secondary">Single Panel Output:</span> <strong className="text-primary block">{panelLiveWp} Wp / 540 Wp</strong></div>
            </div>
          </div>

          {/* Right Column: Cloud Dynamics & Shadow Simulator */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-border-subtle pb-1.5">
              <strong className="font-mono-data text-primary text-xs uppercase flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-primary" />
                <span>2. CLOUD DYNAMICS & TRANSIENT SHADOW SIMULATOR:</span>
              </strong>
              <strong className="font-mono-data text-primary">{cloudCoverage}% Cover</strong>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span>Cloud Layer Drift Speed:</span>
                  <strong className="font-mono-data text-primary">{cloudSpeed} m/s</strong>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="0.5"
                  value={cloudSpeed}
                  onChange={(e) => setCloudSpeed(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span>Cloud Shadow Opacity & Thickness:</span>
                  <strong className="font-mono-data text-primary">{cloudShadowOpacity}%</strong>
                </div>
                <input
                  type="range"
                  min="20"
                  max="95"
                  value={cloudShadowOpacity}
                  onChange={(e) => setCloudShadowOpacity(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-white p-2.5 border border-border-subtle font-mono-data text-[11px] flex justify-between items-center">
              <span>Shaded Panel Transient Loss:</span>
              <strong className="text-critical font-bold">-{Math.round((1 - (1 - (cloudShadowOpacity / 100) * 0.75)) * 100)}% Irradiance Dip</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(TWIN_FILE, "w", encoding="utf-8") as f:
    f.write(code)
print("Supercharged SolarFarm3DVisualizer.jsx with advanced direct ray physics, per-panel generation, and cloud shadow dynamics!")
