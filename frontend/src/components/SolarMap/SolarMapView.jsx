import React, { useState } from "react";
import MapControls from "./MapControls";
import DigitalTwinGrid from "./DigitalTwinGrid";
import ModuleDrawer from "./ModuleDrawer";

export default function SolarMapView({ modules, farm, selectedModule, onSelectModule, onCreateWorkOrder, isCreatingWO, filters, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const inverters = farm ? Array.from({ length: farm.inverter_count }, (_, i) => `INV-0${i + 1}`) : [];

  const filteredModules = modules.filter((m) => {
    if (searchTerm && !m.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <MapControls
        filters={filters}
        onFilterChange={onFilterChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        inverters={inverters}
      />

      <div className="flex-1 flex overflow-hidden relative min-w-0">
        <DigitalTwinGrid
          modules={filteredModules}
          selectedModule={selectedModule}
          onSelectModule={onSelectModule}
          farm={farm}
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
