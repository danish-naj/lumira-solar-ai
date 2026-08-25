import os

DASHBOARD_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Dashboard\DashboardView.jsx"

p2 = """
  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Meteorological Weather SCADA Strip */}
      <div className="bg-surface border border-border-subtle p-3 flex flex-wrap items-center justify-between gap-4 font-mono-data text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block animate-pulse" />
          <span className="font-bold text-primary uppercase">SCADA METEOROLOGICAL TELEMETRY:</span>
        </div>
        <div className="flex items-center gap-6 flex-wrap text-secondary text-[11px]">
          <div className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-warning" /><span>GHI: <strong className="text-primary font-mono-data">942 W/m²</strong></span></div>
          <div className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-critical" /><span>Ambient: <strong className="text-primary font-mono-data">41.8°C</strong></span></div>
          <div className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-critical" /><span>Module Temp: <strong className="text-critical font-mono-data">58.4°C</strong></span></div>
          <div className="flex items-center gap-1.5"><Wind className="w-3.5 h-3.5 text-primary" /><span>Wind: <strong className="text-primary font-mono-data">16.4 km/h NW</strong></span></div>
          <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-secondary" /><span>Soiling Index: <strong className="text-primary font-mono-data">3.4 / 10</strong></span></div>
        </div>
      </div>

      {/* 2. Top Executive KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Plant Health Score */}
        <div 
          onClick={() => setActiveModal("health")}
          className="border-2 border-primary bg-white p-5 space-y-2 cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-secondary uppercase font-bold font-mono-data">OPERATIONAL HEALTH</span>
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </div>
          <div>
            <strong className="text-4xl font-black text-primary font-mono-data block tracking-tight">
              {farm?.health_score || 97}<span className="text-lg text-secondary font-normal font-sans">/100</span>
            </strong>
            <span className="text-[#027a48] text-[11px] font-bold font-mono-data mt-1 block">
              ✓ IEC 62446-3 Tier-1 (Optimal)
            </span>
          </div>
        </div>

        {/* Active Capacity & Generation */}
        <div 
          onClick={() => setActiveModal("generation")}
          className="border border-border-strong bg-white p-5 space-y-2 cursor-pointer hover:border-primary hover:shadow-xs transition-all flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-secondary uppercase font-bold font-mono-data">DAILY ENERGY GENERATION</span>
            <Zap className="w-4 h-4 text-warning" />
          </div>
          <div>
            <strong className="text-3xl font-bold text-primary font-mono-data block">
              248.5 <span className="text-sm text-secondary font-normal font-sans">MWh/d</span>
            </strong>
            <span className="text-secondary text-[11px] font-mono-data mt-1 block">
              Revenue: ₹14.91 Lakhs / day ($17.8K)
            </span>
          </div>
        </div>

        {/* Degradation Rate */}
        <div 
          onClick={() => setActiveModal("degradation")}
          className="border border-border-strong bg-white p-5 space-y-2 cursor-pointer hover:border-primary hover:shadow-xs transition-all flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-secondary uppercase font-bold font-mono-data">FLEET DEGRADATION</span>
            <TrendingDown className="w-4 h-4 text-[#027a48]" />
          </div>
          <div>
            <strong className="text-3xl font-bold text-primary font-mono-data block">
              0.42% <span className="text-sm text-secondary font-normal font-sans">/ yr</span>
            </strong>
            <span className="text-[#027a48] text-[11px] font-bold font-mono-data mt-1 block">
              ✓ Better than 0.70% baseline
            </span>
          </div>
        </div>

        {/* Active Work Orders */}
        <div 
          onClick={() => onNavigateTab("maintenance")}
          className="border border-border-strong bg-white p-5 space-y-2 cursor-pointer hover:border-primary hover:shadow-xs transition-all flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-secondary uppercase font-bold font-mono-data">ACTIVE O&M TICKETS</span>
            <Wrench className="w-4 h-4 text-primary" />
          </div>
          <div>
            <strong className="text-3xl font-bold text-critical font-mono-data block">
              3 <span className="text-sm text-secondary font-normal font-sans">Dispatched</span>
            </strong>
            <span className="text-secondary text-[11px] font-mono-data mt-1 block">
              P1 Critical: 2 · P3 Routine: 1
            </span>
          </div>
        </div>
      </div>

      {/* 3. Deep Plant Infrastructure & Engineering Registry */}
      <div className="border border-border-strong bg-white p-6 space-y-4 shadow-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
              PLANT INFRASTRUCTURE, GRID INTERCONNECT & ASSET ENGINEERING KNOWLEDGE BASE
            </h3>
          </div>
          <span className="text-[10px] font-mono-data text-[#027a48] font-bold">240-ACRE ASSET</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-data text-xs">
          {/* Column 1: Grid & Contract */}
          <div className="p-4 border border-border-subtle bg-surface space-y-2">
            <strong className="text-primary font-sans text-xs uppercase block border-b border-border-subtle pb-1">
              1. Grid & Commercial Offtake
            </strong>
            <div className="space-y-1 text-[11px] text-secondary font-sans">
              <div className="flex justify-between"><span className="text-secondary">PPA Offtaker:</span> <strong className="font-mono-data text-primary">SECI (25-Yr BOO)</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Tariff:</span> <strong className="font-mono-data text-primary">₹2.44 / kWh ($0.029)</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Interconnect GSS:</span> <strong className="font-mono-data text-primary">220kV RVPNL Substation</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Transformers:</span> <strong className="font-mono-data text-primary">33kV / 220kV 50 MVA Oil</strong></div>
            </div>
          </div>

          {/* Column 2: PV Array & Tracking */}
          <div className="p-4 border border-border-subtle bg-surface space-y-2">
            <strong className="text-primary font-sans text-xs uppercase block border-b border-border-subtle pb-1">
              2. Module Array & Trackers
            </strong>
            <div className="space-y-1 text-[11px] text-secondary font-sans">
              <div className="flex justify-between"><span className="text-secondary">Total Modules:</span> <strong className="font-mono-data text-primary">92,592 Panels (540 Wp)</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Module Type:</span> <strong className="font-mono-data text-primary">LONGi Hi-MO 6 144-HalfCut</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Solar Trackers:</span> <strong className="font-mono-data text-primary">NEXTracker Horizon (±60°)</strong></div>
              <div className="flex justify-between"><span className="text-secondary">DC/AC Overload:</span> <strong className="font-mono-data text-primary">1.11x (50 MWp / 45 MW)</strong></div>
            </div>
          </div>

          {/* Column 3: Inverters & Sensors */}
          <div className="p-4 border border-border-subtle bg-surface space-y-2">
            <strong className="text-primary font-sans text-xs uppercase block border-b border-border-subtle pb-1">
              3. Inverters & Pyranometers
            </strong>
            <div className="space-y-1 text-[11px] text-secondary font-sans">
              <div className="flex justify-between"><span className="text-secondary">Inverter Fleet:</span> <strong className="font-mono-data text-primary">6x Sungrow SG3125HV-30</strong></div>
              <div className="flex justify-between"><span className="text-secondary">String Combiners:</span> <strong className="font-mono-data text-primary">48 DC Smart Combiner Boxes</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Pyranometers:</span> <strong className="font-mono-data text-primary">Dual Kipp & Zonen CMP11</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Soiling Stations:</span> <strong className="font-mono-data text-primary">4 Optical Transmission Eyes</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Live 6-Inverter Fleet Status Grid */}
      <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
              LIVE SUB-ARRAY CENTRAL INVERTER TELEMETRY (6x SUNGROW SG3125HV)
            </h3>
          </div>
          <span className="text-[10px] font-mono-data text-secondary">Updated Every 2s</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono-data text-xs">
          {inverters.map((inv) => {
            const isAlert = inv.health < 90;
            return (
              <div 
                key={inv.id}
                onClick={() => {
                  onSelectModule({ id: inv.id === "INV-04" ? "R12-C37" : "R01-C01", row: 1, col: 1 });
                  onNavigateTab("map");
                }}
                className={`p-3 border transition-all cursor-pointer bg-surface hover:bg-white ${
                  isAlert ? "border-critical bg-[#fef3f2]" : "border-border-subtle hover:border-primary"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <strong className="text-primary text-xs">{inv.id}</strong>
                  <span className={`text-[9px] font-bold px-1 py-0.2 uppercase ${isAlert ? "bg-critical text-white" : "bg-[#ecfdf3] text-[#027a48]"}`}>
                    {inv.health}%
                  </span>
                </div>
                <div className="space-y-0.5 text-[10px] text-secondary">
                  <div className="flex justify-between"><span>Power:</span> <strong className="text-primary">{inv.power_kw} kW</strong></div>
                  <div className="flex justify-between"><span>DC V:</span> <strong className="text-primary">{inv.dc_v} V</strong></div>
                  <div className="flex justify-between"><span>Temp:</span> <strong className={inv.temp_c > 55 ? "text-critical font-bold" : "text-primary"}>{inv.temp_c}°C</strong></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Two-Column Breakdown: Defect Taxonomy & High-Priority Action Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Defect Taxonomy Table (7 Cols) */}
        <div className="lg:col-span-7 border border-border-strong bg-white p-5 space-y-3 shadow-xs">
          <div className="flex justify-between items-center border-b border-border-subtle pb-2">
            <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
              FAILURE MODE TAXONOMY & LOSS ATTRIBUTION
            </h3>
            <span className="text-[10px] font-mono-data text-secondary">Click row to filter map</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono-data">
              <thead>
                <tr className="bg-surface border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                  <th className="py-2.5 px-3 font-sans">Failure Mode</th>
                  <th className="py-2.5 px-3">Count</th>
                  <th className="py-2.5 px-3">Temp Delta</th>
                  <th className="py-2.5 px-3">Annual Risk</th>
                  <th className="py-2.5 px-3 font-sans">Required Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-xs">
                {defectTaxonomy.map((d, idx) => (
                  <tr 
                    key={idx}
                    onClick={() => {
                      onSelectModule({ id: d.primaryMod, row: 12, col: 37 });
                      onNavigateTab("map");
                    }}
                    className="hover:bg-surface transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-3 font-sans font-bold text-primary flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${d.severity === "Critical" ? "bg-critical" : d.severity === "High" ? "bg-warning" : "bg-secondary"}`} />
                      <span>{d.type}</span>
                    </td>
                    <td className="py-2.5 px-3 font-bold">{d.count}</td>
                    <td className="py-2.5 px-3 text-critical font-bold">{d.deltaT}</td>
                    <td className="py-2.5 px-3 font-bold text-primary">{d.annual_loss_inr}</td>
                    <td className="py-2.5 px-3 text-secondary font-sans text-[11px]">{d.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* High-Priority Action Queue (5 Cols) */}
        <div className="lg:col-span-5 border-2 border-primary bg-white p-5 space-y-3 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-border-subtle pb-2 mb-3">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs uppercase font-mono-data">
                <AlertTriangle className="w-4 h-4 text-critical" />
                <span>HIGH-PRIORITY ACTION QUEUE</span>
              </div>
              <span className="bg-critical text-white text-[9px] font-mono-data font-bold px-1.5 py-0.2 uppercase">
                3 PENDING
              </span>
            </div>

            <div className="space-y-3 font-mono-data text-xs">
              {actionQueue.map((act) => (
                <div 
                  key={act.id}
                  className="p-3 border border-border-subtle bg-surface hover:bg-white hover:border-primary transition-all cursor-pointer"
                  onClick={() => {
                    onSelectModule({ id: act.module, row: 12, col: 37 });
                    onNavigateTab("map");
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <strong className="text-primary text-xs">#{act.module} ({act.inverter})</strong>
                    <span className="text-critical font-bold text-[10px]">{act.urgency}</span>
                  </div>
                  <p className="text-secondary font-sans text-[11px] mb-2">{act.issue}</p>
                  <div className="flex justify-between items-center text-[10px] text-secondary border-t border-border-subtle pt-1.5">
                    <span>{act.assigned}</span>
                    <strong className="text-critical">{act.sla}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("map")}
            className="w-full bg-primary text-white font-bold py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-between border border-primary hover:bg-white hover:text-primary transition-all cursor-pointer mt-3"
          >
            <span>VIEW ANOMALIES ON DIGITAL TWIN GRID →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
"""

with open(DASHBOARD_FILE, "a", encoding="utf-8") as f:
    f.write(p2)
print("Completed full DashboardView.jsx with Deep Plant Knowledge.")
