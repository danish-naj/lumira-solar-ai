import React from "react";
import { RefreshCw, Plus, ChevronDown, Presentation } from "lucide-react";

export default function TopHeader({ 
  activeFarm, 
  activeTab, 
  onRefresh, 
  loading, 
  onNewInspection,
  onOpenPitchDeck,
  activeRole = "admin",
  onSelectRole
}) {
  const tabTitles = {
    dashboard: "FLEET OVERVIEW",
    map: "DIGITAL TWIN GRID",
    predictive: "PREDICTIVE ML YIELD & 3D CELESTIAL TWIN",
    breakthrough: "BREAKTHROUGH INNOVATION LABS (9 ENGINES)",
    storm: "SEVERE WEATHER & STORM DEFENSE COCKPIT",
    inspect: "MULTI-SOURCE AI STUDIO",
    scada: "SCADA TELEMETRY",
    warranty: "OEM WARRANTY CLAIM & LEGAL DISPUTE ENGINE",
    maintenance: "WORK ORDERS & O&M",
    portfolio: "GLOBAL MULTI-SITE ASSET MAP",
    reports: "AUDIT REPORTS",
    "plan-roi": "ENTERPRISE PLAN & ROI AUDIT",
    "inspector-portal": "FIELD INSPECTOR MISSION WORKSPACE",
    "client-portal": "CLIENT APPROVAL PORTAL",
    "service-portal": "SERVICE TEAM COMMAND HUB"
  };

  const roles = [
    { id: "admin", label: "🛡️ Executive Master Admin", short: "Admin View" },
    { id: "inspector", label: "👨‍✈️ Field Inspector Portal", short: "Inspector" },
    { id: "client", label: "👔 Client / Asset Owner", short: "Client Portal" },
    { id: "service", label: "🔧 Service Team & Technicians", short: "Service Team" }
  ];

  return (
    <header className="bg-surface-container-lowest border-b border-border-subtle flex justify-between items-center w-full px-4 sm:px-6 md:px-8 h-16 shrink-0 z-20 select-none font-sans">
      {/* Breadcrumb Title */}
      <div className="flex items-center gap-3 min-w-0 pr-2">
        <div className="font-mono-data text-xs uppercase tracking-widest text-secondary truncate max-w-[200px] sm:max-w-sm lg:max-w-md">
          LUMIRA /{" "}
          <span className="text-primary font-bold">
            {activeFarm ? activeFarm.name.toUpperCase() : "SOLAR ASSET"}
          </span>{" "}
          / <span className="text-primary font-bold">{tabTitles[activeTab] || "WORKSPACE"}</span>
        </div>
      </div>

      {/* Role Switcher & Action Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <div className="relative flex items-center">
          <select
            value={activeRole}
            onChange={(e) => onSelectRole && onSelectRole(e.target.value)}
            className="appearance-none bg-surface text-primary font-mono-data text-[11px] font-bold py-1.5 pl-2.5 pr-7 border-2 border-primary cursor-pointer hover:bg-white transition-all shadow-xs focus:outline-none uppercase"
            title="Switch Workspace Persona"
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id} className="bg-white text-black font-sans text-xs">
                {r.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-primary absolute right-2 pointer-events-none" />
        </div>

        {/* Health Badge */}
        <div className="hidden md:flex items-center gap-2 font-mono-data text-xs bg-surface border border-border-subtle px-2.5 py-1.5 text-primary">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
          <span className="font-bold">
            HEALTH: {activeFarm ? activeFarm.health_score : 97}/100
          </span>
        </div>

        {/* Refresh */}
        <button
          onClick={onRefresh}
          disabled={loading}
          title="Refresh Data"
          className="p-1.5 sm:p-2 text-secondary hover:text-primary transition-colors border border-border-subtle bg-white hover:bg-surface cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>

        {/* 12-Page Pitch Deck Launch Button */}
        <button
          onClick={onOpenPitchDeck}
          className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-[#027a48] text-white font-mono-data uppercase hover:bg-white hover:text-[#027a48] border border-[#027a48] transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Presentation className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">12-PAGE PITCH DECK</span>
        </button>

        {/* New Inspection */}
        <button
          onClick={onNewInspection}
          className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-primary text-white font-label-caps uppercase hover:bg-white hover:text-primary border border-primary transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">INSPECTION</span>
        </button>
      </div>
    </header>
  );
}
