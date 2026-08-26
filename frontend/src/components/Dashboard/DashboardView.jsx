import React, { useState } from "react";
import { 
  ShieldAlert, 
  TrendingDown, 
  Wrench, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Layers, 
  Sun, 
  Wind, 
  Thermometer, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Cpu, 
  Building2, 
  DollarSign, 
  AlertTriangle, 
  FileText, 
  X,
  Compass,
  BarChart3,
  MapPin,
  Check,
  Leaf,
  Sparkles
} from "lucide-react";

export default function DashboardView({ farm, onNavigateTab, onSelectModule }) {
  const [carbonPrice, setCarbonPrice] = useState(1000);
  const [carbonStandard, setCarbonStandard] = useState("irec"); // 'irec' | 'verra' | 'gold'
  const [showEsgModal, setShowEsgModal] = useState(false);

  // Deep-dive Modal State
  const [activeModal, setActiveModal] = useState(null);

  // Inverter Fleet Live Telemetry (INV-01 to INV-06)
  const inverters = [
    { id: "INV-01", name: "Sungrow SG3125HV #1", power_kw: 3080, target_kw: 3125, dc_v: 1245, temp_c: 48.2, health: 98, status: "Optimal" },
    { id: "INV-02", name: "Sungrow SG3125HV #2", power_kw: 2890, target_kw: 3125, dc_v: 1180, temp_c: 54.6, health: 91, status: "String Mismatch" },
    { id: "INV-03", name: "Sungrow SG3125HV #3", power_kw: 3110, target_kw: 3125, dc_v: 1250, temp_c: 47.9, health: 99, status: "Optimal" },
    { id: "INV-04", name: "Sungrow SG3125HV #4", power_kw: 2750, target_kw: 3125, dc_v: 1140, temp_c: 58.4, health: 86, status: "Hotspot Alert" },
    { id: "INV-05", name: "Sungrow SG3125HV #5", power_kw: 3040, target_kw: 3125, dc_v: 1238, temp_c: 49.1, health: 97, status: "Optimal" },
    { id: "INV-06", name: "Sungrow SG3125HV #6", power_kw: 3095, target_kw: 3125, dc_v: 1248, temp_c: 48.5, health: 98, status: "Optimal" },
  ];

  // Failure Mode Taxonomy Breakdown
  const defectTaxonomy = [
    { type: "Thermal Hotspots", count: 8, deltaT: "+18.4°C", severity: "Critical", loss_kwh: 1.42, annual_loss_inr: "₹44,050", annual_loss_usd: "$528", primaryMod: "R12-C37", action: "Diode Replacement" },
    { type: "Wafer Microcracks", count: 14, deltaT: "+4.2°C", severity: "High", loss_kwh: 0.88, annual_loss_inr: "₹27,300", annual_loss_usd: "$328", primaryMod: "R07-C45", action: "Micro-soldering" },
    { type: "Desert Sand Soiling", count: 42, deltaT: "+1.2°C", severity: "Medium", loss_kwh: 0.65, annual_loss_inr: "₹35,680", annual_loss_usd: "$428", primaryMod: "R15-C22", action: "Robotic Wash" },
    { type: "Potential-Induced Degradation (PID)", count: 3, deltaT: "+6.5°C", severity: "High", loss_kwh: 0.95, annual_loss_inr: "₹18,400", annual_loss_usd: "$220", primaryMod: "R08-C50", action: "Anti-PID Offset" },
    { type: "Vegetation Shading", count: 6, deltaT: "+2.1°C", severity: "Medium", loss_kwh: 0.45, annual_loss_inr: "₹8,900", annual_loss_usd: "$106", primaryMod: "R20-C10", action: "Perimeter Trim" },
    { type: "Snail Trails", count: 12, deltaT: "+0.8°C", severity: "Low", loss_kwh: 0.25, annual_loss_inr: "₹4,200", annual_loss_usd: "$50", primaryMod: "R18-C52", action: "Monitor" },
  ];

  // High Priority Action Items
  const actionQueue = [
    { id: "ACT-01", module: "R12-C37", inverter: "INV-04", issue: "Severe Bypass Diode Hotspot (+18.4°C)", urgency: "Critical (P1)", assigned: "Tech #04 (R. Sharma)", sla: "14h Remaining", cost: "₹4,500" },
    { id: "ACT-02", module: "R04-C18", inverter: "INV-02", issue: "Ribbon Lead Burnout & Hotspot (+24.5°C)", urgency: "Critical (P1)", assigned: "Tech #02 (K. Verma)", sla: "6h Remaining", cost: "₹5,200" },
    { id: "ACT-03", module: "R15-C22", inverter: "INV-01", issue: "Heavy Desert Sand Soiling (24.2% Opacity)", urgency: "Medium (P3)", assigned: "Cleaning Crew Alpha", sla: "36h Remaining", cost: "₹1,200" }
  ];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Meteorological Weather SCADA Strip */}
      <div className="bg-surface border border-border-subtle p-3 flex flex-wrap items-center justify-between gap-4 font-mono-data text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block animate-pulse" />
          <span className="font-bold text-primary uppercase">SCADA METEOROLOGICAL TELEMETRY:</span>
        </div>
        <div className="flex items-center gap-6 flex-wrap text-secondary text-[11px]">
          <div className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-warning" /><span>GHI: <strong className="text-primary font-mono-data">942 W/m²</strong></span></div>
          <div className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-critical" /><span>Ambient: <strong className="text-primary font-mono-data">41.8°C</strong></span></div>
          <div className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-critical" /><span>Module Temp: <strong className="text-critical font-mono-data">58.4°C</strong></span></div>
          <div className="flex items-center gap-1.5"><Wind className="w-3.5 h-3.5 text-primary" /><span>Wind: <strong className="text-primary font-mono-data">16.4 km/h NW</strong></span></div>
          <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-secondary" /><span>Soiling Index: <strong className="text-primary font-mono-data">3.4 / 10</strong></span></div>
        </div>
      </div>

      {/* 2. Top Executive KPI Grid (5-Column Power Strip) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Plant Health Score */}
        <div 
          onClick={() => setActiveModal("health")}
          className="border-2 border-primary bg-white p-5 space-y-2 cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-secondary uppercase font-bold font-mono-data">OPERATIONAL HEALTH</span>
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </div>
          <div>
            <strong className="text-4xl font-black text-primary font-mono-data block tracking-tight">
              {farm?.health_score || 97}<span className="text-lg text-secondary font-normal font-sans">/100</span>
            </strong>
            <span className="text-[#027a48] text-[11px] font-bold font-mono-data mt-1 block">
              ✓ IEC 62446-3 Tier-1 (Optimal)
            </span>
          </div>
        </div>

        {/* Active Capacity & Generation */}
        <div 
          onClick={() => setActiveModal("generation")}
          className="border border-border-strong bg-white p-5 space-y-2 cursor-pointer hover:border-primary hover:shadow-xs transition-all flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-secondary uppercase font-bold font-mono-data">DAILY ENERGY GENERATION</span>
            <Zap className="w-4 h-4 text-warning" />
          </div>
          <div>
            <strong className="text-3xl font-bold text-primary font-mono-data block">
              248.5 <span className="text-sm text-secondary font-normal font-sans">MWh/d</span>
            </strong>
            <span className="text-secondary text-[11px] font-mono-data mt-1 block">
              Revenue: ₹14.91 Lakhs / day ($17.8K)
            </span>
          </div>
        </div>

        {/* Degradation Rate */}
        <div 
          onClick={() => setActiveModal("degradation")}
          className="border border-border-strong bg-white p-5 space-y-2 cursor-pointer hover:border-primary hover:shadow-xs transition-all flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-secondary uppercase font-bold font-mono-data">FLEET DEGRADATION</span>
            <TrendingDown className="w-4 h-4 text-[#027a48]" />
          </div>
          <div>
            <strong className="text-3xl font-bold text-primary font-mono-data block">
              0.42% <span className="text-sm text-secondary font-normal font-sans">/ yr</span>
            </strong>
            <span className="text-[#027a48] text-[11px] font-bold font-mono-data mt-1 block">
              ✓ Better than 0.70% baseline
            </span>
          </div>
        </div>

        {/* Active Work Orders */}
        <div 
          onClick={() => onNavigateTab("maintenance")}
          className="border border-border-strong bg-white p-5 space-y-2 cursor-pointer hover:border-primary hover:shadow-xs transition-all flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-secondary uppercase font-bold font-mono-data">ACTIVE O&M TICKETS</span>
            <Wrench className="w-4 h-4 text-primary" />
          </div>
          <div>
            <strong className="text-3xl font-bold text-critical font-mono-data block">
              3 <span className="text-sm text-secondary font-normal font-sans">Dispatched</span>
            </strong>
            <span className="text-secondary text-[11px] font-mono-data mt-1 block">
              P1 Critical: 2 · P3 Routine: 1
            </span>
          </div>
        </div>

        {/* 5. Verified Carbon Offsets (I-REC / Verra) */}
        <div 
          onClick={() => setActiveModal("carbon")}
          className="border-2 border-[#027a48] bg-[#f6fef9] p-5 space-y-2 cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(2,122,72,1)] transition-all flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[#027a48] uppercase font-bold font-mono-data">CARBON OFFSET LEDGER</span>
            <Leaf className="w-4 h-4 text-[#027a48]" />
          </div>
          <div>
            <strong className="text-3xl font-black text-[#027a48] font-mono-data block tracking-tight">
              198.8 <span className="text-sm text-[#027a48] font-normal font-sans">tCO₂/d</span>
            </strong>
            <span className="text-[#027a48] text-[11px] font-bold font-mono-data mt-1 block">
              +₹1.98 Lakhs / day (I-REC)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Deep Plant Infrastructure & Engineering Registry */}
      <div className="border border-border-strong bg-white p-6 space-y-4 shadow-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
              PLANT INFRASTRUCTURE, GRID INTERCONNECT & ASSET ENGINEERING KNOWLEDGE BASE
            </h3>
          </div>
          <span className="text-[10px] font-mono-data text-[#027a48] font-bold">240-ACRE ASSET</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-data text-xs">
          {/* Column 1: Grid & Contract */}
          <div className="p-4 border border-border-subtle bg-surface space-y-2">
            <strong className="text-primary font-sans text-xs uppercase block border-b border-border-subtle pb-1">
              1. Grid & Commercial Offtake
            </strong>
            <div className="space-y-1 text-[11px] text-secondary font-sans">
              <div className="flex justify-between"><span className="text-secondary">PPA Offtaker:</span> <strong className="font-mono-data text-primary">SECI (25-Yr BOO)</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Tariff:</span> <strong className="font-mono-data text-primary">₹2.44 / kWh ($0.029)</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Interconnect GSS:</span> <strong className="font-mono-data text-primary">220kV RVPNL Substation</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Transformers:</span> <strong className="font-mono-data text-primary">33kV / 220kV 50 MVA Oil</strong></div>
            </div>
          </div>

          {/* Column 2: PV Array & Tracking */}
          <div className="p-4 border border-border-subtle bg-surface space-y-2">
            <strong className="text-primary font-sans text-xs uppercase block border-b border-border-subtle pb-1">
              2. Module Array & Trackers
            </strong>
            <div className="space-y-1 text-[11px] text-secondary font-sans">
              <div className="flex justify-between"><span className="text-secondary">Total Modules:</span> <strong className="font-mono-data text-primary">92,592 Panels (540 Wp)</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Module Type:</span> <strong className="font-mono-data text-primary">LONGi Hi-MO 6 144-HalfCut</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Solar Trackers:</span> <strong className="font-mono-data text-primary">NEXTracker Horizon (±60°)</strong></div>
              <div className="flex justify-between"><span className="text-secondary">DC/AC Overload:</span> <strong className="font-mono-data text-primary">1.11x (50 MWp / 45 MW)</strong></div>
            </div>
          </div>

          {/* Column 3: Inverters & Sensors */}
          <div className="p-4 border border-border-subtle bg-surface space-y-2">
            <strong className="text-primary font-sans text-xs uppercase block border-b border-border-subtle pb-1">
              3. Inverters & Pyranometers
            </strong>
            <div className="space-y-1 text-[11px] text-secondary font-sans">
              <div className="flex justify-between"><span className="text-secondary">Inverter Fleet:</span> <strong className="font-mono-data text-primary">6x Sungrow SG3125HV-30</strong></div>
              <div className="flex justify-between"><span className="text-secondary">String Combiners:</span> <strong className="font-mono-data text-primary">48 DC Smart Combiner Boxes</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Pyranometers:</span> <strong className="font-mono-data text-primary">Dual Kipp & Zonen CMP11</strong></div>
              <div className="flex justify-between"><span className="text-secondary">Soiling Stations:</span> <strong className="font-mono-data text-primary">4 Optical Transmission Eyes</strong></div>
            </div>
          </div>
        </div>
      </div>

            {/* 4. COMPREHENSIVE ENTERPRISE CARBON CREDIT LEDGER (I-REC / VERRA) & GREEN H2 ENGINE */}
      <div className="border-2 border-primary bg-white p-6 space-y-6 shadow-xs select-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-3 gap-2">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#027a48]" />
            <div>
              <h3 className="font-headline-lg text-lg font-bold uppercase tracking-tight text-primary">
                ENTERPRISE VERIFIED CARBON CREDIT LEDGER (I-REC / VERRA) & GREEN HYDROGEN YIELD ENGINE
              </h3>
              <p className="text-[11px] text-secondary font-sans mt-0.5">
                Real-time cryptographic tokenization of clean energy generation into tradeable environmental assets & PEM hydrogen
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEsgModal(true)}
              className="bg-[#027a48] text-white font-mono-data text-xs font-bold px-3 py-1.5 uppercase hover:bg-white hover:text-[#027a48] border border-[#027a48] transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>VIEW OFFICIAL ESG CERTIFICATE →</span>
            </button>
          </div>
        </div>

        {/* Token Registry & Verification Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface p-4 border border-border-strong font-mono-data text-xs">
          <div><span className="text-secondary uppercase text-[10px] block font-bold font-sans">Token Registry:</span><strong className="text-[#027a48]">I-REC / Verra VCS Verified</strong></div>
          <div><span className="text-secondary uppercase text-[10px] block font-bold font-sans">Registry Serial:</span><strong className="text-primary">VCS-2026-IND-04892</strong></div>
          <div><span className="text-secondary uppercase text-[10px] block font-bold font-sans">On-Chain Tx Hash:</span><strong className="text-primary font-mono-data truncate block">0x7f48...c842</strong></div>
          <div><span className="text-secondary uppercase text-[10px] block font-bold font-sans">Lifetime Avoided:</span><strong className="text-primary">72,562 Metric Tons CO₂</strong></div>
        </div>

        {/* Standard Selector Tabs */}
        <div className="flex items-center gap-2 font-mono-data text-xs">
          <span className="text-secondary uppercase text-[10px] font-bold font-sans">Active Standard Index:</span>
          {[
            { id: "irec", label: "I-REC Standard (₹1,000 / tCO₂e)", price: 1000 },
            { id: "verra", label: "Verra VCS (₹1,450 / tCO₂e)", price: 1450 },
            { id: "gold", label: "Gold Standard (₹1,850 / tCO₂e)", price: 1850 },
          ].map((std) => (
            <button
              key={std.id}
              onClick={() => {
                setCarbonStandard(std.id);
                setCarbonPrice(std.price);
              }}
              className={`px-3 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer border ${
                carbonStandard === std.id ? "bg-primary text-white border-primary shadow-xs" : "bg-white text-secondary border-border-subtle hover:border-primary"
              }`}
            >
              {std.label}
            </button>
          ))}
        </div>

        {/* 2-Column Ledger & Green Hydrogen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono-data text-xs">
          {/* Carbon Offsets & Monetization Box */}
          <div className="bg-[#f6fef9] p-5 border-2 border-[#027a48] space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#abefc6] pb-2">
              <strong className="text-[#027a48] text-xs uppercase font-bold flex items-center gap-1.5">
                <Leaf className="w-4 h-4" />
                <span>REAL-TIME CARBON CREDIT MONETIZATION ENGINE:</span>
              </strong>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-0.5 text-[10px] font-bold">
                198.8 TONS CO₂ / DAY
              </span>
            </div>
            
            <div className="space-y-3 text-xs font-sans text-primary">
              <div className="flex justify-between items-center">
                <span>Daily Verified Carbon Emissions Avoided:</span>
                <strong className="font-mono-data text-2xl font-black text-[#027a48]">198.8 Metric Tons</strong>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Carbon Credit Market Index (I-REC / Verra):</span>
                  <strong className="font-mono-data text-primary">₹{carbonPrice.toLocaleString()} / Ton (${(carbonPrice / 83.3).toFixed(2)} / tCO₂e)</strong>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="3000" 
                  step="50" 
                  value={carbonPrice} 
                  onChange={(e) => setCarbonPrice(Number(e.target.value))} 
                  className="w-full accent-[#027a48] cursor-pointer"
                />
              </div>

              <div className="flex justify-between items-center border-t border-[#abefc6] pt-2">
                <span>Daily Tokenized Carbon Revenue:</span>
                <strong className="font-mono-data text-xl font-bold text-[#027a48]">+₹{Math.round(198.8 * carbonPrice).toLocaleString()} / day (${Math.round((198.8 * carbonPrice) / 83.3).toLocaleString()})</strong>
              </div>

              <div className="flex justify-between items-center">
                <span>Annualized Environmental Asset Valuation:</span>
                <strong className="font-mono-data text-[#027a48] text-lg font-bold">₹{((198.8 * carbonPrice * 365) / 10000000).toFixed(2)} Crores / yr</strong>
              </div>
            </div>
          </div>

          {/* Green Hydrogen Industrial Electrolyzer Hub */}
          <div className="bg-surface p-5 border-2 border-primary space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary text-xs uppercase font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-warning" />
                <span>PEM GREEN HYDROGEN INDUSTRIAL ELECTROLYZER:</span>
              </strong>
              <span className="bg-primary text-white px-2.5 py-0.5 text-[10px] font-bold">
                1,093.4 KG H₂ / DAY
              </span>
            </div>

            <div className="space-y-3 text-xs font-sans text-primary">
              <div className="flex justify-between items-center">
                <span>Electrolyzer Specific Energy Consumption:</span>
                <strong className="font-mono-data text-primary">55.0 kWh / kg H₂ (4.4 kg/MWh)</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Daily High-Purity Green H₂ Production:</span>
                <strong className="font-mono-data text-2xl font-black text-primary">1,093.4 kg H₂ / day</strong>
              </div>
              <div className="flex justify-between items-center border-t border-border-subtle pt-2">
                <span>Green Hydrogen Spot Market Rate (₹400/kg):</span>
                <strong className="font-mono-data text-[#027a48] text-xl font-bold">₹4,37,360 / day ($5,250)</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Annualized Green H₂ Yield:</span>
                <strong className="font-mono-data text-primary text-lg font-bold">399.1 Metric Tons H₂ / yr (₹15.96 Cr/yr)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Official ESG Certificate Modal */}
      {showEsgModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
          <div className="bg-white border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-4xl max-h-[90vh] overflow-y-auto font-sans p-8 space-y-6 relative custom-scrollbar">
            <button
              onClick={() => setShowEsgModal(false)}
              className="absolute top-4 right-4 text-secondary hover:text-primary p-1 border border-transparent hover:border-primary cursor-pointer print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-2 border-[#027a48] p-8 space-y-6 bg-[#f6fef9]">
              <div className="flex justify-between items-start border-b-2 border-[#027a48] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Leaf className="w-5 h-5 text-[#027a48]" />
                    <span className="font-mono-data text-xs font-bold text-[#027a48] uppercase tracking-widest">
                      INTERNATIONAL RENEWABLE ENERGY CERTIFICATE (I-REC) REGISTRY
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-2xl font-black text-primary tracking-tight">
                    OFFICIAL VERIFIED CARBON OFFSET ASSET CERTIFICATE
                  </h1>
                  <p className="text-secondary text-xs mt-0.5">
                    Issued to: {farm?.name || "Bhadla Mega Solar Park - Sector 4"} (50.0 MWp DC)
                  </p>
                </div>
                <div className="text-right font-mono-data text-xs">
                  <span className="text-[10px] text-secondary uppercase block font-bold">TOKEN SERIAL:</span>
                  <strong className="text-[#027a48] text-sm font-bold">VCS-2026-IND-04892</strong>
                  <span className="text-[#027a48] font-bold block text-[10px]">✓ VERRA MINTED</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 border border-[#abefc6] font-mono-data text-xs">
                <div><span className="text-secondary text-[10px] uppercase font-bold block">Daily Offsets:</span><strong className="text-2xl font-black text-[#027a48] block">198.8 tCO₂</strong></div>
                <div><span className="text-secondary text-[10px] uppercase font-bold block">Annualized:</span><strong className="text-2xl font-black text-primary block">72,562 tCO₂</strong></div>
                <div><span className="text-secondary text-[10px] uppercase font-bold block">Asset Valuation:</span><strong className="text-2xl font-black text-[#027a48] block">₹7.25 Cr/yr</strong></div>
                <div><span className="text-secondary text-[10px] uppercase font-bold block">Clean Fuel Yield:</span><strong className="text-2xl font-black text-primary block">399.1 t H₂/yr</strong></div>
              </div>

              <div className="p-4 bg-white border border-border-strong flex justify-between items-center text-xs font-sans">
                <div>
                  <span className="text-[10px] font-mono-data uppercase font-bold text-secondary block">ENVIRONMENTAL AUDITOR REGISTRAR:</span>
                  <strong className="font-mono-data text-primary text-sm">Verra VCS & Gold Standard Registry</strong>
                  <span className="text-secondary block text-[11px]">Cryptographic SHA-256 On-Chain Proof Recorded</span>
                </div>
                <span className="text-[#027a48] font-mono-data font-bold text-xs">✓ VERIFIED & MINTED</span>
              </div>
            </div>

            <div className="flex justify-between items-center print:hidden border-t border-border-subtle pt-4 font-mono-data text-xs">
              <span className="text-secondary">Export to PDF for corporate ESG compliance and sustainability audits.</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEsgModal(false)}
                  className="bg-white border border-border-strong px-4 py-2 text-xs uppercase font-bold text-secondary hover:text-primary cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-[#027a48] text-white font-bold px-6 py-2 text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white hover:text-[#027a48] border border-[#027a48] transition-all cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>PRINT / SAVE ESG CERTIFICATE (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Live 6-Inverter Fleet Status Grid */}
      <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
              LIVE SUB-ARRAY CENTRAL INVERTER TELEMETRY (6x SUNGROW SG3125HV)
            </h3>
          </div>
          <span className="text-[10px] font-mono-data text-secondary">Updated Every 2s</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono-data text-xs">
          {inverters.map((inv) => {
            const isAlert = inv.health < 90;
            return (
              <div 
                key={inv.id}
                onClick={() => {
                  onSelectModule({ id: inv.id === "INV-04" ? "R12-C37" : "R01-C01", row: 1, col: 1 });
                  onNavigateTab("map");
                }}
                className={`p-3 border transition-all cursor-pointer bg-surface hover:bg-white ${
                  isAlert ? "border-critical bg-[#fef3f2]" : "border-border-subtle hover:border-primary"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <strong className="text-primary text-xs">{inv.id}</strong>
                  <span className={`text-[9px] font-bold px-1 py-0.2 uppercase ${isAlert ? "bg-critical text-white" : "bg-[#ecfdf3] text-[#027a48]"}`}>
                    {inv.health}%
                  </span>
                </div>
                <div className="space-y-0.5 text-[10px] text-secondary">
                  <div className="flex justify-between"><span>Power:</span> <strong className="text-primary">{inv.power_kw} kW</strong></div>
                  <div className="flex justify-between"><span>DC V:</span> <strong className="text-primary">{inv.dc_v} V</strong></div>
                  <div className="flex justify-between"><span>Temp:</span> <strong className={inv.temp_c > 55 ? "text-critical font-bold" : "text-primary"}>{inv.temp_c}°C</strong></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Two-Column Breakdown: Defect Taxonomy & High-Priority Action Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Defect Taxonomy Table (7 Cols) */}
        <div className="lg:col-span-7 border border-border-strong bg-white p-5 space-y-3 shadow-xs">
          <div className="flex justify-between items-center border-b border-border-subtle pb-2">
            <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
              FAILURE MODE TAXONOMY & LOSS ATTRIBUTION
            </h3>
            <span className="text-[10px] font-mono-data text-secondary">Click row to filter map</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono-data">
              <thead>
                <tr className="bg-surface border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                  <th className="py-2.5 px-3 font-sans">Failure Mode</th>
                  <th className="py-2.5 px-3">Count</th>
                  <th className="py-2.5 px-3">Temp Delta</th>
                  <th className="py-2.5 px-3">Annual Risk</th>
                  <th className="py-2.5 px-3 font-sans">Required Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-xs">
                {defectTaxonomy.map((d, idx) => (
                  <tr 
                    key={idx}
                    onClick={() => {
                      onSelectModule({ id: d.primaryMod, row: 12, col: 37 });
                      onNavigateTab("map");
                    }}
                    className="hover:bg-surface transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-3 font-sans font-bold text-primary flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${d.severity === "Critical" ? "bg-critical" : d.severity === "High" ? "bg-warning" : "bg-secondary"}`} />
                      <span>{d.type}</span>
                    </td>
                    <td className="py-2.5 px-3 font-bold">{d.count}</td>
                    <td className="py-2.5 px-3 text-critical font-bold">{d.deltaT}</td>
                    <td className="py-2.5 px-3 font-bold text-primary">{d.annual_loss_inr}</td>
                    <td className="py-2.5 px-3 text-secondary font-sans text-[11px]">{d.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* High-Priority Action Queue (5 Cols) */}
        <div className="lg:col-span-5 border-2 border-primary bg-white p-5 space-y-3 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-border-subtle pb-2 mb-3">
              <div className="flex items-center gap-1.5 text-primary font-bold text-xs uppercase font-mono-data">
                <AlertTriangle className="w-4 h-4 text-critical" />
                <span>HIGH-PRIORITY ACTION QUEUE</span>
              </div>
              <span className="bg-critical text-white text-[9px] font-mono-data font-bold px-1.5 py-0.2 uppercase">
                3 PENDING
              </span>
            </div>

            <div className="space-y-3 font-mono-data text-xs">
              {actionQueue.map((act) => (
                <div 
                  key={act.id}
                  className="p-3 border border-border-subtle bg-surface hover:bg-white hover:border-primary transition-all cursor-pointer"
                  onClick={() => {
                    onSelectModule({ id: act.module, row: 12, col: 37 });
                    onNavigateTab("map");
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <strong className="text-primary text-xs">#{act.module} ({act.inverter})</strong>
                    <span className="text-critical font-bold text-[10px]">{act.urgency}</span>
                  </div>
                  <p className="text-secondary font-sans text-[11px] mb-2">{act.issue}</p>
                  <div className="flex justify-between items-center text-[10px] text-secondary border-t border-border-subtle pt-1.5">
                    <span>{act.assigned}</span>
                    <strong className="text-critical">{act.sla}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("map")}
            className="w-full bg-primary text-white font-bold py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-between border border-primary hover:bg-white hover:text-primary transition-all cursor-pointer mt-3"
          >
            <span>VIEW ANOMALIES ON DIGITAL TWIN GRID →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
