import os

HEADER_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\TopHeader.jsx"
SIDEBAR_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Sidebar.jsx"

header_code = """import React from "react";
import { RefreshCw, Plus, Users, ChevronDown, Building2, Wrench, Camera, Shield } from "lucide-react";

export default function TopHeader({ 
  activeFarm, 
  activeTab, 
  onRefresh, 
  loading, 
  onNewInspection,
  activeRole = "admin",
  onSelectRole
}) {
  const tabTitles = {
    dashboard: "FLEET OVERVIEW",
    map: "DIGITAL TWIN GRID",
    inspect: "MULTI-SOURCE AI STUDIO",
    scada: "SCADA TELEMETRY",
    maintenance: "WORK ORDERS & O&M",
    reports: "AUDIT REPORTS",
    "inspector-portal": "FIELD INSPECTOR WORKSPACE",
    "client-portal": "CLIENT APPROVAL PORTAL",
    "service-portal": "SERVICE TEAM HUB"
  };

  const roles = [
    { id: "admin", label: "🛡️ Executive Master Admin", short: "Admin View" },
    { id: "inspector", label: "👨‍✈️ Field Inspector Portal", short: "Inspector" },
    { id: "client", label: "👔 Client / Asset Owner", short: "Client Portal" },
    { id: "service", label: "🔧 Service Team & Technicians", short: "Service Team" }
  ];

  return (
    <header className="bg-surface-container-lowest border-b border-border-subtle flex justify-between items-center w-full px-4 sm:px-6 md:px-8 h-16 shrink-0 z-20 select-none">
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
        {/* Interactive Multi-Persona Role Switcher */}
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

        {/* New Inspection */}
        <button
          onClick={onNewInspection}
          className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-primary text-on-primary font-label-caps uppercase hover:bg-white hover:text-primary border border-primary transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">INSPECTION</span>
        </button>
      </div>
    </header>
  );
}
"""

with open(HEADER_FILE, "w", encoding="utf-8") as f:
    f.write(header_code)
print("Updated TopHeader.jsx with Multi-Persona Role Switcher.")

sidebar_code = """import React from "react";
import { 
  LayoutDashboard, 
  Grid3X3, 
  ScanSearch, 
  Zap, 
  Wrench, 
  FileSpreadsheet, 
  ChevronDown,
  Building2,
  Camera,
  Users
} from "lucide-react";

export default function Sidebar({ 
  farms, 
  activeFarm, 
  onSelectFarm, 
  activeTab, 
  onSelectTab,
  activeRole = "admin",
  onSelectRole
}) {
  const navItems = [
    { id: "dashboard", label: "Fleet Overview", icon: LayoutDashboard },
    { id: "map", label: "Digital Twin Grid", icon: Grid3X3 },
    { id: "inspect", label: "Multi-Source AI", icon: ScanSearch },
    { id: "scada", label: "AI-Guided SCADA", icon: Zap },
    { id: "maintenance", label: "Work Orders & O&M", icon: Wrench },
    { id: "reports", label: "Audit Reports", icon: FileSpreadsheet },
  ];

  const rolePortals = [
    { id: "inspector", tab: "inspector-portal", label: "Field Inspector Hub", icon: Camera },
    { id: "client", tab: "client-portal", label: "Client Approval Portal", icon: Building2 },
    { id: "service", tab: "service-portal", label: "Service Team Hub", icon: Wrench },
  ];

  return (
    <nav className="bg-surface-container-lowest flex flex-col h-full border-r border-border-subtle w-[240px] shrink-0 z-30 select-none">
      {/* Header */}
      <div className="p-6 border-b border-border-subtle shrink-0">
        <h1 className="font-headline-md text-xl font-bold text-primary tracking-tight flex items-center gap-1.5">
          <span>Lumira</span>
          <span className="text-primary font-bold">✦</span>
        </h1>
        <p className="font-label-caps text-[10px] text-secondary mt-1 tracking-widest uppercase font-bold">
          SOLAR ASSET INTELLIGENCE
        </p>
      </div>

      {/* Site Selector CTA */}
      <div className="px-4 py-3.5 border-b border-border-subtle bg-surface shrink-0">
        <label className="text-[9px] font-bold text-secondary uppercase tracking-widest block mb-1">
          ACTIVE PORTFOLIO SITE
        </label>
        <div className="relative flex items-center">
          <select
            value={activeFarm?.id || ""}
            onChange={(e) => {
              const found = farms.find((f) => f.id === e.target.value);
              if (found) onSelectFarm(found);
            }}
            className="w-full appearance-none bg-primary text-white font-label-caps text-[11px] font-bold py-2 pl-2.5 pr-7 rounded-none hover:bg-surface hover:text-primary hover:border-primary transition-all uppercase border border-primary cursor-pointer tracking-wide focus:outline-none truncate"
          >
            {farms.map((f) => (
              <option key={f.id} value={f.id} className="bg-white text-black font-sans text-xs">
                {f.name} ({f.capacity_mw} MW)
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-white absolute right-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4 custom-scrollbar">
        {/* Core Navigation */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold uppercase text-secondary font-mono-data px-3 tracking-widest block mb-1">
            CORE PLATFORM
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onSelectRole) onSelectRole("admin");
                }}
                className={`w-full px-3.5 py-2 flex items-center gap-3 text-left transition-all border-l-2 text-xs font-bold uppercase tracking-wider ${
                  isActive
                    ? "bg-surface text-primary border-primary font-bold shadow-xs"
                    : "text-secondary border-transparent hover:text-primary hover:bg-surface"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-secondary"}`} />
                <span className="font-body-sm text-xs truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Role Portals Navigation */}
        <div className="space-y-1 pt-2 border-t border-border-subtle">
          <span className="text-[9px] font-bold uppercase text-secondary font-mono-data px-3 tracking-widest block mb-1">
            LIFECYCLE PORTALS
          </span>
          {rolePortals.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab || activeRole === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.tab);
                  if (onSelectRole) onSelectRole(item.id);
                }}
                className={`w-full px-3.5 py-2 flex items-center gap-3 text-left transition-all border-l-2 text-xs font-bold uppercase tracking-wider ${
                  isActive
                    ? "bg-primary text-white border-primary font-bold shadow-xs"
                    : "text-secondary border-transparent hover:text-primary hover:bg-surface"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-secondary"}`} />
                <span className="font-body-sm text-xs truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Status */}
      <div className="p-4 border-t border-border-subtle bg-surface shrink-0 flex items-center justify-between font-mono-data text-[10px] text-secondary">
        <div className="flex items-center gap-1.5 font-bold text-primary">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
          <span>LIFECYCLE V2.0</span>
        </div>
        <span className="font-bold">PRO ACTIVE</span>
      </div>
    </nav>
  );
}
"""

with open(SIDEBAR_FILE, "w", encoding="utf-8") as f:
    f.write(sidebar_code)
print("Updated Sidebar.jsx with Lifecycle Portals.")
