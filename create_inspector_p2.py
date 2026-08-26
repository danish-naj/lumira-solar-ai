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
          id: missionMode === "verification" ? "QA-VERIF-2026-08" : "REP-DRONE-2026-08",
          title: missionMode === "verification" ? "Official Post-Repair QA Thermal Normalization Certificate" : "Comprehensive Drone Radiometric IR & Optical Inspection Audit",
          date: "26 Aug 2026",
          source: "Drone Orthomosaic (DJI M300 RTK)",
          farm_id: farm?.id || "bhadla",
          farm_name: farm?.name || "Bhadla Mega Solar Park - Sector 4",
          auditor: "Capt. A. Nair (Level-III Thermographer #8492)",
          modules_scanned: missionMode === "verification" ? 2 : 1200,
          defects_count: missionMode === "verification" ? 0 : 4,
          health_score: 98,
          status: missionMode === "verification" ? "Verified & Closed" : "Pending Client Approval",
          repaired_modules: repairedModulesQueue
        });
      }
    }, 1000);
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* ========================================================================= */}
      {/* 1. DEEP PLANT INFRASTRUCTURE & SCADA OVERVIEW HEADER                       */}
      {/* ========================================================================= */}
      <div className="border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-3 gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  FIELD INSPECTION & QA VERIFICATION HUB
                </span>
                <span className="text-xs font-bold text-primary font-mono-data">
                  {farm?.name || "Bhadla Mega Solar Park - Sector 4"} (50.0 MWp DC)
                </span>
              </div>
              <p className="text-[11px] text-secondary font-sans mt-0.5">
                Phalodi District, Rajasthan · 240 Acres · SECI 25-Year PPA @ ₹2.44/kWh ($0.029) · 220kV RVPNL Substation Interconnect
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono-data text-xs shrink-0">
            <div className="bg-surface px-3 py-1.5 border border-border-strong text-right">
              <span className="text-[9px] text-secondary block uppercase font-bold">PLANT HEALTH</span>
              <strong className="text-[#027a48] text-sm block">97 / 100</strong>
            </div>
            <div className="bg-surface px-3 py-1.5 border border-border-strong text-right">
              <span className="text-[9px] text-secondary block uppercase font-bold">SOLAR GHI</span>
              <strong className="text-primary text-sm block">942 W/m²</strong>
            </div>
          </div>
        </div>

        {/* Deep Engineering Specs Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface p-3.5 border border-border-subtle font-mono-data text-xs">
          <div><span className="text-[10px] text-secondary font-sans uppercase block">Array Architecture:</span><strong className="text-primary">92,592 Modules (540 Wp)</strong></div>
          <div><span className="text-[10px] text-secondary font-sans uppercase block">Tracking System:</span><strong className="text-primary">NEXTracker Horizon (±60°)</strong></div>
          <div><span className="text-[10px] text-secondary font-sans uppercase block">Central Inverters:</span><strong className="text-primary">6x Sungrow SG3125HV</strong></div>
          <div><span className="text-[10px] text-secondary font-sans uppercase block">DC Combiners:</span><strong className="text-primary">48 Smart DC Combiners</strong></div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. AUTOMATIC MISSION INTENT DETECTION & MODE SELECTOR                      */}
      {/* ========================================================================= */}
      <div className="bg-surface border-2 border-primary p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-data text-xs shadow-xs">
        <div>
          <span className="text-[10px] text-secondary uppercase font-bold block">INTELLIGENT MISSION MODE:</span>
          <strong className="text-sm text-primary block mt-0.5">
            {missionMode === "verification" ? "🎯 TARGETED POST-REPAIR QA VERIFICATION (2 REPAIRED MODULES PENDING)" : "🔍 FULL PLANT PERIODIC INSPECTION (1,200 MODULE SWEEP)"}
          </strong>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMissionMode("verification");
              setCurrentStage(1);
              setScanProgress(0);
            }}
            className={`px-3 py-2 font-bold uppercase transition-all cursor-pointer border flex items-center gap-1.5 ${
              missionMode === "verification" ? "bg-[#027a48] text-white border-[#027a48] shadow-xs" : "bg-white text-secondary border-border-strong hover:border-primary"
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Targeted Post-Repair QA</span>
          </button>

          <button
            onClick={() => {
              setMissionMode("inspection");
              setCurrentStage(1);
              setScanProgress(0);
            }}
            className={`px-3 py-2 font-bold uppercase transition-all cursor-pointer border flex items-center gap-1.5 ${
              missionMode === "inspection" ? "bg-primary text-white border-primary shadow-xs" : "bg-white text-secondary border-border-strong hover:border-primary"
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Full Plant Inspection</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. STAGES VIEWPORT                                                        */}
      {/* ========================================================================= */}

      {/* --- STAGE 1: TARGET SELECTION & DOCK PRE-FLIGHT --- */}
      {currentStage === 1 && (
        <div className="space-y-4 font-mono-data text-xs">
          {missionMode === "verification" ? (
            /* Targeted Post-Repair Queue Box */
            <div className="border-2 border-primary bg-white p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-start border-b border-border-subtle pb-3">
                <div>
                  <span className="text-[10px] text-secondary font-bold uppercase block">POST-REPAIR QA WORK ORDER QUEUE</span>
                  <strong className="text-base text-primary font-headline-md block mt-0.5">
                    Targeted Modules Awaiting Level-III Inspector Sign-Off
                  </strong>
                  <p className="text-secondary text-xs font-sans mt-0.5">
                    Drone will fly direct micro-route straight to repaired coordinates. No need to survey the entire 240 acres!
                  </p>
                </div>
                <span className="bg-[#fffaeb] text-warning border border-warning px-2.5 py-1 text-xs font-bold uppercase">
                  2 REPAIRED ITEMS PENDING
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {repairedModulesQueue.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedRepairedIdx(idx)}
                    className={`p-4 border transition-all cursor-pointer bg-surface hover:bg-white ${
                      selectedRepairedIdx === idx ? "border-primary bg-[#f6fef9] ring-1 ring-primary shadow-xs" : "border-border-subtle hover:border-primary"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <strong className="text-primary text-sm font-bold">#{item.module_id} ({item.inverter})</strong>
                      <span className="text-secondary text-[10px]">{item.row}</span>
                    </div>
                    <span className="text-xs text-primary font-sans font-medium block mb-2">{item.repair_action}</span>
                    <div className="bg-white p-2 border border-border-subtle space-y-1 text-[11px] font-sans">
                      <div className="flex justify-between"><span className="text-secondary">Repaired By:</span> <strong className="font-mono-data text-primary">{item.repaired_by}</strong></div>
                      <div className="flex justify-between"><span className="text-secondary">Pre-Repair Delta:</span> <strong className="font-mono-data text-critical">{item.pre_repair_deltaT}</strong></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-secondary text-xs font-sans">Target location locked: {repairedModulesQueue[selectedRepairedIdx]?.row}. Ready for micro-flight dispatch.</span>
                <button
                  onClick={() => setCurrentStage(2)}
                  className="bg-[#027a48] text-white font-bold py-3 px-6 uppercase tracking-wider text-xs border border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>PROCEED TO TARGETED SPOT ROUTE →</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Full Periodic Inspection Modality Box */
            <div className="border-2 border-primary bg-white p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-border-subtle pb-3">
                <div>
                  <strong className="text-sm font-bold text-primary block">FULL PLANT PERIODIC BASELINE INSPECTION</strong>
                  <span className="text-secondary text-[11px] font-sans">Scanning all 20 rows (1,200 Modules) for new thermal hotspots and microcracks</span>
                </div>
                <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold uppercase">
                  DOCK ALPHA READY
                </span>
              </div>
              <button
                onClick={() => setCurrentStage(2)}
                className="bg-primary text-white font-bold py-3 px-6 uppercase tracking-wider text-xs border border-primary hover:bg-white hover:text-primary transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>PROCEED TO 12-WAYPOINT FULL SWEEP PLANNER →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- STAGE 2: FLIGHT PLANNER (TARGETED SPOT VS FULL SWEEP) --- */}
      {currentStage === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
          {/* Waypoint Canvas */}
          <div className="lg:col-span-7 border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-primary" />
                <span>{missionMode === "verification" ? "DIRECT TARGETED MICRO-ROUTE TO REPAIRED PANELS" : "12-WAYPOINT FULL SWEEP TRAJECTORY"}</span>
              </strong>
              <span className="text-[10px] text-secondary">
                {missionMode === "verification" ? "Spot Flight Time: 2.5 mins" : "Full Sweep: 18.4 mins"}
              </span>
            </div>

            <div className="relative border border-border-strong bg-[#0f172a] h-72 rounded-none overflow-hidden p-2 flex items-center justify-center">
              <svg viewBox="0 0 400 240" className="w-full h-full">
                {[50, 80, 110, 140, 170, 200].map((y, idx) => (
                  <g key={idx}>
                    <rect x="40" y={y - 8} width="320" height="16" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                    <text x="365" y={y + 3} fill="#64748b" fontSize="7" fontFamily="monospace">R{idx * 2 + 1}-{idx * 2 + 2}</text>
                  </g>
                ))}

                {missionMode === "verification" ? (
                  /* Direct Line to Row 12 and Row 4 */
                  <>
                    <line x1="50" y1="220" x2="260" y2="200" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="4,4" />
                    <circle cx="260" cy="200" r="12" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" className="animate-ping" />
                    <circle cx="260" cy="200" r="6" fill="#22c55e" />
                    <text x="275" y="203" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">Target: #R12-C37</text>
                  </>
                ) : (
                  /* Full 12-Waypoint Lawnmower Sweep */
                  <>
                    <path
                      d="M 50 50 L 350 50 L 350 80 L 50 80 L 50 110 L 350 110 L 350 140 L 50 140 L 50 170 L 350 170 L 350 200 L 50 200"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                    {flightWaypoints.map((wp) => (
                      <circle key={wp.id} cx={wp.x} cy={wp.y} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                    ))}
                  </>
                )}
              </svg>
            </div>

            <div className="bg-surface p-3 border border-border-subtle text-[11px] flex justify-between">
              <span>Launch Origin: <strong className="text-primary">Dock Alpha Central Pad</strong></span>
              <span>Target: <strong className="text-primary">{missionMode === "verification" ? "#R12-C37 Spot Verification" : "Full Sector 4 (1,200 Modules)"}</strong></span>
            </div>
          </div>

          {/* Launch Controls */}
          <div className="lg:col-span-5 border-2 border-primary bg-white p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-2">
                MISSION FLIGHT SPECIFICATIONS:
              </strong>
              <div className="bg-surface p-4 border border-border-subtle space-y-2 font-sans text-xs">
                <div className="flex justify-between"><span>Mission Type:</span> <strong className="font-mono-data text-primary">{missionMode === "verification" ? "Targeted Post-Repair QA" : "Full Periodic Survey"}</strong></div>
                <div className="flex justify-between"><span>Estimated Flight Time:</span> <strong className="font-mono-data text-[#027a48]">{missionMode === "verification" ? "2.5 minutes (Rapid)" : "18.4 minutes"}</strong></div>
                <div className="flex justify-between"><span>Battery Draw:</span> <strong className="font-mono-data text-[#027a48]">{missionMode === "verification" ? "8% (92% Reserve)" : "36% (64% Reserve)"}</strong></div>
              </div>
            </div>

            <button
              onClick={handleLaunchDrone}
              className="w-full bg-[#027a48] text-white font-bold py-4 px-4 border-2 border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs"
            >
              <span>{missionMode === "verification" ? "DISPATCH DRONE FOR TARGETED SPOT QA →" : "DISPATCH & LAUNCH FULL SWEEP →"}</span>
              <Plane className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* --- STAGE 3: LIVE IN-FLIGHT HUD & SCAN PROGRESS --- */}
      {currentStage === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
          <div className="lg:col-span-6 border-2 border-primary bg-white p-5 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-critical inline-block animate-ping" />
                <span>{missionMode === "verification" ? "HOVERING OVER REPAIRED MODULE #R12-C37" : "SWEEP IN PROGRESS: WP-" + currentWaypoint}</span>
              </strong>
              <span className="bg-critical text-white px-2 py-0.5 text-[9px] font-bold uppercase">● AIRBORNE</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Data Acquisition Progress:</span>
                <strong className="text-primary font-bold">{scanProgress}% Completed</strong>
              </div>
              <div className="w-full bg-surface border border-border-strong h-3 overflow-hidden">
                <div style={{ width: `${scanProgress}%` }} className="bg-[#027a48] h-full transition-all duration-300" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-2">
              ZENMUSE H20T RADIOMETRIC THERMAL STREAM
            </strong>
            <div className="relative border border-border-strong bg-black h-52 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
                alt="Camera Feed"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[9px] text-[#22c55e]">
                SPOT TEMP: 41.4°C · ΔT: +0.2°C (NORMALIZED)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- STAGE 4: AI POST-REPAIR THERMAL NORMALIZATION QA / DIAGNOSTICS --- */}
      {currentStage === 4 && (
        <div className="space-y-6 font-mono-data text-xs">
          {missionMode === "verification" ? (
            /* Post-Repair QA Normalization Result */
            <div className="border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
              <div className="flex justify-between items-start border-b border-border-subtle pb-3">
                <div>
                  <span className="text-[10px] text-secondary font-bold uppercase block">AI QA POST-REPAIR VERIFICATION</span>
                  <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                    Targeted Thermal Normalization Audit (#R12-C37 & #R04-C18)
                  </h2>
                  <span className="text-secondary text-xs font-sans">
                    Comparing pre-repair infrared thermogram against post-repair live radiometry.
                  </span>
                </div>
                <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-3 py-1 text-xs font-bold uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>✓ REPAIR VERIFIED & NORMALIZED</span>
                </span>
              </div>

              {/* Before vs After Side-by-Side Normalization Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before Repair */}
                <div className="bg-[#fef3f2] p-4 border border-critical space-y-2 font-sans">
                  <div className="flex justify-between items-center text-xs font-bold text-critical font-mono-data">
                    <span>BEFORE REPAIR (INSPECTION)</span>
                    <span>ΔT: +18.4°C</span>
                  </div>
                  <p className="text-xs text-critical">
                    Severe reverse-bias bypass diode thermal runaway ($59.8^\circ\text{C}$). Critical fire risk and $-34\%$ power drop.
                  </p>
                </div>

                {/* After Repair */}
                <div className="bg-[#f6fef9] p-4 border border-[#027a48] space-y-2 font-sans">
                  <div className="flex justify-between items-center text-xs font-bold text-[#027a48] font-mono-data">
                    <span>AFTER REPAIR (LIVE QA SCAN)</span>
                    <span>ΔT: +0.2°C (OPTIMAL)</span>
                  </div>
                  <p className="text-xs text-[#027a48]">
                    Diode replaced and torque verified (1.8 Nm). Thermal gradient completely normalized ($\Delta T &lt; 0.5^\circ\text{C}$). 100% power restored.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentStage(5)}
                className="w-full bg-primary text-white font-bold py-3.5 px-4 border border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer"
              >
                <span>PROCEED TO OFFICIAL QA CERTIFICATE & CLIENT SIGN-OFF →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Full Inspection Anomalies View */
            <div className="border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
              <strong className="text-primary text-xs uppercase block border-b border-border-subtle pb-2">
                AI VISION DETECTIONS (4 ANOMALIES DETECTED)
              </strong>
              <button
                onClick={() => setCurrentStage(5)}
                className="w-full bg-primary text-white font-bold py-3 px-4 border border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer"
              >
                <span>COMPILE & FORWARD AUDIT REPORT →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- STAGE 5: CERTIFIED QA CERTIFICATE & CLIENT FORWARDING --- */}
      {currentStage === 5 && (
        <div className="border-2 border-primary bg-white p-8 space-y-6 shadow-xs font-mono-data text-xs">
          <div className="flex justify-between items-start border-b-2 border-primary pb-4">
            <div>
              <span className="text-[10px] text-secondary uppercase font-bold block">
                {missionMode === "verification" ? "OFFICIAL IEC 62446-3 POST-REPAIR QA CERTIFICATE" : "OFFICIAL IEC 62446-3 AUDIT REPORT"}
              </span>
              <h2 className="text-xl font-bold text-primary font-headline-lg mt-0.5">
                {missionMode === "verification" ? "Post-Repair Thermal Normalization & Defect Closure Dossier" : "Autonomous Aerial Radiometric & Optical Inspection Dossier"}
              </h2>
              <span className="text-secondary text-xs font-sans">Asset: <strong>{farm?.name || "Bhadla Mega Solar Park - Sector 4"}</strong></span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-secondary uppercase block font-bold">REPORT ID:</span>
              <strong className="text-primary text-sm font-bold">{missionMode === "verification" ? "QA-VERIF-2026-08" : "REP-DRONE-2026-08"}</strong>
              <span className="text-[#027a48] text-[10px] font-bold block">✓ VERIFIED LEVEL-III</span>
            </div>
          </div>

          {/* Sign-off */}
          <div className="p-4 border border-border-subtle bg-surface flex justify-between items-center text-xs font-sans">
            <div>
              <span className="text-secondary text-[10px] uppercase block font-bold font-mono-data">CERTIFIED LEAD THERMOGRAPHER:</span>
              <strong className="text-primary text-sm font-mono-data">Capt. A. Nair (Badge #8492)</strong>
              <span className="text-secondary block text-[11px]">Level-III Certified Aerial Thermographer · Digital Signature Applied</span>
            </div>
            <span className="text-[#027a48] font-bold font-mono-data text-xs">✓ DIGITALLY SIGNED</span>
          </div>

          {!reportSubmitted ? (
            <button
              onClick={handleForwardToClient}
              disabled={isSubmittingReport}
              className="w-full bg-[#027a48] text-white font-bold py-4 px-6 border-2 border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs"
            >
              <span>{isSubmittingReport ? "TRANSMITTING TO CLIENT PORTAL..." : "TRANSMIT VERIFIED QA REPORT TO CLIENT PORTAL →"}</span>
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <div className="bg-[#ecfdf3] border-2 border-[#027a48] p-5 space-y-3 text-center">
              <div className="flex items-center justify-center gap-2 text-[#027a48] font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>✓ VERIFIED QA REPORT SUCCESSFULLY TRANSMITTED TO CLIENT PORTAL</span>
              </div>
              <p className="text-secondary text-xs font-sans">
                The Asset Owner and O&M manager have been updated. The repaired work orders are officially verified and closed.
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
      )}
    </div>
  );
}
"""

with open(PORTAL_FILE, "a", encoding="utf-8") as f:
    f.write(p2)
print("Completed FieldInspectorPortal.jsx with deep plant overview and dual-mode mission intelligence!")
