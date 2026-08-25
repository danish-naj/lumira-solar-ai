import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import DashboardView from "./components/Dashboard/DashboardView";
import SolarMapView from "./components/SolarMap/SolarMapView";
import InspectionHub from "./components/InspectionHub/InspectionHub";
import GuidedInspection from "./components/GuidedInspection/GuidedInspection";
import MaintenanceHub from "./components/Maintenance/MaintenanceHub";
import ReportsHub from "./components/Reports/ReportsHub";
import { fetchFarms, fetchModules, createWorkOrder } from "./services/api";

export default function App() {
  const [farms, setFarms] = useState([]);
  const [activeFarm, setActiveFarm] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [isCreatingWO, setIsCreatingWO] = useState(false);
  const [filters, setFilters] = useState({
    defect_type: "ALL",
    severity: "ALL",
    inverter_id: "ALL",
  });

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
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-background relative">
        <TopHeader
          activeFarm={activeFarm}
          activeTab={activeTab}
          onRefresh={loadData}
          loading={loading}
          onNewInspection={() => setActiveTab("inspect")}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar min-w-0">
          {activeTab === "dashboard" && (
            <DashboardView 
              farm={activeFarm} 
              onNavigateTab={setActiveTab}
              onSelectModule={(mod) => {
                setSelectedModule(mod);
                setActiveTab("map");
              }}
            />
          )}

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

          {activeTab === "inspect" && (
            <InspectionHub
              farm={activeFarm}
              onInspectionComplete={() => loadData()}
              onNavigateToMap={() => setActiveTab("map")}
            />
          )}

          {activeTab === "scada" && (
            <GuidedInspection
              farm={activeFarm}
              onNavigateToMap={() => setActiveTab("map")}
            />
          )}

          {activeTab === "maintenance" && (
            <MaintenanceHub farm={activeFarm} onRefreshFarm={loadData} />
          )}

          {activeTab === "reports" && (
            <ReportsHub farm={activeFarm} />
          )}
        </div>
      </div>
    </div>
  );
}
