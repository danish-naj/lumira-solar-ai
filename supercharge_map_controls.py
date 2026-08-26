import os

MAP_CONTROLS_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\SolarMap\MapControls.jsx"

code = """import React from "react";
import { 
  Search, 
  Thermometer, 
  ShieldCheck, 
  Zap, 
  Crosshair, 
  Layers, 
  Sparkles, 
  Sun, 
  Cpu, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Scan,
  AlertTriangle
} from "lucide-react";

export default function MapControls({ 
  filters, 
  onFilterChange, 
  searchTerm, 
  onSearchChange, 
  inverters = [], 
  colorMode, 
  onColorModeChange,
  onAutoSweep,
  zoomLevel = 1,
  onZoomChange,
  selectedString = "ALL",
  onStringChange,
  onRunAiFullSweep,
  isScanning = false
}) {
  const currentSeverity = filters.severity || "ALL";

  const spectralModes = [
    { id: "health", label: "Health Score", icon: ShieldCheck, desc: "0-100% IEC 62446" },
    { id: "thermal", label: "Radiometric IR", icon: Thermometer, desc: "35°C–75°C Ironbow" },
    { id: "el", label: "EL Microcracks", icon: Cpu, desc: "Sub-Surface Cracks" },
    { id: "soiling", label: "Optical Soiling", icon: Sun, desc: "0-25% Light Loss" },
    { id: "voltage", label: "String MPPT", icon: Zap, desc: "DC Voltage Drop" },
    { id: "pid", label: "PID Degradation", icon: AlertTriangle, desc: "Polarization Risk" },
  ];

  return (
    <div className="border-b-2 border-primary bg-white px-6 py-3 space-y-3 shrink-0 select-none font-sans shadow-xs">
      {/* Top Row: 6 Multi-Spectral Diagnostic Modes */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold text-secondary uppercase font-mono-data tracking-wider mr-1">
            SPECTRAL LAYER:
          </span>
          {spectralModes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = colorMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onColorModeChange(mode.id)}
                className={`px-3 py-1.5 flex items-center gap-1.5 font-mono-data text-xs font-bold uppercase transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-surface text-secondary border-border-subtle hover:border-primary hover:text-primary"
                }`}
                title={mode.desc}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-secondary"}`} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* AI Full-Array Auto-Diagnose Button */}
        <button
          onClick={onRunAiFullSweep}
          disabled={isScanning}
          className={`px-4 py-1.5 bg-primary text-white font-mono-data text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-primary hover:bg-white hover:text-primary transition-all cursor-pointer shadow-xs ${
            isScanning ? "animate-pulse" : ""
          }`}
        >
          <Scan className="w-3.5 h-3.5" />
          <span>{isScanning ? "AI SCANNING ARRAY..." : "AI FULL-ARRAY DIAGNOSE"}</span>
        </button>
      </div>

      {/* Bottom Row: Zoom, Inverter/String Filters, Severity & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Zoom Controls & String Isolation */}
        <div className="flex items-center gap-3 flex-wrap font-mono-data text-xs">
          {/* Zoom Switcher */}
          <div className="flex items-center gap-1 border border-border-strong p-0.5 bg-surface">
            <span className="text-[10px] text-secondary font-bold px-1.5">ZOOM:</span>
            {[1, 2, 4].map((z) => (
              <button
                key={z}
                onClick={() => onZoomChange(z)}
                className={`px-2 py-0.5 font-bold transition-all cursor-pointer ${
                  zoomLevel === z ? "bg-primary text-white" : "text-secondary hover:bg-white"
                }`}
              >
                {z}x
              </button>
            ))}
          </div>

          {/* Inverter Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-secondary font-sans text-xs">Inverter:</span>
            <select
              value={filters.inverter_id || "ALL"}
              onChange={(e) => onFilterChange("inverter_id", e.target.value)}
              className="border-b-2 border-primary bg-transparent text-primary text-xs font-mono-data py-0.5 cursor-pointer font-bold uppercase focus:outline-none"
            >
              <option value="ALL">ALL INVERTERS</option>
              {inverters.map((inv) => (
                <option key={inv} value={inv}>{inv}</option>
              ))}
            </select>
          </div>

          {/* String Isolation Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-secondary font-sans text-xs">String:</span>
            <select
              value={selectedString}
              onChange={(e) => onStringChange(e.target.value)}
              className="border-b-2 border-primary bg-transparent text-primary text-xs font-mono-data py-0.5 cursor-pointer font-bold uppercase focus:outline-none"
            >
              <option value="ALL">ALL STRINGS (48)</option>
              <option value="STR-01">STR-01 (Nominal)</option>
              <option value="STR-04">STR-04 (Diode Hotspot)</option>
              <option value="STR-07">STR-07 (Solder Burnout)</option>
              <option value="STR-12">STR-12 (Soiled)</option>
            </select>
          </div>

          {/* Auto Sweep Next Anomaly */}
          <button
            onClick={onAutoSweep}
            className="flex items-center gap-1.5 px-3 py-1 bg-surface border border-border-strong hover:border-primary hover:bg-white text-primary text-xs font-bold uppercase cursor-pointer transition-all"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>NEXT ANOMALY →</span>
          </button>
        </div>

        {/* Right: Search & Scale Legend */}
        <div className="flex items-center gap-4 font-mono-data text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-secondary absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Panel ID (#R12-C37)..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-5 border-b-2 border-primary bg-transparent text-xs py-0.5 w-44 placeholder:text-secondary font-bold text-primary focus:outline-none"
            />
          </div>

          {/* Dynamic Palette Legend */}
          <div className="flex items-center gap-1.5 text-[10px]">
            {colorMode === "thermal" && (
              <div className="flex items-center gap-1.5">
                <span className="text-secondary font-bold">35°C</span>
                <div className="h-2.5 w-20 border border-border-strong flex overflow-hidden">
                  <div className="w-1/4 bg-[#1e1b4b]" />
                  <div className="w-1/4 bg-[#7c2d12]" />
                  <div className="w-1/4 bg-[#ea580c]" />
                  <div className="w-1/4 bg-[#fef08a]" />
                </div>
                <span className="text-critical font-bold">75°C</span>
              </div>
            )}
            {colorMode === "el" && (
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-[#ffffff] border border-border-strong" />
                <span className="text-secondary">Intact</span>
                <div className="w-2.5 h-2.5 bg-[#0f172a] border border-border-strong ml-1" />
                <span className="text-critical">Microcrack Shunt</span>
              </div>
            )}
            {colorMode === "health" && (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#027a48] inline-block" /> &gt;85</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#f59e0b] inline-block" /> 50-84</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#d92d20] inline-block" /> &lt;50</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(MAP_CONTROLS_FILE, "w", encoding="utf-8") as f:
    f.write(code)
print("Supercharged MapControls.jsx!")
