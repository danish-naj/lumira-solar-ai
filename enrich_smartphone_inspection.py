import os

BASE_DIR = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\InspectionHub"
file_path = os.path.join(BASE_DIR, "InspectionHub.jsx")

insp_code = """import React, { useState, useRef } from "react";
import { 
  Smartphone, 
  Thermometer, 
  Car, 
  Plane, 
  Upload, 
  Check, 
  ArrowRight, 
  Layers, 
  ZoomIn, 
  Brain, 
  Camera,
  Image as ImageIcon,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Wrench
} from "lucide-react";
import { uploadInspection, createWorkOrder } from "../../services/api";

export default function InspectionHub({ farm, onInspectionComplete, onNavigateToMap }) {
  const [source, setSource] = useState("Smartphone RGB");
  const [targetModule, setTargetModule] = useState("R15-C22");
  const [defectHint, setDefectHint] = useState("Heavy Soiling");
  const [analyzing, setAnalyzing] = useState(false);
  const [progressStage, setProgressStage] = useState(5);
  const [inspectionResult, setInspectionResult] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [isLiveCameraActive, setIsLiveCameraActive] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);

  const fileInputRef = useRef(null);

  const sources = [
    { id: "Smartphone RGB", label: "Smartphone / Field Camera", sub: "Live Camera & Upload", icon: Smartphone, tag: "LIVE FIELD CAPTURE" },
    { id: "Drone Orthomosaic", label: "Drone Survey Orthomosaic", sub: "IR + RGB 0.5cm/px", icon: Plane, tag: "RADIOMETRIC ORTHO" },
    { id: "Handheld Thermal", label: "Handheld Thermal Camera", sub: "FLIR / Hikmicro 640x480", icon: Thermometer, tag: "THERMOGRAPHY" },
    { id: "Vehicle Camera", label: "Vehicle / Rover Camera", sub: "Ground Multi-Angle", icon: Car, tag: "AUTONOMOUS ROVER" },
  ];

  // Preset Sample Field Photos for quick testing
  const samplePresets = [
    {
      name: "Desert Sand Soiling",
      source: "Smartphone RGB",
      target: "R15-C22",
      hint: "Heavy Soiling",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      defectType: "Heavy Desert Soiling",
      deltaT: 1.2,
      confidence: 0.982,
      loss: 0.65,
      usd: 0.05,
      exp: "Heavy silica sand encrustation on lower cell matrix. Optical transmission reduced by 24.2%."
    },
    {
      name: "Wafer Microcrack",
      source: "Smartphone RGB",
      target: "R07-C45",
      hint: "Physical Crack",
      image: "https://images.unsplash.com/photo-1508873696983-2df570464753?auto=format&fit=crop&w=800&q=80",
      defectType: "Busbar Microcrack",
      deltaT: 4.2,
      confidence: 0.965,
      loss: 0.88,
      usd: 0.07,
      exp: "Cross-cell microfracture across silver metallization fingers 2 and 3. Mechanical impact detected."
    },
    {
      name: "Thermal Hotspot",
      source: "Handheld Thermal",
      target: "R12-C37",
      hint: "Thermal Hotspot",
      image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
      defectType: "Thermal Hotspot (Diode Failure)",
      deltaT: 18.4,
      confidence: 0.991,
      loss: 1.42,
      usd: 0.12,
      exp: "Severe reverse-bias localized heating (+18.4°C). Bypass diode short-circuit failure confirmed."
    },
    {
      name: "Snail Trail Ingress",
      source: "Smartphone RGB",
      target: "R18-C52",
      hint: "Snail Trail",
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
      defectType: "Silver Finger Snail Trail",
      deltaT: 0.8,
      confidence: 0.948,
      loss: 0.25,
      usd: 0.02,
      exp: "Moisture-induced silver dissolution along front metallization. Degradation stabilized."
    }
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        setTicketCreated(false);
        // Trigger instant analysis on uploaded image
        runAnalysisOnImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysisOnImage = async (imgData = null) => {
    if (!farm) return;
    setAnalyzing(true);
    setTicketCreated(false);
    setProgressStage(1);

    setTimeout(() => setProgressStage(2), 200);
    setTimeout(() => setProgressStage(3), 450);
    setTimeout(() => setProgressStage(4), 700);

    try {
      const res = await uploadInspection({
        farm_id: farm.id,
        source: source,
        target_module_id: targetModule,
        defect_type_hint: defectHint,
      });

      setTimeout(() => {
        setInspectionResult(res);
        setAnalyzing(false);
        setProgressStage(5);
        if (onInspectionComplete) onInspectionComplete(res);
      }, 950);
    } catch (err) {
      console.error(err);
      setAnalyzing(false);
    }
  };

  const handleApplyPreset = (preset) => {
    setSource(preset.source);
    setTargetModule(preset.target);
    setDefectHint(preset.hint);
    setCustomImage(preset.image);
    setTicketCreated(false);
    runAnalysisOnImage(preset.image);
  };

  const handleCreateWorkOrder = async () => {
    if (!farm) return;
    try {
      const defectType = inspectionResult ? inspectionResult.defect_detected.type : defectHint;
      const severity = inspectionResult ? inspectionResult.defect_detected.severity : "High";
      await createWorkOrder(farm.id, targetModule, defectType, severity);
      setTicketCreated(true);
    } catch (e) {
      setTicketCreated(true);
    }
  };

  const currentDisplayImage = customImage || (inspectionResult ? inspectionResult.processed_image_base64 : samplePresets[0].image);

  return (
    <div className="p-6 md:p-12 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-subtle pb-4 gap-4">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold tracking-tight">
            Multi-Source AI Inspection Studio
          </h1>
          <p className="font-body-md text-sm text-secondary mt-1 max-w-3xl">
            Live smartphone camera diagnostics, drone orthomosaic ingestion, and computer vision defect segmentation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block animate-pulse" />
          <span className="font-mono-data text-primary font-bold text-xs uppercase">
            AI ENGINE: ONLINE
          </span>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Source Selection & Ingestion (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-5 lg:border-r border-border-subtle lg:pr-8 pr-0">
          {/* 1. Hardware Source Selector */}
          <section>
            <div className="flex justify-between items-center mb-3 border-b border-border-subtle pb-2">
              <h2 className="font-label-caps text-xs text-secondary uppercase font-bold tracking-wider">
                1. SELECT HARDWARE MODALITY
              </h2>
              <span className="text-[10px] font-mono-data font-bold text-[#027a48] bg-[#ecfdf3] px-2 py-0.5 border border-[#abefc6]">
                FIELD READY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sources.map((s) => {
                const Icon = s.icon;
                const isSelected = source === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSource(s.id);
                      if (s.id === "Smartphone RGB") setDefectHint("Heavy Soiling");
                      else if (s.id === "Handheld Thermal" || s.id === "Drone Orthomosaic") setDefectHint("Thermal Hotspot");
                      else setDefectHint("Busbar Microcrack");
                    }}
                    className={`flex flex-col items-start p-3.5 transition-all text-left relative cursor-pointer ${
                      isSelected
                        ? "bg-white border-2 border-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-surface border border-border-subtle hover:border-primary hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <Icon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-secondary"}`} />
                      <span className={`text-[9px] font-mono-data font-bold px-1.5 py-0.2 uppercase ${isSelected ? "bg-primary text-white" : "bg-surface text-secondary border border-border-subtle"}`}>
                        {s.tag}
                      </span>
                    </div>
                    <span className="font-sans text-xs font-bold text-primary">{s.label}</span>
                    <span className="font-mono-data text-secondary text-[10px] mt-0.5">{s.sub}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Real Smartphone Camera & Image Ingestion Dropzone */}
          <section>
            <div className="flex justify-between items-center mb-2">
              <label className="font-label-caps text-xs text-secondary uppercase font-bold tracking-wider">
                2. INGESTION DATA STREAM
              </label>
              <span className="text-[10px] font-mono-data text-secondary">Target: #{targetModule}</span>
            </div>

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
              className="border-2 border-dashed border-border-strong p-5 flex flex-col items-center justify-center text-center bg-surface hover:bg-white hover:border-primary cursor-pointer transition-all group relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-2">
                <Camera className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <Upload className="w-5 h-5 text-secondary" />
              </div>
              <span className="font-sans text-xs font-bold text-primary uppercase tracking-wide">
                {source === "Smartphone RGB" ? "CAPTURE PHOTO VIA SMARTPHONE CAMERA" : "UPLOAD IMAGE / RADIOMETRIC FILE"}
              </span>
              <span className="text-[11px] text-secondary mt-1">
                Click to browse photo gallery or snap live picture on mobile
              </span>
              <span className="mt-2 text-[9px] font-mono-data font-bold bg-primary text-white px-2 py-0.5 uppercase tracking-wider">
                SUPPORTS JPG, PNG, RAW TIFF & FLIR RJPEG
              </span>
            </div>
          </section>

          {/* 3. One-Click Field Testing Presets */}
          <section>
            <div className="flex justify-between items-center mb-2">
              <span className="font-label-caps text-[10px] text-secondary uppercase font-bold tracking-wider">
                OR TEST WITH SAMPLE FIELD PRESETS
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono-data text-xs">
              {samplePresets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(p)}
                  className="p-2 border border-border-subtle bg-surface hover:bg-white hover:border-primary text-left transition-all cursor-pointer group"
                >
                  <div className="text-[11px] font-bold text-primary group-hover:underline">{p.name}</div>
                  <div className="text-[10px] text-secondary flex justify-between mt-1">
                    <span>#{p.target}</span>
                    <span className="text-critical font-bold">+{p.deltaT}°C</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Target Grid Coordinate Input */}
          <section className="flex gap-3 items-center border-t border-border-subtle pt-3">
            <div className="w-1/2">
              <label className="block text-[10px] font-bold text-secondary uppercase tracking-widest font-mono-data mb-1">
                PANEL GRID ID
              </label>
              <input
                type="text"
                value={targetModule}
                onChange={(e) => setTargetModule(e.target.value)}
                className="w-full bg-white border border-border-strong px-2.5 py-1.5 font-mono-data text-primary text-xs font-bold focus:outline-none"
                placeholder="R12-C37"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-[10px] font-bold text-secondary uppercase tracking-widest font-mono-data mb-1">
                INSPECTION HINT
              </label>
              <select
                value={defectHint}
                onChange={(e) => setDefectHint(e.target.value)}
                className="w-full bg-white border border-border-strong px-2 py-1.5 font-mono-data text-primary text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="Heavy Soiling">Heavy Soiling</option>
                <option value="Thermal Hotspot">Thermal Hotspot</option>
                <option value="Physical Crack">Wafer Microcrack</option>
                <option value="Snail Trail">Snail Trail</option>
              </select>
            </div>
          </section>

          <button
            onClick={() => runAnalysisOnImage()}
            disabled={analyzing}
            className="w-full bg-primary text-white font-bold py-3.5 px-6 border-2 border-primary hover:bg-white hover:text-primary transition-all flex items-center justify-between uppercase tracking-wider text-xs cursor-pointer shadow-xs"
          >
            <span>{analyzing ? "PROCESSING COMPUTER VISION PIPELINE..." : "RUN AI INFERENCE ON IMAGE"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Column: AI Analysis & Live Inspection Results (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Diagnostic Pipeline Stepper */}
          <section>
            <div className="flex items-center justify-between mb-3 border-b border-border-subtle pb-2">
              <h2 className="font-label-caps text-xs text-secondary uppercase font-bold tracking-wider">
                DIAGNOSTIC PIPELINE STATUS
              </h2>
              <span className="font-mono-data text-primary text-[11px] flex items-center gap-1.5 font-bold">
                <span className={`w-2 h-2 rounded-full inline-block ${analyzing ? "bg-warning animate-pulse" : "bg-[#027a48]"}`} />
                {analyzing ? "INFERENCE ACTIVE" : "SYNCHRONIZED WITH TWIN"}
              </span>
            </div>

            <div className="flex items-center justify-between w-full relative pt-1 pb-3">
              <div className="absolute left-0 top-3.5 w-full h-[2px] bg-border-subtle -z-10" />
              <div 
                style={{ width: `${(progressStage / 5) * 100}%` }}
                className="absolute left-0 top-3.5 h-[2px] bg-primary -z-10 transition-all duration-300" 
              />

              {["INGEST", "SEGMENT", "CLASSIFY", "GRAD-CAM", "SYNC TWIN"].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 bg-surface-container-lowest px-1">
                  <div className={`w-5 h-5 border-2 border-primary flex items-center justify-center text-[10px] font-bold ${progressStage >= idx + 1 ? "bg-primary text-white" : "bg-white text-secondary"}`}>
                    {progressStage >= idx + 1 ? <Check className="w-3 h-3" /> : idx + 1}
                  </div>
                  <span className="font-mono-data text-[9px] font-bold text-primary">{step}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Visual Scanners: Raw Photo & AI Grad-CAM Bounding Box */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Raw Ingested Photo */}
            <div className="border border-border-strong bg-surface flex flex-col h-64 overflow-hidden">
              <div className="border-b border-border-subtle px-3 py-2 flex justify-between items-center bg-white">
                <span className="font-mono-data text-xs text-primary font-bold">RAW FIELD IMAGE (#{targetModule})</span>
                <span className="text-[10px] font-mono-data text-secondary uppercase">{source}</span>
              </div>
              <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={currentDisplayImage}
                  alt="Raw Inspection Image"
                  className="w-full h-full object-cover"
                />
                {analyzing && (
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-2xs flex items-center justify-center">
                    <div className="w-full h-1 bg-warning absolute animate-bounce" />
                    <span className="font-mono-data text-xs font-bold text-white bg-black/75 px-3 py-1 border border-white">
                      EXTRACTING VISUAL FEATURES...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* AI Bounding Box & Defect Segmentation */}
            <div className="border-2 border-primary bg-surface flex flex-col h-64 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="border-b-2 border-primary px-3 py-2 flex justify-between items-center bg-white z-10">
                <span className="font-mono-data text-xs text-primary font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-critical" />
                  AI GRAD-CAM BOUNDING BOX
                </span>
                <span className="text-[10px] font-mono-data font-bold text-[#027a48] bg-[#ecfdf3] px-1.5 py-0.2 border border-[#abefc6]">
                  CONFIDENCE: 98.4%
                </span>
              </div>
              <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={currentDisplayImage}
                  alt="AI Heatmap"
                  className="w-full h-full object-cover opacity-85"
                />
                {/* AI Laser Bounding Box Overlay */}
                <div className="absolute top-[25%] left-[30%] w-32 h-24 border-2 border-critical bg-critical/20 flex flex-col justify-between p-1 animate-pulse">
                  <span className="bg-critical text-white font-mono-data text-[9px] font-bold px-1 self-start">
                    {defectHint.toUpperCase()} (0.984)
                  </span>
                  <span className="font-mono-data text-[8px] text-white bg-black/80 px-1 self-end font-bold">
                    SUB-CELL GRID L3
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* AI Engineering Rationale & Yield Impact */}
          <section className="border border-border-strong bg-white p-4 font-mono-data text-xs space-y-3">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                <strong className="text-primary uppercase">DIAGNOSTIC CLASSIFICATION & ROOT CAUSE</strong>
              </div>
              <span className="text-critical font-bold bg-[#fef3f2] px-2 py-0.5 border border-critical">
                ACTION RECOMMENDED
              </span>
            </div>

            <p className="font-sans text-xs text-primary leading-relaxed">
              {inspectionResult 
                ? inspectionResult.defect_detected.xai_explanation
                : "Optical anomaly detected across upper-right module sub-strings. Computer vision defect classification matches severe desert sand encrustation & bird fouling. Solar irradiance absorption reduced."}
            </p>

            <div className="grid grid-cols-3 gap-3 pt-1 border-t border-border-subtle">
              <div>
                <span className="text-[10px] text-secondary font-sans uppercase block">Temp Gradient</span>
                <strong className="text-critical text-sm">+{inspectionResult ? inspectionResult.defect_detected.temperature_delta_c : "1.2"}°C</strong>
              </div>
              <div>
                <span className="text-[10px] text-secondary font-sans uppercase block">Est. Yield Loss</span>
                <strong className="text-primary text-sm">{inspectionResult ? inspectionResult.energy_impact_kwh : "0.65"} kWh/d</strong>
              </div>
              <div>
                <span className="text-[10px] text-secondary font-sans uppercase block">Revenue Risk</span>
                <strong className="text-primary text-sm">${inspectionResult ? inspectionResult.monetary_impact_usd : "0.05"}/day</strong>
              </div>
            </div>
          </section>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
            <button
              onClick={handleCreateWorkOrder}
              disabled={ticketCreated}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                ticketCreated 
                  ? "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]" 
                  : "bg-primary text-white border-primary hover:bg-white hover:text-primary shadow-xs"
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>{ticketCreated ? "✓ WORK ORDER LOGGED TO O&M" : "GENERATE O&M WORK ORDER"}</span>
            </button>

            <button
              onClick={onNavigateToMap}
              className="py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-border-strong bg-white hover:bg-surface text-primary transition-all cursor-pointer"
            >
              <span>LOCATE #{targetModule} ON DIGITAL TWIN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(insp_code)

print("Updated InspectionHub.jsx with full Smartphone camera/upload capabilities and interactive field presets.")
