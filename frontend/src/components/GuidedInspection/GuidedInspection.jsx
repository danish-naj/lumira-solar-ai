import React, { useState, useEffect } from "react";
import { 
  Zap, 
  TrendingDown, 
  Navigation, 
  ArrowRight, 
  Crosshair, 
  Brain, 
  Grid, 
  AlertTriangle, 
  Timer,
  Clock,
  Activity
} from "lucide-react";
import { fetchScadaReadings } from "../../services/api";

export default function GuidedInspection({ farm, onNavigateToMap }) {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (farm) {
      fetchScadaReadings(farm.id)
        .then((res) => {
          setReadings(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [farm]);

  const anomalousStrings = readings.filter((r) => r.is_anomalous);

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-[1440px] mx-auto select-none bg-surface-container-lowest">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-border-subtle pb-4">
        <div>
          <h2 className="font-headline-lg text-2xl font-bold text-primary mb-1">AI-Guided SCADA Telemetry</h2>
          <p className="font-body-md text-sm text-secondary">
            Real-time string level VI curve diagnostics and targeted inspection routing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block animate-pulse" />
          <span className="font-mono-data text-primary font-bold text-xs uppercase">
            ● LIVE SCADA FEED
          </span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI Card 1 */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6">
          <div className="flex items-center gap-2 mb-4">
            <Grid className="w-4 h-4 text-secondary" />
            <span className="font-label-caps text-secondary uppercase font-bold tracking-wider text-[10px]">
              Strings Monitored
            </span>
          </div>
          <div className="font-mono-data text-[36px] leading-tight text-primary font-bold">
            {readings.length || 48}
          </div>
          <div className="text-xs text-secondary mt-2">
            Active strings across {farm?.inverter_count || 6} inverters.
          </div>
        </div>

        {/* KPI Card 2 */}
        <div className="bg-surface-container-lowest border-2 border-primary p-6 relative">
          <div className="absolute top-0 right-0 p-4">
            <AlertTriangle className="w-5 h-5 text-primary" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-error" />
            <span className="font-label-caps text-secondary uppercase font-bold tracking-wider text-[10px]">
              Anomalous Strings
            </span>
          </div>
          <div className="font-mono-data text-[36px] leading-tight text-primary font-bold">
            {anomalousStrings.length || 2}
          </div>
          <div className="mt-2 inline-flex items-center gap-1 bg-[#fef3f2] px-2.5 py-1 border border-[#fef3f2]">
            <span className="font-label-caps text-[10px] font-bold text-[#d92d20] uppercase font-mono-data">
              -28.5% POWER DROP
            </span>
          </div>
        </div>

        {/* KPI Card 3 */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6">
          <div className="flex items-center gap-2 mb-4">
            <Timer className="w-4 h-4 text-secondary" />
            <span className="font-label-caps text-secondary uppercase font-bold tracking-wider text-[10px]">
              Inspection Time Saved
            </span>
          </div>
          <div className="font-mono-data text-[36px] leading-tight text-primary font-bold">
            98.6%
          </div>
          <div className="mt-2 inline-flex items-center gap-1 bg-[#ecfdf3] px-2.5 py-1 border border-[#ecfdf3]">
            <span className="font-label-caps text-[10px] font-bold text-[#027a48] uppercase font-mono-data">
              16 VS 1,200 MODULES
            </span>
          </div>
        </div>
      </div>

      {/* String I-V Curve Telemetry Graph & Directive Bento */}
      <div className="space-y-6">
        {anomalousStrings.map((item, idx) => (
          <div key={idx} className="bg-surface-container-lowest border border-border-subtle">
            {/* Card Header */}
            <div className="border-b border-border-subtle p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface">
              <div className="flex items-center gap-4">
                <h3 className="font-mono-data text-base font-bold text-primary">
                  INVERTER {item.inverter_id} · STRING {item.string_id}
                </h3>
                <div className="bg-[#fef3f2] px-2.5 py-1 border border-[#fef3f2]">
                  <span className="font-mono-data text-[10px] font-bold text-[#d92d20] uppercase">
                    -{item.deviation_pct}% POWER DROP
                  </span>
                </div>
              </div>
              <div className="font-mono-data text-xs text-secondary font-bold uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                TELEMETRY SYNCHRONIZED: LIVE
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-6">
              {/* Target Highlight Banner */}
              <div className="bg-primary text-on-primary p-4 flex items-center justify-between border-2 border-primary">
                <div className="flex items-center gap-3">
                  <Crosshair className="w-5 h-5 text-on-primary" />
                  <span className="font-mono-data text-on-primary font-bold uppercase tracking-widest text-xs">
                    Target Area: {item.target_rows} (16 Modules)
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-on-primary opacity-60" />
              </div>

              {/* 3-Column Engineering Grid + SVG IV Curve */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Col 1: Electrical Metrics (Span 3) */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="font-label-caps text-secondary uppercase border-b border-border-subtle pb-2 font-bold tracking-wider text-[10px]">
                    Electrical Telemetry
                  </div>
                  <div className="space-y-3 font-mono-data text-xs">
                    <div className="flex justify-between items-baseline border-b border-border-subtle pb-2">
                      <span className="text-secondary font-sans">Voltage</span>
                      <span className="text-primary font-bold text-sm">{item.voltage_v} V</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-border-subtle pb-2">
                      <span className="text-secondary font-sans">Current</span>
                      <span className="text-primary font-bold text-sm">{item.current_a} A</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-border-subtle pb-2">
                      <span className="text-secondary font-sans">Irradiance</span>
                      <span className="text-primary font-bold text-sm">942 W/m²</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-border-subtle pb-2">
                      <span className="text-secondary font-sans">Output Power</span>
                      <span className="text-critical font-bold text-sm">{(item.voltage_v * item.current_a / 1000).toFixed(2)} kW</span>
                    </div>
                  </div>
                </div>

                {/* Col 2: I-V Curve SVG Diagnostic Graph (Span 5) */}
                <div className="lg:col-span-5 border-l border-border-subtle pl-6 space-y-3">
                  <div className="flex justify-between items-center border-b border-border-subtle pb-2 font-mono-data text-xs">
                    <span className="font-label-caps text-secondary uppercase font-bold text-[10px]">STRING I-V CHARACTERISTIC CURVE</span>
                    <div className="flex gap-3 text-[10px]">
                      <span className="text-primary font-bold">― Nominal Baseline</span>
                      <span className="text-critical font-bold">--- Anomalous</span>
                    </div>
                  </div>
                  <div className="bg-surface p-3 border border-border-subtle">
                    <svg viewBox="0 0 320 130" className="w-full h-32">
                      {/* Grid lines */}
                      <line x1="30" y1="10" x2="30" y2="105" stroke="#e5e5e5" strokeWidth="1" />
                      <line x1="30" y1="105" x2="310" y2="105" stroke="#e5e5e5" strokeWidth="1" />
                      <line x1="30" y1="60" x2="310" y2="60" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="170" y1="10" x2="170" y2="105" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="3,3" />
                      
                      {/* Nominal I-V Curve (Green/Black Solid) */}
                      <path d="M 30 25 Q 230 28 290 105" fill="none" stroke="#000000" strokeWidth="2.5" />
                      
                      {/* Anomalous I-V Curve with Diode Knee Dip (Red Dashed) */}
                      <path d="M 30 45 Q 160 48 190 75 Q 220 85 260 105" fill="none" stroke="#d92d20" strokeWidth="2" strokeDasharray="4,3" />
                      
                      {/* Anomaly Inflection Point */}
                      <circle cx="190" cy="75" r="4" fill="#d92d20" />
                      <text x="195" y="70" fill="#d92d20" fontSize="9" fontFamily="monospace" fontWeight="bold">DIODE INFLECTION</text>
                      
                      {/* Axis Labels */}
                      <text x="35" y="18" fill="#5f5e5e" fontSize="8" fontFamily="monospace">Current (A)</text>
                      <text x="260" y="118" fill="#5f5e5e" fontSize="8" fontFamily="monospace">Voltage (V)</text>
                    </svg>
                  </div>
                </div>

                {/* Col 3: AI Diagnostics & Dispatch CTA (Span 4) */}
                <div className="lg:col-span-4 border-l border-border-subtle pl-6 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="font-label-caps text-secondary uppercase border-b border-border-subtle pb-2 flex items-center gap-2 font-bold tracking-wider text-[10px]">
                      <Brain className="w-4 h-4 text-primary" />
                      AI Root Cause Diagnostic
                    </div>
                    <div className="bg-surface border border-primary p-3.5 mt-2 relative">
                      <p className="text-xs text-primary font-medium leading-relaxed font-sans">
                        {item.recommended_action || "Localized sub-string mismatch detected based on VI curve anomaly. Bypass diode failure strongly suspected in indicated target zone. Thermal flight inspection recommended."}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={onNavigateToMap}
                      className="w-full bg-primary text-on-primary font-bold py-3.5 px-4 border-2 border-primary hover:bg-white hover:text-primary transition-all flex items-center justify-between group uppercase text-xs tracking-wider cursor-pointer"
                    >
                      <span>DISPATCH TARGETED ROUTE</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[11px] text-secondary text-center font-sans">
                      Automated flight path for 16 modules (98.6% inspection time saved).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
