import os

GRID_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\SolarMap\DigitalTwinGrid.jsx"

code = """import React, { useMemo, useState } from "react";
import { 
  Zap, 
  Thermometer, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  Compass,
  Cpu
} from "lucide-react";

export default function DigitalTwinGrid({ 
  modules, 
  selectedModule, 
  onSelectModule, 
  farm, 
  colorMode = "health",
  zoomLevel = 1,
  selectedString = "ALL",
  isScanning = false
}) {
  const rows = farm?.rows || 20;
  const cols = farm?.cols || 60;
  const inverterCount = farm?.inverter_count || 6;

  const [hoveredMod, setHoveredMod] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const moduleMap = useMemo(() => {
    const map = {};
    modules.forEach((m) => {
      map[`${m.row}-${m.col}`] = m;
    });
    return map;
  }, [modules]);

  const rowIndices = Array.from({ length: rows }, (_, i) => i + 1);
  const colIndices = Array.from({ length: cols }, (_, i) => i + 1);

  // Helper to map col to String ID
  const getStringId = (col) => {
    const strNum = ((col - 1) % 4) + 1;
    return `STR-0${strNum}`;
  };

  return (
    <div 
      className="flex-1 overflow-auto custom-scrollbar p-6 bg-[#0b0f17] relative select-none min-w-0"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {/* Animated AI Scanning Laser Beam */}
      {isScanning && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#22c55e] to-transparent shadow-[0_0_15px_#22c55e] animate-bounce" />
          <div className="absolute top-4 left-6 bg-black/80 text-[#22c55e] border border-[#22c55e] px-3 py-1 text-xs font-mono-data font-bold uppercase tracking-wider animate-pulse">
            AI REAL-TIME MULTI-SPECTRAL ARRAY SWEEP ACTIVE
          </div>
        </div>
      )}

      {/* Main Scalable Grid Container */}
      <div 
        className="transition-transform duration-200 origin-top-left"
        style={{
          minWidth: zoomLevel === 1 ? "1100px" : zoomLevel === 2 ? "1800px" : "3200px",
          transform: `scale(${zoomLevel === 1 ? 1 : 1})`,
        }}
      >
        {/* Dynamic Inverter Column Headers */}
        <div 
          className="grid gap-2 mb-3"
          style={{
            gridTemplateColumns: `repeat(${inverterCount}, minmax(0, 1fr))`
          }}
        >
          {Array.from({ length: inverterCount }, (_, i) => (
            <div 
              key={i} 
              className="text-center font-mono-data text-xs font-bold border-b-2 border-primary pb-1 text-white bg-surface/10 uppercase tracking-widest"
            >
              INVERTER 0{i + 1} (8.33 MWp DC SUB-ARRAY)
            </div>
          ))}
        </div>

        {/* Matrix Grid Canvas */}
        <div 
          className="grid gap-[2px] bg-[#1e293b] p-1.5 border-2 border-primary shadow-2xl"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(${zoomLevel === 1 ? "12px" : zoomLevel === 2 ? "24px" : "48px"}, 1fr))`,
          }}
        >
          {rowIndices.map((r) =>
            colIndices.map((c) => {
              const mod = moduleMap[`${r}-${c}`];
              const isSelected = selectedModule?.id === mod?.id;
              const score = mod ? mod.health_score : 100;
              const isCritical = score < 50;
              const isWarning = score >= 50 && score < 85;
              const defect = mod?.defects?.[0];
              const deltaT = defect?.temperature_delta_c || 0.0;
              const stringId = getStringId(c);

              // String Isolation Check
              const isStringMatch = selectedString === "ALL" || selectedString === stringId;

              // Multi-Spectral Color Mapping
              let cellStyle = "bg-[#027a48] border border-[#059669]";

              if (colorMode === "thermal") {
                // Radiometric IR Ironbow (35°C - 75°C)
                if (isCritical || deltaT > 15.0) {
                  cellStyle = "bg-[#fef08a] border-2 border-white animate-pulse shadow-[0_0_8px_#fef08a]";
                } else if (deltaT > 5.0 || score < 65) {
                  cellStyle = "bg-[#ea580c] border border-[#fdba74]";
                } else if (deltaT > 1.0 || isWarning) {
                  cellStyle = "bg-[#9a3412] border border-[#fed7aa]";
                } else {
                  cellStyle = "bg-[#1e1b4b] border border-[#312e81]";
                }
              } else if (colorMode === "el") {
                // Electroluminescence (EL) Monochrome & Crack Inactive Zones
                if (isCritical) {
                  cellStyle = "bg-[#000000] border border-red-500/50 shadow-inner"; // Dead cracked cell
                } else if (isWarning) {
                  cellStyle = "bg-[#475569] border border-[#64748b]"; // Microcracked resistance
                } else {
                  cellStyle = "bg-[#f8fafc] border border-[#cbd5e1]"; // Pure luminescent wafer
                }
              } else if (colorMode === "soiling") {
                // Optical Soiling Density
                if (r > 15) {
                  cellStyle = "bg-[#b45309] border border-[#d97706]"; // High perimeter road dust
                } else if (r > 10) {
                  cellStyle = "bg-[#d97706] border border-[#f59e0b]"; // Moderate dust
                } else {
                  cellStyle = "bg-[#0284c7] border border-[#38bdf8]"; // Clean glass
                }
              } else if (colorMode === "voltage") {
                // String Voltage & MPPT Drops
                if (isCritical) {
                  cellStyle = "bg-[#dc2626] border border-[#f87171] animate-pulse";
                } else if (isWarning) {
                  cellStyle = "bg-[#ca8a04] border border-[#fde047]";
                } else {
                  cellStyle = "bg-[#16a34a] border border-[#4ade80]";
                }
              } else if (colorMode === "pid") {
                // PID Degradation
                if (c % 10 === 0 && isCritical) {
                  cellStyle = "bg-[#7c3aed] border border-[#c084fc] animate-pulse"; // Severe PID polarization
                } else {
                  cellStyle = "bg-[#1e293b] border border-[#334155]";
                }
              } else {
                // Health Score Standard
                if (isCritical) {
                  cellStyle = "bg-[#fef3f2] border border-[#d92d20] animate-pulse";
                } else if (isWarning) {
                  cellStyle = "bg-[#fffaeb] border border-[#fedf89]";
                } else {
                  cellStyle = "bg-[#ecfdf3] border border-[#abefc6]";
                }
              }

              // Apply dimming if string isolation filter active
              const dimClass = isStringMatch ? "opacity-100" : "opacity-15 grayscale";

              return (
                <div
                  key={`${r}-${c}`}
                  id={`module-${r}-${c}`}
                  onClick={() => mod && onSelectModule(mod)}
                  onMouseEnter={() => setHoveredMod(mod || { id: `#R${r}-C${c}`, row: r, col: c, health_score: 100 })}
                  onMouseLeave={() => setHoveredMod(null)}
                  className={`aspect-square cursor-pointer transition-all ${cellStyle} ${dimClass} ${
                    isSelected ? "ring-2 ring-white scale-125 z-20 shadow-2xl" : "hover:scale-110 hover:z-10"
                  }`}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Interactive Hover Micro-HUD */}
      {hoveredMod && (
        <div 
          className="pointer-events-none fixed z-50 bg-black/95 text-white border-2 border-primary p-3 shadow-2xl font-mono-data text-xs w-64 space-y-1.5 backdrop-blur-md"
          style={{
            left: `${Math.min(window.innerWidth - 280, mousePos.x + 20)}px`,
            top: `${Math.min(window.innerHeight - 200, mousePos.y + 20)}px`,
          }}
        >
          <div className="flex justify-between items-center border-b border-white/20 pb-1">
            <strong className="text-white text-xs font-bold">{hoveredMod.id}</strong>
            <span className={`px-1.5 py-0.2 text-[9px] font-bold ${
              hoveredMod.health_score < 50 ? "bg-critical text-white" : hoveredMod.health_score < 85 ? "bg-warning text-black" : "bg-[#22c55e] text-black"
            }`}>
              {hoveredMod.health_score}/100
            </span>
          </div>

          <div className="text-[10px] space-y-1 text-slate-300 font-sans">
            <div className="flex justify-between"><span>Location:</span> <strong className="font-mono-data text-white">Row {hoveredMod.row}, Col {hoveredMod.col}</strong></div>
            <div className="flex justify-between"><span>Inverter/String:</span> <strong className="font-mono-data text-white">INV-0{Math.ceil(hoveredMod.col / 10)} · {getStringId(hoveredMod.col)}</strong></div>
            <div className="flex justify-between"><span>Thermal ΔT:</span> <strong className="font-mono-data text-critical">+{hoveredMod.defects?.[0]?.temperature_delta_c || 0.0}°C</strong></div>
            <div className="flex justify-between"><span>Defect Type:</span> <strong className="font-mono-data text-white">{hoveredMod.defects?.[0]?.type || "Nominal Healthy"}</strong></div>
            <div className="flex justify-between border-t border-white/20 pt-1">
              <span>Annualized Loss:</span>
              <strong className="font-mono-data text-[#22c55e]">
                {hoveredMod.health_score < 50 ? "₹14,200 / yr" : hoveredMod.health_score < 85 ? "₹3,400 / yr" : "₹0 (Optimal)"}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Mini-Map Radar Overview (Bottom-Right) */}
      <div className="fixed bottom-6 right-8 bg-black/90 border-2 border-primary p-2 z-40 hidden md:block shadow-2xl font-mono-data text-[9px] text-white">
        <div className="flex justify-between items-center mb-1 text-[8px] text-slate-400 font-bold uppercase">
          <span>MINI-MAP RADAR</span>
          <span className="text-[#22c55e]">50 MWp</span>
        </div>
        <div className="w-28 h-12 bg-slate-900 border border-slate-700 relative flex items-center justify-center">
          <div className="absolute inset-1 border border-dashed border-[#22c55e]/50" />
          <div className="w-8 h-5 border-2 border-white bg-white/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
"""

with open(GRID_FILE, "w", encoding="utf-8") as f:
    f.write(code)
print("Supercharged DigitalTwinGrid.jsx with multi-spectral modes, string isolation, zoom scales, and hover micro-HUD!")
