import React, { useState, useRef } from "react";
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
  DollarSign, 
  Sparkles, 
  RefreshCw, 
  Layers,
  Plane,
  Smartphone,
  Car
} from "lucide-react";
import { uploadInspection, verifyRepair } from "../../services/api";

export default function FieldInspectorPortal({ farm, onSubmitReportToClient, onNavigateTab }) {
  const [source, setSource] = useState("Smartphone RGB");
  const [targetModule, setTargetModule] = useState("R12-C37");
  const [defectHint, setDefectHint] = useState("Thermal Hotspot");
  const [customImage, setCustomImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progressStage, setProgressStage] = useState(5);
  const [inspectionResult, setInspectionResult] = useState(null);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [detectedBox, setDetectedBox] = useState({ x: 35, y: 20, w: 40, h: 45 });

  // Re-Inspection State
  const [reinspectingOrder, setReinspectingOrder] = useState(null);
  const [isVerifyingQA, setIsVerifyingQA] = useState(false);
  const [qaVerificationResult, setQaVerificationResult] = useState(null);

  const fileInputRef = useRef(null);

  const sources = [
    { id: "Smartphone RGB", label: "Smartphone Field Camera", icon: Smartphone, tag: "LIVE MOBILE" },
    { id: "Drone Orthomosaic", label: "Drone Orthomosaic (IR+RGB)", icon: Plane, tag: "AERIAL" },
    { id: "Handheld Thermal", label: "Handheld Thermal (FLIR)", icon: Thermometer, tag: "THERMOGRAPHY" },
    { id: "Vehicle Camera", label: "Ground Rover Camera", icon: Car, tag: "ROVER" },
  ];

  const presets = [
    {
      name: "Bypass Diode Thermal Runaway",
      target: "R12-C37",
      source: "Handheld Thermal",
      hint: "Thermal Hotspot",
      image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
      deltaT: 18.4,
      lossKwh: 1.42,
      annualCostInr: "₹44,050",
      repairCostInr: "₹4,500",
      repairAction: "Replace sub-string Schottky bypass diode (15SQ045) & reseal junction box.",
      safetyCaution: "HIGH ARC FLASH HAZARD (>600V DC). Lockout/Tagout Inverter INV-04 DC Combiner before contact.",
      box: { x: 35, y: 15, w: 40, h: 50 }
    },
    {
      name: "Wafer Busbar Microcrack",
      target: "R07-C45",
      source: "Smartphone RGB",
      hint: "Physical Crack",
      image: "https://images.unsplash.com/photo-1508873696983-2df570464753?auto=format&fit=crop&w=800&q=80",
      deltaT: 4.2,
      lossKwh: 0.88,
      annualCostInr: "₹27,300",
      repairCostInr: "₹2,800",
      repairAction: "Conduct micro-soldering bridge on fractured silver fingers and apply UV sealant.",
      safetyCaution: "Fragile frontsheet glass. Use vacuum lifters; do not apply localized mechanical pressure.",
      box: { x: 30, y: 25, w: 45, h: 40 }
    },
    {
      name: "Heavy Desert Sand Encrustation",
      target: "R15-C22",
      source: "Smartphone RGB",
      hint: "Heavy Soiling",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      deltaT: 1.2,
      lossKwh: 0.65,
      annualCostInr: "₹35,680",
      repairCostInr: "₹1,200",
      repairAction: "Deploy autonomous robotic dry-brush cleaning unit with deionized water rinse.",
      safetyCaution: "Ensure tracker array is locked at 0° horizontal tilt during cleaning pass.",
      box: { x: 20, y: 35, w: 60, h: 45 }
    }
  ];

  const currentPreset = presets.find(p => p.target === targetModule) || presets[0];

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        setReportSubmitted(false);
        runInference(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const runInference = async (img = null) => {
    setAnalyzing(true);
    setReportSubmitted(false);
    setProgressStage(1);
    setTimeout(() => setProgressStage(2), 200);
    setTimeout(() => setProgressStage(3), 450);
    setTimeout(() => setProgressStage(4), 700);

    try {
      const res = await uploadInspection({
        farm_id: farm?.id || "farm-1",
        source: source,
        target_module_id: targetModule,
        defect_type_hint: defectHint,
      });

      setTimeout(() => {
        setInspectionResult(res);
        setAnalyzing(false);
        setProgressStage(5);
      }, 950);
    } catch (e) {
      setAnalyzing(false);
    }
  };

  const handleSubmitReport = () => {
    const reportPayload = {
      id: "REP-" + Date.now().toString().slice(-6),
      farm_id: farm?.id || "farm-1",
      module_id: targetModule,
      defect_type: inspectionResult?.defect_detected?.type || currentPreset.hint,
      severity: targetModule === "R12-C37" ? "Critical" : "High",
      delta_t: currentPreset.deltaT,
      daily_loss_kwh: currentPreset.lossKwh,
      annual_revenue_risk: currentPreset.annualCostInr,
      estimated_repair_cost: currentPreset.repairCostInr,
      repair_action: currentPreset.repairAction,
      safety_caution: currentPreset.safetyCaution,
      inspector_name: "Capt. A. Nair (Certified Thermographer #8492)",
      inspection_source: source,
      submitted_at: new Date().toLocaleString(),
      status: "Pending Client Approval"
    };

    if (onSubmitReportToClient) {
      onSubmitReportToClient(reportPayload);
    }
    setReportSubmitted(true);
  };

  const currentDisplayImage = customImage || currentPreset.image;

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* Inspector Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-4 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              FIELD INSPECTOR WORKSPACE
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Logged in: Capt. A. Nair (Level-III Thermographer)
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Data Collection, AI Loss Analysis & Repair Proposal Engine
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab("client-portal")}
            className="px-4 py-2 border border-border-strong hover:bg-white text-primary text-xs font-bold font-mono-data uppercase cursor-pointer flex items-center gap-1.5"
          >
            <span>VIEW CLIENT PORTAL →</span>
          </button>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Data Ingestion & Camera (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-5 lg:border-r border-border-subtle lg:pr-8 pr-0">
          {/* Hardware Source */}
          <section>
            <label className="font-label-caps text-xs text-secondary uppercase font-bold tracking-wider block mb-2">
              1. FIELD HARDWARE DATA SOURCE
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sources.map((s) => {
                const Icon = s.icon;
                const isSelected = source === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSource(s.id)}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white border-2 border-primary shadow-xs"
                        : "bg-surface border-border-subtle hover:border-primary"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Icon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-secondary"}`} />
                      <span className="text-[9px] font-mono-data font-bold text-secondary uppercase">{s.tag}</span>
                    </div>
                    <div className="text-xs font-bold text-primary">{s.label}</div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Ingestion Stream / Camera Dropzone */}
          <section>
            <label className="font-label-caps text-xs text-secondary uppercase font-bold tracking-wider block mb-2">
              2. INGEST LIVE FIELD IMAGERY / RADIOMETRIC DATA
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border-strong p-5 flex flex-col items-center justify-center text-center bg-surface hover:bg-white hover:border-primary cursor-pointer transition-all group"
            >
              <Camera className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <strong className="text-xs text-primary uppercase">SNAP PHOTO OR UPLOAD THERMAL SCAN</strong>
              <span className="text-[11px] text-secondary mt-1">Supports Smartphone Camera, FLIR RJPEG & Drone TIFF</span>
            </div>
          </section>

          {/* Quick Presets */}
          <section>
            <label className="font-label-caps text-[10px] text-secondary uppercase font-bold tracking-wider block mb-1.5">
              OR TEST REAL ANOMALY SAMPLES
            </label>
            <div className="space-y-1.5 font-mono-data text-xs">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTargetModule(p.target);
                    setDefectHint(p.hint);
                    setCustomImage(null);
                    setDetectedBox(p.box);
                    runInference(p.image);
                  }}
                  className={`w-full p-2.5 text-left border flex items-center justify-between transition-all cursor-pointer ${
                    targetModule === p.target ? "bg-white border-2 border-primary font-bold shadow-xs" : "bg-surface border-border-subtle hover:border-primary"
                  }`}
                >
                  <div>
                    <span className="font-bold text-primary block">{p.name}</span>
                    <span className="text-[10px] text-secondary font-sans">Panel #{p.target} · {p.hint}</span>
                  </div>
                  <span className="text-critical font-bold text-xs">+{p.deltaT}°C</span>
                </button>
              ))}
            </div>
          </section>

          <button
            onClick={() => runInference()}
            disabled={analyzing}
            className="w-full bg-primary text-white font-bold py-3.5 px-6 border-2 border-primary hover:bg-white hover:text-primary transition-all flex items-center justify-between uppercase tracking-wider text-xs cursor-pointer shadow-xs mt-auto"
          >
            <span>{analyzing ? "RUNNING AI COMPUTER VISION..." : "ANALYZE PANEL WITH AI"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Column: AI Diagnostic Findings, Cost Proposal & Submit CTA (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Visual Scanners: Raw Photo & AI Grad-CAM Bounding Box */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border-strong bg-surface flex flex-col h-56 overflow-hidden">
              <div className="border-b border-border-subtle px-3 py-1.5 flex justify-between items-center bg-white font-mono-data text-xs">
                <span className="font-bold text-primary">RAW FIELD INGESTION (#{targetModule})</span>
                <span className="text-[10px] text-secondary uppercase">{source}</span>
              </div>
              <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={currentDisplayImage}
                  alt="Raw Scan"
                  className="w-full h-full object-cover"
                />
                {analyzing && (
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-2xs flex items-center justify-center">
                    <span className="font-mono-data text-xs font-bold text-white bg-black/80 px-3 py-1 border border-white">
                      EXTRACTING VISUAL FEATURES...
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-2 border-primary bg-surface flex flex-col h-56 overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="border-b-2 border-primary px-3 py-1.5 flex justify-between items-center bg-white z-10 font-mono-data text-xs">
                <span className="font-bold text-primary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-critical" />
                  AI GRAD-CAM BOUNDING BOX
                </span>
                <span className="text-[10px] font-bold text-[#027a48] bg-[#ecfdf3] px-1.5 py-0.2 border border-[#abefc6]">
                  98.6% CONFIDENCE
                </span>
              </div>
              <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={currentDisplayImage}
                  alt="AI Heatmap"
                  className="w-full h-full object-cover opacity-85"
                />
                <div 
                  style={{
                    top: `${detectedBox.y}%`,
                    left: `${detectedBox.x}%`,
                    width: `${detectedBox.w}%`,
                    height: `${detectedBox.h}%`
                  }}
                  className="absolute border-2 border-critical bg-critical/20 flex flex-col justify-between p-1 animate-pulse"
                >
                  <span className="bg-critical text-white font-mono-data text-[9px] font-bold px-1 self-start">
                    {defectHint.toUpperCase()} (98.6%)
                  </span>
                  <span className="font-mono-data text-[8px] text-white bg-black/80 px-1 self-end font-bold">
                    SUB-CELL L3 · ΔT +{currentPreset.deltaT}°C
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* AI Engineering Report & Cost Proposal Box */}
          <section className="border-2 border-border-strong bg-white p-5 font-mono-data text-xs space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                <strong className="text-primary uppercase text-sm">INSPECTION DIAGNOSTIC & COST PROPOSAL REPORT</strong>
              </div>
              <span className="bg-[#fef3f2] text-critical border border-critical px-2 py-0.5 font-bold uppercase text-[10px]">
                {targetModule === "R12-C37" ? "CRITICAL RISK (P1)" : "HIGH RISK (P2)"}
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 bg-surface p-3 border border-border-subtle">
              <div>
                <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Thermal Delta (ΔT)</span>
                <strong className="text-critical text-base">+{currentPreset.deltaT}°C</strong>
              </div>
              <div>
                <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Annual Loss Risk</span>
                <strong className="text-primary text-base">{currentPreset.annualCostInr}/yr</strong>
              </div>
              <div>
                <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Estimated Repair Cost</span>
                <strong className="text-[#027a48] text-base">{currentPreset.repairCostInr}</strong>
              </div>
            </div>

            {/* Required Repairs */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs uppercase">
                <Wrench className="w-3.5 h-3.5 text-primary" />
                <span>REQUIRED REPAIRS & SPARE PARTS:</span>
              </div>
              <p className="font-sans text-xs text-primary bg-surface p-2.5 border border-border-subtle leading-relaxed">
                {currentPreset.repairAction}
              </p>
            </div>

            {/* Safety & Hazardous Cautions */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-critical font-bold text-xs uppercase">
                <ShieldAlert className="w-3.5 h-3.5 text-critical" />
                <span>SAFETY CAUTION & HAZARDOUS WARNING:</span>
              </div>
              <p className="font-sans text-xs text-critical bg-[#fef3f2] p-2.5 border border-critical/30 leading-relaxed font-medium">
                {currentPreset.safetyCaution}
              </p>
            </div>
          </section>

          {/* Action Button */}
          <button
            onClick={handleSubmitReport}
            disabled={reportSubmitted}
            className={`py-4 px-6 text-xs font-bold uppercase tracking-wider flex items-center justify-between border-2 transition-all cursor-pointer ${
              reportSubmitted
                ? "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]"
                : "bg-primary text-white border-primary hover:bg-white hover:text-primary shadow-xs"
            }`}
          >
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>
                {reportSubmitted 
                  ? "✓ REPORT SUBMITTED TO CLIENT PORTAL FOR APPROVAL" 
                  : "SUBMIT REPORT & COST PROPOSAL TO CLIENT FOR APPROVAL"}
              </span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
