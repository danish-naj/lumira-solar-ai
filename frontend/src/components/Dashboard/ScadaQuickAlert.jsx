import React from "react";
import { Zap, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function ScadaQuickAlert({ onNavigateToScada }) {
  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI-Guided SCADA Anomaly Ticker</h3>
            <p className="text-xs text-slate-400">Telemetry-driven targeted inspection</p>
          </div>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
          1 Action Required
        </span>
      </div>

      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 mb-3">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold text-slate-200">
              Inverter INV-02 · String STR04 (-28.5% Power Drop)
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Operating current collapsed to 18.2A under 860 W/m² irradiance. AI advises targeted drone/technician inspection for <span className="text-amber-300 font-mono">Rows 4-6, Columns 25-40</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="text-slate-400 text-[11px]">
          Targeted inspection saves <span className="text-emerald-400 font-bold">98.6%</span> of manual survey effort.
        </div>
        <button
          onClick={onNavigateToScada}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg transition-colors text-xs"
        >
          <span>Launch AI-Guided Route</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
