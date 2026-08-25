import React, { useState } from "react";
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
  CloudSun, 
  X, 
  Cpu, 
  ShieldCheck, 
  FileSpreadsheet, 
  Wrench, 
  ChevronRight, 
  Maximize2 
} from "lucide-react";

export default function DashboardView({ farm, onNavigateTab, onSelectModule }) {
  const [activeModal, setActiveModal] = useState(null);

  if (!farm) return null;

  const defectTaxonomy = [
    { name: "Thermal Hotspots", severity: "Critical", severityColor: "bg-[#fef3f2] text-[#d92d20] border-[#d92d20]/20", count: 6, impact: "-1.4%", impactColor: "text-[#d92d20]", filter: "Critical" },
    { name: "Microcracks", severity: "High", severityColor: "bg-[#fff1f2] text-[#be123c] border-[#be123c]/20", count: 4, impact: "-0.8%", impactColor: "text-[#be123c]", filter: "High" },
    { name: "PID Degradation", severity: "High", severityColor: "bg-[#fff1f2] text-[#be123c] border-[#be123c]/20", count: 2, impact: "-0.6%", impactColor: "text-[#be123c]", filter: "High" },
    { name: "Soiling", severity: "Medium", severityColor: "bg-[#fffaeb] text-[#b54708] border-[#b54708]/20", count: 10, impact: "-1.2%", impactColor: "text-[#b54708]", filter: "Medium" },
    { name: "Shading", severity: "Medium", severityColor: "bg-[#fffaeb] text-[#b54708] border-[#b54708]/20", count: 4, impact: "-0.5%", impactColor: "text-[#b54708]", filter: "Medium" },
    { name: "Snail Trails / Delam", severity: "Low", severityColor: "bg-surface-container-high text-secondary border-border-subtle", count: 8, impact: "-0.1%", impactColor: "text-secondary", filter: "Low" },
  ];

  const inverters = [
    { id: "INV-01", make: "Sungrow SG3125HV-30", cap: "8.33 MW", health: 99.1, eff: "98.8%", status: "Nominal", strings: 8, anomalies: 0 },
    { id: "INV-02", make: "Sungrow SG3125HV-30", cap: "8.33 MW", health: 94.2, eff: "96.4%", status: "Warning", strings: 8, anomalies: 1, alert: "STR04 -28.5% Current Drop" },
    { id: "INV-03", make: "Sungrow SG3125HV-30", cap: "8.33 MW", health: 99.4, eff: "98.9%", status: "Nominal", strings: 8, anomalies: 0 },
    { id: "INV-04", make: "Sungrow SG3125HV-30", cap: "8.33 MW", health: 95.8, eff: "97.1%", status: "Warning", strings: 8, anomalies: 1, alert: "STR12 -31.0% Hotspot Bottleneck" },
    { id: "INV-05", make: "Sungrow SG3125HV-30", cap: "8.33 MW", health: 98.7, eff: "98.7%", status: "Nominal", strings: 8, anomalies: 0 },
    { id: "INV-06", make: "Sungrow SG3125HV-30", cap: "8.33 MW", health: 99.0, eff: "98.8%", status: "Nominal", strings: 8, anomalies: 0 },
  ];

  return (
    <div className="p-6 md:p-12 space-y-6 select-none bg-background">
      {/* Environmental Telemetry Strip (Clickable) */}
      <section 
        onClick={() => setActiveModal("weather")}
        className="bg-white border border-border-subtle hover:border-primary p-3.5 flex flex-wrap items-center justify-between gap-4 font-mono-data text-xs shadow-xs cursor-pointer transition-all group"
      >
        <div className="flex items-center gap-2 text-primary font-bold">
          <CloudSun className="w-4 h-4 text-warning group-hover:scale-110 transition-transform" />
          <span className="font-sans uppercase text-[11px] tracking-wider text-secondary">METEOROLOGICAL SCADA:</span>
          <span>{farm.location}</span>
          <span className="text-[10px] text-secondary border border-border-subtle px-1.5 py-0.5 bg-surface ml-2">Click for Sensors ↗</span>
        </div>
        <div className="flex items-center gap-6 flex-wrap text-[11px]">
          <div className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-warning" /><span className="text-secondary font-sans">GHI:</span> <strong className="text-primary font-bold">942 W/m²</strong></div>
          <div className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-critical" /><span className="text-secondary font-sans">Amb Temp:</span> <strong className="text-primary font-bold">41.8°C</strong></div>
          <div className="flex items-center gap-1.5"><Wind className="w-3.5 h-3.5 text-primary" /><span className="text-secondary font-sans">Wind:</span> <strong className="text-primary font-bold">16.4 km/h NW</strong></div>
          <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-secondary" /><span className="text-secondary font-sans">Soiling Index:</span> <strong className="text-primary font-bold">3.4 / 10</strong></div>
        </div>
      </section>

      {/* Top KPI Row: 4 Modular Cards with Deep-Dive Click Triggers */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1: Plant Health (Larger Prominent Display) */}
        <div 
          onClick={() => setActiveModal("health")}
          className="bg-surface-container-lowest border border-border-subtle hover:border-primary hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all p-6 flex flex-col justify-between h-44 cursor-pointer relative group"
        >
          <div className="flex justify-between items-start mb-1">
            <span className="font-label-caps text-secondary uppercase tracking-widest font-bold text-[10px]">
              PLANT HEALTH SCORE
            </span>
            <span className="bg-[#ecfdf3] text-[#027a48] px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border border-[#027a48]/20 font-mono-data">
              NOMINAL
            </span>
          </div>
          <div>
            <div className="text-[52px] font-black leading-none tracking-tight font-mono-data text-primary mb-1.5 flex items-baseline gap-1">
              <span>{farm.health_score}</span>
              <span className="text-xl text-secondary font-sans font-normal">/100</span>
            </div>
            <div className="flex items-center justify-between text-xs text-secondary border-t border-border-subtle pt-2 mt-1">
              <span>Operational baseline</span>
              <span className="font-bold text-primary font-mono-data text-[11px] group-hover:underline flex items-center gap-0.5">
                Audit Details ↗
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Modules & Hardware Registry */}
        <div 
          onClick={() => setActiveModal("hardware")}
          className="bg-surface-container-lowest border border-border-subtle hover:border-primary hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all p-6 flex flex-col justify-between h-44 cursor-pointer relative group"
        >
          <div className="flex justify-between items-start mb-1">
            <span className="font-label-caps text-secondary uppercase tracking-widest font-bold text-[10px]">
              ACTIVE PV MODULES
            </span>
            <span className="bg-[#f0f2f5] text-primary px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border border-border-subtle font-mono-data">
              {farm.inverter_count} INVERTERS
            </span>
          </div>
          <div>
            <div className="text-[44px] font-black leading-none tracking-tight font-mono-data text-primary mb-1">
              {farm.total_modules.toLocaleString()}
            </div>
            <div className="text-xs text-secondary">{farm.capacity_mw} MW Peak DC · LONGi Hi-MO 6</div>
            <div className="flex items-center justify-between text-xs text-secondary border-t border-border-subtle pt-2 mt-2">
              <span className="font-mono-data font-bold text-primary">Sungrow SG3125HV</span>
              <span className="font-bold text-primary font-mono-data text-[11px] group-hover:underline flex items-center gap-0.5">
                Hardware Specs ↗
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Estimated Daily Loss & Financial Risk */}
        <div 
          onClick={() => setActiveModal("loss")}
          className="bg-surface-container-lowest border border-border-subtle hover:border-primary hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all p-6 flex flex-col justify-between h-44 cursor-pointer relative group"
        >
          <div className="flex justify-between items-start mb-1">
            <span className="font-label-caps text-secondary uppercase tracking-widest font-bold text-[10px]">
              ESTIMATED DAILY LOSS
            </span>
            <span className="bg-[#fffaeb] text-[#b54708] px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border border-[#b54708]/20 font-mono-data">
              REVENUE RISK
            </span>
          </div>
          <div>
            <div className="text-[36px] font-black leading-none tracking-tight font-mono-data text-primary mb-1">
              {farm.total_daily_loss_kwh} <span className="text-base text-secondary font-sans font-normal">kWh/d</span>
            </div>
            <div className="text-xs text-secondary">
              ≈ ${farm.total_daily_loss_usd}/day · ₹{((farm.total_daily_loss_usd * 365 * 85)/100000).toFixed(2)} Lakhs/yr
            </div>
            <div className="flex items-center justify-between text-xs text-secondary border-t border-border-subtle pt-2 mt-2">
              <span>98.4% Recoverable</span>
              <span className="font-bold text-primary font-mono-data text-[11px] group-hover:underline flex items-center gap-0.5">
                Loss Breakdown ↗
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Open Work Orders & Action Queue */}
        <div 
          onClick={() => setActiveModal("tickets")}
          className="bg-surface-container-lowest border border-border-subtle hover:border-primary hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all p-6 flex flex-col justify-between h-44 cursor-pointer relative group"
        >
          <div className="flex justify-between items-start mb-1">
            <span className="font-label-caps text-secondary uppercase tracking-widest font-bold text-[10px]">
              ACTIVE O&M TICKETS
            </span>
            <span className="bg-[#fef3f2] text-[#d92d20] px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border border-[#d92d20]/20 font-mono-data">
              {farm.open_work_orders} PENDING
            </span>
          </div>
          <div>
            <div className="text-[44px] font-black leading-none tracking-tight font-mono-data text-primary mb-1">
              {farm.open_work_orders}
            </div>
            <div className="text-xs text-secondary">2 Critical Diode Replacements Scheduled</div>
            <div className="flex items-center justify-between text-xs text-secondary border-t border-border-subtle pt-2 mt-2">
              <span className="font-mono-data font-bold text-[#d92d20]">P1 / P2 Priority</span>
              <span className="font-bold text-primary font-mono-data text-[11px] group-hover:underline flex items-center gap-0.5">
                View Queue ↗
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric 7:5 Split Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Health Distribution & Defect Taxonomy (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Plant Health Distribution */}
          <div 
            onClick={() => setActiveModal("health")}
            className="bg-surface-container-lowest border border-border-subtle hover:border-primary p-6 cursor-pointer transition-all group"
          >
            <div className="flex justify-between items-center mb-4 border-b border-border-subtle pb-2">
              <h3 className="font-headline-md text-sm font-bold text-primary uppercase tracking-wide flex items-center gap-2">
                <span>Plant Health Distribution</span>
                <span className="text-[10px] text-secondary font-mono-data">(Click to Inspect)</span>
              </h3>
              <span className="font-mono-data text-xs font-bold text-primary group-hover:underline">Detailed Health Map ↗</span>
            </div>
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

          {/* Defect Taxonomy Table (Each row redirects to map with filter) */}
          <div className="bg-surface-container-lowest border border-border-subtle">
            <div className="p-3.5 border-b border-border-subtle flex justify-between items-center bg-surface">
              <h3 className="font-headline-md text-xs font-bold text-primary uppercase">Defect Taxonomy (IEC 62446-3)</h3>
              <span className="font-mono-data text-[10px] text-secondary font-bold">CLICK ROW TO FILTER GRID</span>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                  <th className="py-2.5 px-4">Classification</th>
                  <th className="py-2.5 px-4">Severity</th>
                  <th className="py-2.5 px-4 text-right">Count</th>
                  <th className="py-2.5 px-4 text-right">Yield Impact</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle font-mono-data">
                {defectTaxonomy.map((row, idx) => (
                  <tr 
                    key={idx} 
                    onClick={() => onNavigateTab("map")}
                    className="hover:bg-surface-container-low transition-colors cursor-pointer group"
                  >
                    <td className="py-2.5 px-4 font-sans font-medium text-primary flex items-center gap-1.5">
                      <span>{row.name}</span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${row.severityColor}`}>
                        {row.severity}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-primary">{row.count}</td>
                    <td className={`py-2.5 px-4 text-right font-bold ${row.impactColor}`}>{row.impact}</td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="text-[10px] font-bold text-primary group-hover:underline font-mono-data">Inspect →</span>
                    </td>
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

      {/* ========================================================================= */}
      {/* DEEP-DIVE DRILL-DOWN MODALS & TELEMETRY DRAWERS                           */}
      {/* ========================================================================= */}

      {/* MODAL 1: FLEET HEALTH & DEGRADATION AUDIT */}
      {activeModal === "health" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-primary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-5 border-b-2 border-primary bg-surface flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#027a48]" />
                <h3 className="font-headline-md text-sm font-bold uppercase tracking-wider text-primary">
                  Plant Health & Degradation Audit — {farm.name}
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-white border border-transparent hover:border-primary cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4 border border-border-subtle p-4 bg-surface font-mono-data text-xs">
                <div>
                  <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Overall Health</span>
                  <span className="text-3xl font-black text-primary">{farm.health_score}/100</span>
                </div>
                <div>
                  <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Annual Degradation</span>
                  <span className="text-2xl font-bold text-[#027a48]">0.42% / yr</span>
                  <span className="text-[10px] text-secondary block">Warrantied &lt; 0.50%</span>
                </div>
                <div>
                  <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Compliance Status</span>
                  <span className="text-xs font-bold text-[#027a48] bg-[#ecfdf3] px-2 py-1 border border-[#abefc6] inline-block mt-1">
                    IEC 62446-3 TIER-1
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase text-secondary tracking-wider mb-3 font-sans">Inverter Sub-Array Health Breakdown</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono-data text-xs">
                  {inverters.map((inv) => (
                    <div key={inv.id} className="border border-border-subtle p-3 bg-white hover:border-primary">
                      <div className="flex justify-between items-center mb-1">
                        <strong className="text-primary">{inv.id}</strong>
                        <span className={`text-[10px] px-1.5 py-0.2 font-bold ${inv.health >= 98 ? "bg-[#ecfdf3] text-[#027a48]" : "bg-[#fffaeb] text-[#b54708]"}`}>
                          {inv.health}%
                        </span>
                      </div>
                      <div className="text-[10px] text-secondary">{inv.cap} · {inv.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border-subtle bg-surface flex justify-between items-center">
              <span className="text-xs text-secondary font-mono-data">Fleet Certified: August 2026</span>
              <button 
                onClick={() => { setActiveModal(null); onNavigateTab("map"); }}
                className="bg-primary text-white font-bold px-5 py-2.5 text-xs uppercase tracking-wider hover:bg-white hover:text-primary border border-primary transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>OPEN 2D DIGITAL TWIN GRID</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: HARDWARE ASSET REGISTRY & INVERTER FLEET SPECS */}
      {activeModal === "hardware" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-primary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-5 border-b-2 border-primary bg-surface flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                <h3 className="font-headline-md text-sm font-bold uppercase tracking-wider text-primary">
                  Hardware Asset Registry & Inverter Fleet Breakdown
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-white border border-transparent hover:border-primary cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 font-sans">
              {/* PV Module OEM Specifications */}
              <div className="border border-border-strong p-4 bg-surface">
                <div className="font-mono-data text-xs font-bold text-primary uppercase border-b border-border-subtle pb-2 mb-3 flex justify-between">
                  <span>PV MODULE SPECIFICATIONS (OEM)</span>
                  <span className="text-[#027a48]">TIER-1 MONOCRYSTALLINE BIFACIAL</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-data text-xs">
                  <div>
                    <span className="text-[10px] text-secondary uppercase block font-sans">Manufacturer</span>
                    <strong className="text-primary text-sm">LONGi Solar</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary uppercase block font-sans">Model / Series</span>
                    <strong className="text-primary text-sm">Hi-MO 6 Explorer</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary uppercase block font-sans">Nominal Power</span>
                    <strong className="text-primary text-sm">540 Wp / Unit</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary uppercase block font-sans">Module Efficiency</span>
                    <strong className="text-primary text-sm">21.6% STC</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary uppercase block font-sans">Cell Geometry</span>
                    <strong className="text-primary text-xs">144 Half-Cut 9BB</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary uppercase block font-sans">Bifaciality Factor</span>
                    <strong className="text-primary text-xs">70% ± 5%</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary uppercase block font-sans">Temp Coefficient</span>
                    <strong className="text-primary text-xs">-0.29 % / °C</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary uppercase block font-sans">Dimensions</span>
                    <strong className="text-primary text-xs">2278 × 1134 mm</strong>
                  </div>
                </div>
              </div>

              {/* Inverter Stations Breakdown */}
              <div>
                <h4 className="font-bold text-xs uppercase text-secondary tracking-wider mb-3">Central Inverter Fleet Stations</h4>
                <div className="border border-border-subtle overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse font-mono-data">
                    <thead>
                      <tr className="bg-surface-container-low border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                        <th className="py-2.5 px-3">Inverter Station</th>
                        <th className="py-2.5 px-3 font-sans">Make & Model</th>
                        <th className="py-2.5 px-3">DC Capacity</th>
                        <th className="py-2.5 px-3">Health</th>
                        <th className="py-2.5 px-3">Efficiency</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle text-xs">
                      {inverters.map((inv) => (
                        <tr key={inv.id} className="hover:bg-surface">
                          <td className="py-2.5 px-3 font-bold text-primary">{inv.id}</td>
                          <td className="py-2.5 px-3 font-sans text-secondary">{inv.make}</td>
                          <td className="py-2.5 px-3 text-primary">{inv.cap}</td>
                          <td className="py-2.5 px-3 font-bold text-primary">{inv.health}%</td>
                          <td className="py-2.5 px-3 text-primary">{inv.eff}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${inv.status === "Nominal" ? "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]" : "bg-[#fffaeb] text-[#b54708] border-[#fedf89]"}`}>
                              {inv.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border-subtle bg-surface flex justify-between items-center">
              <span className="text-xs text-secondary font-mono-data">Total Rated DC Capacity: {farm.capacity_mw} MW</span>
              <button 
                onClick={() => { setActiveModal(null); onNavigateTab("scada"); }}
                className="bg-primary text-white font-bold px-5 py-2.5 text-xs uppercase tracking-wider hover:bg-white hover:text-primary border border-primary transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>OPEN INVERTER SCADA TELEMETRY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: FINANCIAL & YIELD LOSS AUDIT */}
      {activeModal === "loss" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-primary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-5 border-b-2 border-primary bg-surface flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-critical" />
                <h3 className="font-headline-md text-sm font-bold uppercase tracking-wider text-primary">
                  Yield Loss & Financial Risk Breakdown
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-white border border-transparent hover:border-primary cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 font-mono-data text-xs">
              <div className="grid grid-cols-3 gap-3 border border-border-subtle p-4 bg-surface text-center">
                <div>
                  <span className="text-[10px] text-secondary font-sans uppercase block">Daily Energy Loss</span>
                  <span className="text-2xl font-black text-primary">{farm.total_daily_loss_kwh} kWh/d</span>
                </div>
                <div className="border-l border-border-subtle">
                  <span className="text-[10px] text-secondary font-sans uppercase block">Daily Revenue Risk</span>
                  <span className="text-2xl font-black text-critical">${farm.total_daily_loss_usd}/d</span>
                </div>
                <div className="border-l border-border-subtle">
                  <span className="text-[10px] text-secondary font-sans uppercase block">Annual Revenue At Risk</span>
                  <span className="text-2xl font-black text-primary">₹{((farm.total_daily_loss_usd * 365 * 85)/100000).toFixed(2)} L</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase text-secondary font-sans tracking-wider mb-2">Cause Attribution Matrix</h4>
                <table className="w-full text-left border border-border-subtle">
                  <thead>
                    <tr className="bg-surface border-b border-border-subtle text-[10px] text-secondary uppercase font-bold">
                      <th className="p-2 font-sans">Defect Class</th>
                      <th className="p-2 text-right">Daily Loss</th>
                      <th className="p-2 text-right">Yield %</th>
                      <th className="p-2 text-right font-sans">Annual Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    <tr><td className="p-2 font-sans font-medium text-primary">Thermal Hotspots (Diode Failures)</td><td className="p-2 text-right font-bold text-critical">1.42 kWh/d</td><td className="p-2 text-right text-critical font-bold">33.5%</td><td className="p-2 text-right">₹44,050/yr</td></tr>
                    <tr><td className="p-2 font-sans font-medium text-primary">Wafer Microcracks & Fissures</td><td className="p-2 text-right font-bold">0.88 kWh/d</td><td className="p-2 text-right">20.7%</td><td className="p-2 text-right">₹27,300/yr</td></tr>
                    <tr><td className="p-2 font-sans font-medium text-primary">Desert Sand & Silica Soiling</td><td className="p-2 text-right font-bold">1.15 kWh/d</td><td className="p-2 text-right">27.1%</td><td className="p-2 text-right">₹35,680/yr</td></tr>
                    <tr><td className="p-2 font-sans font-medium text-primary">Vegetation & Fence Shadow Shading</td><td className="p-2 text-right font-bold">0.65 kWh/d</td><td className="p-2 text-right">15.3%</td><td className="p-2 text-right">₹20,160/yr</td></tr>
                    <tr><td className="p-2 font-sans font-medium text-primary">Snail Trails & Delamination</td><td className="p-2 text-right font-bold">0.14 kWh/d</td><td className="p-2 text-right">3.4%</td><td className="p-2 text-right">₹4,340/yr</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border-t border-border-subtle bg-surface flex justify-between items-center">
              <span className="text-xs text-secondary font-sans">Remediation recovers 98.4% of clipping losses.</span>
              <button 
                onClick={() => { setActiveModal(null); onNavigateTab("reports"); }}
                className="bg-primary text-white font-bold px-5 py-2.5 text-xs uppercase tracking-wider hover:bg-white hover:text-primary border border-primary transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>VIEW EXECUTIVE AUDIT REPORT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ACTIVE O&M TICKETS QUEUE */}
      {activeModal === "tickets" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-primary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-5 border-b-2 border-primary bg-surface flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                <h3 className="font-headline-md text-sm font-bold uppercase tracking-wider text-primary">
                  Active O&M Work Orders Queue ({farm.open_work_orders} Tickets)
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-white border border-transparent hover:border-primary cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 font-mono-data text-xs">
              <div className="border border-border-strong p-3 bg-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-primary text-sm">WO-10492 · Panel #R12-C37</span>
                  <span className="bg-[#fef3f2] text-critical border border-critical px-2 py-0.5 text-[9px] font-bold uppercase">P1 CRITICAL</span>
                </div>
                <div className="text-secondary font-sans text-xs">Thermal Hotspot (ΔT +18.4°C) · Bypass diode replacement · Resolved, pending AI verification.</div>
              </div>

              <div className="border border-border-subtle p-3 bg-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-primary text-sm">WO-10493 · Panel #R04-C18</span>
                  <span className="bg-[#fef3f2] text-critical border border-critical px-2 py-0.5 text-[9px] font-bold uppercase">P1 CRITICAL</span>
                </div>
                <div className="text-secondary font-sans text-xs">Thermal Hotspot (ΔT +24.5°C) · Diode thermal runaway · In Repair (Tech: K. Verma).</div>
              </div>

              <div className="border border-border-subtle p-3 bg-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-primary text-sm">WO-10494 · Panel #R07-C45</span>
                  <span className="bg-[#fff1f2] text-[#be123c] border border-[#be123c]/20 px-2 py-0.5 text-[9px] font-bold uppercase">P2 HIGH</span>
                </div>
                <div className="text-secondary font-sans text-xs">Wafer Microcrack · EL imaging test scheduled (Tech: A. Patel).</div>
              </div>

              <div className="border border-border-subtle p-3 bg-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-primary text-sm">WO-10495 · Panel #R15-C22</span>
                  <span className="bg-[#fffaeb] text-warning border border-[#b54708]/20 px-2 py-0.5 text-[9px] font-bold uppercase">P3 MEDIUM</span>
                </div>
                <div className="text-secondary font-sans text-xs">Heavy Desert Soiling · Robotic dry cleaning scheduled for Sector 4.</div>
              </div>
            </div>

            <div className="p-4 border-t border-border-subtle bg-surface flex justify-between items-center">
              <span className="text-xs text-secondary font-sans">Autonomous Closed-Loop Dispatch Active.</span>
              <button 
                onClick={() => { setActiveModal(null); onNavigateTab("maintenance"); }}
                className="bg-primary text-white font-bold px-5 py-2.5 text-xs uppercase tracking-wider hover:bg-white hover:text-primary border border-primary transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>OPEN WORK ORDERS KANBAN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: METEOROLOGICAL SENSOR TELEMETRY */}
      {activeModal === "weather" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-primary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-5 border-b-2 border-primary bg-surface flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-warning" />
                <h3 className="font-headline-md text-sm font-bold uppercase tracking-wider text-primary">
                  On-Site Microclimate & Pyranometer Telemetry
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-white border border-transparent hover:border-primary cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 font-mono-data text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="border border-border-subtle p-3 bg-surface">
                  <span className="text-[10px] text-secondary font-sans uppercase block">Global Horizontal (GHI)</span>
                  <span className="text-lg font-bold text-primary">942 W/m²</span>
                </div>
                <div className="border border-border-subtle p-3 bg-surface">
                  <span className="text-[10px] text-secondary font-sans uppercase block">Direct Normal (DNI)</span>
                  <span className="text-lg font-bold text-primary">875 W/m²</span>
                </div>
                <div className="border border-border-subtle p-3 bg-surface">
                  <span className="text-[10px] text-secondary font-sans uppercase block">Diffuse Horizontal (DHI)</span>
                  <span className="text-lg font-bold text-primary">120 W/m²</span>
                </div>
                <div className="border border-border-subtle p-3 bg-surface">
                  <span className="text-[10px] text-secondary font-sans uppercase block">Back-of-Module Temp</span>
                  <span className="text-lg font-bold text-critical">58.4°C</span>
                </div>
              </div>

              <div className="border border-border-strong p-4 bg-white">
                <h5 className="font-bold text-xs uppercase font-sans mb-2">Soiling & Wind Telemetry Vector</h5>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div><span className="text-secondary font-sans block text-[10px]">Wind Velocity</span><strong>16.4 km/h (4.5 m/s)</strong></div>
                  <div><span className="text-secondary font-sans block text-[10px]">Wind Direction</span><strong>315° (North-West)</strong></div>
                  <div><span className="text-secondary font-sans block text-[10px]">Atmospheric Soiling Rate</span><strong>0.18% / day</strong></div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border-subtle bg-surface flex justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="bg-primary text-white font-bold px-5 py-2 text-xs uppercase tracking-wider hover:bg-white hover:text-primary border border-primary transition-all cursor-pointer"
              >
                Close Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
