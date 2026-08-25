import os

PLANNER_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\FlightPlanner\DroneFlightPlanner.jsx"

p2 = """
  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Plane className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              AUTONOMOUS AERIAL SURVEY MISSION PLANNER
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Hardware: DJI Matrice 300 RTK + Zenmuse H20T
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Autonomous Drone Flight Path & Swarm Orchestrator
          </h1>
        </div>

        {/* Flight Simulation Controls */}
        <div className="flex items-center gap-2">
          {!isSimulating ? (
            <button
              onClick={() => setIsSimulating(true)}
              className="bg-primary text-white font-mono-data text-xs font-bold py-2.5 px-4 uppercase tracking-wider border-2 border-primary hover:bg-white hover:text-primary transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Play className="w-4 h-4" />
              <span>START AUTONOMOUS FLIGHT</span>
            </button>
          ) : (
            <button
              onClick={() => setIsSimulating(false)}
              className="bg-warning text-primary font-mono-data text-xs font-bold py-2.5 px-4 uppercase tracking-wider border-2 border-primary hover:bg-white transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Pause className="w-4 h-4" />
              <span>PAUSE SIMULATION</span>
            </button>
          )}

          <button
            onClick={() => {
              setIsSimulating(false);
              setFlightProgress(0);
              setCurrentWaypoint(1);
            }}
            className="p-2.5 bg-white border border-border-strong text-secondary hover:text-primary cursor-pointer hover:bg-surface"
            title="Reset Mission"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Waypoint Grid & Physics Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-4 font-mono-data text-xs">
          {/* Interactive SVG Mission Waypoint Map */}
          <div className="border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-primary" />
                <span>SECTOR 4 LAWNMOWER FLIGHT TRAJECTORY (12 WAYPOINTS)</span>
              </strong>
              <span className="text-[10px] text-secondary">
                Progress: <strong className="text-primary">{flightProgress}%</strong> ({currentWaypoint}/12 WP)
              </span>
            </div>

            {/* SVG Flight Path Viewport */}
            <div className="relative border border-border-strong bg-[#0f172a] h-72 rounded-none overflow-hidden p-2">
              <svg viewBox="0 0 500 240" className="w-full h-full">
                {/* Solar Table Array Background Rectangles */}
                <rect x="30" y="25" width="440" height="30" fill="#1e293b" stroke="#334155" />
                <rect x="30" y="75" width="440" height="30" fill="#1e293b" stroke="#334155" />
                <rect x="30" y="125" width="440" height="30" fill="#1e293b" stroke="#334155" />
                <rect x="30" y="175" width="440" height="30" fill="#1e293b" stroke="#334155" />

                {/* Waypoint Connecting Trajectory Lines */}
                <polyline
                  points="50,40 200,40 350,40 450,40 450,90 300,90 150,90 50,90 50,140 250,140 450,140 450,190"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />

                {/* Waypoint Dots */}
                {waypoints.map((wp) => {
                  const isCurrent = currentWaypoint === wp.id;
                  const isPassed = currentWaypoint > wp.id;
                  return (
                    <g key={wp.id}>
                      <circle
                        cx={wp.x}
                        cy={wp.y}
                        r={isCurrent ? 6 : 4}
                        fill={isCurrent ? "#ef4444" : isPassed ? "#22c55e" : "#94a3b8"}
                        className={isCurrent ? "animate-ping" : ""}
                      />
                      <circle
                        cx={wp.x}
                        cy={wp.y}
                        r={isCurrent ? 5 : 3.5}
                        fill={isCurrent ? "#ef4444" : isPassed ? "#22c55e" : "#94a3b8"}
                      />
                      <text x={wp.x + 6} y={wp.y + 3} fill="#cbd5e1" fontSize="8" fontFamily="monospace">
                        WP{wp.id}
                      </text>
                    </g>
                  );
                })}

                {/* Animated Drone Position Indicator */}
                <g transform={`translate(${waypoints[Math.min(currentWaypoint - 1, 11)].x}, ${waypoints[Math.min(currentWaypoint - 1, 11)].y})`}>
                  <circle cx="0" cy="0" r="10" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-pulse" />
                  <circle cx="0" cy="0" r="3" fill="#38bdf8" />
                </g>
              </svg>

              {/* Real-Time Telemetry Overlay */}
              <div className="absolute bottom-2 left-2 bg-black/80 border border-border-strong px-2.5 py-1 text-[10px] text-white flex items-center gap-3 font-mono-data">
                <span>ALT: <strong>{droneAltitude}m</strong></span>
                <span>SPD: <strong>{droneSpeed}m/s</strong></span>
                <span>GIMBAL: <strong>-{gimbalPitch}°</strong></span>
                <span>RTK: <strong className="text-[#22c55e]">FIXED (±1cm)</strong></span>
              </div>
            </div>

            {/* Flight Parameter Controls */}
            <div className="grid grid-cols-3 gap-3 bg-surface p-3 border border-border-subtle text-xs">
              <div>
                <label className="text-[9px] font-bold text-secondary uppercase block mb-1">
                  ALTITUDE: {droneAltitude}M AGL
                </label>
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={droneAltitude}
                  onChange={(e) => setDroneAltitude(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-secondary uppercase block mb-1">
                  SPEED: {droneSpeed} M/S
                </label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="0.2"
                  value={droneSpeed}
                  onChange={(e) => setDroneSpeed(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-secondary uppercase block mb-1">
                  GIMBAL: -{gimbalPitch}° NADIR
                </label>
                <input
                  type="range"
                  min="45"
                  max="90"
                  value={gimbalPitch}
                  onChange={(e) => setGimbalPitch(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Mission Physics & Battery Estimator */}
          <div className="grid grid-cols-4 gap-2 bg-white p-4 border border-border-strong shadow-xs text-center">
            <div><span className="text-[10px] text-secondary uppercase block">Est. Flight Time</span><strong className="text-primary text-sm">18.4 Mins</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Battery Consumed</span><strong className="text-[#027a48] text-sm">64% (2x TB60)</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Spatial GSD</span><strong className="text-primary text-sm">0.5 cm/px</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">Modules Captured</span><strong className="text-primary text-sm">1,200 Panels</strong></div>
          </div>
        </div>

        {/* Right Column: Live Drone Pilot HUD & Autonomous Swarm Dispatch (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 font-mono-data text-xs">
          {/* Live Drone Pilot HUD & IR Camera Feed */}
          <div className="border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-primary" />
                <span>LIVE DRONE PILOT HUD (ZENMUSE H20T FEED)</span>
              </strong>
              <span className="bg-critical text-white text-[8px] font-bold px-1.5 py-0.2 animate-pulse uppercase">
                ● LIVE RADIOMETRIC
              </span>
            </div>

            {/* HUD Viewport */}
            <div className="relative border-2 border-primary h-56 bg-black overflow-hidden flex items-center justify-center">
              <img
                src={cameraMode === "thermal" ? "https://images.unsplash.com/photo-1508873696983-2df570464753?auto=format&fit=crop&w=800&q=80" : "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"}
                alt="Drone Feed"
                className="w-full h-full object-cover opacity-85"
              />

              {/* Artificial Horizon Pitch Ladder Lines */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                <div className="w-32 border-t-2 border-[#22c55e] opacity-80" />
                <div className="w-20 border-t border-[#22c55e] my-3 opacity-60" />
                <div className="w-28 border-t border-[#22c55e] opacity-60" />
              </div>

              {/* Thermal Hotspot Box Overlay */}
              <div className="absolute top-[30%] left-[40%] border-2 border-critical bg-critical/20 p-1 flex flex-col justify-between w-24 h-16 animate-pulse">
                <span className="bg-critical text-white text-[8px] font-bold px-1 self-start">HOTSPOT +18.4°C</span>
                <span className="bg-black text-white text-[8px] font-bold px-1 self-end">#R12-C37</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCameraMode("thermal")}
                className={`flex-1 py-1.5 font-bold text-[10px] border transition-all cursor-pointer ${
                  cameraMode === "thermal" ? "bg-primary text-white border-primary" : "bg-surface text-secondary border-border-subtle hover:bg-white"
                }`}
              >
                RADIOMETRIC THERMAL IR
              </button>
              <button
                onClick={() => setCameraMode("rgb")}
                className={`flex-1 py-1.5 font-bold text-[10px] border transition-all cursor-pointer ${
                  cameraMode === "rgb" ? "bg-primary text-white border-primary" : "bg-surface text-secondary border-border-subtle hover:bg-white"
                }`}
              >
                4K OPTICAL RGB
              </button>
            </div>
          </div>

          {/* GROUNDBREAKING: Autonomous Drone + Rover Swarm Orchestrator */}
          <div className="border-2 border-[#027a48] bg-[#f6fef9] p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#abefc6] pb-2">
              <strong className="text-[#027a48] uppercase text-xs flex items-center gap-1.5">
                <Car className="w-4 h-4 text-[#027a48]" />
                <span>AUTONOMOUS SWARM FLEET COORDINATION (DRONE ➔ ROVER)</span>
              </strong>
            </div>

            <p className="font-sans text-xs text-primary leading-relaxed">
              When aerial drone thermography detects a heavy desert sand encrustation cluster on <strong>Sector 4 Row 15</strong>, Lumira AI computes the optimal shortest route and coordinates with the autonomous ground crawler robot for instant deployment.
            </p>

            {swarmRoverDispatched ? (
              <div className="bg-white border-2 border-[#027a48] p-3 text-center text-xs font-bold font-mono-data text-[#027a48] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#027a48]" />
                <span>ROVER SWARM ALPHA DISPATCHED · TRACK ROUTE OPTIMIZED (ETA: 4 MINS)</span>
              </div>
            ) : (
              <button
                onClick={handleDispatchSwarm}
                className="w-full bg-[#027a48] text-white font-bold py-3 px-4 border-2 border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all uppercase text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-warning" />
                <span>COORDINATE & DISPATCH ROVER SWARM TO ROW 15</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(PLANNER_FILE, "a", encoding="utf-8") as f:
    f.write(p2)

print("Completed full DroneFlightPlanner.jsx with Swarm Dispatch Orchestration!")
