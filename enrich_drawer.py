import os

DRAWER_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\SolarMap\ModuleDrawer.jsx"

drawer_code = """import React, { useState } from "react";
import { 
  X, 
  ArrowRight, 
  Sun, 
  CheckCircle2, 
  Sparkles, 
  Wrench, 
  Thermometer, 
  Layers, 
  Activity, 
  ShieldAlert,
  Zap
} from "lucide-react";

export default function ModuleDrawer({ module, onClose, onCreateWorkOrder, isCreatingWO }) {
  const [imageTab, setImageTab] = useState("xai"); // 'xai' | 'thermal' | 'rgb'

  if (!module) return null;

  const defect = module.defects && module.defects.length > 0 ? module.defects[0] : null;
  const isHealthy = module.health_score >= 85;
  const deltaT = defect?.temperature_delta_c || 0.0;

  const defaultSampleImages = {
    xai: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
    thermal: "https://images.unsplash.com/photo-1508873696983-2df570464753?auto=format&fit=crop&w=800&q=80",
    rgb: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
  };

  const currentImg = defect?.heatmap_url || defaultSampleImages[imageTab] || defaultSampleImages.xai;

  return (
    <aside className="w-[420px] bg-white border-l-2 border-primary shadow-[-8px_0_24px_rgba(0,0,0,0.12)] flex flex-col shrink-0 z-40 h-full select-none font-sans">
      {/* Header */}
      <div className="p-5 border-b border-border-subtle shrink-0 bg-surface">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] font-mono-data font-bold text-secondary uppercase block">
              SPATIAL DIGITAL TWIN INSPECTOR
            </span>
            <h2 className="font-mono-data text-lg font-bold text-primary mt-0.5">
              PANEL #{module.id}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors p-1 cursor-pointer border border-transparent hover:border-border-strong bg-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 text-xs font-bold font-mono-data border ${
            module.health_score >= 85
              ? "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]"
              : module.health_score >= 50
              ? "bg-[#fffaeb] text-[#b54708] border-[#fedf89]"
              : "bg-[#fef3f2] text-critical border-critical"
          }`}>
            HEALTH: {module.health_score}/100 {module.health_score < 50 ? "CRITICAL (P1)" : module.health_score < 85 ? "WARNING" : "NOMINAL"}
          </span>
          <span className="text-xs font-mono-data font-bold text-critical">
            ΔT +{deltaT}°C
          </span>
        </div>

        <div className="font-mono-data text-[11px] text-secondary">
          {module.inverter_id || "INV-04"} · {module.string_id || "STR-04"} · Row {module.row}, Col {module.col}
        </div>
      </div>

      {/* Content Scrollable */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar font-mono-data text-xs">
        {/* 3-Layer Visualizer Switcher */}
        <div>
          <div className="flex border border-border-strong p-1 bg-surface mb-2 font-mono-data text-xs">
            <button
              onClick={() => setImageTab("xai")}
              className={`flex-1 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                imageTab === "xai" ? "bg-primary text-white" : "text-secondary hover:bg-white"
              }`}
            >
              AI HEATMAP
            </button>
            <button
              onClick={() => setImageTab("thermal")}
              className={`flex-1 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                imageTab === "thermal" ? "bg-primary text-white" : "text-secondary hover:bg-white"
              }`}
            >
              THERMAL IR
            </button>
            <button
              onClick={() => setImageTab("rgb")}
              className={`flex-1 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                imageTab === "rgb" ? "bg-primary text-white" : "text-secondary hover:bg-white"
              }`}
            >
              OPTICAL RGB
            </button>
          </div>

          <div className="relative border-2 border-primary h-52 bg-black overflow-hidden flex items-center justify-center">
            <img
              src={currentImg}
              alt="Scan Layer"
              className="w-full h-full object-cover opacity-90"
            />
            {defect && imageTab === "xai" && (
              <div className="absolute top-[25%] left-[30%] w-28 h-20 border-2 border-critical bg-critical/20 flex flex-col justify-between p-1 animate-pulse">
                <span className="bg-critical text-white text-[8px] font-bold px-1 self-start">
                  {defect.type}
                </span>
                <span className="bg-black text-white text-[8px] px-1 self-end font-bold">
                  ΔT +{deltaT}°C
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Electrical Parameter Specifications */}
        <div className="border border-border-strong bg-surface p-3 space-y-2">
          <div className="flex justify-between items-center border-b border-border-subtle pb-1">
            <strong className="text-primary uppercase text-[11px] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-warning" />
              ELECTRICAL I-V TELEMETRY
            </strong>
            <span className="text-[10px] text-[#027a48] font-bold">540 Wp RATED</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div><span className="text-secondary">Vmp (Voltage):</span> <strong className="text-primary block">41.8 V</strong></div>
            <div><span className="text-secondary">Imp (Current):</span> <strong className="text-primary block">12.9 A</strong></div>
            <div><span className="text-secondary">Fill Factor (FF):</span> <strong className="text-primary block">81.4%</strong></div>
            <div><span className="text-secondary">Series Res (Rs):</span> <strong className="text-critical block">0.42 Ω (Elevated)</strong></div>
          </div>
        </div>

        {/* Defect Rationale or Nominal Status */}
        {defect ? (
          <div className="border border-border-strong bg-white p-3.5 space-y-2">
            <div className="flex justify-between items-center border-b border-border-subtle pb-1">
              <span className="font-bold text-critical uppercase">{defect.type}</span>
              <span className="text-secondary text-[10px]">{defect.affected_cell_region || "Sub-string L3"}</span>
            </div>
            <p className="font-sans text-xs text-primary leading-relaxed">
              {defect.xai_explanation || "Localized reverse-bias heating detected on cell matrix. High temperature gradient indicates bypass diode shunt or metallization discontinuity."}
            </p>
          </div>
        ) : (
          <div className="border border-[#abefc6] bg-[#f6fef9] p-3 text-center text-xs text-[#027a48] font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>MODULE NOMINAL · ZERO DETECTED ANOMALIES</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-border-subtle bg-surface shrink-0">
        <button
          onClick={() => onCreateWorkOrder(module)}
          disabled={isCreatingWO}
          className="w-full bg-primary text-white font-bold py-3.5 px-4 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <Wrench className="w-4 h-4" />
          <span>{isCreatingWO ? "LOGGING WORK ORDER..." : "GENERATE O&M WORK ORDER"}</span>
        </button>
      </div>
    </aside>
  );
}
"""

with open(DRAWER_FILE, "w", encoding="utf-8") as f:
    f.write(drawer_code)
print("Updated ModuleDrawer.jsx with Electrical Telemetry & 3-Layer Visualizer.")
