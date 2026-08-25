import os

LABS_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\BreakthroughLabs\BreakthroughLabs.jsx"

chunk3 = """
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
"""

with open(LABS_FILE, "a", encoding="utf-8") as f:
    f.write(chunk3)
print("Appended Lab Chunk 3 and completed BreakthroughLabs.jsx!")
