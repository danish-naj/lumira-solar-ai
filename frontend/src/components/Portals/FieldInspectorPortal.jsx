import React, { useState, useEffect, useRef } from "react";
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
  Square
} from "lucide-react";

export default function FieldInspectorPortal({ farm, onSubmitReportToClient, onNavigateTab }) {
  // Step navigation: 1 = Plant Details, 2 = Data Collection, 3 = AI Diagnostics, 4 = Report & Client Submission
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Site parameters & MULTI-MODALITY Selection
  const [selectedMethods, setSelectedMethods] = useState(["Drone Orthomosaic", "Smartphone RGB"]);
  const [checklist, setChecklist] = useState({
    trackerLocked: true,
    sensorCalibrated: true,
    safetyGear: true,
    irradianceStable: true
  });

  // Step 2: Real-time Scanning Progress
  const [isCollecting, setIsCollecting] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedCells, setScannedCells] = useState(0);
  const [telemetry, setTelemetry] = useState({
    altitude: 35.0,
    speed: 4.2,
    frames: 0,
    thermalTemp: 41.2
  });

  // Step 3: Selected Defect in Diagnostics View
  const [selectedDefectIdx, setSelectedDefectIdx] = useState(0);

  // Step 4: Report Submission
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Multi-method toggle handler
  const toggleMethod = (methodId) => {
    setSelectedMethods((prev) => {
      if (prev.includes(methodId)) {
        if (prev.length === 1) return prev; // Keep at least 1 method active
        return prev.filter((m) => m !== methodId);
      } else {
        return [...prev, methodId];
      }
    });
  };

  // Simulation timer for Step 2 Real-Time Data Collection
  useEffect(() => {
    let timer = null;
    if (isCollecting && scanProgress < 100) {
      timer = setInterval(() => {
        setScanProgress((prev) => {
          const next = prev + 5;
          if (next >= 100) {
            setIsCollecting(false);
            setScannedCells(1200);
            return 100;
          }
          setScannedCells(Math.floor((next / 100) * 1200));
          setTelemetry((t) => ({
            ...t,
            frames: Math.floor((next / 100) * 1200),
            speed: (4.0 + Math.random() * 0.4).toFixed(1),
            thermalTemp: (40.5 + Math.random() * 2.0).toFixed(1)
          }));
          return next;
        });
      }, 250);
    }
    return () => clearInterval(timer);
  }, [isCollecting, scanProgress]);

  const methods = [
    { id: "Drone Orthomosaic", label: "Drone Survey (IR+RGB)", desc: "Radiometric 0.5cm/px GSD Ortho", icon: Plane, tag: "AERIAL ORTHO" },
    { id: "Smartphone RGB", label: "Smartphone Field Camera", desc: "Live Mobile & Ground Optical", icon: Smartphone, tag: "FIELD MOBILE" },
    { id: "Handheld Thermal", label: "Handheld Thermal (FLIR)", desc: "Calibrated 640x480 Thermography", icon: Thermometer, tag: "THERMOGRAPHY" },
    { id: "Vehicle Camera", label: "Ground Rover Camera", desc: "Autonomous Rover Multi-Angle", icon: Car, tag: "GROUND ROVER" },
  ];

  // Defects discovered across the plant
  const discoveredDefects = [
    {
      id: "DEF-01",
      target: "R12-C37",
      inverter: "INV-04",
      defectType: "Bypass Diode Thermal Runaway",
      severity: "Critical (P1)",
      deltaT: 18.4,
      lossKwh: 1.42,
      annualRevenueRisk: "₹44,050",
      estimatedRepairCost: "₹4,500",
      repairAction: "Replace sub-string Schottky bypass diode (15SQ045) in junction box. Verify torque to 1.8 Nm.",
      safetyCaution: "HIGH ARC FLASH HAZARD (>600V DC). Lockout/Tagout Inverter INV-04 DC Combiner before contact.",
      image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
      confidence: 99.2,
      box: { x: 35, y: 15, w: 40, h: 50 }
    },
    {
      id: "DEF-02",
      target: "R04-C18",
      inverter: "INV-02",
      defectType: "Thermal Hotspot & Ribbon Burnout",
      severity: "Critical (P1)",
      deltaT: 24.5,
      lossKwh: 1.58,
      annualRevenueRisk: "₹48,900",
      estimatedRepairCost: "₹5,200",
      repairAction: "Isolate string, solder internal ribbon lead & replace bypass sub-string module.",
      safetyCaution: "Fire hazard risk. Isolate string combiner immediately with 1000V insulated gloves.",
      image: "https://images.unsplash.com/photo-1508873696983-2df570464753?auto=format&fit=crop&w=800&q=80",
      confidence: 98.7,
      box: { x: 40, y: 20, w: 35, h: 45 }
    },
    {
      id: "DEF-03",
      target: "R07-C45",
      inverter: "INV-05",
      defectType: "Wafer Busbar Microcrack",
      severity: "High (P2)",
      deltaT: 4.2,
      lossKwh: 0.88,
      annualRevenueRisk: "₹27,300",
      estimatedRepairCost: "₹2,800",
      repairAction: "Conduct micro-soldering bridge on fractured silver fingers and apply UV sealant.",
      safetyCaution: "Fragile frontsheet glass. Use vacuum lifters; do not apply localized mechanical pressure.",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      confidence: 97.8,
      box: { x: 30, y: 25, w: 45, h: 40 }
    },
    {
      id: "DEF-04",
      target: "R15-C22",
      inverter: "INV-01",
      defectType: "Heavy Desert Sand Encrustation",
      severity: "Medium (P3)",
      deltaT: 1.2,
      lossKwh: 0.65,
      annualRevenueRisk: "₹35,680",
      estimatedRepairCost: "₹1,200",
      repairAction: "Deploy autonomous robotic dry-brush cleaning unit with deionized water rinse.",
      safetyCaution: "Ensure tracker array is locked at 0° horizontal tilt during cleaning pass.",
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
      confidence: 98.4,
      box: { x: 20, y: 35, w: 60, h: 45 }
    }
  ];

  const currentDefect = discoveredDefects[selectedDefectIdx] || discoveredDefects[0];

  const handleStartDataCollection = () => {
    setScanProgress(0);
    setScannedCells(0);
    setIsCollecting(true);
  };

  const handleSubmitReportToClientPortal = () => {
    setIsSubmittingReport(true);
    setTimeout(() => {
      setIsSubmittingReport(false);
      setReportSubmitted(true);

      const reportPayload = {
        id: "REP-" + Date.now().toString().slice(-6),
        farm_id: farm?.id || "farm-1",
        plant_name: farm?.name || "Bhadla Mega Solar Park - Sector 4",
        inspector_name: "Capt. A. Nair (Level-III Thermographer #8492)",
        inspection_method: selectedMethods.join(" + "),
        total_modules_scanned: 1200,
        defects_found_count: discoveredDefects.length,
        total_annual_revenue_risk: "₹1,55,930",
        total_estimated_repair_budget: "₹13,700",
        defects: discoveredDefects,
        submitted_at: new Date().toLocaleString(),
        status: "Pending Client Approval",
        module_id: "R12-C37",
        defect_type: "Bypass Diode Thermal Runaway",
        severity: "Critical",
        delta_t: 18.4,
        daily_loss_kwh: 1.42,
        annual_revenue_risk: "₹44,050",
        estimated_repair_cost: "₹4,500",
        repair_action: "Replace sub-string Schottky bypass diode (15SQ045) & reseal junction box.",
        safety_caution: "HIGH ARC FLASH HAZARD (>600V DC). Lockout/Tagout Inverter INV-04 DC Combiner before contact.",
        sla_hours: 24,
        recommended_tech: "Technician #04 (R. Sharma - High Voltage Specialist)"
      };

      if (onSubmitReportToClient) {
        onSubmitReportToClient(reportPayload);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-64px)] select-none bg-surface-container-lowest font-sans">
      {/* ========================================================================= */}
      {/* INSPECTOR MISSION WORKFLOW SIDEBAR                                        */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-72 bg-surface border-r border-border-subtle p-5 flex flex-col justify-between shrink-0 space-y-6">
        <div>
          {/* Header */}
          <div className="border-b border-border-subtle pb-3 mb-4">
            <div className="flex items-center gap-1.5 text-primary font-bold text-xs uppercase font-mono-data mb-1">
              <Plane className="w-3.5 h-3.5" />
              <span>FIELD MISSION CONTROL</span>
            </div>
            <h2 className="text-sm font-bold text-primary font-mono-data">
              {farm?.name || "Bhadla Mega Park"}
            </h2>
            <span className="text-[10px] text-secondary font-mono-data block mt-0.5">
              Pilot: Capt. A. Nair (#8492)
            </span>
          </div>

          {/* Step-by-Step Mission Flow Tabs */}
          <div className="space-y-2 font-mono-data text-xs">
            <button
              onClick={() => setCurrentStep(1)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                currentStep === 1 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${currentStep === 1 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                1
              </span>
              <div>
                <span className="block uppercase text-[11px]">PLANT BRIEF</span>
                <span className={`text-[9px] font-sans ${currentStep === 1 ? "text-white/80" : "text-secondary"}`}>
                  {selectedMethods.length} Modalities Selected
                </span>
              </div>
            </button>

            <button
              onClick={() => setCurrentStep(2)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                currentStep === 2 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${currentStep === 2 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                2
              </span>
              <div>
                <span className="block uppercase text-[11px]">DATA COLLECTION</span>
                <span className={`text-[9px] font-sans ${currentStep === 2 ? "text-white/80" : "text-secondary"}`}>
                  {scanProgress === 100 ? "✓ 100% Completed" : scanProgress > 0 ? `${scanProgress}% Scanning...` : "Multi-Stream Progress"}
                </span>
              </div>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                currentStep === 3 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${currentStep === 3 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                3
              </span>
              <div>
                <span className="block uppercase text-[11px]">AI DIAGNOSTICS</span>
                <span className={`text-[9px] font-sans ${currentStep === 3 ? "text-white/80" : "text-secondary"}`}>Sensor Fusion (4 Defects)</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                currentStep === 4 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${currentStep === 4 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                4
              </span>
              <div>
                <span className="block uppercase text-[11px]">SUBMIT REPORT</span>
                <span className={`text-[9px] font-sans ${currentStep === 4 ? "text-white/80" : "text-secondary"}`}>
                  {reportSubmitted ? "✓ Submitted to Client" : "Client Approval"}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar Footer: Quick Switcher to Client Portal */}
        <div className="border-t border-border-subtle pt-3">
          <button
            onClick={() => onNavigateTab("client-portal")}
            className="w-full bg-white border border-border-strong hover:bg-surface text-primary font-mono-data text-xs font-bold py-2.5 px-3 uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
          >
            <span>SWITCH TO CLIENT PORTAL →</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN MISSION WORKSPACE                                                    */}
      {/* ========================================================================= */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
        {/* ========================================================================= */}
        {/* STEP 1: PLANT DETAILS & MULTI-MODALITY SELECTION                          */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-5xl">
            <div className="border-b border-border-subtle pb-4">
              <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                STEP 1 OF 4: MISSION INITIALIZATION & MULTI-MODALITY SETUP
              </span>
              <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                Plant Mission Brief & Multi-Sensor Selection
              </h1>
              <p className="text-secondary text-xs mt-1">
                Select one or more inspection hardware modalities to combine aerial thermography, ground optical checks, and rover multi-angle scans.
              </p>
            </div>

            {/* Site Metadata & SCADA Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-data text-xs">
              <div className="border border-border-strong p-4 bg-surface">
                <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Asset Name & Capacity</span>
                <strong className="text-sm text-primary block mt-1">{farm?.name || "Bhadla Mega Solar Park"}</strong>
                <span className="text-secondary text-[11px]">50.0 MWp · 6 Central Inverters</span>
              </div>

              <div className="border border-border-strong p-4 bg-surface">
                <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Live Irradiance (GHI)</span>
                <strong className="text-sm text-primary flex items-center gap-1.5 mt-1">
                  <Sun className="w-4 h-4 text-warning" />
                  942 W/m² (Optimal)
                </strong>
                <span className="text-secondary text-[11px]">Amb Temp: 41.8°C · Wind: 16.4 km/h NW</span>
              </div>

              <div className="border border-border-strong p-4 bg-surface">
                <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Array Matrix</span>
                <strong className="text-sm text-primary block mt-1">1,200 Active Modules (20x60)</strong>
                <span className="text-[#027a48] text-[11px] font-bold">IEC 62446-3 Tier-1 Calibrated</span>
              </div>
            </div>

            {/* MULTI-MODALITY SELECTOR (SELECT MORE THAN ONE) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-mono-data text-xs font-bold uppercase text-primary tracking-wider">
                  SELECT INSPECTION MODALITIES (MULTI-SENSOR COMBINATION):
                </h3>
                <span className="text-[10px] font-mono-data font-bold text-primary bg-surface px-2 py-0.5 border border-border-strong">
                  {selectedMethods.length} ACTIVE {selectedMethods.length === 1 ? "MODALITY" : "MODALITIES"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {methods.map((m) => {
                  const Icon = m.icon;
                  const isSelected = selectedMethods.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      onClick={() => toggleMethod(m.id)}
                      className={`p-4 text-left border-2 transition-all cursor-pointer bg-white ${
                        isSelected 
                          ? "border-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ring-1 ring-primary" 
                          : "border-border-subtle hover:border-primary opacity-80"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-secondary"}`} />
                          <strong className="font-sans text-xs text-primary">{m.label}</strong>
                        </div>
                        <span className={`text-[9px] font-mono-data font-bold px-1.5 py-0.2 uppercase border ${
                          isSelected ? "bg-primary text-white border-primary" : "bg-surface text-secondary border-border-subtle"
                        }`}>
                          {isSelected ? "✓ ENABLED" : "DISABLED"}
                        </span>
                      </div>
                      <span className="font-mono-data text-[11px] text-secondary block mt-1">{m.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Safety & Pre-Inspection Checklist */}
            <div className="border border-border-strong bg-white p-5 space-y-3 font-mono-data text-xs">
              <h3 className="font-bold text-primary uppercase text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#027a48]" />
                PRE-INSPECTION SAFETY & SENSOR CALIBRATION
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={checklist.trackerLocked} onChange={(e) => setChecklist(c => ({...c, trackerLocked: e.target.checked}))} className="accent-primary" />
                  <span>Solar tracking tables locked at 0° horizontal stow</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={checklist.sensorCalibrated} onChange={(e) => setChecklist(c => ({...c, sensorCalibrated: e.target.checked}))} className="accent-primary" />
                  <span>Radiometric thermal camera emissivity calibrated (0.92)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={checklist.irradianceStable} onChange={(e) => setChecklist(c => ({...c, irradianceStable: e.target.checked}))} className="accent-primary" />
                  <span>Irradiance verified &gt; 600 W/m² (IEC threshold met)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={checklist.safetyGear} onChange={(e) => setChecklist(c => ({...c, safetyGear: e.target.checked}))} className="accent-primary" />
                  <span>Personal protective equipment (PPE) verified</span>
                </label>
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-primary text-white font-bold py-3.5 px-6 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>PROCEED WITH {selectedMethods.length} SELECTED MODALITIES →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: LIVE DATA COLLECTION & REAL-TIME MAP PROGRESS                     */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-4 gap-3">
              <div>
                <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                  STEP 2 OF 4: REAL-TIME MULTI-STREAM INGESTION
                </span>
                <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                  Live Data Collection & Map Progress
                </h1>
                {/* Active Modalities Badges */}
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <span className="text-secondary text-xs">Active Streams:</span>
                  {selectedMethods.map((m, idx) => (
                    <span key={idx} className="text-[10px] font-mono-data font-bold bg-primary text-white px-2 py-0.5 uppercase">
                      ✓ {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isCollecting && scanProgress < 100 && (
                  <button
                    onClick={handleStartDataCollection}
                    className="bg-primary text-white font-bold py-2.5 px-5 text-xs uppercase tracking-wider flex items-center gap-2 border border-primary hover:bg-white hover:text-primary cursor-pointer shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>START DATA COLLECTION</span>
                  </button>
                )}
                {isCollecting && (
                  <button
                    onClick={() => setIsCollecting(false)}
                    className="bg-critical text-white font-bold py-2.5 px-5 text-xs uppercase tracking-wider flex items-center gap-2 border border-critical cursor-pointer"
                  >
                    <Pause className="w-3.5 h-3.5" />
                    <span>PAUSE CAPTURE</span>
                  </button>
                )}
                {scanProgress === 100 && (
                  <button
                    onClick={handleStartDataCollection}
                    className="bg-surface text-primary font-bold py-2.5 px-4 text-xs uppercase tracking-wider flex items-center gap-2 border border-border-strong hover:bg-white cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RE-SCAN PLANT</span>
                  </button>
                )}
              </div>
            </div>

            {/* Live Progress Bar */}
            <div className="border border-border-strong bg-white p-5 space-y-3 font-mono-data text-xs shadow-xs">
              <div className="flex justify-between items-center font-bold">
                <span className="text-primary uppercase flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full inline-block ${isCollecting ? "bg-warning animate-pulse" : scanProgress === 100 ? "bg-[#027a48]" : "bg-secondary"}`} />
                  MISSION PROGRESS: {scanProgress}% COMPLETE
                </span>
                <span className="text-secondary">
                  {scannedCells} / 1,200 Modules Captured
                </span>
              </div>

              <div className="w-full h-3 bg-surface border border-border-strong overflow-hidden">
                <div 
                  style={{ width: `${scanProgress}%` }}
                  className="h-full bg-primary transition-all duration-300"
                />
              </div>

              {/* Real-time Telemetry Readout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t border-border-subtle">
                <div>
                  <span className="text-[10px] text-secondary font-sans uppercase block">Flight Altitude</span>
                  <strong className="text-primary">{telemetry.altitude} m AGL</strong>
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-sans uppercase block">Ground Speed</span>
                  <strong className="text-primary">{telemetry.speed} m/s</strong>
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-sans uppercase block">Captured Frames</span>
                  <strong className="text-primary">{telemetry.frames} / 1,200</strong>
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-sans uppercase block">IR Sensor Temp</span>
                  <strong className="text-critical">{telemetry.thermalTemp}°C</strong>
                </div>
              </div>
            </div>

            {/* Real-Time Live Map Sweep Visualizer */}
            <div className="border-2 border-primary bg-surface p-5 space-y-3 shadow-xs">
              <div className="flex justify-between items-center font-mono-data text-xs border-b border-border-subtle pb-2">
                <span className="font-bold text-primary uppercase flex items-center gap-2">
                  <Compass className="w-4 h-4 text-primary" />
                  REAL-TIME 2D DIGITAL TWIN SCAN SWEEP
                </span>
                <span className="text-[10px] text-secondary">
                  Sector 4 · Inverters INV-01 to INV-06
                </span>
              </div>

              {/* Dynamic 20x60 Grid Simulation */}
              <div 
                className="grid gap-[2px] bg-border-subtle p-2 border border-border-strong max-h-64 overflow-y-auto custom-scrollbar"
                style={{ gridTemplateColumns: "repeat(60, minmax(8px, 1fr))" }}
              >
                {Array.from({ length: 1200 }, (_, idx) => {
                  const isScanned = idx < scannedCells;
                  const isScanningHead = idx >= scannedCells - 20 && idx < scannedCells;
                  const isAnomaly = idx === 437 || idx === 198 || idx === 865 || idx === 722;

                  let bg = "bg-white";
                  if (isAnomaly && isScanned) bg = "bg-critical animate-pulse";
                  else if (isScanningHead) bg = "bg-warning";
                  else if (isScanned) bg = "bg-[#ecfdf3] border border-[#abefc6]";

                  return (
                    <div 
                      key={idx} 
                      className={`aspect-square transition-all ${bg}`}
                      title={`Module #${idx + 1}`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] font-mono-data text-secondary">
                <span>🟢 Scanned Cells</span>
                <span>🟡 Scanning Head</span>
                <span>🔴 Anomaly Detected</span>
              </div>
            </div>

            {/* Proceed to AI Diagnostics Button */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentStep(3)}
                disabled={scanProgress < 20}
                className="bg-primary text-white font-bold py-3.5 px-6 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <span>TRANSMIT MULTI-STREAM TO AI DIAGNOSTIC ENGINE →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: AI DIAGNOSTIC FINDINGS & NEEDED REPAIRS                           */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6 max-w-5xl">
            <div className="border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                  STEP 3 OF 4: MULTI-SENSOR AI FUSION & DEFECT CLASSIFICATION
                </span>
                <span className="bg-[#ecfdf3] text-[#027a48] text-[9px] font-mono-data font-bold px-2 py-0.5 border border-[#abefc6]">
                  {selectedMethods.length}-WAY FUSION ACTIVE
                </span>
              </div>
              <h1 className="text-2xl font-bold text-primary font-headline-lg">
                Identified Defects, Power Loss & Required Repairs
              </h1>
              <p className="text-secondary text-xs mt-1">
                Fused inference across <strong>{selectedMethods.join(" + ")}</strong> detected <strong>4 localized anomalies</strong>.
              </p>
            </div>

            {/* Defect Cards Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono-data text-xs">
              {discoveredDefects.map((d, idx) => {
                const isSelected = selectedDefectIdx === idx;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDefectIdx(idx)}
                    className={`p-3 text-left border-2 transition-all cursor-pointer bg-white ${
                      isSelected ? "border-primary shadow-xs font-bold" : "border-border-subtle hover:border-primary"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-primary text-xs">#{d.target}</span>
                      <span className="text-critical text-[10px] font-bold">+{d.deltaT}°C</span>
                    </div>
                    <div className="text-[11px] text-secondary font-sans truncate">{d.defectType}</div>
                    <span className="text-[9px] text-[#027a48] font-bold block mt-1">Repair: {d.estimatedRepairCost}</span>
                  </button>
                );
              })}
            </div>

            {/* 2-Column Detail of Selected Defect */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border-2 border-primary p-6 shadow-xs">
              {/* Left: Visual Scan & AI Bounding Box */}
              <div className="md:col-span-5 flex flex-col gap-3">
                <div className="border border-border-strong bg-black h-56 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={currentDefect.image}
                    alt={currentDefect.defectType}
                    className="w-full h-full object-cover opacity-85"
                  />
                  {/* Bounding Box */}
                  <div 
                    style={{
                      top: `${currentDefect.box.y}%`,
                      left: `${currentDefect.box.x}%`,
                      width: `${currentDefect.box.w}%`,
                      height: `${currentDefect.box.h}%`
                    }}
                    className="absolute border-2 border-critical bg-critical/20 flex flex-col justify-between p-1 animate-pulse"
                  >
                    <span className="bg-critical text-white font-mono-data text-[9px] font-bold px-1 self-start truncate">
                      {currentDefect.defectType} ({currentDefect.confidence}%)
                    </span>
                    <span className="font-mono-data text-[8px] text-white bg-black/80 px-1 self-end font-bold">
                      ΔT +{currentDefect.deltaT}°C
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-xs font-mono-data text-secondary bg-surface p-2 border border-border-subtle">
                  <span>Panel #{currentDefect.target} ({currentDefect.inverter})</span>
                  <strong className="text-critical">{currentDefect.severity}</strong>
                </div>
              </div>

              {/* Right: Technical Engineering Findings, Cautions & Repair Action */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-4 font-mono-data text-xs">
                {/* Financial & Yield Grid */}
                <div className="grid grid-cols-3 gap-2 bg-surface p-3 border border-border-subtle">
                  <div>
                    <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Thermal Delta</span>
                    <strong className="text-critical text-base">+{currentDefect.deltaT}°C</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Annual Loss Risk</span>
                    <strong className="text-primary text-base">{currentDefect.annualRevenueRisk}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Estimated Cost</span>
                    <strong className="text-[#027a48] text-base">{currentDefect.estimatedRepairCost}</strong>
                  </div>
                </div>

                {/* Required Repair Action */}
                <div className="space-y-1">
                  <span className="font-bold text-primary uppercase text-[11px] flex items-center gap-1.5 font-mono-data">
                    <Wrench className="w-3.5 h-3.5 text-primary" />
                    REQUIRED REPAIR ACTION & PROCEDURE:
                  </span>
                  <p className="font-sans text-xs text-primary bg-surface p-2.5 border border-border-subtle leading-relaxed">
                    {currentDefect.repairAction}
                  </p>
                </div>

                {/* Safety Caution */}
                <div className="space-y-1">
                  <span className="font-bold text-critical uppercase text-[11px] flex items-center gap-1.5 font-mono-data">
                    <ShieldAlert className="w-3.5 h-3.5 text-critical" />
                    SAFETY & HAZARDOUS CAUTION:
                  </span>
                  <p className="font-sans text-xs text-critical bg-[#fef3f2] p-2.5 border border-critical/30 leading-relaxed font-medium">
                    {currentDefect.safetyCaution}
                  </p>
                </div>
              </div>
            </div>

            {/* Proceed to Report Compilation Button */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentStep(4)}
                className="bg-primary text-white font-bold py-3.5 px-6 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>PROCEED TO AUDIT REPORT COMPILATION & SUBMISSION →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: CERTIFIED REPORT COMPILATION & CLIENT SUBMISSION                  */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6 max-w-5xl">
            <div className="border-b border-border-subtle pb-4">
              <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                STEP 4 OF 4: EXECUTIVE REPORT & TRANSMISSION
              </span>
              <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                Inspection Diagnostic & Cost Proposal Report
              </h1>
              <p className="text-secondary text-xs mt-1">
                Formal plant audit report compiled under IEC 62446-3 guidelines with combined <strong>{selectedMethods.join(" + ")}</strong> telemetry.
              </p>
            </div>

            {/* Report Document Box */}
            <div className="border-2 border-border-strong bg-white p-6 space-y-5 font-mono-data text-xs shadow-xs">
              {/* Document Header */}
              <div className="flex justify-between items-start border-b-2 border-primary pb-3">
                <div>
                  <span className="text-[10px] text-secondary uppercase block font-bold">
                    REPORT REF: REP-8492-BHADLA-S4
                  </span>
                  <h2 className="font-bold text-base text-primary uppercase font-mono-data mt-0.5">
                    SOLAR ASSET DIAGNOSTIC & COST PROPOSAL AUDIT
                  </h2>
                  <span className="text-secondary text-xs font-sans">
                    Inspected by: Capt. A. Nair (#8492) · Modalities: <strong>{selectedMethods.join(" + ")}</strong>
                  </span>
                </div>
                <div className="text-right">
                  <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-[10px] font-bold uppercase inline-block">
                    IEC 62446-3 CERTIFIED
                  </span>
                  <span className="text-[10px] text-secondary block mt-1">
                    Date: {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Financial Executive Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-surface p-4 border border-border-subtle">
                <div>
                  <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Total Modules Scanned</span>
                  <strong className="text-primary text-lg">1,200 Modules (100%)</strong>
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Total Annual Revenue at Risk</span>
                  <strong className="text-critical text-lg">₹1,55,930 / yr</strong>
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Total Proposed Repair Budget</span>
                  <strong className="text-[#027a48] text-lg">₹13,700 (ROI: 11.3x)</strong>
                </div>
              </div>

              {/* Defect Remediation Table */}
              <div>
                <h3 className="font-bold text-xs uppercase text-primary mb-2 font-mono-data">
                  ISOLATED DEFECTS & PROPOSED REPAIR ACTIONS:
                </h3>
                <div className="border border-border-subtle overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse font-mono-data">
                    <thead>
                      <tr className="bg-surface border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                        <th className="py-2 px-3">Module ID</th>
                        <th className="py-2 px-3 font-sans">Defect Classification</th>
                        <th className="py-2 px-3">Thermal Delta</th>
                        <th className="py-2 px-3">Revenue Risk</th>
                        <th className="py-2 px-3">Repair Cost</th>
                        <th className="py-2 px-3 font-sans">Safety Caution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle text-xs">
                      {discoveredDefects.map((d) => (
                        <tr key={d.id}>
                          <td className="py-2 px-3 font-bold text-primary">#{d.target}</td>
                          <td className="py-2 px-3 font-sans text-primary">{d.defectType}</td>
                          <td className="py-2 px-3 text-critical font-bold">+{d.deltaT}°C</td>
                          <td className="py-2 px-3 text-primary">{d.annualRevenueRisk}</td>
                          <td className="py-2 px-3 font-bold text-[#027a48]">{d.estimatedRepairCost}</td>
                          <td className="py-2 px-3 text-secondary font-sans truncate max-w-[200px]" title={d.safetyCaution}>
                            {d.safetyCaution}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Submission CTA */}
            <div>
              {reportSubmitted ? (
                <div className="bg-[#ecfdf3] border-2 border-[#027a48] p-4 text-center text-xs font-bold font-mono-data text-[#027a48] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#027a48]" />
                    <span>CERTIFIED REPORT TRANSMITTED TO CLIENT PORTAL FOR AUTHORIZATION</span>
                  </div>
                  <button
                    onClick={() => onNavigateTab("client-portal")}
                    className="bg-[#027a48] text-white px-4 py-2 text-xs uppercase font-bold hover:bg-[#02643a] transition-all cursor-pointer"
                  >
                    VIEW IN CLIENT APPROVAL PORTAL →
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSubmitReportToClientPortal}
                  disabled={isSubmittingReport}
                  className="w-full bg-primary text-white font-bold py-4 px-6 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmittingReport 
                      ? "TRANSMITTING CERTIFIED REPORT TO CLIENT..." 
                      : "🚀 SUBMIT CERTIFIED REPORT TO CLIENT / ASSET OWNER FOR APPROVAL"}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
