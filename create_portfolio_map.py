import os

PORT_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Portfolio\PortfolioFleetMap.jsx"

p1 = """import React, { useState } from "react";
import { 
  Globe, 
  MapPin, 
  Building2, 
  TrendingUp, 
  Zap, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  DollarSign, 
  Layers
} from "lucide-react";

export default function PortfolioFleetMap({ onSelectFarmSite }) {
  const [selectedSiteId, setSelectedSiteId] = useState("bhadla");

  const solarParks = [
    {
      id: "bhadla",
      name: "Bhadla Mega Solar Park - Sector 4",
      location: "Phalodi District, Rajasthan",
      coords: "27.5410° N, 71.9205° E",
      capacity_mw: 50.0,
      generation_mwh: 248.5,
      health_score: 97,
      pr: "83.4%",
      cuf: "26.8%",
      tariff_inr: "₹2.44 / kWh",
      tariff_usd: "$0.029 / kWh",
      modules_count: 92592,
      active_tickets: 3,
      status: "Active (Sector 4)",
      color: "bg-[#027a48]"
    },
    {
      id: "pavagada",
      name: "Pavagada Solar Park - Block 12",
      location: "Tumkur District, Karnataka",
      coords: "14.2812° N, 77.2740° E",
      capacity_mw: 100.0,
      generation_mwh: 489.2,
      health_score: 94,
      pr: "81.8%",
      cuf: "25.4%",
      tariff_inr: "₹2.93 / kWh",
      tariff_usd: "$0.035 / kWh",
      modules_count: 185184,
      active_tickets: 6,
      status: "Optimal",
      color: "bg-[#027a48]"
    },
    {
      id: "rewa",
      name: "Rewa Ultra Mega Solar - Unit 2",
      location: "Gurh Tehsil, Madhya Pradesh",
      coords: "24.5362° N, 81.3037° E",
      capacity_mw: 75.0,
      generation_mwh: 362.1,
      health_score: 92,
      pr: "80.6%",
      cuf: "24.9%",
      tariff_inr: "₹3.30 / kWh",
      tariff_usd: "$0.039 / kWh",
      modules_count: 138888,
      active_tickets: 8,
      status: "Scheduled Cleaning",
      color: "bg-warning"
    },
    {
      id: "kurnool",
      name: "Kurnool Ultra Mega Solar - Phase 1",
      location: "Gani Village, Andhra Pradesh",
      coords: "15.6833° N, 78.2833° E",
      capacity_mw: 50.0,
      generation_mwh: 242.0,
      health_score: 96,
      pr: "82.9%",
      cuf: "26.2%",
      tariff_inr: "₹2.70 / kWh",
      tariff_usd: "$0.032 / kWh",
      modules_count: 92592,
      active_tickets: 4,
      status: "Optimal",
      color: "bg-[#027a48]"
    }
  ];

  const currentPark = solarParks.find(p => p.id === selectedSiteId) || solarParks[0];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              MULTI-SITE GLOBAL ASSET PORTFOLIO
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Total Fleet Capacity: 275.0 MWp DC Across India
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Global Portfolio Map & Regional Fleet Benchmark Cockpit
          </h1>
        </div>

        {/* Total Generation KPI */}
        <div className="border-2 border-primary bg-white px-4 py-2 text-right font-mono-data text-xs shadow-xs">
          <span className="text-[10px] text-secondary uppercase font-bold block">PORTFOLIO DAILY GENERATION</span>
          <strong className="text-xl font-bold text-primary block">1,341.8 MWh / day</strong>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
        {/* Left Column: Interactive Geospatial India Map & Park Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Geospatial Map SVG Canvas */}
          <div className="border-2 border-primary bg-white p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-2">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>GEOSPATIAL ASSET FLEET MAP</span>
              </strong>
              <span className="text-[10px] text-secondary">4 Utility-Scale Sites</span>
            </div>

            {/* India Subcontinent Map SVG with Interactive Nodes */}
            <div className="relative border border-border-strong bg-[#0f172a] h-72 rounded-none overflow-hidden p-2 flex items-center justify-center">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Schematic Outline */}
                <path
                  d="M 120 40 L 220 50 L 280 100 L 260 160 L 220 220 L 180 270 L 160 220 L 100 150 L 90 90 Z"
                  fill="#1e293b"
                  stroke="#334155"
                  strokeWidth="2"
                />

                {/* Bhadla (Rajasthan) */}
                <g 
                  onClick={() => setSelectedSiteId("bhadla")} 
                  className="cursor-pointer group"
                >
                  <circle cx="110" cy="95" r={selectedSiteId === "bhadla" ? 9 : 6} fill="#ef4444" className={selectedSiteId === "bhadla" ? "animate-ping" : ""} />
                  <circle cx="110" cy="95" r={selectedSiteId === "bhadla" ? 7 : 5} fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="122" y="98" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">Bhadla (50MW)</text>
                </g>

                {/* Rewa (MP) */}
                <g 
                  onClick={() => setSelectedSiteId("rewa")} 
                  className="cursor-pointer group"
                >
                  <circle cx="210" cy="120" r={selectedSiteId === "rewa" ? 9 : 6} fill="#f59e0b" className={selectedSiteId === "rewa" ? "animate-ping" : ""} />
                  <circle cx="210" cy="120" r={selectedSiteId === "rewa" ? 7 : 5} fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="222" y="123" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">Rewa (75MW)</text>
                </g>

                {/* Kurnool (AP) */}
                <g 
                  onClick={() => setSelectedSiteId("kurnool")} 
                  className="cursor-pointer group"
                >
                  <circle cx="190" cy="190" r={selectedSiteId === "kurnool" ? 9 : 6} fill="#22c55e" className={selectedSiteId === "kurnool" ? "animate-ping" : ""} />
                  <circle cx="190" cy="190" r={selectedSiteId === "kurnool" ? 7 : 5} fill="#22c55e" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="202" y="193" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">Kurnool (50MW)</text>
                </g>

                {/* Pavagada (Karnataka) */}
                <g 
                  onClick={() => setSelectedSiteId("pavagada")} 
                  className="cursor-pointer group"
                >
                  <circle cx="170" cy="220" r={selectedSiteId === "pavagada" ? 9 : 6} fill="#22c55e" className={selectedSiteId === "pavagada" ? "animate-ping" : ""} />
                  <circle cx="170" cy="220" r={selectedSiteId === "pavagada" ? 7 : 5} fill="#22c55e" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="182" y="223" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">Pavagada (100MW)</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Plant Selector Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {solarParks.map((park) => {
              const isSelected = selectedSiteId === park.id;
              return (
                <div
                  key={park.id}
                  onClick={() => setSelectedSiteId(park.id)}
                  className={`p-3.5 border transition-all cursor-pointer bg-white shadow-xs ${
                    isSelected ? "border-primary ring-1 ring-primary bg-[#f6fef9]" : "border-border-subtle hover:border-primary"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <strong className="text-primary text-xs font-bold">{park.name.split("-")[0]}</strong>
                    <span className="text-[#027a48] font-bold text-[10px]">{park.capacity_mw} MW</span>
                  </div>
                  <span className="text-[10px] text-secondary font-sans block mb-2">{park.location}</span>
                  <div className="flex justify-between items-center text-[10px] text-primary border-t border-border-subtle pt-1.5">
                    <span>Health: <strong>{park.health_score}/100</strong></span>
                    <span className="text-critical">Tickets: <strong>{park.active_tickets}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Plant Benchmarking & Regional Telemetry (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">ACTIVE SITE SELECTION</span>
                <strong className="text-base text-primary font-mono-data block mt-0.5">{currentPark.name}</strong>
                <span className="text-secondary text-[11px] font-sans">{currentPark.coords}</span>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2 py-0.5 text-[9px] font-bold uppercase">
                {currentPark.status}
              </span>
            </div>

            {/* Performance KPIs */}
            <div className="grid grid-cols-2 gap-3 bg-surface p-3 border border-border-subtle text-xs font-sans">
              <div><span className="text-secondary">Capacity:</span> <strong className="font-mono-data text-primary block">{currentPark.capacity_mw} MWp DC</strong></div>
              <div><span className="text-secondary">Daily Gen:</span> <strong className="font-mono-data text-primary block">{currentPark.generation_mwh} MWh/d</strong></div>
              <div><span className="text-secondary">Perf. Ratio (PR):</span> <strong className="font-mono-data text-[#027a48] block">{currentPark.pr}</strong></div>
              <div><span className="text-secondary">Cap. Util. (CUF):</span> <strong className="font-mono-data text-primary block">{currentPark.cuf}</strong></div>
            </div>

            {/* Tariff & Contract Offtake */}
            <div className="space-y-1 text-xs font-sans">
              <div className="flex justify-between"><span>PPA Offtake Tariff:</span> <strong className="font-mono-data text-primary">{currentPark.tariff_inr} ({currentPark.tariff_usd})</strong></div>
              <div className="flex justify-between"><span>Total Modules:</span> <strong className="font-mono-data text-primary">{currentPark.modules_count.toLocaleString()} Panels</strong></div>
              <div className="flex justify-between"><span>Active Maintenance:</span> <strong className="font-mono-data text-critical">{currentPark.active_tickets} Work Orders</strong></div>
            </div>

            {/* Switch Active Site Button */}
            <button
              onClick={() => onSelectFarmSite && onSelectFarmSite(currentPark)}
              className="w-full bg-primary text-white font-bold py-3.5 px-4 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs mt-2"
            >
              <span>LOAD {currentPark.name.split(" ")[0].toUpperCase()} DIGITAL TWIN →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(PORT_FILE, "w", encoding="utf-8") as f:
    f.write(p1)

print("Created PortfolioFleetMap.jsx")
