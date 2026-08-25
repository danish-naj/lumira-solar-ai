import React from "react";
import { Search } from "lucide-react";

export default function MapControls({ filters, onFilterChange, searchTerm, onSearchChange, inverters = [] }) {
  const currentSeverity = filters.severity || "ALL";

  return (
    <div className="border-b border-border-subtle bg-white px-6 py-3 flex flex-wrap items-center justify-between gap-4 shrink-0 select-none">
      {/* Segmented Severity Filter */}
      <div className="flex items-center gap-1 border border-border-strong p-1 bg-surface-container-low font-sans">
        <button
          onClick={() => onFilterChange("severity", "ALL")}
          className={`px-3 py-1 text-xs font-bold transition-all ${
            currentSeverity === "ALL"
              ? "bg-primary text-on-primary border border-primary shadow-xs"
              : "text-secondary hover:bg-white border border-transparent"
          }`}
        >
          All States
        </button>
        <button
          onClick={() => onFilterChange("severity", "Critical")}
          className={`px-3 py-1 text-xs font-medium transition-all ${
            currentSeverity === "Critical"
              ? "bg-primary text-on-primary font-bold border border-primary shadow-xs"
              : "text-secondary hover:bg-white border border-transparent"
          }`}
        >
          🔴 Critical (&lt;50)
        </button>
        <button
          onClick={() => onFilterChange("severity", "Medium")}
          className={`px-3 py-1 text-xs font-medium transition-all ${
            currentSeverity === "Medium"
              ? "bg-primary text-on-primary font-bold border border-primary shadow-xs"
              : "text-secondary hover:bg-white border border-transparent"
          }`}
        >
          🟡 Warning (50-84)
        </button>
        <button
          onClick={() => onFilterChange("severity", "None")}
          className={`px-3 py-1 text-xs font-medium transition-all ${
            currentSeverity === "None"
              ? "bg-primary text-on-primary font-bold border border-primary shadow-xs"
              : "text-secondary hover:bg-white border border-transparent"
          }`}
        >
          🟢 Healthy (&gt;85)
        </button>
      </div>

      {/* Inverter & Search Box & Legend */}
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-secondary">Inverter:</span>
          <select
            value={filters.inverter_id || "ALL"}
            onChange={(e) => onFilterChange("inverter_id", e.target.value)}
            className="border-b border-border-strong border-t-0 border-l-0 border-r-0 bg-transparent text-primary text-xs font-mono-data py-1 focus:ring-0 focus:border-b-2 cursor-pointer"
          >
            <option value="ALL">ALL INVERTERS</option>
            {inverters.map((inv) => (
              <option key={inv} value={inv}>{inv}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-secondary absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search module ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-6 border-b border-border-strong border-t-0 border-l-0 border-r-0 bg-transparent text-xs py-1 w-36 focus:ring-0 focus:border-b-2 placeholder:text-secondary font-mono-data"
          />
        </div>

        <div className="flex gap-4 text-xs font-mono-data">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#ecfdf3] border border-[#abefc6]" />
            <span className="text-secondary text-[11px]">Healthy</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#fffaeb] border border-[#fedf89]" />
            <span className="text-secondary text-[11px]">Warning</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#fef3f2] border border-[#d92d20]" />
            <span className="text-secondary text-[11px]">Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
}
