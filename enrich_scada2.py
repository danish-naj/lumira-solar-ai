import os

SCADA_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\GuidedInspection\GuidedInspection.jsx"

p2 = """
  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Meteorological Weather SCADA Strip */}
      <div className="bg-surface border border-border-subtle p-3 flex flex-wrap items-center justify-between gap-4 font-mono-data text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block animate-pulse" />
          <span className="font-bold text-primary uppercase">PYRANOMETER NORMALIZED SCADA FEED:</span>
        </div>
        <div className="flex items-center gap-6 flex-wrap text-secondary text-[11px]">
          <div className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-warning" /><span>GHI: <strong className="text-primary font-mono-data">942 W/m²</strong></span></div>
          <div className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-warning" /><span>DNI: <strong className="text-primary font-mono-data">880 W/m²</strong></span></div>
          <div className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-critical" /><span>Ambient: <strong className="text-primary font-mono-data">41.8°C</strong></span></div>
          <div className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-critical" /><span>Module Temp: <strong className="text-critical font-mono-data">58.4°C</strong></span></div>
          <div className="flex items-center gap-1.5"><Wind className="w-3.5 h-3.5 text-primary" /><span>Wind: <strong className="text-primary font-mono-data">16.4 km/h NW</strong></span></div>
        </div>
      </div>

      {/* 2. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              AI-GUIDED SCADA TELEMETRY & I-V DIAGNOSTICS
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Real-Time String MPPT Inflection & Anomaly Routing
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Sub-Array Central Inverter Fleet & String I-V Curves
          </h1>
        </div>

        {/* Curve Mode Switcher */}
        <div className="flex items-center gap-1 border-2 border-primary p-1 bg-white font-mono-data text-xs shadow-xs">
          <button
            onClick={() => setCurveMode("IV")}
            className={`px-3 py-1 font-bold transition-all cursor-pointer ${
              curveMode === "IV" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
            }`}
          >
            I-V CURRENT CURVE
          </button>
          <button
            onClick={() => setCurveMode("PV")}
            className={`px-3 py-1 font-bold transition-all cursor-pointer ${
              curveMode === "PV" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
            }`}
          >
            P-V POWER CURVE
          </button>
        </div>
      </div>

      {/* 3. Live 6-Inverter Central SCADA Strip */}
      <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
              CENTRAL INVERTER CONVERSION EFFICIENCY & DC BUS VOLTAGES (6x SUNGROW SG3125HV)
            </h3>
          </div>
          <span className="text-[10px] font-mono-data text-secondary">Sampling Frequency: 1 Hz</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono-data text-xs">
          {inverters.map((inv) => {
            const isAlert = inv.temp > 55 || inv.status.includes("Alert");
            return (
              <div 
                key={inv.id}
                onClick={() => setSelectedString(inv.id === "INV-04" ? "INV-04-STR04" : inv.id === "INV-02" ? "INV-02-STR02" : "INV-03-STR01")}
                className={`p-3 border transition-all cursor-pointer bg-surface hover:bg-white ${
                  isAlert ? "border-critical bg-[#fef3f2]" : "border-border-subtle hover:border-primary"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <strong className="text-primary text-xs">{inv.id}</strong>
                  <span className={`text-[9px] font-bold px-1 py-0.2 uppercase ${isAlert ? "bg-critical text-white" : "bg-[#ecfdf3] text-[#027a48]"}`}>
                    {inv.eff}
                  </span>
                </div>
                <div className="space-y-0.5 text-[10px] text-secondary">
                  <div className="flex justify-between"><span>Power:</span> <strong className="text-primary">{inv.power_kw} kW</strong></div>
                  <div className="flex justify-between"><span>DC Bus:</span> <strong className="text-primary">{inv.dc_v} V</strong></div>
                  <div className="flex justify-between"><span>Temp:</span> <strong className={inv.temp > 55 ? "text-critical font-bold" : "text-primary"}>{inv.temp}°C</strong></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Main Two-Column Layout: Interactive SVG I-V Curve + Electrical Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Curve Plotter (7 Cols) */}
        <div className="lg:col-span-7 border-2 border-primary bg-white p-6 space-y-4 shadow-xs font-mono-data text-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-border-subtle pb-3 mb-4">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">
                  SELECTED STRING: {currentActiveString.id} (#{currentActiveString.target_module})
                </span>
                <strong className="text-sm text-primary font-mono-data">
                  {curveMode === "IV" ? "I-V Characteristic Curve vs Nominal Baseline" : "P-V Power Characteristic Curve"}
                </strong>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#027a48] inline-block" /> Nominal Baseline</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-critical inline-block" /> Active String</span>
              </div>
            </div>

            {/* SVG Plot Viewport */}
            <div className="relative border border-border-strong bg-[#0f172a] p-4 text-white rounded-none">
              <svg viewBox="0 0 500 260" className="w-full h-56 overflow-visible">
                {/* Gridlines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#334155" strokeDasharray="3,3" />
                <line x1="40" y1="80" x2="480" y2="80" stroke="#334155" strokeDasharray="3,3" />
                <line x1="40" y1="140" x2="480" y2="140" stroke="#334155" strokeDasharray="3,3" />
                <line x1="40" y1="200" x2="480" y2="200" stroke="#334155" strokeDasharray="3,3" />
                
                <line x1="120" y1="20" x2="120" y2="220" stroke="#334155" strokeDasharray="3,3" />
                <line x1="240" y1="20" x2="240" y2="220" stroke="#334155" strokeDasharray="3,3" />
                <line x1="360" y1="20" x2="360" y2="220" stroke="#334155" strokeDasharray="3,3" />
                <line x1="460" y1="20" x2="460" y2="220" stroke="#334155" strokeDasharray="3,3" />

                {/* Axes */}
                <line x1="40" y1="20" x2="40" y2="220" stroke="#94a3b8" strokeWidth="2" />
                <line x1="40" y1="220" x2="480" y2="220" stroke="#94a3b8" strokeWidth="2" />

                {/* Axis Labels */}
                <text x="440" y="240" fill="#94a3b8" fontSize="10" fontFamily="monospace">Voltage (V)</text>
                <text x="10" y="25" fill="#94a3b8" fontSize="10" fontFamily="monospace">{curveMode === "IV" ? "Current (A)" : "Power (W)"}</text>

                {curveMode === "IV" ? (
                  <>
                    {/* Nominal Baseline I-V Curve (Green) */}
                    <path
                      d="M 40 40 L 340 45 Q 430 55 450 220"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="3"
                    />
                    {/* Nominal Knee Point */}
                    <circle cx="370" cy="55" r="4" fill="#22c55e" />
                    <text x="380" y="50" fill="#22c55e" fontSize="9" fontFamily="monospace">MPPT: 540W</text>

                    {/* Active Anomalous String I-V Curve (Red) */}
                    <path
                      d="M 40 85 L 260 90 Q 320 120 350 220"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeDasharray={currentActiveString.is_anomalous ? "none" : "none"}
                    />
                    {/* Anomalous Knee Point */}
                    <circle cx="280" cy="100" r="4" fill="#ef4444" className="animate-ping" />
                    <circle cx="280" cy="100" r="4" fill="#ef4444" />
                    <text x="290" y="115" fill="#ef4444" fontSize="9" fontFamily="monospace">
                      Mismatch: {currentActiveString.voltage_v}V ({currentActiveString.deviation_pct})
                    </text>
                  </>
                ) : (
                  <>
                    {/* Nominal P-V Curve (Green) */}
                    <path
                      d="M 40 220 Q 300 30 450 220"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="3"
                    />
                    <circle cx="300" cy="45" r="4" fill="#22c55e" />
                    <text x="310" y="40" fill="#22c55e" fontSize="9" fontFamily="monospace">Pmax: 540W</text>

                    {/* Active Anomalous P-V Curve (Red) */}
                    <path
                      d="M 40 220 Q 240 100 350 220"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                    />
                    <circle cx="240" cy="110" r="4" fill="#ef4444" />
                    <text x="250" y="125" fill="#ef4444" fontSize="9" fontFamily="monospace">Pmax: 317W (-41%)</text>
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Electrical Inflection Parameters */}
          <div className="grid grid-cols-4 gap-2 bg-surface p-3 border border-border-subtle text-center text-xs mt-3">
            <div><span className="text-[10px] text-secondary uppercase block">Voc (Open-Circuit)</span><strong className="text-primary">49.2 V</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Isc (Short-Circuit)</span><strong className="text-primary">13.8 A</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Fill Factor (FF)</span><strong className="text-primary">81.4%</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Series Res (Rs)</span><strong className="text-critical">0.42 Ω</strong></div>
          </div>
        </div>

        {/* 48-String Mismatch Diagnostics Ranking (5 Cols) */}
        <div className="lg:col-span-5 border border-border-strong bg-white p-5 space-y-3 shadow-xs font-mono-data text-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-border-subtle pb-2 mb-3">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-critical" />
                <span>STRING COMBINER DEVIATION RANKING (48 STRINGS)</span>
              </strong>
            </div>

            <div className="space-y-2">
              {stringRankings.map((str) => {
                const isSelected = selectedString === str.id;
                return (
                  <div
                    key={str.id}
                    onClick={() => setSelectedString(str.id)}
                    className={`p-3 border transition-all cursor-pointer flex justify-between items-center ${
                      isSelected ? "border-primary bg-[#f6fef9] shadow-xs" : "border-border-subtle hover:border-primary bg-surface"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] text-secondary font-bold uppercase block">{str.id} · {str.inverter}</span>
                      <strong className="text-xs text-primary font-mono-data block mt-0.5">
                        #{str.target_module} · {str.issue}
                      </strong>
                      <span className={`text-[10px] font-bold mt-0.5 block ${str.is_anomalous ? "text-critical" : "text-[#027a48]"}`}>
                        V: {str.voltage_v}V (Dev: {str.deviation_pct}) · ΔT {str.delta_t}
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

          <div className="pt-3 border-t border-border-subtle">
            <button
              onClick={() => onNavigateToMap && onNavigateToMap()}
              className="w-full bg-primary text-white font-bold py-3 px-4 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs"
            >
              <span>LOCATE STRING ON 2D DIGITAL TWIN GRID →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(SCADA_FILE, "a", encoding="utf-8") as f:
    f.write(p2)

print("Completed full advanced GuidedInspection.jsx.")
