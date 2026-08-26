import React, { useState, useEffect } from "react";
import { 
  Plane, 
  Camera, 
  Thermometer, 
  Car, 
  Sparkles, 
  Brain, 
  Layers, 
  ArrowRight, 
  Activity, 
  ShieldAlert, 
  Wrench, 
  CheckCircle2, 
  Eye, 
  Compass, 
  Sun, 
  Wind, 
  Database, 
  DollarSign,
  Zap,
  Download,
  FileText,
  Sliders,
  Scan,
  Maximize2,
  Lock,
  Moon,
  Flame,
  Radio,
  Clock,
  TrendingUp,
  Cpu
} from "lucide-react";

export default function InspectionHub({ farm, onNavigateToMap, onInspectionComplete }) {
  // Selected Hardware Source: 'drone' | 'handheld' | 'flir' | 'rover'
  const [selectedSourceId, setSelectedSourceId] = useState("drone");
  // Active Multispectral Diagnostic Layer: 'thermal' | 'rgb' | 'el' | 'xai'
  const [activeLayer, setActiveLayer] = useState("xai");
  const [selectedAnomalyIdx, setSelectedAnomalyIdx] = useState(0);
  const [showExportModal, setShowExportModal] = useState(false);

  // Live Radiometric Pixel Probe Hover State
  const [hoverPixelTemp, setHoverPixelTemp] = useState(null);

  // Hardware Sources & Multispectral Data Streams
  const hardwareSources = [
    {
      id: "drone",
      name: "Aerial UAV Radiometric Drone",
      hardware: "DJI Matrice 350 RTK + Zenmuse H20T Radiometric LWIR",
      mission_id: "MIS-8492-UAV",
      captured_at: "Today, 09:30 AM",
      operator: "Capt. A. Nair (Certified Level-III UAV Pilot #8492)",
      coverage: "1,200 Modules (Sector 4 West Array)",
      resolution: "0.5 cm/px GSD Orthomosaic",
      altitude: "35.0 m AGL",
      speed: "4.2 m/s",
      irradiance: "942 W/m² (Optimal)",
      ambient_temp: "34.2°C",
      emissivity: "0.92 (Silicon/Tempered Glass)",
      icon: Plane,
      tag: "AERIAL RADIOMETRIC",
      anomalies: [
        {
          id: "ANOM-01",
          target: "R12-C37",
          inverter: "INV-04",
          string: "STR-08",
          type: "Bypass Diode Thermal Runaway",
          severity: "Critical",
          iec_class: "IEC 62446-3 Class 1 Critical Thermal Anomaly",
          t_max: "78.4°C",
          t_min: "42.1°C",
          t_ambient: "34.0°C",
          deltaT: "+18.4°C",
          loss_kwh: 1.42,
          loss_voltage: "-18.2 V MPPT Drop",
          annual_loss_inr: "₹44,050",
          annual_loss_usd: "$528",
          affected_region: "Upper-Right Sub-String Bypass Diode Box (Cell 8)",
          electrical_effect: "Severe localized reverse-bias dissipation. Bypass Schottky diode p-n junction short-circuit active. Sub-string shunt resistance collapsed to 0.04 Ω.",
          repair_action: "Replace sub-string Schottky bypass diode (15SQ045) & torque junction box cover to 1.8 Nm.",
          safety_caution: "HIGH ARC FLASH HAZARD (>600V DC). Lockout/Tagout Inverter INV-04 DC Combiner before contact.",
          confidence: 99.2,
          box: { x: 35, y: 15, w: 38, h: 48 }
        },
        {
          id: "ANOM-02",
          target: "R04-C18",
          inverter: "INV-02",
          string: "STR-03",
          type: "Ribbon Lead Solder Burnout",
          severity: "Critical",
          iec_class: "IEC 62446-3 Class 1 Hotspot Escalation",
          t_max: "84.5°C",
          t_min: "41.8°C",
          t_ambient: "34.0°C",
          deltaT: "+24.5°C",
          loss_kwh: 1.58,
          loss_voltage: "-21.4 V MPPT Drop",
          annual_loss_inr: "₹48,900",
          annual_loss_usd: "$586",
          affected_region: "Center Silver Busbar Ribbon Joint",
          electrical_effect: "Discontinuity in primary silver busbar lead creating extreme localized resistive arc heating (+24.5°C hotspot).",
          repair_action: "Isolate string and bridge internal ribbon conductor with low-melt silver solder.",
          safety_caution: "Fire hazard risk. Isolate string combiner with 1000V dielectric gloves.",
          confidence: 98.7,
          box: { x: 42, y: 22, w: 32, h: 42 }
        }
      ]
    },
    {
      id: "handheld",
      name: "Field Handheld Camera",
      hardware: "High-GSD Field Optical & Macro Inspection Rig",
      mission_id: "MIS-8482-CAM",
      captured_at: "Today, 11:15 AM",
      operator: "Tech #04 (R. Sharma - Level-II Field Specialist)",
      coverage: "Strings 1-8 (Sector 4 Close-Up Diagnostics)",
      resolution: "0.1 mm/px Macro Resolution",
      altitude: "1.2 m Ground Standoff",
      speed: "Manual Calibrated Sweep",
      irradiance: "945 W/m²",
      ambient_temp: "35.1°C",
      emissivity: "0.92",
      icon: Camera,
      tag: "FIELD HANDHELD RIG",
      anomalies: [
        {
          id: "ANOM-03",
          target: "R07-C45",
          inverter: "INV-05",
          string: "STR-11",
          type: "Wafer Busbar Microcrack & Cell Shunt",
          severity: "High",
          iec_class: "IEC TS 60904-13 Inactive Cell Defect",
          t_max: "56.2°C",
          t_min: "42.0°C",
          t_ambient: "35.1°C",
          deltaT: "+4.2°C",
          loss_kwh: 0.88,
          loss_voltage: "-9.4 V Sub-String Deficit",
          annual_loss_inr: "₹27,300",
          annual_loss_usd: "$328",
          affected_region: "Center Cell #14 Main Busbars 2 & 3",
          electrical_effect: "Mechanical micro-fissure traversing metallization fingers. Localized current constriction active with inactive crystal island.",
          repair_action: "Micro-soldering bridge on fractured silver fingers and apply elastomeric UV edge sealant.",
          safety_caution: "Fragile frontsheet glass. Use vacuum lifters; do not apply localized mechanical point pressure.",
          confidence: 97.8,
          box: { x: 28, y: 25, w: 46, h: 38 }
        },
        {
          id: "ANOM-04",
          target: "R18-C52",
          inverter: "INV-06",
          string: "STR-14",
          type: "Silver Finger Snail Trail Ingress",
          severity: "Low",
          iec_class: "IEC 61215 Degradation Notice",
          t_max: "45.8°C",
          t_min: "42.5°C",
          t_ambient: "35.1°C",
          deltaT: "+0.8°C",
          loss_kwh: 0.25,
          loss_voltage: "-2.1 V Minor Ingress",
          annual_loss_inr: "₹4,200",
          annual_loss_usd: "$50",
          affected_region: "Frontsheet Silver Fingers (Lower Cell Grid)",
          electrical_effect: "Moisture and CO₂ permeation causing silver nanoparticle dissolution. Discoloration stabilized without bypass activation.",
          repair_action: "No immediate replacement required. Log for quarterly degradation tracking.",
          safety_caution: "Ensure edge sealant integrity during next scheduled washing cycle.",
          confidence: 96.2,
          box: { x: 22, y: 38, w: 54, h: 32 }
        }
      ]
    },
    {
      id: "flir",
      name: "Handheld Spot Radiometer (FLIR)",
      hardware: "FLIR T865 640x480 Calibrated Precision Radiometer",
      mission_id: "MIS-8488-FLIR",
      captured_at: "Today, 10:00 AM",
      operator: "Capt. A. Nair (Certified Level-III Thermographer)",
      coverage: "Inverters INV-03 & INV-04 Combiner Junctions",
      resolution: "NETD < 30 mK Thermal Sensitivity",
      altitude: "Spot Ground Diagnostic",
      speed: "Calibrated 3-Point Thermogram",
      irradiance: "940 W/m²",
      ambient_temp: "34.0°C",
      emissivity: "0.92 · Reflected Temp 22.4°C",
      icon: Thermometer,
      tag: "PRECISION RADIOMETRY",
      anomalies: [
        {
          id: "ANOM-05",
          target: "R12-C37",
          inverter: "INV-04",
          string: "STR-08",
          type: "Severe Sub-string Reverse Bias Runaway",
          severity: "Critical",
          iec_class: "IEC 62446-3 Class 1 Critical Runaway",
          t_max: "78.4°C",
          t_min: "42.1°C",
          t_ambient: "34.0°C",
          deltaT: "+18.4°C",
          loss_kwh: 1.42,
          loss_voltage: "-18.2 V Drop",
          annual_loss_inr: "₹44,050",
          annual_loss_usd: "$528",
          affected_region: "Upper-Right Cell Matrix Sub-string L3",
          electrical_effect: "Direct spot thermography confirmed +18.4°C localized thermal runaway. Diode p-n junction short-circuit active.",
          repair_action: "Replace sub-string Schottky bypass diode (15SQ045) & reseal junction box to 1.8 Nm.",
          safety_caution: "Lockout/Tagout DC-04 combiner before contact. Arc flash shield mandatory.",
          confidence: 99.4,
          box: { x: 35, y: 15, w: 38, h: 48 }
        }
      ]
    },
    {
      id: "rover",
      name: "Autonomous Solar Rover Bot",
      hardware: "SolarRover Autonomous All-Terrain Crawler Bot",
      mission_id: "MIS-8469-ROV",
      captured_at: "Yesterday, 04:30 PM",
      operator: "Autonomous Rover Controller (Zero-Pilot Tele-Nav)",
      coverage: "Sector 4 Array Tracker Rows 1-20 Under-Carriage",
      resolution: "4K Multi-Angle Tilt & LiDAR Ingestion",
      altitude: "On-Track Frame Crawler",
      speed: "1.5 m/s",
      irradiance: "890 W/m²",
      ambient_temp: "32.4°C",
      emissivity: "0.92",
      icon: Car,
      tag: "GROUND ROVER BOT",
      anomalies: [
        {
          id: "ANOM-06",
          target: "R15-C22",
          inverter: "INV-01",
          string: "STR-02",
          type: "Heavy Desert Sand Encrustation & Soiling",
          severity: "Medium",
          iec_class: "IEC 61724-1 Soiling Ratio Deficit",
          t_max: "46.2°C",
          t_min: "41.8°C",
          t_ambient: "32.4°C",
          deltaT: "+1.2°C",
          loss_kwh: 0.65,
          loss_voltage: "-6.8 V Optical Attenuation",
          annual_loss_inr: "₹35,680",
          annual_loss_usd: "$428",
          affected_region: "Lower Cell Matrix Front Tempered Glass",
          electrical_effect: "Heavy silica sand accumulation reducing optical transmission by 24.2%. Current generation constrained across sub-string.",
          repair_action: "Deploy autonomous robotic dry-brush cleaning unit with deionized water rinse.",
          safety_caution: "Ensure tracker table is locked at 0° horizontal stow before placing cleaning unit.",
          confidence: 98.4,
          box: { x: 18, y: 35, w: 64, h: 46 }
        }
      ]
    }
  ];

  const currentSource = hardwareSources.find(s => s.id === selectedSourceId) || hardwareSources[0];
  const currentAnomaly = currentSource.anomalies[selectedAnomalyIdx] || currentSource.anomalies[0];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header & Hardware Modality Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              MULTI-SOURCE AI STUDIO · 4 HARDWARE MODALITIES
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Radiometric Thermal IR · High-GSD RGB · EL Wafer Tomography · Grad-CAM XAI
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Multi-Source Sensor Telemetry & Multispectral AI Diagnostics
          </h1>
        </div>

        {/* 4 Hardware Source Switcher (Renamed Smartphone to Field Handheld Camera) */}
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
                className={`px-3 py-1.5 font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected 
                    ? "bg-primary text-white shadow-xs" 
                    : "bg-surface text-secondary hover:text-primary hover:bg-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-warning" : "text-primary"}`} />
                <span>{source.name.split(" (")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Hardware Metadata & Calibrated Telemetry Strip */}
      <div className="border border-border-strong bg-white p-4 font-mono-data text-xs shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <span className="text-secondary text-[10px] uppercase font-bold block">Hardware Ingested:</span>
            <strong className="text-primary block truncate mt-0.5">{currentSource.hardware}</strong>
          </div>
          <div>
            <span className="text-secondary text-[10px] uppercase font-bold block">Mission & Timestamp:</span>
            <strong className="text-primary block mt-0.5">{currentSource.mission_id} · {currentSource.captured_at}</strong>
          </div>
          <div>
            <span className="text-secondary text-[10px] uppercase font-bold block">Calibrated GSD Resolution:</span>
            <strong className="text-[#027a48] block mt-0.5">{currentSource.resolution}</strong>
          </div>
          <div>
            <span className="text-secondary text-[10px] uppercase font-bold block">Solar Irradiance (GHI):</span>
            <strong className="text-primary block mt-0.5">{currentSource.irradiance}</strong>
          </div>
          <div>
            <span className="text-secondary text-[10px] uppercase font-bold block">Ambient / Emissivity:</span>
            <strong className="text-primary block mt-0.5">{currentSource.ambient_temp} (ε = 0.92)</strong>
          </div>
          <div>
            <span className="text-secondary text-[10px] uppercase font-bold block">Operator In Charge:</span>
            <strong className="text-primary block truncate mt-0.5">{currentSource.operator}</strong>
          </div>
        </div>
      </div>

      {/* 3. Main Two-Column Multispectral Diagnostic Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
        
        {/* Left Column: Interactive Multispectral Viewport (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-primary bg-white p-5 space-y-4 shadow-xs">
            
            {/* Multispectral Layer Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-3 gap-2">
              <span className="font-bold text-primary uppercase text-xs flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-primary" />
                <span>MULTISPECTRAL EVIDENCE LAYER:</span>
              </span>

              <div className="flex items-center gap-1 bg-surface p-1 border border-border-subtle">
                <button
                  onClick={() => setActiveLayer("xai")}
                  className={`px-2.5 py-1 font-bold text-[10px] uppercase transition-all cursor-pointer ${
                    activeLayer === "xai" ? "bg-primary text-white shadow-xs" : "text-secondary hover:text-primary"
                  }`}
                >
                  1. Grad-CAM XAI
                </button>
                <button
                  onClick={() => setActiveLayer("thermal")}
                  className={`px-2.5 py-1 font-bold text-[10px] uppercase transition-all cursor-pointer ${
                    activeLayer === "thermal" ? "bg-[#d97706] text-white shadow-xs" : "text-secondary hover:text-primary"
                  }`}
                >
                  2. Radiometric IR
                </button>
                <button
                  onClick={() => setActiveLayer("rgb")}
                  className={`px-2.5 py-1 font-bold text-[10px] uppercase transition-all cursor-pointer ${
                    activeLayer === "rgb" ? "bg-[#027a48] text-white shadow-xs" : "text-secondary hover:text-primary"
                  }`}
                >
                  3. High-GSD RGB
                </button>
                <button
                  onClick={() => setActiveLayer("el")}
                  className={`px-2.5 py-1 font-bold text-[10px] uppercase transition-all cursor-pointer ${
                    activeLayer === "el" ? "bg-[#6366f1] text-white shadow-xs" : "text-secondary hover:text-primary"
                  }`}
                >
                  4. EL Wafer
                </button>
              </div>
            </div>

            {/* Multispectral Canvas Viewport */}
            <div 
              className="relative border-2 border-border-strong bg-[#050811] h-84 overflow-hidden flex items-center justify-center p-4 cursor-crosshair"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                // Radiometric Temperature calculation based on hotspot location
                const distToHotspot = Math.sqrt(Math.pow(x - 54, 2) + Math.pow(y - 39, 2));
                const temp = Math.max(38.2, 78.4 - distToHotspot * 0.85).toFixed(1);
                setHoverPixelTemp({ x: e.clientX - rect.left, y: e.clientY - rect.top, temp });
              }}
              onMouseLeave={() => setHoverPixelTemp(null)}
            >
              <svg viewBox="0 0 540 260" className="w-full h-full">
                
                {/* 1. LAYER: RADIOMETRIC IR IRONBOW */}
                {activeLayer === "thermal" && (
                  <g>
                    {/* Dark Blue Base Temperature (42°C) */}
                    <rect x="30" y="20" width="480" height="220" fill="#0f172a" stroke="#334155" rx="3" />
                    
                    {/* Solar Panel Cells in Ironbow Palette */}
                    {Array.from({ length: 6 }, (_, row) =>
                      Array.from({ length: 12 }, (_, col) => {
                        const cx = 45 + col * 38;
                        const cy = 32 + row * 34;
                        const isHotspot = (row === 1 || row === 2) && (col === 4 || col === 5);
                        
                        return (
                          <rect
                            key={`${row}-${col}`}
                            x={cx}
                            y={cy}
                            width="34"
                            height="30"
                            fill={isHotspot ? "#dc2626" : (row === 2 ? "#d97706" : "#1e3a8a")}
                            stroke="#0f172a"
                            strokeWidth="1"
                            opacity={isHotspot ? "0.95" : "0.75"}
                          />
                        );
                      })
                    )}

                    {/* Radiometric Hotspot Glow (Ironbow Concentric Rings) */}
                    <circle cx="215" cy="100" r="48" fill="rgba(239, 68, 68, 0.45)" />
                    <circle cx="215" cy="100" r="30" fill="rgba(245, 158, 11, 0.75)" />
                    <circle cx="215" cy="100" r="14" fill="#ffffff" className="animate-pulse" />
                    <text x="235" y="95" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">T_max: 78.4°C</text>
                    <text x="235" y="112" fill="#fca5a5" fontSize="10" fontFamily="monospace">ΔT: +18.4°C Runaway</text>
                  </g>
                )}

                {/* 2. LAYER: HIGH-GSD OPTICAL RGB */}
                {activeLayer === "rgb" && (
                  <g>
                    {/* Silicon PV Dark Blue Glass */}
                    <rect x="30" y="20" width="480" height="220" fill="#1e293b" stroke="#475569" rx="3" />

                    {Array.from({ length: 6 }, (_, row) =>
                      Array.from({ length: 12 }, (_, col) => {
                        const cx = 45 + col * 38;
                        const cy = 32 + row * 34;
                        const isDefect = row === 1 && col === 4;

                        return (
                          <g key={`${row}-${col}`}>
                            <rect
                              x={cx}
                              y={cy}
                              width="34"
                              height="30"
                              fill="#091e3a"
                              stroke="#334155"
                              strokeWidth="0.75"
                            />
                            {/* Busbar Silver Ribbons */}
                            <line x1={cx + 17} y1={cy} x2={cx + 17} y2={cy + 30} stroke="#cbd5e1" strokeWidth="0.8" />
                            {isDefect && (
                              <circle cx={cx + 17} cy={cy + 15} r="6" fill="#b91c1c" stroke="#fca5a5" strokeWidth="1.5" />
                            )}
                          </g>
                        );
                      })
                    )}

                    <text x="50" y="45" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">0.5 cm/px True-Color Optical RGB</text>
                    <text x="50" y="65" fill="#cbd5e1" fontSize="10" fontFamily="monospace">Physical Solder Lead Fracture Visible</text>
                  </g>
                )}

                {/* 3. LAYER: ELECTROLUMINESCENCE (EL) WAFER TOMOGRAPHY */}
                {activeLayer === "el" && (
                  <g>
                    <rect x="30" y="20" width="480" height="220" fill="#030712" stroke="#4f46e5" rx="3" />
                    
                    {Array.from({ length: 6 }, (_, row) =>
                      Array.from({ length: 12 }, (_, col) => {
                        const cx = 45 + col * 38;
                        const cy = 32 + row * 34;
                        const isShunted = (row === 1 && col === 4) || (row === 3 && col === 8);

                        return (
                          <g key={`${row}-${col}`}>
                            <rect
                              x={cx}
                              y={cy}
                              width="34"
                              height="30"
                              fill={isShunted ? "#020617" : "rgba(224, 231, 255, 0.85)"}
                              stroke="#1e1b4b"
                              strokeWidth="0.5"
                            />
                            <line x1={cx + 17} y1={cy} x2={cx + 17} y2={cy + 30} stroke="#6366f1" strokeWidth="0.6" />
                            {isShunted && (
                              <path d={`M ${cx+4} ${cy+6} L ${cx+16} ${cy+18} L ${cx+30} ${cy+22}`} stroke="#ef4444" strokeWidth="1.5" fill="none" className="animate-pulse" />
                            )}
                          </g>
                        );
                      })
                    )}

                    <text x="50" y="45" fill="#818cf8" fontSize="11" fontWeight="bold" fontFamily="monospace">1150 nm Near-Infrared EL Luminescence</text>
                    <text x="50" y="65" fill="#a5b4fc" fontSize="10" fontFamily="monospace">Inactive Crystal Microcrack Shunt Detected</text>
                  </g>
                )}

                {/* 4. LAYER: GRAD-CAM XAI EXPLAINABLE ATTENTION HEATMAP */}
                {activeLayer === "xai" && (
                  <g>
                    <rect x="30" y="20" width="480" height="220" fill="#0a0f1d" stroke="#3b82f6" rx="3" />
                    
                    {/* Underlying Panel Grid */}
                    {Array.from({ length: 6 }, (_, row) =>
                      Array.from({ length: 12 }, (_, col) => {
                        const cx = 45 + col * 38;
                        const cy = 32 + row * 34;
                        return (
                          <rect
                            key={`${row}-${col}`}
                            x={cx}
                            y={cy}
                            width="34"
                            height="30"
                            fill="#1e293b"
                            stroke="#334155"
                            strokeWidth="0.5"
                          />
                        );
                      })
                    )}

                    {/* Grad-CAM Gaussian Activation Attention Mask */}
                    <circle cx="215" cy="100" r="55" fill="rgba(239, 68, 68, 0.55)" />
                    <circle cx="215" cy="100" r="35" fill="rgba(234, 179, 8, 0.75)" />
                    <circle cx="215" cy="100" r="16" fill="rgba(255, 255, 255, 0.95)" />

                    {/* AI Bounding Box with Corner Reticles */}
                    <rect x="175" y="65" width="85" height="75" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />
                    <rect x="175" y="45" width="130" height="20" fill="#ef4444" />
                    <text x="180" y="59" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">99.2% DIODE DEFECT</text>
                  </g>
                )}
              </svg>

              {/* Hover Pixel Probe Tooltip */}
              {hoverPixelTemp && (
                <div 
                  className="absolute pointer-events-none bg-black/90 border border-white text-white px-2 py-1 text-[10px] font-mono-data rounded-xs shadow-lg flex items-center gap-1.5"
                  style={{ left: `${hoverPixelTemp.x + 12}px`, top: `${hoverPixelTemp.y - 25}px` }}
                >
                  <Thermometer className="w-3 h-3 text-warning" />
                  <span>Spot: <strong className="text-warning">{hoverPixelTemp.temp}°C</strong></span>
                </div>
              )}

              {/* Viewport Floating Info Bar */}
              <div className="absolute bottom-2 left-2 bg-black/85 border border-border-strong px-3 py-1 text-[10px] text-white flex items-center gap-4">
                <span>Target: <strong className="text-[#38bdf8]">{currentAnomaly.target}</strong></span>
                <span>Inverter: <strong className="text-white">{currentAnomaly.inverter}</strong></span>
                <span>Severity: <strong className="text-critical">{currentAnomaly.severity}</strong></span>
                <span>AI Confidence: <strong className="text-[#22c55e]">{currentAnomaly.confidence}%</strong></span>
              </div>
            </div>

            {/* Anomaly Selector Strip */}
            <div className="space-y-1.5">
              <span className="font-bold text-primary uppercase text-[10px] block">
                INGESTED ANOMALY QUEUE ({currentSource.anomalies.length} DETECTED):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentSource.anomalies.map((anom, idx) => (
                  <button
                    key={anom.id}
                    onClick={() => setSelectedAnomalyIdx(idx)}
                    className={`p-2.5 border text-left cursor-pointer transition-all flex justify-between items-center ${
                      selectedAnomalyIdx === idx 
                        ? "bg-primary text-white border-primary shadow-xs font-bold" 
                        : "bg-surface text-secondary border-border-subtle hover:border-primary hover:text-primary"
                    }`}
                  >
                    <div>
                      <strong className="block text-xs">{anom.id} · {anom.target}</strong>
                      <span className="text-[10px] block opacity-85">{anom.type}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-xs ${
                      anom.severity === "Critical" ? "bg-critical text-white" : "bg-warning text-primary"
                    }`}>
                      {anom.deltaT}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Radiometric Root-Cause & Certified Dossier (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Defect Diagnostics & Electrical Loss Breakdown */}
          <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-start border-b border-border-subtle pb-2">
              <div>
                <span className="text-critical font-bold text-[10px] uppercase block">{currentAnomaly.iec_class}</span>
                <strong className="text-primary text-sm font-bold block">{currentAnomaly.type}</strong>
              </div>
              <span className="bg-critical text-white px-2 py-0.5 text-[10px] font-bold uppercase">
                {currentAnomaly.severity}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-sans text-xs bg-surface p-3 border border-border-subtle">
              <div><span className="text-secondary">Peak Temp (T_max):</span> <strong className="font-mono-data text-critical block">{currentAnomaly.t_max}</strong></div>
              <div><span className="text-secondary">Thermal Delta (ΔT):</span> <strong className="font-mono-data text-critical block">{currentAnomaly.deltaT}</strong></div>
              <div><span className="text-secondary">Sub-String Loss:</span> <strong className="font-mono-data text-primary block">{currentAnomaly.loss_voltage}</strong></div>
              <div><span className="text-secondary">Annualized Deficit:</span> <strong className="font-mono-data text-critical block">{currentAnomaly.annual_loss_inr} / yr</strong></div>
            </div>

            {/* Engineering Root-Cause Description */}
            <div className="space-y-1.5 font-sans text-xs">
              <strong className="text-primary font-mono-data uppercase text-[11px] block">ELECTRICAL ROOT-CAUSE:</strong>
              <p className="text-secondary leading-relaxed bg-surface p-2.5 border border-border-subtle">
                {currentAnomaly.electrical_effect}
              </p>
            </div>

            {/* Level-III Repair Protocol */}
            <div className="space-y-1.5 font-sans text-xs">
              <strong className="text-[#027a48] font-mono-data uppercase text-[11px] block">LEVEL-III REPAIR PROTOCOL:</strong>
              <p className="text-primary leading-relaxed bg-[#f6fef9] p-2.5 border border-[#abefc6]">
                {currentAnomaly.repair_action}
              </p>
            </div>

            {/* Arc Flash Safety Warning */}
            <div className="p-2.5 bg-[#fef3f2] border border-critical/40 text-critical font-sans text-xs flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span><strong>SAFETY CAUTION:</strong> {currentAnomaly.safety_caution}</span>
            </div>

            {/* Export Evidence Dossier Button */}
            <button
              onClick={() => setShowExportModal(true)}
              className="w-full py-2.5 bg-primary text-white font-mono-data font-bold uppercase text-xs border border-primary hover:bg-white hover:text-primary transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT IEC 62446-3 EVIDENCE DOSSIER (PDF)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Export Certified Evidence Dossier Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-primary max-w-lg w-full p-6 space-y-4 shadow-xl font-mono-data text-xs animate-in fade-in">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary text-sm uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>CERTIFIED IEC 62446-3 EVIDENCE DOSSIER</span>
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
                Generating signed technical audit package for <strong>{currentAnomaly.target} ({currentAnomaly.inverter})</strong>. Includes calibrated radiometric ironbow thermograms, 0.5 cm/px RGB orthomosaics, and certified electrical loss models.
              </p>
              <div className="bg-surface p-3 border border-border-subtle font-mono-data text-[11px] space-y-1">
                <div>Document ID: <strong>DOSSIER-2026-{currentAnomaly.id}</strong></div>
                <div>Standard: <strong>IEC 62446-3 / IEC TS 60904-13</strong></div>
                <div>Audit Hash: <strong>SHA-256: 9f82...4c18</strong></div>
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
                  alert(`Dossier for ${currentAnomaly.target} downloaded successfully!`);
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
