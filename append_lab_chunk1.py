import os

LABS_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\BreakthroughLabs\BreakthroughLabs.jsx"

chunk1 = """
  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-warning" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              LUMIRA QUANTUM LABS · 9 WORLD-FIRST INNOVATIONS
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Next-Gen Photovoltaic Physics, Aerospace & Grid AI
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Breakthrough Innovation Labs & Frontier Capabilities
          </h1>
        </div>

        <div className="border-2 border-primary bg-white px-3 py-1.5 font-mono-data text-xs shadow-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block animate-pulse" />
          <span className="font-bold text-primary">9 ACTIVE RESEARCH ENGINES</span>
        </div>
      </div>

      {/* 2. Innovation Labs Tab Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 font-mono-data text-xs">
        {labsMenu.map((lab) => {
          const Icon = lab.icon;
          const isSelected = activeLab === lab.id;
          return (
            <button
              key={lab.id}
              onClick={() => setActiveLab(lab.id)}
              className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between h-24 ${
                isSelected 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <div className="flex justify-between items-start">
                <Icon className={`w-4 h-4 ${isSelected ? "text-warning" : "text-primary"}`} />
                <span className={`text-[8px] uppercase font-bold px-1 py-0.2 ${isSelected ? "bg-white/20 text-white" : "bg-surface text-secondary"}`}>
                  {lab.tag.split(" ")[0]}
                </span>
              </div>
              <strong className="text-[11px] leading-tight block">{lab.name}</strong>
            </button>
          );
        })}
      </div>

      {/* 3. Interactive Lab Content Area */}
      <div className="border-2 border-primary bg-white p-6 shadow-xs font-mono-data text-xs">
        {/* LAB 1: BIFACIAL ALBEDO REFLECTION */}
        {activeLab === "bifacial" && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">INNOVATION LAB #1</span>
                <h2 className="text-lg font-bold text-primary font-headline-md mt-0.5">
                  Bifacial Albedo Ground Reflection & Rear-Side Heat Engine
                </h2>
                <p className="text-secondary text-xs font-sans mt-0.5">
                  Simulates dual-sided GHI absorption and calculates rear-side energy yield loss caused by ground gravel darkening.
                </p>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold">
                BIFACIAL GAIN: +18.4%
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="relative border border-border-strong bg-[#0f172a] h-60 p-4 rounded-none text-white">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <circle cx="200" cy="25" r="16" fill="#facc15" />
                    <line x1="200" y1="45" x2="200" y2="70" stroke="#facc15" strokeWidth="2" strokeDasharray="3,3" />
                    <line x1="180" y1="40" x2="140" y2="85" stroke="#facc15" strokeWidth="2" />
                    <line x1="220" y1="40" x2="260" y2="85" stroke="#facc15" strokeWidth="2" />
                    <line x1="120" y1="100" x2="280" y2="70" stroke="#38bdf8" strokeWidth="8" />
                    <text x="160" y="80" fill="#ffffff" fontSize="9" fontFamily="monospace">FRONT: {frontGHI} W/m²</text>
                    <rect x="40" y="160" width="320" height="20" fill="#334155" stroke="#64748b" />
                    <text x="120" y="174" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Ground Albedo: {(albedoValue * 100).toFixed(0)}% Reflectance</text>
                    <line x1="100" y1="160" x2="160" y2="105" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
                    <line x1="280" y1="160" x2="230" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="160" y="130" fill="#38bdf8" fontSize="9" fontFamily="monospace">REAR: {(frontGHI * albedoValue).toFixed(0)} W/m²</text>
                  </svg>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase block">
                    GROUND GRAVEL ALBEDO COEFFICIENT: {(albedoValue * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.15"
                    max="0.40"
                    step="0.01"
                    value={albedoValue}
                    onChange={(e) => setAlbedoValue(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div className="bg-surface p-4 border border-border-subtle space-y-2">
                  <strong className="text-primary font-mono-data text-xs uppercase block border-b border-border-subtle pb-1">
                    DUAL-SIDED POWER GENERATION SUMMARY:
                  </strong>
                  <div className="space-y-1 text-secondary">
                    <div className="flex justify-between"><span>Front-Side Yield (Direct GHI):</span> <strong className="font-mono-data text-primary">210.0 MWh / day</strong></div>
                    <div className="flex justify-between"><span>Rear-Side Yield (Albedo Reflection):</span> <strong className="font-mono-data text-[#027a48]">38.5 MWh / day (+18.4%)</strong></div>
                    <div className="flex justify-between"><span>Total Bifacial Yield:</span> <strong className="font-mono-data text-primary font-bold">248.5 MWh / day</strong></div>
                    <div className="flex justify-between"><span>Annual Albedo Contribution:</span> <strong className="font-mono-data text-[#027a48]">₹34.2 Lakhs / yr ($41K)</strong></div>
                  </div>
                </div>

                <div className="p-3 bg-[#f6fef9] border border-[#abefc6] text-[#027a48] font-medium">
                  ✓ Albedo Soil Scanner recommends deploying white limestone gravel top-dressing on Row 12 to boost rear reflectance by +12%.
                </div>
              </div>
            </div>
          </div>
        )}
"""

with open(LABS_FILE, "a", encoding="utf-8") as f:
    f.write(chunk1)
print("Appended Lab Chunk 1.")
