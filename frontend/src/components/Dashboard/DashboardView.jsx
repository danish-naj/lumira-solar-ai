import React from "react";
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
  Layers
} from "lucide-react";

export default function DashboardView({ farm, onNavigateTab, onSelectModule }) {
  if (!farm) return null;

  const defectTaxonomy = [
    { name: "Thermal Hotspots", severity: "Critical", severityColor: "bg-[#fef3f2] text-[#d92d20] border-[#d92d20]/20", count: 12, impact: "-1.4%", impactColor: "text-[#d92d20]" },
    { name: "Microcracks", severity: "High", severityColor: "bg-[#fff1f2] text-[#be123c] border-[#be123c]/20", count: 34, impact: "-0.8%", impactColor: "text-[#be123c]" },
    { name: "Soiling", severity: "Medium", severityColor: "bg-[#fffaeb] text-[#b54708] border-[#b54708]/20", count: 128, impact: "-2.1%", impactColor: "text-[#b54708]" },
    { name: "Shading", severity: "Medium", severityColor: "bg-[#fffaeb] text-[#b54708] border-[#b54708]/20", count: 45, impact: "-1.2%", impactColor: "text-[#b54708]" },
    { name: "Snail Trails", severity: "Low", severityColor: "bg-surface-container-high text-secondary border-border-subtle", count: 87, impact: "-0.1%", impactColor: "text-secondary" },
  ];

  return (
    <div className="p-6 md:p-12 space-y-8 select-none">
      {/* Top KPI Row: 4 Modular Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1: Plant Health */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">PLANT HEALTH SCORE</span>
            <span className="bg-[#ecfdf3] text-[#027a48] px-2 py-0.5 text-[11px] font-bold tracking-widest uppercase border border-[#027a48]/20 font-mono-data">
              NOMINAL
            </span>
          </div>
          <div>
            <div className="text-[44px] font-bold leading-none tracking-tight font-mono-data text-primary mb-1">
              {farm.health_score}<span className="text-xl text-secondary font-sans">/100</span>
            </div>
            <div className="font-body-sm text-body-sm text-secondary">Operational baseline within tolerance</div>
          </div>
        </div>

        {/* Card 2: Active Modules */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">ACTIVE PV MODULES</span>
            <span className="bg-[#f0f2f5] text-primary px-2 py-0.5 text-[11px] font-bold tracking-widest uppercase border border-border-subtle font-mono-data">
              {farm.inverter_count} INVERTERS
            </span>
          </div>
          <div>
            <div className="text-[44px] font-bold leading-none tracking-tight font-mono-data text-primary mb-1">
              {farm.total_modules.toLocaleString()}
            </div>
            <div className="font-body-sm text-body-sm text-secondary">{farm.capacity_mw} MW Rated Peak DC Capacity</div>
          </div>
        </div>

        {/* Card 3: Est Daily Loss */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">ESTIMATED DAILY LOSS</span>
            <span className="bg-[#fffaeb] text-[#b54708] px-2 py-0.5 text-[11px] font-bold tracking-widest uppercase border border-[#b54708]/20 font-mono-data">
              REVENUE RISK
            </span>
          </div>
          <div>
            <div className="text-[32px] font-bold leading-none tracking-tight font-mono-data text-primary mb-2 mt-2">
              {farm.total_daily_loss_kwh} <span className="text-lg font-sans">kWh/d</span>
            </div>
            <div className="font-body-sm text-body-sm text-secondary">≈ ${farm.total_daily_loss_usd}/day (${Math.round(farm.total_daily_loss_usd * 365).toLocaleString()}/yr potential delta)</div>
          </div>
        </div>

        {/* Card 4: Tickets */}
        <div className="bg-surface-container-lowest border border-border-subtle p-6 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">ACTIVE O&amp;M TICKETS</span>
            <span className="bg-[#fef3f2] text-[#d92d20] px-2 py-0.5 text-[11px] font-bold tracking-widest uppercase border border-[#d92d20]/20 font-mono-data">
              {farm.critical_count} CRITICAL
            </span>
          </div>
          <div>
            <div className="text-[44px] font-bold leading-none tracking-tight font-mono-data text-primary mb-1">
              {farm.open_work_orders}
            </div>
            <div className="font-body-sm text-body-sm text-secondary">Bypass diode replacements scheduled</div>
          </div>
        </div>
      </section>

      {/* Main Body (7:5 Split) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Health & Defects) - Span 7 */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Plant Health Distribution */}
          <div className="bg-surface-container-lowest border border-border-subtle p-6">
            <h3 className="font-headline-md text-headline-md font-bold text-primary mb-4 border-b border-border-subtle pb-2">
              Plant Health Distribution
            </h3>
            <div className="h-8 w-full flex mb-4 border border-border-strong overflow-hidden">
              <div className="h-full bg-[#027a48]" style={{ width: "92%" }} title="Nominal (92%)" />
              <div className="h-full bg-[#b54708]" style={{ width: "6%" }} title="Warning (6%)" />
              <div className="h-full bg-[#d92d20]" style={{ width: "2%" }} title="Critical (2%)" />
            </div>
            <div className="flex justify-between text-xs font-mono-data border-t border-border-subtle pt-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#027a48] mr-2" />
                <span className="text-secondary mr-2 uppercase">NOMINAL:</span> 1,104
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#b54708] mr-2" />
                <span className="text-secondary mr-2 uppercase">WARNING:</span> 72
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#d92d20] mr-2" />
                <span className="text-secondary mr-2 uppercase">CRITICAL:</span> 24
              </div>
            </div>
          </div>

          {/* Defect Taxonomy Table */}
          <div className="bg-surface-container-lowest border border-border-subtle">
            <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-surface-bright">
              <h3 className="font-headline-md text-sm font-bold text-primary uppercase">Defect Taxonomy</h3>
              <span className="font-mono-data text-xs text-secondary font-bold">5 ACTIVE CLASSES</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container-low border-b border-border-subtle text-label-caps font-label-caps text-secondary uppercase">
                    <th className="py-3 px-4 w-1/3">Classification</th>
                    <th className="py-3 px-4">Severity</th>
                    <th className="py-3 px-4 text-right">Count</th>
                    <th className="py-3 px-4 text-right">Yield Impact</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-xs divide-y divide-border-subtle font-mono-data">
                  {defectTaxonomy.map((d, i) => (
                    <tr key={i} className="hover:bg-surface-container transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-primary">{d.name}</td>
                      <td className="py-3 px-4">
                        <span className={`border px-2 py-0.5 text-[10px] font-bold uppercase font-label-caps ${d.severityColor}`}>
                          {d.severity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-primary font-bold">{d.count}</td>
                      <td className={`py-3 px-4 text-right font-bold ${d.impactColor}`}>{d.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (SCADA & Actions) - Span 5 */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* AI-Guided SCADA Directive */}
          <div className="bg-surface-container-lowest border-2 border-border-strong relative">
            <div className="bg-[#f0f9ff] border-b-2 border-border-strong px-4 py-3 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#0369a1]" />
              <span className="font-label-caps text-label-caps uppercase text-[#0369a1] font-bold tracking-widest">
                AI-Guided SCADA Directive
              </span>
            </div>
            <div className="p-5">
              <p className="font-body-sm text-body-sm mb-6 leading-relaxed text-primary">
                Inverter <span className="font-bold font-mono-data bg-surface-container-low px-1.5 py-0.5 border border-border-subtle">INV-02</span> String <span className="font-bold font-mono-data bg-surface-container-low px-1.5 py-0.5 border border-border-subtle">STR04</span> showing <span className="font-mono-data font-bold text-[#d92d20]">-28.5%</span> power drop. AI directs targeted inspection to Rows 4-6, Columns 25-40.
              </p>
              <button
                onClick={() => onNavigateTab("scada")}
                className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-3.5 uppercase tracking-wider text-xs border-2 border-primary hover:bg-surface-container-lowest hover:text-primary transition-colors flex justify-center items-center gap-2 group font-bold"
              >
                <span>DISPATCH ROUTE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* High-Priority Action Queue */}
          <div className="bg-surface-container-lowest border border-border-subtle flex-grow flex flex-col">
            <div className="p-4 border-b border-border-subtle bg-surface-bright flex items-center justify-between">
              <h3 className="font-headline-md text-sm font-bold text-primary uppercase">High-Priority Action Queue</h3>
              <span className="bg-primary text-on-primary text-[10px] px-2 py-0.5 font-mono-data font-bold uppercase">2 PENDING</span>
            </div>

            <div className="flex-grow p-4 space-y-4">
              {/* Action Item 1 */}
              <div 
                onClick={() => onNavigateTab("map")}
                className="border border-border-strong p-3.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200 group bg-surface-container-lowest cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold font-mono-data text-base text-primary group-hover:text-[#d92d20] transition-colors">
                    #R12-C37
                  </div>
                  <button className="text-[10px] font-bold tracking-widest border border-border-strong px-2 py-1 uppercase hover:bg-primary hover:text-on-primary transition-colors">
                    Inspect
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border-subtle font-mono-data">
                  <div>
                    <div className="text-[10px] uppercase text-secondary font-bold tracking-wider mb-1 font-sans">Health Score</div>
                    <div className="text-[#d92d20] font-bold text-sm">14<span className="text-xs text-secondary font-normal font-sans">/100</span></div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-secondary font-bold tracking-wider mb-1 font-sans">Temp Delta</div>
                    <div className="text-[#d92d20] font-bold text-sm">+18.4°C</div>
                  </div>
                </div>
              </div>

              {/* Action Item 2 */}
              <div 
                onClick={() => onNavigateTab("map")}
                className="border border-border-strong p-3.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200 group bg-surface-container-lowest cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold font-mono-data text-base text-primary group-hover:text-[#b54708] transition-colors">
                    #R04-C18
                  </div>
                  <button className="text-[10px] font-bold tracking-widest border border-border-strong px-2 py-1 uppercase hover:bg-primary hover:text-on-primary transition-colors">
                    Inspect
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border-subtle font-mono-data">
                  <div>
                    <div className="text-[10px] uppercase text-secondary font-bold tracking-wider mb-1 font-sans">Health Score</div>
                    <div className="text-[#b54708] font-bold text-sm">42<span className="text-xs text-secondary font-normal font-sans">/100</span></div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-secondary font-bold tracking-wider mb-1 font-sans">Temp Delta</div>
                    <div className="text-[#b54708] font-bold text-sm">+5.1°C</div>
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
