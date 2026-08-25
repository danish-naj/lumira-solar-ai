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
  Cpu
} from "lucide-react";

export default function BreakthroughLabs({ farm, onNavigateTab }) {
  // Active Lab Module: 'bifacial' | 'terrain' | 'fire' | 'carbon' | 'sar' | 'el' | 'bess' | 'dock' | 'cyber'
  const [activeLab, setActiveLab] = useState("bifacial");

  // State for Lab 1: Bifacial Albedo
  const [albedoValue, setAlbedoValue] = useState(0.28); // 0.15 - 0.40
  const [frontGHI, setFrontGHI] = useState(942); // W/m²

  // State for Lab 2: Terrain Backtracking
  const [terrainSlope, setTerrainSlope] = useState(3.5); // degrees
  const [trackerTilt, setTrackerTilt] = useState(42.5); // degrees
  const [shadingMitigated, setShadingMitigated] = useState(true);

  // State for Lab 3: Thermal Runaway Cascade
  const [diodeTemp, setDiodeTemp] = useState(88.4); // °C
  const [stringTripped, setStringTripped] = useState(false);

  // State for Lab 4: Carbon Credit & Green Hydrogen
  const [carbonPriceINR, setCarbonPriceINR] = useState(1000); // ₹ per ton CO2

  // State for Lab 7: BESS Arbitrage
  const [gridSpotPrice, setGridSpotPrice] = useState(4.85); // ₹/kWh

  // State for Lab 8: Drone Dock
  const [dockStatus, setDockStatus] = useState("Charging (84%)");
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
    { id: "el", name: "6. EL Night X-Ray Tomogram", icon: Moon, tag: "WAFER TOMOGRAPHY" },
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
              Next-Gen Photovoltaic Physics, Aerospace & Grid AI
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
      <div className="border-2 border-primary bg-white p-6 shadow-xs font-mono-data text-xs">
        {/* LAB 1: BIFACIAL ALBEDO REFLECTION */}
        {activeLab === "bifacial" && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">INNOVATION LAB #1</span>
                <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                  Bifacial Albedo Ground Reflection & Rear-Side Heat Engine
                </h2>
                <p className="text-secondary text-xs font-sans mt-0.5">
                  Simulates dual-sided GHI absorption and calculates rear-side energy yield loss caused by ground gravel darkening.
                </p>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold">
                BIFACIAL GAIN: +18.4%
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="relative border border-border-strong bg-[#0f172a] h-60 p-4 rounded-none text-white">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <circle cx="200" cy="25" r="16" fill="#facc15" />
                    <line x1="200" y1="45" x2="200" y2="70" stroke="#facc15" strokeWidth="2" strokeDasharray="3,3" />
                    <line x1="180" y1="40" x2="140" y2="85" stroke="#facc15" strokeWidth="2" />
                    <line x1="220" y1="40" x2="260" y2="85" stroke="#facc15" strokeWidth="2" />
                    <line x1="120" y1="100" x2="280" y2="70" stroke="#38bdf8" strokeWidth="8" />
                    <text x="160" y="80" fill="#ffffff" fontSize="9" fontFamily="monospace">FRONT: {frontGHI} W/m²</text>
                    <rect x="40" y="160" width="320" height="20" fill="#334155" stroke="#64748b" />
                    <text x="120" y="174" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Ground Albedo: {(albedoValue * 100).toFixed(0)}% Reflectance</text>
                    <line x1="100" y1="160" x2="160" y2="105" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
                    <line x1="280" y1="160" x2="230" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="160" y="130" fill="#38bdf8" fontSize="9" fontFamily="monospace">REAR: {(frontGHI * albedoValue).toFixed(0)} W/m²</text>
                  </svg>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase block">
                    GROUND GRAVEL ALBEDO COEFFICIENT: {(albedoValue * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.15"
                    max="0.40"
                    step="0.01"
                    value={albedoValue}
                    onChange={(e) => setAlbedoValue(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div className="bg-surface p-4 border border-border-subtle space-y-2">
                  <strong className="text-primary font-mono-data text-xs uppercase block border-b border-border-subtle pb-1">
                    DUAL-SIDED POWER GENERATION SUMMARY:
                  </strong>
                  <div className="space-y-1 text-secondary">
                    <div className="flex justify-between"><span>Front-Side Yield (Direct GHI):</span> <strong className="font-mono-data text-primary">210.0 MWh / day</strong></div>
                    <div className="flex justify-between"><span>Rear-Side Yield (Albedo Reflection):</span> <strong className="font-mono-data text-[#027a48]">38.5 MWh / day (+18.4%)</strong></div>
                    <div className="flex justify-between"><span>Total Bifacial Yield:</span> <strong className="font-mono-data text-primary font-bold">248.5 MWh / day</strong></div>
                    <div className="flex justify-between"><span>Annual Albedo Contribution:</span> <strong className="font-mono-data text-[#027a48]">₹34.2 Lakhs / yr ($41K)</strong></div>
                  </div>
                </div>

                <div className="p-3 bg-[#f6fef9] border border-[#abefc6] text-[#027a48] font-medium">
                  ✓ Albedo Soil Scanner recommends deploying white limestone gravel top-dressing on Row 12 to boost rear reflectance by +12%.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAB 2: AI TERRAIN BACKTRACKING */}
        {activeLab === "terrain" && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">INNOVATION LAB #2</span>
                <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                  AI-Powered Terrain Backtracking & Row-to-Row Shading Optimizer
                </h2>
                <p className="text-secondary text-xs font-sans mt-0.5">
                  Uses LiDAR 3D elevation maps to compute micro-degree tracker tilt adjustments to eliminate row shadows.
                </p>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold">
                RECOVERED YIELD: +3.8%
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-[#0f172a] h-60 p-4 text-white flex items-center justify-center">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <path d="M 20 160 Q 200 130 380 170 L 380 190 L 20 190 Z" fill="#1e293b" stroke="#334155" />
                  <line x1="80" y1="150" x2="160" y2="100" stroke="#38bdf8" strokeWidth="6" />
                  <circle cx="120" cy="125" r="4" fill="#facc15" />
                  <text x="90" y="90" fill="#ffffff" fontSize="9" fontFamily="monospace">Row 1: {trackerTilt}°</text>
                  <line x1="240" y1="140" x2="320" y2="90" stroke="#38bdf8" strokeWidth="6" />
                  <circle cx="280" cy="115" r="4" fill="#facc15" />
                  <text x="250" y="80" fill="#ffffff" fontSize="9" fontFamily="monospace">Row 2: {(trackerTilt - 0.4).toFixed(1)}° (Optimized)</text>
                  <line x1="160" y1="100" x2="240" y2="155" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3,3" />
                  <text x="170" y="145" fill="#22c55e" fontSize="9" fontFamily="monospace">Zero Shadow Clear</text>
                </svg>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div className="bg-surface p-4 border border-border-subtle space-y-2">
                  <strong className="text-primary font-mono-data text-xs uppercase block border-b border-border-subtle pb-1">
                    3D TERRAIN PARAMETERS:
                  </strong>
                  <div className="space-y-1 text-secondary">
                    <div className="flex justify-between"><span>Uneven Ground Slope:</span> <strong className="font-mono-data text-primary">3.5° East-West Incline</strong></div>
                    <div className="flex justify-between"><span>Micro-Angle Adjustment:</span> <strong className="font-mono-data text-[#027a48]">-0.4° Smart Offset</strong></div>
                    <div className="flex justify-between"><span>Morning/Evening Shading Loss:</span> <strong className="font-mono-data text-[#027a48]">0.0% (Eliminated)</strong></div>
                    <div className="flex justify-between"><span>Daily Recovered Power:</span> <strong className="font-mono-data text-primary font-bold">+9.4 MWh / day</strong></div>
                  </div>
                </div>

                <div className="p-3 bg-[#f6fef9] border border-[#abefc6] text-[#027a48] font-medium">
                  ✓ Neural-Net backtracking active on all 48 string tracker controllers.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAB 3: THERMAL RUNAWAY FIRE CASCADE */}
        {activeLab === "fire" && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">INNOVATION LAB #3</span>
                <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                  Sub-Module Thermal Runaway Cascade & Fire Propagation Predictor
                </h2>
                <p className="text-secondary text-xs font-sans mt-0.5">
                  Thermodynamic heat diffusion model predicting countdown to EVA polymer ignition at 115°C.
                </p>
              </div>
              <span className={`px-2.5 py-1 text-xs font-bold ${stringTripped ? "bg-[#ecfdf3] text-[#027a48]" : "bg-[#fef3f2] text-critical"}`}>
                {stringTripped ? "STRING ISOLATED" : "CASCADE MONITOR ACTIVE"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-[#0f172a] h-60 p-4 text-white flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs">
                  <span>TARGET: #R12-C37 (INV-04)</span>
                  <span className="text-critical font-bold">DIODE: {diodeTemp}°C</span>
                </div>

                <div className="relative w-full h-24 bg-black border border-border-strong flex items-center justify-center">
                  <div 
                    style={{ width: `${(diodeTemp / 115) * 100}%` }} 
                    className={`h-full transition-all flex items-center justify-center font-bold text-xs ${diodeTemp > 80 ? "bg-critical text-white" : "bg-warning text-black"}`}
                  >
                    THERMAL SPREAD VELOCITY: 2.8°C / HR
                  </div>
                </div>

                <div className="flex justify-between text-[11px] text-[#cbd5e1]">
                  <span>Nominal: 45°C</span>
                  <span>EVA Degradation: 115°C</span>
                </div>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div className="bg-[#fef3f2] p-4 border-2 border-critical space-y-2">
                  <strong className="text-critical font-mono-data text-xs uppercase block font-bold">
                    CRITICAL FIRE HAZARD COUNTDOWN:
                  </strong>
                  <div className="text-sm font-black font-mono-data text-critical">
                    4.2 HOURS UNTIL EVA BACKSHEET COMBUSTION
                  </div>
                  <p className="text-critical text-xs leading-relaxed">
                    Localized reverse-bias short circuit is heating adjacent wafer EVA encapsulation. Instant string isolation recommended.
                  </p>
                </div>

                {!stringTripped ? (
                  <button
                    onClick={() => setStringTripped(true)}
                    className="w-full bg-critical text-white font-bold py-3 px-4 border-2 border-critical hover:bg-white hover:text-critical transition-all uppercase text-xs tracking-wider cursor-pointer shadow-xs"
                  >
                    TRIGGER EMERGENCY REMOTE STRING TRIP (INV-04 DC-04)
                  </button>
                ) : (
                  <div className="bg-[#ecfdf3] border border-[#abefc6] p-3 text-center text-xs font-bold text-[#027a48]">
                    ✓ STRING TRIPPED & CURRENT DE-ENERGIZED · FIRE RISK MITIGATED
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LAB 4: CARBON CREDITS (I-REC) & GREEN HYDROGEN */}
        {activeLab === "carbon" && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">INNOVATION LAB #4</span>
                <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                  Real-Time Carbon Credit Ledger (I-REC) & Green Hydrogen Yield Engine
                </h2>
                <p className="text-secondary text-xs font-sans mt-0.5">
                  Tokenizes daily clean energy generation into verifiable I-REC credits and calculates PEM green hydrogen capacity.
                </p>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold">
                198.8 TONS CO₂ / DAY
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#f6fef9] p-6 border-2 border-[#027a48] space-y-4">
                <strong className="text-[#027a48] text-xs uppercase block font-bold border-b border-[#abefc6] pb-2">
                  VERIFIED CARBON OFFSET REVENUE (I-REC LEDGER):
                </strong>
                <div className="space-y-2 text-xs font-sans text-primary">
                  <div className="flex justify-between"><span>Daily Carbon Avoided:</span> <strong className="font-mono-data text-2xl font-black text-[#027a48]">198.8 Metric Tons</strong></div>
                  <div className="flex justify-between"><span>Carbon Credit Market Price:</span> <strong className="font-mono-data text-primary">₹1,000 / Ton ($12.00)</strong></div>
                  <div className="flex justify-between"><span>Daily Carbon Credit Revenue:</span> <strong className="font-mono-data text-xl font-bold text-[#027a48]">+₹1,98,800 / day</strong></div>
                  <div className="flex justify-between"><span>Annualized Carbon Monetization:</span> <strong className="font-mono-data text-[#027a48] font-bold">₹7.25 Crores / yr ($870K)</strong></div>
                </div>
              </div>

              <div className="bg-surface p-6 border border-border-strong space-y-4">
                <strong className="text-primary text-xs uppercase block font-bold border-b border-border-subtle pb-2">
                  GREEN HYDROGEN PEM ELECTROLYZER YIELD:
                </strong>
                <div className="space-y-2 text-xs font-sans text-primary">
                  <div className="flex justify-between"><span>Electrolyzer Specific Energy:</span> <strong className="font-mono-data text-primary">4.4 kg H₂ / MWh</strong></div>
                  <div className="flex justify-between"><span>Daily Green H₂ Production:</span> <strong className="font-mono-data text-2xl font-black text-primary">1,093.4 kg H₂ / day</strong></div>
                  <div className="flex justify-between"><span>Hydrogen Green Market Value:</span> <strong className="font-mono-data text-[#027a48] text-xl font-bold">₹4,37,360 / day ($5.2K)</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAB 5: SATELLITE SAR RADAR SUBSIDENCE */}
        {activeLab === "sar" && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">INNOVATION LAB #5</span>
                <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                  Satellite SAR Radar Sub-Surface Soil Subsidence & Pile Sinking AI
                </h2>
                <p className="text-secondary text-xs font-sans mt-0.5">
                  Ingests ESA Sentinel-1 C-band radar interferometry to detect sub-millimeter foundation sinking before torque tubes snap.
                </p>
              </div>
              <span className="bg-surface text-primary border border-border-strong px-2.5 py-1 text-xs font-bold">
                ESA SENTINEL-1 C-BAND
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-[#0f172a] h-60 p-4 text-white flex items-center justify-center">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <rect x="30" y="30" width="340" height="140" fill="#1e293b" stroke="#334155" />
                  <circle cx="120" cy="80" r="14" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" />
                  <text x="90" y="85" fill="#22c55e" fontSize="9" fontFamily="monospace">Stable (0.1mm)</text>
                  <circle cx="260" cy="120" r="22" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" className="animate-ping" />
                  <circle cx="260" cy="120" r="18" fill="rgba(239, 68, 68, 0.6)" stroke="#ef4444" />
                  <text x="210" y="125" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    Subsidence: -14.2 mm (Sector 4 Pile #88)
                  </text>
                </svg>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div className="bg-surface p-4 border border-border-subtle space-y-2">
                  <strong className="text-primary font-mono-data text-xs uppercase block border-b border-border-subtle pb-1">
                    RADAR INTERFEROMETRY TELEMETRY:
                  </strong>
                  <div className="space-y-1 text-secondary">
                    <div className="flex justify-between"><span>Satellite Pass Date:</span> <strong className="font-mono-data text-primary">24 Aug 2026 (Orbit #142)</strong></div>
                    <div className="flex justify-between"><span>Maximum Ground Sinking:</span> <strong className="font-mono-data text-critical">-14.2 mm (Pile #88)</strong></div>
                    <div className="flex justify-between"><span>Torque Tube Torsional Stress:</span> <strong className="font-mono-data text-warning">84% Yield Strength</strong></div>
                    <div className="flex justify-between"><span>Preventative Action:</span> <strong className="font-mono-data text-primary">Civil Pile Re-jacking Dispatched</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAB 6: ELECTROLUMINESCENCE (EL) NIGHT-FLIGHT */}
        {activeLab === "el" && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">INNOVATION LAB #6</span>
                <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                  Electroluminescence (EL) Night-Flight SWIR Crack Tomogram
                </h2>
                <p className="text-secondary text-xs font-sans mt-0.5">
                  Reverse current excitation during night sweeps causes silicon cells to glow in infrared like an X-ray.
                </p>
              </div>
              <span className="bg-primary text-white px-2.5 py-1 text-xs font-bold">
                SWIR NIGHT TOMOGRAPHY
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border-strong bg-black h-60 p-4 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80"
                  alt="EL Scan"
                  className="w-full h-full object-cover filter contrast-200 grayscale opacity-90"
                />
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div className="bg-surface p-4 border border-border-subtle space-y-2">
                  <strong className="text-primary font-mono-data text-xs uppercase block border-b border-border-subtle pb-1">
                    EL EMISSION ANALYSIS (#R07-C45):
                  </strong>
                  <div className="space-y-1 text-secondary">
                    <div className="flex justify-between"><span>Reverse Excitation Current:</span> <strong className="font-mono-data text-primary">8.5 A @ 48V</strong></div>
                    <div className="flex justify-between"><span>Dead Silicon Islands:</span> <strong className="font-mono-data text-critical">2 Inactive Fragments (Cell 14)</strong></div>
                    <div className="flex justify-between"><span>Finger Micro-Discontinuity:</span> <strong className="font-mono-data text-warning">4 Fractured Busbars</strong></div>
                    <div className="flex justify-between"><span>PID Shunting Level:</span> <strong className="font-mono-data text-primary">Low (0.4%)</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAB 7: SPOT MARKET BESS BATTERY ARBITRAGE */}
        {activeLab === "bess" && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">INNOVATION LAB #7</span>
                <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                  Spot Market BESS Battery Arbitrage & Virtual Power Plant (VPP) FFR
                </h2>
                <p className="text-secondary text-xs font-sans mt-0.5">
                  Real-time IEX wholesale price arbitrage and sub-200ms synthetic inertia grid stabilization.
                </p>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold">
                GRID FFR: 50.02 Hz
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans text-xs">
              <div className="bg-surface p-5 border border-border-strong space-y-3">
                <strong className="text-primary font-mono-data text-xs uppercase block border-b border-border-subtle pb-1">
                  LIVE ARBITRAGE ROUTING:
                </strong>
                <div className="space-y-1.5 text-secondary">
                  <div className="flex justify-between"><span>Wholesale Spot Price (IEX):</span> <strong className="font-mono-data text-primary font-bold">₹{gridSpotPrice} / kWh</strong></div>
                  <div className="flex justify-between"><span>BESS State of Charge (SoC):</span> <strong className="font-mono-data text-[#027a48]">88% (20 MWh System)</strong></div>
                  <div className="flex justify-between"><span>Optimal Action:</span> <strong className="font-mono-data text-[#027a48] font-bold">EXPORT TO GRID (PEAK PRICE)</strong></div>
                  <div className="flex justify-between"><span>Arbitrage Net Margin:</span> <strong className="font-mono-data text-[#027a48]">+₹2.41 / kWh Spread</strong></div>
                </div>
              </div>

              <div className="bg-[#f6fef9] p-5 border-2 border-[#027a48] space-y-2">
                <strong className="text-[#027a48] font-mono-data text-xs uppercase block font-bold">
                  SYNTHETIC INERTIA & FAST FREQUENCY RESPONSE (FFR):
                </strong>
                <p className="text-primary text-xs leading-relaxed">
                  Inverters automatically inject 4.2 MVAR reactive power within <strong>140 milliseconds</strong> during grid frequency dips, stabilizing the 220kV bus.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* LAB 8: AUTONOMOUS DRONE DOCK 24/7 */}
        {activeLab === "dock" && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">INNOVATION LAB #8</span>
                <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                  Autonomous Drone-in-a-Box (Nest) 24/7 Robotic Docking Station Manager
                </h2>
                <p className="text-secondary text-xs font-sans mt-0.5">
                  Weatherproof autonomous robotic hangar with 25-min rapid charging and zero-human-pilot SCADA trigger.
                </p>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold">
                DOCK ALPHA ONLINE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans text-xs">
              <div className="bg-surface p-5 border border-border-strong space-y-3">
                <strong className="text-primary font-mono-data text-xs uppercase block border-b border-border-subtle pb-1">
                  ROBOTIC HANGAR TELEMETRY:
                </strong>
                <div className="space-y-1.5 text-secondary">
                  <div className="flex justify-between"><span>Hangar Location:</span> <strong className="font-mono-data text-primary">Sector 4 Central Pad</strong></div>
                  <div className="flex justify-between"><span>Rapid Charge Status:</span> <strong className="font-mono-data text-[#027a48]">{dockStatus}</strong></div>
                  <div className="flex justify-between"><span>Internal Temp & Humidity:</span> <strong className="font-mono-data text-primary">24.2°C · 32% RH</strong></div>
                  <div className="flex justify-between"><span>Roof Hatch Status:</span> <strong className="font-mono-data text-primary">{dockHatchOpen ? "OPEN (READY FOR TAKEOFF)" : "SEALED (WEATHERPROOF)"}</strong></div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setDockHatchOpen(!dockHatchOpen)}
                  className="w-full bg-primary text-white font-bold py-3.5 px-4 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider cursor-pointer shadow-xs"
                >
                  {dockHatchOpen ? "CLOSE & SEAL ROBOTIC DOCK HATCH" : "OPEN HATCH & ARM AUTONOMOUS LAUNCH"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LAB 9: SCADA CYBER FIREWALL */}
        {activeLab === "cyber" && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">INNOVATION LAB #9</span>
                <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                  Industrial SCADA Cyber-Defense & Grid Intrusion Firewall AI
                </h2>
                <p className="text-secondary text-xs font-sans mt-0.5">
                  Deep-packet inspection of Modbus/TCP and IEC 60870-5-104 protecting against rogue inverter phase desync.
                </p>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold">
                FIREWALL ACTIVE
              </span>
            </div>

            <div className="space-y-3">
              <strong className="text-primary uppercase text-xs block">
                RECENT BLOCKED INTRUSION ATTEMPTS:
              </strong>
              <div className="space-y-2">
                {cyberAlerts.map((a) => (
                  <div key={a.id} className="p-3 bg-surface border border-border-strong flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-critical block">{a.type}</strong>
                      <span className="text-secondary text-[11px]">Source IP: {a.ip} · {a.time}</span>
                    </div>
                    <span className="bg-[#fef3f2] text-critical border border-critical px-2 py-0.5 text-[9px] font-bold uppercase">
                      ✓ {a.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
