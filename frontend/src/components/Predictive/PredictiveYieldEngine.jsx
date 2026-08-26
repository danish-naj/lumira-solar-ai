import SolarFarm3DVisualizer from "../Twin3D/SolarFarm3DVisualizer";
import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Sun, 
  Wind, 
  Thermometer, 
  Layers, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Zap, 
  Clock, 
  ArrowRight, 
  Activity, 
  Sliders,
  Cloud
} from "lucide-react";

export default function PredictiveYieldEngine({ farm }) {
  const [cloudSpeed, setCloudSpeed] = useState(4.5); // m/s
  const [cloudCoverage, setCloudCoverage] = useState(30); // %
  const [cleaningDayThreshold, setCleaningDayThreshold] = useState(5);
  const [cloudOffset, setCloudOffset] = useState(0);

  // Next-7-Day Generation & Meteorological ML Forecast
  const sevenDayForecast = [
    { day: "Wed (Today)", date: "26 Aug", ghi: "942 W/m²", temp_max: "41.8°C", cloud: "10%", predicted_mwh: 248.5, revenue_inr: "₹14.91 L", revenue_usd: "$17.89K", status: "Optimal" },
    { day: "Thu", date: "27 Aug", ghi: "955 W/m²", temp_max: "42.5°C", cloud: "5%", predicted_mwh: 251.2, revenue_inr: "₹15.07 L", revenue_usd: "$18.08K", status: "Optimal" },
    { day: "Fri", date: "28 Aug", ghi: "910 W/m²", temp_max: "40.2°C", cloud: "25%", predicted_mwh: 239.8, revenue_inr: "₹14.38 L", revenue_usd: "$17.25K", status: "Scattered Clouds" },
    { day: "Sat", date: "29 Aug", ghi: "880 W/m²", temp_max: "39.0°C", cloud: "40%", predicted_mwh: 228.4, revenue_inr: "₹13.70 L", revenue_usd: "$16.44K", status: "Cloud Vectors" },
    { day: "Sun (Optimal Clean)", date: "30 Aug", ghi: "960 W/m²", temp_max: "43.0°C", cloud: "0%", predicted_mwh: 254.8, revenue_inr: "₹15.28 L", revenue_usd: "$18.34K", status: "High Solar Peak" },
    { day: "Mon", date: "31 Aug", ghi: "948 W/m²", temp_max: "42.1°C", cloud: "10%", predicted_mwh: 249.6, revenue_inr: "₹14.97 L", revenue_usd: "$17.96K", status: "Optimal" },
    { day: "Tue", date: "01 Sep", ghi: "940 W/m²", temp_max: "41.5°C", cloud: "15%", predicted_mwh: 247.1, revenue_inr: "₹14.82 L", revenue_usd: "$17.78K", status: "Optimal" },
  ];

  // Animated Cloud Vector Movement Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCloudOffset((prev) => (prev >= 400 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              PREDICTIVE ML FORECAST & CLOUD DYNAMICS
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Meteorological AI Yield & Soiling Inflection Engine
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Next-7-Day Generation Forecast & Cloud Shadow Simulator
          </h1>
        </div>

        {/* 7-Day Total Yield KPI */}
        <div className="border-2 border-primary bg-white px-4 py-2 text-right font-mono-data text-xs shadow-xs">
          <span className="text-[10px] text-secondary uppercase font-bold block">7-DAY FORECASTED REVENUE</span>
          <strong className="text-xl font-bold text-primary block">₹1.04 Crores <span className="text-xs text-secondary font-normal font-sans">($125K)</span></strong>
        </div>
      </div>

      {/* 2. 7-Day Meteorological & Energy Yield Matrix */}
      <div className="border border-border-strong bg-white p-6 space-y-4 shadow-xs font-mono-data text-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>NEXT-7-DAY HOURLY ML GENERATION & GHI SOLAR FORECAST</span>
          </h3>
          <span className="text-[10px] text-[#027a48] font-bold">MODEL ACCURACY: 98.4%</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {sevenDayForecast.map((f, idx) => (
            <div 
              key={idx} 
              className={`p-3.5 border transition-all flex flex-col justify-between ${
                f.day.includes("Optimal") ? "border-[#027a48] bg-[#f6fef9] shadow-xs" : "border-border-subtle bg-surface"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2 border-b border-border-subtle pb-1.5">
                  <div>
                    <strong className="text-primary text-xs font-bold block">{f.day.split(" ")[0]}</strong>
                    <span className="text-[10px] text-secondary font-sans">{f.date}</span>
                  </div>
                  {f.day.includes("Optimal") && (
                    <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-1.5 py-0.2 text-[8px] font-bold uppercase">
                      CLEAN
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-[11px] text-secondary font-sans mb-3">
                  <div className="flex justify-between"><span>GHI:</span> <strong className="font-mono-data text-primary">{f.ghi}</strong></div>
                  <div className="flex justify-between"><span>Temp Max:</span> <strong className="font-mono-data text-critical">{f.temp_max}</strong></div>
                  <div className="flex justify-between"><span>Cloud:</span> <strong className="font-mono-data text-secondary">{f.cloud}</strong></div>
                </div>
              </div>

              <div className="border-t border-border-subtle pt-2">
                <span className="text-[10px] text-secondary uppercase block">Generation:</span>
                <strong className="text-base text-primary font-mono-data block">{f.predicted_mwh} MWh</strong>
                <span className="text-[#027a48] font-bold text-[10px] font-mono-data">{f.revenue_inr}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Two-Column Layout: Optimal Soiling Inflection + Real-Time Cloud Shadow Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
        {/* Optimal Cleaning Robot Inflection Calculator (5 Cols) */}
        <div className="lg:col-span-5 border-2 border-primary bg-white p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-border-subtle pb-2 mb-3">
              <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-warning" />
                <span>OPTIMAL SOILING CLEANING INFLECTION ENGINE</span>
              </strong>
            </div>

            <p className="font-sans text-xs text-secondary leading-relaxed mb-3">
              Desert sand accumulates at <strong>0.38% yield loss / day</strong>. Lumira calculates the exact inflection day when cumulative yield loss surpasses cleaning robot dispatch cost (₹1,200).
            </p>

            <div className="bg-[#f6fef9] p-4 border-2 border-[#027a48] space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#027a48] uppercase">RECOMMENDED CLEANING DATE:</span>
                <strong className="text-sm font-bold text-[#027a48]">SUN, 30 AUG (DAY 5)</strong>
              </div>
              <div className="space-y-1 text-xs text-primary font-sans border-t border-[#abefc6] pt-2">
                <div className="flex justify-between"><span>Cumulative Soiling Loss:</span> <strong className="text-critical font-mono-data">₹15,400</strong></div>
                <div className="flex justify-between"><span>Autonomous Robot Cost:</span> <strong className="text-primary font-mono-data">₹1,200</strong></div>
                <div className="flex justify-between"><span>Net Recovered Revenue:</span> <strong className="text-[#027a48] font-bold font-mono-data">+₹14,200</strong></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-secondary uppercase block">
              SIMULATE DUST ACCUMULATION VELOCITY ({cleaningDayThreshold} DAYS THRESHOLD):
            </label>
            <input
              type="range"
              min="3"
              max="14"
              value={cleaningDayThreshold}
              onChange={(e) => setCleaningDayThreshold(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        {/* GROUNDBREAKING: Real-Time Dynamic Cloud Shadow Vector Simulator (7 Cols) */}
        <div className="lg:col-span-7 border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center border-b border-border-subtle pb-2">
            <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-primary" />
              <span>DYNAMIC CLOUD SHADOW VECTOR SIMULATOR (LIVE SECTOR 4 OVERLAY)</span>
            </strong>
            <span className="text-[10px] text-secondary">Vector: 4.5 m/s SE</span>
          </div>

          {/* SVG Cloud Shadow Simulator Viewport */}
          <div className="relative border border-border-strong bg-[#0f172a] h-64 rounded-none overflow-hidden p-2">
            <svg viewBox="0 0 500 220" className="w-full h-full">
              {/* Solar Array Grid Rows */}
              <rect x="20" y="20" width="460" height="35" fill="#1e293b" stroke="#334155" />
              <rect x="20" y="70" width="460" height="35" fill="#1e293b" stroke="#334155" />
              <rect x="20" y="120" width="460" height="35" fill="#1e293b" stroke="#334155" />
              <rect x="20" y="170" width="460" height="35" fill="#1e293b" stroke="#334155" />

              {/* Dynamic Moving Cloud Shadow Polygons */}
              <g transform={`translate(${cloudOffset - 100}, 0)`}>
                {/* Cloud Shadow 1 */}
                <ellipse cx="150" cy="80" rx="90" ry="45" fill="rgba(0, 0, 0, 0.55)" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
                <text x="110" y="85" fill="#e2e8f0" fontSize="9" fontFamily="monospace">Cloud Vector A (GHI: 320)</text>

                {/* Cloud Shadow 2 */}
                <ellipse cx="380" cy="140" rx="110" ry="55" fill="rgba(0, 0, 0, 0.55)" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
                <text x="340" y="145" fill="#e2e8f0" fontSize="9" fontFamily="monospace">Cloud Vector B (GHI: 280)</text>
              </g>
            </svg>

            {/* Inverter Clipping HUD */}
            <div className="absolute bottom-2 left-2 bg-black/85 border border-border-strong px-3 py-1.5 text-[10px] text-white flex items-center gap-4">
              <span>INV-04 Shading: <strong className="text-warning">32.4% Power Clip</strong></span>
              <span>MPPT Recovery: <strong className="text-[#22c55e]">Active Backtracking</strong></span>
            </div>
          </div>

          <div className="flex justify-between items-center text-secondary text-[11px] font-sans">
            <span>Dynamic cloud vector tracking enables predictive string bypass switching.</span>
            <strong className="text-primary font-mono-data">Real-Time Simulation Active</strong>
          </div>
        </div>
      </div>

      {/* 4. [GROUNDBREAKING INTEGRATION] Supercharged 3D Solar Farm Twin & Celestial Physics Simulator */}
      <div className="border-t-2 border-primary pt-6">
        <SolarFarm3DVisualizer farm={farm} />
      </div>
    </div>
  );
}
