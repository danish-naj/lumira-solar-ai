import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Layers, 
  Sun, 
  Flame, 
  Leaf, 
  Satellite, 
  Moon, 
  BatteryCharging, 
  Radio, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Activity, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  Clock, 
  Maximize2,
  DollarSign,
  Cpu,
  TrendingUp,
  LineChart,
  Target,
  Info,
  Calendar,
  Lock,
  Wifi
} from "lucide-react";

export default function BreakthroughLabs({ farm, onNavigateTab }) {
  // Active Lab Module: 'bifacial' | 'terrain' | 'fire' | 'carbon' | 'sar' | 'el' | 'bess' | 'dock' | 'cyber'
  const [activeLab, setActiveLab] = useState("bifacial");

  // State for Lab 1: Bifacial Albedo
  const [albedoValue, setAlbedoValue] = useState(0.28);
  const [frontGHI, setFrontGHI] = useState(942);

  // State for Lab 2: Terrain Backtracking
  const [terrainSlope, setTerrainSlope] = useState(3.5);
  const [trackerTilt, setTrackerTilt] = useState(42.5);

  // State for Lab 3: Thermal Runaway Cascade
  const [diodeTemp, setDiodeTemp] = useState(88.4);

  // State for Lab 4: Carbon Credit & Green Hydrogen
  const [carbonPriceINR, setCarbonPriceINR] = useState(1000);

  // State for Lab 6: EL Tomogram
  const [elExcitationCurrent, setElExcitationCurrent] = useState(9.8); // Amps

  // State for Lab 7: BESS Arbitrage
  const [gridSpotPrice, setGridSpotPrice] = useState(4.85);

  // State for Lab 8: Drone Nest Dock
  const [dockHatchOpen, setDockHatchOpen] = useState(false);

  // State for Lab 9: Cyber Defense
  const [cyberAlerts, setCyberAlerts] = useState([
    { id: "CYB-101", ip: "192.168.1.104", type: "Modbus/TCP Unauthorized Register Write (Holding Register 40012)", severity: "Blocked", time: "10 mins ago" },
    { id: "CYB-102", ip: "10.0.4.22", type: "Inverter Frequency Desync Pulse Injection", severity: "Quarantined", time: "25 mins ago" }
  ]);

  const labsMenu = [
    { id: "bifacial", name: "1. Bifacial Albedo Engine", icon: Layers, tag: "DUAL-SIDED PHYSICS" },
    { id: "terrain", name: "2. Terrain Backtracking AI", icon: Sun, tag: "SHADOW OPTIMIZER" },
    { id: "fire", name: "3. Fire Cascade Predictor", icon: Flame, tag: "THERMAL CASCADE" },
    { id: "carbon", name: "4. Carbon & Green H₂", icon: Leaf, tag: "I-REC & H2 YIELD" },
    { id: "sar", name: "5. Satellite SAR Subsidence", icon: Satellite, tag: "FOUNDATION RADAR" },
    { id: "el", name: "6. EL Night Wafer Tomography", icon: Moon, tag: "WAFER TOMOGRAPHY" },
    { id: "bess", name: "7. Spot BESS & VPP FFR", icon: BatteryCharging, tag: "GRID ARBITRAGE" },
    { id: "dock", name: "8. Drone Nest 24/7 Dock", icon: Radio, tag: "ZERO-PILOT HANGAR" },
    { id: "cyber", name: "9. SCADA Cyber Firewall", icon: ShieldCheck, tag: "INTRUSION SHIELD" },
  ];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-warning" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              LUMIRA QUANTUM LABS · 9 WORLD-FIRST INNOVATIONS
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Real-Time Telemetry · Active Progression · AI Predictive Intelligence
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Breakthrough Innovation Labs & Frontier Capabilities
          </h1>
        </div>

        <div className="border-2 border-primary bg-white px-3 py-1.5 font-mono-data text-xs shadow-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block animate-pulse" />
          <span className="font-bold text-primary">9 ACTIVE RESEARCH ENGINES</span>
        </div>
      </div>

      {/* 2. Innovation Labs Tab Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 font-mono-data text-xs">
        {labsMenu.map((lab) => {
          const Icon = lab.icon;
          const isSelected = activeLab === lab.id;
          return (
            <button
              key={lab.id}
              onClick={() => setActiveLab(lab.id)}
              className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between h-24 ${
                isSelected 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <div className="flex justify-between items-start">
                <Icon className={`w-4 h-4 ${isSelected ? "text-warning" : "text-primary"}`} />
                <span className={`text-[8px] uppercase font-bold px-1 py-0.2 ${isSelected ? "bg-white/20 text-white" : "bg-surface text-secondary"}`}>
                  {lab.tag.split(" ")[0]}
                </span>
              </div>
              <strong className="text-[11px] leading-tight block">{lab.name}</strong>
            </button>
          );
        })}
      </div>

      {/* 3. Interactive Lab Content Area */}
      <div className="border-2 border-primary bg-white p-6 shadow-xs font-mono-data text-xs space-y-6">

        {/* ========================================================================= */}
        {/* LAB 1: BIFACIAL ALBEDO GROUND REFLECTION & REAR-SIDE HEAT ENGINE          */}
        {/* ========================================================================= */}
        {activeLab === "bifacial" && (
          <div className="space-y-6">
            {/* 1. Feature Definition Header */}
            <div className="bg-[#f0fdf4] border-2 border-[#027a48] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#027a48] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#027a48] uppercase">What Is Bifacial Albedo Ground Reflection & Rear-Side Physics?</h3>
                </div>
                <span className="text-xs font-bold text-[#027a48]">IEC 60904-1-2 Standard</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> Dual-sided photovoltaic modeling that calculates both front-side direct solar irradiance and rear-side diffuse irradiance reflected from the desert terrain (ground albedo). It continuously optimizes energy yield and models rear-side thermal heating gradients to maximize overall plant power output.
              </p>
            </div>

            {/* 2. Real-Time Telemetry & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span>1. REAL-TIME TELEMETRY & CONTROLS:</span>
                </strong>
                <div className="space-y-2 font-sans text-xs">
                  <div>
                    <div className="flex justify-between mb-1"><span>Ground Albedo Factor (α):</span> <strong className="font-mono-data text-primary">{albedoValue} (Sand/Gravel)</strong></div>
                    <input type="range" min="0.15" max="0.40" step="0.01" value={albedoValue} onChange={(e) => setAlbedoValue(Number(e.target.value))} className="w-full accent-primary cursor-pointer" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><span>Front-Side Direct GHI:</span> <strong className="font-mono-data text-primary">{frontGHI} W/m²</strong></div>
                    <input type="range" min="400" max="1100" step="10" value={frontGHI} onChange={(e) => setFrontGHI(Number(e.target.value))} className="w-full accent-primary cursor-pointer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono-data text-[11px] bg-white p-2.5 border border-border-subtle">
                  <div><span className="text-secondary">Rear Irradiance:</span> <strong className="text-primary block">{Math.round(frontGHI * albedoValue)} W/m²</strong></div>
                  <div><span className="text-secondary">Instantaneous Boost:</span> <strong className="text-[#027a48] block">+{(albedoValue * 65).toFixed(1)}% MWh</strong></div>
                </div>
              </div>

              {/* 3. Ongoing Data & Active Trends */}
              <div className="border border-border-strong bg-white p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>2. ONGOING OPERATIONAL DATA (24-HOUR CYCLE):</span>
                </strong>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>24h Cumulative Bifacial Generation:</span>
                    <strong className="font-mono-data text-primary text-sm">45.8 MWh / day</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Weekly Albedo Degradation Rate:</span>
                    <strong className="font-mono-data text-warning text-sm">-0.003 α / week (Dust Ingress)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Rear-Side Thermal Offset:</span>
                    <strong className="font-mono-data text-primary text-sm">+2.4°C vs Single-Sided</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Predict Future Data */}
            <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>3. AI PREDICTIVE FORECASTING & ROI PROJECTIONS:</span>
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Next-7-Day Bifacial Gain:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">+19.2 MWh</strong>
                  <span className="text-secondary text-[10px]">Predicted solar window</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Optimal Resurfacing Date:</span>
                  <strong className="font-mono-data text-lg text-primary block mt-0.5">In 18 Days (14 Sep)</strong>
                  <span className="text-secondary text-[10px]">White gravel refresh trigger</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Projected Revenue Lift:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">+₹1.42 Lakhs / mo</strong>
                  <span className="text-secondary text-[10px]">Annualized: +₹17.04 Lakhs</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAB 2: 3D UNEVEN TERRAIN BACKTRACKING AI                                  */}
        {/* ========================================================================= */}
        {activeLab === "terrain" && (
          <div className="space-y-6">
            {/* 1. Feature Definition */}
            <div className="bg-[#eff8ff] border-2 border-[#175cd3] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#175cd3] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#175cd3] uppercase">What Is 3D Uneven Terrain Backtracking AI?</h3>
                </div>
                <span className="text-xs font-bold text-[#175cd3]">NEXTracker TrueCapture™ Model</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> An advanced algorithmic backtracking system that builds a high-resolution Digital Elevation Model (DEM) of uneven rolling terrain, calculating independent rotational slew angles for each individual row to completely eliminate mutual shadow casting during low sun angles (morning and evening).
              </p>
            </div>

            {/* 2. Real-Time Telemetry & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span>1. REAL-TIME TOPOGRAPHY & TRACKER CONTROLS:</span>
                </strong>
                <div className="space-y-2 font-sans text-xs">
                  <div>
                    <div className="flex justify-between mb-1"><span>Terrain Slope Gradient (θ_slope):</span> <strong className="font-mono-data text-primary">{terrainSlope}° (Rolling Dune)</strong></div>
                    <input type="range" min="0" max="8" step="0.5" value={terrainSlope} onChange={(e) => setTerrainSlope(Number(e.target.value))} className="w-full accent-primary cursor-pointer" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><span>Target Tracker Slew Angle:</span> <strong className="font-mono-data text-primary">{trackerTilt}° (Backtracked)</strong></div>
                    <input type="range" min="-60" max="60" step="1" value={trackerTilt} onChange={(e) => setTrackerTilt(Number(e.target.value))} className="w-full accent-primary cursor-pointer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono-data text-[11px] bg-white p-2.5 border border-border-subtle">
                  <div><span className="text-secondary">Mutual Shading Status:</span> <strong className="text-[#027a48] block">0.00% Zero-Shaded</strong></div>
                  <div><span className="text-secondary">TrueCapture™ Boost:</span> <strong className="text-[#027a48] block">+4.2% Daily MWh</strong></div>
                </div>
              </div>

              {/* 3. Ongoing Data */}
              <div className="border border-border-strong bg-white p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>2. ONGOING OPERATIONAL DATA (6-HOUR HORIZON):</span>
                </strong>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Active Tracker Drives Synchronized:</span>
                    <strong className="font-mono-data text-primary text-sm">48 Drivetrains (100% Online)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Torque Tube Mechanical Load:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">18.4% Maximum Limit</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Morning Backtracking Recovery:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">+2.8 MWh Saved Today</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Predict Future Data */}
            <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>3. AI PREDICTIVE FORECASTING & SHADOW TRAJECTORY:</span>
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Evening Sunset Shadow Forecast:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">17:15 - 18:00 Optimal</strong>
                  <span className="text-secondary text-[10px]">Zero clipping predicted</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Next 30-Day Energy Gain:</span>
                  <strong className="font-mono-data text-lg text-primary block mt-0.5">+48.5 MWh</strong>
                  <span className="text-secondary text-[10px]">Topography compensation</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Annualized Financial Lift:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">+₹16.08 Lakhs / yr</strong>
                  <span className="text-secondary text-[10px]">PPA tariff @ ₹2.44/kWh</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAB 3: THERMAL RUNAWAY & FIRE CASCADE PREDICTOR                            */}
        {/* ========================================================================= */}
        {activeLab === "fire" && (
          <div className="space-y-6">
            {/* 1. Feature Definition */}
            <div className="bg-[#fef3f2] border-2 border-critical p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-critical text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-critical uppercase">What Is Thermal Runaway & Fire Cascade Prediction?</h3>
                </div>
                <span className="text-xs font-bold text-critical">NFPA 855 / IEC 61730 Fire Safety</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> A real-time thermodynamic AI safety barrier that tracks bypass diode temperature escalation, predicting cascading thermal runaway before junction box temperatures breach the critical $145^\circ	ext{C}$ EVA backsheet ignition threshold. It triggers automated SCADA string circuit trips to prevent asset fire damage.
              </p>
            </div>

            {/* 2. Real-Time Telemetry & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span>1. REAL-TIME THERMAL TELEMETRY & CONTROLS:</span>
                </strong>
                <div className="space-y-2 font-sans text-xs">
                  <div>
                    <div className="flex justify-between mb-1"><span>Target Diode Junction Temp (T_j):</span> <strong className="font-mono-data text-critical">{diodeTemp}°C</strong></div>
                    <input type="range" min="45" max="160" step="1" value={diodeTemp} onChange={(e) => setDiodeTemp(Number(e.target.value))} className="w-full accent-critical cursor-pointer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono-data text-[11px] bg-white p-2.5 border border-border-subtle">
                  <div><span className="text-secondary">Flashpoint Margin:</span> <strong className={`block ${diodeTemp > 130 ? "text-critical font-bold" : "text-[#027a48]"}`}>{Math.max(0, 145 - diodeTemp).toFixed(1)}°C to Ignition</strong></div>
                  <div><span className="text-secondary">SCADA Breaker:</span> <strong className={`block ${diodeTemp > 130 ? "text-critical" : "text-[#027a48]"}`}>{diodeTemp > 130 ? "TRIPPED (ISOLATED)" : "CLOSED (NORMAL)"}</strong></div>
                </div>
              </div>

              {/* 3. Ongoing Data */}
              <div className="border border-border-strong bg-white p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>2. ONGOING OPERATIONAL DATA (48 STRINGS):</span>
                </strong>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Highest Operating Diode in Fleet:</span>
                    <strong className="font-mono-data text-warning text-sm">#R12-C37 (88.4°C)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Fleet Nominal Diode Baseline:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">48.2°C (Safe Range)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Thermal Degradation Velocity:</span>
                    <strong className="font-mono-data text-primary text-sm">+0.12°C / operating day</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Predict Future Data */}
            <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>3. AI PREDICTIVE TIME-TO-FAILURE (TTF) PROJECTION:</span>
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Time-To-Failure (TTF) Estimate:</span>
                  <strong className="font-mono-data text-lg text-critical block mt-0.5">42 Hours (If Unserviced)</strong>
                  <span className="text-secondary text-[10px]">Thermal runaway threshold</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Prevented Asset Loss:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">₹24.5 Lakhs ($29.4K)</strong>
                  <span className="text-secondary text-[10px]">String fire replacement cost</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Action Required:</span>
                  <strong className="font-mono-data text-lg text-primary block mt-0.5">Diode Box WO Dispatched</strong>
                  <span className="text-secondary text-[10px]">SLA countdown active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAB 4: REAL-TIME CARBON CREDIT & GREEN HYDROGEN YIELD ENGINE              */}
        {/* ========================================================================= */}
        {activeLab === "carbon" && (
          <div className="space-y-6">
            {/* 1. Feature Definition */}
            <div className="bg-[#f6fef9] border-2 border-[#027a48] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#027a48] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#027a48] uppercase">What Is Real-Time Carbon (I-REC / Verra) & Green Hydrogen Engine?</h3>
                </div>
                <span className="text-xs font-bold text-[#027a48]">Verra VCS / Gold Standard</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> A real-time environmental asset tokenization engine that computes daily avoided greenhouse gas (GHG) emissions from clean generation, mints verifiable International Renewable Energy Certificates (I-REC), and models high-purity PEM electrolyzer green hydrogen ($H_2$) fuel production capacity.
              </p>
            </div>

            {/* 2. Real-Time Telemetry & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span>1. REAL-TIME CARBON & HYDROGEN TELEMETRY:</span>
                </strong>
                <div className="space-y-2 font-sans text-xs">
                  <div>
                    <div className="flex justify-between mb-1"><span>Carbon Spot Market Price:</span> <strong className="font-mono-data text-primary">₹{carbonPriceINR} / ton (${(carbonPriceINR/83.3).toFixed(2)})</strong></div>
                    <input type="range" min="500" max="3000" step="50" value={carbonPriceINR} onChange={(e) => setCarbonPriceINR(Number(e.target.value))} className="w-full accent-[#027a48] cursor-pointer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono-data text-[11px] bg-white p-2.5 border border-border-subtle">
                  <div><span className="text-secondary">Daily Avoided:</span> <strong className="text-[#027a48] block">198.8 tCO₂ / day</strong></div>
                  <div><span className="text-secondary">Daily Green H₂:</span> <strong className="text-primary block">1,093.4 kg H₂ / day</strong></div>
                </div>
              </div>

              {/* 3. Ongoing Data */}
              <div className="border border-border-strong bg-white p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>2. ONGOING ENVIRONMENTAL ASSET PROGRESSION:</span>
                </strong>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Month-to-Date Avoided Emissions:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">4,174.8 Metric Tons CO₂</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>On-Chain Token Registry Serial:</span>
                    <strong className="font-mono-data text-primary text-sm">VCS-2026-IND-04892</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>PEM Electrolyzer Efficiency:</span>
                    <strong className="font-mono-data text-primary text-sm">55.0 kWh / kg H₂ (4.4 kg/MWh)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Predict Future Data */}
            <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>3. AI PREDICTIVE REVENUE & VALUATION PROJECTION:</span>
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Annualized Carbon Revenue:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">₹{((198.8 * carbonPriceINR * 365) / 10000000).toFixed(2)} Cr / yr</strong>
                  <span className="text-secondary text-[10px]">I-REC / Verra indexed</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Annualized Green H₂ Yield:</span>
                  <strong className="font-mono-data text-lg text-primary block mt-0.5">399.1 Tons H₂ / yr</strong>
                  <span className="text-secondary text-[10px]">₹15.96 Crores value</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Cumulative 25-Yr ESG Asset:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">1.81 Million tCO₂</strong>
                  <span className="text-secondary text-[10px]">Net-zero compliance</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAB 5: SATELLITE SYNTHETIC APERTURE RADAR (SAR) SUBSIDENCE                */}
        {/* ========================================================================= */}
        {activeLab === "sar" && (
          <div className="space-y-6">
            {/* 1. Feature Definition */}
            <div className="bg-[#f0f9ff] border-2 border-[#0284c7] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#0284c7] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#0284c7] uppercase">What Is Satellite InSAR Ground Subsidence Monitoring?</h3>
                </div>
                <span className="text-xs font-bold text-[#0284c7]">Sentinel-1 C-Band InSAR</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> Millimeter-scale Interferometric Synthetic Aperture Radar (InSAR) structural monitoring using orbital radar constellations to measure geotechnical soil displacement, pile foundation sinking, and seismic shifting across the entire 240-acre solar installation.
              </p>
            </div>

            {/* 2. Real-Time Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span>1. REAL-TIME RADAR TELEMETRY:</span>
                </strong>
                <div className="grid grid-cols-2 gap-2 font-mono-data text-[11px] bg-white p-2.5 border border-border-subtle">
                  <div><span className="text-secondary">InSAR Coherence:</span> <strong className="text-[#027a48] block">γ = 0.94 (Optimal)</strong></div>
                  <div><span className="text-secondary">Foundation Settling:</span> <strong className="text-primary block">-1.2 mm (Nominal)</strong></div>
                  <div><span className="text-secondary">Structural Index:</span> <strong className="text-[#027a48] block">99.8% Stable</strong></div>
                  <div><span className="text-secondary">Radar Frequency:</span> <strong className="text-primary block">5.405 GHz (C-Band)</strong></div>
                </div>
              </div>

              {/* 3. Ongoing Data */}
              <div className="border border-border-strong bg-white p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>2. ONGOING 90-DAY GEOTECHNICAL DISPLACEMENT:</span>
                </strong>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Displacement Velocity:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">-0.04 mm / week (Uniform)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Differential Tilting Hazard:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">0.00° Across Torque Tubes</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Last Sentinel-1 Pass:</span>
                    <strong className="font-mono-data text-primary text-sm">24 Aug 2026 (Orbit 128)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Predict Future Data */}
            <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>3. AI PREDICTIVE 12-MONTH GEOTECHNICAL SUBSIDENCE PROJECTION:</span>
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">12-Month Projected Settling:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">-2.8 mm Max</strong>
                  <span className="text-secondary text-[10px]">Well within 15mm tolerance</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Risk of Civil Failure:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">&lt;0.01% Probability</strong>
                  <span className="text-secondary text-[10px]">Piles verified secure</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Next Satellite Pass:</span>
                  <strong className="font-mono-data text-lg text-primary block mt-0.5">30 Aug 2026</strong>
                  <span className="text-secondary text-[10px]">Auto-ingest scheduled</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAB 6: ELECTROLUMINESCENCE (EL) NIGHT WAFER TOMOGRAPHY                     */}
        {/* ========================================================================= */}
        {activeLab === "el" && (
          <div className="space-y-6">
            {/* 1. Feature Definition */}
            <div className="bg-[#fbfbfe] border-2 border-[#6366f1] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#6366f1] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#6366f1] uppercase">What Is Electroluminescence (EL) Night Wafer Tomography?</h3>
                </div>
                <span className="text-xs font-bold text-[#6366f1]">IEC TS 60904-13 Standard</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> Autonomous nighttime forward-bias excitation of solar panels to emit near-infrared (NIR) photons ($1150	ext{ nm}$), capturing sub-surface microcracks, busbar disconnects, and inactive crystal shunts that are completely invisible to standard thermal or RGB cameras.
              </p>
            </div>

            {/* 2. Real-Time Telemetry & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span>1. REAL-TIME EXCITATION & TOMOGRAPHY TELEMETRY:</span>
                </strong>
                <div className="space-y-2 font-sans text-xs">
                  <div>
                    <div className="flex justify-between mb-1"><span>Forward-Bias Excitation Current:</span> <strong className="font-mono-data text-primary">{elExcitationCurrent} Amps (1.0x Isc)</strong></div>
                    <input type="range" min="2" max="12" step="0.2" value={elExcitationCurrent} onChange={(e) => setElExcitationCurrent(Number(e.target.value))} className="w-full accent-primary cursor-pointer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono-data text-[11px] bg-white p-2.5 border border-border-subtle">
                  <div><span className="text-secondary">NIR Wavelength:</span> <strong className="text-primary block">1150 nm (Silicon Gap)</strong></div>
                  <div><span className="text-secondary">Inactive Area:</span> <strong className="text-critical block">1.4% Shunted</strong></div>
                </div>
              </div>

              {/* 3. Ongoing Data */}
              <div className="border border-border-strong bg-white p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>2. ONGOING SCAN PROGRESSION (NIGHT SHIFT):</span>
                </strong>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Scanned Today:</span>
                    <strong className="font-mono-data text-primary text-sm">92,592 Panels (100% Complete)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Microcracks Cataloged:</span>
                    <strong className="font-mono-data text-warning text-sm">14 Panels with Inactive Fingers</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Tomographic Precision:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">0.2 mm / pixel resolution</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Predict Future Data */}
            <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>3. AI PREDICTIVE MICROCRACK EXPANSION TRAJECTORY:</span>
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">12-Month Crack Propagation:</span>
                  <strong className="font-mono-data text-lg text-warning block mt-0.5">3 Panels at Risk</strong>
                  <span className="text-secondary text-[10px]">Potential full cell isolation</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Preventive Solder Action:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">Work Orders Scheduled</strong>
                  <span className="text-secondary text-[10px]">Prevents hotspot development</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Preserved Lifetime Value:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">+₹4.82 Lakhs</strong>
                  <span className="text-secondary text-[10px]">Extended 25-yr degradation</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAB 7: SPOT BESS ENERGY ARBITRAGE & VIRTUAL POWER PLANT (VPP)              */}
        {/* ========================================================================= */}
        {activeLab === "bess" && (
          <div className="space-y-6">
            {/* 1. Feature Definition */}
            <div className="bg-[#fffbeb] border-2 border-[#d97706] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#d97706] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#d97706] uppercase">What Is Spot BESS Energy Arbitrage & Virtual Power Plant (VPP)?</h3>
                </div>
                <span className="text-xs font-bold text-[#d97706]">IEX Day-Ahead Market / Fast Frequency Response</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> AI-driven Battery Energy Storage System (BESS) co-optimization that charges during midday solar generation peaks and discharges into the grid during high evening peak tariff hours, participating in Indian Energy Exchange (IEX) spot arbitrage and millisecond Fast Frequency Response (FFR).
              </p>
            </div>

            {/* 2. Real-Time Telemetry & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span>1. REAL-TIME SPOT ARBITRAGE CONTROLS:</span>
                </strong>
                <div className="space-y-2 font-sans text-xs">
                  <div>
                    <div className="flex justify-between mb-1"><span>Current Grid Spot Price:</span> <strong className="font-mono-data text-primary">₹{gridSpotPrice} / kWh (${(gridSpotPrice/83.3).toFixed(3)})</strong></div>
                    <input type="range" min="2.00" max="10.00" step="0.25" value={gridSpotPrice} onChange={(e) => setGridSpotPrice(Number(e.target.value))} className="w-full accent-primary cursor-pointer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono-data text-[11px] bg-white p-2.5 border border-border-subtle">
                  <div><span className="text-secondary">BESS State of Charge:</span> <strong className="text-[#027a48] block">84.2% (42.1 MWh)</strong></div>
                  <div><span className="text-secondary">Dispatch Mode:</span> <strong className="text-primary block">{gridSpotPrice > 5.50 ? "PEAK DISCHARGE" : "SOLAR CHARGE"}</strong></div>
                </div>
              </div>

              {/* 3. Ongoing Data */}
              <div className="border border-border-strong bg-white p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>2. ONGOING DAILY ARBITRAGE LEDGER:</span>
                </strong>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Today's Stored Solar Energy:</span>
                    <strong className="font-mono-data text-primary text-sm">38.4 MWh Charged @ ₹2.44</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Evening Peak Discharged:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">36.5 MWh Exported @ ₹6.80</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Daily Net Arbitrage Profit:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">+₹1,48,200 / day ($1,780)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Predict Future Data */}
            <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>3. AI PREDICTIVE DAY-AHEAD SPOT PRICE FORECAST:</span>
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Tomorrow Evening Peak Tariff:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">₹9.20 / kWh (19:30)</strong>
                  <span className="text-secondary text-[10px]">Predicted grid deficit peak</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Projected Day-Ahead Profit:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">+₹3.12 Lakhs</strong>
                  <span className="text-secondary text-[10px]">Automated dispatch queued</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Annualized BESS ROI:</span>
                  <strong className="font-mono-data text-lg text-primary block mt-0.5">₹5.41 Crores / yr</strong>
                  <span className="text-secondary text-[10px]">3.2-year payback</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAB 8: AUTONOMOUS 24/7 DRONE NEST DOCK & WEATHER COCKPIT                   */}
        {/* ========================================================================= */}
        {activeLab === "dock" && (
          <div className="space-y-6">
            {/* 1. Feature Definition */}
            <div className="bg-[#f5f3ff] border-2 border-[#7c3aed] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#7c3aed] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#7c3aed] uppercase">What Is Autonomous 24/7 Drone Nest Dock & Weather Cockpit?</h3>
                </div>
                <span className="text-xs font-bold text-[#7c3aed]">DJI Dock 2 / IP55 Weather-Sealed Autonomous Hangar</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> An all-weather autonomous robotic hangar and high-speed inductive charging station that automatically opens its motorized hatch, dispatches autonomous aerial inspection drones, downloads radiometric thermal imagery, and fast-charges in 32 minutes with zero on-site human pilots.
              </p>
            </div>

            {/* 2. Real-Time Telemetry & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span>1. REAL-TIME HANGAR TELEMETRY & CONTROLS:</span>
                </strong>
                <div className="grid grid-cols-2 gap-2 font-mono-data text-[11px] bg-white p-2.5 border border-border-subtle">
                  <div><span className="text-secondary">Dock Internal Temp:</span> <strong className="text-primary block">24.2°C (Air Conditioned)</strong></div>
                  <div><span className="text-secondary">Drone Battery State:</span> <strong className="text-[#027a48] block">92% (Fast-Charging)</strong></div>
                  <div><span className="text-secondary">Hangar Hatch:</span> <strong className="text-primary block">{dockHatchOpen ? "OPEN (READY)" : "CLOSED (IP55 SEALED)"}</strong></div>
                  <div><span className="text-secondary">Anemometer Wind:</span> <strong className="text-[#027a48] block">14.2 km/h (Clear)</strong></div>
                </div>
                <button
                  onClick={() => setDockHatchOpen(!dockHatchOpen)}
                  className={`w-full py-2 font-bold uppercase text-xs border transition-all cursor-pointer ${
                    dockHatchOpen ? "bg-critical text-white border-critical" : "bg-primary text-white border-primary hover:bg-white hover:text-primary"
                  }`}
                >
                  {dockHatchOpen ? "CLOSE HANGAR HATCH" : "OPEN HANGAR HATCH"}
                </button>
              </div>

              {/* 3. Ongoing Data */}
              <div className="border border-border-strong bg-white p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>2. ONGOING DAILY MISSION LOG:</span>
                </strong>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Missions Completed Today:</span>
                    <strong className="font-mono-data text-primary text-sm">4 Sorties (12,400 Panels)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>RTK Positioning Accuracy:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">±1.2 cm Centimeter-Grade</strong>
                  </div>
                  <div className="flex justify-between items-center bg-surface p-2 border border-border-subtle">
                    <span>Average Sortie Duration:</span>
                    <strong className="font-mono-data text-primary text-sm">24.5 minutes</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Predict Future Data */}
            <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>3. AI PREDICTIVE WEATHER CLEARANCE & SCHEDULE:</span>
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Next Scheduled Autonomous Sortie:</span>
                  <strong className="font-mono-data text-lg text-primary block mt-0.5">In 48 Mins (14:30)</strong>
                  <span className="text-secondary text-[10px]">Sector 4 Micro-Verification</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Weather Launch Clearance:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">99.2% Probability</strong>
                  <span className="text-secondary text-[10px]">Zero turbulence forecast</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Pilot Cost Saved:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">₹18.5 Lakhs / yr</strong>
                  <span className="text-secondary text-[10px]">100% unmanned autonomy</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAB 9: SCADA ZERO-TRUST CYBER INTRUSION SHIELD                            */}
        {/* ========================================================================= */}
        {activeLab === "cyber" && (
          <div className="space-y-6">
            {/* 1. Feature Definition */}
            <div className="bg-[#f8fafc] border-2 border-primary p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-primary text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-primary uppercase">What Is SCADA Zero-Trust Cyber Intrusion Shield?</h3>
                </div>
                <span className="text-xs font-bold text-primary">IEC 62443 / NERC CIP Cyber Compliance</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> An industrial deep packet inspection (DPI) firewall and AI intrusion detection system specifically engineered for solar grid SCADA networks. It decodes Modbus/TCP, DNP3, and IEC 60870-5-104 packets in real-time, blocking unauthorized inverter register manipulation, frequency desynchronization attacks, and unauthorized curtailment commands.
              </p>
            </div>

            {/* 2. Real-Time Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span>1. REAL-TIME NETWORK PACKET TELEMETRY:</span>
                </strong>
                <div className="grid grid-cols-2 gap-2 font-mono-data text-[11px] bg-white p-2.5 border border-border-subtle">
                  <div><span className="text-secondary">Packet Velocity:</span> <strong className="text-primary block">12,450 packets / sec</strong></div>
                  <div><span className="text-secondary">Firewall State:</span> <strong className="text-[#027a48] block">ACTIVE (Zero-Trust)</strong></div>
                  <div><span className="text-secondary">Encryption Protocol:</span> <strong className="text-primary block">TLS 1.3 / IPsec Tunnel</strong></div>
                  <div><span className="text-secondary">Active Threats:</span> <strong className="text-[#027a48] block">0 Active Breaches</strong></div>
                </div>
              </div>

              {/* 3. Ongoing Data */}
              <div className="border border-border-strong bg-white p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>2. ONGOING INTRUSION LOG (LAST 24 HOURS):</span>
                </strong>
                <div className="space-y-1.5 font-sans text-xs">
                  {cyberAlerts.map((alert) => (
                    <div key={alert.id} className="p-2 border border-critical/30 bg-[#fef3f2] flex justify-between items-center text-xs">
                      <div>
                        <strong className="font-mono-data text-primary block">{alert.id} · {alert.ip}</strong>
                        <span className="text-secondary text-[11px]">{alert.type}</span>
                      </div>
                      <span className="bg-critical text-white font-mono-data px-2 py-0.5 text-[9px] font-bold uppercase">{alert.severity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Predict Future Data */}
            <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>3. AI PREDICTIVE CYBER VULNERABILITY SCORE:</span>
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">72-Hour Vulnerability Probability:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">&lt;0.01% (Fortified)</strong>
                  <span className="text-secondary text-[10px]">Zero attack vectors exposed</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Prevented Grid Trip Penalty:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">₹50.0 Lakhs / event</strong>
                  <span className="text-secondary text-[10px]">CERC grid compliance fine</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Certifications Active:</span>
                  <strong className="font-mono-data text-lg text-primary block mt-0.5">NERC CIP / IEC 62443</strong>
                  <span className="text-secondary text-[10px]">Audited & compliant</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
