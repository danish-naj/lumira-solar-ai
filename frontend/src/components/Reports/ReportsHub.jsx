import React, { useState, useEffect } from "react";
import { 
  Download, 
  Printer, 
  Sun, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  TrendingDown,
  Calendar,
  MapPin,
  FileText
} from "lucide-react";
import { fetchExecutiveReport, getExportCsvUrl } from "../../services/api";

export default function ReportsHub({ farm }) {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (farm) {
      fetchExecutiveReport(farm.id)
        .then((res) => {
          setReportData(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [farm]);

  const handlePrint = () => {
    window.print();
  };

  const criticalIssues = [
    {
      id: "R12-C37",
      type: "Thermal Hotspot",
      deltaT: "+18.4°C",
      loss: "1.42 kWh/d",
      remediation: "Immediate bypass diode replacement & junction cleaning.",
      isCritical: true,
    },
    {
      id: "R04-C18",
      type: "Microcrack",
      deltaT: "+5.1°C",
      loss: "0.88 kWh/d",
      remediation: "Monitor degradation; schedule panel replacement in Q4.",
      isCritical: false,
    },
    {
      id: "R07-C45",
      type: "Soiling / Shading",
      deltaT: "N/A",
      loss: "0.65 kWh/d",
      remediation: "Professional cleaning of Sector 4, Rows 7-9.",
      isCritical: false,
    },
  ];

  return (
    <div className="p-4 md:p-12 space-y-8 max-w-7xl mx-auto select-none bg-surface-container-lowest">
      {/* Top Action Toolbar (Page Specific) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-border-subtle pb-4">
        <h1 className="font-headline-md text-headline-md font-bold uppercase tracking-tight text-primary">
          EXECUTIVE ASSET HEALTH &amp; LOSS AUDIT REPORT
        </h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <a
            href={farm ? getExportCsvUrl(farm.id) : "#"}
            download
            className="flex-1 sm:flex-none px-6 py-3 border border-border-subtle bg-surface-container-lowest text-primary font-label-caps text-label-caps uppercase hover:bg-surface-container-high transition-colors text-center whitespace-nowrap font-bold flex items-center justify-center gap-2 text-xs"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT CSV</span>
          </a>
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none px-6 py-3 bg-primary text-on-primary font-label-caps text-label-caps uppercase hover:bg-surface-container-lowest hover:text-primary border border-primary transition-colors text-center whitespace-nowrap font-bold flex items-center justify-center gap-2 text-xs"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT AUDIT DOCUMENT</span>
          </button>
        </div>
      </div>

      {/* A4 Document Container */}
      <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white border border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 relative flex flex-col">
        {/* Document Header */}
        <div className="border-b-2 border-primary pb-6 mb-8 flex justify-between items-end">
          <div>
            <div className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2 mb-1">
              <Sun className="w-7 h-7 text-primary" />
              Lumira ✦
            </div>
            <h2 className="font-label-caps text-label-caps text-secondary tracking-widest uppercase font-bold">
              SOLAR ASSET INTELLIGENCE — AUDIT CERTIFICATE
            </h2>
          </div>
          <div className="text-right font-mono-data text-xs">
            <div className="text-secondary">DOC_ID: LSAI-20260824-B04</div>
            <div className="text-primary font-bold mt-1">STATUS: CERTIFIED</div>
          </div>
        </div>

        {/* Farm Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 border border-border-subtle p-6 bg-surface-bright">
          <div>
            <div className="font-label-caps text-label-caps text-secondary mb-2 uppercase font-bold text-[10px]">
              SITE &amp; LOCATION
            </div>
            <div className="font-body-sm text-body-sm font-semibold text-primary">
              {farm ? farm.name : "Bhadla Solar Park - Sector 4"}
            </div>
            <div className="font-body-sm text-body-sm text-secondary">
              {farm ? farm.location : "Rajasthan, India"} · {farm ? farm.capacity_mw : 50.0} MW
            </div>
          </div>

          <div className="md:border-l border-border-subtle md:pl-6">
            <div className="font-label-caps text-label-caps text-secondary mb-2 uppercase font-bold text-[10px]">
              AUDIT TIMESTAMP
            </div>
            <div className="font-mono-data text-mono-data text-primary text-xs font-bold">
              2026-08-24 14:32:00 UTC
            </div>
          </div>

          <div className="md:border-l border-border-subtle md:pl-6">
            <div className="font-label-caps text-label-caps text-secondary mb-2 uppercase font-bold text-[10px]">
              PLANT HEALTH SCORE
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold font-mono-data text-primary">
                {farm ? farm.health_score : 97}<span className="text-secondary text-lg font-normal font-sans">/100</span>
              </div>
              <div className="h-2 w-full bg-surface-variant flex-1 overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${farm ? farm.health_score : 97}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Summary Metric Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="border border-primary p-4 bg-surface-container-lowest">
            <div className="font-label-caps text-label-caps text-secondary mb-2 uppercase font-bold text-[10px]">
              TOTAL MODULES
            </div>
            <div className="font-mono-data text-2xl font-bold text-primary">
              {farm ? farm.total_modules.toLocaleString() : "1,200"} <span className="text-sm font-normal text-secondary font-sans">Units</span>
            </div>
          </div>

          <div className="border border-border-subtle border-l-4 !border-l-primary p-4 bg-surface-bright">
            <div className="font-label-caps text-label-caps text-secondary mb-2 flex items-center justify-between uppercase font-bold text-[10px]">
              CRITICAL FAULTS
              <div className="w-4 h-4 border border-primary flex items-center justify-center font-bold text-[10px] bg-surface-container-lowest">
                !
              </div>
            </div>
            <div className="font-mono-data text-2xl font-bold text-primary">
              {farm ? farm.critical_count : "4"} <span className="text-sm font-normal text-secondary font-sans">Units</span>
            </div>
          </div>

          <div className="border border-border-subtle p-4 bg-surface-container-lowest">
            <div className="font-label-caps text-label-caps text-secondary mb-2 uppercase font-bold text-[10px]">
              DAILY ENERGY LOSS
            </div>
            <div className="font-mono-data text-2xl font-bold text-primary">
              {farm ? farm.total_daily_loss_kwh : "4.24"} <span className="text-sm font-normal text-secondary font-sans">kWh/d</span>
            </div>
          </div>

          <div className="border border-border-subtle p-4 bg-surface-container-lowest">
            <div className="font-label-caps text-label-caps text-secondary mb-2 uppercase font-bold text-[10px]">
              ANNUAL REVENUE RISK
            </div>
            <div className="font-mono-data text-2xl font-bold text-primary">
              ${farm ? Math.round(farm.total_daily_loss_usd * 365).toLocaleString() : "1,548"}<span className="text-sm font-normal text-secondary font-sans">/yr</span>
            </div>
          </div>
        </div>

        {/* Critical Remediation Priority List (Table) */}
        <div className="mb-4">
          <h3 className="font-headline-md text-sm font-bold mb-4 border-b-2 border-primary pb-1 inline-block uppercase">
            CRITICAL REMEDIATION PRIORITY LIST
          </h3>
        </div>

        <div className="overflow-x-auto border border-border-subtle flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-bright border-b border-border-subtle">
                <th className="p-3.5 font-label-caps text-label-caps text-secondary uppercase font-bold">MODULE ID</th>
                <th className="p-3.5 font-label-caps text-label-caps text-secondary uppercase font-bold">DEFECT TYPE</th>
                <th className="p-3.5 font-label-caps text-label-caps text-secondary uppercase font-bold">ΔT (TEMP)</th>
                <th className="p-3.5 font-label-caps text-label-caps text-secondary uppercase font-bold">ENERGY LOSS</th>
                <th className="p-3.5 font-label-caps text-label-caps text-secondary uppercase font-bold w-[40%]">RECOMMENDED REMEDIATION</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-xs divide-y divide-border-subtle font-mono-data">
              {criticalIssues.map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3.5 font-bold text-primary flex items-center">
                    <span className={`w-2 h-2 inline-block rounded-full mr-2 ${row.isCritical ? "bg-primary" : "border border-primary"}`} />
                    {row.id}
                  </td>
                  <td className="p-3.5">
                    <div className="inline-flex items-center gap-1 bg-surface-variant px-2 py-0.5 rounded-none font-label-caps text-[10px] text-primary uppercase font-bold">
                      {row.type}
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-primary">{row.deltaT}</td>
                  <td className="p-3.5 font-bold text-primary">{row.loss}</td>
                  <td className="p-3.5 font-sans text-secondary">{row.remediation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-right font-mono-data text-[10px] text-secondary font-bold">
          END OF REPORT · LUMIRA AUTONOMOUS VERIFICATION SYSTEM
        </div>
      </div>
    </div>
  );
}
