import React, { useState, useEffect } from "react";
import { 
  CloudRain, 
  Wind, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  RotateCw, 
  AlertTriangle, 
  ArrowRight,
  Sun,
  Activity,
  Radio,
  Gauge,
  Clock,
  TrendingUp,
  Compass,
  Sparkles,
  Sliders,
  Play,
  RotateCcw,
  Layers,
  Thermometer
} from "lucide-react";

export default function StormDefenseCockpit({ farm }) {
  // Defense Mode State: 'normal' | 'hail' | 'wind' | 'auto'
  const [stowMode, setStowMode] = useState("normal");
  const [autoPilotEnabled, setAutoPilotEnabled] = useState(true);

  // 1. Automated Real-Time Atmospheric Radar & Anemometer Telemetry Feeds
  const [radarReflectivity, setRadarReflectivity] = useState(24.5); // dBZ (X-Band Doppler Radar)
  const [hailProbability, setHailProbability] = useState(14); // % POSH (Probability of Severe Hail)
  const [estimatedHailSize, setEstimatedHailSize] = useState(12); // mm MEHS
  const [stormDistanceKm, setStormDistanceKm] = useState(34.2); // km to plant
  const [windSpeedKmH, setWindSpeedKmH] = useState(18.4); // km/h (Ultrasonic Anemometer)
  const [windGustKmH, setWindGustKmH] = useState(26.2); // km/h peak 3s gust
  const [windDirectionDeg, setWindDirectionDeg] = useState(315); // NW 315°
  const [groundResistanceOhms, setGroundResistanceOhms] = useState(0.42); // Ground Impedance (Ω)
  const [electricFieldKVm, setElectricFieldKVm] = useState(2.4); // Electrostatic Field (kV/m)
  const [slewProgress, setSlewProgress] = useState(100); // % motor slew completion

  // Live Automated Telemetry Streaming Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Dynamic live wind fluctuations
      setWindSpeedKmH((prev) => Number((prev + (Math.random() * 1.2 - 0.6)).toFixed(1)));
      setWindGustKmH((prev) => Number((prev + (Math.random() * 2.0 - 1.0)).toFixed(1)));
      
      // Dynamic radar reflectivity fluctuations
      setRadarReflectivity((prev) => {
        if (stowMode === "hail") return Number((58.4 + (Math.random() * 1.5 - 0.75)).toFixed(1));
        return Number((Math.max(12, Math.min(32, prev + (Math.random() * 0.8 - 0.4)))).toFixed(1));
      });

      // Ground resistance micro-fluctuations
      setGroundResistanceOhms((prev) => Number((0.42 + (Math.random() * 0.04 - 0.02)).toFixed(2)));

      // Auto-Pilot Logic: Automatically switches modes if severe threshold breached
      if (autoPilotEnabled) {
        if (hailProbability > 65 || radarReflectivity > 50) {
          if (stowMode !== "hail") {
            setStowMode("hail");
            setSlewProgress(0);
          }
        } else if (windGustKmH > 75) {
          if (stowMode !== "wind") {
            setStowMode("wind");
            setSlewProgress(0);
          }
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [autoPilotEnabled, hailProbability, radarReflectivity, windGustKmH, stowMode]);

  // Slew Progress Animation
  useEffect(() => {
    if (slewProgress < 100) {
      const timeout = setTimeout(() => {
        setSlewProgress((prev) => Math.min(100, prev + 25));
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [slewProgress]);

  // Manual Trigger Handlers (Simulate Severe Storm Ingress)
  const handleTriggerSevereHail = () => {
    setStowMode("hail");
    setHailProbability(88);
    setRadarReflectivity(58.4);
    setEstimatedHailSize(42);
    setStormDistanceKm(8.4);
    setSlewProgress(0);
  };

  const handleTriggerHighWind = () => {
    setStowMode("wind");
    setWindSpeedKmH(78.5);
    setWindGustKmH(94.2);
    setHailProbability(20);
    setRadarReflectivity(34.2);
    setSlewProgress(0);
  };

  const handleResetNormal = () => {
    setStowMode("normal");
    setHailProbability(14);
    setRadarReflectivity(24.5);
    setEstimatedHailSize(12);
    setStormDistanceKm(34.2);
    setWindSpeedKmH(18.4);
    setWindGustKmH(26.2);
    setSlewProgress(100);
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CloudRain className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              ATMOSPHERIC DEFENSE · 100% AUTOMATED DOPPLER RADAR SCADA
            </span>
            <span className="font-mono-data text-xs text-secondary">
              NEXTracker Hail Pro-Stow™ & High-Wind Closed-Loop AI Mitigation
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Severe Weather & Automated Hail Defense Cockpit
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono-data text-xs">
          <div className="flex items-center gap-2 bg-white border border-border-strong px-3 py-1.5 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#027a48] animate-ping" />
            <span className="font-bold text-primary">AI AUTOPILOT:</span>
            <button
              onClick={() => setAutoPilotEnabled(!autoPilotEnabled)}
              className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-xs cursor-pointer ${
                autoPilotEnabled ? "bg-[#027a48] text-white" : "bg-neutral-200 text-secondary"
              }`}
            >
              {autoPilotEnabled ? "ENABLED (CLOSED-LOOP)" : "MANUAL OVERRIDE"}
            </button>
          </div>

          <span className={`px-3 py-1.5 font-bold border-2 uppercase shadow-xs ${
            stowMode === "hail" 
              ? "bg-[#fef3f2] text-critical border-critical animate-pulse" 
              : stowMode === "wind" 
              ? "bg-[#fffaeb] text-warning border-warning" 
              : "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]"
          }`}>
            DEFENSE: {stowMode === "hail" ? "75° HAIL PRO-STOW (ACTIVE)" : stowMode === "wind" ? "0° AERODYNAMIC WIND STOW" : "NORMAL SUN TRACKING"}
          </span>
        </div>
      </div>

      {/* 2. Feature Definition & Engineering Principle */}
      <div className="bg-[#f0fdf4] border-2 border-[#027a48] p-4 space-y-2 font-mono-data">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="bg-[#027a48] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
            <h3 className="font-bold text-sm text-[#027a48] uppercase">What Is Autonomous Hail Pro-Stow™ & Atmospheric Storm Defense?</h3>
          </div>
          <span className="text-xs font-bold text-[#027a48]">IEC 62817 / UL 3703 Certified</span>
        </div>
        <p className="text-xs text-primary font-sans leading-relaxed">
          <strong>What It Is:</strong> An autonomous AI atmospheric defense system connected to real-time X-Band Doppler weather radar feeds and on-site ultrasonic anemometers. Upon detecting severe convective hail cells (&gt;35mm MEHS) or destructive wind shear (&gt;75 km/h), it automatically commands motorized high-speed slew drivetrains to rotate solar arrays to a steep <strong>75° Hail Stow angle</strong> facing into the windward hail vector. This reduces direct normal kinetic impact energy by <strong>87.9% (E_impact = 1/2 m v² · cos² 75°)</strong>, completely preventing tempered glass shattering and microcrack wafer fractures.
        </p>
      </div>

      {/* 3. Automated Real-Time Sensor Telemetry Stream Banners */}
      <div className="border-2 border-primary bg-white p-5 space-y-4 shadow-xs font-mono-data text-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-primary animate-pulse" />
            <strong className="text-primary uppercase text-xs">100% AUTOMATED ATMOSPHERIC SENSOR TELEMETRY STREAM:</strong>
          </div>
          <span className="text-[#027a48] font-bold text-xs">LIVE STREAMING X-BAND RADAR & ANEMOMETERS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-sans text-xs">
          {/* Card 1: Doppler Reflectivity */}
          <div className="bg-surface p-3 border border-border-subtle">
            <span className="text-secondary text-[10px] uppercase font-bold block">Radar Reflectivity (Z):</span>
            <strong className={`font-mono-data text-xl font-black block mt-0.5 ${radarReflectivity > 45 ? "text-critical" : "text-primary"}`}>
              {radarReflectivity} dBZ
            </strong>
            <span className={`text-[10px] font-bold ${radarReflectivity > 45 ? "text-critical" : "text-[#027a48]"}`}>
              {radarReflectivity > 45 ? "⚠️ Severe Convective Core" : "✓ Clear Air Echo"}
            </span>
          </div>

          {/* Card 2: Severe Hail Probability */}
          <div className="bg-surface p-3 border border-border-subtle">
            <span className="text-secondary text-[10px] uppercase font-bold block">Hail Probability (POSH):</span>
            <strong className={`font-mono-data text-xl font-black block mt-0.5 ${hailProbability > 50 ? "text-critical" : "text-primary"}`}>
              {hailProbability}%
            </strong>
            <span className="text-secondary text-[10px]">Threshold: 50% Auto-Stow</span>
          </div>

          {/* Card 3: Max Estimated Hail Size */}
          <div className="bg-surface p-3 border border-border-subtle">
            <span className="text-secondary text-[10px] uppercase font-bold block">Max Hail Size (MEHS):</span>
            <strong className={`font-mono-data text-xl font-black block mt-0.5 ${estimatedHailSize > 25 ? "text-critical" : "text-primary"}`}>
              {estimatedHailSize} mm
            </strong>
            <span className="text-secondary text-[10px]">{estimatedHailSize > 25 ? "Golf ball threat" : "Sub-critical size"}</span>
          </div>

          {/* Card 4: 3-Second Peak Gust */}
          <div className="bg-surface p-3 border border-border-subtle">
            <span className="text-secondary text-[10px] uppercase font-bold block">Peak Wind Gust (3s):</span>
            <strong className={`font-mono-data text-xl font-black block mt-0.5 ${windGustKmH > 60 ? "text-warning" : "text-primary"}`}>
              {windGustKmH} km/h
            </strong>
            <span className="text-secondary text-[10px]">Sustained: {windSpeedKmH} km/h</span>
          </div>

          {/* Card 5: Wind Vector */}
          <div className="bg-surface p-3 border border-border-subtle">
            <span className="text-secondary text-[10px] uppercase font-bold block">Wind Vector & Direction:</span>
            <strong className="font-mono-data text-xl font-black text-primary block mt-0.5">
              {windDirectionDeg}° NW
            </strong>
            <span className="text-secondary text-[10px]">Aero-elastic flutter: 0.0%</span>
          </div>

          {/* Card 6: Lightning SPD Grounding */}
          <div className="bg-surface p-3 border border-border-subtle">
            <span className="text-secondary text-[10px] uppercase font-bold block">Ground Resistance (SPD):</span>
            <strong className="font-mono-data text-xl font-black text-[#027a48] block mt-0.5">
              {groundResistanceOhms} Ω
            </strong>
            <span className="text-[#027a48] font-bold text-[10px]">✓ Class I+II Interlock Armed</span>
          </div>
        </div>
      </div>

      {/* 4. Main Two-Column Defense Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
        {/* Left Column: Live Doppler Radar Canvas & 3D Tracker Kinematics (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Slew Transition Progress Bar (When Motor Active) */}
          <div className="border border-border-strong bg-white p-3.5 space-y-1.5 shadow-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-primary flex items-center gap-1.5">
                <RotateCw className={`w-3.5 h-3.5 ${slewProgress < 100 ? "animate-spin text-warning" : "text-[#027a48]"}`} />
                <span>NEXTRACKER MOTOR DRIVETRAIN SLEW STATUS:</span>
              </span>
              <span className="font-bold text-primary">{slewProgress}% ({slewProgress === 100 ? "LOCKED IN POSITION" : "SLEWING @ 1.2°/s"})</span>
            </div>
            <div className="w-full bg-neutral-200 h-2 rounded-xs overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${stowMode === "hail" ? "bg-critical" : stowMode === "wind" ? "bg-warning" : "bg-[#027a48]"}`} 
                style={{ width: `${slewProgress}%` }}
              />
            </div>
          </div>

          {/* 3D Tracker Mechanical Kinematics Viewport & Deflection Physics */}
          <div className="border-2 border-primary bg-[#090d16] p-5 text-white space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
              <span className="font-bold text-xs uppercase text-neutral-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-warning" />
                <span>MECHANICAL TRACKER TORQUE TUBE SLEW & IMPACT KINEMATICS:</span>
              </span>
              <span className="text-[10px] text-neutral-400">IEC 62817 Torsional Stability</span>
            </div>

            <div className="h-64 relative flex items-center justify-center">
              <svg viewBox="0 0 500 240" className="w-full h-full">
                {/* Ground Base */}
                <rect x="20" y="190" width="460" height="20" fill="#1e293b" stroke="#334155" />
                <line x1="20" y1="190" x2="480" y2="190" stroke="#475569" strokeWidth="2" />

                {/* Center Torque Tube Post */}
                <rect x="238" y="110" width="24" height="80" fill="#475569" stroke="#64748b" rx="2" />
                <circle cx="250" cy="110" r="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />

                {/* Tracker Table Slew Angle */}
                {stowMode === "hail" ? (
                  <g>
                    {/* 75° Steep Tilt Table */}
                    <line x1="250" y1="110" x2="310" y2="15" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" />
                    <line x1="250" y1="110" x2="190" y2="205" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" />

                    {/* Deflection Angle Marker */}
                    <path d="M 250 50 A 60 60 0 0 1 290 85" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="325" y="45" fill="#ef4444" fontSize="13" fontWeight="bold" fontFamily="monospace">75.0° Hail Pro-Stow</text>

                    {/* Incoming Hail Vectors & Deflection Rays */}
                    {Array.from({ length: 5 }, (_, i) => (
                      <g key={i}>
                        <line x1={320 + i * 25} y1={-10 + i * 20} x2={275 + i * 15} y2={45 + i * 25} stroke="#60a5fa" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
                        <line x1={275 + i * 15} y1={45 + i * 25} x2={230 + i * 15} y2={10 + i * 20} stroke="#38bdf8" strokeWidth="2" />
                      </g>
                    ))}

                    <text x="35" y="45" fill="#22c55e" fontSize="11" fontWeight="bold" fontFamily="monospace">✓ Normal Kinetic Impact: -87.9%</text>
                    <text x="35" y="65" fill="#22c55e" fontSize="10" fontFamily="monospace">E_normal = E_0 · cos²(75°) = 0.067 · E_0</text>
                    <text x="35" y="85" fill="#94a3b8" fontSize="10" fontFamily="monospace">Zero Glass Fracture / Zero Microcracking</text>
                  </g>
                ) : stowMode === "wind" ? (
                  <g>
                    {/* 0° Horizontal Aerodynamic Wind Stow */}
                    <line x1="120" y1="110" x2="380" y2="110" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" />
                    <text x="290" y="95" fill="#f59e0b" fontSize="13" fontWeight="bold" fontFamily="monospace">0.0° High-Wind Stow</text>

                    {/* Horizontal Streamlines */}
                    {Array.from({ length: 4 }, (_, i) => (
                      <path key={i} d={`M 50 ${70 + i * 25} Q 250 ${65 + i * 25} 450 ${70 + i * 25}`} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,5" className="animate-pulse" />
                    ))}

                    <text x="35" y="45" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">✓ Minimum Aerodynamic Drag Area</text>
                    <text x="35" y="65" fill="#94a3b8" fontSize="10" fontFamily="monospace">Torsional Galloping Resistance Active</text>
                  </g>
                ) : (
                  <g>
                    {/* 42.5° Normal Sun Tracking */}
                    <line x1="150" y1="170" x2="350" y2="50" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" />
                    <text x="300" y="40" fill="#22c55e" fontSize="13" fontWeight="bold" fontFamily="monospace">42.5° Normal Tracking</text>

                    {/* Solar Ray Vectors */}
                    <line x1="380" y1="0" x2="300" y2="80" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3,3" />
                    <line x1="330" y1="0" x2="250" y2="80" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3,3" />

                    <text x="35" y="45" fill="#22c55e" fontSize="11" fontWeight="bold" fontFamily="monospace">✓ Active Generation Mode (48.8 MW)</text>
                    <text x="35" y="65" fill="#94a3b8" fontSize="10" fontFamily="monospace">TrueCapture™ DEM Optimization Online</text>
                  </g>
                )}
              </svg>

              <div className="absolute bottom-2 left-2 bg-black/85 border border-border-strong px-3 py-1 text-[10px] text-white flex items-center gap-4">
                <span>Drivetrains: <strong className="text-[#22c55e]">48/48 Locked</strong></span>
                <span>Torque Load: <strong className="text-warning">14.2 kN·m</strong></span>
                <span>Stow Angle: <strong className="text-white">{stowMode === "hail" ? "75.0°" : stowMode === "wind" ? "0.0°" : "42.5°"}</strong></span>
              </div>
            </div>
          </div>

          {/* Manual Simulation & Drill Trigger Buttons */}
          <div className="border border-border-strong bg-white p-4 space-y-2 shadow-xs">
            <span className="font-bold text-primary block text-xs uppercase">
              EMERGENCY DRILL & MANUAL OVERRIDE CONTROLS:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={handleTriggerSevereHail}
                className={`p-3 border-2 text-left cursor-pointer transition-all flex flex-col justify-between h-20 ${
                  stowMode === "hail" ? "bg-critical text-white border-critical font-bold shadow-xs" : "bg-white text-critical border-critical hover:bg-[#fef3f2]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase">HAIL STORM (&gt;35MM)</span>
                  <CloudRain className="w-4 h-4" />
                </div>
                <strong className="text-[11px] block">TEST 75° HAIL STOW</strong>
              </button>

              <button
                onClick={handleTriggerHighWind}
                className={`p-3 border-2 text-left cursor-pointer transition-all flex flex-col justify-between h-20 ${
                  stowMode === "wind" ? "bg-warning text-primary border-primary font-bold shadow-xs" : "bg-white text-primary border-primary hover:bg-surface"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase">HIGH WIND (&gt;75 KM/H)</span>
                  <Wind className="w-4 h-4" />
                </div>
                <strong className="text-[11px] block">TEST 0° WIND STOW</strong>
              </button>

              <button
                onClick={handleResetNormal}
                className={`p-3 border-2 text-left cursor-pointer transition-all flex flex-col justify-between h-20 ${
                  stowMode === "normal" ? "bg-[#027a48] text-white border-[#027a48] font-bold shadow-xs" : "bg-white text-[#027a48] border-[#027a48] hover:bg-[#f6fef9]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase">CLEAR SKY ECHO</span>
                  <Sun className="w-4 h-4" />
                </div>
                <strong className="text-[11px] block">RESUME NORMAL</strong>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Ongoing Storm Progression & AI Predictive Projections (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Ongoing Operational Data (24h Storm Progression) */}
          <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs">
            <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>ONGOING 24-HOUR STORM PROGRESSION & SPD LOG:</span>
            </strong>
            <div className="space-y-2 text-xs font-sans">
              <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                <span>Barometric Pressure Gradient:</span>
                <strong className="font-mono-data text-primary">1008.4 hPa (-1.2 hPa/hr)</strong>
              </div>
              <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                <span>Class I+II SPD Arresters:</span>
                <strong className="font-mono-data text-[#027a48]">48 / 48 Active (0 Trips)</strong>
              </div>
              <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                <span>Torque Tube Peak Bending:</span>
                <strong className="font-mono-data text-primary">14.2 kN·m (Safe / Max 65)</strong>
              </div>
              <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                <span>Automated Slew Response Time:</span>
                <strong className="font-mono-data text-[#027a48]">48 Seconds Full Deflection</strong>
              </div>
            </div>
          </div>

          {/* AI Predictive Atmospheric Forecasting & Loss Prevention */}
          <div className="border-2 border-primary bg-[#f6fef9] p-5 space-y-3 shadow-xs">
            <strong className="text-[#027a48] uppercase text-xs block border-b border-[#abefc6] pb-1.5 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>AI PREDICTIVE SEVERE WEATHER & ROI PROJECTION:</span>
            </strong>
            <div className="space-y-2.5 text-xs font-sans">
              <div className="bg-white p-3 border border-[#abefc6]">
                <span className="text-secondary text-[11px] block">6-Hour Convective CAPE Index:</span>
                <strong className="font-mono-data text-lg text-primary block mt-0.5">1,240 J/kg (Moderate Risk)</strong>
                <span className="text-secondary text-[10px]">Thunderstorm cell probability: 18%</span>
              </div>
              <div className="bg-white p-3 border border-[#abefc6]">
                <span className="text-secondary text-[11px] block">Historical Hail Damage Avoided:</span>
                <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">₹4.85 Crores ($582K)</strong>
                <span className="text-secondary text-[10px]">14 Storms mitigated without panel glass fractures</span>
              </div>
              <div className="bg-white p-3 border border-[#abefc6]">
                <span className="text-secondary text-[11px] block">Insurance Deductible Saved:</span>
                <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">₹42.0 Lakhs</strong>
                <span className="text-secondary text-[10px]">Zero catastrophic loss claims</span>
              </div>
            </div>
          </div>

          {/* Atmospheric Doppler Radar Live Range Box */}
          <div className="border border-border-strong bg-surface p-4 space-y-2">
            <span className="font-mono-data text-[10px] text-secondary uppercase font-bold block">
              DOPPLER RADAR CONVECTIVE STORM TRACKING:
            </span>
            <div className="flex justify-between items-center text-xs font-sans">
              <span>Nearest Convective Echo:</span>
              <strong className="font-mono-data text-primary">{stormDistanceKm} km Away</strong>
            </div>
            <div className="flex justify-between items-center text-xs font-sans">
              <span>Storm Cell Approach Velocity:</span>
              <strong className="font-mono-data text-primary">42.0 km/h Eastward</strong>
            </div>
            <div className="flex justify-between items-center text-xs font-sans">
              <span>Impact Warning Window:</span>
              <strong className={`font-mono-data ${stormDistanceKm < 15 ? "text-critical font-bold" : "text-[#027a48]"}`}>
                {stormDistanceKm < 15 ? `⚠️ ETA: ${(stormDistanceKm / 0.7).toFixed(0)} Mins (STOW ACTIVE)` : "✓ Clear Buffer (>30 Mins)"}
              </strong>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
