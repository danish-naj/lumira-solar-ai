import os

LABS_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\BreakthroughLabs\BreakthroughLabs.jsx"

chunk2 = """
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
"""

with open(LABS_FILE, "a", encoding="utf-8") as f:
    f.write(chunk2)
print("Appended Lab Chunk 2.")
