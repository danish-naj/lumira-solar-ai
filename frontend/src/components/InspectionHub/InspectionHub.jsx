import React, { useState } from "react";
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
  Cpu 
} from "lucide-react";
import { uploadInspection } from "../../services/api";

export default function InspectionHub({ farm, onInspectionComplete, onNavigateToMap }) {
  const [source, setSource] = useState("Drone Orthomosaic");
  const [targetModule, setTargetModule] = useState("R12-C37");
  const [defectHint, setDefectHint] = useState("Thermal Hotspot");
  const [analyzing, setAnalyzing] = useState(false);
  const [progressStage, setProgressStage] = useState(4);
  const [inspectionResult, setInspectionResult] = useState(null);

  const sources = [
    { id: "Smartphone RGB", label: "Smartphone / RGB", sub: "GSD: 0.5cm/px", icon: Smartphone },
    { id: "Handheld Thermal", label: "Handheld Thermal", sub: "Res: 640x480", icon: Thermometer },
    { id: "Vehicle Camera", label: "Vehicle Camera", sub: "Multi-angle", icon: Car },
    { id: "Drone Orthomosaic", label: "Drone Orthomosaic", sub: "IR + RGB fused", icon: Plane },
  ];

  const handleStartAnalysis = async () => {
    if (!farm) return;
    setAnalyzing(true);
    setInspectionResult(null);
    setProgressStage(1);

    setTimeout(() => setProgressStage(2), 250);
    setTimeout(() => setProgressStage(3), 500);
    setTimeout(() => setProgressStage(4), 750);

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
      }, 1000);
    } catch (err) {
      console.error(err);
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-6 md:p-12 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display-lg text-display-lg text-primary tracking-tight font-bold">
          Multi-Source AI Inspection Studio
        </h1>
        <p className="font-body-lg text-body-lg text-secondary mt-1 max-w-3xl">
          Configure data ingestion modalities and run diagnostic engines for sub-module defect detection.
        </p>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input / Config (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6 border-r border-border-subtle pr-8">
          <section>
            <h2 className="font-label-caps text-label-caps text-secondary tracking-[0.1em] mb-3 border-b border-border-subtle pb-2 uppercase">
              1. DATA SOURCE SELECTION
            </h2>

            {/* Device Grid */}
            <div className="grid grid-cols-2 gap-2">
              {sources.map((s) => {
                const Icon = s.icon;
                const isSelected = source === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSource(s.id);
                      if (s.id === "Handheld Thermal" || s.id === "Drone Orthomosaic") setDefectHint("Thermal Hotspot");
                      else setDefectHint("Heavy Soiling");
                    }}
                    className={`flex flex-col items-start p-4 transition-colors text-left relative ${
                      isSelected
                        ? "bg-surface-container-lowest border-2 border-border-strong shadow-sm"
                        : "bg-surface-bright border border-border-subtle hover:bg-surface-container-low"
                    }`}
                  >
                    {isSelected && <div className="absolute top-2 right-2 w-2 h-2 bg-primary" />}
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-primary" : "text-secondary"}`} />
                    <span className="font-body-sm text-body-sm font-semibold text-primary">{s.label}</span>
                    <span className="font-mono-data text-mono-data text-secondary text-[11px] mt-1 font-bold">{s.sub}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <label className="block font-label-caps text-label-caps text-secondary tracking-[0.1em] mb-1 uppercase">
              TARGET COORDINATES
            </label>
            <div className="relative w-full">
              <input
                type="text"
                value={targetModule}
                onChange={(e) => setTargetModule(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-border-strong focus:border-b-2 focus:ring-0 px-0 py-2 font-mono-data text-mono-data text-primary placeholder:text-secondary outline-none transition-all font-bold text-sm"
                placeholder="Enter Grid ID"
              />
            </div>
          </section>

          <section>
            <div 
              onClick={handleStartAnalysis}
              className="border border-dashed border-border-strong p-8 flex flex-col items-center justify-center text-center bg-surface-bright hover:bg-surface-container-low cursor-pointer transition-colors"
            >
              <Upload className="w-8 h-8 text-secondary mb-2" />
              <span className="font-body-md text-body-md font-semibold text-primary">Drop inspection assets here</span>
              <span className="font-body-sm text-body-sm text-secondary mt-1">TIFF, RJPEG, or CSV (Max 5GB)</span>
            </div>
          </section>

          <div className="mt-auto pt-4">
            <button
              onClick={handleStartAnalysis}
              disabled={analyzing}
              className="w-full bg-primary text-on-primary font-body-md text-body-md font-semibold py-4 px-6 border border-primary hover:bg-surface-container-lowest hover:text-primary transition-colors flex items-center justify-between uppercase tracking-wider font-bold"
            >
              <span>{analyzing ? "ANALYZING DIAGNOSTIC ENGINE..." : "RUN AI DIAGNOSTIC ENGINE"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Output / Pipeline (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <section>
            <div className="flex items-center justify-between mb-3 border-b border-border-subtle pb-2">
              <h2 className="font-label-caps text-label-caps text-secondary tracking-[0.1em] uppercase">
                2. DIAGNOSTIC PIPELINE STATUS
              </h2>
              <span className="font-mono-data text-mono-data text-primary text-[11px] flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 bg-primary inline-block animate-pulse" />
                Processing
              </span>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between w-full relative pt-2 pb-4">
              <div className="absolute left-0 top-4 w-full h-[1px] bg-border-subtle -z-10" />
              <div 
                style={{ width: `${(progressStage / 5) * 100}%` }}
                className="absolute left-0 top-4 h-[1px] bg-border-strong -z-10 transition-all duration-500" 
              />

              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2 bg-surface-container-lowest px-2">
                <div className={`w-4 h-4 rounded-none border-2 border-border-strong flex items-center justify-center ${progressStage >= 1 ? "bg-border-strong text-on-primary" : "bg-surface-container-lowest"}`}>
                  {progressStage >= 1 && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
                <span className="font-mono-data text-[10px] text-primary font-bold">INGEST</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2 bg-surface-container-lowest px-2">
                <div className={`w-4 h-4 rounded-none border-2 border-border-strong flex items-center justify-center ${progressStage >= 2 ? "bg-border-strong text-on-primary" : "bg-surface-container-lowest"}`}>
                  {progressStage >= 2 && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
                <span className="font-mono-data text-[10px] text-primary font-bold">SEGMENT</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2 bg-surface-container-lowest px-2">
                <div className={`w-4 h-4 rounded-none border-2 border-border-strong flex items-center justify-center ${progressStage >= 3 ? "bg-border-strong text-on-primary" : "bg-surface-container-lowest"}`}>
                  {progressStage >= 3 && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
                <span className="font-mono-data text-[10px] text-primary font-bold">CLASSIFY</span>
              </div>

              {/* Step 4 (Current) */}
              <div className="flex flex-col items-center gap-2 bg-surface-container-lowest px-2">
                <div className={`w-4 h-4 rounded-none border-2 border-border-strong flex items-center justify-center ${progressStage >= 4 ? "bg-border-strong text-on-primary" : "bg-surface-container-lowest"}`}>
                  {progressStage >= 4 ? <Check className="w-2.5 h-2.5 text-white" /> : <div className="w-full h-full bg-border-strong animate-pulse" />}
                </div>
                <span className="font-mono-data text-[10px] text-primary font-bold">XAI HEATMAP</span>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center gap-2 bg-surface-container-lowest px-2">
                <div className={`w-4 h-4 rounded-none border flex items-center justify-center ${progressStage >= 5 ? "bg-border-strong text-on-primary border-border-strong" : "border-border-subtle bg-surface-container-lowest"}`}>
                  {progressStage >= 5 && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
                <span className={`font-mono-data text-[10px] ${progressStage >= 5 ? "text-primary font-bold" : "text-secondary"}`}>
                  SYNC GRID
                </span>
              </div>
            </div>
          </section>

          {/* Visualization Panel */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Raw Image */}
            <div className="border border-border-subtle bg-surface-bright flex flex-col h-72">
              <div className="border-b border-border-subtle p-2.5 flex justify-between items-center bg-surface-container-lowest">
                <span className="font-mono-data text-[11px] text-primary font-semibold">SRC: THERMAL_RAW</span>
                <ZoomIn className="w-3.5 h-3.5 text-secondary" />
              </div>
              <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={inspectionResult ? inspectionResult.processed_image_base64 : "https://lh3.googleusercontent.com/aida-public/AB6AXuAqeU7DSzlvddCT3qMbbrhxwnm_8u7aA-jR1bHo_tU-dxY462XPpfjDv30RCD5kgulAN7ibYzWnb253pKefQgPHdbkFA7bCX9TeQ8gScR69NwfRCJNmFLnLC17KXS02cvmKvGBbRHP5dTsw-HxOoCFQTsQXzkV3iP9Ixk1PQnNEvAc9G0QJNBz4nhXFOVQkO6LOob9AafE2iw_YcYSt3uE0kRYjAeJlhgaZ7x8oyZXvz9WzW8cS3FPB"}
                  alt="Raw Thermal Scan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* AI Heatmap */}
            <div className="border border-border-strong bg-surface-bright flex flex-col h-72 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b border-border-strong p-2.5 flex justify-between items-center bg-surface-container-lowest z-10">
                <span className="font-mono-data text-[11px] text-primary font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-error inline-block animate-pulse" />
                  LAYER: GRAD-CAM
                </span>
                <Layers className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center z-10">
                <img
                  src={inspectionResult ? inspectionResult.xai_heatmap_base64 : "https://lh3.googleusercontent.com/aida-public/AB6AXuBog3iXw9pkAcDSPVmOqVKN8NCtYJNZpF5oLLfIMzTsGCgDu9DOI5z2sTm1k6cnWPw8LOJk0xt7f_TF6KkwVmiHvvoTVdflUMCTPI2GnyJoemgqF-kkakn-XddoVdv3BhrL7KA5hpkOF7VJ19_PcaaxOH7OZ9l0qLBi1KZmVoMc4YxTqwABLlUyOVixQGRbGFhvQXv5nvwllG5n4ft2cbnqq0NFQSbkiOeMJKPGC28eSq7H6LxdVe11"}
                  alt="AI Heatmap"
                  className="w-full h-full object-cover"
                />

                {/* Bounding Box Annotation */}
                <div className="absolute top-[30%] left-[40%] w-24 h-16 border-2 border-error bg-error/15 flex items-start justify-end p-0.5 pointer-events-none">
                  <span className="bg-error text-on-error font-mono-data text-[9px] px-1 font-bold leading-tight">
                    ANOMALY_01
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Engineering Findings */}
          <section className="border border-border-strong bg-surface-container-lowest p-5 relative">
            {/* Structural Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-border-strong" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-border-strong" />

            <h3 className="font-label-caps text-label-caps text-secondary mb-3 flex items-center gap-2 uppercase tracking-wider font-bold">
              <Brain className="w-3.5 h-3.5 text-primary" />
              ENGINEERING RATIONALE
            </h3>

            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between border-b border-border-subtle pb-2">
                <span className="font-body-sm text-body-sm text-secondary">Primary Classification</span>
                <span className="font-mono-data text-mono-data font-bold text-primary">
                  {inspectionResult ? inspectionResult.defect_detected.type.toUpperCase() : "THERMAL HOTSPOT (CELL LEVEL)"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div>
                  <span className="block font-mono-data text-[10px] text-secondary mb-1 uppercase">DELTA T (ΔT)</span>
                  <span className="font-mono-data text-lg text-error font-bold flex items-center gap-1">
                    <span className="w-3.5 h-3.5 border border-error flex items-center justify-center text-[10px] font-bold">!</span>
                    +{inspectionResult ? inspectionResult.defect_detected.temperature_delta_c : "18.4"}°C
                  </span>
                </div>

                <div>
                  <span className="block font-mono-data text-[10px] text-secondary mb-1 uppercase">EST. YIELD LOSS</span>
                  <span className="font-mono-data text-lg text-primary font-bold">
                    {inspectionResult ? inspectionResult.energy_impact_kwh : "1.42"} <span className="text-xs font-sans font-normal">kWh/d</span>
                  </span>
                </div>

                <div>
                  <span className="block font-mono-data text-[10px] text-secondary mb-1 uppercase">REVENUE DELTA</span>
                  <span className="font-mono-data text-lg text-primary font-bold">
                    ${inspectionResult ? inspectionResult.monetary_impact_usd : "0.12"} <span className="text-xs font-sans font-normal">/d</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-auto">
            <button
              onClick={onNavigateToMap}
              className="w-full bg-surface-container-lowest text-primary font-body-md text-body-md font-semibold py-3.5 px-6 border border-border-strong hover:bg-surface-container-low transition-colors flex items-center justify-between group uppercase tracking-wider font-bold"
            >
              <span>LOCATE ON DIGITAL TWIN GRID</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
