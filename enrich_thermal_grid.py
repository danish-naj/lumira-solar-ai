import os

BASE_DIR = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\SolarMap"

# 1. Update MapControls.jsx
controls_path = os.path.join(BASE_DIR, "MapControls.jsx")
controls_code = """import React from "react";
import { Search, Thermometer, ShieldCheck, Zap, Crosshair } from "lucide-react";

export default function MapControls({ 
  filters, 
  onFilterChange, 
  searchTerm, 
  onSearchChange, 
  inverters = [], 
  colorMode, 
  onColorModeChange,
  onAutoSweep 
}) {
  const currentSeverity = filters.severity || "ALL";

  return (
    <div className="border-b border-border-subtle bg-white px-6 py-3 flex flex-wrap items-center justify-between gap-4 shrink-0 select-none">
      {/* Left Controls: Mode Switcher & Severity Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Layer View Mode (Health vs Radiometric IR) */}
        <div className="flex items-center gap-1 border border-border-strong p-1 bg-surface-container-low font-mono-data text-xs">
          <button
            onClick={() => onColorModeChange("health")}
            className={`px-3 py-1 flex items-center gap-1.5 transition-all cursor-pointer font-bold ${
              colorMode === "health"
                ? "bg-primary text-white border border-primary shadow-xs"
                : "text-secondary hover:bg-white border border-transparent"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>HEALTH SCORE</span>
          </button>
          <button
            onClick={() => onColorModeChange("thermal")}
            className={`px-3 py-1 flex items-center gap-1.5 transition-all cursor-pointer font-bold ${
              colorMode === "thermal"
                ? "bg-primary text-white border border-primary shadow-xs"
                : "text-secondary hover:bg-white border border-transparent"
            }`}
          >
            <Thermometer className="w-3.5 h-3.5 text-critical" />
            <span>RADIOMETRIC IR (IRONBOW)</span>
          </button>
        </div>

        {/* Segmented Severity Filter */}
        <div className="flex items-center gap-1 border border-border-subtle p-1 bg-surface font-sans text-xs">
          <button
            onClick={() => onFilterChange("severity", "ALL")}
            className={`px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
              currentSeverity === "ALL"
                ? "bg-white text-primary border border-border-strong shadow-xs font-bold"
                : "text-secondary hover:bg-white border border-transparent"
            }`}
          >
            All
          </button>
          <button
            onClick={() => onFilterChange("severity", "Critical")}
            className={`px-2.5 py-1 text-xs transition-all cursor-pointer ${
              currentSeverity === "Critical"
                ? "bg-white text-critical font-bold border border-border-strong shadow-xs"
                : "text-secondary hover:bg-white border border-transparent"
            }`}
          >
            🔴 Critical (&lt;50)
          </button>
          <button
            onClick={() => onFilterChange("severity", "Medium")}
            className={`px-2.5 py-1 text-xs transition-all cursor-pointer ${
              currentSeverity === "Medium"
                ? "bg-white text-warning font-bold border border-border-strong shadow-xs"
                : "text-secondary hover:bg-white border border-transparent"
            }`}
          >
            🟡 Warning (50-84)
          </button>
          <button
            onClick={() => onFilterChange("severity", "None")}
            className={`px-2.5 py-1 text-xs transition-all cursor-pointer ${
              currentSeverity === "None"
                ? "bg-white text-[#027a48] font-bold border border-border-strong shadow-xs"
                : "text-secondary hover:bg-white border border-transparent"
            }`}
          >
            🟢 Healthy (&gt;85)
          </button>
        </div>

        {/* Auto Sweep Trigger */}
        <button
          onClick={onAutoSweep}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border-strong hover:border-primary hover:bg-white text-primary text-xs font-bold font-mono-data uppercase cursor-pointer transition-all"
        >
          <Crosshair className="w-3.5 h-3.5 text-primary" />
          <span>NEXT ANOMALY →</span>
        </button>
      </div>

      {/* Right Controls: Inverter, Search & Scale Legend */}
      <div className="flex items-center gap-5 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-secondary font-sans">Inverter:</span>
          <select
            value={filters.inverter_id || "ALL"}
            onChange={(e) => onFilterChange("inverter_id", e.target.value)}
            className="border-b border-border-strong border-t-0 border-l-0 border-r-0 bg-transparent text-primary text-xs font-mono-data py-1 focus:ring-0 cursor-pointer font-bold"
          >
            <option value="ALL">ALL INVERTERS</option>
            {inverters.map((inv) => (
              <option key={inv} value={inv}>{inv}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-secondary absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search #R12-C37..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-5 border-b border-border-strong border-t-0 border-l-0 border-r-0 bg-transparent text-xs py-1 w-32 focus:ring-0 focus:border-b-2 placeholder:text-secondary font-mono-data font-bold text-primary"
          />
        </div>

        {/* Dynamic Scale Legend depending on Mode */}
        {colorMode === "thermal" ? (
          <div className="flex items-center gap-2 font-mono-data text-[10px]">
            <span className="text-secondary font-bold">35°C</span>
            <div className="h-3 w-28 border border-border-strong flex overflow-hidden">
              <div className="w-1/4 bg-[#1e1b4b]" title="35-40°C Nominal" />
              <div className="w-1/4 bg-[#7c2d12]" title="40-45°C Soiling" />
              <div className="w-1/4 bg-[#ea580c]" title="45-55°C PID / Microcrack" />
              <div className="w-1/4 bg-[#fef08a]" title="55-65°C Critical Hotspot" />
            </div>
            <span className="text-critical font-bold">65°C+</span>
          </div>
        ) : (
          <div className="flex gap-3 text-xs font-mono-data">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#ecfdf3] border border-[#abefc6]" />
              <span className="text-secondary text-[11px]">Healthy</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#fffaeb] border border-[#fedf89]" />
              <span className="text-secondary text-[11px]">Warning</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#fef3f2] border border-[#d92d20]" />
              <span className="text-secondary text-[11px]">Critical</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
"""

with open(controls_path, "w", encoding="utf-8") as f:
    f.write(controls_code)
print("Updated MapControls.jsx with Radiometric Thermal Ironbow Mode & Anomaly Sweep.")

# 2. Update DigitalTwinGrid.jsx for Thermal Ironbow rendering
grid_path = os.path.join(BASE_DIR, "DigitalTwinGrid.jsx")
grid_code = """import React, { useMemo } from "react";

export default function DigitalTwinGrid({ modules, selectedModule, onSelectModule, farm, colorMode = "health" }) {
  const rows = farm?.rows || 20;
  const cols = farm?.cols || 60;
  const inverterCount = farm?.inverter_count || 6;

  const moduleMap = useMemo(() => {
    const map = {};
    modules.forEach((m) => {
      map[`${m.row}-${m.col}`] = m;
    });
    return map;
  }, [modules]);

  const rowIndices = Array.from({ length: rows }, (_, i) => i + 1);
  const colIndices = Array.from({ length: cols }, (_, i) => i + 1);

  return (
    <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-surface-container-low relative select-none min-w-0">
      <div className="min-w-[1100px] mx-auto">
        {/* Dynamic Inverter Column Headers */}
        <div 
          className="grid gap-2 mb-3"
          style={{
            gridTemplateColumns: `repeat(${inverterCount}, minmax(0, 1fr))`
          }}
        >
          {Array.from({ length: inverterCount }, (_, i) => (
            <div key={i} className="text-center font-mono-data text-xs font-bold border-b-2 border-border-strong pb-1 text-primary uppercase">
              INV-0{i + 1}
            </div>
          ))}
        </div>

        {/* Matrix Grid Canvas */}
        <div 
          className="grid gap-[2px] bg-border-subtle p-1 border border-border-strong"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(12px, 1fr))`,
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

              let cellStyle = "bg-[#ecfdf3] border border-[#abefc6]";

              if (colorMode === "thermal") {
                // Radiometric IR Ironbow Colormap
                if (isCritical || deltaT > 15.0) {
                  cellStyle = "bg-[#fef08a] border-2 border-white animate-pulse shadow-xs"; // Bright glowing yellow/white hotspot
                } else if (deltaT > 5.0 || score < 65) {
                  cellStyle = "bg-[#ea580c] border border-[#ffedd5]"; // High orange/red
                } else if (deltaT > 1.0 || isWarning) {
                  cellStyle = "bg-[#9a3412] border border-[#fed7aa]"; // Warm amber
                } else {
                  cellStyle = "bg-[#1e1b4b] border border-[#312e81]"; // Deep cool violet/navy (Nominal baseline ~38°C)
                }
              } else {
                // Health Score Mode
                if (isCritical) {
                  cellStyle = "bg-[#fef3f2] border border-[#d92d20] animate-pulse";
                } else if (isWarning) {
                  cellStyle = "bg-[#fffaeb] border border-[#fedf89]";
                }
              }

              return (
                <div
                  key={`${r}-${c}`}
                  id={`module-${r}-${c}`}
                  onClick={() => mod && onSelectModule(mod)}
                  title={
                    mod
                      ? `PANEL ${mod.id} (${mod.health_score}/100) | ΔT +${deltaT}°C | ${
                          defect ? defect.type : "Healthy (Nominal)"
                        }`
                      : `R${r}-C${c}`
                  }
                  className={`aspect-square cursor-pointer transition-all ${cellStyle} ${
                    isSelected ? "ring-2 ring-primary scale-125 z-10 shadow-md" : "hover:opacity-75"
                  }`}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
"""

with open(grid_path, "w", encoding="utf-8") as f:
    f.write(grid_code)
print("Updated DigitalTwinGrid.jsx with Radiometric Thermal colormap.")

# 3. Update SolarMapView.jsx
map_view_path = os.path.join(BASE_DIR, "SolarMapView.jsx")
map_view_code = """import React, { useState } from "react";
import MapControls from "./MapControls";
import DigitalTwinGrid from "./DigitalTwinGrid";
import ModuleDrawer from "./ModuleDrawer";

export default function SolarMapView({ modules, farm, selectedModule, onSelectModule, onCreateWorkOrder, isCreatingWO, filters, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [colorMode, setColorMode] = useState("health"); // 'health' | 'thermal'

  const inverters = farm ? Array.from({ length: farm.inverter_count }, (_, i) => `INV-0${i + 1}`) : [];

  const filteredModules = modules.filter((m) => {
    if (searchTerm && !m.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleAutoSweep = () => {
    // Finds the next anomalous module and selects it
    const defectModules = modules.filter(m => m.health_score < 85);
    if (defectModules.length > 0) {
      const currentIdx = defectModules.findIndex(m => m.id === selectedModule?.id);
      const nextIdx = (currentIdx + 1) % defectModules.length;
      onSelectModule(defectModules[nextIdx]);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <MapControls
        filters={filters}
        onFilterChange={onFilterChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        inverters={inverters}
        colorMode={colorMode}
        onColorModeChange={setColorMode}
        onAutoSweep={handleAutoSweep}
      />

      <div className="flex-1 flex overflow-hidden relative min-w-0">
        <DigitalTwinGrid
          modules={filteredModules}
          selectedModule={selectedModule}
          onSelectModule={onSelectModule}
          farm={farm}
          colorMode={colorMode}
        />

        {selectedModule && (
          <ModuleDrawer
            module={selectedModule}
            onClose={() => onSelectModule(null)}
            onCreateWorkOrder={onCreateWorkOrder}
            isCreatingWO={isCreatingWO}
          />
        )}
      </div>
    </div>
  );
}
"""

with open(map_view_path, "w", encoding="utf-8") as f:
    f.write(map_view_code)
print("Updated SolarMapView.jsx with state management for Radiometric IR Mode & Anomaly Sweep.")
