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
  Clock
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
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary mb-1">SCADA Telemetry</h2>
          <p className="font-body-md text-body-md text-secondary">
            Real-time string level diagnostics and targeted inspection routing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block animate-pulse" />
          <span className="font-mono-data text-mono-data text-primary font-bold text-xs uppercase">
            LIVE DATA FEED
          </span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI Card 1 */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6">
          <div className="flex items-center gap-2 mb-4">
            <Grid className="w-4 h-4 text-secondary" />
            <span className="font-label-caps text-label-caps text-secondary uppercase font-bold tracking-wider">
              Strings Monitored
            </span>
          </div>
          <div className="font-mono-data text-[36px] leading-tight text-primary font-bold">
            {readings.length || 48}
          </div>
          <div className="font-body-sm text-body-sm text-secondary mt-2">
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
            <span className="font-label-caps text-label-caps text-secondary uppercase font-bold tracking-wider">
              Anomalous Strings
            </span>
          </div>
          <div className="font-mono-data text-[36px] leading-tight text-primary font-bold">
            {anomalousStrings.length || 2}
          </div>
          <div className="mt-2 inline-flex items-center gap-1 bg-[#fef3f2] px-2.5 py-1 border border-[#fef3f2]">
            <span className="font-label-caps text-[10px] font-bold text-[#d92d20] uppercase">
              -28.5% POWER DROP
            </span>
          </div>
        </div>

        {/* KPI Card 3 */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6">
          <div className="flex items-center gap-2 mb-4">
            <Timer className="w-4 h-4 text-secondary" />
            <span className="font-label-caps text-label-caps text-secondary uppercase font-bold tracking-wider">
              Inspection Time Saved
            </span>
          </div>
          <div className="font-mono-data text-[36px] leading-tight text-primary font-bold">
            98.6%
          </div>
          <div className="mt-2 inline-flex items-center gap-1 bg-[#ecfdf3] px-2.5 py-1 border border-[#ecfdf3]">
            <span className="font-label-caps text-[10px] font-bold text-[#027a48] uppercase">
              16 VS 1,200 MODULES
            </span>
          </div>
        </div>
      </div>

      {/* Targeted Inspection Cards */}
      <div className="space-y-6">
        {anomalousStrings.map((item, idx) => (
          <div key={idx} className="bg-surface-container-lowest border border-border-subtle">
            {/* Card Header */}
            <div className="border-b border-border-subtle p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <h3 className="font-headline-md text-base font-bold text-primary font-mono-data">
                  INVERTER {item.inverter_id} · STRING {item.string_id}
                </h3>
                <div className="bg-[#fef3f2] px-2.5 py-1 border border-[#fef3f2]">
                  <span className="font-label-caps text-[10px] font-bold text-[#d92d20] uppercase">
                    -{item.deviation_pct}% POWER DROP
                  </span>
                </div>
              </div>
              <div className="font-mono-data text-xs text-secondary font-bold uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                LAST UPDATED: 2 MINS AGO
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-6">
              {/* Target Highlight Banner */}
              <div className="bg-primary text-on-primary p-4 flex items-center justify-between border-2 border-primary">
                <div className="flex items-center gap-3">
                  <Crosshair className="w-5 h-5 text-on-primary" />
                  <span className="font-mono-data text-mono-data text-on-primary font-bold uppercase tracking-widest text-xs">
                    Target Area: {item.target_rows} (16 Modules)
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-on-primary opacity-60" />
              </div>

              {/* 3-Column Engineering Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Col 1: Electrical Metrics */}
                <div className="space-y-4">
                  <div className="font-label-caps text-label-caps text-secondary uppercase border-b border-border-subtle pb-2 font-bold tracking-wider">
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
                      <span className="text-primary font-bold text-sm">860 W/m²</span>
                    </div>
                  </div>
                </div>

                {/* Col 2: AI Diagnostics */}
                <div className="space-y-4 border-l border-border-subtle pl-6">
                  <div className="font-label-caps text-label-caps text-secondary uppercase border-b border-border-subtle pb-2 flex items-center gap-2 font-bold tracking-wider">
                    <Brain className="w-4 h-4 text-primary" />
                    AI Diagnostics
                  </div>
                  <div className="bg-surface-bright border border-primary p-4 relative">
                    <div className="absolute -left-[1px] top-4 w-[3px] h-8 bg-primary" />
                    <p className="font-body-sm text-body-sm text-primary font-medium leading-relaxed">
                      {item.recommended_action || "Localized sub-string mismatch detected based on VI curve anomaly. Bypass diode failure strongly suspected in indicated target zone. Thermal inspection recommended."}
                    </p>
                  </div>
                </div>

                {/* Col 3: Action */}
                <div className="space-y-3 border-l border-border-subtle pl-6 flex flex-col justify-end">
                  <button
                    onClick={onNavigateToMap}
                    className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-4 px-6 border-2 border-primary hover:bg-surface-container-lowest hover:text-primary transition-colors flex items-center justify-between group font-bold tracking-wider uppercase"
                  >
                    <span>DISPATCH TARGETED ROUTE</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="font-body-sm text-xs text-secondary text-center">
                    Will generate automated drone flight path for 16 modules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
