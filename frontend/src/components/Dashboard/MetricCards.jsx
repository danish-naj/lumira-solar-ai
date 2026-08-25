import React from "react";
import { Activity, Zap, AlertTriangle, DollarSign, Wrench, ShieldCheck } from "lucide-react";

export default function MetricCards({ farm }) {
  if (!farm) return null;

  const cards = [
    {
      label: "Plant Health Score",
      value: `${farm.health_score}/100`,
      sub: farm.health_score >= 85 ? "Optimal Baseline" : "Degraded Performance",
      icon: Activity,
      color: farm.health_score >= 85 ? "text-emerald-400" : farm.health_score >= 50 ? "text-amber-400" : "text-rose-400",
      bg: farm.health_score >= 85 ? "from-emerald-500/10 to-transparent border-emerald-500/30" : "from-amber-500/10 to-transparent border-amber-500/30",
    },
    {
      label: "Active Solar Modules",
      value: farm.total_modules.toLocaleString(),
      sub: `${farm.capacity_mw} MW Rated Capacity`,
      icon: Zap,
      color: "text-amber-400",
      bg: "from-amber-500/10 to-transparent border-slate-800",
    },
    {
      label: "Defect Alarms",
      value: `${farm.critical_count} Critical / ${farm.warning_count} Warning`,
      sub: `${farm.healthy_count} Healthy Modules`,
      icon: AlertTriangle,
      color: farm.critical_count > 0 ? "text-rose-400" : "text-emerald-400",
      bg: farm.critical_count > 0 ? "from-rose-500/10 to-transparent border-rose-500/30" : "from-emerald-500/10 to-transparent border-slate-800",
    },
    {
      label: "Estimated Daily Loss",
      value: `${farm.total_daily_loss_kwh} kWh/day`,
      sub: `≈ $${farm.total_daily_loss_usd} / day (₹${Math.round(farm.total_daily_loss_usd * 86.5)}/day)`,
      icon: DollarSign,
      color: "text-cyan-400",
      bg: "from-cyan-500/10 to-transparent border-slate-800",
    },
    {
      label: "Open Work Orders",
      value: farm.open_work_orders,
      sub: "Active O&M Tasks",
      icon: Wrench,
      color: "text-purple-400",
      bg: "from-purple-500/10 to-transparent border-slate-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className={`p-4 rounded-xl bg-gradient-to-br bg-slate-900 border ${card.bg} transition-all duration-200 hover:scale-[1.01]`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">{card.label}</span>
              <Icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <div className="text-xl font-bold font-mono text-white tracking-tight">{card.value}</div>
            <div className="text-[11px] text-slate-400 mt-1">{card.sub}</div>
          </div>
        );
      })}
    </div>
  );
}
