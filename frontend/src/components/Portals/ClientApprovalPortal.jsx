import WarrantyClaimEngine from "../Warranty/WarrantyClaimEngine";
import PredictiveYieldEngine from "../Predictive/PredictiveYieldEngine";
import BreakthroughLabs from "../BreakthroughLabs/BreakthroughLabs";
import StormDefenseCockpit from "../StormDefense/StormDefenseCockpit";
import { Scale, CloudRain } from "lucide-react";
import React, { useState } from "react";
import { 
  CheckCircle2, 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Check, 
  X, 
  Wrench, 
  TrendingUp, 
  Building2, 
  FileText, 
  UserCheck, 
  Sparkles, 
  DollarSign, 
  Zap, 
  Sun, 
  Calendar, 
  CreditCard, 
  Download, 
  ShieldCheck, 
  Layers, 
  RotateCcw, 
  Eye, 
  CheckSquare, 
  PlusCircle, 
  Send
} from "lucide-react";

export default function ClientApprovalPortal({ 
  farm, 
  pendingReports = [], 
  onApproveReport, 
  onNavigateTab 
}) {
  // 5-Section Sidebar Navigation
  // 1 = Plant Overview & Health, 2 = Energy & Financial ROI, 3 = Pending Reports Approval, 4 = Ongoing Repairs Tracker, 5 = Book Inspection & Subscription
  const [activeTab, setActiveTab] = useState(1);

  // Currency Switcher for Tab 2: 'INR' | 'USD'
  const [currency, setCurrency] = useState("INR");

  // Track approved reports
  const [approvedReports, setApprovedReports] = useState([]);

  // Booking Form State for Tab 5
  const [bookingDate, setBookingDate] = useState("2026-09-01");
  const [bookingModality, setBookingModality] = useState("Drone Orthomosaic + Thermal");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  // Client Bespoke OEM Warranty State
  const [clientSelectedOem, setClientSelectedOem] = useState("longi");
  const [authorizedClaims, setAuthorizedClaims] = useState(["CLM-JINKO-2026-07"]);
  const [showClientDossier, setShowClientDossier] = useState(false);
  // Client Full Carbon Credit State
  const [clientCarbonStandard, setClientCarbonStandard] = useState("irec");
  const [clientCarbonPrice, setClientCarbonPrice] = useState(1000);
  const [showClientEsgModal, setShowClientEsgModal] = useState(false);



  // Default initial pending proposals if none dynamically submitted
  const defaultPending = [
    {
      id: "REP-849201",
      farm_id: farm?.id || "farm-1",
      module_id: "R12-C37",
      defect_type: "Bypass Diode Thermal Runaway",
      severity: "Critical (P1)",
      delta_t: 18.4,
      daily_loss_kwh: 1.42,
      annual_revenue_risk_inr: "₹44,050",
      annual_revenue_risk_usd: "$528",
      estimated_repair_cost_inr: "₹4,500",
      estimated_repair_cost_usd: "$54",
      payback_months: "1.2 months",
      roi_multiplier: "9.8x",
      repair_action: "Replace sub-string Schottky bypass diode (15SQ045) & reseal junction box.",
      safety_caution: "HIGH ARC FLASH HAZARD (>600V DC). Lockout/Tagout Inverter INV-04 DC Combiner before contact.",
      inspector_name: "Capt. A. Nair (Certified Thermographer #8492)",
      inspection_source: "Handheld Thermal + Drone",
      submitted_at: "2026-08-25 09:30 AM",
      status: "Pending Client Approval",
      sla_hours: 24,
      recommended_tech: "Technician #04 (R. Sharma - High Voltage Specialist)"
    },
    {
      id: "REP-849202",
      farm_id: farm?.id || "farm-1",
      module_id: "R04-C18",
      defect_type: "Thermal Hotspot & Ribbon Burnout",
      severity: "Critical (P1)",
      delta_t: 24.5,
      daily_loss_kwh: 1.58,
      annual_revenue_risk_inr: "₹48,900",
      annual_revenue_risk_usd: "$586",
      estimated_repair_cost_inr: "₹5,200",
      estimated_repair_cost_usd: "$62",
      payback_months: "1.3 months",
      roi_multiplier: "9.4x",
      repair_action: "Isolate string, solder internal ribbon lead & replace bypass sub-string module.",
      safety_caution: "Fire hazard risk. Isolate string combiner immediately with 1000V insulated gloves.",
      inspector_name: "Capt. A. Nair (Certified Thermographer #8492)",
      inspection_source: "Drone Orthomosaic",
      submitted_at: "2026-08-25 10:15 AM",
      status: "Pending Client Approval",
      sla_hours: 24,
      recommended_tech: "Technician #02 (K. Verma - Lead Electrician)"
    }
  ];

  const allPending = [...pendingReports, ...defaultPending.filter(dp => !pendingReports.some(pr => pr.module_id === dp.module_id))];

  const handleApprove = (report) => {
    setApprovedReports(prev => [...prev, report.id]);
    if (onApproveReport) {
      onApproveReport(report);
    }
  };

  const handleBookInspection = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-64px)] select-none bg-surface-container-lowest font-sans">
      {/* ========================================================================= */}
      {/* CLIENT PORTAL EXECUTIVE SIDEBAR                                           */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-72 bg-surface border-r border-border-subtle p-5 flex flex-col justify-between shrink-0 space-y-6">
        <div>
          {/* Header */}
          <div className="border-b border-border-subtle pb-3 mb-4">
            <div className="flex items-center gap-1.5 text-primary font-bold text-xs uppercase font-mono-data mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>ASSET OWNER PORTAL</span>
            </div>
            <h2 className="text-sm font-bold text-primary font-mono-data">
              CleanEnergy Global Assets
            </h2>
            <span className="text-[10px] text-secondary font-mono-data block mt-0.5">
              Portfolio: {farm?.name || "Bhadla Mega Solar Park"}
            </span>
          </div>

          {/* Sidebar Nav Links */}
          <div className="space-y-2 font-mono-data text-xs">
            <button
              onClick={() => setActiveTab(1)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 1 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 1 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                1
              </span>
              <div>
                <span className="block uppercase text-[11px]">PLANT OVERVIEW</span>
                <span className={`text-[9px] font-sans ${activeTab === 1 ? "text-white/80" : "text-secondary"}`}>Health & Carbon Ledger</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(2)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 2 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 2 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                2
              </span>
              <div>
                <span className="block uppercase text-[11px]">ENERGY & FINANCIAL ROI</span>
                <span className={`text-[9px] font-sans ${activeTab === 2 ? "text-white/80" : "text-secondary"}`}>USD / INR Deltas</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(3)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 3 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 3 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                3
              </span>
              <div>
                <span className="block uppercase text-[11px]">PENDING APPROVALS</span>
                <span className={`text-[9px] font-sans ${activeTab === 3 ? "text-white/80" : "text-secondary"}`}>
                  {allPending.length - approvedReports.length} Action Required
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(4)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 4 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 4 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                4
              </span>
              <div>
                <span className="block uppercase text-[11px]">ONGOING REPAIRS</span>
                <span className={`text-[9px] font-sans ${activeTab === 4 ? "text-white/80" : "text-secondary"}`}>Technician O&M Tracker</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(5)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 5 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 5 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                5
              </span>
              <div>
                <span className="block uppercase text-[11px]">OEM LEGAL DISPUTES</span>
                <span className={`text-[9px] font-sans ${activeTab === 5 ? "text-white/80" : "text-secondary"}`}>₹10.07L Settlements</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(6)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 6 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 6 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                6
              </span>
              <div>
                <span className="block uppercase text-[11px]">PREDICTIVE ML YIELD</span>
                <span className={`text-[9px] font-sans ${activeTab === 6 ? "text-white/80" : "text-secondary"}`}>72h Irradiance Forecast</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(7)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 7 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 7 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                7
              </span>
              <div>
                <span className="block uppercase text-[11px]">BREAKTHROUGH LABS</span>
                <span className={`text-[9px] font-sans ${activeTab === 7 ? "text-white/80" : "text-secondary"}`}>9 World-First Engines</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(8)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 8 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 8 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                8
              </span>
              <div>
                <span className="block uppercase text-[11px]">STORM & HAIL DEFENSE</span>
                <span className={`text-[9px] font-sans ${activeTab === 8 ? "text-white/80" : "text-secondary"}`}>Automated 75° Stow</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(9)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 9 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 9 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                9
              </span>
              <div>
                <span className="block uppercase text-[11px]">BOOK & SUBSCRIPTION</span>
                <span className={`text-[9px] font-sans ${activeTab === 9 ? "text-white/80" : "text-secondary"}`}>Plan & Invoices</span>
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar Footer: Switcher to Inspector Portal */}
        <div className="border-t border-border-subtle pt-3">
          <button
            onClick={() => onNavigateTab("inspector-portal")}
            className="w-full bg-white border border-border-strong hover:bg-surface text-primary font-mono-data text-xs font-bold py-2.5 px-3 uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
          >
            <span>SWITCH TO INSPECTOR PORTAL →</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN CLIENT WORKSPACE                                                     */}
      {/* ========================================================================= */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
        {/* ========================================================================= */}
        {/* TAB 1: PLANT OVERVIEW & HEALTH DEEP-DIVE                                  */}
        {/* ========================================================================= */}
        {activeTab === 1 && (
          <div className="space-y-6 max-w-5xl">
            <div className="border-b border-border-subtle pb-4">
              <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                SECTION 1 OF 5: ASSET HEALTH & HARDWARE SPECIFICATIONS
              </span>
              <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                {farm?.name || "Bhadla Mega Solar Park - Sector 4"} (50.0 MWp)
              </h1>
              <p className="text-secondary text-xs mt-1">
                Asset Owner: <strong>CleanEnergy Global Assets India Ltd.</strong> · Grid Interconnect: 220kV Rajasthan Vidyut Prasaran Nigam GSS.
              </p>
            </div>

            {/* Health Score & Key Executive Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono-data text-xs">
              <div className="border-2 border-primary p-4 bg-white shadow-xs">
                <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Plant Health Score</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <strong className="text-3xl font-black text-primary">{farm?.health_score || 97}</strong>
                  <span className="text-secondary text-xs">/ 100</span>
                </div>
                <span className="text-[#027a48] text-[10px] font-bold block mt-1">✓ IEC 62446-3 Tier-1</span>
              </div>

              <div className="border border-border-strong p-4 bg-surface">
                <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Installed DC Capacity</span>
                <strong className="text-xl font-bold text-primary block mt-1">50.0 MWp</strong>
                <span className="text-secondary text-[11px]">45.0 MW AC Grid Export</span>
              </div>

              <div className="border border-border-strong p-4 bg-surface">
                <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Degradation Rate</span>
                <strong className="text-xl font-bold text-primary block mt-1">0.42% / yr</strong>
                <span className="text-[#027a48] text-[11px] font-bold">Top 5% Global Fleet</span>
              </div>

              <div className="border border-border-strong p-4 bg-surface">
                <span className="text-[10px] text-secondary uppercase font-sans font-bold block">PPA Feed-in Tariff</span>
                <strong className="text-xl font-bold text-primary block mt-1">₹2.44 / kWh</strong>
                <span className="text-secondary text-[11px]">$0.029 / kWh (25 Yr PPA)</span>
              </div>
            </div>

            {/* Hardware Registry & Inverter Breakdown */}
            <div className="border border-border-strong bg-white p-5 space-y-4 font-mono-data text-xs shadow-xs">
              <h3 className="font-bold text-primary uppercase text-xs flex items-center gap-2 border-b border-border-subtle pb-2">
                <Building2 className="w-4 h-4 text-primary" />
                HARDWARE & SUB-ARRAY INVERTER FLEET REGISTRY
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface p-3 border border-border-subtle space-y-2">
                  <strong className="text-primary block font-sans text-xs uppercase">Central Inverter Fleet</strong>
                  <div className="space-y-1 text-[11px] text-secondary">
                    <div className="flex justify-between"><span>Model:</span> <strong className="text-primary">6x Sungrow SG3125HV-30 (3.125 MW)</strong></div>
                    <div className="flex justify-between"><span>DC Input Voltage:</span> <strong className="text-primary">1500 V DC Max</strong></div>
                    <div className="flex justify-between"><span>Euro Efficiency:</span> <strong className="text-primary">98.7%</strong></div>
                    <div className="flex justify-between"><span>Cooling Protocol:</span> <strong className="text-primary">Smart Forced Air + IP65 Sealed</strong></div>
                  </div>
                </div>

                <div className="bg-surface p-3 border border-border-subtle space-y-2">
                  <strong className="text-primary block font-sans text-xs uppercase">PV Module Specifications</strong>
                  <div className="space-y-1 text-[11px] text-secondary">
                    <div className="flex justify-between"><span>Model:</span> <strong className="text-primary">LONGi Solar Hi-MO 6 Explorer</strong></div>
                    <div className="flex justify-between"><span>Nominal Power:</span> <strong className="text-primary">540 Wp Monocrystalline</strong></div>
                    <div className="flex justify-between"><span>Cell Architecture:</span> <strong className="text-primary">144 Half-Cut HPBC 9BB</strong></div>
                    <div className="flex justify-between"><span>Module Efficiency:</span> <strong className="text-primary">21.6%</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Meteorological Telemetry */}
            <div className="border border-border-strong bg-surface p-4 font-mono-data text-xs">
              <div className="flex justify-between items-center mb-2">
                <strong className="text-primary uppercase text-[11px] flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-warning" />
                  MICROCLIMATE PYRANOMETER & WEATHER SCADA
                </strong>
                <span className="text-[10px] text-[#027a48] font-bold">LIVE TELEMETRY</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                <div><span className="text-secondary block">GHI Irradiance:</span> <strong className="text-primary">942 W/m²</strong></div>
                <div><span className="text-secondary block">Ambient Temp:</span> <strong className="text-primary">41.8°C</strong></div>
                <div><span className="text-secondary block">Back-of-Module Temp:</span> <strong className="text-critical">58.4°C</strong></div>
                <div><span className="text-secondary block">Wind Vector:</span> <strong className="text-primary">16.4 km/h NW</strong></div>
              </div>
            </div>

            {/* FULL ENTERPRISE CARBON CREDIT LEDGER (I-REC / VERRA) & GREEN H2 ENGINE */}
            <div className="border-2 border-primary bg-white p-6 space-y-6 shadow-xs select-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌿</span>
                  <div>
                    <h3 className="font-headline-lg text-lg font-bold uppercase tracking-tight text-primary">
                      ENTERPRISE VERIFIED CARBON CREDIT LEDGER (I-REC / VERRA) & GREEN HYDROGEN YIELD ENGINE
                    </h3>
                    <p className="text-[11px] text-secondary font-sans mt-0.5">
                      Real-time cryptographic tokenization of clean energy generation into tradeable environmental assets & PEM hydrogen
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowClientEsgModal(true)}
                  className="bg-[#027a48] text-white font-mono-data text-xs font-bold px-3 py-1.5 uppercase hover:bg-white hover:text-[#027a48] border border-[#027a48] transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>VIEW OFFICIAL ESG CERTIFICATE →</span>
                </button>
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
                      setClientCarbonStandard(std.id);
                      setClientCarbonPrice(std.price);
                    }}
                    className={`px-3 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer border ${
                      clientCarbonStandard === std.id ? "bg-primary text-white border-primary shadow-xs" : "bg-white text-secondary border-border-subtle hover:border-primary"
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
                      <span>🌿</span>
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
                        <strong className="font-mono-data text-primary">₹{clientCarbonPrice.toLocaleString()} / Ton (${(clientCarbonPrice / 83.3).toFixed(2)} / tCO₂e)</strong>
                      </div>
                      <input 
                        type="range" 
                        min="500" 
                        max="3000" 
                        step="50" 
                        value={clientCarbonPrice} 
                        onChange={(e) => setClientCarbonPrice(Number(e.target.value))} 
                        className="w-full accent-[#027a48] cursor-pointer"
                      />
                    </div>

                    <div className="flex justify-between items-center border-t border-[#abefc6] pt-2">
                      <span>Daily Tokenized Carbon Revenue:</span>
                      <strong className="font-mono-data text-xl font-bold text-[#027a48]">+₹{Math.round(198.8 * clientCarbonPrice).toLocaleString()} / day (${Math.round((198.8 * clientCarbonPrice) / 83.3).toLocaleString()})</strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Annualized Environmental Asset Valuation:</span>
                      <strong className="font-mono-data text-[#027a48] text-lg font-bold">₹{((198.8 * clientCarbonPrice * 365) / 10000000).toFixed(2)} Crores / yr</strong>
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

            {/* Printable Official ESG Certificate Modal for Client */}
            {showClientEsgModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
                <div className="bg-white border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-4xl max-h-[90vh] overflow-y-auto font-sans p-8 space-y-6 relative custom-scrollbar">
                  <button
                    onClick={() => setShowClientEsgModal(false)}
                    className="absolute top-4 right-4 text-secondary hover:text-primary p-1 border border-transparent hover:border-primary cursor-pointer print:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="border-2 border-[#027a48] p-8 space-y-6 bg-[#f6fef9]">
                    <div className="flex justify-between items-start border-b-2 border-[#027a48] pb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">🌿</span>
                          <span className="font-mono-data text-xs font-bold text-[#027a48] uppercase tracking-widest">
                            INTERNATIONAL RENEWABLE ENERGY CERTIFICATE (I-REC) REGISTRY
                          </span>
                        </div>
                        <h1 className="font-headline-lg text-2xl font-black text-primary tracking-tight">
                          OFFICIAL VERIFIED CARBON OFFSET ASSET CERTIFICATE
                        </h1>
                        <p className="text-secondary text-xs mt-0.5">
                          Issued to Asset Owner: CleanEnergy Global Assets India Ltd. · {farm?.name || "Bhadla Mega Solar Park - Sector 4"}
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
                        onClick={() => setShowClientEsgModal(false)}
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
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ENERGY YIELD, FINANCIAL ROI & INSPECTION DELTA COMPARISON          */}
        {/* ========================================================================= */}
        {activeTab === 2 && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-4 gap-3">
              <div>
                <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                  SECTION 2 OF 5: FINANCIAL AUDIT & REVENUE RECOVERY
                </span>
                <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                  Energy Generation & AI Remediation Savings
                </h1>
                <p className="text-secondary text-xs mt-1">
                  Historical delta comparison between pre-inspection losses vs verified revenue recovery.
                </p>
              </div>

              {/* Currency Switcher */}
              <div className="flex items-center gap-1 border-2 border-primary p-1 bg-white font-mono-data text-xs shadow-xs">
                <button
                  onClick={() => setCurrency("INR")}
                  className={`px-3 py-1 font-bold transition-all cursor-pointer ${
                    currency === "INR" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
                  }`}
                >
                  INR (₹)
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1 font-bold transition-all cursor-pointer ${
                    currency === "USD" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>

            {/* Core Energy & Revenue Generation KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-data text-xs">
              <div className="border border-border-strong p-4 bg-surface">
                <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Daily Energy Generation</span>
                <strong className="text-2xl font-bold text-primary block mt-1">248.5 MWh / day</strong>
                <span className="text-[#027a48] text-[11px] font-bold">98.4% Nominal Plant Yield</span>
              </div>

              <div className="border border-border-strong p-4 bg-surface">
                <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Daily Power Revenue</span>
                <strong className="text-2xl font-bold text-primary block mt-1">
                  {currency === "INR" ? "₹14.91 Lakhs / d" : "$17,890 / day"}
                </strong>
                <span className="text-secondary text-[11px]">Tariff @ ₹2.44/kWh ($0.029/kWh)</span>
              </div>

              <div className="border-2 border-[#027a48] p-4 bg-[#f6fef9] shadow-xs">
                <span className="text-[10px] text-[#027a48] uppercase font-sans font-bold block">Annual Savings by AI Remediation</span>
                <strong className="text-2xl font-black text-[#027a48] block mt-1">
                  {currency === "INR" ? "₹1,55,930 / yr" : "$1,870 / yr"}
                </strong>
                <span className="text-[#027a48] text-[11px] font-bold">✓ 11.3x Repair ROI</span>
              </div>
            </div>

            {/* Historical Comparison Delta Table */}
            <div className="border border-border-strong bg-white p-6 space-y-4 font-mono-data text-xs shadow-xs">
              <h3 className="font-bold text-primary uppercase text-xs flex items-center gap-2 border-b border-border-subtle pb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                HISTORICAL BENCHMARK: BEFORE PREVIOUS INSPECTION VS CURRENT OPERATING STATE
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before Inspection */}
                <div className="border border-critical/40 bg-[#fef3f2] p-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-critical/20 pb-2">
                    <strong className="text-critical text-xs uppercase font-sans">Before Previous Inspection</strong>
                    <span className="bg-critical text-white px-2 py-0.5 text-[9px] font-bold">UNREPAIRED</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-primary">
                    <div className="flex justify-between"><span>Plant Health Score:</span> <strong className="text-critical">84 / 100</strong></div>
                    <div className="flex justify-between"><span>Active Defect Losses:</span> <strong className="text-critical">18.4 kWh / day</strong></div>
                    <div className="flex justify-between"><span>Annualized Revenue Loss:</span> <strong className="text-critical">{currency === "INR" ? "₹4,82,000 / yr" : "$5,780 / yr"}</strong></div>
                    <div className="flex justify-between"><span>Unaddressed Hotspots:</span> <strong className="text-critical">6 Diode Runaways</strong></div>
                  </div>
                </div>

                {/* Current State After AI Remediation */}
                <div className="border border-[#abefc6] bg-[#f6fef9] p-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-[#abefc6] pb-2">
                    <strong className="text-[#027a48] text-xs uppercase font-sans">Current Operating State (Post-Remediation)</strong>
                    <span className="bg-[#027a48] text-white px-2 py-0.5 text-[9px] font-bold">VERIFIED</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-primary">
                    <div className="flex justify-between"><span>Plant Health Score:</span> <strong className="text-[#027a48]">97 / 100 (+13 Pts)</strong></div>
                    <div className="flex justify-between"><span>Recovered Generation:</span> <strong className="text-[#027a48]">+14.2 kWh / day</strong></div>
                    <div className="flex justify-between"><span>Recovered Revenue:</span> <strong className="text-[#027a48]">{currency === "INR" ? "+₹1,55,930 / yr" : "+$1,870 / yr"}</strong></div>
                    <div className="flex justify-between"><span>Total Repair Cost Incurred:</span> <strong className="text-primary">{currency === "INR" ? "₹13,700" : "$164"}</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Yield Gain by Failure Mode Breakdown */}
            <div className="border border-border-subtle bg-surface p-5 space-y-3 font-mono-data text-xs">
              <strong className="text-primary uppercase text-[11px] block">
                REVENUE PRESERVATION BREAKDOWN BY DEFECT CATEGORY:
              </strong>
              <div className="space-y-2 font-sans text-xs">
                <div className="flex justify-between items-center bg-white p-2.5 border border-border-subtle">
                  <span>🔴 Bypass Diode Hotspot Replacements</span>
                  <strong className="font-mono-data text-[#027a48]">{currency === "INR" ? "₹44,050 / yr" : "$528 / yr"} (9.8x ROI)</strong>
                </div>
                <div className="flex justify-between items-center bg-white p-2.5 border border-border-subtle">
                  <span>🟣 Ribbon Burnout & Microcrack Soldering</span>
                  <strong className="font-mono-data text-[#027a48]">{currency === "INR" ? "₹48,900 / yr" : "$586 / yr"} (9.4x ROI)</strong>
                </div>
                <div className="flex justify-between items-center bg-white p-2.5 border border-border-subtle">
                  <span>🟠 Robotic Dry-Brush Array Soiling Removals</span>
                  <strong className="font-mono-data text-[#027a48]">{currency === "INR" ? "₹35,680 / yr" : "$428 / yr"} (29.7x ROI)</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PENDING INSPECTION REPORTS & 1-CLICK APPROVAL                       */}
        {/* ========================================================================= */}
        {activeTab === 3 && (
          <div className="space-y-6 max-w-5xl">
            <div className="border-b border-border-subtle pb-4">
              <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                SECTION 3 OF 5: PENDING FIELD INSPECTION PROPOSALS
              </span>
              <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                Inspection Reports Awaiting Authorization ({allPending.length - approvedReports.length})
              </h1>
              <p className="text-secondary text-xs mt-1">
                Review proposed repair actions, required budgets, and authorize instant service team dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allPending.map((rep) => {
                const isApproved = approvedReports.includes(rep.id);
                return (
                  <div 
                    key={rep.id} 
                    className={`border-2 p-6 flex flex-col justify-between transition-all bg-white shadow-xs ${
                      isApproved ? "border-[#027a48] bg-[#f6fef9]" : "border-primary"
                    }`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex justify-between items-start border-b border-border-subtle pb-3 mb-4">
                        <div>
                          <span className="text-[10px] font-mono-data font-bold text-secondary uppercase block">
                            REPORT ID: {rep.id} · {rep.submitted_at}
                          </span>
                          <h3 className="font-bold text-base text-primary font-mono-data mt-0.5">
                            PANEL #{rep.module_id} · {rep.defect_type}
                          </h3>
                        </div>
                        <span className={`px-2.5 py-1 text-xs font-bold uppercase font-mono-data border ${
                          isApproved 
                            ? "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]" 
                            : "bg-[#fef3f2] text-critical border-critical"
                        }`}>
                          {isApproved ? "✓ APPROVED" : "PENDING APPROVAL"}
                        </span>
                      </div>

                      {/* Financial & Technical Impact Grid */}
                      <div className="grid grid-cols-3 gap-2 bg-surface p-3 border border-border-subtle font-mono-data text-xs mb-4">
                        <div>
                          <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Thermal Delta</span>
                          <strong className="text-critical text-sm">+{rep.delta_t}°C</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Annual Loss Risk</span>
                          <strong className="text-primary text-sm">{rep.annual_revenue_risk_inr || rep.annual_revenue_risk}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Proposed Cost</span>
                          <strong className="text-[#027a48] text-sm">{rep.estimated_repair_cost_inr || rep.estimated_repair_cost}</strong>
                        </div>
                      </div>

                      {/* Proposed Remediation */}
                      <div className="space-y-1 mb-3 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-primary uppercase font-mono-data text-[11px]">
                          <Wrench className="w-3.5 h-3.5 text-primary" />
                          <span>PROPOSED REPAIR ACTION:</span>
                        </div>
                        <p className="text-secondary bg-surface p-2.5 border border-border-subtle leading-relaxed">
                          {rep.repair_action}
                        </p>
                      </div>

                      {/* Safety Caution */}
                      <div className="space-y-1 mb-4 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-critical uppercase font-mono-data text-[11px]">
                          <ShieldAlert className="w-3.5 h-3.5 text-critical" />
                          <span>SAFETY & WARRANTY CAUTION:</span>
                        </div>
                        <p className="text-critical bg-[#fef3f2] p-2.5 border border-critical/30 leading-relaxed font-medium">
                          {rep.safety_caution}
                        </p>
                      </div>

                      {/* Auto-assigned Technician & SLA */}
                      <div className="flex items-center justify-between text-xs font-mono-data text-secondary border-t border-border-subtle pt-3 mb-4">
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-primary" />
                          <span className="truncate max-w-[150px]">Auto-Assign: <strong>{rep.recommended_tech}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-primary font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>SLA: {rep.sla_hours} Hours</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div>
                      {isApproved ? (
                        <div className="bg-[#ecfdf3] border-2 border-[#027a48] p-3 text-center text-xs font-bold font-mono-data text-[#027a48] flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>APPROVED · WORK ORDER DISPATCHED TO SERVICE HUB</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApprove(rep)}
                          className="w-full bg-primary text-white font-bold py-3.5 px-4 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider cursor-pointer shadow-xs flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          <span>APPROVE REPAIRS & DISPATCH CREW</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: BESPOKE CLIENT OEM WARRANTY & SETTLEMENT COMMAND CENTER             */}
        {/* ========================================================================= */}
        {activeTab === 5 && (
          <div className="space-y-6 max-w-6xl font-sans select-none">
            {/* Header */}
            <div className="border-b-2 border-primary pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 border shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Scale className="w-4 h-4 text-primary" />
                  <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    ASSET OWNER OEM WARRANTY & SETTLEMENT COMMAND CENTER
                  </span>
                  <span className="font-mono-data text-xs text-secondary">
                    IEC 61215 Contract Breach Recovery
                  </span>
                </div>
                <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
                  Tier-1 Manufacturer Warranty Claims & Legal Settlement Portfolio
                </h1>
              </div>

              <div className="border-2 border-primary bg-white px-4 py-2 text-right font-mono-data text-xs shadow-xs">
                <span className="text-[10px] text-secondary uppercase font-bold block">TOTAL RECOVERABLE PORTFOLIO CAPITAL</span>
                <strong className="text-xl font-bold text-[#027a48] block">₹10,07,000 <span className="text-xs text-secondary font-normal font-sans">($12,080)</span></strong>
              </div>
            </div>

            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-data text-xs">
              <div className="p-4 border border-border-strong bg-white shadow-xs">
                <span className="text-secondary text-[10px] uppercase font-bold block">Total Claims Filed:</span>
                <strong className="text-2xl font-bold text-primary block mt-1">4 Dossiers</strong>
                <span className="text-secondary text-[11px] font-sans block mt-0.5">72 Defective Modules</span>
              </div>

              <div className="p-4 border-2 border-[#027a48] bg-[#f6fef9] shadow-xs">
                <span className="text-[#027a48] text-[10px] uppercase font-bold block">Settled & Reimbursed:</span>
                <strong className="text-2xl font-bold text-[#027a48] block mt-1">₹2,45,000</strong>
                <span className="text-[#027a48] text-[11px] font-sans block mt-0.5">100% Paid (JinkoSolar)</span>
              </div>

              <div className="p-4 border border-border-strong bg-white shadow-xs">
                <span className="text-secondary text-[10px] uppercase font-bold block">In Active Dispute:</span>
                <strong className="text-2xl font-bold text-critical block mt-1">₹7,62,000</strong>
                <span className="text-secondary text-[11px] font-sans block mt-0.5">LONGi, Trina & Canadian</span>
              </div>

              <div className="p-4 border border-border-strong bg-white shadow-xs">
                <span className="text-secondary text-[10px] uppercase font-bold block">Historical Success Rate:</span>
                <strong className="text-2xl font-bold text-primary block mt-1">94.2%</strong>
                <span className="text-[#027a48] text-[11px] font-sans block mt-0.5">IEC 61215 Evidentiary Standard</span>
              </div>
            </div>

            {/* Main Section: Supplier Exposure & Active Dispute Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
              {/* Supplier Selection Cards (5 Cols) */}
              <div className="lg:col-span-5 border border-border-strong bg-white p-5 space-y-3 shadow-xs">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-2">
                  TIER-1 SUPPLIER WARRANTY CLAIMS:
                </strong>

                <div className="space-y-2">
                  {[
                    { key: "longi", id: "CLM-LONGi-2026-08", name: "LONGi Solar Technology", model: "Hi-MO 6 Explorer 540M", units: 34, inr: "₹4,82,000", status: authorizedClaims.includes("CLM-LONGi-2026-08") ? "Authorized · Legal Notice Sent" : "Dossier Compiled · Pending Authorization" },
                    { key: "jinko", id: "CLM-JINKO-2026-07", name: "JinkoSolar Holding", model: "Tiger Pro 72HC 540W", units: 18, inr: "₹2,45,000", status: "Settled & Reimbursed (100%)" },
                    { key: "trina", id: "CLM-TRINA-2026-06", name: "Trina Solar Co., Ltd.", model: "Vertex TSM-DEG21C 600W", units: 12, inr: "₹1,68,000", status: authorizedClaims.includes("CLM-TRINA-2026-06") ? "In OEM Review" : "Draft Dossier" },
                    { key: "canadian", id: "CLM-CANADIAN-2026-05", name: "Canadian Solar Inc.", model: "BiHiKu7 650W", units: 8, inr: "₹1,12,000", status: "Compiled" },
                  ].map((s) => {
                    const isSelected = clientSelectedOem === s.key;
                    return (
                      <div
                        key={s.key}
                        onClick={() => setClientSelectedOem(s.key)}
                        className={`p-3.5 border transition-all cursor-pointer bg-surface hover:bg-white ${
                          isSelected ? "border-primary bg-[#f6fef9] ring-1 ring-primary shadow-xs" : "border-border-subtle hover:border-primary"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <strong className="text-primary text-xs font-bold">{s.name}</strong>
                          <strong className="text-[#027a48] font-mono-data">{s.inr}</strong>
                        </div>
                        <span className="text-[11px] text-secondary font-sans block">{s.model} ({s.units} Panels)</span>
                        <div className="flex justify-between items-center text-[10px] text-secondary border-t border-border-subtle pt-1.5 mt-2">
                          <span>Dossier: <strong>{s.id}</strong></span>
                          <span className={`font-bold ${s.status.includes("Settled") ? "text-[#027a48]" : s.status.includes("Authorized") ? "text-primary" : "text-warning"}`}>
                            {s.status.split("·")[0]}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Claim Dispute Dossier Details & Authorization (7 Cols) */}
              <div className="lg:col-span-7 border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
                <div className="flex justify-between items-start border-b border-border-subtle pb-3">
                  <div>
                    <span className="text-[10px] text-secondary font-bold uppercase block">
                      ACTIVE CLAIM: {clientSelectedOem === "longi" ? "CLM-LONGi-2026-08" : clientSelectedOem === "jinko" ? "CLM-JINKO-2026-07" : clientSelectedOem === "trina" ? "CLM-TRINA-2026-06" : "CLM-CANADIAN-2026-05"}
                    </span>
                    <strong className="text-base text-primary font-mono-data block mt-0.5">
                      {clientSelectedOem === "longi" ? "LONGi Solar Technology Co., Ltd." : clientSelectedOem === "jinko" ? "JinkoSolar Holding Co., Ltd." : clientSelectedOem === "trina" ? "Trina Solar Co., Ltd." : "Canadian Solar Inc."}
                    </strong>
                    <span className="text-secondary text-xs font-sans">
                      Targeted Asset: <strong>{farm?.name || "Bhadla Mega Solar Park - Sector 4"}</strong>
                    </span>
                  </div>
                  <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold uppercase">
                    {authorizedClaims.includes(clientSelectedOem === "longi" ? "CLM-LONGi-2026-08" : clientSelectedOem === "jinko" ? "CLM-JINKO-2026-07" : clientSelectedOem === "trina" ? "CLM-TRINA-2026-06" : "CLM-CANADIAN-2026-05") ? "✓ AUTHORIZED" : "PENDING CLIENT SIGN-OFF"}
                  </span>
                </div>

                {/* Dispute Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-surface p-4 border border-border-subtle font-sans text-xs">
                  <div><span className="text-secondary">Defective Units:</span> <strong className="font-mono-data text-critical text-sm block">{clientSelectedOem === "longi" ? "34 Units" : clientSelectedOem === "jinko" ? "18 Units" : clientSelectedOem === "trina" ? "12 Units" : "8 Units"}</strong></div>
                  <div><span className="text-secondary">Observed Power Drop:</span> <strong className="font-mono-data text-critical text-sm block">-22.5% Mismatch</strong></div>
                  <div><span className="text-secondary">Monetary Claim:</span> <strong className="font-mono-data text-[#027a48] text-sm block">{clientSelectedOem === "longi" ? "₹4,82,000 ($5,780)" : clientSelectedOem === "jinko" ? "₹2,45,000 ($2,940)" : clientSelectedOem === "trina" ? "₹1,68,000 ($2,015)" : "₹1,12,000 ($1,345)"}</strong></div>
                </div>

                {/* Legal Breach Clause */}
                <div className="space-y-1 font-sans">
                  <strong className="text-primary font-mono-data text-xs uppercase block">LEGAL BREACH EVIDENCE:</strong>
                  <p className="bg-surface p-3 border border-border-subtle text-secondary text-xs leading-relaxed">
                    Under IEC 61215 / IEC 61730 standards, maximum allowable degradation is 0.55%/yr. The observed -22.5% string mismatch constitutes an actionable defect.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  {!authorizedClaims.includes(clientSelectedOem === "longi" ? "CLM-LONGi-2026-08" : clientSelectedOem === "jinko" ? "CLM-JINKO-2026-07" : clientSelectedOem === "trina" ? "CLM-TRINA-2026-06" : "CLM-CANADIAN-2026-05") ? (
                    <button
                      onClick={() => {
                        const targetClaim = clientSelectedOem === "longi" ? "CLM-LONGi-2026-08" : clientSelectedOem === "jinko" ? "CLM-JINKO-2026-07" : clientSelectedOem === "trina" ? "CLM-TRINA-2026-06" : "CLM-CANADIAN-2026-05";
                        setAuthorizedClaims(prev => [...prev, targetClaim]);
                      }}
                      className="flex-1 bg-[#027a48] text-white font-bold py-3.5 px-4 border-2 border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all uppercase text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>AUTHORIZE FORMAL LEGAL DISPUTE FILING</span>
                    </button>
                  ) : (
                    <div className="flex-1 bg-[#ecfdf3] border border-[#abefc6] p-3 text-center text-xs font-bold text-[#027a48] flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>LEGAL FILING AUTHORIZED BY ASSET OWNER</span>
                    </div>
                  )}

                  <button
                    onClick={() => setShowClientDossier(true)}
                    className="bg-primary text-white font-bold py-3.5 px-4 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <FileText className="w-4 h-4" />
                    <span>PRINT LEGAL NOTICE (PDF)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Printable Modal */}
            {showClientDossier && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
                <div className="bg-white border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-4xl max-h-[90vh] overflow-y-auto font-sans p-8 space-y-6 relative custom-scrollbar">
                  <button
                    onClick={() => setShowClientDossier(false)}
                    className="absolute top-4 right-4 text-secondary hover:text-primary p-1 border border-transparent hover:border-primary cursor-pointer print:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="border-2 border-primary p-6 space-y-6 bg-surface">
                    <div className="flex justify-between items-start border-b-2 border-primary pb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Scale className="w-5 h-5 text-primary" />
                          <span className="font-mono-data text-xs font-bold text-secondary uppercase tracking-widest">
                            FORMAL NOTICE OF WARRANTY CLAIM & INDEMNIFICATION DEMAND
                          </span>
                        </div>
                        <h1 className="font-headline-lg text-2xl font-black text-primary tracking-tight">
                          OFFICIAL OEM CONTRACT BREACH DISPUTE DOSSIER
                        </h1>
                        <p className="text-secondary text-xs mt-0.5">
                          Executed by Asset Owner: {farm?.name || "Bhadla Mega Solar Park - Sector 4"}
                        </p>
                      </div>
                      <div className="text-right font-mono-data text-xs">
                        <span className="text-[10px] text-secondary uppercase block font-bold">CLAIM VALUE:</span>
                        <strong className="text-[#027a48] text-base font-bold">₹10,07,000 ($12,080)</strong>
                        <span className="text-[#027a48] font-bold block text-[10px]">✓ CLIENT AUTHORIZED</span>
                      </div>
                    </div>

                    <div className="p-4 bg-white border border-border-strong text-xs font-sans space-y-2 leading-relaxed">
                      <p>
                        <strong>FORMAL DEMAND:</strong> The Asset Owner formally demands immediate component replacement or monetary indemnification of <strong>₹10,07,000 ($12,080)</strong> for verified component failures violating IEC 61215 contractual warranties.
                      </p>
                    </div>

                    <div className="flex justify-between items-center print:hidden border-t border-border-subtle pt-4 font-mono-data text-xs">
                      <span className="text-secondary">Export to PDF for formal transmittal to OEM legal counsel.</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowClientDossier(false)}
                          className="bg-white border border-border-strong px-4 py-2 text-xs uppercase font-bold text-secondary hover:text-primary cursor-pointer"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => window.print()}
                          className="bg-primary text-white font-bold px-6 py-2 text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white hover:text-primary border border-primary transition-all cursor-pointer shadow-xs"
                        >
                          <Printer className="w-4 h-4" />
                          <span>PRINT / SAVE AS PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: PREDICTIVE ML YIELD ENGINE & FORECASTER                            */}
        {/* ========================================================================= */}
        {activeTab === 6 && (
          <div className="p-2">
            <PredictiveYieldEngine farm={farm} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: BREAKTHROUGH INNOVATION LABS (9 ENGINES)                           */}
        {/* ========================================================================= */}
        {activeTab === 7 && (
          <div className="p-2">
            <BreakthroughLabs farm={farm} onNavigateTab={onNavigateTab} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: SEVERE WEATHER & STORM DEFENSE COCKPIT                             */}
        {/* ========================================================================= */}
        {activeTab === 8 && (
          <div className="p-2">
            <StormDefenseCockpit farm={farm} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ONGOING REPAIRS & TECHNICIAN DISPATCH                              */}
        {/* ========================================================================= */}
        {activeTab === 4 && (
          <div className="space-y-6 max-w-5xl">
            <div className="border-b border-border-subtle pb-4">
              <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                SECTION 4 OF 5: FIELD SERVICE EXECUTION & SLA TRACKING
              </span>
              <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                Ongoing O&M Work Orders & Field Dispatch
              </h1>
              <p className="text-secondary text-xs mt-1">
                Real-time tracking of technician assignments, replacement components, and countdown to SLA resolution.
              </p>
            </div>

            <div className="border border-border-strong bg-white overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse font-mono-data">
                <thead>
                  <tr className="bg-surface border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                    <th className="py-3 px-4">Ticket ID</th>
                    <th className="py-3 px-4">Target Panel</th>
                    <th className="py-3 px-4 font-sans">Defect Classification</th>
                    <th className="py-3 px-4 font-sans">Assigned Technician</th>
                    <th className="py-3 px-4">SLA Deadline</th>
                    <th className="py-3 px-4">Execution Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-xs">
                  <tr className="hover:bg-surface transition-colors">
                    <td className="py-3 px-4 font-bold text-primary">WO-10492</td>
                    <td className="py-3 px-4 font-bold">#R12-C37</td>
                    <td className="py-3 px-4 font-sans text-primary">Bypass Diode Runaway</td>
                    <td className="py-3 px-4 font-sans text-secondary">Tech #04 (R. Sharma)</td>
                    <td className="py-3 px-4 text-[#027a48] font-bold">14h Remaining</td>
                    <td className="py-3 px-4">
                      <span className="bg-[#eff8ff] text-[#175cd3] border border-[#b2ddff] px-2 py-0.5 text-[9px] font-bold uppercase">
                        IN REPAIR (ON-SITE)
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface transition-colors">
                    <td className="py-3 px-4 font-bold text-primary">WO-10493</td>
                    <td className="py-3 px-4 font-bold">#R04-C18</td>
                    <td className="py-3 px-4 font-sans text-primary">Ribbon Lead Burnout</td>
                    <td className="py-3 px-4 font-sans text-secondary">Tech #02 (K. Verma)</td>
                    <td className="py-3 px-4 text-warning font-bold">6h Remaining</td>
                    <td className="py-3 px-4">
                      <span className="bg-[#eff8ff] text-[#175cd3] border border-[#b2ddff] px-2 py-0.5 text-[9px] font-bold uppercase">
                        IN REPAIR (ON-SITE)
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface transition-colors">
                    <td className="py-3 px-4 font-bold text-primary">WO-10495</td>
                    <td className="py-3 px-4 font-bold">#R15-C22</td>
                    <td className="py-3 px-4 font-sans text-primary">Desert Sand Soiling</td>
                    <td className="py-3 px-4 font-sans text-secondary">Cleaning Crew Alpha</td>
                    <td className="py-3 px-4 text-[#027a48] font-bold">36h Remaining</td>
                    <td className="py-3 px-4">
                      <span className="bg-[#fef6ee] text-[#b54708] border border-[#f9dbaf] px-2 py-0.5 text-[9px] font-bold uppercase">
                        ROBOT DISPATCHED
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SLA Compliance Guarantee Box */}
            <div className="border border-border-strong bg-surface p-4 font-mono-data text-xs space-y-2">
              <div className="flex justify-between items-center">
                <strong className="text-primary uppercase text-[11px] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  SERVICE LEVEL AGREEMENT (SLA) COMPLIANCE RATE: 99.4%
                </strong>
                <span className="text-[#027a48] font-bold">P1 CRITICAL RESOLUTION &lt; 24H</span>
              </div>
              <p className="text-secondary font-sans text-xs">
                All client-authorized work orders are automatically dispatched to pre-certified Tier-1 field technicians equipped with verified OEM spare parts and calibrated torque instruments.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: BOOK NEW INSPECTION & SUBSCRIPTION MANAGEMENT                      */}
        {/* ========================================================================= */}
        {activeTab === 9 && (
          <div className="space-y-6 max-w-5xl">
            <div className="border-b border-border-subtle pb-4">
              <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                SECTION 5 OF 5: ON-DEMAND BOOKINGS & SUBSCRIPTION PLAN
              </span>
              <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                Book Next Inspection & Enterprise Subscription
              </h1>
              <p className="text-secondary text-xs mt-1">
                Schedule autonomous aerial or ground surveys and manage active enterprise SLA subscriptions.
              </p>
            </div>

            {/* Active Subscription Tier Card */}
            <div className="border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-3 gap-2">
                <div>
                  <span className="text-[10px] font-mono-data font-bold text-secondary uppercase block">
                    ACTIVE ENTERPRISE SUBSCRIPTION
                  </span>
                  <h3 className="font-bold text-lg text-primary font-mono-data">
                    LUMIRA ENTERPRISE SOLAR ASSET PLAN
                  </h3>
                </div>
                <div className="text-right">
                  <strong className="text-xl font-bold text-primary block font-mono-data">
                    ₹2,40,000 / yr <span className="text-xs text-secondary font-normal font-sans">($2,880 / yr)</span>
                  </strong>
                  <span className="text-[#027a48] text-[10px] font-bold font-mono-data">✓ AUTO-RENEWS OCT 2027</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-primary">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#027a48]" />
                  <span>Unlimited High-GSD Drone & Thermal IR AI Diagnoses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#027a48]" />
                  <span>Closed-Loop Client Approval & Service SLA Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#027a48]" />
                  <span>IEC 62446-3 Certified Audit Reports with QR Signatures</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#027a48]" />
                  <span>Real-Time SCADA String I-V Curve Analytics & Pyranometer Feed</span>
                </div>
              </div>
            </div>

            {/* Book New Inspection Form */}
            <div className="border border-border-strong bg-white p-6 space-y-4 shadow-xs">
              <h3 className="font-bold text-primary uppercase text-xs flex items-center gap-2 font-mono-data border-b border-border-subtle pb-2">
                <Calendar className="w-4 h-4 text-primary" />
                SCHEDULE ON-DEMAND FLEET SURVEY
              </h3>

              <form onSubmit={handleBookInspection} className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-data text-xs">
                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase block mb-1">
                    TARGET INSPECTION DATE
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full border border-border-strong bg-white p-2.5 font-mono-data text-primary text-xs font-bold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase block mb-1">
                    PREFERRED MODALITY
                  </label>
                  <select
                    value={bookingModality}
                    onChange={(e) => setBookingModality(e.target.value)}
                    className="w-full border border-border-strong bg-white p-2.5 font-mono-data text-primary text-xs font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="Drone Orthomosaic + Thermal">Drone Survey (IR Radiometric + RGB)</option>
                    <option value="Handheld Thermal FLIR">Handheld FLIR Spot Thermography</option>
                    <option value="Ground Rover Multi-Angle">Ground Rover Multi-Angle Scan</option>
                    <option value="All Combined">Full Multi-Modal Sensor Fusion Survey</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold py-3.5 px-6 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>CONFIRM & DISPATCH INSPECTION MISSION FOR {bookingDate}</span>
                  </button>
                </div>
              </form>

              {bookingSuccess && (
                <div className="bg-[#ecfdf3] border-2 border-[#027a48] p-3 text-center text-xs font-bold font-mono-data text-[#027a48] flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>INSPECTION MISSION BOOKED · DISPATCH ORDER SENT TO FIELD PILOTS</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
