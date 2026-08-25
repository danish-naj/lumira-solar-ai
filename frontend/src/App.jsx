import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import DashboardView from "./components/Dashboard/DashboardView";
import SolarMapView from "./components/SolarMap/SolarMapView";
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

          {/* 3. [NEW] Breakthrough Innovation Labs (9 World-First Engines) */}
          {activeTab === "breakthrough" && (
            <BreakthroughLabs
              farm={activeFarm}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* 4. Autonomous 3D Drone Flight Path Planner */}
          {activeTab === "planner" && (
            <DroneFlightPlanner
              farm={activeFarm}
              onNavigateToMap={() => setActiveTab("map")}
            />
          )}

          {/* 5. Predictive ML Yield & Cloud Shadow Simulator */}
          {activeTab === "predictive" && (
            <PredictiveYieldEngine
              farm={activeFarm}
            />
          )}

          {/* 6. Executive Multi-Source AI Studio */}
          {activeTab === "inspect" && (
            <InspectionHub
              farm={activeFarm}
              onInspectionComplete={() => loadData()}
              onNavigateToMap={() => setActiveTab("map")}
            />
          )}

          {/* 7. AI-Guided SCADA Telemetry */}
          {activeTab === "scada" && (
            <GuidedInspection
              farm={activeFarm}
              onNavigateToMap={() => {
                handleFilterChange("severity", "Critical");
                setActiveTab("map");
              }}
            />
          )}

          {/* 8. Hands-Free Voice AI Copilot */}
          {activeTab === "voice" && (
            <VoiceCopilot
              farm={activeFarm}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* 9. Closed-Loop Work Orders & O&M Hub */}
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

          {/* 10. Multi-Farm Global Portfolio Map */}
          {activeTab === "portfolio" && (
            <PortfolioFleetMap
              onSelectFarmSite={(park) => {
                const found = farms.find(f => f.id === park.id) || farms[0];
                handleSelectFarm(found);
                setActiveTab("dashboard");
              }}
            />
          )}

          {/* 11. Certified Executive Audit Reports */}
          {activeTab === "reports" && (
            <ReportsHub
              farm={activeFarm}
            />
          )}

          {/* 12. Enterprise Plan & ROI Audit Section */}
          {activeTab === "plan-roi" && (
            <SubscriptionROIView
              farm={activeFarm}
            />
          )}

          {/* 13. [ROLE PORTAL 1] Field Inspector Hub */}
          {activeTab === "inspector-portal" && (
            <FieldInspectorPortal
              farm={activeFarm}
              onSubmitReportToClient={handleSubmitReportToClient}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* 14. [ROLE PORTAL 2] Client Approval Portal */}
          {activeTab === "client-portal" && (
            <ClientApprovalPortal
              farm={activeFarm}
              pendingReports={pendingReports}
              onApproveReport={handleApproveReport}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* 15. [ROLE PORTAL 3] Service Team & Field Technician Hub */}
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
