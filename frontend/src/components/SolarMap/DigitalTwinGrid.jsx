import React, { useMemo } from "react";

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
