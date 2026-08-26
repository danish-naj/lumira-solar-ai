import React, { useState, useEffect } from "react";
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Download, 
  Maximize2, 
  Minimize2, 
  Zap, 
  TrendingUp, 
  ShieldAlert, 
  Award, 
  Cpu, 
  Sparkles, 
  CloudRain, 
  Building2, 
  Camera, 
  Wrench, 
  Globe, 
  CheckCircle2, 
  FileText, 
  DollarSign, 
  Activity, 
  Layers, 
  Sun,
  ShieldCheck,
  Scale
} from "lucide-react";

export default function PitchDeckModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 12;

  // Keyboard navigation (Arrow keys, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        setCurrentSlide((prev) => Math.min(totalSlides, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(1, prev - 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slides = [
    {
      number: 1,
      title: "Vision & Executive Overview",
      subtitle: "The Autonomous Operating System for Gigawatt-Scale Solar Asset Intelligence",
      tag: "EXECUTIVE SUMMARY",
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-4 py-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-headline-lg tracking-tight">
              LUMIRA SOLAR AI
            </h2>
            <p className="text-secondary text-sm font-sans mt-1">
              Transforming invisible optical and electrical degradation into recoverable energy, OEM warranty capital, and verified carbon assets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-data text-xs">
            <div className="bg-surface p-4 border border-border-subtle shadow-2xs">
              <span className="text-secondary text-[10px] uppercase font-bold block">ASSETS MANAGED</span>
              <strong className="text-2xl font-bold text-primary block mt-1">2.25 GW</strong>
              <span className="text-[#027a48] text-[11px]">Bhadla Mega Solar Park Deployment</span>
            </div>
            <div className="bg-surface p-4 border border-border-subtle shadow-2xs">
              <span className="text-secondary text-[10px] uppercase font-bold block">MEASURABLE ROI</span>
              <strong className="text-2xl font-bold text-[#027a48] block mt-1">14.2x</strong>
              <span className="text-secondary text-[11px]">Client Capital Value Multiplier</span>
            </div>
            <div className="bg-surface p-4 border border-border-subtle shadow-2xs">
              <span className="text-secondary text-[10px] uppercase font-bold block">HARDWARE ECOSYSTEM</span>
              <strong className="text-2xl font-bold text-primary block mt-1">4 MODALITIES</strong>
              <span className="text-secondary text-[11px]">Drone, Handheld, FLIR, Rover</span>
            </div>
          </div>

          <div className="bg-[#f0fdf4] border border-[#abefc6] p-4 text-xs font-sans text-primary">
            <strong className="text-[#027a48] font-mono-data block mb-1 uppercase">CORE MISSION:</strong>
            Empowering global independent power producers (IPPs), asset managers, and EPCs with continuous sub-wafer diagnostics, automated OEM warranty recovery, and closed-loop field technician dispatch.
          </div>
        </div>
      )
    },
    {
      number: 2,
      title: "The Macro Problem",
      subtitle: "The $34B/yr Global Solar Asset Inefficiency & Warranty Loss Crisis",
      tag: "MARKET PAIN POINT",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
            <div className="border border-critical bg-[#fef3f2] p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-critical font-bold font-mono-data text-xs uppercase">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>1. HIDDEN DEGRADATION</span>
              </div>
              <strong className="text-base text-primary block font-mono-data">3.8% - 7.2% Yield Loss</strong>
              <p className="text-secondary text-[11px] leading-relaxed">
                Central SCADA only flags whole inverter outages, missing sub-string microcracks, bypass diode short-circuits, and optical sand encrustation.
              </p>
            </div>

            <div className="border border-critical bg-[#fef3f2] p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-critical font-bold font-mono-data text-xs uppercase">
                <Scale className="w-4 h-4 shrink-0" />
                <span>2. UNRECOVERED OEM CLAIMS</span>
              </div>
              <strong className="text-base text-primary block font-mono-data">$12.4B Unclaimed Claims</strong>
              <p className="text-secondary text-[11px] leading-relaxed">
                Asset owners lose warranty claims because Tier-1 module manufacturers demand calibrated IEC 62446-3 radiometric and EL evidence before paying settlements.
              </p>
            </div>

            <div className="border border-critical bg-[#fef3f2] p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-critical font-bold font-mono-data text-xs uppercase">
                <Wrench className="w-4 h-4 shrink-0" />
                <span>3. STATIC DISCONNECTED AUDITS</span>
              </div>
              <strong className="text-base text-primary block font-mono-data">14-Day Report Lag</strong>
              <p className="text-secondary text-[11px] leading-relaxed">
                Legacy drone vendors email static PDF heatmaps weeks later with zero integration into real-time SCADA or field technician work order queues.
              </p>
            </div>
          </div>

          <div className="border-2 border-primary bg-white p-4 font-mono-data text-xs flex justify-between items-center">
            <div>
              <span className="text-[10px] text-secondary uppercase font-bold block">FINANCIAL IMPACT ON 100 MW FLEET</span>
              <strong className="text-sm text-critical">₹44,050 / yr Revenue Leakage per 50-Module String</strong>
            </div>
            <span className="bg-critical text-white px-2.5 py-1 text-[10px] font-bold uppercase">CRITICAL CAPITAL LOSS</span>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: "The Solution — Lumira AI OS",
      subtitle: "Autonomous Continuous Intelligence from Silicon Wafer to Grid Interconnection",
      tag: "PRODUCT PLATFORM",
      content: (
        <div className="space-y-4 font-sans text-xs">
          <p className="text-secondary leading-relaxed">
            Lumira is a full-stack, hardware-agnostic autonomous operating system that unifies real-time SCADA string telemetry with multi-modal optical and radiometric computer vision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-border-strong bg-surface p-4 space-y-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-2 font-mono-data">
                <Zap className="w-4 h-4 text-[#027a48]" />
                <span>CONTINUOUS 1-SECOND SCADA INGESTION</span>
              </strong>
              <p className="text-secondary text-[11px]">
                Samples 48 string combiner boxes simultaneously via Modbus/TCP, calculating Fill Factor (FF), Series Resistance (Rs), and Shunt Resistance (Rsh) in real time.
              </p>
            </div>

            <div className="border border-border-strong bg-surface p-4 space-y-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-2 font-mono-data">
                <CheckCircle2 className="w-4 h-4 text-[#027a48]" />
                <span>CLOSED-LOOP 24H SERVICE DISPATCH</span>
              </strong>
              <p className="text-secondary text-[11px]">
                Automatically generates Level-III repair protocols, torque specifications, and dielectric Lockout/Tagout safety checklists for certified field technicians.
              </p>
            </div>
          </div>

          <div className="bg-[#f6fef9] border-2 border-[#027a48] p-3 text-center font-mono-data text-xs text-[#027a48] font-bold">
            ✓ 100% AUTOMATED · ZERO MANUAL HUMAN DATA ENTRY REQUIRED
          </div>
        </div>
      )
    },
    {
      number: 4,
      title: "Proprietary 4-Layer Multispectral Vision",
      subtitle: "Sub-Millimeter Defect Isolation Across 4 Calibrated Diagnostic Modalities",
      tag: "CORE TECHNOLOGY",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-data text-xs">
            <div className="border border-border-subtle bg-white p-3 space-y-1 shadow-2xs">
              <span className="bg-critical text-white px-1.5 py-0.2 text-[9px] font-bold uppercase block w-fit">LAYER 1</span>
              <strong className="text-primary text-xs block">Radiometric Thermal IR</strong>
              <p className="text-secondary text-[10px] font-sans">Ironbow heat gradient with live spot temperature probing (ΔT = +18.4°C).</p>
            </div>

            <div className="border border-border-subtle bg-white p-3 space-y-1 shadow-2xs">
              <span className="bg-[#027a48] text-white px-1.5 py-0.2 text-[9px] font-bold uppercase block w-fit">LAYER 2</span>
              <strong className="text-primary text-xs block">High-GSD Optical RGB</strong>
              <p className="text-secondary text-[10px] font-sans">0.5 cm/px wafer resolution resolving silver busbar fractures & snail trails.</p>
            </div>

            <div className="border border-border-subtle bg-white p-3 space-y-1 shadow-2xs">
              <span className="bg-primary text-white px-1.5 py-0.2 text-[9px] font-bold uppercase block w-fit">LAYER 3</span>
              <strong className="text-primary text-xs block">EL Wafer Tomography</strong>
              <p className="text-secondary text-[10px] font-sans">1150 nm NIR photon emission exposing internal silicon microcrack shunts.</p>
            </div>

            <div className="border border-border-subtle bg-white p-3 space-y-1 shadow-2xs">
              <span className="bg-warning text-primary px-1.5 py-0.2 text-[9px] font-bold uppercase block w-fit">LAYER 4</span>
              <strong className="text-primary text-xs block">Grad-CAM XAI Mask</strong>
              <p className="text-secondary text-[10px] font-sans">Explainable AI neural activation mask with 99.2% classification certainty.</p>
            </div>
          </div>

          <div className="bg-surface border border-border-strong p-4 font-mono-data text-xs space-y-1">
            <div className="flex justify-between"><span>Supported Hardware:</span> <strong className="text-primary">Aerial UAV Drones, Field Handheld Cameras, FLIR Spot Radiometers, Autonomous Rover Crawlers</strong></div>
            <div className="flex justify-between"><span>Standards Compliance:</span> <strong className="text-[#027a48]">IEC 62446-3 Class 1 & IEEE 1547 Certified</strong></div>
          </div>
        </div>
      )
    },
    {
      number: 5,
      title: "World-First Breakthrough Innovation Labs",
      subtitle: "9 Automated Sensor Engines for Optimization, Safety & Energy Arbitrage",
      tag: "PROPRIETARY IP",
      content: (
        <div className="space-y-4 font-mono-data text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">1. Bifacial Ground Albedo</strong>
              <span className="text-[#027a48] font-bold">+18.5% Rear Yield Boost</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">Dual Kipp & Zonen pyranometers + optical albedo eye sensor.</p>
            </div>

            <div className="p-3 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">2. LiDAR 3D Backtracking</strong>
              <span className="text-[#027a48] font-bold">0.00% Mutual Shading</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">LiDAR slope DEM + NEXTracker motorized inclinometers.</p>
            </div>

            <div className="p-3 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">3. Combiner PT100 Thermal</strong>
              <span className="text-critical font-bold">+56.6°C Flashpoint Margin</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">48-channel thermocouple array preventing DC bus fire runaway.</p>
            </div>

            <div className="p-3 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">4. Verra VCS Carbon Token</strong>
              <span className="text-[#027a48] font-bold">+₹2.88L / day MTM Value</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">Live Verra spot feed ($17.40/ton) + automated ESG credit minting.</p>
            </div>

            <div className="p-3 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">5. Satellite InSAR Subsidence</strong>
              <span className="text-primary font-bold">-1.2 mm Pile Displacement</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">Sentinel-1 C-Band radar tracking structural pile settling.</p>
            </div>

            <div className="p-3 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">6. Zero-Trust SCADA Firewall</strong>
              <span className="text-[#027a48] font-bold">12,450 pkts/sec Inspected</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">Modbus/TCP & IEC 60870-5-104 deep packet inspection.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 6,
      title: "Automated Storm & Hail Defense Cockpit",
      subtitle: "Physics-Based 75° Pro-Stow Reducing Normal Kinetic Impact Energy by 87.9%",
      tag: "RESILIENCE & DEFENSE",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
            <div className="border border-border-strong bg-white p-4 space-y-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-2 font-mono-data">
                <CloudRain className="w-4 h-4 text-primary" />
                <span>X-BAND DOPPLER RADAR PIPELINE</span>
              </strong>
              <div className="space-y-1 font-mono-data text-[11px]">
                <div className="flex justify-between"><span>Reflectivity (Z):</span> <strong className="text-critical">58.4 dBZ</strong></div>
                <div className="flex justify-between"><span>Hail Probability (POSH):</span> <strong className="text-critical">88%</strong></div>
                <div className="flex justify-between"><span>Max Hail Size (MEHS):</span> <strong className="text-critical">42 mm</strong></div>
                <div className="flex justify-between"><span>Gust Velocity:</span> <strong className="text-primary">94.2 km/h</strong></div>
              </div>
            </div>

            <div className="border-2 border-[#027a48] bg-[#f6fef9] p-4 space-y-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-2 font-mono-data">
                <ShieldCheck className="w-4 h-4 text-[#027a48]" />
                <span>75.0° HAIL PRO-STOW KINEMATICS</span>
              </strong>
              <p className="text-secondary text-[11px]">
                When severe hail criteria is met, motorized trackers auto-slew to 75.0°, converting perpendicular destructive impacts into glancing ricochets.
              </p>
              <div className="bg-white p-2 border border-[#abefc6] font-mono-data text-xs text-center text-[#027a48] font-bold">
                E_n = E_0 · cos²(75°) = 0.067 · E_0 (-87.9% Force)
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border-subtle p-3 text-center text-xs font-mono-data text-primary">
            Saves an estimated <strong>$2.4M per 100 MW</strong> in avoided glass replacement during severe hail storms.
          </div>
        </div>
      )
    },
    {
      number: 7,
      title: "Market Opportunity & TAM / SAM / SOM",
      subtitle: "A $42.8B Global Market Growing Rapidly with Worldwide Solar Capacity Expansion",
      tag: "MARKET SIZE",
      content: (
        <div className="space-y-4 font-mono-data text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border-2 border-primary bg-white p-4 space-y-1 shadow-xs">
              <span className="text-secondary text-[10px] uppercase font-bold block">TAM (TOTAL ADDRESSABLE)</span>
              <strong className="text-2xl font-bold text-primary block">$42.8 BILLION</strong>
              <p className="text-secondary text-[11px] font-sans">Global Solar O&M, Inspection & Asset Software Market.</p>
            </div>

            <div className="border-2 border-primary bg-white p-4 space-y-1 shadow-xs">
              <span className="text-secondary text-[10px] uppercase font-bold block">SAM (SERVICEABLE ADDRESSABLE)</span>
              <strong className="text-2xl font-bold text-[#027a48] block">$14.2 BILLION</strong>
              <p className="text-secondary text-[11px] font-sans">Utility-Scale (&gt;50 MW) &amp; C&amp;I Solar Fleets (&gt;5 MW).</p>
            </div>

            <div className="border-2 border-primary bg-white p-4 space-y-1 shadow-xs">
              <span className="text-secondary text-[10px] uppercase font-bold block">SOM (INITIAL BEACHHEAD)</span>
              <strong className="text-2xl font-bold text-primary block">$1.8 BILLION</strong>
              <p className="text-secondary text-[11px] font-sans">45 GW Target Portfolio in APAC, MENA &amp; North America.</p>
            </div>
          </div>

          <div className="bg-surface p-4 border border-border-subtle space-y-2 font-sans text-xs">
            <strong className="text-primary font-mono-data uppercase block">KEY MACRO GROWTH DRIVERS:</strong>
            <ul className="space-y-1 text-secondary list-disc pl-4 text-[11px]">
              <li>Global PV capacity expanding from 1.6 TW (2024) to 5.4 TW by 2030 (IEA Net Zero 2050 Roadmap).</li>
              <li>Insurers mandating certified automated storm defense and IEC 62446-3 compliance to maintain coverage.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      number: 8,
      title: "Business Model & Unit Economics",
      subtitle: "Predictable Annual SaaS Retainers + 15% Performance Gainshare",
      tag: "UNIT ECONOMICS",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-data text-xs">
            <div className="border-2 border-primary bg-white p-4 space-y-2 shadow-xs">
              <span className="text-secondary text-[10px] uppercase font-bold block">1. ENTERPRISE SAAS RETAINER</span>
              <strong className="text-xl font-bold text-primary block">$2,880 / yr per 100 MW</strong>
              <p className="text-secondary text-[11px] font-sans">
                Base subscription covering unlimited AI drone processing, real-time SCADA telemetry, and 24h work order dispatch.
              </p>
            </div>

            <div className="border-2 border-primary bg-white p-4 space-y-2 shadow-xs">
              <span className="text-secondary text-[10px] uppercase font-bold block">2. PERFORMANCE GAINSHARE</span>
              <strong className="text-xl font-bold text-[#027a48] block">15% Success Fee</strong>
              <p className="text-secondary text-[11px] font-sans">
                Cut on all recovered OEM manufacturer warranty cash settlements and minted Verra/I-REC carbon credits.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface p-4 border border-border-strong text-center font-mono-data text-xs">
            <div><span className="text-[10px] text-secondary uppercase block">Gross Margin</span><strong className="text-primary text-base">88.4%</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">LTV / CAC</span><strong className="text-[#027a48] text-base">14.2x</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Net Retention</span><strong className="text-primary text-base">134%</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Payback Period</span><strong className="text-[#027a48] text-base">&lt; 1.3 mo</strong></div>
          </div>
        </div>
      )
    },
    {
      number: 9,
      title: "Closed-Loop 3-Portal Ecosystem",
      subtitle: "Unifying Asset Owners, Drone Pilots, and Field Technicians in Real Time",
      tag: "ECOSYSTEM",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
            <div className="border-2 border-primary bg-white p-4 space-y-2 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold font-mono-data text-primary text-xs uppercase">
                <Building2 className="w-4 h-4 shrink-0" />
                <span>1. ASSET OWNER PORTAL</span>
              </div>
              <ul className="text-secondary text-[11px] space-y-1 list-disc pl-4">
                <li>1-Click Repair Authorization Queue</li>
                <li>OEM Warranty Legal Claim Generator</li>
                <li>Live Carbon &amp; ESG Asset Ledger</li>
                <li>Downloadable Billing Invoices</li>
              </ul>
            </div>

            <div className="border-2 border-primary bg-white p-4 space-y-2 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold font-mono-data text-primary text-xs uppercase">
                <Camera className="w-4 h-4 shrink-0" />
                <span>2. INSPECTOR PILOT HUB</span>
              </div>
              <ul className="text-secondary text-[11px] space-y-1 list-disc pl-4">
                <li>5-Stage Automated Flight Planner</li>
                <li>DJI RTK Telemetry &amp; GSD Validator</li>
                <li>Instant Radiometric Defect Ingestion</li>
                <li>Certified QA Sign-Off &amp; Export</li>
              </ul>
            </div>

            <div className="border-2 border-primary bg-white p-4 space-y-2 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold font-mono-data text-primary text-xs uppercase">
                <Wrench className="w-4 h-4 shrink-0" />
                <span>3. SERVICE O&amp;M HUB</span>
              </div>
              <ul className="text-secondary text-[11px] space-y-1 list-disc pl-4">
                <li>24h SLA Service Ticket Dispatch</li>
                <li>OEM Spare Part &amp; Torque Specs</li>
                <li>Lockout/Tagout Safety Protocol</li>
                <li>Photo Verification &amp; Ticket Resolution</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 10,
      title: "Verified Case Study — Bhadla Mega Solar Park",
      subtitle: "2.25 GW Deployment: $31.3K Net Capital Lift & 14.2x Client ROI Multiplier",
      tag: "CASE STUDY",
      content: (
        <div className="space-y-4 font-mono-data text-xs">
          <div className="bg-surface p-4 border border-border-subtle flex justify-between items-center">
            <div>
              <span className="text-[10px] text-secondary uppercase font-bold block">CLIENT PROFILE</span>
              <strong className="text-sm text-primary">CleanEnergy Global Assets India Ltd. (Bhadla 2.25 GW)</strong>
            </div>
            <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold uppercase">
              TIER-1 CONFORMANCE
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-white p-3 border border-border-strong shadow-2xs">
              <span className="text-[10px] text-secondary uppercase block">Plant Health Lift</span>
              <strong className="text-xl font-bold text-[#027a48] block mt-0.5">82% → 97.4%</strong>
              <span className="text-[10px] text-secondary">In 90 days</span>
            </div>

            <div className="bg-white p-3 border border-border-strong shadow-2xs">
              <span className="text-[10px] text-secondary uppercase block">Avoided Generation Loss</span>
              <strong className="text-xl font-bold text-[#027a48] block mt-0.5">+₹18,42,500</strong>
              <span className="text-[10px] text-secondary">20.3 MWh recovered</span>
            </div>

            <div className="bg-white p-3 border border-border-strong shadow-2xs">
              <span className="text-[10px] text-secondary uppercase block">OEM Claims Recovered</span>
              <strong className="text-xl font-bold text-[#027a48] block mt-0.5">+₹10,07,600</strong>
              <span className="text-[10px] text-secondary">Settled by vendor</span>
            </div>

            <div className="bg-white p-3 border border-border-strong shadow-2xs">
              <span className="text-[10px] text-secondary uppercase block">Net Capital Gain</span>
              <strong className="text-xl font-bold text-[#027a48] block mt-0.5">+₹26,10,100</strong>
              <span className="text-[10px] text-secondary">14.2x ROI</span>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 11,
      title: "Competitive Moat & IP Defensibility",
      subtitle: "Why Lumira Outperforms Legacy Drone Vendors and Traditional SCADA",
      tag: "COMPETITIVE MOAT",
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono-data text-xs">
              <thead className="bg-surface text-secondary uppercase text-[10px] border-b">
                <tr>
                  <th className="p-2.5">Feature / Metric</th>
                  <th className="p-2.5">Legacy Drone Audits</th>
                  <th className="p-2.5">Traditional SCADA</th>
                  <th className="p-2.5 bg-[#f0fdf4] text-[#027a48] font-bold">Lumira Solar AI OS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-[11px]">
                <tr>
                  <td className="p-2.5 font-bold text-primary">Sensor Modalities</td>
                  <td className="p-2.5 text-secondary">Drone Only</td>
                  <td className="p-2.5 text-secondary">Sensors Only</td>
                  <td className="p-2.5 bg-[#f0fdf4] text-[#027a48] font-bold">Drone + Handheld + FLIR + Rover + SCADA</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-primary">Wafer Tomography</td>
                  <td className="p-2.5 text-secondary">None</td>
                  <td className="p-2.5 text-secondary">None</td>
                  <td className="p-2.5 bg-[#f0fdf4] text-[#027a48] font-bold">1150 nm NIR Forward-Bias EL</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-primary">Turnaround Time</td>
                  <td className="p-2.5 text-critical">10 - 14 Days</td>
                  <td className="p-2.5 text-secondary">Real-Time (No Vision)</td>
                  <td className="p-2.5 bg-[#f0fdf4] text-[#027a48] font-bold">Real-Time (1 Hz SCADA + Instant AI)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-primary">OEM Legal Claims</td>
                  <td className="p-2.5 text-secondary">Uncalibrated JPGs</td>
                  <td className="p-2.5 text-secondary">None</td>
                  <td className="p-2.5 bg-[#f0fdf4] text-[#027a48] font-bold">IEC 62446-3 Signed Legal Dossiers</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-primary">Storm &amp; Hail Defense</td>
                  <td className="p-2.5 text-secondary">None</td>
                  <td className="p-2.5 text-secondary">Manual Wind Stow</td>
                  <td className="p-2.5 bg-[#f0fdf4] text-[#027a48] font-bold">Automated Radar 75° Pro-Stow</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      number: 12,
      title: "The Ask & 24-Month Growth Roadmap",
      subtitle: "$5.0M Series Seed / Series A to Scale from 2.5 GW to 45 GW Under Management",
      tag: "THE ASK & ROADMAP",
      content: (
        <div className="space-y-4 font-mono-data text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-2 border-primary bg-white p-4 space-y-2 shadow-xs">
              <span className="text-secondary text-[10px] uppercase font-bold block">FINANCING ROUND</span>
              <strong className="text-2xl font-bold text-primary block">$5.0M SEED / SERIES A</strong>
              <div className="space-y-1 text-[11px] font-sans text-secondary pt-1">
                <div>• <strong>50%</strong> Foundational Vision Models &amp; Edge Autonomy</div>
                <div>• <strong>30%</strong> Global Sales Expansion (US, MENA, APAC)</div>
                <div>• <strong>20%</strong> OEM Warranty Partnerships &amp; Operations</div>
              </div>
            </div>

            <div className="border-2 border-[#027a48] bg-[#f6fef9] p-4 space-y-2 shadow-xs">
              <span className="text-[#027a48] text-[10px] uppercase font-bold block">24-MONTH TARGET MILESTONES</span>
              <strong className="text-2xl font-bold text-[#027a48] block">45 GW UNDER AI OS</strong>
              <div className="space-y-1 text-[11px] font-sans text-primary pt-1">
                <div>• <strong>Q4 2026:</strong> 5.0 GW Managed Across India &amp; UAE</div>
                <div>• <strong>Q4 2027:</strong> 18.0 GW Managed ($4.2M ARR)</div>
                <div>• <strong>Q4 2028:</strong> 45.0 GW Managed ($12.8M ARR, 88% Margins)</div>
              </div>
            </div>
          </div>

          <div className="bg-surface p-4 border border-border-strong flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="text-[10px] text-secondary uppercase font-bold block">INVESTOR RELATIONS:</span>
              <strong className="text-primary text-sm">invest@lumira-solar.ai</strong>
            </div>
            <a 
              href="https://lumira-solar-ai.vercel.app" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 bg-primary text-white font-bold uppercase hover:bg-white hover:text-primary border border-primary transition-all text-xs cursor-pointer shadow-xs"
            >
              LAUNCH LIVE SYSTEM DEMO →
            </a>
          </div>
        </div>
      )
    }
  ];

  const current = slides[currentSlide - 1];

  const handleDownloadDeck = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-6 backdrop-blur-xs select-none">
      <div className="bg-white border-2 border-primary w-full max-w-5xl h-[92vh] flex flex-col justify-between shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Top Bar */}
        <div className="bg-surface border-b-2 border-primary p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Presentation className="w-5 h-5 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              LUMIRA SOLAR AI · 12-PAGE PITCH DECK
            </span>
            <span className="font-mono-data text-xs text-secondary hidden sm:inline">
              Slide {currentSlide} of {totalSlides}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadDeck}
              className="px-3 py-1.5 border border-border-strong bg-white hover:bg-surface font-mono-data text-xs font-bold text-primary flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PRINT / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center border border-border-strong bg-white hover:bg-critical hover:text-white font-bold text-sm cursor-pointer transition-all shadow-2xs"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Slide Canvas Body */}
        <div className="p-6 sm:p-10 flex-1 overflow-y-auto flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-start border-b border-border-subtle pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                  {current.tag} · SLIDE {current.number} OF {totalSlides}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary font-headline-lg tracking-tight mt-0.5">
                  {current.title}
                </h1>
                <p className="text-secondary text-xs font-sans mt-0.5">
                  {current.subtitle}
                </p>
              </div>
              <span className="font-mono-data text-3xl font-bold text-border-strong hidden sm:block">
                0{current.number}
              </span>
            </div>

            {/* Render Slide Content */}
            <div className="mt-4">
              {current.content}
            </div>
          </div>

          {/* Slide Navigator Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-4 border-t border-border-subtle shrink-0">
            {slides.map((s) => (
              <button
                key={s.number}
                onClick={() => setCurrentSlide(s.number)}
                className={`h-2 transition-all cursor-pointer ${
                  currentSlide === s.number ? "w-8 bg-primary" : "w-2 bg-border-strong hover:bg-primary/50"
                }`}
                title={`Slide ${s.number}: ${s.title}`}
              />
            ))}
          </div>
        </div>

        {/* Modal Bottom Bar Navigation Controls */}
        <div className="bg-surface border-t-2 border-primary p-4 flex justify-between items-center font-mono-data text-xs shrink-0">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(1, prev - 1))}
            disabled={currentSlide === 1}
            className={`px-4 py-2 border font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
              currentSlide === 1 
                ? "border-border-subtle text-secondary/40 cursor-not-allowed" 
                : "border-primary bg-white text-primary hover:bg-primary hover:text-white shadow-xs"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREVIOUS SLIDE</span>
          </button>

          <div className="text-secondary text-[11px] hidden sm:block">
            Use <kbd className="px-1.5 py-0.5 bg-white border border-border-strong text-primary">←</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-border-strong text-primary">→</kbd> keys to navigate · <kbd className="px-1.5 py-0.5 bg-white border border-border-strong text-primary">ESC</kbd> to close
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => Math.min(totalSlides, prev + 1))}
            disabled={currentSlide === totalSlides}
            className={`px-4 py-2 border font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
              currentSlide === totalSlides 
                ? "border-border-subtle text-secondary/40 cursor-not-allowed" 
                : "border-primary bg-primary text-white hover:bg-white hover:text-primary shadow-xs"
            }`}
          >
            <span>NEXT SLIDE</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
