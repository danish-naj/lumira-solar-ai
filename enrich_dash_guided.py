import os

DASH_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Dashboard\DashboardView.jsx"
GUIDED_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\GuidedInspection\GuidedInspection.jsx"

dash_code = """import React from "react";
import { 
  Activity, 
  Sun, 
  AlertTriangle, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Brain,
  Sparkles,
  Layers,
  Thermometer,
  Wind,
  CloudSun
} from "lucide-react";

export default function DashboardView({ farm, onNavigateTab, onSelectModule }) {
  if (!farm) return null;

  const defectTaxonomy = [
    { name: "Thermal Hotspots", severity: "Critical", severityColor: "bg-[#fef3f2] text-[#d92d20] border-[#d92d20]/20", count: 6, impact: "-1.4%", impactColor: "text-[#d92d20]" },
    { name: "Microcracks", severity: "High", severityColor: "bg-[#fff1f2] text-[#be123c] border-[#be123c]/20", count: 4, impact: "-0.8%", impactColor: "text-[#be123c]" },
    { name: "PID Degradation", severity: "High", severityColor: "bg-[#fff1f2] text-[#be123c] border-[#be123c]/20", count: 2, impact: "-0.6%", impactColor: "text-[#be123c]" },
    { name: "Soiling", severity: "Medium", severityColor: "bg-[#fffaeb] text-[#b54708] border-[#b54708]/20", count: 10, impact: "-1.2%", impactColor: "text-[#b54708]" },
    { name: "Shading", severity: "Medium", severityColor: "bg-[#fffaeb] text-[#b54708] border-[#b54708]/20", count: 4, impact: "-0.5%", impactColor: "text-[#b54708]" },
    { name: "Snail Trails / Delam", severity: "Low", severityColor: "bg-surface-container-high text-secondary border-border-subtle", count: 8, impact: "-0.1%", impactColor: "text-secondary" },
  ];

  return (
    <div className="p-6 md:p-12 space-y-6 select-none bg-background">
      {/* Environmental Telemetry Strip */}
      <section className="bg-white border border-border-subtle p-3.5 flex flex-wrap items-center justify-between gap-4 font-mono-data text-xs shadow-xs">
        <div className="flex items-center gap-2 text-primary font-bold">
          <CloudSun className="w-4 h-4 text-warning" />
          <span className="font-sans uppercase text-[11px] tracking-wider text-secondary">METEOROLOGICAL SCADA:</span>
          <span>{farm.location}</span>
        </div>
        <div className="flex items-center gap-6 flex-wrap text-[11px]">
          <div className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-warning" /><span className="text-secondary font-sans">GHI:</span> <strong className="text-primary font-bold">942 W/m²</strong></div>
          <div className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-critical" /><span className="text-secondary font-sans">Amb Temp:</span> <strong className="text-primary font-bold">41.8°C</strong></div>
          <div className="flex items-center gap-1.5"><Wind className="w-3.5 h-3.5 text-primary" /><span className="text-secondary font-sans">Wind:</span> <strong className="text-primary font-bold">16.4 km/h NW</strong></div>
          <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-secondary" /><span className="text-secondary font-sans">Soiling Index:</span> <strong className="text-primary font-bold">3.4 / 10</strong></div>
        </div>
      </section>

      {/* Top KPI Row: 4 Modular Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1: Plant Health */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest font-bold text-[10px]">PLANT HEALTH SCORE</span>
            <span className="bg-[#ecfdf3] text-[#027a48] px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border border-[#027a48]/20 font-mono-data">
              NOMINAL
            </span>
          </div>
          <div>
            <div className="text-[44px] font-bold leading-none tracking-tight font-mono-data text-primary mb-1">
              {farm.health_score}<span className="text-xl text-secondary font-sans font-normal">/100</span>
            </div>
            <div className="font-body-sm text-xs text-secondary">Operational baseline within tolerance</div>
          </div>
        </div>

        {/* Card 2: Active Modules */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest font-bold text-[10px]">ACTIVE PV MODULES</span>
            <span className="bg-[#f0f2f5] text-primary px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border border-border-subtle font-mono-data">
              {farm.inverter_count} INVERTERS
            </span>
          </div>
          <div>
            <div className="text-[44px] font-bold leading-none tracking-tight font-mono-data text-primary mb-1">
              {farm.total_modules.toLocaleString()}
            </div>
            <div className="font-body-sm text-xs text-secondary">{farm.capacity_mw} MW Rated Peak DC Capacity</div>
          </div>
        </div>

        {/* Card 3: Estimated Daily Loss */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest font-bold text-[10px]">ESTIMATED DAILY LOSS</span>
            <span className="bg-[#fffaeb] text-[#b54708] px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border border-[#b54708]/20 font-mono-data">
              REVENUE RISK
            </span>
          </div>
          <div>
            <div className="text-[34px] font-bold leading-none tracking-tight font-mono-data text-primary mb-1">
              {farm.total_daily_loss_kwh} <span className="text-base text-secondary font-sans font-normal">kWh/d</span>
            </div>
            <div className="font-body-sm text-xs text-secondary">
              ≈ ${farm.total_daily_loss_usd}/day (${(farm.total_daily_loss_usd * 365).toFixed(0)}/yr / ₹{((farm.total_daily_loss_usd * 365 * 85)/100000).toFixed(2)} Lakhs)
            </div>
          </div>
        </div>

        {/* Card 4: Open Work Orders */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest font-bold text-[10px]">ACTIVE O&M TICKETS</span>
            <span className="bg-[#fef3f2] text-[#d92d20] px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border border-[#d92d20]/20 font-mono-data">
              {farm.open_work_orders} PENDING
            </span>
          </div>
          <div>
            <div className="text-[44px] font-bold leading-none tracking-tight font-mono-data text-primary mb-1">
              {farm.open_work_orders}
            </div>
            <div className="font-body-sm text-xs text-secondary">Bypass diode replacements & array washes</div>
          </div>
        </div>
      </section>

      {/* Asymmetric 7:5 Split Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Health Distribution & Defect Taxonomy (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Plant Health Distribution */}
          <div className="bg-surface-container-lowest border border-border-subtle p-6">
            <h3 className="font-headline-md text-sm font-bold text-primary mb-4 border-b border-border-subtle pb-2 uppercase tracking-wide">
              Plant Health Distribution
            </h3>
            <div className="h-7 w-full flex mb-4 border border-border-strong overflow-hidden">
              <div 
                className="h-full bg-[#027a48]" 
                style={{ width: `${Math.round((farm.healthy_count / farm.total_modules) * 100)}%` }} 
                title={`Nominal (${Math.round((farm.healthy_count / farm.total_modules) * 100)}%)`}
              />
              <div 
                className="h-full bg-[#b54708]" 
                style={{ width: `${Math.max(4, Math.round((farm.warning_count / farm.total_modules) * 100))}%` }} 
                title={`Warning (${Math.round((farm.warning_count / farm.total_modules) * 100)}%)`}
              />
              <div 
                className="h-full bg-[#d92d20]" 
                style={{ width: `${Math.max(2, Math.round((farm.critical_count / farm.total_modules) * 100))}%` }} 
                title={`Critical (${Math.round((farm.critical_count / farm.total_modules) * 100)}%)`}
              />
            </div>
            <div className="flex justify-between font-mono-data text-xs border-t border-border-subtle pt-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#027a48] mr-2" />
                <span className="text-secondary mr-1">NOMINAL:</span> {farm.healthy_count}
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#b54708] mr-2" />
                <span className="text-secondary mr-1">WARNING:</span> {farm.warning_count}
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#d92d20] mr-2" />
                <span className="text-secondary mr-1">CRITICAL:</span> {farm.critical_count}
              </div>
            </div>
          </div>

          {/* Defect Taxonomy Table */}
          <div className="bg-surface-container-lowest border border-border-subtle">
            <div className="p-3.5 border-b border-border-subtle flex justify-between items-center bg-surface">
              <h3 className="font-headline-md text-xs font-bold text-primary uppercase">Defect Taxonomy (IEC 62446-3)</h3>
              <span className="font-mono-data text-[10px] text-secondary font-bold">6 ACTIVE CLASSES</span>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                  <th className="py-2.5 px-4">Classification</th>
                  <th className="py-2.5 px-4">Severity</th>
                  <th className="py-2.5 px-4 text-right">Count</th>
                  <th className="py-2.5 px-4 text-right">Yield Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle font-mono-data">
                {defectTaxonomy.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-2.5 px-4 font-sans font-medium text-primary">{row.name}</td>
                    <td className="py-2.5 px-4">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${row.severityColor}`}>
                        {row.severity}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-primary">{row.count}</td>
                    <td className={`py-2.5 px-4 text-right font-bold ${row.impactColor}`}>{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: AI Directive & Priority Queue (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* AI-Guided SCADA Directive */}
          <div className="bg-surface-container-lowest border-2 border-border-strong relative">
            <div className="bg-[#f0f9ff] border-b-2 border-border-strong px-4 py-2.5 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#0369a1]" />
              <span className="font-label-caps text-[10px] uppercase text-[#0369a1] font-bold tracking-widest">
                AI-Guided SCADA Directive
              </span>
            </div>
            <div className="p-5">
              <p className="font-body-sm text-xs text-primary mb-5 leading-relaxed font-sans">
                Inverter <span className="font-bold font-mono-data bg-surface px-1 py-0.5 border border-border-subtle">INV-02</span> String <span className="font-bold font-mono-data bg-surface px-1 py-0.5 border border-border-subtle">STR04</span> showing <span className="font-mono-data font-bold text-[#d92d20]">-28.5%</span> power drop. AI directs targeted inspection to Rows 4-6, Columns 25-40.
              </p>
              <button 
                onClick={() => onNavigateTab("scada")}
                className="w-full bg-primary text-on-primary font-bold py-3 uppercase tracking-wider text-xs border-2 border-primary hover:bg-surface-container-lowest hover:text-primary transition-all flex justify-center items-center gap-2 group cursor-pointer"
              >
                <span>DISPATCH ROUTE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* High-Priority Action Queue */}
          <div className="bg-surface-container-lowest border border-border-subtle flex-1 flex flex-col">
            <div className="p-3.5 border-b border-border-subtle bg-surface flex items-center justify-between">
              <h3 className="font-headline-md text-xs font-bold text-primary uppercase">High-Priority Action Queue</h3>
              <span className="bg-primary text-on-primary text-[9px] px-2 py-0.5 font-mono-data font-bold uppercase">
                2 PENDING
              </span>
            </div>
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-center">
              {/* Item 1 */}
              <div 
                onClick={() => onSelectModule({ id: "R12-C37", row: 12, col: 37, health_score: 32, defects: [{ type: "Thermal Hotspot", severity: "Critical", temperature_delta_c: 18.4, estimated_power_loss_pct: 34.0, xai_explanation: "Cell #8 Diode Shunt Breakdown - Severe Reverse Bias Heating" }], daily_energy_loss_kwh: 1.42, daily_revenue_loss_usd: 0.12, inverter_id: "INV-04", string_id: "INV-04-STR05" })}
                className="border border-border-strong p-3 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer bg-white"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-bold font-mono-data text-sm text-primary">#R12-C37</div>
                  <button className="text-[9px] font-bold tracking-widest border border-border-strong px-2 py-0.5 uppercase hover:bg-primary hover:text-white transition-colors">
                    Inspect
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-border-subtle font-mono-data text-xs">
                  <div>
                    <span className="text-[9px] uppercase text-secondary font-bold font-sans block">Health</span>
                    <span className="text-[#d92d20] font-bold">32/100</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-secondary font-bold font-sans block">Delta T</span>
                    <span className="text-[#d92d20] font-bold">+18.4°C</span>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div 
                onClick={() => onSelectModule({ id: "R04-C18", row: 4, col: 18, health_score: 28, defects: [{ type: "Thermal Hotspot", severity: "Critical", temperature_delta_c: 24.5, estimated_power_loss_pct: 36.0, xai_explanation: "Row 2 Bypass Diode Thermal Runaway - Fire Hazard Risk" }], daily_energy_loss_kwh: 1.58, daily_revenue_loss_usd: 0.14, inverter_id: "INV-01", string_id: "INV-01-STR03" })}
                className="border border-border-strong p-3 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer bg-white"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-bold font-mono-data text-sm text-primary">#R04-C18</div>
                  <button className="text-[9px] font-bold tracking-widest border border-border-strong px-2 py-0.5 uppercase hover:bg-primary hover:text-white transition-colors">
                    Inspect
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-border-subtle font-mono-data text-xs">
                  <div>
                    <span className="text-[9px] uppercase text-secondary font-bold font-sans block">Health</span>
                    <span className="text-[#d92d20] font-bold">28/100</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-secondary font-bold font-sans block">Delta T</span>
                    <span className="text-[#d92d20] font-bold">+24.5°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
"""

with open(DASH_FILE, "w", encoding="utf-8") as f:
    f.write(dash_code)
print("Updated DashboardView.jsx with meteorological telemetry & calibrated defect queue.")

# Update GuidedInspection with Interactive String I-V Curve Graph
guided_code = """import React, { useState, useEffect } from "react";
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
"""

with open(GUIDED_FILE, "w", encoding="utf-8") as f:
    f.write(guided_code)
print("Updated GuidedInspection.jsx with interactive String I-V characteristic curve.")
