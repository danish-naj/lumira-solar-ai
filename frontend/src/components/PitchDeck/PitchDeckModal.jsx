import React, { useState, useEffect, useRef } from "react";
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Download, 
  Maximize2, 
  Minimize2, 
  ArrowRight,
  Sun
} from "lucide-react";

export default function PitchDeckModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalSlides = 12;

  // Touch Swipe State for Mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Keyboard navigation (Arrow keys, Spacebar, Escape, F for Fullscreen)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        setCurrentSlide((prev) => Math.min(totalSlides, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(1, prev - 1));
      } else if (e.key === "Escape") {
        onClose();
      } else if (e.key === "f" || e.key === "F") {
        toggleBrowserFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  // Touch Swipe Handlers for Mobile & Tablet
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => Math.min(totalSlides, prev + 1));
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => Math.max(1, prev - 1));
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (!isOpen) return null;

  const slides = [
    // SLIDE 1: Cover
    {
      number: 1,
      verticalTag: "SOLAR ASSET INTELLIGENCE OS / 2026",
      render: () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full gap-6 lg:gap-8 items-center">
          {/* Left Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full py-2 sm:py-6 space-y-4 sm:space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-6">
                <span className="text-white font-bold text-base sm:text-lg tracking-tight font-headline-md flex items-center gap-1">
                  <span>Lumira</span>
                  <span className="text-white text-xs">✦</span>
                </span>
              </div>

              <div className="max-w-md mb-4 sm:mb-6">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
                  LUMIRA SOLAR AI
                </span>
                <div className="border-t border-b border-white/20 py-1 sm:py-1.5 my-1.5 sm:my-2 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-white/80">
                  <span className="uppercase text-white/50">EUREKA ID</span>
                  <span className="font-bold text-white tracking-widest">EU2605889</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-serif text-white tracking-tight leading-[1.15] sm:leading-[1.1] mb-3 sm:mb-6">
                The operating system for solar asset intelligence.
              </h1>

              <p className="text-sm sm:text-lg lg:text-xl text-white/80 font-sans leading-relaxed max-w-xl mb-4 sm:mb-6">
                Continuous visibility from physical condition to financial action.
              </p>

              <div className="border-t border-white/20 pt-4 sm:pt-6 max-w-lg">
                <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                  Detect hidden degradation. Orchestrate action. Recover measurable value.
                </p>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-white/50">
              <span>BUILT FOR UTILITY-SCALE, C&amp;I, AND MULTI-GIGAWATT SOLAR PORTFOLIOS.</span>
            </div>
          </div>

          {/* Right Column (5 Cols) - Visual Hero */}
          <div className="lg:col-span-5 h-full flex flex-col justify-between py-2 sm:py-6">
            <div className="w-full h-full min-h-[220px] sm:min-h-[300px] lg:min-h-[400px] bg-[#0c1017] border border-white/15 relative overflow-hidden flex items-center justify-center p-4 sm:p-6 group">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative w-full h-full flex flex-col justify-center items-center space-y-2 sm:space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-full h-6 sm:h-7 border border-white/30 bg-gradient-to-r from-white/5 via-white/20 to-white/5 flex items-center justify-between px-2.5 sm:px-3 transform -skew-x-12 shadow-sm"
                    style={{ opacity: 0.4 + i * 0.12 }}
                  >
                    <span className="text-[8px] sm:text-[9px] font-mono text-white/60">STR-0{i+1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    <span className="text-[8px] sm:text-[9px] font-mono text-white/60">41.8V · 12.9A</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-right text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 pt-2 sm:pt-3">
              ASSET INTELLIGENCE / OPERATIONS / VALUE
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 2: 01 / THE PROBLEM
    {
      number: 2,
      verticalTag: "01 / THE PROBLEM",
      render: () => (
        <div className="flex flex-col justify-between h-full py-2 sm:py-4 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
              SOLAR OPERATIONS TODAY
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 sm:mb-3">
              Solar operations are scaling faster than visibility.
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-sans max-w-4xl leading-relaxed mb-4 sm:mb-6">
              Portfolio size, geographic spread, and equipment complexity are increasing. The operating stack beneath them is still fragmented across dashboards, inspection vendors, alerts, and field records.
            </p>

            <div className="border-t border-white/20 divide-y divide-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 py-3 sm:py-4 items-start lg:items-center">
                <div className="lg:col-span-3 font-serif text-sm sm:text-lg text-white font-medium">
                  Aggregate blind spots
                </div>
                <div className="lg:col-span-6 text-[11px] sm:text-sm text-white/70 font-sans">
                  A module-level fault can be diluted inside an inverter-level average, especially when signals are sampled every 5–15 minutes.
                </div>
                <div className="lg:col-span-3 lg:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white">
                  <span className="text-white/40 block text-[8px] sm:text-[9px]">IMPACT</span>
                  LOST GENERATION STAYS INVISIBLE.
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 py-3 sm:py-4 items-start lg:items-center">
                <div className="lg:col-span-3 font-serif text-sm sm:text-lg text-white font-medium">
                  Symptom without cause
                </div>
                <div className="lg:col-span-6 text-[11px] sm:text-sm text-white/70 font-sans">
                  Thermal or statistical anomalies may not distinguish a dirty module, cracked wafer, bypass-diode failure, tracker issue, or inverter fault.
                </div>
                <div className="lg:col-span-3 lg:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white">
                  <span className="text-white/40 block text-[8px] sm:text-[9px]">IMPACT</span>
                  FALSE POSITIVES AND MISDIRECTED CREWS.
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 py-3 sm:py-4 items-start lg:items-center">
                <div className="lg:col-span-3 font-serif text-sm sm:text-lg text-white font-medium">
                  Alert without action
                </div>
                <div className="lg:col-span-6 text-[11px] sm:text-sm text-white/70 font-sans">
                  An alert can become a static report, unassigned alarm, or email thread rather than an approved, routed, time-bound work order.
                </div>
                <div className="lg:col-span-3 lg:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white">
                  <span className="text-white/40 block text-[8px] sm:text-[9px]">IMPACT</span>
                  SLOW RESOLUTION AND REPEAT VISITS.
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 py-3 sm:py-4 items-start lg:items-center">
                <div className="lg:col-span-3 font-serif text-sm sm:text-lg text-white font-medium">
                  Value without proof
                </div>
                <div className="lg:col-span-6 text-[11px] sm:text-sm text-white/70 font-sans">
                  Warranty claims, carbon records, compliance evidence, and BESS decisions require traceability that is rarely connected to the original plant signal.
                </div>
                <div className="lg:col-span-3 lg:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white">
                  <span className="text-white/40 block text-[8px] sm:text-[9px]">IMPACT</span>
                  RECOVERABLE VALUE REMAINS UNMONETIZED.
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-3 sm:pt-4 font-sans text-[11px] sm:text-sm text-white/80">
            <strong>Bottom line.</strong> Data exists at every stage, but value is lost between stages.
          </div>
        </div>
      )
    },

    // SLIDE 3: 02 / MONEY AT RISK
    {
      number: 3,
      verticalTag: "02 / MONEY AT RISK",
      render: () => (
        <div className="flex flex-col justify-between h-full py-2 sm:py-4 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
              THE SOLAR OPERATIONS GAP
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 sm:mb-3">
              Small blind spots become multi-million-rupee losses at portfolio scale.
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-sans max-w-4xl leading-relaxed mb-4 sm:mb-6">
              Solar teams collect signals, images, alarms, and field notes. The financial problem is what happens between detection, diagnosis, execution, and recovery.
            </p>

            {/* 2 Big Headline Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 border-t border-b border-white/20 py-4 sm:py-6 mb-4 sm:mb-6">
              <div className="border-l-2 border-white pl-3 sm:pl-4">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/50 block">GLOBAL INEFFICIENCY EXPOSURE</span>
                <strong className="text-3xl sm:text-5xl font-serif text-white block mt-0.5 sm:mt-1">$34B <span className="text-xs sm:text-base font-sans font-normal text-white/60">/ year</span></strong>
                <p className="text-[11px] sm:text-xs text-white/70 font-sans mt-0.5 sm:mt-1">Solar inefficiency crisis identified in the Lumira market thesis.</p>
              </div>

              <div className="border-l-2 border-white pl-3 sm:pl-4">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/50 block">UNRECOVERED MANUFACTURER VALUE</span>
                <strong className="text-3xl sm:text-5xl font-serif text-white block mt-0.5 sm:mt-1">$12.4B</strong>
                <p className="text-[11px] sm:text-xs text-white/70 font-sans mt-0.5 sm:mt-1">Estimated OEM warranty claims left unrecovered because evidence is incomplete, slow, or disconnected.</p>
              </div>
            </div>

            {/* 4 Gap Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              <div className="p-3 border border-white/10 bg-white/[0.02]">
                <span className="text-base sm:text-lg font-mono text-white/40 block mb-0.5">01</span>
                <strong className="text-xs sm:text-sm font-serif text-white block mb-1">Detection gap</strong>
                <p className="text-[11px] text-white/60 font-sans mb-2">Inverter and plant dashboards average away module-level faults. Traditional SCADA commonly works at 5–15-minute intervals.</p>
                <div className="text-[9px] sm:text-[10px] font-mono uppercase text-white/90 border-t border-white/10 pt-1.5">
                  <span className="text-white/40 block">COST OF DELAY</span>
                  LOST YIELD STAYS INVISIBLE.
                </div>
              </div>

              <div className="p-3 border border-white/10 bg-white/[0.02]">
                <span className="text-base sm:text-lg font-mono text-white/40 block mb-0.5">02</span>
                <strong className="text-xs sm:text-sm font-serif text-white block mb-1">Diagnosis gap</strong>
                <p className="text-[11px] text-white/60 font-sans mb-2">Thermal or statistical anomalies may not separate dirt, cracks, bypass diodes, tracker issues, or inverter faults without physical confirmation.</p>
                <div className="text-[9px] sm:text-[10px] font-mono uppercase text-white/90 border-t border-white/10 pt-1.5">
                  <span className="text-white/40 block">COST OF ERROR</span>
                  FALSE POSITIVES &amp; MISDIRECTED CREWS.
                </div>
              </div>

              <div className="p-3 border border-white/10 bg-white/[0.02]">
                <span className="text-base sm:text-lg font-mono text-white/40 block mb-0.5">03</span>
                <strong className="text-xs sm:text-sm font-serif text-white block mb-1">Execution gap</strong>
                <p className="text-[11px] text-white/60 font-sans mb-2">Drone-only inspection vendors can take 10–14 business days to return processed results, while alerts still lack an assigned repair owner.</p>
                <div className="text-[9px] sm:text-[10px] font-mono uppercase text-white/90 border-t border-white/10 pt-1.5">
                  <span className="text-white/40 block">COST OF FRICTION</span>
                  SLOW RESOLUTION &amp; REPEAT VISITS.
                </div>
              </div>

              <div className="p-3 border border-white/10 bg-white/[0.02]">
                <span className="text-base sm:text-lg font-mono text-white/40 block mb-0.5">04</span>
                <strong className="text-xs sm:text-sm font-serif text-white block mb-1">Monetization gap</strong>
                <p className="text-[11px] text-white/60 font-sans mb-2">Variable inspection services can cost $15–$30/MW; static files rarely flow into claims, carbon records, or compliance evidence.</p>
                <div className="text-[9px] sm:text-[10px] font-mono uppercase text-white/90 border-t border-white/10 pt-1.5">
                  <span className="text-white/40 block">COST OF FRAGMENTATION</span>
                  RECOVERABLE VALUE UNMONETIZED.
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-3 sm:pt-4 font-sans text-[11px] sm:text-sm text-white/80">
            <strong>Bottom line.</strong> The market does not need another isolated dashboard. It needs a connected decision layer that turns loss into action and proof.
          </div>
        </div>
      )
    },

    // SLIDE 4: 05 / OPERATING WORKFLOW
    {
      number: 4,
      verticalTag: "05 / OPERATING WORKFLOW",
      render: () => (
        <div className="flex flex-col justify-between h-full py-2 sm:py-4 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
              FROM SIGNAL TO FIELD OUTCOME
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 sm:mb-3">
              From field signal to field repair in five operational steps.
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-sans max-w-4xl leading-relaxed mb-4 sm:mb-8">
              The same operating thread follows an issue from detection to verification—across portable inspections, permanent sensors, autonomous hardware, and human teams.
            </p>

            {/* 5 Step Process Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 border-t border-b border-white/20 py-4 sm:py-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <div className="space-y-1.5 pt-2 sm:pt-0 sm:pr-2">
                <span className="text-lg sm:text-2xl font-mono text-white block">01</span>
                <strong className="text-sm sm:text-lg font-serif text-white block">Connect</strong>
                <p className="text-[11px] sm:text-xs text-white/70 font-sans leading-relaxed">
                  Install a lightweight Modbus/TCP edge gateway and connect existing inverter, weather, combiner, and tracker signals.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 sm:pt-0 sm:pl-3">
                <span className="text-lg sm:text-2xl font-mono text-white block">→ 02</span>
                <strong className="text-sm sm:text-lg font-serif text-white block">Inspect</strong>
                <p className="text-[11px] sm:text-xs text-white/70 font-sans leading-relaxed">
                  Run a scheduled bring-in UAV mission, activate permanent dock scans, or dispatch handheld and FLIR follow-up to a specific row.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 sm:pt-0 sm:pl-3">
                <span className="text-lg sm:text-2xl font-mono text-white block">→ 03</span>
                <strong className="text-sm sm:text-lg font-serif text-white block">Diagnose</strong>
                <p className="text-[11px] sm:text-xs text-white/70 font-sans leading-relaxed">
                  Fuse thermal, RGB, EL, SCADA, and physics evidence; classify the defect and estimate the associated loss mechanism.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 sm:pt-0 sm:pl-3">
                <span className="text-lg sm:text-2xl font-mono text-white block">→ 04</span>
                <strong className="text-sm sm:text-lg font-serif text-white block">Execute</strong>
                <p className="text-[11px] sm:text-xs text-white/70 font-sans leading-relaxed">
                  Obtain approval, route the work order, provide part numbers and torque specifications, and enforce Lockout/Tagout safety checks.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 sm:pt-0 sm:pl-3">
                <span className="text-lg sm:text-2xl font-mono text-white block">→ 05</span>
                <strong className="text-sm sm:text-lg font-serif text-white block">Verify + monetize</strong>
                <p className="text-[11px] sm:text-xs text-white/70 font-sans leading-relaxed">
                  Confirm resolution, close the ticket, generate the audit dossier, and route eligible evidence into OEM claims, carbon records, or reports.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-3 sm:pt-4 font-sans text-[11px] sm:text-sm text-white/80">
            <strong>Result.</strong> One operating thread replaces multiple disconnected handoffs.
          </div>
        </div>
      )
    },

    // SLIDE 5: 04 / HARDWARE MODEL
    {
      number: 5,
      verticalTag: "04 / HARDWARE MODEL",
      render: () => (
        <div className="flex flex-col justify-between h-full py-2 sm:py-4 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
              HYBRID DEPLOYMENT ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 sm:mb-3">
              The hardware model is hybrid by design.
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-sans max-w-4xl leading-relaxed mb-4 sm:mb-6">
              Lumira does not require every customer to purchase a full robotics stack. Hardware is deployed according to portfolio size, inspection cadence, remoteness, and risk profile.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 border-t border-white/20 py-4 sm:py-6 mb-4 sm:mb-6">
              {/* Bring In On Demand */}
              <div className="p-3.5 sm:p-5 border border-white/15 bg-white/[0.02] space-y-3">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-white">Bring-In On-Demand</h3>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase text-white/50 tracking-wider">LOW CAPEX · FLEXIBLE INSPECTION CADENCE</span>
                </div>
                <div className="space-y-2 text-[11px] sm:text-xs font-sans text-white/70">
                  <p>
                    <strong>Standard UAV kit.</strong> A certified pilot arrives with a portable drone, runs a Lumira-generated 3D flight grid, and uploads radiometric thermal and RGB data through 4G/5G.
                  </p>
                  <p>
                    <strong>Handheld camera + FLIR.</strong> A technician follows a flagged row, captures macro optical and spot-thermal evidence, and uploads it through the Service Hub.
                  </p>
                  <p className="text-white/90 pt-1 border-t border-white/10">
                    <strong>Best fit:</strong> Quarterly or annual audits, C&amp;I fleets, standard O&amp;M, and targeted emergency follow-up.
                  </p>
                </div>
              </div>

              {/* Permanent On-Site */}
              <div className="p-3.5 sm:p-5 border border-white/15 bg-white/[0.02] space-y-3">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-white">Permanent On-Site</h3>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase text-white/50 tracking-wider">CONTINUOUS SENSING · AUTONOMOUS RESPONSE</span>
                </div>
                <div className="space-y-2 text-[11px] sm:text-xs font-sans text-white/70">
                  <p>
                    <strong>Autonomous drone dock.</strong> Scheduled or event-triggered flights, RTK return, fast charging, and automatic data synchronization for remote 100 MW+ parks.
                  </p>
                  <p>
                    <strong>Rover crawler.</strong> Night crawling with 3D LiDAR, optical probes, and forward-bias EL contacts for wafer-level diagnostics.
                  </p>
                  <p>
                    <strong>Fixed sensors.</strong> Combiner PT100s, pyranometers, albedometers, tracker inclinometers, and a Modbus/TCP edge gateway stream continuously.
                  </p>
                </div>
              </div>
            </div>

            {/* What Sits Where Strip */}
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1.5 sm:mb-2">WHAT SITS WHERE</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs font-sans">
                <div className="border border-white/10 p-2 sm:p-2.5">
                  <strong className="text-white block font-mono text-[10px] sm:text-[11px]">Portable</strong>
                  <span className="text-white/60 text-[10px] sm:text-[11px]">UAV, handheld camera, FLIR radiometer carried by crews.</span>
                </div>
                <div className="border border-white/10 p-2 sm:p-2.5">
                  <strong className="text-white block font-mono text-[10px] sm:text-[11px]">Permanent</strong>
                  <span className="text-white/60 text-[10px] sm:text-[11px]">SCADA, meteo, mechanical sensors, edge gateway, drone dock.</span>
                </div>
                <div className="border border-white/10 p-2 sm:p-2.5">
                  <strong className="text-white block font-mono text-[10px] sm:text-[11px]">Commercial</strong>
                  <span className="text-white/60 text-[10px] sm:text-[11px]">Standard workflows in SaaS; dock/rover license at ₹37,500/mo.</span>
                </div>
                <div className="border border-white/10 p-2 sm:p-2.5">
                  <strong className="text-white block font-mono text-[10px] sm:text-[11px]">Gateway</strong>
                  <span className="text-white/60 text-[10px] sm:text-[11px]">Lightweight industrial gateway is a one-time setup at ₹25,000.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-3 sm:pt-4 font-sans text-[11px] sm:text-sm text-white/80">
            <strong>Customer-friendly principle.</strong> Start with the minimum viable hardware footprint, then add autonomy where inspection frequency and avoided dispatch costs justify it.
          </div>
        </div>
      )
    },

    // SLIDE 6: 03 / HERO FEATURES
    {
      number: 6,
      verticalTag: "03 / HERO FEATURES",
      render: () => (
        <div className="flex flex-col justify-between h-full py-2 sm:py-4 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
              THE FULL-STACK DIFFERENCE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 sm:mb-3">
              More than a dashboard: Lumira connects the asset, the action, and the value.
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-sans max-w-4xl leading-relaxed mb-4 sm:mb-6">
              Four hero capabilities combine into one operating layer—where category competitors typically stop at imagery, plant telemetry, or statistical alerts.
            </p>

            {/* 4 Hero Blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 border-t border-white/20 py-4 sm:py-6 mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 border border-white/15 bg-white/[0.02] space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white/50 text-xs sm:text-sm">01</span>
                  <h3 className="font-serif text-base sm:text-lg text-white">Multi-modal sensor fusion</h3>
                </div>
                <p className="text-[11px] sm:text-xs text-white/70 font-sans">
                  <strong>What it does:</strong> Synchronizes UAV, handheld camera, FLIR radiometer, rover, 1 Hz SCADA, weather, tracker, satellite, market, and storm inputs in one digital twin.
                </p>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase text-white/90 block pt-1 border-t border-white/10">
                  WHY IT DIFFERS: DRONE-ONLY AND SCADA-ONLY SYSTEMS SEE ONLY ONE SIDE.
                </span>
              </div>

              <div className="p-3 sm:p-4 border border-white/15 bg-white/[0.02] space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white/50 text-xs sm:text-sm">02</span>
                  <h3 className="font-serif text-base sm:text-lg text-white">Wafer-level + physics diagnosis</h3>
                </div>
                <p className="text-[11px] sm:text-xs text-white/70 font-sans">
                  <strong>What it does:</strong> Combines 1150 nm forward-bias EL tomography, I–V/P–V/dP/dV traces, single-diode models, and Grad-CAM explainability.
                </p>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase text-white/90 block pt-1 border-t border-white/10">
                  WHY IT DIFFERS: STATISTICAL ALERTS BECOME ROOT-CAUSE EVIDENCE.
                </span>
              </div>

              <div className="p-3 sm:p-4 border border-white/15 bg-white/[0.02] space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white/50 text-xs sm:text-sm">03</span>
                  <h3 className="font-serif text-base sm:text-lg text-white">Closed-loop O&amp;M execution</h3>
                </div>
                <p className="text-[11px] sm:text-xs text-white/70 font-sans">
                  <strong>What it does:</strong> Moves from issue location to client approval, 24-hour SLA dispatch, Level-III repair guidance, safety checks, and before/after verification.
                </p>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase text-white/90 block pt-1 border-t border-white/10">
                  WHY IT DIFFERS: STATIC PDFS AND UNASSIGNED ALARMS DO NOT CLOSE THE LOOP.
                </span>
              </div>

              <div className="p-3 sm:p-4 border border-white/15 bg-white/[0.02] space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white/50 text-xs sm:text-sm">04</span>
                  <h3 className="font-serif text-base sm:text-lg text-white">Protection + monetization</h3>
                </div>
                <p className="text-[11px] sm:text-xs text-white/70 font-sans">
                  <strong>What it does:</strong> Connects Doppler weather defense, automated tracker stow, OEM warranty dossiers, carbon/I-REC records, and BESS arbitrage.
                </p>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase text-white/90 block pt-1 border-t border-white/10">
                  WHY IT DIFFERS: TURNS VERIFIED DATA INTO AVOIDED DAMAGE AND RECOVERED CASH.
                </span>
              </div>
            </div>

            {/* Technical Proof Points Strip */}
            <div className="border-t border-white/10 pt-3 sm:pt-4">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1.5 sm:mb-2">TECHNICAL PROOF POINTS</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 font-mono text-xs">
                <div className="p-2 border border-white/10 bg-white/[0.02]">
                  <strong className="text-sm sm:text-base text-white block">1 Hz</strong>
                  <span className="text-[9px] sm:text-[10px] text-white/60">Real-time DC telemetry across strings &amp; inverters.</span>
                </div>
                <div className="p-2 border border-white/10 bg-white/[0.02]">
                  <strong className="text-sm sm:text-base text-white block">1150 nm</strong>
                  <span className="text-[9px] sm:text-[10px] text-white/60">EL tomography for internal microcracks &amp; shunts.</span>
                </div>
                <div className="p-2 border border-white/10 bg-white/[0.02]">
                  <strong className="text-sm sm:text-base text-white block">24h SLA</strong>
                  <span className="text-[9px] sm:text-[10px] text-white/60">Automated dispatch from approval to field response.</span>
                </div>
                <div className="p-2 border border-white/10 bg-white/[0.02]">
                  <strong className="text-sm sm:text-base text-white block">IEC 62446-3</strong>
                  <span className="text-[9px] sm:text-[10px] text-white/60">Signed dossiers with SHA-256 verification hashes.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 7: 06 / COMPETITIVE LANDSCAPE
    {
      number: 7,
      verticalTag: "06 / COMPETITIVE LANDSCAPE",
      render: () => (
        <div className="flex flex-col justify-between h-full py-2 sm:py-4 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
              HEAD-TO-HEAD POSITIONING
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 sm:mb-3">
              Lumira competes by unifying categories that remain separate.
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-sans max-w-4xl leading-relaxed mb-4 sm:mb-6">
              The market is split between inspection vendors, SCADA platforms, and analytics startups. Lumira links the physical asset, electrical signal, diagnosis, field action, and financial proof.
            </p>

            {/* Comparison Table */}
            <div className="border border-white/20 overflow-x-auto mb-4 sm:mb-6 custom-scrollbar">
              <table className="w-full text-left font-sans text-xs min-w-[600px]">
                <thead className="bg-white/5 border-b border-white/20 font-mono text-[9px] sm:text-[10px] uppercase text-white/60">
                  <tr>
                    <th className="p-2.5 sm:p-3">DIMENSION</th>
                    <th className="p-2.5 sm:p-3">DRONE INSPECTION<br/><span className="text-[8px] sm:text-[9px] text-white/40">RAPTOR MAPS · ZEITVIEW</span></th>
                    <th className="p-2.5 sm:p-3">TRADITIONAL SCADA<br/><span className="text-[8px] sm:text-[9px] text-white/40">ALSOENERGY · SMA · SCHNEIDER</span></th>
                    <th className="p-2.5 sm:p-3">ANALYTICS STARTUPS<br/><span className="text-[8px] sm:text-[9px] text-white/40">RAYCATCH · SMARTHELIO</span></th>
                    <th className="p-2.5 sm:p-3 bg-white/10 text-white font-bold">LUMIRA SOLAR AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-[10px] sm:text-[11px]">
                  <tr>
                    <td className="p-2 sm:p-2.5 font-mono text-white/70 font-bold">Primary input</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Aerial UAV imagery</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Inverter / combiner Modbus</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Historical SCADA logs</td>
                    <td className="p-2 sm:p-2.5 bg-white/5 text-white font-medium">Drone + handheld + FLIR + rover + 1 Hz SCADA</td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:p-2.5 font-mono text-white/70 font-bold">Telemetry depth</td>
                    <td className="p-2 sm:p-2.5 text-white/60">None or post-flight</td>
                    <td className="p-2 sm:p-2.5 text-white/60">5–15 minute averages</td>
                    <td className="p-2 sm:p-2.5 text-white/60">15-minute logs</td>
                    <td className="p-2 sm:p-2.5 bg-white/5 text-white font-medium">1-second real-time DC MPPT context</td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:p-2.5 font-mono text-white/70 font-bold">Root-cause evidence</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Thermal / visual</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Electrical aggregate</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Statistical inference</td>
                    <td className="p-2 sm:p-2.5 bg-white/5 text-white font-medium">Multispectral + electrical + physics + XAI</td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:p-2.5 font-mono text-white/70 font-bold">Wafer-level EL</td>
                    <td className="p-2 sm:p-2.5 text-white/40">No</td>
                    <td className="p-2 sm:p-2.5 text-white/40">No</td>
                    <td className="p-2 sm:p-2.5 text-white/40">No</td>
                    <td className="p-2 sm:p-2.5 bg-white/5 text-white font-medium">1150 nm forward-bias tomography</td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:p-2.5 font-mono text-white/70 font-bold">I–V / P–V</td>
                    <td className="p-2 sm:p-2.5 text-white/40">No</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Basic / limited</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Mathematical estimates</td>
                    <td className="p-2 sm:p-2.5 bg-white/5 text-white font-medium">4 modes + IEC 60891 normalization</td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:p-2.5 font-mono text-white/70 font-bold">O&amp;M workflow</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Static report</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Unassigned alarms</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Alert list / email</td>
                    <td className="p-2 sm:p-2.5 bg-white/5 text-white font-medium">Approval → 24h SLA → verification</td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:p-2.5 font-mono text-white/70 font-bold">Warranty evidence</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Uncalibrated files</td>
                    <td className="p-2 sm:p-2.5 text-white/40">None</td>
                    <td className="p-2 sm:p-2.5 text-white/40">None</td>
                    <td className="p-2 sm:p-2.5 bg-white/5 text-white font-medium">IEC 62446-3 signed dossier</td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:p-2.5 font-mono text-white/70 font-bold">Commercial model</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Per-MW flight fees</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Hardware + software</td>
                    <td className="p-2 sm:p-2.5 text-white/60">Annual subscription</td>
                    <td className="p-2 sm:p-2.5 bg-white/5 text-white font-medium">INR SaaS + performance gainshare</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-white/20 pt-3 sm:pt-4 font-sans text-[11px] sm:text-sm text-white/80">
            <strong>Positioning.</strong> Not another drone vendor, SCADA dashboard, or alerting layer—the system of record between physical asset condition and financial action.
          </div>
        </div>
      )
    },

    // SLIDE 8: 07 / COMPETITIVE MOATS
    {
      number: 8,
      verticalTag: "07 / COMPETITIVE MOATS",
      render: () => (
        <div className="flex flex-col justify-between h-full py-2 sm:py-4 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
              WHY LUMIRA WINS OVER TIME
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 sm:mb-3">
              Five defensible moats compound with every deployment.
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-sans max-w-4xl leading-relaxed mb-4 sm:mb-6">
              Lumira’s advantage is not one isolated model or sensor. It is the synchronized data, physics, workflow, and monetization layer built around the asset.
            </p>

            <div className="border-t border-white/20 divide-y divide-white/10 mb-4 sm:mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 py-2.5 sm:py-3.5 items-start lg:items-center">
                <div className="lg:col-span-3 font-serif text-sm sm:text-lg text-white font-medium">
                  01 · Sensor fusion
                </div>
                <div className="lg:col-span-6 text-[11px] sm:text-sm text-white/70 font-sans">
                  A synchronized digital twin combines drone, handheld camera, FLIR, rover, SCADA, weather, tracker, satellite, market, and storm inputs.
                </div>
                <div className="lg:col-span-3 lg:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white">
                  <span className="text-white/40 block text-[8px] sm:text-[9px]">STRATEGIC EFFECT</span>
                  ONE OPERATING TRUTH ACROSS PORTFOLIO
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 py-2.5 sm:py-3.5 items-start lg:items-center">
                <div className="lg:col-span-3 font-serif text-sm sm:text-lg text-white font-medium">
                  02 · Wafer-level EL
                </div>
                <div className="lg:col-span-6 text-[11px] sm:text-sm text-white/70 font-sans">
                  1150 nm NIR forward-bias imaging exposes internal microcracks and diode shunts that standard thermal inspection can miss.
                </div>
                <div className="lg:col-span-3 lg:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white">
                  <span className="text-white/40 block text-[8px] sm:text-[9px]">STRATEGIC EFFECT</span>
                  DIAGNOSIS BELOW THE VISIBLE LAYER
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 py-2.5 sm:py-3.5 items-start lg:items-center">
                <div className="lg:col-span-3 font-serif text-sm sm:text-lg text-white font-medium">
                  03 · Physics + XAI
                </div>
                <div className="lg:col-span-6 text-[11px] sm:text-sm text-white/70 font-sans">
                  Single-diode models, I–V/P–V traces, dP/dV conductance, solar geometry, and Grad-CAM attention maps reduce black-box decision risk.
                </div>
                <div className="lg:col-span-3 lg:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white">
                  <span className="text-white/40 block text-[8px] sm:text-[9px]">STRATEGIC EFFECT</span>
                  DEFENSIBLE ACTIONS &amp; FEWER FALSE POSITIVES
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 py-2.5 sm:py-3.5 items-start lg:items-center">
                <div className="lg:col-span-3 font-serif text-sm sm:text-lg text-white font-medium">
                  04 · Closed-loop execution
                </div>
                <div className="lg:col-span-6 text-[11px] sm:text-sm text-white/70 font-sans">
                  Three synchronized portals connect asset owners, field inspectors, and service teams with approvals, work orders, safety protocols, and evidence closure.
                </div>
                <div className="lg:col-span-3 lg:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white">
                  <span className="text-white/40 block text-[8px] sm:text-[9px]">STRATEGIC EFFECT</span>
                  SIGNAL BECOMES VERIFIED FIELD OUTCOME
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 py-2.5 sm:py-3.5 items-start lg:items-center">
                <div className="lg:col-span-3 font-serif text-sm sm:text-lg text-white font-medium">
                  05 · Monetization infrastructure
                </div>
                <div className="lg:col-span-6 text-[11px] sm:text-sm text-white/70 font-sans">
                  The same verified evidence can support OEM warranty recovery, carbon / I-REC records, BESS decisions, storm protection, and audit reporting.
                </div>
                <div className="lg:col-span-3 lg:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white">
                  <span className="text-white/40 block text-[8px] sm:text-[9px]">STRATEGIC EFFECT</span>
                  MORE VALUE POOLS WITHOUT MORE SILOS
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-3 sm:pt-4 font-sans text-[11px] sm:text-sm text-white/80">
            <strong>Strategic advantage.</strong> Each new workflow increases the value of the shared data foundation rather than creating another silo.
          </div>
        </div>
      )
    },

    // SLIDE 9: 08 / REVENUE MODEL
    {
      number: 9,
      verticalTag: "08 / REVENUE MODEL",
      render: () => (
        <div className="flex flex-col justify-between h-full py-2 sm:py-4 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
              INR-DENOMINATED MONETIZATION
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 sm:mb-3">
              Revenue is anchored by recurring software and expanded by performance.
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-sans max-w-4xl leading-relaxed mb-4 sm:mb-6">
              Lumira uses a hybrid model: predictable SaaS revenue at the base, plus upside from value pools that traditional software pricing ignores.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 border-t border-white/20 py-4 sm:py-6 mb-4 sm:mb-6">
              {/* Left: Five Revenue Streams Table (7 Cols) */}
              <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 block">FIVE REVENUE STREAMS</span>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left font-sans text-xs border border-white/10 min-w-[340px]">
                    <thead className="bg-white/5 font-mono text-[9px] sm:text-[10px] text-white/60 uppercase border-b border-white/10">
                      <tr>
                        <th className="p-2 sm:p-2.5">STREAM</th>
                        <th className="p-2 sm:p-2.5">MECHANISM</th>
                        <th className="p-2 sm:p-2.5 text-right">ECONOMICS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-[10px] sm:text-[11px]">
                      <tr>
                        <td className="p-1.5 sm:p-2 font-mono font-bold text-white">01 · Enterprise SaaS</td>
                        <td className="p-1.5 sm:p-2 text-white/70">Recurring asset intelligence platform.</td>
                        <td className="p-1.5 sm:p-2 text-right font-mono text-white">₹1.00L–₹18.30L / yr</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 sm:p-2 font-mono font-bold text-white">02 · OEM warranty</td>
                        <td className="p-1.5 sm:p-2 text-white/70">Success fee on IEC 62446-3 claims.</td>
                        <td className="p-1.5 sm:p-2 text-right font-mono text-white">15% of cash</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 sm:p-2 font-mono font-bold text-white">03 · Carbon / I-REC</td>
                        <td className="p-1.5 sm:p-2 text-white/70">Fee on verified environmental credits.</td>
                        <td className="p-1.5 sm:p-2 text-right font-mono text-white">5% of value</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 sm:p-2 font-mono font-bold text-white">04 · BESS arbitrage</td>
                        <td className="p-1.5 sm:p-2 text-white/70">Dynamic 15-min peak spread dispatch.</td>
                        <td className="p-1.5 sm:p-2 text-right font-mono text-white">10% profit</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 sm:p-2 font-mono font-bold text-white">05 · Robotics license</td>
                        <td className="p-1.5 sm:p-2 text-white/70">Edge vision for dock/rover unit.</td>
                        <td className="p-1.5 sm:p-2 text-right font-mono text-white">₹37,500 / mo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: SaaS Pricing Ladder (5 Cols) */}
              <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 block">SAAS PRICING LADDER</span>
                <div className="space-y-2 sm:space-y-3 font-sans text-xs">
                  <div className="p-2.5 sm:p-3 border border-white/10 bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-0.5 sm:mb-1">
                      <strong className="text-white font-serif text-xs sm:text-sm">C&amp;I fleets · 5–50 MW</strong>
                      <span className="font-mono text-white font-bold text-xs">₹1,00,000 / yr</span>
                    </div>
                    <p className="text-white/60 text-[10px] sm:text-[11px]">Handheld + FLIR ingestion, sub-string thermal mapping, automated dispatch.</p>
                  </div>

                  <div className="p-2.5 sm:p-3 border border-white/20 bg-white/[0.04]">
                    <div className="flex justify-between items-center mb-0.5 sm:mb-1">
                      <strong className="text-white font-serif text-xs sm:text-sm">Utility scale · 50–250 MW</strong>
                      <span className="font-mono text-white font-bold text-xs">₹2,40,000 / yr / 100 MW</span>
                    </div>
                    <p className="text-white/60 text-[10px] sm:text-[11px]">UAV planner, 1 Hz SCADA, I–V analytics, 24-hour SLA queue, storm defense.</p>
                  </div>

                  <div className="p-2.5 sm:p-3 border border-white/10 bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-0.5 sm:mb-1">
                      <strong className="text-white font-serif text-xs sm:text-sm">Portfolio tier · &gt;1 GW</strong>
                      <span className="font-mono text-white font-bold text-xs">₹18,30,000 / yr / GW</span>
                    </div>
                    <p className="text-white/60 text-[10px] sm:text-[11px]">Multi-region cluster, air-gapped SCADA firewall, OEM routing, dedicated engineering.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-3 sm:pt-4 font-sans text-[11px] sm:text-sm text-white/80">
            <strong>Land-and-expand path.</strong> Start with inspection and yield recovery, then add warranty, carbon, BESS, storm defense, and enterprise compliance modules.
          </div>
        </div>
      )
    },

    // SLIDE 10: 09 / UNIT ECONOMICS
    {
      number: 10,
      verticalTag: "09 / UNIT ECONOMICS",
      render: () => (
        <div className="flex flex-col justify-between h-full py-2 sm:py-4 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
              SCALE ECONOMICS
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 sm:mb-3">
              The model scales with portfolio coverage, not field headcount.
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-sans max-w-4xl leading-relaxed mb-4 sm:mb-6">
              Recurring revenue compounds with coverage; performance fees capture upside.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 border-t border-white/20 py-4 sm:py-6 mb-4 sm:mb-6">
              {/* Left Column: Unit Economics (5 Cols) */}
              <div className="lg:col-span-5 space-y-2 sm:space-y-3">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 block">UNIT ECONOMICS</span>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-baseline justify-between border-b border-white/10 pb-1.5 sm:pb-2">
                    <span className="text-2xl sm:text-3xl font-serif text-white">88.4%</span>
                    <div className="text-right">
                      <strong className="text-[11px] sm:text-xs font-mono text-white block">Gross margin</strong>
                      <span className="text-[9px] sm:text-[10px] text-white/50">Cloud-native; compute offloaded to edge.</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between border-b border-white/10 pb-1.5 sm:pb-2">
                    <span className="text-2xl sm:text-3xl font-serif text-white">₹10.4L</span>
                    <div className="text-right">
                      <strong className="text-[11px] sm:text-xs font-mono text-white block">Customer acquisition cost</strong>
                      <span className="text-[9px] sm:text-[10px] text-white/50">Direct enterprise sales.</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between border-b border-white/10 pb-1.5 sm:pb-2">
                    <span className="text-2xl sm:text-3xl font-serif text-white">₹1.48 Cr</span>
                    <div className="text-right">
                      <strong className="text-[11px] sm:text-xs font-mono text-white block">Customer lifetime value</strong>
                      <span className="text-[9px] sm:text-[10px] text-white/50">Five-year contracts + gainshare.</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between border-b border-white/10 pb-1.5 sm:pb-2">
                    <span className="text-2xl sm:text-3xl font-serif text-white">14.2×</span>
                    <div className="text-right">
                      <strong className="text-[11px] sm:text-xs font-mono text-white block">LTV / CAC ratio</strong>
                      <span className="text-[9px] sm:text-[10px] text-white/50">Top-decile capital efficiency.</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-lg sm:text-xl font-serif text-white">134% / &lt;1.3 mo</span>
                    <div className="text-right">
                      <strong className="text-[11px] sm:text-xs font-mono text-white block">NRR / payback</strong>
                      <span className="text-[9px] sm:text-[10px] text-white/50">Expansion across new sites.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Bottom-Up Revenue Trajectory (7 Cols) */}
              <div className="lg:col-span-7 space-y-2 sm:space-y-3">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 block">BOTTOM-UP REVENUE TRAJECTORY</span>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left font-sans text-xs border border-white/10 min-w-[360px]">
                    <thead className="bg-white/5 font-mono text-[9px] sm:text-[10px] text-white/60 uppercase border-b border-white/10">
                      <tr>
                        <th className="p-2 sm:p-3">YEAR</th>
                        <th className="p-2 sm:p-3">ASSETS</th>
                        <th className="p-2 sm:p-3">BASE ARR</th>
                        <th className="p-2 sm:p-3">GAINSHARE</th>
                        <th className="p-2 sm:p-3 text-right">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-mono text-[11px] sm:text-xs">
                      <tr>
                        <td className="p-2 sm:p-3 font-bold text-white">2026</td>
                        <td className="p-2 sm:p-3 text-white/70">2.5 GW</td>
                        <td className="p-2 sm:p-3 text-white/70">₹3.50 Cr</td>
                        <td className="p-2 sm:p-3 text-white/70">₹1.50 Cr</td>
                        <td className="p-2 sm:p-3 text-right font-bold text-white">₹5.00 Cr</td>
                      </tr>
                      <tr>
                        <td className="p-2 sm:p-3 font-bold text-white">2027</td>
                        <td className="p-2 sm:p-3 text-white/70">12.0 GW</td>
                        <td className="p-2 sm:p-3 text-white/70">₹24.00 Cr</td>
                        <td className="p-2 sm:p-3 text-white/70">₹9.33 Cr</td>
                        <td className="p-2 sm:p-3 text-right font-bold text-white">₹33.33 Cr</td>
                      </tr>
                      <tr>
                        <td className="p-2 sm:p-3 font-bold text-white">2028</td>
                        <td className="p-2 sm:p-3 text-white/70">45.0 GW</td>
                        <td className="p-2 sm:p-3 text-white/70">₹78.75 Cr</td>
                        <td className="p-2 sm:p-3 text-white/70">₹27.91 Cr</td>
                        <td className="p-2 sm:p-3 text-right font-bold text-white">₹106.66 Cr</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-white/40 pt-1">
                  PROJECTION BASIS · INSTITUTIONAL REVENUE MODEL.
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-3 sm:pt-4 font-sans text-[11px] sm:text-sm text-white/80">
            <strong>Investor lens.</strong> Base revenue compounds with portfolio coverage; gainshare captures verified upside; add-ons lift retention.
          </div>
        </div>
      )
    },

    // SLIDE 11: 10 / ROLE PORTALS
    {
      number: 11,
      verticalTag: "10 / ROLE PORTALS",
      render: () => (
        <div className="flex flex-col justify-between h-full py-2 sm:py-4 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
              THE OPERATING ECOSYSTEM
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 sm:mb-3">
              Three role portals turn shared intelligence into shared execution.
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-sans max-w-4xl leading-relaxed mb-4 sm:mb-6">
              Lumira is designed around the way solar organizations actually work: multiple teams, different permissions, one synchronized operating truth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-white/20 py-4 sm:py-6 mb-4 sm:mb-6">
              {/* Asset Owner */}
              <div className="p-3.5 sm:p-4 border border-white/15 bg-white/[0.02] space-y-2 sm:space-y-3">
                <h3 className="font-serif text-base sm:text-lg text-white">Asset Owner / Client Portal</h3>
                <ul className="text-[11px] sm:text-xs font-sans text-white/70 space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>Portfolio ESG &amp; ROI.</strong> Real-time energy recovery and financial capital preservation tracking.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>Approvals queue.</strong> One-click authorization for field interventions and OEM warranty claims.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>Innovation labs.</strong> Access to storm defense, BESS arbitrage, and carbon tokenization modules.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>Executive audit.</strong> Cryptographically signed IEC 62446-3 compliance certificates.</span>
                  </li>
                </ul>
              </div>

              {/* Field Inspector Hub */}
              <div className="p-3.5 sm:p-4 border border-white/15 bg-white/[0.02] space-y-2 sm:space-y-3">
                <h3 className="font-serif text-base sm:text-lg text-white">Field Inspector Hub</h3>
                <ul className="text-[11px] sm:text-xs font-sans text-white/70 space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>3D flight planner.</strong> Automated UAV grid generation with GSD and overlap validation.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>Live sensor stream.</strong> Real-time monitoring of drone, rover, and handheld capture modalities.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>Site setup.</strong> Polygon mapping and digital-twin initialization for new portfolio assets.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>Signoff.</strong> Digital verification of inspection missions and raw data integrity.</span>
                  </li>
                </ul>
              </div>

              {/* Service Team */}
              <div className="p-3.5 sm:p-4 border border-white/15 bg-white/[0.02] space-y-2 sm:space-y-3">
                <h3 className="font-serif text-base sm:text-lg text-white">Service Team / O&amp;M Hub</h3>
                <ul className="text-[11px] sm:text-xs font-sans text-white/70 space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>24h SLA queue.</strong> Automated routing of approved repairs to certified field technicians.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>Technical protocols.</strong> Level-III guidance with part numbers, torque specs, and safety checklists.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>Evidence capture.</strong> Mobile upload of before/after photos for instant AI repair verification.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-white">■</span>
                    <span><strong>Closure.</strong> Automated ticket resolution and notification to the asset owner.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-3 sm:pt-4 font-sans text-[11px] sm:text-sm text-white/80">
            <strong>Closed-loop handoff.</strong> Inspector identifies → Owner approves → Service team repairs → Lumira verifies → Auditor receives evidence.
          </div>
        </div>
      )
    },

    // SLIDE 12: 11 / DEPLOYMENT ASK
    {
      number: 12,
      verticalTag: "11 / DEPLOYMENT ASK",
      render: () => (
        <div className="flex flex-col justify-between h-full py-2 sm:py-4 space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block mb-1.5 sm:mb-2">
              THE NEXT OPERATING LAYER
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2 sm:mb-3">
              Make every recoverable asset visible, actionable, and monetizable.
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-sans max-w-4xl leading-relaxed mb-4 sm:mb-6">
              Lumira is built for asset owners, IPPs, EPCs, O&amp;M providers, insurers, and clean-energy investment teams that need one operating truth across distributed solar fleets.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 border-t border-white/20 py-4 sm:py-6 mb-4 sm:mb-6">
              {/* Left: What Lumira Replaces */}
              <div className="space-y-2 sm:space-y-4">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 block">WHAT LUMIRA REPLACES</span>
                <div className="space-y-2 sm:space-y-3 font-sans text-xs sm:text-sm text-white/70">
                  <div className="border-l border-white/20 pl-2.5 sm:pl-3">
                    Disconnected dashboards that show aggregate status without module-level context.
                  </div>
                  <div className="border-l border-white/20 pl-2.5 sm:pl-3">
                    Episodic inspections that produce files instead of continuous decisions.
                  </div>
                  <div className="border-l border-white/20 pl-2.5 sm:pl-3">
                    Unassigned alarms that lack an owner, SLA, or repair protocol.
                  </div>
                  <div className="border-l border-white/20 pl-2.5 sm:pl-3">
                    Incomplete evidence that weakens claims, audits, and ESG records.
                  </div>
                </div>
              </div>

              {/* Right: 30-Day Sprint */}
              <div className="space-y-2 sm:space-y-4">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 block">30-DAY BASELINE-TO-VALUE SPRINT</span>
                <div className="space-y-2 sm:space-y-3 font-sans text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="font-mono text-white/50 text-sm sm:text-base">01</span>
                    <span className="text-white/80">Select a 100–500 MW portfolio or representative C&amp;I cluster.</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="font-mono text-white/50 text-sm sm:text-base">02</span>
                    <span className="text-white/80">Connect SCADA, inspection, and O&amp;M data.</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="font-mono text-white/50 text-sm sm:text-base">03</span>
                    <span className="text-white/80">Measure baseline health, issues, and recoverable value.</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="font-mono text-white/50 text-sm sm:text-base">04</span>
                    <span className="text-white/80">Expand from yield recovery into warranty, storm, BESS, carbon, and compliance workflows.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-3 sm:pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 block">LUMIRA SOLAR AI</span>
              <p className="font-serif text-xs sm:text-base text-white">
                Detect hidden degradation. Orchestrate action. Recover measurable value.
              </p>
            </div>
            <a
              href="https://lumira-solar-ai.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white text-black font-mono text-[11px] sm:text-xs font-bold uppercase hover:bg-white/80 transition-all cursor-pointer shrink-0"
            >
              EXPLORE LIVE OS →
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
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 w-screen h-screen z-50 bg-[#08090a] text-white select-none flex flex-col justify-between overflow-hidden"
    >
      
      {/* 1. Full-Screen Minimal Top Navigation Bar */}
      <div className="h-12 sm:h-14 border-b border-white/10 px-3 sm:px-6 md:px-10 flex justify-between items-center shrink-0 bg-[#08090a]/90 backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-serif text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-1">
            <span>Lumira</span>
            <span className="text-white text-xs">✦</span>
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="font-mono text-[10px] sm:text-xs text-white/60 uppercase tracking-widest hidden sm:inline">
            SOLAR ASSET INTELLIGENCE OS
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-xs text-white/50 tracking-wider">
            {currentSlide < 10 ? `0${currentSlide}` : currentSlide} / {totalSlides < 10 ? `0${totalSlides}` : totalSlides}
          </span>

          <button
            onClick={toggleBrowserFullscreen}
            className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer hidden sm:block"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleDownloadDeck}
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 border border-white/20 hover:border-white text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">PRINT / PDF</span>
          </button>

          <button
            onClick={onClose}
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black font-mono text-xs cursor-pointer transition-all"
            title="Close (ESC)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 2. Main Full-Screen Slide Body with Left Vertical Ribbon */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Vertical Ribbon (Hidden on Mobile for max canvas area) */}
        <div className="hidden md:flex w-12 sm:w-16 border-r border-white/10 items-center justify-center shrink-0">
          <div className="transform -rotate-90 whitespace-nowrap text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
            {current.verticalTag}
          </div>
        </div>

        {/* Slide Canvas Content Area */}
        <div className="flex-1 p-3.5 sm:p-8 lg:p-14 overflow-y-auto max-w-7xl mx-auto w-full flex flex-col justify-between custom-scrollbar">
          {current.render()}
        </div>
      </div>

      {/* 3. Full-Screen Bottom Control Strip */}
      <div className="h-12 sm:h-14 border-t border-white/10 px-3 sm:px-6 md:px-10 flex justify-between items-center shrink-0 bg-[#08090a]/90 backdrop-blur-md font-mono text-xs">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(1, prev - 1))}
          disabled={currentSlide === 1}
          className={`flex items-center gap-1.5 sm:gap-2 uppercase tracking-wider transition-all cursor-pointer text-[11px] sm:text-xs ${
            currentSlide === 1 ? "text-white/20 cursor-not-allowed" : "text-white hover:text-white/70"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">PREVIOUS</span>
          <span className="sm:hidden">PREV</span>
        </button>

        {/* Slide Dots Scrubber */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {slides.map((s) => (
            <button
              key={s.number}
              onClick={() => setCurrentSlide(s.number)}
              className={`h-1.5 transition-all cursor-pointer ${
                currentSlide === s.number ? "w-4 sm:w-8 bg-white" : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/50"
              }`}
              title={`Slide ${s.number}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => Math.min(totalSlides, prev + 1))}
          disabled={currentSlide === totalSlides}
          className={`flex items-center gap-1.5 sm:gap-2 uppercase tracking-wider transition-all cursor-pointer text-[11px] sm:text-xs ${
            currentSlide === totalSlides ? "text-white/20 cursor-not-allowed" : "text-white hover:text-white/70"
          }`}
        >
          <span className="hidden sm:inline">NEXT</span>
          <span className="sm:hidden">NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
