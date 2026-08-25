import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  Printer, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import AuditCertificateModal from "./AuditCertificateModal";

export default function ReportsHub({ farm }) {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [currency, setCurrency] = useState("INR");

  const reportsList = [
    {
      id: "REP-2026-08-25",
      title: "Comprehensive IEC 62446-3 Aerial & Ground Diagnostic Audit",
      date: "25 Aug 2026",
      modules_scanned: 1200,
      anomalies_detected: 4,
      health_score: 97,
      loss_kwh: "4.2 kWh/d",
      annual_revenue_risk: "₹1,55,930 / yr ($1,870 / yr)",
      auditor: "Capt. A. Nair (Level-III Thermographer #8492)",
      status: "Verified & Certified"
    },
    {
      id: "REP-2026-08-10",
      title: "Handheld Spot Thermography & Inverter DC Bus Audit",
      date: "10 Aug 2026",
      modules_scanned: 480,
      anomalies_detected: 6,
      health_score: 93,
      loss_kwh: "8.4 kWh/d",
      annual_revenue_risk: "₹3,12,000 / yr ($3,740 / yr)",
      auditor: "Capt. A. Nair (#8492)",
      status: "Archived"
    },
    {
      id: "REP-2026-07-28",
      title: "Smartphone Ground Macro & Optical Busbar Analysis",
      date: "28 Jul 2026",
      modules_scanned: 360,
      anomalies_detected: 8,
      health_score: 88,
      loss_kwh: "16.2 kWh/d",
      annual_revenue_risk: "₹4,82,000 / yr ($5,780 / yr)",
      auditor: "Tech #04 (R. Sharma)",
      status: "Archived"
    }
  ];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              AUDIT COMPLIANCE & CERTIFICATES
            </span>
            <span className="font-mono-data text-xs text-secondary">
              IEC 62446-3 Verified Reports
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Official Audit Reports & IEC 62446-3 Certificates
          </h1>
        </div>

        {/* 1-Click Generate Printable Certificate */}
        <button
          onClick={() => setShowCertificateModal(true)}
          className="bg-primary text-white font-mono-data text-xs font-bold py-2.5 px-5 uppercase tracking-wider border-2 border-primary hover:bg-white hover:text-primary transition-all flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Award className="w-4 h-4 text-warning" />
          <span>VIEW PRINTABLE IEC CERTIFICATE</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4 font-mono-data text-xs">
        {reportsList.map((r) => (
          <div key={r.id} className="border-2 border-border-strong bg-white p-6 shadow-xs space-y-3 hover:border-primary transition-all">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary uppercase font-bold block">{r.id} · {r.date}</span>
                <h3 className="text-base text-primary font-bold font-mono-data mt-0.5">{r.title}</h3>
                <span className="text-secondary text-xs font-sans">Audited By: <strong>{r.auditor}</strong></span>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold uppercase">
                ✓ {r.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface p-3 border border-border-subtle">
              <div><span className="text-[10px] text-secondary font-sans uppercase block font-bold">Modules Scanned:</span><strong className="text-primary text-sm">{r.modules_scanned} Panels</strong></div>
              <div><span className="text-[10px] text-secondary font-sans uppercase block font-bold">Health Score:</span><strong className="text-[#027a48] text-sm">{r.health_score} / 100</strong></div>
              <div><span className="text-[10px] text-secondary font-sans uppercase block font-bold">Daily Defect Loss:</span><strong className="text-critical text-sm">{r.loss_kwh}</strong></div>
              <div><span className="text-[10px] text-secondary font-sans uppercase block font-bold">Revenue Protected:</span><strong className="text-primary text-sm">{r.annual_revenue_risk}</strong></div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-secondary text-[11px] font-sans">Includes radiometric thermal IR proof scans & SHA-256 validation hash.</span>
              <button
                onClick={() => setShowCertificateModal(true)}
                className="text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>OPEN OFFICIAL PDF CERTIFICATE →</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showCertificateModal && (
        <AuditCertificateModal
          farm={farm}
          onClose={() => setShowCertificateModal(false)}
        />
      )}
    </div>
  );
}
