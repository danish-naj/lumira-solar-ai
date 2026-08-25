import React from "react";
import { Flame, Activity, Wind, Trees, Sparkles } from "lucide-react";

export default function DefectBreakdown({ farm }) {
  const defectStats = [
    { type: "Thermal Hotspot", count: 4, severity: "Critical", icon: Flame, color: "bg-rose-500", text: "text-rose-400" },
    { type: "Physical Microcrack", count: 2, severity: "High", icon: Activity, color: "bg-orange-500", text: "text-orange-400" },
    { type: "Heavy Soiling", count: 4, severity: "Medium", icon: Wind, color: "bg-amber-500", text: "text-amber-400" },
    { type: "Vegetation Shading", count: 2, severity: "Medium", icon: Trees, color: "bg-emerald-500", text: "text-emerald-400" },
    { type: "Snail Trail / Delamination", count: 1, severity: "Low", icon: Sparkles, color: "bg-cyan-500", text: "text-cyan-400" },
  ];

  const totalDefects = defectStats.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">Defect Distribution by AI Classifier</h3>
          <p className="text-xs text-slate-400">Classified across RGB, Thermal, and SCADA anomalies</p>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
          {totalDefects} Total Defects
        </span>
      </div>

      <div className="space-y-3">
        {defectStats.map((item, idx) => {
          const Icon = item.icon;
          const pct = Math.round((item.count / totalDefects) * 100);
          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${item.text}`} />
                  <span className="text-slate-200 font-medium">{item.type}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    item.severity === "Critical" ? "bg-rose-500/20 text-rose-400" :
                    item.severity === "High" ? "bg-orange-500/20 text-orange-400" :
                    item.severity === "Medium" ? "bg-amber-500/20 text-amber-400" :
                    "bg-cyan-500/20 text-cyan-400"
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-400">{item.count} modules</span>
                  <span className="text-slate-200 font-bold">{pct}%</span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
