import React from "react";
import { Sun, ShieldAlert, Cpu, Activity, Wrench, FileText, Layers, RefreshCw } from "lucide-react";

export default function Navbar({ farms, activeFarm, onSelectFarm, activeTab, onSelectTab, onRefresh, loading }) {
  return (
    <header className="sticky top-0 z-40 bg-[#0d1322]/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-400 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sun className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-amber-200 via-white to-emerald-300 bg-clip-text text-transparent">
                SolarGuard AI
              </h1>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                v1.0 MVP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Hardware-Agnostic Solar Asset Intelligence
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          {[
            { id: "dashboard", label: "Dashboard", icon: Activity },
            { id: "map", label: "Solar Map", icon: Layers, badge: "Hero" },
            { id: "inspect", label: "AI Inspection", icon: Cpu },
            { id: "scada", label: "AI-Guided", icon: ShieldAlert, badge: "Smart" },
            { id: "maintenance", label: "Maintenance", icon: Wrench },
            { id: "reports", label: "Reports", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                    isActive ? "bg-amber-400 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Farm Selector & Health Badge */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={activeFarm?.id || ""}
              onChange={(e) => {
                const found = farms.find((f) => f.id === e.target.value);
                if (found) onSelectFarm(found);
              }}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {farms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.capacity_mw} MW)
                </option>
              ))}
            </select>
          </div>

          {activeFarm && (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1">
              <span className="text-[11px] text-slate-400">Health:</span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                activeFarm.health_score >= 85
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : activeFarm.health_score >= 50
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
              }`}>
                {activeFarm.health_score}/100
              </span>
            </div>
          )}

          <button
            onClick={onRefresh}
            disabled={loading}
            title="Refresh state"
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-amber-400" : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
