import React, { useState } from "react";
import { X, ArrowRight, Sun, CheckCircle2 } from "lucide-react";

export default function ModuleDrawer({ module, onClose, onCreateWorkOrder, isCreatingWO }) {
  const [imageTab, setImageTab] = useState("xai");

  if (!module) return null;

  const defect = module.defects && module.defects.length > 0 ? module.defects[0] : null;
  const isHealthy = module.health_score >= 85;

  const imageSrc = imageTab === "xai"
    ? (defect?.heatmap_url || defect?.original_image_url)
    : (defect?.original_image_url || defect?.heatmap_url);

  return (
    <aside className="w-[380px] bg-white border-l-2 border-border-strong shadow-[-8px_0_24px_rgba(0,0,0,0.08)] flex flex-col shrink-0 z-40 h-full select-none">
      {/* Header */}
      <div className="p-6 border-b border-border-subtle shrink-0">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-mono-data text-lg font-bold text-primary">PANEL #{module.id}</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 text-xs font-bold rounded-none flex items-center gap-1 border font-mono-data ${
            module.health_score >= 85
              ? "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]"
              : module.health_score >= 50
              ? "bg-[#fffaeb] text-[#b54708] border-[#fedf89]"
              : "bg-[#fef3f2] text-[#d92d20] border-[#d92d20]"
          }`}>
            <span className="font-bold text-[10px]">!</span> HEALTH: {module.health_score}/100 {module.health_score < 50 ? "CRITICAL" : module.health_score < 85 ? "WARNING" : "NOMINAL"}
          </span>
        </div>

        <div className="font-mono-data text-xs text-secondary">
          {module.inverter_id} · {module.string_id || "STR-01"} · Lat {module.latitude?.toFixed(4) || "27.5410"}, Long {module.longitude?.toFixed(4) || "71.9205"}
        </div>
      </div>

      {/* Content Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
        {/* Image Switcher */}
        <div>
          <div className="flex border border-border-strong p-1 bg-surface-container-low mb-2 font-mono-data text-xs">
            <button
              onClick={() => setImageTab("xai")}
              className={`flex-1 py-1 transition-all ${
                imageTab === "xai"
                  ? "bg-white border border-border-strong text-primary font-bold shadow-xs"
                  : "text-secondary hover:bg-white border border-transparent"
              }`}
            >
              AI HEATMAP
            </button>
            <button
              onClick={() => setImageTab("thermal")}
              className={`flex-1 py-1 transition-all ${
                imageTab === "thermal"
                  ? "bg-white border border-border-strong text-primary font-bold shadow-xs"
                  : "text-secondary hover:bg-white border border-transparent"
              }`}
            >
              THERMAL IR
            </button>
            <button
              onClick={() => setImageTab("rgb")}
              className={`flex-1 py-1 transition-all ${
                imageTab === "rgb"
                  ? "bg-white border border-border-strong text-primary font-bold shadow-xs"
                  : "text-secondary hover:bg-white border border-transparent"
              }`}
            >
              RGB VISUAL
            </button>
          </div>

          <div className="aspect-video bg-black border border-border-strong relative overflow-hidden flex items-center justify-center">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={`Panel ${module.id}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4 bg-surface w-full h-full border border-border-subtle">
                <Sun className="w-8 h-8 text-[#027a48] mb-1 opacity-80" />
                <span className="font-mono-data text-xs font-bold text-primary uppercase">
                  {imageTab === "xai" ? "Nominal Baseline Gradient" : imageTab === "thermal" ? "Thermal IR: Uniform 38.2°C" : "RGB Visual: Clean Wafer Surface"}
                </span>
                <span className="font-mono-data text-[10px] text-secondary mt-1">ΔT &lt; 0.2°C · Zero Thermal Hotspots</span>
              </div>
            )}
          </div>
        </div>

        {/* Diagnostic Card with Inner Frame Overlay */}
        <div className="border border-border-subtle p-4 bg-white relative">
          <div className="absolute inset-2 border border-border-strong pointer-events-none" />

          <div className="relative z-10 p-2">
            <h3 className="font-bold text-sm mb-1 uppercase tracking-wider text-primary font-sans">
              Diagnostic Findings
            </h3>
            <p className={`text-sm font-medium mb-2 font-sans ${isHealthy ? "text-[#027a48]" : "text-[#d92d20]"}`}>
              Defect: {defect ? defect.type : "Nominal Operation"} ({(defect ? defect.confidence * 100 : 99.2).toFixed(1)}% Confidence)
            </p>
            <p className="text-xs text-secondary mb-4 leading-relaxed font-sans">
              {defect?.xai_explanation || "Nominal operating profile. Localized temperature gradients remain within normal operational baselines (ΔT < 0.3°C)."}
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-border-subtle pt-4 font-mono-data">
              <div>
                <span className="text-xs text-secondary block mb-1">Delta T</span>
                <span className={`text-sm font-bold ${isHealthy ? "text-[#027a48]" : "text-[#d92d20]"}`}>
                  +{defect ? defect.temperature_delta_c : 0.2}°C
                </span>
              </div>
              <div>
                <span className="text-xs text-secondary block mb-1">Power Loss</span>
                <span className={`text-sm font-bold ${isHealthy ? "text-[#027a48]" : "text-[#b45309]"}`}>
                  -{defect ? defect.estimated_power_loss_pct : 0.0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Loss Strip */}
        <div className="flex justify-between items-center bg-surface p-4 border border-border-subtle font-mono-data">
          <div>
            <span className="text-xs text-secondary block">Daily Loss</span>
            <span className="text-sm font-bold text-primary">{module.daily_energy_loss_kwh} kWh/d</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-secondary block">Financial Risk</span>
            <span className="text-sm font-bold text-primary">${module.daily_revenue_loss_usd}/d (₹{(module.daily_revenue_loss_usd * 85).toFixed(2)}/d)</span>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-6 border-t border-border-subtle bg-white shrink-0">
        <button
          onClick={() => onCreateWorkOrder(module)}
          disabled={isCreatingWO}
          className="w-full bg-primary text-on-primary font-bold py-3 hover:bg-white hover:text-primary hover:border-border-strong border border-transparent transition-colors flex items-center justify-center gap-2 uppercase tracking-wide text-sm font-sans"
        >
          <span>{isCreatingWO ? "CREATING WORK ORDER..." : "CREATE WORK ORDER"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
