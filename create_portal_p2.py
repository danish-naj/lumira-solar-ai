import os

PORTAL_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Portals\FieldInspectorPortal.jsx"

p2 = """
  const handleLaunchDrone = () => {
    setDockHatchOpen(true);
    setCurrentStage(3);
    setIsCollecting(true);
    setScanProgress(0);
  };

  const handleForwardToClient = () => {
    setIsSubmittingReport(true);
    setTimeout(() => {
      setIsSubmittingReport(false);
      setReportSubmitted(true);
      if (onSubmitReportToClient) {
        onSubmitReportToClient({
          id: "REP-DRONE-2026-08",
          title: "Comprehensive Drone Radiometric IR & Optical Inspection Audit",
          date: "26 Aug 2026",
          source: "Drone Orthomosaic (DJI M300 RTK)",
          farm_id: farm?.id || "bhadla",
          farm_name: farm?.name || "Bhadla Mega Solar Park - Sector 4",
          auditor: "Capt. A. Nair (Level-III Thermographer #8492)",
          modules_scanned: 1200,
          defects_count: 4,
          health_score: 97,
          total_loss_kwh: "4.8 kWh/d",
          annual_revenue_risk: "₹1,48,900 / yr ($1,780 / yr)",
          status: "Pending Client Approval",
          defects: detectedDefects
        });
      }
    }, 1000);
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Header & Unified 5-Stage Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Camera className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              FIELD INSPECTION MISSION WORKSPACE
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Auditor: Capt. A. Nair (Level-III #8492)
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Autonomous Drone Mission & Diagnostic Inspection Pipeline
          </h1>
        </div>

        {/* 5-Stage Step Navigation Pills */}
        <div className="flex items-center gap-1 font-mono-data text-xs border-2 border-primary p-1 bg-white shadow-xs">
          {[
            { stage: 1, label: "1. Dock & Modality" },
            { stage: 2, label: "2. Flight Planner" },
            { stage: 3, label: "3. Live HUD Sweep" },
            { stage: 4, label: "4. AI Diagnostics" },
            { stage: 5, label: "5. Client Report" },
          ].map((s) => (
            <button
              key={s.stage}
              onClick={() => setCurrentStage(s.stage)}
              className={`px-2.5 py-1 font-bold transition-all cursor-pointer uppercase text-[11px] ${
                currentStage === s.stage ? "bg-primary text-white shadow-xs" : "text-secondary hover:bg-surface"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STAGE 1: MODALITY SELECTION & DRONE DOCK ALPHA PRE-FLIGHT CHECK           */}
      {/* ========================================================================= */}
      {currentStage === 1 && (
        <div className="space-y-6 font-mono-data text-xs">
          {/* Drone Dock Alpha Telemetry Box */}
          <div className="border-2 border-primary bg-white p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-primary animate-pulse" />
                <div>
                  <strong className="text-sm font-bold text-primary block">AUTONOMOUS DRONE DOCK ALPHA (SECTOR 4 NEST)</strong>
                  <span className="text-secondary text-[11px] font-sans">On-Site Robotic Weatherproof Hangar with Rapid Induction Charging</span>
                </div>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold uppercase">
                ✓ DOCK ONLINE · READY
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface p-4 border border-border-strong font-sans text-xs">
              <div><span className="text-secondary uppercase text-[10px] block font-bold font-mono-data">Hangar Status:</span><strong className="text-primary font-mono-data text-sm">{dockHatchOpen ? "HATCH OPEN" : "SEALED (WEATHERPROOF)"}</strong></div>
              <div><span className="text-secondary uppercase text-[10px] block font-bold font-mono-data">Battery SoC:</span><strong className="text-[#027a48] font-mono-data text-sm">100% Rapid Charged</strong></div>
              <div><span className="text-secondary uppercase text-[10px] block font-bold font-mono-data">GPS RTK Lock:</span><strong className="text-primary font-mono-data text-sm">18 Fixed (±1 cm)</strong></div>
              <div><span className="text-secondary uppercase text-[10px] block font-bold font-mono-data">Atmosphere:</span><strong className="text-primary font-mono-data text-sm">16.4 km/h · 942 W/m²</strong></div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-secondary text-xs font-sans">All pre-flight safety interlocks cleared. Click proceed to configure mission flight path.</span>
              <button
                onClick={() => setCurrentStage(2)}
                className="bg-primary text-white font-bold py-3 px-6 uppercase tracking-wider text-xs border border-primary hover:bg-white hover:text-primary transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>PROCEED TO FLIGHT PATH PLANNER →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: INTERACTIVE FLIGHT PATH PLANNER & FLIGHT PHYSICS                 */}
      {/* ========================================================================= */}
      {currentStage === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
          {/* Left Column: Interactive Waypoint Canvas (7 Cols) */}
          <div className="lg:col-span-7 border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-primary" />
                <span>WAYPOINT SWEEP TRAJECTORY (12 WAYPOINTS)</span>
              </strong>
              <span className="text-[10px] text-secondary">Target: 20 Rows / 1,200 Panels</span>
            </div>

            <div className="relative border border-border-strong bg-[#0f172a] h-72 rounded-none overflow-hidden p-2 flex items-center justify-center">
              <svg viewBox="0 0 400 240" className="w-full h-full">
                {/* 20 Solar Panel Rows Schematic */}
                {[50, 80, 110, 140, 170, 200].map((y, idx) => (
                  <g key={idx}>
                    <rect x="40" y={y - 8} width="320" height="16" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                    <text x="365" y={y + 3} fill="#64748b" fontSize="7" fontFamily="monospace">R{idx * 2 + 1}-{idx * 2 + 2}</text>
                  </g>
                ))}

                {/* Lawnmower Flight Trajectory Path */}
                <path
                  d="M 50 50 L 350 50 L 350 80 L 50 80 L 50 110 L 350 110 L 350 140 L 50 140 L 50 170 L 350 170 L 350 200 L 50 200"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />

                {/* 12 Interactive Waypoints */}
                {flightWaypoints.map((wp) => {
                  const isSelected = selectedWaypoint === wp.id;
                  return (
                    <g key={wp.id} onClick={() => setSelectedWaypoint(wp.id)} className="cursor-pointer">
                      <circle cx={wp.x} cy={wp.y} r={isSelected ? 8 : 5} fill={isSelected ? "#ef4444" : "#38bdf8"} stroke="#ffffff" strokeWidth="1.5" />
                      <text x={wp.x + 8} y={wp.y + 3} fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace">{wp.label}</text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="bg-surface p-3 border border-border-subtle flex justify-between items-center text-[11px]">
              <span>Selected Waypoint: <strong className="text-primary">WP-{selectedWaypoint < 10 ? `0${selectedWaypoint}` : selectedWaypoint}</strong></span>
              <span>Row Sweep: <strong className="text-primary">{flightWaypoints[selectedWaypoint - 1]?.row}</strong></span>
            </div>
          </div>

          {/* Right Column: Flight Physics & Dispatch Button (5 Cols) */}
          <div className="lg:col-span-5 border-2 border-primary bg-white p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div>
              <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-2 mb-3">
                MISSION FLIGHT PHYSICS CONTROLS:
              </strong>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Flight Altitude:</span>
                    <strong className="text-primary">{altitudeM} meters AGL</strong>
                  </div>
                  <input type="range" min="20" max="60" value={altitudeM} onChange={(e) => setAltitudeM(Number(e.target.value))} className="w-full accent-primary" />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Flight Speed:</span>
                    <strong className="text-primary">{speedMs} m/s</strong>
                  </div>
                  <input type="range" min="2" max="10" step="0.5" value={speedMs} onChange={(e) => setSpeedMs(Number(e.target.value))} className="w-full accent-primary" />
                </div>

                <div className="bg-surface p-3 border border-border-subtle space-y-1.5 text-xs font-sans">
                  <div className="flex justify-between"><span>Calculated GSD:</span> <strong className="font-mono-data text-primary">0.5 cm / pixel</strong></div>
                  <div className="flex justify-between"><span>Total Flight Time:</span> <strong className="font-mono-data text-primary">18.4 minutes</strong></div>
                  <div className="flex justify-between"><span>Battery Consumption:</span> <strong className="font-mono-data text-[#027a48]">36% (64% Reserve)</strong></div>
                </div>
              </div>
            </div>

            {/* Launch Trigger Button */}
            <button
              onClick={handleLaunchDrone}
              className="w-full bg-[#027a48] text-white font-bold py-4 px-4 border-2 border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs"
            >
              <span>DISPATCH & LAUNCH DRONE FROM DOCK ALPHA →</span>
              <Plane className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 3: IN-FLIGHT LIVE DATA COLLECTION PROGRESS HUD                      */}
      {/* ========================================================================= */}
      {currentStage === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
          {/* Left Column: Real-Time Waypoint Tracking & Animated Drone (6 Cols) */}
          <div className="lg:col-span-6 border-2 border-primary bg-white p-5 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-critical inline-block animate-ping" />
                <span>LIVE FLIGHT SWEEP IN PROGRESS: WP-{currentWaypoint}</span>
              </strong>
              <span className="bg-critical text-white px-2 py-0.5 text-[9px] font-bold uppercase">
                ● AIRBORNE
              </span>
            </div>

            {/* In-Flight Waypoint Canvas with Moving Drone */}
            <div className="relative border border-border-strong bg-[#0f172a] h-64 rounded-none overflow-hidden p-2 flex items-center justify-center">
              <svg viewBox="0 0 400 240" className="w-full h-full">
                {[50, 80, 110, 140, 170, 200].map((y, idx) => (
                  <rect key={idx} x="40" y={y - 8} width="320" height="16" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                ))}

                <path
                  d="M 50 50 L 350 50 L 350 80 L 50 80 L 50 110 L 350 110 L 350 140 L 50 140 L 50 170 L 350 170 L 350 200 L 50 200"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />

                {/* Moving Drone Marker */}
                <g transform={`translate(${flightWaypoints[currentWaypoint - 1]?.x || 50}, ${flightWaypoints[currentWaypoint - 1]?.y || 50})`}>
                  <circle cx="0" cy="0" r="12" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-ping" />
                  <circle cx="0" cy="0" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="10" y="3" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">DJI M300</text>
                </g>
              </svg>
            </div>

            {/* Progress Bar & Telemetry */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Mission Collection Progress:</span>
                <strong className="text-primary font-bold">{scanProgress}% Completed</strong>
              </div>
              <div className="w-full bg-surface border border-border-strong h-3 overflow-hidden">
                <div style={{ width: `${scanProgress}%` }} className="bg-primary h-full transition-all duration-300" />
              </div>
              <div className="flex justify-between text-[11px] text-secondary">
                <span>Frames Captured: <strong className="text-primary font-mono-data">{telemetry.frames} / 1200</strong></span>
                <span>Battery Remaining: <strong className="text-[#027a48] font-mono-data">{telemetry.batterySoC}%</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Drone Pilot HUD & Camera Video Stream (6 Cols) */}
          <div className="lg:col-span-6 border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-primary" />
                <span>PILOT HUD & ZENMUSE H20T FEED</span>
              </strong>
              <div className="flex gap-1">
                <button
                  onClick={() => setCameraMode("thermal")}
                  className={`px-2 py-0.5 text-[9px] font-bold uppercase ${cameraMode === "thermal" ? "bg-primary text-white" : "bg-surface text-secondary"}`}
                >
                  Thermal IR
                </button>
                <button
                  onClick={() => setCameraMode("optical")}
                  className={`px-2 py-0.5 text-[9px] font-bold uppercase ${cameraMode === "optical" ? "bg-primary text-white" : "bg-surface text-secondary"}`}
                >
                  4K Optical
                </button>
              </div>
            </div>

            {/* Video Camera Preview */}
            <div className="relative border border-border-strong bg-black h-56 flex items-center justify-center overflow-hidden">
              <img
                src={cameraMode === "thermal" ? "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80" : "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80"}
                alt="Camera Feed"
                className="w-full h-full object-cover opacity-85"
              />

              {/* Artificial Horizon Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-0.5 bg-[#22c55e] opacity-80" />
                <div className="h-16 w-0.5 bg-[#22c55e] opacity-80 absolute" />
              </div>

              <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[9px] text-white">
                ALT: {telemetry.altitude}m · SPD: {telemetry.speed}m/s
              </div>
            </div>

            {scanProgress === 100 && (
              <button
                onClick={() => setCurrentStage(4)}
                className="w-full bg-primary text-white font-bold py-2.5 px-4 text-xs uppercase tracking-wider flex items-center justify-between border border-primary hover:bg-white hover:text-primary transition-all cursor-pointer"
              >
                <span>SCAN COMPLETE · OPEN AI ANOMALY DIAGNOSTICS →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 4: AI ANOMALY DIAGNOSTICS & LOSS ATTRIBUTION                        */}
      {/* ========================================================================= */}
      {currentStage === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
          {/* Left Column: Detected Defects List (5 Cols) */}
          <div className="lg:col-span-5 border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-primary" />
                <span>AI VISION DETECTIONS (4 ANOMALIES)</span>
              </strong>
              <span className="text-[10px] text-critical font-bold">2 Critical (P1)</span>
            </div>

            <div className="space-y-2">
              {detectedDefects.map((def, idx) => (
                <div
                  key={def.id}
                  onClick={() => setSelectedDefectIdx(idx)}
                  className={`p-3 border transition-all cursor-pointer bg-surface hover:bg-white ${
                    selectedDefectIdx === idx ? "border-primary bg-[#f6fef9] shadow-xs" : "border-border-subtle hover:border-primary"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <strong className="text-primary text-xs">#{def.module_id} ({def.inverter})</strong>
                    <span className="text-critical font-bold">{def.deltaT}</span>
                  </div>
                  <span className="text-[11px] text-secondary font-sans block">{def.type}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentStage(5)}
              className="w-full bg-primary text-white font-bold py-3 px-4 border border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer mt-3"
            >
              <span>COMPILE & FORWARD AUDIT REPORT →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: 3-Layer Visualizer & Detailed Diagnostics (7 Cols) */}
          <div className="lg:col-span-7 border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary uppercase font-bold block">{detectedDefects[selectedDefectIdx]?.id} · {detectedDefects[selectedDefectIdx]?.inverter}</span>
                <strong className="text-base text-primary font-mono-data block mt-0.5">{detectedDefects[selectedDefectIdx]?.type}</strong>
                <span className="text-secondary text-xs font-sans">Module: <strong>#{detectedDefects[selectedDefectIdx]?.module_id}</strong></span>
              </div>
              <span className="bg-[#fef3f2] text-critical border border-critical px-2.5 py-1 text-xs font-bold uppercase">
                {detectedDefects[selectedDefectIdx]?.severity} SEVERITY
              </span>
            </div>

            {/* Diagnostic Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-surface p-4 border border-border-subtle font-sans text-xs">
              <div><span className="text-secondary">Thermal Delta (ΔT):</span> <strong className="font-mono-data text-critical text-sm block">{detectedDefects[selectedDefectIdx]?.deltaT}</strong></div>
              <div><span className="text-secondary">AI Confidence:</span> <strong className="font-mono-data text-[#027a48] text-sm block">{detectedDefects[selectedDefectIdx]?.confidence}</strong></div>
              <div><span className="text-secondary">Annual Loss Risk:</span> <strong className="font-mono-data text-primary text-sm block">{detectedDefects[selectedDefectIdx]?.loss_inr}</strong></div>
            </div>

            <div className="space-y-1 font-sans">
              <strong className="text-primary font-mono-data text-xs uppercase block">RECOMMENDED REMEDIATION ACTION:</strong>
              <div className="p-3 bg-surface border border-border-subtle text-secondary text-xs">
                {detectedDefects[selectedDefectIdx]?.action}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 5: CERTIFIED AUDIT REPORT & 1-CLICK CLIENT FORWARDING               */}
      {/* ========================================================================= */}
      {currentStage === 5 && (
        <div className="space-y-6 font-mono-data text-xs">
          <div className="border-2 border-primary bg-white p-8 space-y-6 shadow-xs">
            <div className="flex justify-between items-start border-b-2 border-primary pb-4">
              <div>
                <span className="text-[10px] text-secondary uppercase font-bold block">OFFICIAL IEC 62446-3 AUDIT REPORT</span>
                <h2 className="text-xl font-bold text-primary font-headline-lg mt-0.5">
                  Autonomous Aerial Radiometric & Optical Inspection Dossier
                </h2>
                <span className="text-secondary text-xs font-sans">Asset: <strong>{farm?.name || "Bhadla Mega Solar Park - Sector 4"}</strong></span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-secondary uppercase block font-bold">REPORT ID:</span>
                <strong className="text-primary text-sm font-bold">REP-DRONE-2026-08</strong>
                <span className="text-[#027a48] text-[10px] font-bold block">✓ VERIFIED LEVEL-III</span>
              </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-surface p-4 border border-border-strong font-sans text-xs">
              <div><span className="text-secondary uppercase text-[10px] block font-bold font-mono-data">Modules Scanned:</span><strong className="font-mono-data text-primary text-sm">1,200 Panels</strong></div>
              <div><span className="text-secondary uppercase text-[10px] block font-bold font-mono-data">Health Score:</span><strong className="font-mono-data text-[#027a48] text-sm">97 / 100</strong></div>
              <div><span className="text-secondary uppercase text-[10px] block font-bold font-mono-data">Anomalies Detected:</span><strong className="font-mono-data text-critical text-sm">4 Defective Modules</strong></div>
              <div><span className="text-secondary uppercase text-[10px] block font-bold font-mono-data">Revenue Protected:</span><strong className="font-mono-data text-primary text-sm">₹1,48,900 / yr</strong></div>
            </div>

            {/* Auditor Signature */}
            <div className="p-4 border border-border-subtle bg-white flex justify-between items-center text-xs font-sans">
              <div>
                <span className="text-secondary text-[10px] uppercase block font-bold font-mono-data">CERTIFIED LEAD THERMOGRAPHER:</span>
                <strong className="text-primary text-sm font-mono-data">Capt. A. Nair (Badge #8492)</strong>
                <span className="text-secondary block text-[11px]">Level-III Certified Aerial Thermographer · Digital Signature Applied</span>
              </div>
              <span className="text-[#027a48] font-bold font-mono-data text-xs">✓ DIGITALLY SIGNED</span>
            </div>

            {/* 1-Click Forward to Client */}
            {!reportSubmitted ? (
              <button
                onClick={handleForwardToClient}
                disabled={isSubmittingReport}
                className="w-full bg-primary text-white font-bold py-4 px-6 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs"
              >
                <span>{isSubmittingReport ? "TRANSMITTING TO CLIENT PORTAL..." : "FORWARD REPORT TO CLIENT FOR APPROVAL →"}</span>
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <div className="bg-[#ecfdf3] border-2 border-[#027a48] p-5 space-y-3 text-center">
                <div className="flex items-center justify-center gap-2 text-[#027a48] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>✓ REPORT SUCCESSFULLY TRANSMITTED TO CLIENT PORTAL</span>
                </div>
                <p className="text-secondary text-xs font-sans">
                  The Asset Owner has been notified. The work orders and repair budgets are now pending client review and 1-click authorization.
                </p>
                <button
                  onClick={() => onNavigateTab("client-portal")}
                  className="bg-[#027a48] text-white font-bold py-2.5 px-6 uppercase text-xs tracking-wider hover:bg-white hover:text-[#027a48] border border-[#027a48] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>SWITCH TO CLIENT APPROVAL PORTAL →</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
"""

with open(PORTAL_FILE, "a", encoding="utf-8") as f:
    f.write(p2)
print("Completed FieldInspectorPortal.jsx with full 5-stage unified drone mission flow!")
