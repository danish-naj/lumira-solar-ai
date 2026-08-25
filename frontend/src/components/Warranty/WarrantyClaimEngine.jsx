import React, { useState } from "react";
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  DollarSign, 
  Layers, 
  Printer, 
  ArrowRight,
  Scale
} from "lucide-react";

export default function WarrantyClaimEngine({ farm }) {
  const [selectedManufacturer, setSelectedManufacturer] = useState("longi");
  const [claimGenerated, setClaimGenerated] = useState(false);

  const oemClaims = [
    {
      id: "CLM-LONGi-2026-08",
      oem: "LONGi Solar Technology Co., Ltd.",
      module_model: "Hi-MO 6 Explorer LR5-72HTH-540M",
      batch_id: "BATCH-LONGi-2024-Q3",
      defective_units: 34,
      defect_type: "Bypass Diode Thermal Runaway & Reverse Breakdown",
      warranty_clause: "Clause 4.2: 12-Year Product Workmanship & 25-Year Linear Power Warranty",
      total_claim_inr: "₹4,82,000",
      total_claim_usd: "$5,780",
      status: "Dossier Compiled · Ready for OEM Legal Filing",
      evidence_count: "34 Radiometric Thermograms + I-V Curves"
    },
    {
      id: "CLM-JINKO-2026-07",
      oem: "JinkoSolar Holding Co., Ltd.",
      module_model: "Tiger Pro 72HC 540W",
      batch_id: "BATCH-JINKO-2024-Q1",
      defective_units: 18,
      defect_type: "Wafer Busbar Micro-fissures",
      warranty_clause: "Clause 3.1: Material Defect & Frontsheet Delamination",
      total_claim_inr: "₹2,45,000",
      total_claim_usd: "$2,940",
      status: "Settled & Reimbursed (100%)",
      evidence_count: "18 EL Night Tomograms"
    }
  ];

  const currentClaim = oemClaims.find(c => c.id.toLowerCase().includes(selectedManufacturer)) || oemClaims[0];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              AI OEM WARRANTY CLAIM & DISPUTE DOSSIER ENGINE
            </span>
            <span className="font-mono-data text-xs text-secondary">
              IEC 61215 / IEC 61730 Legal Claim Automator
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Automated Tier-1 Manufacturer Warranty Dispute Generator
          </h1>
        </div>

        {/* Claim Total */}
        <div className="border-2 border-primary bg-white px-4 py-2 text-right font-mono-data text-xs shadow-xs">
          <span className="text-[10px] text-secondary uppercase font-bold block">TOTAL REIMBURSEMENT VALUE</span>
          <strong className="text-xl font-bold text-[#027a48] block">₹7,27,000 <span className="text-xs text-secondary font-normal font-sans">($8,720)</span></strong>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
        {/* Left Column: Claim Builder & Evidence Package (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">CLAIM DOSSIER ID: {currentClaim.id}</span>
                <strong className="text-base text-primary font-mono-data block mt-0.5">{currentClaim.oem}</strong>
                <span className="text-secondary text-xs font-sans">Model: <strong>{currentClaim.module_model}</strong></span>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2.5 py-1 text-xs font-bold uppercase">
                {currentClaim.status.split("·")[0]}
              </span>
            </div>

            {/* Claim Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-surface p-4 border border-border-subtle font-sans text-xs">
              <div><span className="text-secondary">Defective Units:</span> <strong className="font-mono-data text-critical text-sm block">{currentClaim.defective_units} Panels</strong></div>
              <div><span className="text-secondary">Batch Identifier:</span> <strong className="font-mono-data text-primary block">{currentClaim.batch_id}</strong></div>
              <div><span className="text-secondary">Total Reimbursement:</span> <strong className="font-mono-data text-[#027a48] text-sm block">{currentClaim.total_claim_inr}</strong></div>
            </div>

            {/* Legal Warranty Clause */}
            <div className="space-y-1 font-sans">
              <strong className="text-primary font-mono-data text-xs uppercase block">APPLICABLE LEGAL WARRANTY CLAUSE:</strong>
              <p className="bg-surface p-3 border border-border-subtle text-secondary text-xs leading-relaxed">
                {currentClaim.warranty_clause}. Under IEC 61215 degradation limits, the observed $-22.5\%$ string mismatch exceeds the allowable $0.55\%/	ext{yr}$ power degradation threshold.
              </p>
            </div>

            {/* Attached Evidence Package */}
            <div className="space-y-1 font-sans">
              <strong className="text-primary font-mono-data text-xs uppercase block">ATTACHED SCIENTIFIC EVIDENCE PACKAGE:</strong>
              <div className="p-3 bg-[#f6fef9] border border-[#abefc6] text-[#027a48] text-xs font-medium space-y-1">
                <div>✓ 34 High-GSD Radiometric Thermal Thermograms with ΔT &gt; +18.4°C</div>
                <div>✓ Inverter INV-04 String SCADA I-V Curve Inflection logs</div>
                <div>✓ Level-III Thermographer QR Cryptographic Sign-Off Certificate</div>
              </div>
            </div>

            {/* 1-Click Generate Dossier Button */}
            <button
              onClick={() => setClaimGenerated(true)}
              className="w-full bg-primary text-white font-bold py-3.5 px-4 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs mt-2"
            >
              <span>EXPORT OFFICIAL LEGAL OEM DISPUTE DOSSIER (PDF) →</span>
              <FileText className="w-4 h-4" />
            </button>

            {claimGenerated && (
              <div className="bg-[#ecfdf3] border-2 border-[#027a48] p-3 text-center text-xs font-bold text-[#027a48] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>OFFICIAL WARRANTY CLAIM DOSSIER COMPILED · TRANSMITTED TO LONGI LEGAL COUNSEL</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Manufacturer Selector & Historical Reimbursements (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs">
            <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-2">
              ACTIVE OEM MODULE SUPPLIERS:
            </strong>

            <div className="space-y-2">
              {oemClaims.map((claim) => (
                <div
                  key={claim.id}
                  onClick={() => setSelectedManufacturer(claim.oem.toLowerCase().includes("longi") ? "longi" : "jinko")}
                  className={`p-3.5 border transition-all cursor-pointer bg-surface hover:bg-white ${
                    selectedManufacturer === (claim.oem.toLowerCase().includes("longi") ? "longi" : "jinko")
                      ? "border-primary bg-[#f6fef9] shadow-xs"
                      : "border-border-subtle hover:border-primary"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <strong className="text-primary text-xs font-bold">{claim.oem}</strong>
                    <strong className="text-[#027a48]">{claim.total_claim_inr}</strong>
                  </div>
                  <span className="text-[11px] text-secondary font-sans block">{claim.module_model}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
