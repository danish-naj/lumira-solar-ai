import React, { useState } from "react";
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
  Sun
} from "lucide-react";

export default function StormDefenseCockpit({ farm }) {
  const [stowMode, setStowMode] = useState("normal"); // 'normal' | 'hail' | 'wind'
  const [windSpeed, setWindSpeed] = useState(16.4); // km/h
  const [hailRiskProbability, setHailRiskProbability] = useState(12); // %

  const handleActivateHailStow = () => {
    setStowMode("hail");
  };

  const handleActivateWindStow = () => {
    setStowMode("wind");
  };

  const handleResetNormal = () => {
    setStowMode("normal");
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CloudRain className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              SEVERE WEATHER & STORM DEFENSE COCKPIT
            </span>
            <span className="font-mono-data text-xs text-secondary">
              NEXTracker SCADA Emergency Stow Automator
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Automated Hail Defense, Wind Stow & Surge Protection
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 font-mono-data text-xs font-bold border-2 uppercase ${
            stowMode === "hail" 
              ? "bg-[#fef3f2] text-critical border-critical animate-pulse" 
              : stowMode === "wind" 
              ? "bg-[#fffaeb] text-warning border-warning" 
              : "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]"
          }`}>
            DEFENSE STATUS: {stowMode === "hail" ? "75° HAIL STOW ACTIVE" : stowMode === "wind" ? "0° HIGH-WIND STOW" : "NORMAL TRACKING"}
          </span>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
        {/* Left Column: Live Doppler Weather Radar & Defense Triggers (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Defense Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleActivateHailStow}
              className={`p-4 border-2 transition-all cursor-pointer text-left shadow-xs flex flex-col justify-between h-28 ${
                stowMode === "hail" ? "bg-critical text-white border-critical font-bold" : "bg-white text-critical border-critical hover:bg-[#fef3f2]"
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold">HAIL ALERT (&gt;35MM)</span>
                <CloudRain className="w-5 h-5" />
              </div>
              <strong className="text-xs uppercase block">ACTIVATE 75° HAIL STOW</strong>
            </button>

            <button
              onClick={handleActivateWindStow}
              className={`p-4 border-2 transition-all cursor-pointer text-left shadow-xs flex flex-col justify-between h-28 ${
                stowMode === "wind" ? "bg-warning text-primary border-primary font-bold" : "bg-white text-primary border-primary hover:bg-surface"
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold">WIND (&gt;80 KM/H)</span>
                <Wind className="w-5 h-5" />
              </div>
              <strong className="text-xs uppercase block">ACTIVATE 0° WIND STOW</strong>
            </button>

            <button
              onClick={handleResetNormal}
              className={`p-4 border-2 transition-all cursor-pointer text-left shadow-xs flex flex-col justify-between h-28 ${
                stowMode === "normal" ? "bg-[#027a48] text-white border-[#027a48] font-bold" : "bg-white text-[#027a48] border-[#027a48] hover:bg-[#f6fef9]"
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold">CLEAR WEATHER</span>
                <Sun className="w-5 h-5" />
              </div>
              <strong className="text-xs uppercase block">RESUME NORMAL TRACKING</strong>
            </button>
          </div>

          {/* 3D Tracker Angle Kinematics Viewport */}
          <div className="border border-border-strong bg-[#0f172a] h-64 p-4 text-white flex items-center justify-center">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <rect x="20" y="160" width="360" height="20" fill="#1e293b" stroke="#334155" />
              
              {/* Tracker Table */}
              {stowMode === "hail" ? (
                <>
                  <line x1="200" y1="160" x2="250" y2="40" stroke="#ef4444" strokeWidth="8" />
                  <text x="260" y="50" fill="#ef4444" fontSize="10" fontWeight="bold" fontFamily="monospace">75° Steep Hail Angle</text>
                  <text x="50" y="80" fill="#ef4444" fontSize="9" fontFamily="monospace">Kinetic impact reduced by 85%</text>
                </>
              ) : stowMode === "wind" ? (
                <>
                  <line x1="100" y1="160" x2="300" y2="160" stroke="#f59e0b" strokeWidth="8" />
                  <text x="140" y="145" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">0° Aerodynamic Stow</text>
                </>
              ) : (
                <>
                  <line x1="120" y1="160" x2="280" y2="100" stroke="#22c55e" strokeWidth="8" />
                  <text x="210" y="90" fill="#22c55e" fontSize="10" fontWeight="bold" fontFamily="monospace">42.5° Normal Sun Tracking</text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Right Column: Surge Protection & Doppler Telemetry (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs">
            <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5">
              LIGHTNING & SURGE PROTECTOR (SPD) HEALTH:
            </strong>
            <div className="space-y-1.5 text-xs text-secondary font-sans">
              <div className="flex justify-between"><span>Combiner SPDs (Class I+II):</span> <strong className="font-mono-data text-[#027a48]">48 / 48 Operational</strong></div>
              <div className="flex justify-between"><span>Inverter Grounding Resistance:</span> <strong className="font-mono-data text-primary">0.48 Ω (&lt;1.0 Ω Nominal)</strong></div>
              <div className="flex justify-between"><span>Doppler Convective Storm ETA:</span> <strong className="font-mono-data text-primary">No Storm Cells (&gt;60km)</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
