import React from "react";
import { RefreshCw, Plus } from "lucide-react";

export default function TopHeader({ activeFarm, activeTab, onRefresh, loading, onNewInspection }) {
  const tabTitles = {
    dashboard: "FLEET OVERVIEW",
    map: "DIGITAL TWIN GRID",
    inspect: "MULTI-SOURCE AI STUDIO",
    scada: "SCADA TELEMETRY",
    maintenance: "WORK ORDERS & O&M",
    reports: "AUDIT REPORTS",
  };

  return (
    <header className="bg-surface-container-lowest border-b border-border-subtle flex justify-between items-center w-full px-6 md:px-8 h-16 shrink-0 z-20 select-none">
      <div className="flex items-center gap-3 min-w-0 pr-4">
        <div className="font-mono-data text-xs uppercase tracking-widest text-secondary truncate">
          LUMIRA FLEET /{" "}
          <span className="text-primary font-bold">
            {activeFarm ? activeFarm.name.toUpperCase() : "SOLAR ASSET"}
          </span>{" "}
          / <span className="text-primary font-bold">{tabTitles[activeTab] || "OVERVIEW"}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-2 font-mono-data text-xs bg-surface border border-border-subtle px-3 py-1.5 text-primary">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
          <span className="font-bold">
            HEALTH: {activeFarm ? activeFarm.health_score : 97}/100
          </span>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          title="Refresh Data"
          className="p-2 text-secondary hover:text-primary transition-colors border border-border-subtle bg-white hover:bg-surface cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>

        <button
          onClick={onNewInspection}
          className="px-3.5 py-2 bg-primary text-on-primary font-label-caps uppercase hover:bg-white hover:text-primary border border-primary transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">NEW INSPECTION</span>
        </button>
      </div>
    </header>
  );
}
