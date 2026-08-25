import os

SIDEBAR_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Sidebar.jsx"
HEADER_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\TopHeader.jsx"
APP_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\App.jsx"

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
  Users, 
  Award, 
  Plane, 
  TrendingUp, 
  Globe, 
  Radio, 
  Sparkles,
  Box,
  Scale,
  CloudRain,
  Car
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
    { id: "3d-twin", label: "3D Solar Farm Twin", icon: Box },
    { id: "breakthrough", label: "Breakthrough Labs", icon: Sparkles },
    { id: "planner", label: "Drone Flight Planner", icon: Plane },
    { id: "swarm", label: "Robotic Swarm Fleet", icon: Car },
    { id: "predictive", label: "Predictive ML & Yield", icon: TrendingUp },
    { id: "storm", label: "Storm & Hail Defense", icon: CloudRain },
    { id: "inspect", label: "Multi-Source AI", icon: ScanSearch },
    { id: "scada", label: "AI-Guided SCADA", icon: Zap },
    { id: "voice", label: "Voice AI Copilot", icon: Radio },
    { id: "warranty", label: "OEM Warranty Claims", icon: Scale },
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
          <span>SUPER-OS V3.5</span>
        </div>
        <span className="font-bold">ULTIMATE SUITE</span>
      </div>
    </nav>
  );
}
"""

with open(SIDEBAR_FILE, "w", encoding="utf-8") as f:
    f.write(sidebar_code)
print("Updated Sidebar.jsx.")

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
    "3d-twin": "3D SOLAR FARM DIGITAL TWIN",
    breakthrough: "BREAKTHROUGH INNOVATION LABS (9 ENGINES)",
    planner: "AUTONOMOUS DRONE FLIGHT PLANNER",
    swarm: "ROBOTIC CLEANING SWARM FLEET",
    predictive: "PREDICTIVE ML & CLOUD SHADOW SIMULATOR",
    storm: "SEVERE WEATHER & STORM DEFENSE COCKPIT",
    inspect: "MULTI-SOURCE AI STUDIO",
    scada: "SCADA TELEMETRY",
    voice: "HANDS-FREE VOICE AI COPILOT",
    warranty: "OEM WARRANTY CLAIM & LEGAL DISPUTE ENGINE",
    maintenance: "WORK ORDERS & O&M",
    portfolio: "GLOBAL MULTI-SITE ASSET MAP",
    reports: "AUDIT REPORTS",
    "plan-roi": "ENTERPRISE PLAN & ROI AUDIT",
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
          className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-primary text-white font-label-caps uppercase hover:bg-white hover:text-primary border border-primary transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
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
print("Updated TopHeader.jsx.")

app_code = """import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import DashboardView from "./components/Dashboard/DashboardView";
import SolarMapView from "./components/SolarMap/SolarMapView";
import SolarFarm3DVisualizer from "./components/Twin3D/SolarFarm3DVisualizer";
import InspectionHub from "./components/InspectionHub/InspectionHub";
import GuidedInspection from "./components/GuidedInspection/GuidedInspection";
import MaintenanceHub from "./components/Maintenance/MaintenanceHub";
import ReportsHub from "./components/Reports/ReportsHub";
import SubscriptionROIView from "./components/Subscription/SubscriptionROIView";
import DroneFlightPlanner from "./components/FlightPlanner/DroneFlightPlanner";
import PredictiveYieldEngine from "./components/Predictive/PredictiveYieldEngine";
import PortfolioFleetMap from "./components/Portfolio/PortfolioFleetMap";
import VoiceCopilot from "./components/VoiceCopilot/VoiceCopilot";
import BreakthroughLabs from "./components/BreakthroughLabs/BreakthroughLabs";
import WarrantyClaimEngine from "./components/Warranty/WarrantyClaimEngine";
import StormDefenseCockpit from "./components/StormDefense/StormDefenseCockpit";
import RoboticSwarmFleet from "./components/SwarmFleet/RoboticSwarmFleet";
import FieldInspectorPortal from "./components/Portals/FieldInspectorPortal";
import ClientApprovalPortal from "./components/Portals/ClientApprovalPortal";
import ServiceTeamHub from "./components/Portals/ServiceTeamHub";
import { fetchFarms, fetchModules, createWorkOrder } from "./services/api";

export default function App() {
  const [farms, setFarms] = useState([]);
  const [activeFarm, setActiveFarm] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeRole, setActiveRole] = useState("admin"); // 'admin' | 'inspector' | 'client' | 'service'
  const [loading, setLoading] = useState(true);
  const [isCreatingWO, setIsCreatingWO] = useState(false);
  const [filters, setFilters] = useState({
    defect_type: "ALL",
    severity: "ALL",
    inverter_id: "ALL",
  });

  // End-to-End Lifecycle State
  const [pendingReports, setPendingReports] = useState([]);
  const [clientApprovedReports, setClientApprovedReports] = useState([]);
  const [completedWorkOrders, setCompletedWorkOrders] = useState([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const farmList = await fetchFarms();
      setFarms(farmList);
      const currentFarm = activeFarm ? farmList.find((f) => f.id === activeFarm.id) || farmList[0] : farmList[0];
      setActiveFarm(currentFarm);
      if (currentFarm) {
        const modResults = await fetchModules(currentFarm.id, filters);
        setModules(modResults);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFilterChange = async (key, val) => {
    const newFilters = { ...filters, [key]: val };
    setFilters(newFilters);
    if (activeFarm) {
      const modResults = await fetchModules(activeFarm.id, newFilters);
      setModules(modResults);
    }
  };

  const handleSelectFarm = async (farm) => {
    setActiveFarm(farm);
    setSelectedModule(null);
    setLoading(true);
    try {
      const modResults = await fetchModules(farm.id, filters);
      setModules(modResults);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (role) => {
    setActiveRole(role);
    if (role === "inspector") setActiveTab("inspector-portal");
    else if (role === "client") setActiveTab("client-portal");
    else if (role === "service") setActiveTab("service-portal");
    else if (role === "admin" && ["inspector-portal", "client-portal", "service-portal"].includes(activeTab)) {
      setActiveTab("dashboard");
    }
  };

  // Lifecycle Callbacks
  const handleSubmitReportToClient = (report) => {
    setPendingReports((prev) => [report, ...prev]);
  };

  const handleApproveReport = async (report) => {
    setClientApprovedReports((prev) => [report, ...prev]);
    if (activeFarm) {
      try {
        await createWorkOrder(activeFarm.id, report.module_id, report.defect_type, report.severity);
      } catch (e) {}
    }
  };

  const handleCompleteServiceTicket = (proofData) => {
    setCompletedWorkOrders((prev) => [proofData, ...prev]);
  };

  const handleCreateWorkOrder = async (module) => {
    if (!activeFarm || !module) return;
    setIsCreatingWO(true);
    try {
      const defectType = module.defects.length > 0 ? module.defects[0].type : "Thermal Hotspot";
      const severity = module.status || "Critical";
      await createWorkOrder(activeFarm.id, module.id, defectType, severity);
      await loadData();
      setIsCreatingWO(false);
      setSelectedModule(null);
      setActiveTab("maintenance");
    } catch (err) {
      console.error(err);
      setIsCreatingWO(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-on-background font-sans antialiased">
      {/* SideNavBar */}
      <Sidebar
        farms={farms}
        activeFarm={activeFarm}
        onSelectFarm={handleSelectFarm}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        activeRole={activeRole}
        onSelectRole={handleRoleChange}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-background relative">
        <TopHeader
          activeFarm={activeFarm}
          activeTab={activeTab}
          onRefresh={loadData}
          loading={loading}
          onNewInspection={() => setActiveTab("inspect")}
          activeRole={activeRole}
          onSelectRole={handleRoleChange}
        />

        <main className="flex-1 overflow-y-auto bg-background custom-scrollbar min-w-0">
          {/* 1. Fleet Overview Dashboard */}
          {activeTab === "dashboard" && (
            <DashboardView
              farm={activeFarm}
              onNavigateTab={(tab) => {
                if (["inspector-portal", "client-portal", "service-portal"].includes(tab)) {
                  setActiveRole(tab.replace("-portal", ""));
                }
                setActiveTab(tab);
              }}
              onSelectModule={(mod) => {
                setSelectedModule(mod);
                setActiveTab("map");
              }}
            />
          )}

          {/* 2. 2D Digital Twin Solar Grid */}
          {activeTab === "map" && (
            <SolarMapView
              modules={modules}
              farm={activeFarm}
              selectedModule={selectedModule}
              onSelectModule={setSelectedModule}
              onCreateWorkOrder={handleCreateWorkOrder}
              isCreatingWO={isCreatingWO}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          )}

          {/* 3. [NEW] Interactive 3D Solar Farm Digital Twin */}
          {activeTab === "3d-twin" && (
            <SolarFarm3DVisualizer
              farm={activeFarm}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* 4. Breakthrough Innovation Labs (9 World-First Engines) */}
          {activeTab === "breakthrough" && (
            <BreakthroughLabs
              farm={activeFarm}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* 5. Autonomous 3D Drone Flight Path Planner */}
          {activeTab === "planner" && (
            <DroneFlightPlanner
              farm={activeFarm}
              onNavigateToMap={() => setActiveTab("map")}
            />
          )}

          {/* 6. [NEW] Autonomous Robotic Swarm Fleet Manager */}
          {activeTab === "swarm" && (
            <RoboticSwarmFleet
              farm={activeFarm}
            />
          )}

          {/* 7. Predictive ML Yield & Cloud Shadow Simulator */}
          {activeTab === "predictive" && (
            <PredictiveYieldEngine
              farm={activeFarm}
            />
          )}

          {/* 8. [NEW] Severe Weather & Storm Defense Cockpit */}
          {activeTab === "storm" && (
            <StormDefenseCockpit
              farm={activeFarm}
            />
          )}

          {/* 9. Executive Multi-Source AI Studio */}
          {activeTab === "inspect" && (
            <InspectionHub
              farm={activeFarm}
              onInspectionComplete={() => loadData()}
              onNavigateToMap={() => setActiveTab("map")}
            />
          )}

          {/* 10. AI-Guided SCADA Telemetry */}
          {activeTab === "scada" && (
            <GuidedInspection
              farm={activeFarm}
              onNavigateToMap={() => {
                handleFilterChange("severity", "Critical");
                setActiveTab("map");
              }}
            />
          )}

          {/* 11. Hands-Free Voice AI Copilot */}
          {activeTab === "voice" && (
            <VoiceCopilot
              farm={activeFarm}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* 12. [NEW] OEM Warranty Claim & Legal Dispute Engine */}
          {activeTab === "warranty" && (
            <WarrantyClaimEngine
              farm={activeFarm}
            />
          )}

          {/* 13. Closed-Loop Work Orders & O&M Hub */}
          {activeTab === "maintenance" && (
            <MaintenanceHub
              farm={activeFarm}
              onRefreshFarm={loadData}
              onNavigateTab={setActiveTab}
              onSelectModule={(mod) => {
                setSelectedModule(mod);
                setActiveTab("map");
              }}
            />
          )}

          {/* 14. Multi-Farm Global Portfolio Map */}
          {activeTab === "portfolio" && (
            <PortfolioFleetMap
              onSelectFarmSite={(park) => {
                const found = farms.find(f => f.id === park.id) || farms[0];
                handleSelectFarm(found);
                setActiveTab("dashboard");
              }}
            />
          )}

          {/* 15. Certified Executive Audit Reports */}
          {activeTab === "reports" && (
            <ReportsHub
              farm={activeFarm}
            />
          )}

          {/* 16. Enterprise Plan & ROI Audit Section */}
          {activeTab === "plan-roi" && (
            <SubscriptionROIView
              farm={activeFarm}
            />
          )}

          {/* 17. [ROLE PORTAL 1] Field Inspector Hub */}
          {activeTab === "inspector-portal" && (
            <FieldInspectorPortal
              farm={activeFarm}
              onSubmitReportToClient={handleSubmitReportToClient}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* 18. [ROLE PORTAL 2] Client Approval Portal */}
          {activeTab === "client-portal" && (
            <ClientApprovalPortal
              farm={activeFarm}
              pendingReports={pendingReports}
              onApproveReport={handleApproveReport}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* 19. [ROLE PORTAL 3] Service Team & Field Technician Hub */}
          {activeTab === "service-portal" && (
            <ServiceTeamHub
              farm={activeFarm}
              onCompleteTicket={handleCompleteServiceTicket}
              onNavigateTab={setActiveTab}
            />
          )}
        </main>
      </div>
    </div>
  );
}
"""

with open(APP_FILE, "w", encoding="utf-8") as f:
    f.write(app_code)
print("Updated App.jsx with all expansion routes!")
