import os

CERT_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Reports\AuditCertificateModal.jsx"

p1 = """import React from "react";
import { X, Award, CheckCircle2, Download, Printer, ShieldCheck, QrCode } from "lucide-react";

export default function AuditCertificateModal({ farm, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-white border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-3xl max-h-[90vh] overflow-y-auto font-sans p-8 space-y-6 relative custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-primary p-1 border border-transparent hover:border-primary cursor-pointer print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Outer Border Frame */}
        <div className="border-2 border-primary p-6 space-y-6 bg-surface">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-primary pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-6 h-6 text-primary" />
                <span className="font-mono-data text-xs font-bold text-secondary uppercase tracking-widest">
                  INTERNATIONAL ELECTROTECHNICAL COMMISSION
                </span>
              </div>
              <h1 className="font-headline-lg text-2xl font-black text-primary tracking-tight">
                IEC 62446-3 PHOTOVOLTAIC AUDIT CERTIFICATE
              </h1>
              <p className="text-secondary text-xs mt-0.5">
                Official Tier-1 High-GSD Radiometric Thermography & Optical Inspection Audit
              </p>
            </div>

            <div className="text-right font-mono-data text-xs">
              <span className="text-[10px] text-secondary uppercase block font-bold">CERTIFICATE ID:</span>
              <strong className="text-primary text-sm font-bold">CERT-IEC-84920-IND</strong>
              <span className="text-[#027a48] font-bold block text-[10px]">✓ VERIFIED TIER-1</span>
            </div>
          </div>

          {/* Plant & Inspection Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-data text-xs bg-white p-4 border border-border-strong">
            <div><span className="text-[10px] text-secondary uppercase block">ASSET NAME</span><strong className="text-primary">{farm?.name || "Bhadla Sector 4"}</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">RATED CAPACITY</span><strong className="text-primary">50.0 MWp DC</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">AUDIT DATE</span><strong className="text-primary">26 Aug 2026</strong></div>
            <div><span className="text-[10px] text-secondary uppercase block">HEALTH SCORE</span><strong className="text-[#027a48] text-sm">97 / 100</strong></div>
          </div>

          {/* Verification Scope & Technical Statement */}
          <div className="space-y-2 text-xs font-sans text-primary leading-relaxed">
            <p>
              This document certifies that the 50.0 MWp photovoltaic generating facility located at <strong>Phalodi District, Rajasthan</strong> has undergone comprehensive multi-spectral aerial thermographic inspection in full accordance with <strong>IEC 62446-3:2017 standards</strong>.
            </p>
            <p>
              All 1,200 surveyed module strings, bypass diodes, and combiner busbars were scanned at an irradiance of <strong>942 W/m² (GHI)</strong> under calibrated flight geometry. Isolated hotspots have undergone verified remediation with post-repair delta temperature normalization ($\Delta T &lt; 0.4^\circ\text{C}$).
            </p>
          </div>

          {/* Thermal Proof Image & Signatures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Scannable QR Code Box */}
            <div className="border border-border-strong bg-white p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-[#0f172a] flex items-center justify-center text-white shrink-0">
                <QrCode className="w-12 h-12" />
              </div>
              <div className="font-mono-data text-[10px] text-secondary space-y-0.5">
                <strong className="text-primary block">DIGITAL TWIN VERIFICATION</strong>
                <span>Scan to verify immutable SHA-256 digital certificate ledger hash:</span>
                <span className="font-mono-data text-primary block truncate">0x84f9...29a1</span>
              </div>
            </div>

            {/* Auditor Signature */}
            <div className="border border-border-strong bg-white p-4 font-mono-data text-xs space-y-1">
              <span className="text-[10px] text-secondary uppercase block">LEAD CERTIFIED AUDITOR:</span>
              <strong className="text-primary text-sm block">Capt. A. Nair (#8492)</strong>
              <span className="text-secondary text-[11px]">Level-III Certified Thermographer</span>
              <span className="text-[#027a48] text-[10px] font-bold block pt-1">✓ DIGITALLY SIGNED</span>
            </div>
          </div>
        </div>

        {/* Print / Download Bar */}
        <div className="flex justify-between items-center print:hidden border-t border-border-subtle pt-4 font-mono-data text-xs">
          <span className="text-secondary">Print or export to PDF for official compliance submission.</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="bg-white border border-border-strong px-4 py-2 text-xs uppercase font-bold text-secondary hover:text-primary cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="bg-primary text-white font-bold px-6 py-2 text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white hover:text-primary border border-primary transition-all cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / SAVE AS PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(CERT_FILE, "w", encoding="utf-8") as f:
    f.write(p1)

print("Created AuditCertificateModal.jsx")
