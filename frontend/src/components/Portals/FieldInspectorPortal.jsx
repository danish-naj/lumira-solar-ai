import React, { useState, useEffect } from "react";
import { 
  Camera, 
  Upload, 
  Check, 
  ArrowRight, 
  Brain, 
  Thermometer, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  Wrench, 
  Sparkles, 
  Plane, 
  Smartphone, 
  Car, 
  Compass, 
  Wind, 
  Sun, 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Layers, 
  MapPin,
  CheckSquare,
  Square,
  Radio,
  Sliders,
  Maximize2,
  Building2,
  Cpu,
  Target
} from "lucide-react";

export default function FieldInspectorPortal({ farm, onSubmitReportToClient, onNavigateTab }) {
  // Mission Mode: 'verification' (Targeted Post-Repair QA) | 'inspection' (Full Periodic Survey)
  const [missionMode, setMissionMode] = useState("verification");

  // Stage Navigation: 1=Dock & Target, 2=Flight Path, 3=In-Flight HUD, 4=AI QA/Diagnostics, 5=Report
  const [currentStage, setCurrentStage] = useState(1);

  // Stage 1: Dock & Target State
  const [dockHatchOpen, setDockHatchOpen] = useState(false);
  const [selectedRepairedIdx, setSelectedRepairedIdx] = useState(0);

  // Repaired Modules Queue for Targeted Verification
  const repairedModulesQueue = [
    {
      id: "WO-8492-R12",
      module_id: "R12-C37",
      inverter: "INV-04",
      row: "Row 12 Column 37",
      repaired_by: "Tech #04 (R. Sharma)",
      repair_action: "Replaced bypass diode assembly & re-torqued DC lugs to 1.8 Nm",
      pre_repair_deltaT: "+18.4°C (Critical Hotspot)",
      post_repair_deltaT: "+0.2°C (Normalized)",
      pre_temp: "59.8°C",
      post_temp: "41.6°C",
      opticalImg: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
      thermalImg: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "WO-8493-R04",
      module_id: "R04-C18",
      inverter: "INV-02",
      row: "Row 4 Column 18",
      repaired_by: "Tech #02 (K. Verma)",
      repair_action: "Re-soldered internal copper ribbon lead with thermal RTV sealant",
      pre_repair_deltaT: "+24.5°C (Burnout Hazard)",
      post_repair_deltaT: "+0.3°C (Normalized)",
      pre_temp: "65.9°C",
      post_temp: "41.7°C",
      opticalImg: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
      thermalImg: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Flight Path Waypoints
  const flightWaypoints = [
    { id: 1, x: 50, y: 50, label: "WP-01", row: "Row 1-2 (North Edge)" },
    { id: 2, x: 350, y: 50, label: "WP-02", row: "Row 1-2 (East Turn)" },
    { id: 3, x: 350, y: 80, label: "WP-03", row: "Row 3-4 (Inbound East)" },
    { id: 4, x: 50, y: 80, label: "WP-04", row: "Row 3-4 (West Turn)" },
    { id: 5, x: 50, y: 110, label: "WP-05", row: "Row 5-6 (West Edge)" },
    { id: 6, x: 350, y: 110, label: "WP-06", row: "Row 5-6 (East Turn)" },
    { id: 7, x: 350, y: 140, label: "WP-07", row: "Row 7-8 (Inbound East)" },
    { id: 8, x: 50, y: 140, label: "WP-08", row: "Row 7-8 (West Turn)" },
    { id: 9, x: 50, y: 170, label: "WP-09", row: "Row 9-10 (West Edge)" },
    { id: 10, x: 350, y: 170, label: "WP-10", row: "Row 9-10 (East Turn)" },
    { id: 11, x: 350, y: 200, label: "WP-11", row: "Row 11-12 (Inbound East)" },
    { id: 12, x: 50, y: 200, label: "WP-12", row: "Row 11-12 (South Edge)" },
  ];

  // Stage 3 Live In-Flight Progress
  const [isCollecting, setIsCollecting] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentWaypoint, setCurrentWaypoint] = useState(1);
  const [telemetry, setTelemetry] = useState({
    altitude: 35.0,
    speed: 5.0,
    frames: 0,
    thermalTemp: 41.4,
    batterySoC: 100
  });

  // Stage 4 Diagnostics & Defects List
  const [selectedDefectIdx, setSelectedDefectIdx] = useState(0);
  const detectedDefects = [
    {
      id: "DEF-01",
      module_id: "R12-C37",
      inverter: "INV-04",
      type: "Cell #8 Diode Shunt Breakdown",
      severity: "Critical",
      deltaT: "+18.4°C",
      confidence: "99.4%",
      loss_inr: "₹44,050 / yr ($528)",
      region: "Upper-Right Bypass Sub-string (Cell 8)",
      action: "Replace bypass diode assembly & re-torque DC lugs"
    },
    {
      id: "DEF-02",
      module_id: "R04-C18",
      inverter: "INV-02",
      type: "Ribbon Lead Thermal Burnout",
      severity: "Critical",
      deltaT: "+24.5°C",
      confidence: "98.8%",
      loss_inr: "₹57,400 / yr ($688)",
      region: "Internal Ribbon Solder Joint",
      action: "Re-solder copper ribbon lead with thermal sealant"
    }
  ];

  // Stage 5 Submission State
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // In-Flight Live Sweep Progress Timer
  useEffect(() => {
    let timer = null;
    if (isCollecting && scanProgress < 100) {
      timer = setInterval(() => {
        setScanProgress((prev) => {
          const step = missionMode === "verification" ? 10 : 5;
          const next = prev + step;
          const wpIdx = Math.min(12, Math.floor((next / 100) * 12) + 1);
          setCurrentWaypoint(wpIdx);

          if (next >= 100) {
            setIsCollecting(false);
            setTelemetry((t) => ({ ...t, frames: missionMode === "verification" ? 48 : 1200, batterySoC: 92 }));
            return 100;
          }

          setTelemetry((t) => ({
            ...t,
            frames: Math.floor((next / 100) * (missionMode === "verification" ? 48 : 1200)),
            batterySoC: Math.max(92, Math.floor(100 - (next / 100) * 8)),
            thermalTemp: (41.2 + Math.random() * 0.4).toFixed(1)
          }));
          return next;
        });
      }, 300);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCollecting, scanProgress, missionMode]);

  const handleLaunchDrone = () => {
    setDockHatchOpen(true);
    setCurrentStage(3);
    setIsCollecting(true);
    setScanProgress(0);
  };

  const handleFastForwardScan = () => {
    setIsCollecting(false);
    setScanProgress(100);
    setTelemetry((t) => ({ ...t, frames: missionMode === "verification" ? 48 : 1200, batterySoC: 92 }));
    setCurrentStage(4);
  };

  const handleForwardToClient = () => {
    setIsSubmittingReport(true);
    setTimeout(() => {
      setIsSubmittingReport(false);
      setReportSubmitted(true);
      if (onSubmitReportToClient) {
        onSubmitReportToClient({
          id: missionMode === "verification" ? "QA-VERIF-2026-08" : "REP-DRONE-2026-08",
          title: missionMode === "verification" ? "Official Post-Repair QA Thermal Normalization Certificate" : "Comprehensive Drone Radiometric IR & Optical Inspection Audit",
          date: "26 Aug 2026",
          source: "Drone Orthomosaic (DJI M300 RTK)",
          farm_id: farm?.id || "bhadla",
          farm_name: farm?.name || "Bhadla Mega Solar Park - Sector 4",
          auditor: "Capt. A. Nair (Level-III Thermographer #8492)",
          modules_scanned: missionMode === "verification" ? 2 : 1200,
          defects_count: missionMode === "verification" ? 0 : 4,
          health_score: 98,
          status: missionMode === "verification" ? "Verified & Closed" : "Pending Client Approval",
          repaired_modules: repairedModulesQueue
        });
      }
    }, 800);
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. DEEP PLANT INFRASTRUCTURE & SCADA OVERVIEW HEADER */}
      <div className="border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-3 gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  FIELD INSPECTOR MISSION WORKSPACE
                </span>
                <span className="text-xs font-bold text-primary font-mono-data">
                  {farm?.name || "Bhadla Mega Solar Park - Sector 4"} (50.0 MWp DC)
                </span>
              </div>
              <p className="text-[11px] text-secondary font-sans mt-0.5">
                Phalodi District, Rajasthan · 240 Acres · SECI 25-Year PPA @ ₹2.44/kWh ($0.029) · 220kV RVPNL Substation Interconnect
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono-data text-xs shrink-0">
            <div className="bg-surface px-3 py-1.5 border border-border-strong text-right">
              <span className="text-[9px] text-secondary block uppercase font-bold">PLANT HEALTH</span>
              <strong className="text-[#027a48] text-sm block">97 / 100</strong>
            </div>
            <div className="bg-surface px-3 py-1.5 border border-border-strong text-right">
              <span className="text-[9px] text-secondary block uppercase font-bold">SOLAR GHI</span>
              <strong className="text-primary text-sm block">942 W/m²</strong>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface p-3.5 border border-border-subtle font-mono-data text-xs">
          <div><span className="text-[10px] text-secondary font-sans uppercase block">Array Size:</span><strong className="text-primary">92,592 Panels (540 Wp)</strong></div>
          <div><span className="text-[10px] text-secondary font-sans uppercase block">Trackers:</span><strong className="text-primary">NEXTracker Horizon (±60°)</strong></div>
          <div><span className="text-[10px] text-secondary font-sans uppercase block">Inverters:</span><strong className="text-primary">6x Sungrow SG3125HV</strong></div>
          <div><span className="text-[10px] text-secondary font-sans uppercase block">Combiners:</span><strong className="text-primary">48 Smart DC Combiners</strong></div>
        </div>
      </div>

      {/* 2. AUTOMATIC MISSION INTENT DETECTION & STAGE STEPPER */}
      <div className="bg-surface border-2 border-primary p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-mono-data text-xs shadow-xs">
        <div>
          <span className="text-[10px] text-secondary uppercase font-bold block">INTELLIGENT MISSION MODE:</span>
          <strong className="text-sm text-primary block mt-0.5">
            {missionMode === "verification" 
              ? "🎯 TARGETED POST-REPAIR QA VERIFICATION (2 REPAIRED MODULES PENDING)" 
              : "🔍 FULL PLANT PERIODIC INSPECTION (1,200 MODULE SWEEP)"}
          </strong>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switchers */}
          <button
            onClick={() => {
              setMissionMode("verification");
              setCurrentStage(1);
              setScanProgress(0);
            }}
            className={`px-3 py-1.5 font-bold uppercase transition-all cursor-pointer border flex items-center gap-1.5 text-xs ${
              missionMode === "verification" ? "bg-[#027a48] text-white border-[#027a48] shadow-xs" : "bg-white text-secondary border-border-strong hover:border-primary"
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Targeted Post-Repair QA</span>
          </button>

          <button
            onClick={() => {
              setMissionMode("inspection");
              setCurrentStage(1);
              setScanProgress(0);
            }}
            className={`px-3 py-1.5 font-bold uppercase transition-all cursor-pointer border flex items-center gap-1.5 text-xs ${
              missionMode === "inspection" ? "bg-primary text-white border-primary shadow-xs" : "bg-white text-secondary border-border-strong hover:border-primary"
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Full Periodic Survey</span>
          </button>

          {/* Stepper Pills */}
          <div className="flex items-center gap-1 bg-white p-1 border border-border-strong">
            {[
              { stage: 1, label: "1. Dock & Target" },
              { stage: 2, label: "2. Flight Path" },
              { stage: 3, label: "3. Live HUD" },
              { stage: 4, label: "4. AI QA Scan" },
              { stage: 5, label: "5. Client Report" },
            ].map((s) => (
              <button
                key={s.stage}
                onClick={() => setCurrentStage(s.stage)}
                className={`px-2 py-0.5 font-bold uppercase text-[10px] transition-all cursor-pointer ${
                  currentStage === s.stage ? "bg-primary text-white" : "text-secondary hover:bg-surface"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. STAGES VIEWPORT */}

      {/* STAGE 1: TARGET / MODALITY SELECTION */}
      {currentStage === 1 && (
        <div className="space-y-4 font-mono-data text-xs">
          {missionMode === "verification" ? (
            <div className="border-2 border-primary bg-white p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-start border-b border-border-subtle pb-3">
                <div>
                  <span className="text-[10px] text-secondary font-bold uppercase block">POST-REPAIR QA QUEUE</span>
                  <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                    Targeted Modules Repaired by Service Team Awaiting QA Sign-Off
                  </h2>
                  <p className="text-secondary text-xs font-sans mt-0.5">
                    The drone will fly a precision micro-route straight to repaired coordinates. No need to survey the entire 240 acres!
                  </p>
                </div>
                <span className="bg-[#fffaeb] text-warning border border-warning px-2.5 py-1 text-xs font-bold uppercase">
                  2 REPAIRED ITEMS PENDING
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {repairedModulesQueue.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedRepairedIdx(idx)}
                    className={`p-4 border transition-all cursor-pointer bg-surface hover:bg-white ${
                      selectedRepairedIdx === idx ? "border-primary bg-[#f6fef9] ring-1 ring-primary shadow-xs" : "border-border-subtle hover:border-primary"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <strong className="text-primary text-sm font-bold">#{item.module_id} ({item.inverter})</strong>
                      <span className="text-secondary text-[10px]">{item.row}</span>
                    </div>
                    <span className="text-xs text-primary font-sans font-medium block mb-2">{item.repair_action}</span>
                    <div className="bg-white p-2.5 border border-border-subtle space-y-1 text-[11px] font-sans">
                      <div className="flex justify-between"><span className="text-secondary">Repaired By:</span> <strong className="font-mono-data text-primary">{item.repaired_by}</strong></div>
                      <div className="flex justify-between"><span className="text-secondary">Pre-Repair Anomaly:</span> <strong className="font-mono-data text-critical">{item.pre_repair_deltaT}</strong></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
                <span className="text-secondary text-xs font-sans">Selected Target: <strong>{repairedModulesQueue[selectedRepairedIdx]?.row}</strong>. Ready for direct micro-flight.</span>
                <button
                  onClick={() => setCurrentStage(2)}
                  className="bg-[#027a48] text-white font-bold py-3 px-6 uppercase tracking-wider text-xs border border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>PROCEED TO TARGETED SPOT ROUTE →</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-primary bg-white p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-border-subtle pb-3">
                <div>
                  <strong className="text-sm font-bold text-primary block">FULL PLANT PERIODIC BASELINE INSPECTION</strong>
                  <span className="text-secondary text-[11px] font-sans">Full 20-Row (1,200 Modules) survey mapping new thermal defects and microcracks</span>
                </div>
                <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold uppercase">
                  DOCK ALPHA READY
                </span>
              </div>
              <button
                onClick={() => setCurrentStage(2)}
                className="bg-primary text-white font-bold py-3 px-6 uppercase tracking-wider text-xs border border-primary hover:bg-white hover:text-primary transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>PROCEED TO 12-WAYPOINT FULL SWEEP PLANNER →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* STAGE 2: FLIGHT PATH PLANNER */}
      {currentStage === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
          {/* Waypoint Canvas */}
          <div className="lg:col-span-7 border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-primary" />
                <span>{missionMode === "verification" ? "DIRECT TARGETED MICRO-ROUTE TO REPAIRED PANELS" : "12-WAYPOINT FULL SWEEP TRAJECTORY"}</span>
              </strong>
              <span className="text-[10px] text-secondary">
                {missionMode === "verification" ? "Spot Flight Time: 2.5 mins" : "Full Sweep: 18.4 mins"}
              </span>
            </div>

            <div className="relative border border-border-strong bg-[#0f172a] h-72 rounded-none overflow-hidden p-2 flex items-center justify-center">
              <svg viewBox="0 0 400 240" className="w-full h-full">
                {[50, 80, 110, 140, 170, 200].map((y, idx) => (
                  <g key={idx}>
                    <rect x="40" y={y - 8} width="320" height="16" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                    <text x="365" y={y + 3} fill="#64748b" fontSize="7" fontFamily="monospace">R{idx * 2 + 1}-{idx * 2 + 2}</text>
                  </g>
                ))}

                {missionMode === "verification" ? (
                  <>
                    <line x1="50" y1="220" x2="260" y2="200" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="4,4" />
                    <circle cx="260" cy="200" r="12" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" className="animate-ping" />
                    <circle cx="260" cy="200" r="6" fill="#22c55e" />
                    <text x="275" y="203" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">Target: #R12-C37</text>
                  </>
                ) : (
                  <>
                    <path
                      d="M 50 50 L 350 50 L 350 80 L 50 80 L 50 110 L 350 110 L 350 140 L 50 140 L 50 170 L 350 170 L 350 200 L 50 200"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                    {flightWaypoints.map((wp) => (
                      <circle key={wp.id} cx={wp.x} cy={wp.y} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                    ))}
                  </>
                )}
              </svg>
            </div>

            <div className="bg-surface p-3 border border-border-subtle text-[11px] flex justify-between">
              <span>Origin: <strong className="text-primary">Dock Alpha Central Pad</strong></span>
              <span>Destination: <strong className="text-primary">{missionMode === "verification" ? "#R12-C37 & #R04-C18 Spot Scan" : "Sector 4 Full Array (1,200 Modules)"}</strong></span>
            </div>
          </div>

          {/* Launch Controls */}
          <div className="lg:col-span-5 border-2 border-primary bg-white p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-2">
                MISSION FLIGHT SPECIFICATIONS:
              </strong>
              <div className="bg-surface p-4 border border-border-subtle space-y-2 font-sans text-xs">
                <div className="flex justify-between"><span>Mission Type:</span> <strong className="font-mono-data text-primary">{missionMode === "verification" ? "Targeted Post-Repair QA" : "Full Periodic Survey"}</strong></div>
                <div className="flex justify-between"><span>Flight Altitude:</span> <strong className="font-mono-data text-primary">35 meters AGL</strong></div>
                <div className="flex justify-between"><span>Flight Duration:</span> <strong className="font-mono-data text-[#027a48]">{missionMode === "verification" ? "2.5 minutes (Rapid)" : "18.4 minutes"}</strong></div>
                <div className="flex justify-between"><span>Battery Draw:</span> <strong className="font-mono-data text-[#027a48]">{missionMode === "verification" ? "8% (92% Reserve)" : "36% (64% Reserve)"}</strong></div>
              </div>
            </div>

            <button
              onClick={handleLaunchDrone}
              className="w-full bg-[#027a48] text-white font-bold py-4 px-4 border-2 border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs"
            >
              <span>{missionMode === "verification" ? "DISPATCH DRONE FOR TARGETED SPOT QA →" : "DISPATCH & LAUNCH FULL SWEEP →"}</span>
              <Plane className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: LIVE IN-FLIGHT HUD */}
      {currentStage === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
          <div className="lg:col-span-6 border-2 border-primary bg-white p-5 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-critical inline-block animate-ping" />
                <span>{missionMode === "verification" ? "HOVERING OVER REPAIRED MODULE #R12-C37" : `SWEEP IN PROGRESS: WP-${currentWaypoint}`}</span>
              </strong>
              <span className="bg-critical text-white px-2 py-0.5 text-[9px] font-bold uppercase">● AIRBORNE</span>
            </div>

            {/* Progress Telemetry */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Data Acquisition Progress:</span>
                <strong className="text-primary font-bold">{scanProgress}% Completed</strong>
              </div>
              <div className="w-full bg-surface border border-border-strong h-3 overflow-hidden">
                <div style={{ width: `${scanProgress}%` }} className="bg-[#027a48] h-full transition-all duration-300" />
              </div>
              <div className="flex justify-between text-[11px] text-secondary">
                <span>Frames Captured: <strong className="text-primary font-mono-data">{telemetry.frames}</strong></span>
                <span>Battery Level: <strong className="text-[#027a48] font-mono-data">{telemetry.batterySoC}%</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-2">
              <button
                onClick={handleFastForwardScan}
                className="w-full bg-primary text-white font-bold py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-between border border-primary hover:bg-white hover:text-primary transition-all cursor-pointer shadow-xs"
              >
                <span>{scanProgress === 100 ? "SCAN COMPLETE · OPEN QA SCAN REPORT →" : "FAST-FORWARD & COMPLETE SCAN →"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs">
                ZENMUSE H20T RADIOMETRIC THERMAL STREAM
              </strong>
              <span className="text-[#22c55e] font-bold">● LIVE FEED</span>
            </div>
            <div className="relative border border-border-strong bg-black h-56 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
                alt="Camera Feed"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute top-2 left-2 bg-black/80 px-2.5 py-1 text-[10px] text-[#22c55e] border border-border-strong">
                SPOT TEMP: 41.6°C · ΔT: +0.2°C (NORMALIZED)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 4: AI QA THERMAL NORMALIZATION / DIAGNOSTICS */}
      {currentStage === 4 && (
        <div className="space-y-6 font-mono-data text-xs">
          {missionMode === "verification" ? (
            <div className="border-2 border-primary bg-white p-6 space-y-5 shadow-xs">
              <div className="flex justify-between items-start border-b border-border-subtle pb-3">
                <div>
                  <span className="text-[10px] text-secondary font-bold uppercase block">AI QA POST-REPAIR AUDIT</span>
                  <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                    Targeted Thermal Normalization Verification (#R12-C37 & #R04-C18)
                  </h2>
                  <span className="text-secondary text-xs font-sans">
                    Comparing pre-repair infrared thermogram against post-repair live radiometry.
                  </span>
                </div>
                <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-3 py-1 text-xs font-bold uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>✓ REPAIR VERIFIED & NORMALIZED</span>
                </span>
              </div>

              {/* Side-by-Side Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before */}
                <div className="bg-[#fef3f2] p-4 border border-critical space-y-2 font-sans">
                  <div className="flex justify-between items-center text-xs font-bold text-critical font-mono-data">
                    <span>BEFORE REPAIR (INITIAL INSPECTION)</span>
                    <span>ΔT: +18.4°C</span>
                  </div>
                  <div className="text-xs text-critical leading-relaxed">
                    Module Temperature: <strong>59.8°C</strong>. Severe reverse-bias bypass diode thermal runaway. Critical fire risk and -34% string power drop.
                  </div>
                </div>

                {/* After */}
                <div className="bg-[#f6fef9] p-4 border border-[#027a48] space-y-2 font-sans">
                  <div className="flex justify-between items-center text-xs font-bold text-[#027a48] font-mono-data">
                    <span>AFTER REPAIR (LIVE QA SPOT SCAN)</span>
                    <span>ΔT: +0.2°C (OPTIMAL)</span>
                  </div>
                  <div className="text-xs text-[#027a48] leading-relaxed">
                    Module Temperature: <strong>41.6°C</strong>. Diode replaced and torque verified (1.8 Nm). Thermal gradient normalized. 100% power restored.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStage(5)}
                className="w-full bg-[#027a48] text-white font-bold py-4 px-4 border border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs"
              >
                <span>PROCEED TO OFFICIAL QA CERTIFICATE & CLIENT SIGN-OFF →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
              <strong className="text-primary text-xs uppercase block border-b border-border-subtle pb-2">
                AI VISION DETECTIONS (4 ANOMALIES DETECTED)
              </strong>
              <div className="space-y-2">
                {detectedDefects.map((def) => (
                  <div key={def.id} className="p-3 bg-surface border border-border-subtle flex justify-between items-center">
                    <div>
                      <strong className="text-primary text-xs block">#{def.module_id} · {def.type}</strong>
                      <span className="text-secondary text-[11px] font-sans">{def.action}</span>
                    </div>
                    <span className="text-critical font-bold">{def.deltaT}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentStage(5)}
                className="w-full bg-primary text-white font-bold py-3.5 px-4 border border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer"
              >
                <span>COMPILE & FORWARD AUDIT REPORT →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* STAGE 5: CERTIFIED REPORT & CLIENT FORWARDING */}
      {currentStage === 5 && (
        <div className="border-2 border-primary bg-white p-8 space-y-6 shadow-xs font-mono-data text-xs">
          <div className="flex justify-between items-start border-b-2 border-primary pb-4">
            <div>
              <span className="text-[10px] text-secondary uppercase font-bold block">
                {missionMode === "verification" ? "OFFICIAL IEC 62446-3 POST-REPAIR QA CERTIFICATE" : "OFFICIAL IEC 62446-3 AUDIT REPORT"}
              </span>
              <h2 className="text-xl font-bold text-primary font-headline-lg mt-0.5">
                {missionMode === "verification" ? "Post-Repair Thermal Normalization & Defect Closure Dossier" : "Autonomous Aerial Radiometric & Optical Inspection Dossier"}
              </h2>
              <span className="text-secondary text-xs font-sans">Asset: <strong>{farm?.name || "Bhadla Mega Solar Park - Sector 4"}</strong></span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-secondary uppercase block font-bold">REPORT ID:</span>
              <strong className="text-primary text-sm font-bold">{missionMode === "verification" ? "QA-VERIF-2026-08" : "REP-DRONE-2026-08"}</strong>
              <span className="text-[#027a48] text-[10px] font-bold block">✓ VERIFIED LEVEL-III</span>
            </div>
          </div>

          {/* Lead Auditor Signature */}
          <div className="p-4 border border-border-subtle bg-surface flex justify-between items-center text-xs font-sans">
            <div>
              <span className="text-secondary text-[10px] uppercase block font-bold font-mono-data">CERTIFIED LEAD THERMOGRAPHER:</span>
              <strong className="text-primary text-sm font-mono-data">Capt. A. Nair (Badge #8492)</strong>
              <span className="text-secondary block text-[11px]">Level-III Certified Aerial Thermographer · Digital Signature Applied</span>
            </div>
            <span className="text-[#027a48] font-bold font-mono-data text-xs">✓ DIGITALLY SIGNED</span>
          </div>

          {!reportSubmitted ? (
            <button
              onClick={handleForwardToClient}
              disabled={isSubmittingReport}
              className="w-full bg-[#027a48] text-white font-bold py-4 px-6 border-2 border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs"
            >
              <span>{isSubmittingReport ? "TRANSMITTING TO CLIENT PORTAL..." : "TRANSMIT VERIFIED QA REPORT TO CLIENT PORTAL →"}</span>
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <div className="bg-[#ecfdf3] border-2 border-[#027a48] p-5 space-y-3 text-center">
              <div className="flex items-center justify-center gap-2 text-[#027a48] font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>✓ VERIFIED QA REPORT SUCCESSFULLY TRANSMITTED TO CLIENT PORTAL</span>
              </div>
              <p className="text-secondary text-xs font-sans">
                The Asset Owner and O&M manager have been updated. The repaired work orders are officially verified and closed.
              </p>
              <button
                onClick={() => onNavigateTab("client-portal")}
                className="bg-[#027a48] text-white font-bold py-2.5 px-6 uppercase text-xs tracking-wider hover:bg-white hover:text-[#027a48] border border-[#027a48] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>SWITCH TO CLIENT APPROVAL PORTAL →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
