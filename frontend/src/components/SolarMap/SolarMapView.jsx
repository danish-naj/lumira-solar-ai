import React, { useState } from "react";
import MapControls from "./MapControls";
import DigitalTwinGrid from "./DigitalTwinGrid";
import ModuleDrawer from "./ModuleDrawer";

export default function SolarMapView({ modules, farm, selectedModule, onSelectModule, onCreateWorkOrder, isCreatingWO, filters, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [colorMode, setColorMode] = useState("health"); // 'health' | 'thermal'

  const inverters = farm ? Array.from({ length: farm.inverter_count }, (_, i) => `INV-0${i + 1}`) : [];

  const filteredModules = modules.filter((m) => {
    if (searchTerm && !m.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleAutoSweep = () => {
    // Finds the next anomalous module and selects it
    const defectModules = modules.filter(m => m.health_score < 85);
    if (defectModules.length > 0) {
      const currentIdx = defectModules.findIndex(m => m.id === selectedModule?.id);
      const nextIdx = (currentIdx + 1) % defectModules.length;
      onSelectModule(defectModules[nextIdx]);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <MapControls
        filters={filters}
        onFilterChange={onFilterChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        inverters={inverters}
        colorMode={colorMode}
        onColorModeChange={setColorMode}
        onAutoSweep={handleAutoSweep}
      />

      <div className="flex-1 flex overflow-hidden relative min-w-0">
        <DigitalTwinGrid
          modules={filteredModules}
          selectedModule={selectedModule}
          onSelectModule={onSelectModule}
          farm={farm}
          colorMode={colorMode}
        />

        {selectedModule && (
          <ModuleDrawer
            module={selectedModule}
            onClose={() => onSelectModule(null)}
            onCreateWorkOrder={onCreateWorkOrder}
            isCreatingWO={isCreatingWO}
          />
        )}
      </div>
    </div>
  );
}
