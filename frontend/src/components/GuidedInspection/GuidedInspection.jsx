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
  Maximize2,
  Download,
  FileSpreadsheet,
  FileText
} from "lucide-react";

export default function GuidedInspection({ farm, onNavigateToMap }) {
  const [selectedString, setSelectedString] = useState("INV-04-STR04");
  // Curve Mode: 'IV' | 'PV' | 'DUAL' | 'DERIV'
  const [curveMode, setCurveMode] = useState("IV");
  // Normalization Mode: true = STC (1000W/m², 25°C), false = OPC (Operating Measured)
  const [stcNormalized, setStcNormalized] = useState(false);
  const [isSweeping, setIsSweeping] = useState(false);
  const [hoverCoord, setHoverCoord] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

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
      setLiveGHI((prev) => Number((prev + (Math.random() * 0.8 - 0.4)).toFixed(1)));
      setLiveDNI((prev) => Number((prev + (Math.random() * 0.8 - 0.4)).toFixed(1)));
      setLiveModuleTemp((prev) => Number((prev + (Math.random() * 0.2 - 0.1)).toFixed(1)));
      setLiveWindSpeed((prev) => Number((prev + (Math.random() * 0.6 - 0.3)).toFixed(1)));

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
      vmp: 32.4,
      imp: 9.8,
      ff: "73.2%",
      rs: "0.48 Ω",
      rsh: "180 Ω",
      sdi: "22.5% (Severe Distortion)",
      anomaly_pattern: "Bypass Diode Step Notch (Sub-String 2 Inactive)",
      issue: "Bypass Diode Thermal Runaway", 
      status: "Critical (P1)", 
      is_anomalous: true,
      has_step_notch: true
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
      vmp: 28.6,
      imp: 8.4,
      ff: "68.4%",
      rs: "0.62 Ω",
      rsh: "120 Ω",
      sdi: "31.6% (Severe Series Slope)",
      anomaly_pattern: "High Series Resistance (Solder Lead Burnout)",
      issue: "Ribbon Lead Solder Fracture", 
      status: "Critical (P1)", 
      is_anomalous: true,
      has_step_notch: false
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
      vmp: 38.2,
      imp: 11.2,
      ff: "77.8%",
      rs: "0.32 Ω",
      rsh: "450 Ω",
      sdi: "8.6% (Shunt Roll-Off)",
      anomaly_pattern: "Shunt Leakage (Wafer Microcrack)",
      issue: "Wafer Busbar Microcrack Shunt", 
      status: "High (P2)", 
      is_anomalous: true,
      has_step_notch: false
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
      vmp: 39.5,
      imp: 10.8,
      ff: "79.2%",
      rs: "0.26 Ω",
      rsh: "820 Ω",
      sdi: "5.5% (Uniform Optical Drop)",
      anomaly_pattern: "Uniform Current Attenuation (Soiling)",
      issue: "Desert Sand Optical Soiling", 
      status: "Medium (P3)", 
      is_anomalous: true,
      has_step_notch: false
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
      vmp: 41.7,
      imp: 12.8,
      ff: "81.4%",
      rs: "0.18 Ω",
      rsh: "2.4 kΩ",
      sdi: "0.2% (Nominal IEC Conformant)",
      anomaly_pattern: "STC Conformant Single-Diode Ideal",
      issue: "Nominal Operating State", 
      status: "Optimal", 
      is_anomalous: false,
      has_step_notch: false
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
      vmp: 41.5,
      imp: 12.7,
      ff: "81.1%",
      rs: "0.19 Ω",
      rsh: "2.2 kΩ",
      sdi: "0.7% (Nominal IEC Conformant)",
      anomaly_pattern: "STC Conformant Single-Diode Ideal",
      issue: "Nominal Operating State", 
      status: "Optimal", 
      is_anomalous: false,
      has_step_notch: false
    },
  ];

  const currentActiveString = stringRankings.find(s => s.id === selectedString) || stringRankings[0];

  const handleTriggerIVSweep = () => {
    setIsSweeping(true);
    setTimeout(() => setIsSweeping(false), 1800);
  };

  // Generate 100 Sample Points for CSV Export
  const handleDownloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Voltage_V,Current_A,Power_W,DynamicResistance_Ohm,String_ID,Module_ID\n";
    for (let v = 0; v <= 50; v += 0.5) {
      const i = Math.max(0, (currentActiveString.isc - Math.pow(v / currentActiveString.voc, 5) * currentActiveString.isc)).toFixed(3);
      const p = (v * i).toFixed(2);
      const r = i > 0 ? (v / i).toFixed(2) : "INF";
      csvContent += `${v},${i},${p},${r},${currentActiveString.id},${currentActiveString.target_module}\n`;
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `IV_Sweep_RawData_${currentActiveString.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

      {/* 2. Top Header & 4 Curve Modes + Normalization Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              PRECISION I-V DIAGNOSTICS · 4 MULTI-TRACE MODES
            </span>
            <span className="font-mono-data text-xs text-secondary">
              IEC 60891 STC Normalization & Dynamic Single-Diode Modeler
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Advanced String I-V / P-V & Derivative Curve Analyzer
          </h1>
        </div>

        {/* Action Controls: 4 Curve Modes + STC Switcher + Trigger Sweep */}
        <div className="flex flex-wrap items-center gap-2 font-mono-data text-xs">
          
          {/* STC Normalization Toggle */}
          <button
            onClick={() => setStcNormalized(!stcNormalized)}
            className={`px-3 py-1.5 font-bold uppercase border transition-all cursor-pointer shadow-xs ${
              stcNormalized 
                ? "bg-[#027a48] text-white border-[#027a48]" 
                : "bg-surface text-secondary border-border-strong hover:text-primary"
            }`}
          >
            {stcNormalized ? "✓ STC (1000 W/m², 25°C)" : "MEASURED OPC (58.4°C)"}
          </button>

          {/* Trigger Sweep Electronic Load */}
          <button
            onClick={handleTriggerIVSweep}
            disabled={isSweeping}
            className={`px-3 py-1.5 bg-primary text-white font-bold uppercase border border-primary hover:bg-white hover:text-primary transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
              isSweeping ? "animate-pulse" : ""
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSweeping ? "animate-spin" : ""}`} />
            <span>{isSweeping ? "SWEEPING LOAD..." : "TRIGGER I-V SWEEP"}</span>
          </button>

          {/* 4 Curve Mode Switcher */}
          <div className="flex items-center gap-1 border-2 border-primary p-1 bg-white shadow-xs">
            <button
              onClick={() => setCurveMode("IV")}
              className={`px-2.5 py-1 font-bold text-[11px] transition-all cursor-pointer ${
                curveMode === "IV" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
              }`}
            >
              1. I-V CURVE
            </button>
            <button
              onClick={() => setCurveMode("PV")}
              className={`px-2.5 py-1 font-bold text-[11px] transition-all cursor-pointer ${
                curveMode === "PV" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
              }`}
            >
              2. P-V POWER
            </button>
            <button
              onClick={() => setCurveMode("DUAL")}
              className={`px-2.5 py-1 font-bold text-[11px] transition-all cursor-pointer ${
                curveMode === "DUAL" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
              }`}
            >
              3. DUAL OVERLAY
            </button>
            <button
              onClick={() => setCurveMode("DERIV")}
              className={`px-2.5 py-1 font-bold text-[11px] transition-all cursor-pointer ${
                curveMode === "DERIV" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
              }`}
            >
              4. dP/dV
            </button>
          </div>
        </div>
      </div>

      {/* 3. Feature Definition & Single-Diode Mathematical Principle */}
      <div className="bg-[#f0fdf4] border-2 border-[#027a48] p-4 space-y-2 font-mono-data">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="bg-[#027a48] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
            <h3 className="font-bold text-sm text-[#027a48] uppercase">What Is Precision Multi-Trace I-V Curve Analytics & STC Normalization?</h3>
          </div>
          <span className="text-xs font-bold text-[#027a48]">IEC 60891 / IEC 62446-3 Class 1 Standard</span>
        </div>
        <p className="text-xs text-primary font-sans leading-relaxed">
          <strong>What It Is:</strong> High-precision electronic sweep modeling that solves the single-diode transcendental equation: <strong>I(V) = I_ph - I_0 [ exp(q(V + I·Rs)/(n·k·T)) - 1 ] - (V + I·Rs)/Rsh</strong>. It normalizes measured operating conditions (OPC) to standard test conditions (STC: 1000 W/m², 25°C) using temperature coefficients (α = +0.048%/°C, β = -0.27%/°C), detecting bypass diode step notches, series resistance slopes, and shunt leakages before string power clipping occurs.
        </p>
      </div>

      {/* 4. Live 6-Inverter Central Fleet SCADA Strip */}
      <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs font-mono-data text-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
              CENTRAL INVERTER FLEET CONVERSION EFFICIENCY & DC BUS VOLTAGES (6x SUNGROW SG3125HV)
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

      {/* 5. Main Two-Column Layout: Advanced SVG Multi-Trace Plotter + 48-String Deviation Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
        
        {/* SVG Multi-Trace Plotter (7 Cols) */}
        <div className="lg:col-span-7 border-2 border-primary bg-white p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-3 mb-3 gap-2">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">
                  SELECTED STRING: {currentActiveString.id} (#{currentActiveString.target_module})
                </span>
                <strong className="text-sm text-primary font-mono-data">
                  {curveMode === "IV" 
                    ? `I-V Characteristic Curve ${stcNormalized ? "(STC Normalized @ 25°C)" : "(Measured OPC @ 58.4°C)"}`
                    : curveMode === "PV"
                    ? `P-V Power Curve (Pmax = ${currentActiveString.p_mp} W)`
                    : curveMode === "DUAL"
                    ? "Dual Synchronous I-V & P-V Overlay Plot"
                    : "dP/dV First-Order Power Derivative (MPPT Tracking Zero-Cross)"}
                </strong>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#027a48] inline-block" /> STC Baseline</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-critical inline-block" /> Measured String</span>
                {curveMode === "DUAL" && <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] inline-block" /> P-V Power</span>}
              </div>
            </div>

            {/* SVG Plot Viewport with Interactive Crosshair Prober */}
            <div 
              className="relative border border-border-strong bg-[#090d16] p-4 text-white rounded-none cursor-crosshair overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                const volt = ((x / 100) * 50).toFixed(1);
                const curr = Math.max(0, (currentActiveString.isc - Math.pow(x / 100, 5) * currentActiveString.isc)).toFixed(2);
                const power = (volt * curr).toFixed(0);
                const rdyn = curr > 0 ? (volt / curr).toFixed(2) : "INF";
                const dpdv = (13.8 - (volt * 0.5)).toFixed(1);
                setHoverCoord({ x: e.clientX - rect.left, y: e.clientY - rect.top, volt, curr, power, rdyn, dpdv });
              }}
              onMouseLeave={() => setHoverCoord(null)}
            >
              <svg viewBox="0 0 520 270" className="w-full h-64 overflow-visible">
                {/* Background Gridlines */}
                <line x1="45" y1="20" x2="495" y2="20" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="45" y1="75" x2="495" y2="75" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="45" y1="130" x2="495" y2="130" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="45" y1="185" x2="495" y2="185" stroke="#1e293b" strokeDasharray="3,3" />
                
                <line x1="135" y1="20" x2="135" y2="230" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="225" y1="20" x2="225" y2="230" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="315" y1="20" x2="315" y2="230" stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="405" y1="20" x2="405" y2="230" stroke="#1e293b" strokeDasharray="3,3" />

                {/* Left Y Axis (Current / Power) & Bottom X Axis (Voltage) */}
                <line x1="45" y1="20" x2="45" y2="230" stroke="#64748b" strokeWidth="2" />
                <line x1="45" y1="230" x2="495" y2="230" stroke="#64748b" strokeWidth="2" />

                {/* Axis Labels */}
                <text x="450" y="250" fill="#94a3b8" fontSize="10" fontFamily="monospace">Voltage V (V)</text>
                <text x="10" y="25" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  {curveMode === "IV" ? "Current I (A)" : curveMode === "PV" ? "Power P (W)" : curveMode === "DUAL" ? "I (A) / P (W)" : "dP/dV (W/V)"}
                </text>

                {/* 1. I-V CURVE MODE */}
                {curveMode === "IV" && (
                  <g>
                    {/* Nominal STC Curve (Green) */}
                    <path
                      d="M 45 40 L 360 45 Q 430 55 450 230"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="3"
                    />
                    <circle cx="390" cy="55" r="4" fill="#22c55e" />
                    <text x="395" y="48" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">STC MPPT: 540W</text>

                    {/* Active Measured Curve (Red) with Step Notch if Bypass Diode Failure */}
                    {currentActiveString.has_step_notch ? (
                      <path
                        d="M 45 80 L 220 85 L 240 140 L 320 145 Q 360 170 380 230"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                      />
                    ) : (
                      <path
                        d="M 45 90 L 280 95 Q 330 130 360 230"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                      />
                    )}

                    {/* Step Notch Callout Marker */}
                    {currentActiveString.has_step_notch && (
                      <g>
                        <rect x="215" y="95" width="85" height="24" fill="#7f1d1d" stroke="#ef4444" rx="2" />
                        <text x="220" y="110" fill="#fca5a5" fontSize="8" fontWeight="bold" fontFamily="monospace">⚡ BYPASS NOTCH</text>
                      </g>
                    )}

                    {/* Knee Point Marker */}
                    <circle cx="280" cy="100" r="4" fill="#ef4444" className="animate-ping" />
                    <circle cx="280" cy="100" r="4" fill="#ef4444" />
                    <text x="290" y="115" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      Mismatch: {currentActiveString.vmp}V, {currentActiveString.imp}A ({currentActiveString.deviation_pct})
                    </text>
                  </g>
                )}

                {/* 2. P-V POWER CURVE MODE */}
                {curveMode === "PV" && (
                  <g>
                    {/* Nominal STC Power Curve (Green) */}
                    <path
                      d="M 45 230 Q 300 25 450 230"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="3"
                    />
                    <circle cx="300" cy="40" r="4" fill="#22c55e" />
                    <text x="310" y="35" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">Pmax STC: 540.0 W</text>

                    {/* Active Measured Power Curve (Red) */}
                    {currentActiveString.has_step_notch ? (
                      <path
                        d="M 45 230 Q 180 120 230 140 Q 280 80 370 230"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                      />
                    ) : (
                      <path
                        d="M 45 230 Q 240 100 360 230"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                      />
                    )}
                    <circle cx="240" cy="110" r="4" fill="#ef4444" />
                    <text x="250" y="125" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      Pmax Active: {currentActiveString.p_mp} W ({currentActiveString.deviation_pct})
                    </text>
                  </g>
                )}

                {/* 3. DUAL OVERLAY (I-V & P-V SIMULTANEOUSLY) */}
                {curveMode === "DUAL" && (
                  <g>
                    {/* I-V Curve (Red) */}
                    <path
                      d="M 45 80 L 220 85 L 240 140 L 320 145 Q 360 170 380 230"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                    />
                    {/* P-V Power Curve (Cyan) */}
                    <path
                      d="M 45 230 Q 180 120 230 140 Q 280 80 370 230"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />
                    <circle cx="280" cy="80" r="4" fill="#38bdf8" />
                    <text x="290" y="75" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">MPPT Peak: {currentActiveString.p_mp}W</text>
                  </g>
                )}

                {/* 4. dP/dV DERIVATIVE CONDUCTANCE MODE */}
                {curveMode === "DERIV" && (
                  <g>
                    {/* Zero Crossing Line (dP/dV = 0) */}
                    <line x1="45" y1="125" x2="495" y2="125" stroke="#94a3b8" strokeDasharray="4,4" strokeWidth="1.5" />
                    <text x="50" y="120" fill="#94a3b8" fontSize="9" fontFamily="monospace">dP/dV = 0 (MPPT Inversion Boundary)</text>

                    {/* Derivative Trace */}
                    <path
                      d="M 45 40 Q 200 60 280 125 Q 340 190 440 220"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="3"
                    />
                    <circle cx="280" cy="125" r="5" fill="#a855f7" />
                    <text x="290" y="120" fill="#a855f7" fontSize="9" fontWeight="bold" fontFamily="monospace">Zero-Cross: V_mp = {currentActiveString.vmp}V</text>
                  </g>
                )}

                {/* Animated Electronic Sweep Scanner Beam */}
                {isSweeping && (
                  <line x1="120" y1="20" x2="120" y2="230" stroke="#38bdf8" strokeWidth="3" className="animate-ping" />
                )}
              </svg>

              {/* Hover Coordinate HUD Tooltip */}
              {hoverCoord && (
                <div 
                  className="absolute pointer-events-none bg-black/95 border border-[#22c55e] text-white px-3 py-1.5 text-[10px] font-mono-data rounded-xs shadow-xl space-y-0.5"
                  style={{ left: `${hoverCoord.x + 12}px`, top: `${hoverCoord.y - 35}px` }}
                >
                  <div className="flex gap-2"><span>Volt: <strong className="text-[#38bdf8]">{hoverCoord.volt} V</strong></span><span>Curr: <strong className="text-[#22c55e]">{hoverCoord.curr} A</strong></span></div>
                  <div className="flex gap-2"><span>Pwr: <strong className="text-warning">{hoverCoord.power} W</strong></span><span>R_dyn: <strong className="text-white">{hoverCoord.rdyn} Ω</strong></span></div>
                </div>
              )}
            </div>
          </div>

          {/* 8 Precision Electrical Inflection Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 bg-surface p-3 border border-border-subtle text-center text-xs mt-3">
            <div><span className="text-[9px] text-secondary uppercase block">Voc (Open-Circuit)</span><strong className="text-primary">{currentActiveString.voc} V</strong></div>
            <div><span className="text-[9px] text-secondary uppercase block">Isc (Short-Circuit)</span><strong className="text-primary">{currentActiveString.isc} A</strong></div>
            <div><span className="text-[9px] text-secondary uppercase block">Vmp (Max Power)</span><strong className="text-primary">{currentActiveString.vmp} V</strong></div>
            <div><span className="text-[9px] text-secondary uppercase block">Imp (Max Current)</span><strong className="text-primary">{currentActiveString.imp} A</strong></div>
            <div><span className="text-[9px] text-secondary uppercase block">Fill Factor (FF)</span><strong className="text-primary">{currentActiveString.ff}</strong></div>
            <div><span className="text-[9px] text-secondary uppercase block">Series Res (Rs)</span><strong className="text-critical">{currentActiveString.rs}</strong></div>
            <div><span className="text-[9px] text-secondary uppercase block">Shunt Res (Rsh)</span><strong className="text-primary">{currentActiveString.rsh}</strong></div>
            <div><span className="text-[9px] text-secondary uppercase block">SDI Distortion</span><strong className="text-critical">{currentActiveString.deviation_pct}</strong></div>
          </div>

          {/* Export Raw Data Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border-subtle">
            <span className="text-[10px] text-secondary">
              Pattern Identified: <strong className="text-primary">{currentActiveString.anomaly_pattern}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadCSV}
                className="px-3 py-1.5 bg-surface text-primary border border-border-strong hover:border-primary font-bold text-[10px] uppercase flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <FileSpreadsheet className="w-3 h-3 text-[#027a48]" />
                <span>DOWNLOAD CSV (100 SAMPLES)</span>
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="px-3 py-1.5 bg-primary text-white border border-primary hover:bg-white hover:text-primary font-bold text-[10px] uppercase flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3 h-3" />
                <span>EXPORT SOLMETRIC PVA-1500 DOSSIER</span>
              </button>
            </div>
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
              <span className="text-[10px] text-secondary font-bold">Z-SCORE RANKING</span>
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
                        V: {str.voltage_v}V (Dev: {str.deviation_pct}) · ΔT {str.delta_t} · FF {str.ff}
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

      {/* Solmetric PVA-1500 Certified Dossier Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-primary max-w-lg w-full p-6 space-y-4 shadow-xl font-mono-data text-xs animate-in fade-in">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary text-sm uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>SOLMETRIC PVA-1500 I-V SWEEP DOSSIER</span>
              </strong>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-secondary hover:text-primary font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 font-sans text-xs">
              <p className="text-secondary">
                Exporting certified electrical trace analysis for string <strong>{currentActiveString.id}</strong> on Inverter <strong>{currentActiveString.inverter}</strong>. Includes IEC 60891 temperature normalized curves, Fill Factor degradation metrics, and discrete 100-point voltage-current raw sweeps.
              </p>
              <div className="bg-surface p-3 border border-border-subtle font-mono-data text-[11px] space-y-1">
                <div>Audit Hash: <strong>SHA-256: 3c81...e042</strong></div>
                <div>Curve Format: <strong>Solmetric PVA / Seaward Solar Utility Compatible</strong></div>
                <div>Temperature Compensation: <strong>IEC 60891 Procedure 1 (α = +0.048%/°C)</strong></div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border-subtle">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border border-border-strong text-secondary hover:text-primary uppercase cursor-pointer"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  alert(`Solmetric PVA-1500 Dossier for ${currentActiveString.id} exported successfully!`);
                  setShowExportModal(false);
                }}
                className="px-4 py-2 bg-[#027a48] text-white font-bold uppercase border border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD CERTIFIED DOSSIER</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
