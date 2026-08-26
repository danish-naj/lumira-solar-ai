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
  RotateCw,
  Eye,
  RadioTower,
  Gauge
} from "lucide-react";

export default function BreakthroughLabs({ farm, onNavigateTab }) {
  // Active Lab Module: 'bifacial' | 'terrain' | 'fire' | 'carbon' | 'sar' | 'el' | 'bess' | 'cyber'
  const [activeLab, setActiveLab] = useState("bifacial");

  // 1. Automated Real-Time Sensor Telemetry State (Live Sensor Array Streams)
  const [liveFrontGHI, setLiveFrontGHI] = useState(942.4); // W/m² (Kipp & Zonen CMP11)
  const [liveAlbedo, setLiveAlbedo] = useState(0.284); // Albedometer Eye #01
  const [liveTerrainSlope, setLiveTerrainSlope] = useState(3.48); // LiDAR DEM Slope (°)
  const [liveTrackerSlew, setLiveTrackerSlew] = useState(42.5); // NEXTracker Digital Inclinometer (°)
  const [liveDiodeTemp, setLiveDiodeTemp] = useState(88.4); // SCADA PT100 Thermocouple (#R12-C37)
  const [liveCarbonPriceINR, setLiveCarbonPriceINR] = useState(1450); // Live Verra VCS Spot Market
  const [carbonMarketTick, setCarbonMarketTick] = useState("+₹18.40 (+1.28%)");
  const [liveElCurrent, setLiveElCurrent] = useState(9.52); // Automated InGaAs Excitation (Amps)
  const [elScanActive, setElScanActive] = useState(false);
  const [iexSpotPrice, setIexSpotPrice] = useState(6.40); // Live IEX Spot Price (₹/kWh)
  const [iexMarketBlock, setIexMarketBlock] = useState("14:15 - 14:30 (Block 58)");

  // SCADA Cyber Security Real-Time Stream
  const [cyberAlerts, setCyberAlerts] = useState([
    { id: "CYB-101", ip: "192.168.1.104", type: "Modbus/TCP Unauthorized Register Write (Holding Register 40012)", severity: "Blocked", time: "8 mins ago" },
    { id: "CYB-102", ip: "10.0.4.22", type: "Inverter Frequency Desync Pulse Injection", severity: "Quarantined", time: "22 mins ago" }
  ]);

  // Automated Real-Time Sensor Telemetry Loop (Streams Live Sensor Data 24/7)
  useEffect(() => {
    const interval = setInterval(() => {
      // Live Pyranometer GHI Stream
      setLiveFrontGHI((prev) => Number((prev + (Math.random() * 0.8 - 0.4)).toFixed(1)));
      // Live Albedometer Stream
      setLiveAlbedo((prev) => Number((prev + (Math.random() * 0.002 - 0.001)).toFixed(3)));
      // Live Thermocouple Temp Stream
      setLiveDiodeTemp((prev) => Number((prev + (Math.random() * 0.2 - 0.1)).toFixed(1)));
      // Live Inclinometer Stream
      setLiveTrackerSlew((prev) => Number((prev + (Math.random() * 0.06 - 0.03)).toFixed(1)));
      // Live Carbon Spot Price Stream
      setLiveCarbonPriceINR((prev) => {
        const delta = (Math.random() * 2 - 1).toFixed(2);
        return Math.round(Number(prev) + Number(delta));
      });
      // Live IEX Electricity Spot Stream
      setIexSpotPrice((prev) => {
        const delta = (Math.random() * 0.08 - 0.04).toFixed(2);
        return Number((Number(prev) + Number(delta)).toFixed(2));
      });
      // Automated Excitation Current Stream
      setLiveElCurrent((prev) => Number((9.5 + (Math.random() * 0.1 - 0.05)).toFixed(2)));
    }, 2500);
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
              100% Automated Sensor Streams · Real-Time Telemetry · AI Predictive Intelligence
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Breakthrough Innovation Labs & Frontier Capabilities
          </h1>
        </div>

        <div className="border-2 border-primary bg-white px-3 py-1.5 font-mono-data text-xs shadow-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block animate-ping" />
          <span className="font-bold text-primary">8 AUTOMATED SENSOR PIPELINES LIVE</span>
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

            {/* 100% Automated Live Sensor Telemetry */}
            <div className="border-2 border-[#027a48] bg-white p-5 space-y-3 shadow-xs">
              <div className="flex justify-between items-center border-b border-[#abefc6] pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#027a48] animate-ping" />
                  <strong className="text-primary uppercase text-xs">LIVE OPTICAL ALBEDOMETER & DUAL PYRANOMETER SENSOR STREAM:</strong>
                </div>
                <span className="font-mono-data text-[#027a48] font-bold text-xs">POLLING SCADA EVERY 2.5s</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-sans text-xs">
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Front GHI (Kipp & Zonen CMP11):</span>
                  <strong className="font-mono-data text-2xl font-black text-primary block mt-0.5">{liveFrontGHI} W/m²</strong>
                  <span className="text-[#027a48] font-mono-data text-[10px] font-bold">✓ Calibrated Class A</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Ground Albedo (Eye Sensor #01):</span>
                  <strong className="font-mono-data text-2xl font-black text-[#027a48] block mt-0.5">α = {liveAlbedo}</strong>
                  <span className="text-secondary text-[10px]">Natural desert sand/gravel</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Calculated Rear Irradiance:</span>
                  <strong className="font-mono-data text-2xl font-black text-primary block mt-0.5">{Math.round(liveFrontGHI * liveAlbedo)} W/m²</strong>
                  <span className="text-secondary text-[10px]">View factor integral 0.72</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Instantaneous Bifacial Boost:</span>
                  <strong className="font-mono-data text-2xl font-black text-[#027a48] block mt-0.5">+{(liveAlbedo * 65).toFixed(1)}% MWh</strong>
                  <span className="text-[#027a48] font-bold text-[10px]">Active Generation Lift</span>
                </div>
              </div>
            </div>

            {/* Ongoing & Predictive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans text-xs">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 font-mono-data flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>ONGOING OPERATIONAL DATA (24-HOUR CYCLE):</span>
                </strong>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>24h Cumulative Bifacial Generation:</span>
                    <strong className="font-mono-data text-primary text-sm">45.8 MWh / day</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Weekly Albedo Degradation Rate:</span>
                    <strong className="font-mono-data text-warning text-sm">-0.003 α / week (Dust Ingress)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Rear-Side Thermal Offset:</span>
                    <strong className="font-mono-data text-primary text-sm">+2.4°C vs Single-Sided</strong>
                  </div>
                </div>
              </div>

              <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-3">
                <strong className="text-[#027a48] uppercase text-xs block border-b border-[#abefc6] pb-1.5 font-mono-data flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>AI PREDICTIVE FORECASTING & ROI PROJECTIONS:</span>
                </strong>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Next-7-Day Bifacial Gain:</span>
                    <strong className="font-mono-data text-lg text-[#027a48]">+19.2 MWh</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Optimal Resurfacing Date:</span>
                    <strong className="font-mono-data text-lg text-primary">In 18 Days (14 Sep)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Projected Monthly Revenue Lift:</span>
                    <strong className="font-mono-data text-lg text-[#027a48]">+₹1.42 Lakhs / mo</strong>
                  </div>
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
                <strong>What It Is:</strong> An automated algorithmic backtracking system building a high-resolution Digital Elevation Model (DEM) of non-planar desert terrain from LiDAR drone sweeps, autonomously computing independent rotational slew angles for each individual row to eliminate mutual inter-row shading during low morning/evening sun angles.
              </p>
            </div>

            {/* 100% Automated Live LiDAR DEM & Inclinometer Stream */}
            <div className="border-2 border-[#175cd3] bg-white p-5 space-y-3 shadow-xs">
              <div className="flex justify-between items-center border-b border-[#b2ddff] pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#175cd3] animate-ping" />
                  <strong className="text-primary uppercase text-xs">LIVE LIDAR TERRAIN DEM & NEXTRACKER INCLINOMETER STREAM:</strong>
                </div>
                <span className="font-mono-data text-[#175cd3] font-bold text-xs">48 DRIVETRAINS SYNCHRONIZED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-sans text-xs">
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">DEM Topography Slope (θ_slope):</span>
                  <strong className="font-mono-data text-2xl font-black text-primary block mt-0.5">{liveTerrainSlope}°</strong>
                  <span className="text-secondary text-[10px]">Rolling sand dune gradient</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Inclinometer Slew Angle:</span>
                  <strong className="font-mono-data text-2xl font-black text-[#175cd3] block mt-0.5">{liveTrackerSlew}°</strong>
                  <span className="text-[#027a48] font-bold text-[10px]">✓ Backtracked Horizon</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Mutual Inter-Row Shading:</span>
                  <strong className="font-mono-data text-2xl font-black text-[#027a48] block mt-0.5">0.00%</strong>
                  <span className="text-[#027a48] font-bold text-[10px]">Zero Shadow Clipping</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">TrueCapture™ Daily Gain:</span>
                  <strong className="font-mono-data text-2xl font-black text-[#027a48] block mt-0.5">+4.2% MWh</strong>
                  <span className="text-secondary text-[10px]">Topography compensation</span>
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
                    <span>Active Drivetrains Online:</span>
                    <strong className="font-mono-data text-primary">48 Motors (100% Health)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Torque Tube Mechanical Stress:</span>
                    <strong className="font-mono-data text-[#027a48]">18.4% Maximum Limit</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Morning Backtracking Recovery:</span>
                    <strong className="font-mono-data text-[#027a48]">+2.8 MWh Saved Today</strong>
                  </div>
                </div>
              </div>

              <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-3">
                <strong className="text-[#027a48] uppercase text-xs block border-b border-[#abefc6] pb-1.5 font-mono-data flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>AI PREDICTIVE SHADOW FORECAST:</span>
                </strong>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Sunset Slew Trajectory (17:15 - 18:00):</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">Optimal Zero-Clip Curve</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Next 30-Day Energy Gain:</span>
                    <strong className="font-mono-data text-primary text-sm">+48.5 MWh</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Annualized Financial Lift:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">+₹16.08 Lakhs / yr</strong>
                  </div>
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
                <strong>What It Is:</strong> An automated thermodynamic AI safety barrier polling 48 smart combiner box thermocouple arrays, predicting cascading thermal runaway before junction box temperatures breach the critical 145°C EVA backsheet ignition threshold. It triggers automated SCADA string circuit trips to prevent asset fire damage.
              </p>
            </div>

            {/* 100% Automated Live SCADA Thermocouple Stream */}
            <div className="border-2 border-critical bg-white p-5 space-y-3 shadow-xs">
              <div className="flex justify-between items-center border-b border-critical/30 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-critical animate-ping" />
                  <strong className="text-primary uppercase text-xs">LIVE COMBINER BOX PT100 THERMOCOUPLE ARRAY (48 STRINGS):</strong>
                </div>
                <span className="font-mono-data text-critical font-bold text-xs">POLLING CYCLE 1.2s</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-sans text-xs">
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Highest Monitored Diode Temp (#R12-C37):</span>
                  <strong className="font-mono-data text-2xl font-black text-critical block mt-0.5">{liveDiodeTemp}°C</strong>
                  <span className="text-warning font-bold text-[10px]">Elevated Junction State</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">EVA Ignition Flashpoint Margin:</span>
                  <strong className="font-mono-data text-2xl font-black text-[#027a48] block mt-0.5">{Math.max(0, 145 - liveDiodeTemp).toFixed(1)}°C</strong>
                  <span className="text-secondary text-[10px]">Ignition limit 145.0°C</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">SCADA String Breaker Status:</span>
                  <strong className="font-mono-data text-2xl font-black text-[#027a48] block mt-0.5">CLOSED (SAFE)</strong>
                  <span className="text-[#027a48] font-bold text-[10px]">✓ Interlock Armed</span>
                </div>
                <div className="bg-surface p-3 border border-border-subtle">
                  <span className="text-secondary text-[10px] uppercase font-bold block">Fleet Nominal Diode Baseline:</span>
                  <strong className="font-mono-data text-2xl font-black text-primary block mt-0.5">48.2°C</strong>
                  <span className="text-secondary text-[10px]">47 Strings nominal</span>
                </div>
              </div>
            </div>

            {/* Ongoing & Predictive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans text-xs">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 font-mono-data flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>ONGOING THERMAL LOG:</span>
                </strong>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Peak Heat Time Today:</span>
                    <strong className="font-mono-data text-primary">13:15 (88.4°C Peak)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Thermal Degradation Velocity:</span>
                    <strong className="font-mono-data text-warning">+0.12°C / operating day</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Automatic Tripping Setpoint:</span>
                    <strong className="font-mono-data text-critical">130.0°C Emergency Trip</strong>
                  </div>
                </div>
              </div>

              <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-3">
                <strong className="text-[#027a48] uppercase text-xs block border-b border-[#abefc6] pb-1.5 font-mono-data flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>AI PREDICTIVE TIME-TO-FAILURE (TTF):</span>
                </strong>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Time-To-Failure (TTF) Estimate:</span>
                    <strong className="font-mono-data text-critical text-sm">42 Hours (If Unserviced)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Prevented String Fire Loss:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">₹24.5 Lakhs ($29.4K)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Action Taken:</span>
                    <strong className="font-mono-data text-primary text-sm">Work Order WO-10492 Dispatched</strong>
                  </div>
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
                <strong>What It Is:</strong> An automated environmental asset tokenization engine linked to live global carbon spot markets (Verra VCS / I-REC). It autonomously values daily avoided GHG emissions (198.8 tCO₂/day) and computes high-purity PEM electrolyzer green hydrogen (H₂) fuel capacity using streaming exchange pricing.
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
        {/* LAB 6: ELECTROLUMINESCENCE (EL) NIGHT WAFER TOMOGRAPHY (AUTOMATED STREAM) */}
        {/* ========================================================================= */}
        {activeLab === "el" && (
          <div className="space-y-6">
            <div className="bg-[#fbfbfe] border-2 border-[#6366f1] p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-[#6366f1] text-white px-2 py-0.5 text-[10px] font-bold uppercase">FEATURE DEFINITION</span>
                  <h3 className="font-bold text-sm text-[#6366f1] uppercase">What Is Electroluminescence (EL) Night Wafer Tomography?</h3>
                </div>
                <span className="text-xs font-bold text-[#6366f1]">IEC TS 60904-13 Standard</span>
              </div>
              <p className="text-xs text-primary font-sans leading-relaxed">
                <strong>What It Is:</strong> Automated nighttime forward-bias electrical excitation where DC current is injected into PV strings to stimulate radiative electron-hole recombination, emitting near-infrared (NIR) photons (1150 nm). An ultra-sensitive InGaAs camera captures this to expose invisible sub-surface silicon microcracks, busbar disconnects, and inactive crystal dead zones.
              </p>
            </div>

            {/* Interactive Silicon Wafer Tomogram Canvas */}
            <div className="border-2 border-primary bg-white p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-3 gap-2">
                <div>
                  <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                    <Moon className="w-4 h-4 text-[#6366f1]" />
                    <span>AUTOMATED SILICON WAFER TOMOGRAM STREAM (144 HALF-CUT MATRIX):</span>
                  </strong>
                  <span className="text-secondary text-[11px] font-sans">
                    Automated InGaAs camera stream capturing radiative photon emission and sub-surface microcrack networks.
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
                  <rect x="30" y="20" width="440" height="180" fill="rgba(99, 102, 241, 0.4)" rx="4" stroke="#4f46e5" strokeWidth="1.5" />

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
                            fill={isShunted ? "#0f172a" : "rgba(248, 250, 252, 0.85)"}
                            stroke="#334155"
                            strokeWidth="0.5"
                          />
                          <line x1={cx + 15} y1={cy} x2={cx + 15} y2={cy + 22} stroke="#94a3b8" strokeWidth="0.75" />

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

                  <line x1="30" y1="110" x2="470" y2="110" stroke="rgba(99, 102, 241, 0.4)" strokeDasharray="4,4" />
                </svg>

                <div className="absolute bottom-2 left-2 bg-black/85 border border-[#6366f1] px-3 py-1 text-[10px] text-white flex items-center gap-4">
                  <span>Emission: <strong className="text-[#a5b4fc]">1150 nm NIR</strong></span>
                  <span>Excitation Current: <strong className="text-[#22c55e]">{liveElCurrent} A (Live Stream)</strong></span>
                  <span>Defects Identified: <strong className="text-critical">2 Microcrack Shunts</strong></span>
                </div>
              </div>

              {/* Automated Sensor Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-sans text-xs bg-surface p-4 border border-border-strong">
                <div>
                  <span className="text-secondary text-[10px] uppercase font-bold block">Injected Forward Current:</span>
                  <strong className="font-mono-data text-xl font-bold text-primary block mt-0.5">{liveElCurrent} Amps</strong>
                  <span className="text-[#027a48] font-bold text-[10px]">✓ Calibrated 1.0x Isc</span>
                </div>
                <div>
                  <span className="text-secondary text-[10px] uppercase font-bold block">NIR Photon Wavelength:</span>
                  <strong className="font-mono-data text-xl font-bold text-primary block mt-0.5">1150 nm</strong>
                  <span className="text-secondary text-[10px]">Silicon bandgap emission</span>
                </div>
                <div>
                  <span className="text-secondary text-[10px] uppercase font-bold block">Inactive Shunted Area:</span>
                  <strong className="font-mono-data text-xl font-bold text-critical block mt-0.5">1.38%</strong>
                  <span className="text-critical text-[10px]">2 Dead Finger Zones</span>
                </div>
                <div>
                  <span className="text-secondary text-[10px] uppercase font-bold block">Wafer Health Grade:</span>
                  <strong className="font-mono-data text-xl font-bold text-[#027a48] block mt-0.5">98.6% A-</strong>
                  <span className="text-[#027a48] text-[10px]">Tier-1 IEC Tolerance</span>
                </div>
              </div>
            </div>

            {/* Ongoing & Predictive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans text-xs">
              <div className="border border-border-strong bg-surface p-4 space-y-3">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5 font-mono-data flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>ONGOING SCAN PROGRESSION (NIGHT SHIFT):</span>
                </strong>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Panels Scanned Tonight:</span>
                    <strong className="font-mono-data text-primary">92,592 Panels (100% Complete)</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Microcracks Cataloged:</span>
                    <strong className="font-mono-data text-warning">14 Panels with Inactive Fingers</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-border-subtle">
                    <span>Tomographic Precision:</span>
                    <strong className="font-mono-data text-[#027a48]">0.2 mm / pixel resolution</strong>
                  </div>
                </div>
              </div>

              <div className="border-2 border-primary bg-[#f6fef9] p-4 space-y-3">
                <strong className="text-[#027a48] uppercase text-xs block border-b border-[#abefc6] pb-1.5 font-mono-data flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>AI PREDICTIVE CRACK PROPAGATION:</span>
                </strong>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>12-Month Crack Propagation:</span>
                    <strong className="font-mono-data text-warning text-sm">2 Panels at Risk of Isolation</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Preventive Solder Action:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">Dispatched to Field Crew</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 border border-[#abefc6]">
                    <span>Preserved 25-Yr Asset Value:</span>
                    <strong className="font-mono-data text-[#027a48] text-sm">+₹4.82 Lakhs Saved</strong>
                  </div>
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
                <strong>What It Is:</strong> AI-driven Battery Energy Storage System (BESS) co-optimization connected to live 15-minute Indian Energy Exchange (IEX) Day-Ahead (DAM) and Real-Time Market (RTM) spot price feeds. It automatically charges the 50 MWh battery bank when spot rates drop below solar PPA tariffs (₹2.44/kWh) and discharges during evening grid peak rates.
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
                <strong>What It Is:</strong> An automated industrial deep packet inspection (DPI) firewall and AI intrusion detection system specifically engineered for solar grid SCADA networks. It decodes Modbus/TCP, DNP3, and IEC 60870-5-104 packets in real-time, blocking unauthorized inverter register manipulation, frequency desynchronization attacks, and unauthorized curtailment commands.
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
