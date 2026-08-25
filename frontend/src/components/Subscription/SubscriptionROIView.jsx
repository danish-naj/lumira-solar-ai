import React, { useState } from "react";
import { 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  Calendar, 
  Clock, 
  Download, 
  ShieldCheck, 
  Zap, 
  DollarSign, 
  Plane, 
  Thermometer, 
  Smartphone, 
  Layers, 
  FileText, 
  ArrowUpRight, 
  BarChart3, 
  Activity,
  Check
} from "lucide-react";

export default function SubscriptionROIView({ farm }) {
  const [currency, setCurrency] = useState("INR");

  // Historical Inspection Missions Log (28 total completed)
  const inspectionHistory = [
    { id: "MIS-8492", date: "2026-08-25", modality: "Drone Orthomosaic (IR+RGB)", modules_scanned: 1200, defects_found: 4, status: "Active / Submitted", pilot: "Capt. A. Nair (#8492)" },
    { id: "MIS-8488", date: "2026-08-10", modality: "Handheld Thermal (FLIR)", modules_scanned: 480, defects_found: 6, status: "Completed & Remediated", pilot: "Capt. A. Nair (#8492)" },
    { id: "MIS-8482", date: "2026-07-28", modality: "Smartphone Ground Macro", modules_scanned: 360, defects_found: 8, status: "Completed & Remediated", pilot: "Tech #04 (R. Sharma)" },
    { id: "MIS-8475", date: "2026-07-15", modality: "Drone Survey (Aerial Ortho)", modules_scanned: 1200, defects_found: 12, status: "Completed & Remediated", pilot: "Capt. A. Nair (#8492)" },
    { id: "MIS-8469", date: "2026-06-30", modality: "Ground Rover Multi-Angle", modules_scanned: 600, defects_found: 9, status: "Completed & Remediated", pilot: "Rover Auto Pilot" },
    { id: "MIS-8460", date: "2026-06-12", modality: "Handheld Thermal (FLIR)", modules_scanned: 480, defects_found: 14, status: "Completed & Remediated", pilot: "Capt. A. Nair (#8492)" },
  ];

  // Month-by-Month Plant Health Progression
  const healthTimeline = [
    { month: "May 2026", health: 82, loss_kwh: 24.5, defects_cleared: 18, status: "Baseline Audit" },
    { month: "Jun 2026", health: 88, loss_kwh: 16.2, defects_cleared: 26, status: "Drone Remediation" },
    { month: "Jul 2026", health: 93, loss_kwh: 8.4, defects_cleared: 24, status: "Inverter Balance" },
    { month: "Aug 2026", health: 97, loss_kwh: 4.2, defects_cleared: 18, status: "Optimal (Tier-1)" },
  ];

  // Invoices & Billing Receipts
  const billingHistory = [
    { invoice: "INV-2026-08", date: "01 Aug 2026", amount_inr: "₹20,000", amount_usd: "$240", plan: "Enterprise Solar Asset Plan (Monthly)", status: "Paid" },
    { invoice: "INV-2026-07", date: "01 Jul 2026", amount_inr: "₹20,000", amount_usd: "$240", plan: "Enterprise Solar Asset Plan (Monthly)", status: "Paid" },
    { invoice: "INV-2026-06", date: "01 Jun 2026", amount_inr: "₹20,000", amount_usd: "$240", plan: "Enterprise Solar Asset Plan (Monthly)", status: "Paid" },
    { invoice: "INV-2026-05", date: "01 May 2026", amount_inr: "₹20,000", amount_usd: "$240", plan: "Enterprise Solar Asset Plan (Monthly)", status: "Paid" },
  ];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              ENTERPRISE SUBSCRIPTION & ROI AUDIT
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Client: CleanEnergy Global Assets India Ltd.
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Subscription Benefits, Financial ROI & Inspection History
          </h1>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1 border-2 border-primary p-1 bg-white font-mono-data text-xs shadow-xs">
          <button
            onClick={() => setCurrency("INR")}
            className={`px-3 py-1 font-bold transition-all cursor-pointer ${
              currency === "INR" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
            }`}
          >
            INR (₹)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1 font-bold transition-all cursor-pointer ${
              currency === "USD" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* 1. Executive Plan Card & Key Cumulative ROI Numbers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Plan Card (5 Cols) */}
        <div className="lg:col-span-5 border-2 border-primary bg-white p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start border-b border-border-subtle pb-3 mb-3">
              <div>
                <span className="text-[10px] font-mono-data font-bold text-secondary uppercase block">
                  ACTIVE ENTERPRISE CONTRACT
                </span>
                <h3 className="font-bold text-lg text-primary font-mono-data">
                  LUMIRA ENTERPRISE TIER
                </h3>
              </div>
              <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2 py-0.5 text-[9px] font-bold font-mono-data uppercase">
                ACTIVE
              </span>
            </div>

            <div className="mb-4">
              <strong className="text-3xl font-black text-primary font-mono-data block">
                {currency === "INR" ? "₹2,40,000 / yr" : "$2,880 / yr"}
              </strong>
              <span className="text-secondary text-xs">Billed Monthly (₹20,000/mo) · Renews Oct 2027</span>
            </div>

            <div className="space-y-2 text-xs font-sans text-primary border-t border-border-subtle pt-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#027a48]" />
                <span>Unlimited Drone Orthomosaic & Thermal IR AI Diagnoses</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#027a48]" />
                <span>Closed-Loop Client Approval & Service Team SLA Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#027a48]" />
                <span>IEC 62446-3 Certified Audit Reports with QR Signatures</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#027a48]" />
                <span>24/7 String SCADA Telemetry & Pyranometer Weather Feed</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle flex justify-between items-center text-xs font-mono-data text-secondary">
            <span>License ID: LUM-ENT-84920</span>
            <strong className="text-primary">240-Acre Coverage</strong>
          </div>
        </div>

        {/* Cumulative ROI & Benefits KPIs (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-data text-xs">
          <div className="border-2 border-[#027a48] bg-[#f6fef9] p-5 space-y-1 shadow-xs">
            <span className="text-[10px] text-[#027a48] uppercase font-sans font-bold block">Total Money Saved to Date</span>
            <strong className="text-3xl font-black text-[#027a48] block">
              {currency === "INR" ? "₹4,68,200" : "$5,618"}
            </strong>
            <span className="text-secondary text-[11px]">Direct revenue recovery from isolated hotspots</span>
          </div>

          <div className="border border-border-strong bg-white p-5 space-y-1 shadow-xs">
            <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Net Subscription ROI</span>
            <strong className="text-3xl font-black text-primary block">
              11.3x ROI
            </strong>
            <span className="text-[#027a48] text-[11px] font-bold">₹11.30 return per ₹1.00 spent</span>
          </div>

          <div className="border border-border-strong bg-white p-5 space-y-1 shadow-xs">
            <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Missions Conducted Over Period</span>
            <strong className="text-3xl font-black text-primary block">
              28 Completed
            </strong>
            <span className="text-secondary text-[11px]">14 Drone · 8 Thermal · 6 Smartphone</span>
          </div>

          <div className="border border-border-strong bg-white p-5 space-y-1 shadow-xs">
            <span className="text-[10px] text-secondary uppercase font-sans font-bold block">Defects Cleared & Verified</span>
            <strong className="text-3xl font-black text-primary block">
              86 Modules
            </strong>
            <span className="text-[#027a48] text-[11px] font-bold">100% Quality Assurance Rate</span>
          </div>
        </div>
      </div>

      {/* 2. Month-by-Month Plant Health Improvement Progression */}
      <div className="border border-border-strong bg-white p-6 space-y-4 shadow-xs font-mono-data text-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#027a48]" />
            <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
              HISTORICAL PLANT HEALTH PROGRESSION (82/100 ➔ 97/100)
            </h3>
          </div>
          <span className="text-[10px] text-[#027a48] font-bold">+15 PTS HEALTH RECOVERY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {healthTimeline.map((item, idx) => (
            <div key={idx} className="p-4 border border-border-subtle bg-surface space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-secondary font-bold text-[10px]">{item.month}</span>
                <span className="text-[9px] text-[#027a48] font-bold bg-[#ecfdf3] px-1.5 py-0.2 border border-[#abefc6]">
                  {item.status}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <strong className="text-3xl font-black text-primary">{item.health}</strong>
                <span className="text-secondary text-xs">/ 100</span>
              </div>
              <div className="text-[11px] text-secondary space-y-0.5 border-t border-border-subtle pt-2 font-sans">
                <div className="flex justify-between"><span>Daily Loss:</span> <strong className="font-mono-data text-primary">{item.loss_kwh} kWh/d</strong></div>
                <div className="flex justify-between"><span>Cleared:</span> <strong className="font-mono-data text-[#027a48]">{item.defects_cleared} Modules</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Completed Inspection Missions Table */}
      <div className="border border-border-strong bg-white p-6 space-y-4 shadow-xs font-mono-data text-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
            INSPECTION MISSIONS CONDUCTED OVER SUBSCRIPTION PERIOD (28 TOTAL)
          </h3>
          <span className="text-[10px] text-secondary">Showing Recent 6 Flights</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono-data">
            <thead>
              <tr className="bg-surface border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                <th className="py-3 px-4">Mission ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 font-sans">Modality & Hardware</th>
                <th className="py-3 px-4">Modules Captured</th>
                <th className="py-3 px-4">Defects Isolated</th>
                <th className="py-3 px-4 font-sans">Inspector / Pilot</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-xs">
              {inspectionHistory.map((m, idx) => (
                <tr key={idx} className="hover:bg-surface transition-colors">
                  <td className="py-3 px-4 font-bold text-primary">{m.id}</td>
                  <td className="py-3 px-4 text-secondary">{m.date}</td>
                  <td className="py-3 px-4 font-sans font-bold text-primary">{m.modality}</td>
                  <td className="py-3 px-4 font-bold">{m.modules_scanned} Modules</td>
                  <td className="py-3 px-4 text-critical font-bold">{m.defects_found} Anomalies</td>
                  <td className="py-3 px-4 font-sans text-secondary">{m.pilot}</td>
                  <td className="py-3 px-4">
                    <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2 py-0.5 text-[9px] font-bold uppercase">
                      ✓ {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Invoices & Billing History */}
      <div className="border border-border-strong bg-white p-6 space-y-4 shadow-xs font-mono-data text-xs">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <h3 className="font-headline-md text-xs font-bold uppercase tracking-wider text-primary">
            SUBSCRIPTION INVOICES & PAYMENT RECEIPTS
          </h3>
          <span className="text-[10px] text-[#027a48] font-bold">ALL PAYMENTS CURRENT</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono-data">
            <thead>
              <tr className="bg-surface border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Billing Date</th>
                <th className="py-3 px-4 font-sans">Subscription Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-xs">
              {billingHistory.map((b, idx) => (
                <tr key={idx} className="hover:bg-surface transition-colors">
                  <td className="py-3 px-4 font-bold text-primary">{b.invoice}</td>
                  <td className="py-3 px-4 text-secondary">{b.date}</td>
                  <td className="py-3 px-4 font-sans text-primary">{b.plan}</td>
                  <td className="py-3 px-4 font-bold text-primary">
                    {currency === "INR" ? b.amount_inr : b.amount_usd}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2 py-0.5 text-[9px] font-bold uppercase">
                      ✓ {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => alert(`Downloading ${b.invoice} official PDF receipt...`)}
                      className="text-primary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
