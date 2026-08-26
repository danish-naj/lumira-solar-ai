import React, { useState, useEffect } from "react";
import { 
  Zap, 
  TrendingDown, 
  Navigation, 
  ArrowRight, 
  Crosshair, 
  Brain, 
  Grid, 
  AlertTriangle, 
  Timer, 
  Clock, 
  Activity, 
  Sun, 
  Wind, 
  Thermometer, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Sliders,
  Sparkles,
  Play,
  RotateCw,
  LineChart,
  Target,
  Gauge,
  Info,
  ShieldCheck,
  Maximize2
} from "lucide-react";

export default function GuidedInspection({ farm, onNavigateToMap }) {
  const [selectedString, setSelectedString] = useState("INV-04-STR04");
  const [curveMode, setCurveMode] = useState("IV"); // 'IV' | 'PV'
  const [isSweeping, setIsSweeping] = useState(false);
  const [hoverCoord, setHoverCoord] = useState(null);

  // 1. Automated Real-Time Meteorological SCADA Telemetry Stream
  const [liveGHI, setLiveGHI] = useState(942.4); // W/m² (Kipp & Zonen CMP11)
  const [liveDNI, setLiveDNI] = useState(880.2); // W/m² (Direct Normal)
  const [liveAmbientTemp, setLiveAmbientTemp] = useState(41.8); // °C
  const [liveModuleTemp, setLiveModuleTemp] = useState(58.4); // °C (PT100 Backsheet Sensor)
  const [liveWindSpeed, setLiveWindSpeed] = useState(16.4); // km/h NW

  // 2. Central Inverter Fleet Telemetry (6x Sungrow SG3125HV 3.125 MW units)
  const [inverters, setInverters] = useState([
    { id: "INV-01", name: "Sungrow SG3125HV #1", power_kw: 3085, dc_v: 1245, dc_a: 2470, eff: "98.9%", temp: 48.2, status: "Optimal", power_factor: 0.998 },
    { id: "INV-02", name: "Sungrow SG3125HV #2", power_kw: 2890, dc_v: 1180, dc_a: 2450, eff: "97.4%", temp: 54.6, status: "Mismatch Alert", power_factor: 0.995 },
    { id: "INV-03", name: "Sungrow SG3125HV #3", power_kw: 3112, dc_v: 1250, dc_a: 2490, eff: "99.1%", temp: 47.9, status: "Optimal", power_factor: 0.999 },
    { id: "INV-04", name: "Sungrow SG3125HV #4", power_kw: 2750, dc_v: 1140, dc_a: 2410, eff: "96.2%", temp: 58.4, status: "Hotspot Alert", power_factor: 0.992 },
    { id: "INV-05", name: "Sungrow SG3125HV #5", power_kw: 3045, dc_v: 1238, dc_a: 2460, eff: "98.8%", temp: 49.1, status: "Optimal", power_factor: 0.998 },
    { id: "INV-06", name: "Sungrow SG3125HV #6", power_kw: 3098, dc_v: 1248, dc_a: 2480, eff: "98.9%", temp: 48.5, status: "Optimal", power_factor: 0.998 },
  ]);

  // Automated Real-Time SCADA Polling Loop (1 Hz Sampling)
  useEffect(() => {
    const interval = setInterval(() => {
      // Small live fluctuations in pyranometer & module temp
      setLiveGHI((prev) => Number((prev + (Math.random() * 0.8 - 0.4)).toFixed(1)));
      setLiveDNI((prev) => Number((prev + (Math.random() * 0.8 - 0.4)).toFixed(1)));
      setLiveModuleTemp((prev) => Number((prev + (Math.random() * 0.2 - 0.1)).toFixed(1)));
      setLiveWindSpeed((prev) => Number((prev + (Math.random() * 0.6 - 0.3)).toFixed(1)));

      // Dynamic inverter fleet power updates
      setInverters((prev) =>
        prev.map((inv) => ({
          ...inv,
          power_kw: Math.round(inv.power_kw + (Math.random() * 6 - 3)),
          dc_v: Math.round(inv.dc_v + (Math.random() * 2 - 1)),
          temp: Number((inv.temp + (Math.random() * 0.1 - 0.05)).toFixed(1))
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // String Combiner Fleet Ranking & Anomaly Table (Top 6 ranked by deviation)
  const stringRankings = [
    { 
      id: "INV-04-STR04", 
      inverter: "INV-04", 
      target_module: "R12-C37", 
      voltage_v: 32.4, 
      nominal_v: 41.8, 
      current_a: 9.8, 
      nominal_a: 12.9, 
      p_mp: 317.5,
      nominal_p: 540.0,
      deviation_pct: "-22.5%", 
      delta_t: "+18.4°C", 
      voc: 46.2,
      isc: 11.2,
      ff: "73.2%",
      rs: "0.48 Ω",
      rsh: "180 Ω",
      issue: "Bypass Diode Thermal Runaway", 
      status: "Critical (P1)", 
      is_anomalous: true 
    },
    { 
      id: "INV-02-STR02", 
      inverter: "INV-02", 
      target_module: "R04-C18", 
      voltage_v: 28.6, 
      nominal_v: 41.8, 
      current_a: 8.4, 
      nominal_a: 12.9, 
      p_mp: 240.2,
      nominal_p: 540.0,
      deviation_pct: "-31.6%", 
      delta_t: "+24.5°C", 
      voc: 44.8,
      isc: 9.8,
      ff: "68.4%",
      rs: "0.62 Ω",
      rsh: "120 Ω",
      issue: "Ribbon Lead Solder Fracture", 
      status: "Critical (P1)", 
      is_anomalous: true 
    },
    { 
      id: "INV-05-STR07", 
      inverter: "INV-05", 
      target_module: "R07-C45", 
      voltage_v: 38.2, 
      nominal_v: 41.8, 
      current_a: 11.2, 
      nominal_a: 12.9, 
      p_mp: 427.8,
      nominal_p: 540.0,
      deviation_pct: "-8.6%", 
      delta_t: "+4.2°C", 
      voc: 48.4,
      isc: 12.4,
      ff: "77.8%",
      rs: "0.32 Ω",
      rsh: "450 Ω",
      issue: "Wafer Busbar Microcrack Shunt", 
      status: "High (P2)", 
      is_anomalous: true 
    },
    { 
      id: "INV-01-STR03", 
      inverter: "INV-01", 
      target_module: "R15-C22", 
      voltage_v: 39.5, 
      nominal_v: 41.8, 
      current_a: 10.8, 
      nominal_a: 12.9, 
      p_mp: 426.6,
      nominal_p: 540.0,
      deviation_pct: "-5.5%", 
      delta_t: "+1.2°C", 
      voc: 48.8,
      isc: 12.1,
      ff: "79.2%",
      rs: "0.26 Ω",
      rsh: "820 Ω",
      issue: "Desert Sand Optical Soiling", 
      status: "Medium (P3)", 
      is_anomalous: true 
    },
    { 
      id: "INV-03-STR01", 
      inverter: "INV-03", 
      target_module: "R01-C01", 
      voltage_v: 41.7, 
      nominal_v: 41.8, 
      current_a: 12.8, 
      nominal_a: 12.9, 
      p_mp: 533.8,
      nominal_p: 540.0,
      deviation_pct: "-0.2%", 
      delta_t: "+0.1°C", 
      voc: 49.2,
      isc: 13.8,
      ff: "81.4%",
      rs: "0.18 Ω",
      rsh: "2.4 kΩ",
      issue: "Nominal Operating State", 
      status: "Optimal", 
      is_anomalous: false 
    },
    { 
      id: "INV-06-STR05", 
      inverter: "INV-06", 
      target_module: "R18-C52", 
      voltage_v: 41.5, 
      nominal_v: 41.8, 
      current_a: 12.7, 
      nominal_a: 12.9, 
      p_mp: 527.1,
      nominal_p: 540.0,
      deviation_pct: "-0.7%", 
      delta_t: "+0.3°C", 
      voc: 49.1,
      isc: 13.7,
      ff: "81.1%",
      rs: "0.19 Ω",
      rsh: "2.2 kΩ",
      issue: "Nominal Operating State", 
      status: "Optimal", 
      is_anomalous: false 
    },
  ];

  const currentActiveString = stringRankings.find(s => s.id === selectedString) || stringRankings[0];

  const handleTriggerIVSweep = () => {
    setIsSweeping(true);
    setTimeout(() => setIsSweeping(false), 1800);
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Meteorological Weather SCADA Strip (100% Automated Sensor Stream) */}
      <div className="bg-surface border border-border-subtle p-3 flex flex-wrap items-center justify-between gap-4 font-mono-data text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block animate-ping" />
          <span className="font-bold text-primary uppercase">PYRANOMETER NORMALIZED SCADA METEO FEED:</span>
        </div>
        <div className="flex items-center gap-6 flex-wrap text-secondary text-[11px]">
          <div className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-warning" /><span>GHI: <strong className="text-primary font-mono-data">{liveGHI} W/m²</strong></span></div>
          <div className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-warning" /><span>DNI: <strong className="text-primary font-mono-data">{liveDNI} W/m²</strong></span></div>
          <div className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-critical" /><span>Ambient: <strong className="text-primary font-mono-data">{liveAmbientTemp}°C</strong></span></div>
          <div className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-critical" /><span>Module Temp: <strong className="text-critical font-mono-data">{liveModuleTemp}°C</strong></span></div>
          <div className="flex items-center gap-1.5"><Wind className="w-3.5 h-3.5 text-primary" /><span>Wind: <strong className="text-primary font-mono-data">{liveWindSpeed} km/h NW</strong></span></div>
        </div>
      </div>

      {/* 2. Top Header & Curve Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              AI-GUIDED INDUSTRIAL SCADA & I-V DIAGNOSTICS
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Real-Time Modbus/TCP DC MPPT Telemetry & Curve Analyzer
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Central Inverter Fleet & Real-Time String I-V Diagnostics
          </h1>
        </div>

        {/* Curve Mode Switcher & 1-Click Electronic Sweep Button */}
        <div className="flex flex-wrap items-center gap-2 font-mono-data text-xs">
          <button
            onClick={handleTriggerIVSweep}
            disabled={isSweeping}
            className={`px-3 py-1.5 bg-[#027a48] text-white font-bold uppercase border border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
              isSweeping ? "animate-pulse" : ""
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSweeping ? "animate-spin" : ""}`} />
            <span>{isSweeping ? "SWEEPING 48 STRINGS..." : "TRIGGER I-V SWEEP"}</span>
          </button>

          <div className="flex items-center gap-1 border-2 border-primary p-1 bg-white shadow-xs">
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
      </div>

      {/* 3. Feature Definition & Mathematical Principle */}
      <div className="bg-[#f0fdf4] border-2 border-[#027a48] p-4 space-y-2 font-mono-data">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="bg-[#027a48] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
            <h3 className="font-bold text-sm text-[#027a48] uppercase">What Is AI-Guided Industrial SCADA & String I-V Diagnostics?</h3>
          </div>
          <span className="text-xs font-bold text-[#027a48]">IEC 61850 / IEEE 1547 Standard</span>
        </div>
        <p className="text-xs text-primary font-sans leading-relaxed">
          <strong>What It Is:</strong> Continuous 1-second Modbus/TCP DC voltage and current sampling across all 48 string combiner boxes. The AI engine automatically computes key inflection metrics: Fill Factor <strong>(FF = P_mp / (Voc · Isc))</strong>, Series Resistance <strong>(Rs = -dV/dI at Voc)</strong>, and Shunt Resistance <strong>(Rsh = -dV/dI at Isc)</strong> to isolate microcracks, bypass diode short-circuits, and ribbon lead solder burnouts in real-time before string power clipping occurs.
        </p>
      </div>

      {/* 4. Live 6-Inverter Central Fleet SCADA Strip */}
      <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs font-mono-data text-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
              CENTRAL INVERTER CONVERSION EFFICIENCY & DC BUS VOLTAGES (6x SUNGROW SG3125HV)
            </h3>
          </div>
          <span className="text-[10px] text-secondary">Sampling: 1 Hz Real-Time Modbus/TCP</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {inverters.map((inv) => {
            const isAlert = inv.temp > 55 || inv.status.includes("Alert");
            return (
              <div 
                key={inv.id}
                onClick={() => setSelectedString(inv.id === "INV-04" ? "INV-04-STR04" : inv.id === "INV-02" ? "INV-02-STR02" : "INV-03-STR01")}
                className={`p-3 border transition-all cursor-pointer bg-surface hover:bg-white shadow-2xs ${
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
                  <div className="flex justify-between"><span>PF:</span> <strong className="text-[#027a48]">{inv.power_factor}</strong></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Main Two-Column Layout: Interactive SVG I-V Curve + 48-String Deviation Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
        
        {/* SVG Curve Plotter (7 Cols) */}
        <div className="lg:col-span-7 border-2 border-primary bg-white p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-3 mb-4 gap-2">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">
                  SELECTED STRING: {currentActiveString.id} (#{currentActiveString.target_module})
                </span>
                <strong className="text-sm text-primary font-mono-data">
                  {curveMode === "IV" ? "I-V Characteristic Curve vs Nominal STC Baseline" : "P-V Power Characteristic Curve"}
                </strong>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#027a48] inline-block" /> Nominal STC (540 Wp)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-critical inline-block" /> Active Anomalous String</span>
              </div>
            </div>

            {/* SVG Plot Viewport with Interactive Coordinate Probe */}
            <div 
              className="relative border border-border-strong bg-[#090d16] p-4 text-white rounded-none cursor-crosshair overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                const volt = ((x / 100) * 50).toFixed(1);
                const curr = Math.max(0, (13.8 - Math.pow(x / 100, 4) * 13.8)).toFixed(2);
                const power = (volt * curr).toFixed(0);
                setHoverCoord({ x: e.clientX - rect.left, y: e.clientY - rect.top, volt, curr, power });
              }}
              onMouseLeave={() => setHoverCoord(null)}
            >
              <svg viewBox="0 0 500 260" className="w-full h-60 overflow-visible">
                {/* Gridlines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="40" y1="80" x2="480" y2="80" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="40" y1="140" x2="480" y2="140" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="40" y1="200" x2="480" y2="200" stroke="#1e293b" strokeDasharray="3,3" />
                
                <line x1="120" y1="20" x2="120" y2="220" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="240" y1="20" x2="240" y2="220" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="360" y1="20" x2="360" y2="220" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="460" y1="20" x2="460" y2="220" stroke="#1e293b" strokeDasharray="3,3" />

                {/* Axes */}
                <line x1="40" y1="20" x2="40" y2="220" stroke="#64748b" strokeWidth="2" />
                <line x1="40" y1="220" x2="480" y2="220" stroke="#64748b" strokeWidth="2" />

                {/* Axis Labels */}
                <text x="440" y="240" fill="#94a3b8" fontSize="10" fontFamily="monospace">Voltage (V)</text>
                <text x="10" y="25" fill="#94a3b8" fontSize="10" fontFamily="monospace">{curveMode === "IV" ? "Current (A)" : "Power (W)"}</text>

                {curveMode === "IV" ? (
                  <>
                    {/* Nominal STC Baseline I-V Curve (Green) */}
                    <path
                      d="M 40 40 L 340 45 Q 430 55 450 220"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="3"
                    />
                    {/* Nominal Knee Point */}
                    <circle cx="370" cy="55" r="4" fill="#22c55e" />
                    <text x="380" y="50" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">MPPT: 540W (41.8V, 12.9A)</text>

                    {/* Active Anomalous String I-V Curve (Red) */}
                    <path
                      d="M 40 85 L 260 90 Q 320 120 350 220"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                    />
                    {/* Anomalous Knee Point */}
                    <circle cx="280" cy="100" r="4" fill="#ef4444" className="animate-ping" />
                    <circle cx="280" cy="100" r="4" fill="#ef4444" />
                    <text x="290" y="115" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">
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
                    <text x="310" y="40" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">Pmax: 540.0 W</text>

                    {/* Active Anomalous P-V Curve (Red) */}
                    <path
                      d="M 40 220 Q 240 100 350 220"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                    />
                    <circle cx="240" cy="110" r="4" fill="#ef4444" />
                    <text x="250" y="125" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">Pmax: {currentActiveString.p_mp} W ({currentActiveString.deviation_pct})</text>
                  </>
                )}
              </svg>

              {/* Hover Coordinate Tooltip */}
              {hoverCoord && (
                <div 
                  className="absolute pointer-events-none bg-black/90 border border-[#22c55e] text-white px-2 py-1 text-[10px] font-mono-data rounded-xs shadow-lg"
                  style={{ left: `${hoverCoord.x + 10}px`, top: `${hoverCoord.y - 25}px` }}
                >
                  <span>{hoverCoord.volt} V · {hoverCoord.curr} A · {hoverCoord.power} W</span>
                </div>
              )}
            </div>
          </div>

          {/* 6 Key Electrical Inflection Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 bg-surface p-3 border border-border-subtle text-center text-xs mt-3">
            <div><span className="text-[10px] text-secondary uppercase block">Voc (Open-Circuit)</span><strong className="text-primary">{currentActiveString.voc} V</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Isc (Short-Circuit)</span><strong className="text-primary">{currentActiveString.isc} A</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Fill Factor (FF)</span><strong className="text-primary">{currentActiveString.ff}</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Series Res (Rs)</span><strong className="text-critical">{currentActiveString.rs}</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Shunt Res (Rsh)</span><strong className="text-primary">{currentActiveString.rsh}</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Power Deficit</span><strong className="text-critical">{currentActiveString.deviation_pct}</strong></div>
          </div>
        </div>

        {/* 48-String Mismatch Deviation Ranking & 1-Click Twin Locator (5 Cols) */}
        <div className="lg:col-span-5 border border-border-strong bg-white p-5 space-y-3 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-border-subtle pb-2 mb-3">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-critical" />
                <span>48-STRING COMBINER DEVIATION MATRIX</span>
              </strong>
              <span className="text-[10px] text-secondary font-bold">TOP MISMATCHES</span>
            </div>

            <div className="space-y-2">
              {stringRankings.map((str) => {
                const isSelected = selectedString === str.id;
                return (
                  <div
                    key={str.id}
                    onClick={() => setSelectedString(str.id)}
                    className={`p-3 border transition-all cursor-pointer flex justify-between items-center shadow-2xs ${
                      isSelected ? "border-primary bg-[#f6fef9]" : "border-border-subtle hover:border-primary bg-surface"
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
                      {isSelected ? "● ACTIVE" : "INSPECT →"}
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
