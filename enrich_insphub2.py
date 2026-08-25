import os

INSP_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\InspectionHub\InspectionHub.jsx"

p2 = """
  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header & Hardware Modality Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              MULTI-SOURCE HARDWARE INTELLIGENCE
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Latest Ingested Sensor Data Streams
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Hardware Source Telemetry, Diagnostics & Defect Impact
          </h1>
        </div>

        {/* 4 Hardware Source Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 border-2 border-primary p-1 bg-white font-mono-data text-xs shadow-xs">
          {hardwareSources.map((source) => {
            const Icon = source.icon;
            const isSelected = selectedSourceId === source.id;
            return (
              <button
                key={source.id}
                onClick={() => {
                  setSelectedSourceId(source.id);
                  setSelectedAnomalyIdx(0);
                }}
                className={`px-3 py-2 font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected ? "bg-primary text-white" : "text-secondary hover:bg-surface"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="uppercase text-[11px]">{source.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Source Hardware Specs & Detected Anomalies (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 font-mono-data text-xs">
          {/* Hardware Specs & Mission Telemetry Card */}
          <div className="border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-start border-b border-border-subtle pb-2.5">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">{currentSource.tag}</span>
                <strong className="text-sm text-primary font-mono-data block mt-0.5">{currentSource.name}</strong>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2 py-0.5 text-[9px] font-bold uppercase">
                INGESTED
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-secondary font-sans">
              <div className="flex justify-between"><span>Hardware Sensor:</span> <strong className="font-mono-data text-primary">{currentSource.hardware}</strong></div>
              <div className="flex justify-between"><span>Mission Reference:</span> <strong className="font-mono-data text-primary">{currentSource.mission_id} ({currentSource.captured_at})</strong></div>
              <div className="flex justify-between"><span>Captured By:</span> <strong className="font-mono-data text-primary">{currentSource.pilot}</strong></div>
              <div className="flex justify-between"><span>Scan Coverage:</span> <strong className="font-mono-data text-primary">{currentSource.coverage}</strong></div>
              <div className="flex justify-between"><span>Spatial Resolution:</span> <strong className="font-mono-data text-primary">{currentSource.resolution}</strong></div>
              <div className="flex justify-between"><span>Flight Altitude:</span> <strong className="font-mono-data text-primary">{currentSource.altitude}</strong></div>
              <div className="flex justify-between"><span>GHI Irradiance:</span> <strong className="font-mono-data text-primary">{currentSource.irradiance}</strong></div>
            </div>
          </div>

          {/* Anomalies Discovered By This Source */}
          <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs">
            <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-2">
              DISCOVERED ANOMALIES BY THIS SOURCE ({currentSource.anomalies.length}):
            </strong>

            <div className="space-y-2">
              {currentSource.anomalies.map((anom, idx) => {
                const isSelected = selectedAnomalyIdx === idx;
                return (
                  <div
                    key={anom.id}
                    onClick={() => setSelectedAnomalyIdx(idx)}
                    className={`p-3 border transition-all cursor-pointer flex justify-between items-center ${
                      isSelected ? "border-primary bg-[#f6fef9] shadow-xs" : "border-border-subtle hover:border-primary bg-surface"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] text-secondary font-bold uppercase block">{anom.id} · {anom.inverter}</span>
                      <strong className="text-xs text-primary font-mono-data block mt-0.5">
                        #{anom.target} · {anom.type}
                      </strong>
                      <span className="text-[10px] text-critical font-bold mt-0.5 block">
                        ΔT {anom.deltaT} ({anom.annual_loss_inr}/yr)
                      </span>
                    </div>
                    <span className="text-xs font-bold text-primary">
                      {isSelected ? "● ACTIVE" : "SELECT →"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Spectral Visualizer & Deep Impact Audit (7 Cols) */}
        <div className="lg:col-span-7 space-y-4 font-mono-data text-xs">
          {/* Visualizer Card */}
          <div className="border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            {/* Visualizer Layer Switcher */}
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs">
                MULTI-SPECTRAL EVIDENCE: #{currentAnomaly.target}
              </strong>

              <div className="flex items-center gap-1 border border-border-strong p-0.5 bg-surface text-[10px]">
                <button
                  onClick={() => setActiveLayer("xai")}
                  className={`px-2.5 py-1 font-bold transition-all cursor-pointer ${
                    activeLayer === "xai" ? "bg-primary text-white" : "text-secondary hover:bg-white"
                  }`}
                >
                  AI HEATMAP
                </button>
                <button
                  onClick={() => setActiveLayer("thermal")}
                  className={`px-2.5 py-1 font-bold transition-all cursor-pointer ${
                    activeLayer === "thermal" ? "bg-primary text-white" : "text-secondary hover:bg-white"
                  }`}
                >
                  THERMAL IR
                </button>
                <button
                  onClick={() => setActiveLayer("rgb")}
                  className={`px-2.5 py-1 font-bold transition-all cursor-pointer ${
                    activeLayer === "rgb" ? "bg-primary text-white" : "text-secondary hover:bg-white"
                  }`}
                >
                  OPTICAL RGB
                </button>
              </div>
            </div>

            {/* High-Res Viewport with Bounding Box Overlay */}
            <div className="relative border-2 border-primary h-72 bg-black overflow-hidden flex items-center justify-center">
              <img
                src={currentDisplayImage}
                alt="Source Diagnostic"
                className="w-full h-full object-cover opacity-90"
              />
              {activeLayer === "xai" && (
                <div 
                  style={{
                    left: `${currentAnomaly.box.x}%`,
                    top: `${currentAnomaly.box.y}%`,
                    width: `${currentAnomaly.box.w}%`,
                    height: `${currentAnomaly.box.h}%`
                  }}
                  className="absolute border-2 border-critical bg-critical/20 flex flex-col justify-between p-1.5 animate-pulse"
                >
                  <span className="bg-critical text-white text-[8px] font-bold px-1 self-start">
                    {currentAnomaly.type} ({currentAnomaly.confidence}%)
                  </span>
                  <span className="bg-black text-white text-[8px] px-1 self-end font-bold">
                    ΔT {currentAnomaly.deltaT}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Deep Engineering Rationale & Electrical Effect */}
          <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs">
            <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5">
              DEEP FAILURE CAUSE & ELECTRICAL CIRCUIT IMPACT:
            </strong>

            <div className="space-y-2 font-sans text-xs text-primary leading-relaxed">
              <div className="bg-surface p-3 border border-border-subtle space-y-1">
                <strong className="font-mono-data text-xs text-primary block">
                  AFFECTED CELL REGION: {currentAnomaly.affected_region}
                </strong>
                <p className="text-secondary text-xs">
                  {currentAnomaly.electrical_effect}
                </p>
              </div>

              {/* Financial & Yield Loss Grid */}
              <div className="grid grid-cols-3 gap-2 bg-[#f6fef9] p-3 border border-[#abefc6] font-mono-data text-xs">
                <div>
                  <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Daily Power Loss</span>
                  <strong className="text-critical text-sm">{currentAnomaly.loss_kwh} kWh/d</strong>
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Annual Risk (INR)</span>
                  <strong className="text-primary text-sm">{currentAnomaly.annual_loss_inr} / yr</strong>
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Annual Risk (USD)</span>
                  <strong className="text-[#027a48] text-sm">{currentAnomaly.annual_loss_usd} / yr</strong>
                </div>
              </div>

              {/* Repair Action & Caution */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-1.5 font-bold text-primary font-mono-data text-[11px]">
                  <Wrench className="w-3.5 h-3.5 text-primary" />
                  <span>RECOMMENDED REMEDIATION:</span>
                </div>
                <p className="text-secondary bg-surface p-2.5 border border-border-subtle">
                  {currentAnomaly.repair_action}
                </p>
              </div>

              {/* Safety Caution */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-1.5 font-bold text-critical font-mono-data text-[11px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-critical" />
                  <span>SAFETY & HAZARD PROTOCOL:</span>
                </div>
                <p className="text-critical bg-[#fef3f2] p-2.5 border border-critical/30 font-medium">
                  {currentAnomaly.safety_caution || currentAnomaly.safetyCaution}
                </p>
              </div>
            </div>

            {/* Action CTA to Digital Twin */}
            <div className="pt-2">
              <button
                onClick={() => onNavigateToMap && onNavigateToMap()}
                className="w-full bg-primary text-white font-bold py-3.5 px-4 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs"
              >
                <span>LOCATE PANEL #{currentAnomaly.target} ON 2D DIGITAL TWIN →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(INSP_FILE, "a", encoding="utf-8") as f:
    f.write(p2)
print("Completed full InspectionHub.jsx with Executive Multi-Source Hardware Telemetry & Deep Impact Audit!")
