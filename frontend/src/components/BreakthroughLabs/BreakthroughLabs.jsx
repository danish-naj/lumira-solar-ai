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
  Wifi,
  Radio,
  Play,
  RotateCw
} from "lucide-react";

export default function BreakthroughLabs({ farm, onNavigateTab }) {
  // Active Lab Module: 'bifacial' | 'terrain' | 'fire' | 'carbon' | 'sar' | 'el' | 'bess' | 'cyber'
  const [activeLab, setActiveLab] = useState("bifacial");

  // State for Lab 1: Bifacial Albedo
  const [albedoValue, setAlbedoValue] = useState(0.28);
  const [frontGHI, setFrontGHI] = useState(942);

  // State for Lab 2: Terrain Backtracking
  const [terrainSlope, setTerrainSlope] = useState(3.5);
  const [trackerTilt, setTrackerTilt] = useState(42.5);

  // State for Lab 3: Thermal Runaway Cascade
  const [diodeTemp, setDiodeTemp] = useState(88.4);

  // State for Lab 4: Live Carbon Market Ticker
  const [liveCarbonPriceINR, setLiveCarbonPriceINR] = useState(1450); // Live Verra VCS Market Price (₹/ton)
  const [carbonMarketTick, setCarbonMarketTick] = useState("+₹18.40 (+1.28%)");

  // State for Lab 6: EL Night Wafer Tomography (FIXED & FULLY INTERACTIVE)
  const [elCurrentAmps, setElCurrentAmps] = useState(9.5); // Forward-bias current (0.5A - 12.0A)
  const [elScanActive, setElScanActive] = useState(false);
  const [selectedWaferDefect, setSelectedWaferDefect] = useState(null);

  // State for Lab 7: Live Indian Energy Exchange (IEX) Spot Market Ticker
  const [iexSpotPrice, setIexSpotPrice] = useState(6.40); // Live IEX Spot Price (₹/kWh)
  const [iexMarketBlock, setIexMarketBlock] = useState("14:15 - 14:30 (Block 58)");

  // State for Lab 8 (Old 9): Cyber Defense
  const [cyberAlerts, setCyberAlerts] = useState([
    { id: "CYB-101", ip: "192.168.1.104", type: "Modbus/TCP Unauthorized Register Write (Holding Register 40012)", severity: "Blocked", time: "8 mins ago" },
    { id: "CYB-102", ip: "10.0.4.22", type: "Inverter Frequency Desync Pulse Injection", severity: "Quarantined", time: "22 mins ago" }
  ]);

  // Live Market Price Streaming Simulation Loop (Real-Time Market Feeds)
  useEffect(() => {
    const interval = setInterval(() => {
      // Small live micro-fluctuations in carbon spot market
      setLiveCarbonPriceINR((prev) => {
        const delta = (Math.random() * 2 - 1).toFixed(2);
        return Math.round(Number(prev) + Number(delta));
      });
      // IEX Spot Price 15-min block updates
      setIexSpotPrice((prev) => {
        const delta = (Math.random() * 0.1 - 0.05).toFixed(2);
        return Number((Number(prev) + Number(delta)).toFixed(2));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const labsMenu = [
    { id: "bifacial", name: "1. Bifacial Albedo Engine", icon: Layers, tag: "DUAL-SIDED PHYSICS" },
    { id: "terrain", name: "2. Terrain Backtracking AI", icon: Sun, tag: "SHADOW OPTIMIZER" },
    { id: "fire", name: "3. Fire Cascade Predictor", icon: Flame, tag: "THERMAL CASCADE" },
    { id: "carbon", name: "4. Live Carbon & Green H₂", icon: Leaf, tag: "I-REC SPOT TICKER" },
    { id: "sar", name: "5. Satellite InSAR Subsidence", icon: Satellite, tag: "FOUNDATION RADAR" },
    { id: "el", name: "6. EL Night Wafer Tomography", icon: Moon, tag: "WAFER TOMOGRAPHY" },
    { id: "bess", name: "7. Live IEX Spot BESS Arbitrage", icon: BatteryCharging, tag: "IEX MARKET FEED" },
    { id: "cyber", name: "8. SCADA Cyber Firewall", icon: ShieldCheck, tag: "INTRUSION SHIELD" },
  ];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-warning" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              LUMIRA QUANTUM LABS · 8 WORLD-FIRST INNOVATIONS
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Real-Time Market Tickers · Active Progression · AI Predictive Intelligence
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Breakthrough Innovation Labs & Frontier Capabilities
          </h1>
        </div>

        <div className="border-2 border-primary bg-white px-3 py-1.5 font-mono-data text-xs shadow-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block animate-pulse" />
          <span className="font-bold text-primary">8 ACTIVE RESEARCH ENGINES</span>
        </div>
      </div>

      {/* 2. Innovation Labs Tab Selector (8 Clean Tabs) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono-data text-xs">
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
            <div className="bg-[#f0fdf4] border-2 border-[#027a48] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#027a48] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#027a48] uppercase">What Is Bifacial Albedo Ground Reflection & Rear-Side Physics?</h3>
                </div>
                <span className="text-xs font-bold text-[#027a48]">IEC 60904-1-2 Standard</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> Dual-sided photovoltaic absorption modeling calculating both front-side direct solar irradiance (G_front) and rear-side diffuse irradiance (G_rear) reflected from ground terrain. It solves the non-linear view factor integral: P_bifacial = G_front · η + G_rear · η · φ_bifacial to maximize energy yield.
              </p>
            </div>

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
            <div className="bg-[#eff8ff] border-2 border-[#175cd3] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#175cd3] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#175cd3] uppercase">What Is 3D Uneven Terrain Backtracking AI?</h3>
                </div>
                <span className="text-xs font-bold text-[#175cd3]">NEXTracker TrueCapture™ Model</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> An advanced algorithmic backtracking system building a high-resolution Digital Elevation Model (DEM) of non-planar desert terrain, computing independent rotational slew angles for each individual row to eliminate mutual inter-row shading during low morning/evening sun angles.
              </p>
            </div>

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
            <div className="bg-[#fef3f2] border-2 border-critical p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-critical text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-critical uppercase">What Is Thermal Runaway & Fire Cascade Prediction?</h3>
                </div>
                <span className="text-xs font-bold text-critical">NFPA 855 / IEC 61730 Fire Safety</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> A real-time thermodynamic AI safety barrier tracking bypass diode temperature escalation, predicting cascading thermal runaway before junction box temperatures breach the critical $145°C$ EVA backsheet ignition threshold. It triggers automated SCADA string circuit trips to prevent asset fire damage.
              </p>
            </div>

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
        {/* LAB 4: LIVE CARBON CREDIT & GREEN HYDROGEN YIELD ENGINE (LIVE TICKER)      */}
        {/* ========================================================================= */}
        {activeLab === "carbon" && (
          <div className="space-y-6">
            <div className="bg-[#f6fef9] border-2 border-[#027a48] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#027a48] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#027a48] uppercase">What Is Live Carbon Credit (I-REC / Verra) & Green Hydrogen Engine?</h3>
                </div>
                <span className="text-xs font-bold text-[#027a48]">Verra VCS / Gold Standard</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> A real-time environmental asset tokenization engine linked to live global carbon spot markets (Verra VCS / I-REC). It autonomously values daily avoided GHG emissions (198.8 tCO₂/day) and computes high-purity PEM electrolyzer green hydrogen ($H_2$) fuel capacity using streaming exchange pricing.
              </p>
            </div>

            {/* Live Streaming Market Ticker */}
            <div className="bg-white border-2 border-[#027a48] p-4 space-y-3 shadow-xs">
              <div className="flex justify-between items-center border-b border-[#abefc6] pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#027a48] animate-ping" />
                  <strong className="text-primary uppercase text-xs">LIVE CARBON SPOT MARKET FEED (VERRA VCS / I-REC):</strong>
                </div>
                <span className="font-mono-data text-[#027a48] font-bold text-xs">STREAMING 24/7 SPOT DATA</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Live Verra VCS Price:</span>
                  <strong className="font-mono-data text-2xl font-black text-primary block mt-0.5">₹{liveCarbonPriceINR} / ton</strong>
                  <span className="text-[#027a48] font-mono-data text-[10px] font-bold">{carbonMarketTick}</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Daily Verified Offsets:</span>
                  <strong className="font-mono-data text-2xl font-black text-[#027a48] block mt-0.5">198.8 Metric Tons</strong>
                  <span className="text-secondary text-[10px]">Auto-minted on-chain</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Daily Real-Time Revenue:</span>
                  <strong className="font-mono-data text-2xl font-black text-[#027a48] block mt-0.5">+₹{Math.round(198.8 * liveCarbonPriceINR).toLocaleString()} / day</strong>
                  <span className="text-secondary text-[10px]">(${(Math.round(198.8 * liveCarbonPriceINR)/83.3).toFixed(0)} / day)</span>
                </div>
              </div>
            </div>

            {/* Ongoing & Predictive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans text-xs">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 font-mono-data flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>ONGOING OPERATIONAL DATA:</span>
                </strong>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Month-to-Date Avoided Emissions:</span>
                    <strong className="font-mono-data text-[#027a48]">4,174.8 Metric Tons CO₂</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>On-Chain Token Registry Serial:</span>
                    <strong className="font-mono-data text-primary">VCS-2026-IND-04892</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Daily PEM Green H₂ Production:</span>
                    <strong className="font-mono-data text-primary">1,093.4 kg H₂ / day (55 kWh/kg)</strong>
                  </div>
                </div>
              </div>

              <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-3">
                <strong className="text-[#027a48] uppercase text-xs block border-b border-[#abefc6] pb-1.5 font-mono-data flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>AI PREDICTIVE ESG PROJECTIONS:</span>
                </strong>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Annualized Carbon Asset Valuation:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">₹{((198.8 * liveCarbonPriceINR * 365) / 10000000).toFixed(2)} Crores / yr</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Annualized Green H₂ Yield:</span>
                    <strong className="font-mono-data text-primary text-sm">399.1 Tons H₂ / yr (₹15.96 Cr)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>25-Year Cumulative Offsets:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">1.81 Million tCO₂e</strong>
                  </div>
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
        {/* LAB 6: ELECTROLUMINESCENCE (EL) NIGHT WAFER TOMOGRAPHY (FIXED & WORKING)   */}
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
                <strong>What It Is:</strong> Autonomous nighttime forward-bias electrical excitation where DC current is injected into PV strings to stimulate radiative electron-hole recombination, emitting near-infrared (NIR) photons (1150 nm). An ultra-sensitive InGaAs camera captures this to expose invisible sub-surface silicon microcracks, busbar disconnects, and inactive crystal dead zones.
              </p>
            </div>

            {/* 2. Interactive Silicon Wafer Tomogram Canvas */}
            <div className="border-2 border-primary bg-white p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-3 gap-2">
                <div>
                  <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                    <Moon className="w-4 h-4 text-[#6366f1]" />
                    <span>INTERACTIVE SILICON WAFER TOMOGRAM (144 HALF-CUT MATRIX):</span>
                  </strong>
                  <span className="text-secondary text-[11px] font-sans">
                    Adjust excitation current to observe radiative emission and highlight sub-surface crack networks.
                  </span>
                </div>
                <button
                  onClick={() => {
                    setElScanActive(true);
                    setTimeout(() => setElScanActive(false), 2000);
                  }}
                  disabled={elScanActive}
                  className={`px-4 py-1.5 bg-[#6366f1] text-white font-mono-data text-xs font-bold uppercase border border-[#6366f1] hover:bg-white hover:text-[#6366f1] transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
                    elScanActive ? "animate-pulse" : ""
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{elScanActive ? "ACQUIRING TOMOGRAM..." : "TRIGGER HIGH-RES EL SWEEP"}</span>
                </button>
              </div>

              {/* Silicon Wafer Visual Canvas */}
              <div className="relative border border-border-strong bg-[#05070d] h-72 overflow-hidden flex items-center justify-center p-4">
                <svg viewBox="0 0 500 220" className="w-full h-full">
                  {/* Wafer Background Luminescence proportional to Current */}
                  <rect x="30" y="20" width="440" height="180" fill={`rgba(99, 102, 241, ${(elCurrentAmps / 12) * 0.45})`} rx="4" stroke="#4f46e5" strokeWidth="1.5" />

                  {/* 12 Busbar Silicon Half-Cut Cells */}
                  {Array.from({ length: 6 }, (_, row) =>
                    Array.from({ length: 12 }, (_, col) => {
                      const cx = 45 + col * 35;
                      const cy = 30 + row * 26;
                      const isDefective1 = row === 2 && col === 4;
                      const isDefective2 = row === 4 && col === 8;
                      const isShunted = isDefective1 || isDefective2;

                      return (
                        <g key={`${row}-${col}`}>
                          <rect
                            x={cx}
                            y={cy}
                            width="31"
                            height="22"
                            fill={isShunted ? "#0f172a" : `rgba(248, 250, 252, ${(elCurrentAmps / 12) * 0.95})`}
                            stroke="#334155"
                            strokeWidth="0.5"
                          />
                          {/* Busbar Ribbon Wire */}
                          <line x1={cx + 15} y1={cy} x2={cx + 15} y2={cy + 22} stroke="#94a3b8" strokeWidth="0.75" />

                          {/* Microcrack rendering on defective cells */}
                          {isDefective1 && (
                            <path d={`M ${cx+5} ${cy+3} L ${cx+14} ${cy+12} L ${cx+25} ${cy+18}`} stroke="#ef4444" strokeWidth="1.5" fill="none" className="animate-pulse" />
                          )}
                          {isDefective2 && (
                            <path d={`M ${cx+22} ${cy+2} L ${cx+10} ${cy+15} L ${cx+8} ${cy+20}`} stroke="#ef4444" strokeWidth="1.5" fill="none" className="animate-pulse" />
                          )}
                        </g>
                      );
                    })
                  )}

                  {/* Laser Measurement Overlay */}
                  <line x1="30" y1="110" x2="470" y2="110" stroke="rgba(99, 102, 241, 0.4)" strokeDasharray="4,4" />
                </svg>

                {/* Status Overlay */}
                <div className="absolute bottom-2 left-2 bg-black/85 border border-[#6366f1] px-3 py-1 text-[10px] text-white flex items-center gap-4">
                  <span>Emission: <strong className="text-[#a5b4fc]">1150 nm NIR</strong></span>
                  <span>Excitation Current: <strong className="text-[#22c55e]">{elCurrentAmps} A</strong></span>
                  <span>Defects Identified: <strong className="text-critical">2 Microcrack Shunts</strong></span>
                </div>
              </div>

              {/* Real-Time Controls & Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface p-4 border border-border-strong font-sans text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Forward-Bias Excitation Current (I_inj):</span>
                    <strong className="font-mono-data text-primary">{elCurrentAmps} Amps ({(elCurrentAmps / 9.5).toFixed(2)}x Isc)</strong>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="12.0"
                    step="0.1"
                    value={elCurrentAmps}
                    onChange={(e) => setElCurrentAmps(Number(e.target.value))}
                    className="w-full accent-[#6366f1] cursor-pointer"
                  />
                  <span className="text-[10px] text-secondary">Nominal Short-Circuit Current Isc = 9.5 A</span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono-data text-[11px] bg-white p-2.5 border border-border-subtle">
                  <div><span className="text-secondary">Inactive Area:</span> <strong className="text-critical block">1.38% Shunted</strong></div>
                  <div><span className="text-secondary">Wafer Integrity:</span> <strong className="text-[#027a48] block">98.6% Grade A-</strong></div>
                </div>
              </div>
            </div>

            {/* Predictive Projections */}
            <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>3. AI PREDICTIVE MICROCRACK PROPAGATION PROJECTION:</span>
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">12-Month Crack Propagation:</span>
                  <strong className="font-mono-data text-lg text-warning block mt-0.5">2 Panels Isolated</strong>
                  <span className="text-secondary text-[10px]">Prevents hotspot failure</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Preventive Solder Action:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">Dispatched to Crew</strong>
                  <span className="text-secondary text-[10px]">Level-III technician guide</span>
                </div>
                <div className="bg-white p-3 border border-[#abefc6]">
                  <span className="text-secondary text-[11px] block">Preserved 25-Yr Asset Value:</span>
                  <strong className="font-mono-data text-lg text-[#027a48] block mt-0.5">+₹4.82 Lakhs</strong>
                  <span className="text-secondary text-[10px]">Warranty claim logged</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAB 7: LIVE IEX SPOT BESS ARBITRAGE & VIRTUAL POWER PLANT (LIVE TICKER)    */}
        {/* ========================================================================= */}
        {activeLab === "bess" && (
          <div className="space-y-6">
            <div className="bg-[#fffbeb] border-2 border-[#d97706] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#d97706] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#d97706] uppercase">What Is Live IEX Spot BESS Energy Arbitrage & Virtual Power Plant?</h3>
                </div>
                <span className="text-xs font-bold text-[#d97706]">Indian Energy Exchange (IEX) Real-Time Market</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> AI-driven Battery Energy Storage System (BESS) co-optimization connected to live 15-minute Indian Energy Exchange (IEX) Day-Ahead (DAM) and Real-Time Market (RTM) spot price feeds. It automatically charges the 50 MWh battery bank when spot rates drop below solar PPA tariffs (₹2.44 / kWh) and discharges during evening grid peak rates.
              </p>
            </div>

            {/* Live IEX Spot Market Ticker Banner */}
            <div className="bg-white border-2 border-[#d97706] p-4 space-y-3 shadow-xs">
              <div className="flex justify-between items-center border-b border-[#fef08a] pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d97706] animate-ping" />
                  <strong className="text-primary uppercase text-xs">LIVE IEX REAL-TIME SPOT ELECTRICITY TICKER:</strong>
                </div>
                <span className="font-mono-data text-[#d97706] font-bold text-xs">{iexMarketBlock}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Live IEX Clearing Price:</span>
                  <strong className="font-mono-data text-2xl font-black text-primary block mt-0.5">₹{iexSpotPrice.toFixed(2)} / kWh</strong>
                  <span className="text-secondary text-[10px]">(${(iexSpotPrice/83.3).toFixed(3)} / kWh)</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">BESS Battery State:</span>
                  <strong className="font-mono-data text-2xl font-black text-[#027a48] block mt-0.5">84.2% (42.1 MWh)</strong>
                  <span className="text-[#027a48] font-bold text-[10px]">
                    {iexSpotPrice > 5.50 ? "⚡ AUTO-DISCHARGING PEAK" : "☀️ SOLAR CHARGING"}
                  </span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Today's Arbitrage Margin:</span>
                  <strong className="font-mono-data text-2xl font-black text-[#027a48] block mt-0.5">+₹1,48,200 / day</strong>
                  <span className="text-secondary text-[10px]">($1,780 daily net margin)</span>
                </div>
              </div>
            </div>

            {/* Ongoing & Predictive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans text-xs">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 font-mono-data flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>ONGOING OPERATIONAL DATA:</span>
                </strong>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Solar Peak Energy Charged:</span>
                    <strong className="font-mono-data text-primary">38.4 MWh @ ₹2.44 PPA</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Evening Peak Discharged:</span>
                    <strong className="font-mono-data text-[#027a48]">36.5 MWh @ ₹6.80 Spot</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Round-Trip Efficiency (RTE):</span>
                    <strong className="font-mono-data text-primary">89.4% LFP Chemistry</strong>
                  </div>
                </div>
              </div>

              <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-3">
                <strong className="text-[#027a48] uppercase text-xs block border-b border-[#abefc6] pb-1.5 font-mono-data flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>AI PREDICTIVE DAY-AHEAD ARBITRAGE PROJECTIONS:</span>
                </strong>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Tomorrow Evening Peak Forecast:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">₹9.20 / kWh (19:30)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Projected Day-Ahead Profit:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">+₹3.12 Lakhs / day</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Annualized BESS Project Valuation:</span>
                    <strong className="font-mono-data text-primary text-sm">₹5.41 Crores / yr (3.2y Payback)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LAB 8: SCADA ZERO-TRUST CYBER INTRUSION SHIELD                            */}
        {/* ========================================================================= */}
        {activeLab === "cyber" && (
          <div className="space-y-6">
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
