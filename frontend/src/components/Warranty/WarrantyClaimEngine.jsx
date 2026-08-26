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
  Scale,
  X,
  Check,
  Award
} from "lucide-react";

export default function WarrantyClaimEngine({ farm }) {
  const [selectedManufacturer, setSelectedManufacturer] = useState("longi");
  const [showDossierModal, setShowDossierModal] = useState(false);
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const oemClaims = [
    {
      id: "CLM-LONGi-2026-08",
      key: "longi",
      oem: "LONGi Solar Technology Co., Ltd.",
      headquarters: "No. 8369 Shangyuan Road, Caotan Eco-Tech Zone, Xi'an, Shaanxi, China",
      module_model: "Hi-MO 6 Explorer LR5-72HTH-540M",
      batch_id: "BATCH-LONGi-2024-Q3",
      defective_units: 34,
      defect_type: "Bypass Diode Thermal Runaway & Reverse Bias Breakdown",
      warranty_clause: "Clause 4.2: 12-Year Product Workmanship & 25-Year Linear Power Warranty",
      allowable_degradation: "0.55% / year maximum",
      measured_degradation: "22.5% string mismatch power drop",
      total_claim_inr: "₹4,82,000",
      total_claim_usd: "$5,780",
      status: "Dossier Compiled · Ready for Legal Filing",
      evidence_count: "34 Radiometric Thermograms + SCADA I-V Curves",
      serial_numbers: [
        "SN-LR5-72HTH-849201",
        "SN-LR5-72HTH-849202",
        "SN-LR5-72HTH-849203",
        "SN-LR5-72HTH-849204",
        "SN-LR5-72HTH-849205",
        "SN-LR5-72HTH-849206"
      ]
    },
    {
      id: "CLM-JINKO-2026-07",
      key: "jinko",
      oem: "JinkoSolar Holding Co., Ltd.",
      headquarters: "1 Jingke Road, Shangrao Economic Development Zone, Jiangxi, China",
      module_model: "Tiger Pro 72HC 540W",
      batch_id: "BATCH-JINKO-2024-Q1",
      defective_units: 18,
      defect_type: "Wafer Busbar Micro-fissures & Contact Metallization Peeling",
      warranty_clause: "Clause 3.1: Material Defect & Frontsheet Delamination Clause",
      allowable_degradation: "0.55% / year maximum",
      measured_degradation: "18.2% string mismatch power drop",
      total_claim_inr: "₹2,45,000",
      total_claim_usd: "$2,940",
      status: "Settled & Reimbursed (100%)",
      evidence_count: "18 EL Night Tomograms",
      serial_numbers: [
        "SN-JKM540M-72HL4-10491",
        "SN-JKM540M-72HL4-10492",
        "SN-JKM540M-72HL4-10493"
      ]
    },
    {
      id: "CLM-TRINA-2026-06",
      key: "trina",
      oem: "Trina Solar Co., Ltd.",
      headquarters: "No. 2 Tianhe Road, Trina PV Industrial Park, Changzhou, Jiangsu, China",
      module_model: "Vertex TSM-DEG21C.20 600W",
      batch_id: "BATCH-TRINA-2024-Q2",
      defective_units: 12,
      defect_type: "Internal Ribbon Lead Solder Joint Burnout",
      warranty_clause: "Clause 5.1: 25-Year Limited Power Output Guarantee",
      allowable_degradation: "0.45% / year maximum",
      measured_degradation: "15.4% power mismatch",
      total_claim_inr: "₹1,68,000",
      total_claim_usd: "$2,015",
      status: "In Dispute Review",
      evidence_count: "12 Thermal Spot Scans",
      serial_numbers: [
        "SN-TSM600-DEG21-3011",
        "SN-TSM600-DEG21-3012"
      ]
    },
    {
      id: "CLM-CANADIAN-2026-05",
      key: "canadian",
      oem: "Canadian Solar Inc.",
      headquarters: "545 Speedvale Avenue West, Guelph, Ontario, Canada",
      module_model: "BiHiKu7 CS7N-650MB-AG",
      batch_id: "BATCH-CSI-2024-Q4",
      defective_units: 8,
      defect_type: "Junction Box Sealant Degradation & Moisture Ingress",
      warranty_clause: "Clause 2.4: 12-Year Enhanced Product Warranty",
      allowable_degradation: "0.55% / year maximum",
      measured_degradation: "12.0% power mismatch",
      total_claim_inr: "₹1,12,000",
      total_claim_usd: "$1,345",
      status: "Dossier Compiled",
      evidence_count: "8 Optical Macro Scans",
      serial_numbers: [
        "SN-CS7N-650-9921",
        "SN-CS7N-650-9922"
      ]
    }
  ];

  const currentClaim = oemClaims.find(c => c.key === selectedManufacturer) || oemClaims[0];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              AI OEM WARRANTY CLAIM & LEGAL DISPUTE ENGINE
            </span>
            <span className="font-mono-data text-xs text-secondary">
              IEC 61215 / IEC 61730 Legal Claim Automator
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Automated Tier-1 Manufacturer Warranty Dispute Generator
          </h1>
        </div>

        {/* Total Reimbursement */}
        <div className="border-2 border-primary bg-white px-4 py-2 text-right font-mono-data text-xs shadow-xs">
          <span className="text-[10px] text-secondary uppercase font-bold block">TOTAL PORTFOLIO CLAIM VALUE</span>
          <strong className="text-xl font-bold text-[#027a48] block">₹10,07,000 <span className="text-xs text-secondary font-normal font-sans">($12,080)</span></strong>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
        {/* Left Column: Active Claim Dossier Builder (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-start border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase block">CLAIM DOSSIER ID: {currentClaim.id}</span>
                <strong className="text-base text-primary font-mono-data block mt-0.5">{currentClaim.oem}</strong>
                <span className="text-secondary text-xs font-sans">Module Model: <strong>{currentClaim.module_model}</strong></span>
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
                {currentClaim.warranty_clause}. Under IEC 61215 degradation standards, allowable linear degradation is limited to <strong>{currentClaim.allowable_degradation}</strong>. The measured <strong>{currentClaim.measured_degradation}</strong> constitutes an actionable breach of contract.
              </p>
            </div>

            {/* Serial Numbers Table */}
            <div className="space-y-1 font-sans">
              <strong className="text-primary font-mono-data text-xs uppercase block">DEFECTIVE MODULE SERIAL NUMBERS IN BATCH:</strong>
              <div className="p-3 bg-surface border border-border-subtle grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono-data text-[11px] text-primary">
                {currentClaim.serial_numbers.map((sn, idx) => (
                  <div key={idx} className="bg-white p-1.5 border border-border-strong text-center truncate">
                    {sn}
                  </div>
                ))}
              </div>
            </div>

            {/* Attached Evidence Package */}
            <div className="space-y-1 font-sans">
              <strong className="text-primary font-mono-data text-xs uppercase block">ATTACHED SCIENTIFIC EVIDENCE PACKAGE:</strong>
              <div className="p-3 bg-[#f6fef9] border border-[#abefc6] text-[#027a48] text-xs font-medium space-y-1">
                <div>✓ {currentClaim.evidence_count}</div>
                <div>✓ Inverter SCADA string I-V curve MPPT inflection logs</div>
                <div>✓ Level-III Certified Thermographer Cryptographic Sign-Off</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setShowDossierModal(true)}
                className="flex-1 bg-primary text-white font-bold py-3.5 px-4 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-between cursor-pointer shadow-xs"
              >
                <span>VIEW / PRINT OFFICIAL LEGAL DISPUTE DOSSIER →</span>
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Manufacturer Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-border-strong bg-white p-5 space-y-3 shadow-xs">
            <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-2">
              TIER-1 OEM MODULE MANUFACTURERS:
            </strong>

            <div className="space-y-2">
              {oemClaims.map((claim) => {
                const isSelected = selectedManufacturer === claim.key;
                return (
                  <div
                    key={claim.id}
                    onClick={() => setSelectedManufacturer(claim.key)}
                    className={`p-3.5 border transition-all cursor-pointer bg-surface hover:bg-white ${
                      isSelected ? "border-primary bg-[#f6fef9] ring-1 ring-primary shadow-xs" : "border-border-subtle hover:border-primary"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <strong className="text-primary text-xs font-bold">{claim.oem}</strong>
                      <strong className="text-[#027a48] font-mono-data">{claim.total_claim_inr}</strong>
                    </div>
                    <span className="text-[11px] text-secondary font-sans block">{claim.module_model}</span>
                    <div className="flex justify-between items-center text-[10px] text-secondary border-t border-border-subtle pt-1.5 mt-2">
                      <span>Units: <strong>{claim.defective_units} Panels</strong></span>
                      <span className="text-[#027a48] font-bold">{claim.status.split("·")[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRINTABLE OFFICIAL LEGAL DOSSIER MODAL */}
      {showDossierModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
          <div className="bg-white border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-4xl max-h-[90vh] overflow-y-auto font-sans p-8 space-y-6 relative custom-scrollbar">
            {/* Close Button */}
            <button
              onClick={() => setShowDossierModal(false)}
              className="absolute top-4 right-4 text-secondary hover:text-primary p-1 border border-transparent hover:border-primary cursor-pointer print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Legal Frame */}
            <div className="border-2 border-primary p-6 space-y-6 bg-surface">
              <div className="flex justify-between items-start border-b-2 border-primary pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Scale className="w-5 h-5 text-primary" />
                    <span className="font-mono-data text-xs font-bold text-secondary uppercase tracking-widest">
                      LEGAL NOTICE & FORMAL WARRANTY REIMBURSEMENT DEMAND
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-2xl font-black text-primary tracking-tight">
                    OFFICIAL OEM WARRANTY DISPUTE DOSSIER
                  </h1>
                  <p className="text-secondary text-xs mt-0.5">
                    Filed under IEC 61215 / IEC 61730 Accelerated Degradation & Workmanship Contractual Breach
                  </p>
                </div>
                <div className="text-right font-mono-data text-xs">
                  <span className="text-[10px] text-secondary uppercase block font-bold">DOSSIER ID:</span>
                  <strong className="text-primary text-sm font-bold">{currentClaim.id}</strong>
                  <span className="text-[#027a48] font-bold block text-[10px]">✓ CERTIFIED AUDIT</span>
                </div>
              </div>

              {/* Recipient & Claimant */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 border border-border-strong text-xs font-sans">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-data uppercase font-bold text-secondary block">RESPONDENT (MANUFACTURER):</span>
                  <strong className="text-primary block">{currentClaim.oem}</strong>
                  <span className="text-secondary text-[11px] block">{currentClaim.headquarters}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-data uppercase font-bold text-secondary block">CLAIMANT (ASSET OWNER):</span>
                  <strong className="text-primary block">{farm?.name || "CleanEnergy Global Assets - Bhadla Sector 4"}</strong>
                  <span className="text-secondary text-[11px] block">Phalodi District, Rajasthan, India</span>
                </div>
              </div>

              {/* Statement of Claim & Total */}
              <div className="space-y-2 text-xs font-sans text-primary leading-relaxed bg-white p-4 border border-border-strong">
                <p>
                  <strong>STATEMENT OF CLAIM:</strong> During the radiometric thermal thermography and optical inspection conducted on 26 Aug 2026, <strong>{currentClaim.defective_units} modules</strong> of model <strong>{currentClaim.module_model}</strong> (Batch: {currentClaim.batch_id}) demonstrated severe defect manifestation ({currentClaim.defect_type}), resulting in an unrecoverable <strong>{currentClaim.measured_degradation}</strong>.
                </p>
                <p>
                  Pursuant to <strong>{currentClaim.warranty_clause}</strong>, the claimant formally requests warranty replacement units or monetary indemnification of <strong>{currentClaim.total_claim_inr} ({currentClaim.total_claim_usd})</strong> within 30 business days.
                </p>
              </div>

              {/* Signatures */}
              <div className="p-4 bg-white border border-border-strong flex justify-between items-center text-xs font-sans">
                <div>
                  <span className="text-[10px] font-mono-data uppercase font-bold text-secondary block">CERTIFIED AUDITOR SIGN-OFF:</span>
                  <strong className="font-mono-data text-primary text-sm">Capt. A. Nair (#8492)</strong>
                  <span className="text-secondary block text-[11px]">Level-III Certified Thermographer · Cryptographic SHA-256 Hash Verified</span>
                </div>
                <span className="text-[#027a48] font-mono-data font-bold text-xs">✓ DIGITALLY SIGNED</span>
              </div>
            </div>

            {/* Print / Action Bar */}
            <div className="flex justify-between items-center print:hidden border-t border-border-subtle pt-4 font-mono-data text-xs">
              <span className="text-secondary">Export to PDF for formal legal filing with OEM counsel.</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDossierModal(false)}
                  className="bg-white border border-border-strong px-4 py-2 text-xs uppercase font-bold text-secondary hover:text-primary cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-primary text-white font-bold px-6 py-2 text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white hover:text-primary border border-primary transition-all cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>PRINT / SAVE AS PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
