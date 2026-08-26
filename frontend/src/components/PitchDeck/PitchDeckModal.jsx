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
  Scale,
  LineChart,
  Lock,
  Server,
  Gauge
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
      title: "Executive Vision & Architecture",
      subtitle: "The Autonomous Operating System for Gigawatt-Scale Solar Asset Intelligence",
      tag: "EXECUTIVE OVERVIEW",
      content: (
        <div className="space-y-4 font-mono-data text-xs">
          <div className="border-l-4 border-primary pl-4 py-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-headline-lg tracking-tight">
              LUMIRA SOLAR AI
            </h2>
            <p className="text-secondary text-xs font-sans mt-0.5">
              Transforming invisible optical and electrical degradation into recoverable energy, OEM warranty capital, and verified carbon assets.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface p-3.5 border border-border-subtle shadow-2xs">
              <span className="text-secondary text-[9px] uppercase font-bold block">ASSETS MANAGED</span>
              <strong className="text-xl font-bold text-primary block mt-0.5">2.25 GW</strong>
              <span className="text-[#027a48] text-[10px]">Bhadla Solar Park</span>
            </div>
            <div className="bg-surface p-3.5 border border-border-subtle shadow-2xs">
              <span className="text-secondary text-[9px] uppercase font-bold block">MEASURED ROI</span>
              <strong className="text-xl font-bold text-[#027a48] block mt-0.5">14.2x</strong>
              <span className="text-secondary text-[10px]">Capital Multiplier</span>
            </div>
            <div className="bg-surface p-3.5 border border-border-subtle shadow-2xs">
              <span className="text-secondary text-[9px] uppercase font-bold block">HARDWARE ECOSYSTEM</span>
              <strong className="text-xl font-bold text-primary block mt-0.5">4 MODES</strong>
              <span className="text-secondary text-[10px]">Drone, Handheld, FLIR, Rover</span>
            </div>
            <div className="bg-surface p-3.5 border border-border-subtle shadow-2xs">
              <span className="text-secondary text-[9px] uppercase font-bold block">STANDARDS COMPLIANCE</span>
              <strong className="text-xl font-bold text-[#027a48] block mt-0.5">IEC 62446-3</strong>
              <span className="text-secondary text-[10px]">Class 1 &amp; IEEE 1547</span>
            </div>
          </div>

          <div className="bg-[#f0fdf4] border-2 border-[#027a48] p-3 text-xs font-sans text-primary">
            <strong className="text-[#027a48] font-mono-data block mb-0.5 uppercase text-xs">CORE CAPABILITY:</strong>
            Full-stack continuous SCADA telemetry, 4-layer multispectral computer vision, and closed-loop 24h field service dispatch for global Independent Power Producers (IPPs), asset owners, and EPCs.
          </div>
        </div>
      )
    },
    {
      number: 2,
      title: "The $34B/yr Solar Inefficiency Crisis",
      subtitle: "Uncaptured Sub-String Degradation, Diode Thermal Runaways & Warranty Losses",
      tag: "THE PROBLEM",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
            <div className="border border-critical bg-[#fef3f2] p-4 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-critical font-bold font-mono-data text-xs uppercase">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>1. SUB-STRING LOSSES</span>
              </div>
              <strong className="text-base text-primary block font-mono-data">3.8% - 7.2% Yield Leakage</strong>
              <p className="text-secondary text-[11px] leading-relaxed">
                Central inverters mask localized string degradation. A single bypassed sub-string causes a -18.2V drop, generating ₹44,050/yr in uncaptured revenue loss per 50-module string.
              </p>
            </div>

            <div className="border border-critical bg-[#fef3f2] p-4 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-critical font-bold font-mono-data text-xs uppercase">
                <Scale className="w-4 h-4 shrink-0" />
                <span>2. UNRECOVERED OEM CLAIMS</span>
              </div>
              <strong className="text-base text-primary block font-mono-data">$12.4B Unclaimed Capital</strong>
              <p className="text-secondary text-[11px] leading-relaxed">
                Tier-1 module manufacturers (LONGi, Jinko, Trina) reject warranty claims without calibrated IEC 62446-3 radiometric and EL wafer evidence with SHA-256 signatures.
              </p>
            </div>

            <div className="border border-critical bg-[#fef3f2] p-4 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-critical font-bold font-mono-data text-xs uppercase">
                <Wrench className="w-4 h-4 shrink-0" />
                <span>3. DISCONNECTED MANUAL O&amp;M</span>
              </div>
              <strong className="text-base text-primary block font-mono-data">14-Day Audit Turnaround</strong>
              <p className="text-secondary text-[11px] leading-relaxed">
                Legacy drone vendors email static PDF heatmaps weeks after flights, with zero closed-loop integration into technician work orders or SCADA systems.
              </p>
            </div>
          </div>

          <div className="border-2 border-primary bg-white p-3.5 font-mono-data text-xs flex flex-col sm:flex-row justify-between items-center gap-2">
            <div>
              <span className="text-[10px] text-secondary uppercase font-bold block">FINANCIAL IMPACT BENCHMARK (100 MW FLEET)</span>
              <strong className="text-xs sm:text-sm text-critical">Average Annual Generation Loss: $480,000 / yr per 100 MW</strong>
            </div>
            <span className="bg-critical text-white px-2.5 py-1 text-[10px] font-bold uppercase shrink-0">CRITICAL LEAKAGE</span>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: "Autonomous Solar AI OS Architecture",
      subtitle: "Continuous Hardware-to-Cloud Data Ingestion & Automated Service Dispatch",
      tag: "SYSTEM ARCHITECTURE",
      content: (
        <div className="space-y-4 font-sans text-xs">
          <p className="text-secondary leading-relaxed">
            Lumira replaces fragmented drone audits with an integrated, continuous intelligence operating system that binds field robotics, SCADA Modbus/TCP telemetry, and automated maintenance workflows.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border border-border-strong bg-surface p-3.5 space-y-1.5 shadow-2xs">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5 font-mono-data">
                <Cpu className="w-4 h-4 text-primary" />
                <span>1. EDGE SENSOR INGESTION</span>
              </strong>
              <p className="text-secondary text-[11px]">
                High-GSD UAV orthomosaics, Field Handheld Cameras, FLIR spot radiometers, and Autonomous Crawler Rovers.
              </p>
            </div>

            <div className="border border-border-strong bg-surface p-3.5 space-y-1.5 shadow-2xs">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5 font-mono-data">
                <Zap className="w-4 h-4 text-[#027a48]" />
                <span>2. 1 Hz SCADA MODBUS POLLING</span>
              </strong>
              <p className="text-secondary text-[11px]">
                Continuous DC bus voltage, current, and pyranometer normalized irradiance tracking across all 48 string combiners.
              </p>
            </div>

            <div className="border border-border-strong bg-surface p-3.5 space-y-1.5 shadow-2xs">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5 font-mono-data">
                <CheckCircle2 className="w-4 h-4 text-[#027a48]" />
                <span>3. CLOSED-LOOP 24H SLA DISPATCH</span>
              </strong>
              <p className="text-secondary text-[11px]">
                Automated generation of Level-III repair protocols, torque specifications, and Lockout/Tagout dielectric safety checks.
              </p>
            </div>
          </div>

          <div className="bg-[#f6fef9] border-2 border-[#027a48] p-2.5 text-center font-mono-data text-xs text-[#027a48] font-bold">
            ✓ 100% AUTOMATED STREAMING PIPELINE · ZERO HUMAN DELAY
          </div>
        </div>
      )
    },
    {
      number: 4,
      title: "Proprietary 4-Layer Multispectral Vision",
      subtitle: "Sub-Millimeter Defect Isolation Across 4 Calibrated Diagnostic Feeds",
      tag: "CORE AI VISION",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-data text-xs">
            <div className="border-2 border-critical bg-white p-3 space-y-1 shadow-2xs">
              <span className="bg-critical text-white px-1.5 py-0.2 text-[9px] font-bold uppercase block w-fit">LAYER 1</span>
              <strong className="text-primary text-xs block">Radiometric Thermal IR</strong>
              <p className="text-secondary text-[10px] font-sans">Ironbow gradient with live pixel temperature probe (38.2°C → 78.4°C, ΔT = +18.4°C).</p>
            </div>

            <div className="border-2 border-[#027a48] bg-white p-3 space-y-1 shadow-2xs">
              <span className="bg-[#027a48] text-white px-1.5 py-0.2 text-[9px] font-bold uppercase block w-fit">LAYER 2</span>
              <strong className="text-primary text-xs block">High-GSD Optical RGB</strong>
              <p className="text-secondary text-[10px] font-sans">0.5 cm/px wafer surface resolving silver busbar fractures &amp; snail trails.</p>
            </div>

            <div className="border-2 border-primary bg-white p-3 space-y-1 shadow-2xs">
              <span className="bg-primary text-white px-1.5 py-0.2 text-[9px] font-bold uppercase block w-fit">LAYER 3</span>
              <strong className="text-primary text-xs block">EL Wafer Tomography</strong>
              <p className="text-secondary text-[10px] font-sans">1150 nm NIR photon emission exposing internal silicon microcrack shunts.</p>
            </div>

            <div className="border-2 border-warning bg-white p-3 space-y-1 shadow-2xs">
              <span className="bg-warning text-primary px-1.5 py-0.2 text-[9px] font-bold uppercase block w-fit">LAYER 4</span>
              <strong className="text-primary text-xs block">Grad-CAM XAI Mask</strong>
              <p className="text-secondary text-[10px] font-sans">Explainable AI neural activation mask with 99.2% classification certainty.</p>
            </div>
          </div>

          <div className="bg-surface border border-border-strong p-3.5 font-mono-data text-xs space-y-1">
            <div className="flex justify-between"><span>Hardware Feeds:</span> <strong className="text-primary">Aerial UAV Drones, Field Handheld Cameras, FLIR Radiometers, Solar Rover Crawlers</strong></div>
            <div className="flex justify-between"><span>Standard Compliance:</span> <strong className="text-[#027a48]">IEC 62446-3 Class 1 &amp; IEEE 1547 Certified</strong></div>
          </div>
        </div>
      )
    },
    {
      number: 5,
      title: "World-First Breakthrough Innovation Labs",
      subtitle: "9 Automated Sensor Engines for Optimization, Safety & Energy Arbitrage",
      tag: "PROPRIETARY ENGINES",
      content: (
        <div className="space-y-4 font-mono-data text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">1. Bifacial Ground Albedo</strong>
              <span className="text-[#027a48] font-bold">+18.5% Rear Yield Boost</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">Dual Kipp &amp; Zonen pyranometers + optical albedo eye.</p>
            </div>

            <div className="p-2.5 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">2. LiDAR 3D Backtracking</strong>
              <span className="text-[#027a48] font-bold">0.00% Mutual Shading</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">LiDAR slope DEM + NEXTracker motorized inclinometers.</p>
            </div>

            <div className="p-2.5 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">3. Combiner PT100 Thermal</strong>
              <span className="text-critical font-bold">+56.6°C Flashpoint Margin</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">48-channel thermocouple matrix preventing DC bus fires.</p>
            </div>

            <div className="p-2.5 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">4. Verra VCS Carbon Token</strong>
              <span className="text-[#027a48] font-bold">+₹2.88L / day MTM Value</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">Live Verra spot feed ($17.40/ton) + ESG credit minting.</p>
            </div>

            <div className="p-2.5 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">5. Satellite InSAR Subsidence</strong>
              <span className="text-primary font-bold">-1.2 mm Pile Displacement</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">Sentinel-1 C-Band radar tracking tracker pile settling.</p>
            </div>

            <div className="p-2.5 border border-border-subtle bg-white shadow-2xs">
              <strong className="text-primary block text-xs">6. Zero-Trust SCADA Firewall</strong>
              <span className="text-[#027a48] font-bold">12,450 pkts/sec Inspected</span>
              <p className="text-secondary text-[10px] font-sans mt-0.5">Modbus/TCP &amp; IEC 60870-5-104 deep packet inspection.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 6,
      title: "Automated Storm & Hail Defense Cockpit",
      subtitle: "Physics-Based 75° Pro-Stow Reducing Normal Kinetic Impact Energy by 87.9%",
      tag: "WEATHER RESILIENCE",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
            <div className="border border-border-strong bg-white p-4 space-y-2 shadow-2xs">
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

            <div className="border-2 border-[#027a48] bg-[#f6fef9] p-4 space-y-2 shadow-2xs">
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
            Saves an estimated <strong>$2.4M per 100 MW</strong> in avoided glass replacement during severe hail events.
          </div>
        </div>
      )
    },
    {
      number: 7,
      title: "Advanced String I-V & P-V Curve Analytics",
      subtitle: "Single-Diode Physics Modeling & IEC 60891 STC Temperature Normalization",
      tag: "ELECTRICAL DIAGNOSTICS",
      content: (
        <div className="space-y-4 font-mono-data text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-2 border-primary bg-white p-4 space-y-2 shadow-xs">
              <strong className="text-primary text-xs uppercase block">SINGLE-DIODE TRANSCENDENTAL MODEL</strong>
              <div className="bg-surface p-2.5 border border-border-subtle text-[11px] text-primary">
                I(V) = I_ph - I_0 [ exp(q(V + I·Rs)/(n·k·T)) - 1 ] - (V + I·Rs)/Rsh
              </div>
              <p className="text-secondary text-[10px] font-sans">
                Computes Fill Factor (FF), Series Resistance (Rs = -dV/dI at Voc), and Shunt Resistance (Rsh = -dV/dI at Isc) across 100 discrete sampling points.
              </p>
            </div>

            <div className="border-2 border-[#027a48] bg-[#f6fef9] p-4 space-y-2 shadow-xs">
              <strong className="text-[#027a48] text-xs uppercase block">IEC 60891 TEMPERATURE CORRECTION</strong>
              <div className="bg-white p-2.5 border border-[#abefc6] text-[11px] text-[#027a48]">
                α = +0.048%/°C (Current) · β = -0.27%/°C (Voltage)
              </div>
              <p className="text-secondary text-[10px] font-sans">
                Normalizes live Operating Conditions (OPC @ 58.4°C) to Standard Test Conditions (STC @ 25°C, 1000 W/m²) with step-notch bypass detection.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-white p-2.5 border border-border-subtle"><span className="text-[9px] text-secondary uppercase block">Voc Open-Circuit</span><strong className="text-primary">46.2 V</strong></div>
            <div className="bg-white p-2.5 border border-border-subtle"><span className="text-[9px] text-secondary uppercase block">Isc Short-Circuit</span><strong className="text-primary">11.2 A</strong></div>
            <div className="bg-white p-2.5 border border-border-subtle"><span className="text-[9px] text-secondary uppercase block">Fill Factor (FF)</span><strong className="text-primary">73.2%</strong></div>
            <div className="bg-white p-2.5 border border-border-subtle"><span className="text-[9px] text-secondary uppercase block">Power Deficit</span><strong className="text-critical">-22.5%</strong></div>
          </div>
        </div>
      )
    },
    {
      number: 8,
      title: "Global Market Opportunity & Tailwinds",
      subtitle: "A $42.8B Global Addressable Market Expanding with Terawatt Solar Buildout",
      tag: "MARKET DYNAMICS",
      content: (
        <div className="space-y-4 font-mono-data text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border-2 border-primary bg-white p-3.5 space-y-1 shadow-xs">
              <span className="text-secondary text-[9px] uppercase font-bold block">TAM (TOTAL ADDRESSABLE)</span>
              <strong className="text-xl font-bold text-primary block">$42.8 BILLION</strong>
              <p className="text-secondary text-[10px] font-sans">Global Solar O&amp;M, AI Inspection &amp; Monitoring Market.</p>
            </div>

            <div className="border-2 border-primary bg-white p-3.5 space-y-1 shadow-xs">
              <span className="text-secondary text-[9px] uppercase font-bold block">SAM (SERVICEABLE ADDRESSABLE)</span>
              <strong className="text-xl font-bold text-[#027a48] block">$14.2 BILLION</strong>
              <p className="text-secondary text-[10px] font-sans">Utility-Scale (&gt;50 MW) &amp; Large C&amp;I Solar Fleets (&gt;5 MW).</p>
            </div>

            <div className="border-2 border-primary bg-white p-3.5 space-y-1 shadow-xs">
              <span className="text-secondary text-[9px] uppercase font-bold block">SOM (SERVICEABLE OBTAINABLE)</span>
              <strong className="text-xl font-bold text-primary block">$1.8 BILLION</strong>
              <p className="text-secondary text-[10px] font-sans">45 GW Target Portfolio in APAC, MENA &amp; North America.</p>
            </div>
          </div>

          <div className="bg-surface p-3.5 border border-border-subtle space-y-1.5 font-sans text-xs">
            <strong className="text-primary font-mono-data uppercase block text-xs">KEY INDUSTRY TAILWINDS:</strong>
            <ul className="space-y-1 text-secondary list-disc pl-4 text-[11px]">
              <li>Global PV capacity expanding from 1.6 TW (2024) to 5.4 TW by 2030 (IEA Net Zero Roadmap).</li>
              <li>Insurance underwriters mandating automated storm pro-stow and certified IEC 62446-3 audits.</li>
              <li>Carbon credit and Green Hydrogen compliance requiring cryptographic generation provenance.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      number: 9,
      title: "Enterprise Plan, ROI Multipliers & Unit Economics",
      subtitle: "Predictable Annual Enterprise Retainers + 15% Performance Gainshare",
      tag: "FINANCIAL MODEL",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-data text-xs">
            <div className="border-2 border-primary bg-white p-4 space-y-1.5 shadow-xs">
              <span className="text-secondary text-[10px] uppercase font-bold block">1. ENTERPRISE ASSET RETAINER</span>
              <strong className="text-lg font-bold text-primary block">$2,880 / yr per 100 MW</strong>
              <p className="text-secondary text-[11px] font-sans">
                Base subscription covering unlimited AI drone processing, real-time SCADA telemetry, and 24h work order dispatch.
              </p>
            </div>

            <div className="border-2 border-primary bg-white p-4 space-y-1.5 shadow-xs">
              <span className="text-secondary text-[10px] uppercase font-bold block">2. PERFORMANCE GAINSHARE</span>
              <strong className="text-lg font-bold text-[#027a48] block">15% Success Fee</strong>
              <p className="text-secondary text-[11px] font-sans">
                Cut on all recovered OEM manufacturer warranty cash settlements and minted Verra/I-REC carbon credits.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-surface p-3.5 border border-border-strong text-center font-mono-data text-xs">
            <div><span className="text-[9px] text-secondary uppercase block">Gross Margin</span><strong className="text-primary text-sm">88.4%</strong></div>
            <div><span className="text-[9px] text-secondary uppercase block">LTV / CAC</span><strong className="text-[#027a48] text-sm">14.2x</strong></div>
            <div><span className="text-[9px] text-secondary uppercase block">Net Retention</span><strong className="text-primary text-sm">134%</strong></div>
            <div><span className="text-[9px] text-secondary uppercase block">Payback Period</span><strong className="text-[#027a48] text-sm">&lt; 1.3 mo</strong></div>
          </div>
        </div>
      )
    },
    {
      number: 10,
      title: "Closed-Loop 3-Portal Ecosystem",
      subtitle: "Unifying Asset Owners, Drone Pilots, and Field Technicians in Real Time",
      tag: "ROLE ARCHITECTURE",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
            <div className="border-2 border-primary bg-white p-3.5 space-y-1.5 shadow-2xs">
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

            <div className="border-2 border-primary bg-white p-3.5 space-y-1.5 shadow-2xs">
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

            <div className="border-2 border-primary bg-white p-3.5 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold font-mono-data text-primary text-xs uppercase">
                <Wrench className="w-4 h-4 shrink-0" />
                <span>3. SERVICE O&amp;M HUB</span>
              </div>
              <ul className="text-secondary text-[11px] space-y-1 list-disc pl-4">
                <li>24h SLA Service Ticket Dispatch</li>
                <li>OEM Spare Part &amp; Torque Specs</li>
                <li>Lockout/Tagout Safety Protocol</li>
                <li>Photo Verification &amp; Resolution</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 11,
      title: "Verified Track Record — Bhadla Mega Solar Park",
      subtitle: "2.25 GW Deployment: $31.3K Net Capital Lift & 14.2x Client ROI Multiplier",
      tag: "CASE STUDY",
      content: (
        <div className="space-y-4 font-mono-data text-xs">
          <div className="bg-surface p-3.5 border border-border-subtle flex justify-between items-center">
            <div>
              <span className="text-[10px] text-secondary uppercase font-bold block">CLIENT DEPLOYMENT PROFILE</span>
              <strong className="text-xs sm:text-sm text-primary">CleanEnergy Global Assets India Ltd. (Bhadla 2.25 GW)</strong>
            </div>
            <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2 py-0.5 text-xs font-bold uppercase">
              TIER-1 CONFORMANCE
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="bg-white p-3 border border-border-strong shadow-2xs">
              <span className="text-[9px] text-secondary uppercase block">Plant Health Lift</span>
              <strong className="text-lg font-bold text-[#027a48] block mt-0.5">82% → 97.4%</strong>
              <span className="text-[10px] text-secondary">In 90 days</span>
            </div>

            <div className="bg-white p-3 border border-border-strong shadow-2xs">
              <span className="text-[9px] text-secondary uppercase block">Avoided Generation Loss</span>
              <strong className="text-lg font-bold text-[#027a48] block mt-0.5">+₹18,42,500</strong>
              <span className="text-[10px] text-secondary">20.3 MWh recovered</span>
            </div>

            <div className="bg-white p-3 border border-border-strong shadow-2xs">
              <span className="text-[9px] text-secondary uppercase block">OEM Claims Recovered</span>
              <strong className="text-lg font-bold text-[#027a48] block mt-0.5">+₹10,07,600</strong>
              <span className="text-[10px] text-secondary">Settled by vendor</span>
            </div>

            <div className="bg-white p-3 border border-border-strong shadow-2xs">
              <span className="text-[9px] text-secondary uppercase block">Net Capital Gain</span>
              <strong className="text-lg font-bold text-[#027a48] block mt-0.5">+₹26,10,100</strong>
              <span className="text-[10px] text-secondary">14.2x ROI</span>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 12,
      title: "Enterprise Scalability, Security & Global Architecture",
      subtitle: "Zero-Trust SCADA Hardening, SOC2 Compliance & Multi-Gigawatt Cloud Reliability",
      tag: "ENTERPRISE SCALABILITY",
      content: (
        <div className="space-y-4 font-mono-data text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border-2 border-primary bg-white p-3.5 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-primary text-xs uppercase">
                <Lock className="w-4 h-4 text-primary" />
                <span>ZERO-TRUST SCADA SECURITY</span>
              </div>
              <p className="text-secondary text-[11px] font-sans">
                Deep packet inspection for Modbus/TCP, DNP3, and IEC 60870-5-104 with air-gapped gateway isolation and mutual TLS (mTLS).
              </p>
            </div>

            <div className="border-2 border-primary bg-white p-3.5 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-primary text-xs uppercase">
                <Server className="w-4 h-4 text-primary" />
                <span>99.99% MULTI-REGION CLOUD</span>
              </div>
              <p className="text-secondary text-[11px] font-sans">
                Geo-redundant Kubernetes clusters with automated failover, sub-50ms query response on 50M+ wafer time-series records.
              </p>
            </div>

            <div className="border-2 border-[#027a48] bg-[#f6fef9] p-3.5 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#027a48] text-xs uppercase">
                <Globe className="w-4 h-4 text-[#027a48]" />
                <span>GLOBAL DEPLOYMENT READINESS</span>
              </div>
              <p className="text-secondary text-[11px] font-sans">
                Certified for utility interconnection across North America (NERC CIP), APAC (CEA Grid Standards), and MENA (GCCIA Grid Code).
              </p>
            </div>
          </div>

          <div className="bg-surface p-3.5 border border-border-strong flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="text-[10px] text-secondary uppercase font-bold block">ENTERPRISE INTEGRATIONS &amp; PARTNERSHIPS:</span>
              <strong className="text-primary text-xs">enterprise@lumira-solar.ai</strong>
            </div>
            <a 
              href="https://lumira-solar-ai.vercel.app" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 bg-primary text-white font-bold uppercase hover:bg-white hover:text-primary border border-primary transition-all text-xs cursor-pointer shadow-xs"
            >
              EXPLORE LIVE PRODUCTION PLATFORM →
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
              LUMIRA SOLAR AI · 12-PAGE ENTERPRISE PITCH DECK
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
