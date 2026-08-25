import React from "react";
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
  Users, 
  Award, 
  Plane, 
  TrendingUp, 
  Globe, 
  Radio, 
  Sparkles 
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
    { id: "breakthrough", label: "Breakthrough Labs", icon: Sparkles },
    { id: "planner", label: "Drone Flight Planner", icon: Plane },
    { id: "predictive", label: "Predictive ML & Yield", icon: TrendingUp },
    { id: "inspect", label: "Multi-Source AI", icon: ScanSearch },
    { id: "scada", label: "AI-Guided SCADA", icon: Zap },
    { id: "voice", label: "Voice AI Copilot", icon: Radio },
    { id: "maintenance", label: "Work Orders & O&M", icon: Wrench },
    { id: "portfolio", label: "Global Portfolio Map", icon: Globe },
    { id: "reports", label: "Audit Reports", icon: FileSpreadsheet },
    { id: "plan-roi", label: "Enterprise Plan & ROI", icon: Award },
  ];

  const rolePortals = [
    { id: "inspector", tab: "inspector-portal", label: "Field Inspector Hub", icon: Camera },
    { id: "client", tab: "client-portal", label: "Client Approval Portal", icon: Building2 },
    { id: "service", tab: "service-portal", label: "Service Team Hub", icon: Wrench },
  ];

  return (
    <nav className="bg-surface-container-lowest flex flex-col h-full border-r border-border-subtle w-[250px] shrink-0 z-30 select-none font-sans">
      {/* Header */}
      <div className="p-5 border-b border-border-subtle shrink-0">
        <h1 className="font-headline-md text-xl font-bold text-primary tracking-tight flex items-center gap-1.5">
          <span>Lumira</span>
          <span className="text-primary font-bold">✦</span>
        </h1>
        <p className="font-label-caps text-[10px] text-secondary mt-0.5 tracking-widest uppercase font-bold">
          SOLAR ASSET INTELLIGENCE
        </p>
      </div>

      {/* Site Selector CTA */}
      <div className="px-4 py-3 border-b border-border-subtle bg-surface shrink-0">
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
            className="w-full appearance-none bg-primary text-white font-label-caps text-[11px] font-bold py-1.5 pl-2.5 pr-7 rounded-none hover:bg-surface hover:text-primary hover:border-primary transition-all uppercase border border-primary cursor-pointer tracking-wide focus:outline-none truncate"
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
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-3 custom-scrollbar">
        {/* Core Navigation */}
        <div className="space-y-0.5">
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
                className={`w-full px-3 py-1.5 flex items-center gap-2.5 text-left transition-all border-l-2 text-xs font-bold uppercase tracking-wider ${
                  isActive
                    ? "bg-surface text-primary border-primary font-bold shadow-xs"
                    : "text-secondary border-transparent hover:text-primary hover:bg-surface"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-secondary"}`} />
                <span className="font-body-sm text-[11px] truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Role Portals Navigation */}
        <div className="space-y-0.5 pt-2 border-t border-border-subtle">
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
                className={`w-full px-3 py-1.5 flex items-center gap-2.5 text-left transition-all border-l-2 text-xs font-bold uppercase tracking-wider ${
                  isActive
                    ? "bg-primary text-white border-primary font-bold shadow-xs"
                    : "text-secondary border-transparent hover:text-primary hover:bg-surface"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-secondary"}`} />
                <span className="font-body-sm text-[11px] truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Status */}
      <div className="p-3 border-t border-border-subtle bg-surface shrink-0 flex items-center justify-between font-mono-data text-[10px] text-secondary">
        <div className="flex items-center gap-1.5 font-bold text-primary">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
          <span>QUANTUM V3.0</span>
        </div>
        <span className="font-bold">PRO LABS</span>
      </div>
    </nav>
  );
}
