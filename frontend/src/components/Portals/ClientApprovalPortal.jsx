import React, { useState } from "react";
import { 
  CheckCircle2, 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Check, 
  X, 
  Wrench, 
  TrendingUp, 
  Building2, 
  FileText, 
  UserCheck, 
  Sparkles,
  DollarSign
} from "lucide-react";

export default function ClientApprovalPortal({ 
  farm, 
  pendingReports = [], 
  onApproveReport, 
  onNavigateTab 
}) {
  const [approvedReports, setApprovedReports] = useState([]);
  const [activeTabFilter, setActiveTabFilter] = useState("pending");

  // Default initial pending proposals if none dynamically submitted
  const defaultPending = [
    {
      id: "REP-849201",
      farm_id: farm?.id || "farm-1",
      module_id: "R12-C37",
      defect_type: "Bypass Diode Thermal Runaway",
      severity: "Critical",
      delta_t: 18.4,
      daily_loss_kwh: 1.42,
      annual_revenue_risk: "₹44,050",
      estimated_repair_cost: "₹4,500",
      repair_action: "Replace sub-string Schottky bypass diode (15SQ045) & reseal junction box.",
      safety_caution: "HIGH ARC FLASH HAZARD (>600V DC). Lockout/Tagout Inverter INV-04 DC Combiner before contact.",
      inspector_name: "Capt. A. Nair (Certified Thermographer #8492)",
      inspection_source: "Handheld Thermal (FLIR)",
      submitted_at: "2026-08-25 09:30 AM",
      status: "Pending Client Approval",
      sla_hours: 24,
      recommended_tech: "Technician #04 (R. Sharma - High Voltage Specialist)"
    },
    {
      id: "REP-849202",
      farm_id: farm?.id || "farm-1",
      module_id: "R04-C18",
      defect_type: "Thermal Hotspot & Ribbon Burnout",
      severity: "Critical",
      delta_t: 24.5,
      daily_loss_kwh: 1.58,
      annual_revenue_risk: "₹48,900",
      estimated_repair_cost: "₹5,200",
      repair_action: "Solder internal ribbon lead & replace bypass sub-string module.",
      safety_caution: "Fire hazard risk. Isolate string combiner immediately.",
      inspector_name: "Capt. A. Nair (Certified Thermographer #8492)",
      inspection_source: "Drone Orthomosaic",
      submitted_at: "2026-08-25 10:15 AM",
      status: "Pending Client Approval",
      sla_hours: 24,
      recommended_tech: "Technician #02 (K. Verma - Lead Electrician)"
    }
  ];

  const allPending = [...pendingReports, ...defaultPending.filter(dp => !pendingReports.some(pr => pr.module_id === dp.module_id))];

  const handleApprove = (report) => {
    setApprovedReports(prev => [...prev, report.id]);
    if (onApproveReport) {
      onApproveReport(report);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* Client Portal Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              ASSET OWNER & IPP CLIENT PORTAL
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Client: CleanEnergy Global Assets India Ltd.
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            {farm?.name || "Bhadla Mega Solar Park - Sector 4"} (50.0 MW)
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono-data text-xs">
          <div className="border border-border-subtle bg-white px-3 py-1.5 text-center">
            <span className="text-[10px] text-secondary uppercase block font-sans">Plant Health</span>
            <strong className="text-primary text-sm">{farm?.health_score || 97}/100</strong>
          </div>
          <div className="border border-border-subtle bg-white px-3 py-1.5 text-center">
            <span className="text-[10px] text-secondary uppercase block font-sans">Pending Approvals</span>
            <strong className="text-critical text-sm">{allPending.length - approvedReports.length}</strong>
          </div>
        </div>
      </div>

      {/* Section 1: Pending Inspection & Repair Proposals for Client Approval */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-critical" />
            <h2 className="font-headline-md text-base font-bold text-primary uppercase tracking-wide">
              PENDING INSPECTION REPORTS & REPAIR PROPOSALS (ACTION REQUIRED)
            </h2>
          </div>
          <span className="text-xs font-mono-data text-secondary">
            Authorized Signer: Asset Management Director
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {allPending.map((rep) => {
            const isApproved = approvedReports.includes(rep.id);
            return (
              <div 
                key={rep.id} 
                className={`border-2 p-6 flex flex-col justify-between transition-all bg-white shadow-xs ${
                  isApproved ? "border-[#027a48] bg-[#f6fef9]" : "border-primary"
                }`}
              >
                <div>
                  {/* Card Top */}
                  <div className="flex justify-between items-start border-b border-border-subtle pb-3 mb-4">
                    <div>
                      <span className="text-[10px] font-mono-data font-bold text-secondary uppercase block">
                        REPORT ID: {rep.id} · {rep.submitted_at}
                      </span>
                      <h3 className="font-bold text-base text-primary font-mono-data mt-0.5">
                        PANEL #{rep.module_id} · {rep.defect_type}
                      </h3>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-bold uppercase font-mono-data border ${
                      isApproved 
                        ? "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]" 
                        : "bg-[#fef3f2] text-critical border-critical"
                    }`}>
                      {isApproved ? "✓ APPROVED & DISPATCHED" : "PENDING APPROVAL"}
                    </span>
                  </div>

                  {/* Financial & Technical Impact Grid */}
                  <div className="grid grid-cols-3 gap-2.5 bg-surface p-3 border border-border-subtle font-mono-data text-xs mb-4">
                    <div>
                      <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Thermal Delta</span>
                      <strong className="text-critical text-sm">+{rep.delta_t}°C</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Annual Loss Risk</span>
                      <strong className="text-primary text-sm">{rep.annual_revenue_risk}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-secondary font-sans uppercase block font-bold">Estimated Cost</span>
                      <strong className="text-[#027a48] text-sm">{rep.estimated_repair_cost}</strong>
                    </div>
                  </div>

                  {/* Required Repair Action */}
                  <div className="space-y-1 mb-3 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-primary uppercase font-mono-data text-[11px]">
                      <Wrench className="w-3.5 h-3.5 text-primary" />
                      <span>PROPOSED REMEDIATION ACTION:</span>
                    </div>
                    <p className="text-secondary bg-surface p-2.5 border border-border-subtle leading-relaxed">
                      {rep.repair_action}
                    </p>
                  </div>

                  {/* Safety Caution */}
                  <div className="space-y-1 mb-4 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-critical uppercase font-mono-data text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 text-critical" />
                      <span>SAFETY & WARRANTY CAUTION:</span>
                    </div>
                    <p className="text-critical bg-[#fef3f2] p-2.5 border border-critical/30 leading-relaxed font-medium">
                      {rep.safety_caution}
                    </p>
                  </div>

                  {/* Assigned Technician & SLA Preview */}
                  <div className="flex items-center justify-between text-xs font-mono-data text-secondary border-t border-border-subtle pt-3 mb-4">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-primary" />
                      <span>Auto-Assign: <strong>{rep.recommended_tech}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-primary font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>SLA: {rep.sla_hours} Hours</span>
                    </div>
                  </div>
                </div>

                {/* Approval Action CTA */}
                <div>
                  {isApproved ? (
                    <div className="bg-[#ecfdf3] border-2 border-[#027a48] p-3 text-center text-xs font-bold font-mono-data text-[#027a48] flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>APPROVED BY CLIENT · WORK ORDER DISPATCHED TO SERVICE HUB</span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(rep)}
                        className="flex-1 bg-primary text-white font-bold py-3.5 px-4 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider cursor-pointer shadow-xs flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>APPROVE REPAIRS & DISPATCH CREW</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Ongoing O&M Tracker & Field Dispatch */}
      <section className="bg-white border border-border-subtle p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <h2 className="font-headline-md text-base font-bold text-primary uppercase">
            LIVE O&M DISPATCH & EXECUTION STATUS
          </h2>
          <button 
            onClick={() => onNavigateTab("maintenance")}
            className="text-xs font-mono-data font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>FULL O&M KANBAN BOARD →</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono-data">
            <thead>
              <tr className="bg-surface border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                <th className="py-2.5 px-3">Ticket ID</th>
                <th className="py-2.5 px-3">Target Panel</th>
                <th className="py-2.5 px-3 font-sans">Defect Type</th>
                <th className="py-2.5 px-3 font-sans">Assigned Technician</th>
                <th className="py-2.5 px-3">SLA Status</th>
                <th className="py-2.5 px-3">Approval Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              <tr>
                <td className="py-2.5 px-3 font-bold text-primary">WO-10492</td>
                <td className="py-2.5 px-3 font-bold">#R12-C37</td>
                <td className="py-2.5 px-3 font-sans">Thermal Hotspot (Diode)</td>
                <td className="py-2.5 px-3 font-sans text-secondary">Tech #04 (R. Sharma)</td>
                <td className="py-2.5 px-3 text-[#027a48] font-bold">14h Remaining</td>
                <td className="py-2.5 px-3">
                  <span className="bg-[#ecfdf3] text-[#027a48] px-2 py-0.5 text-[9px] font-bold uppercase border border-[#abefc6]">
                    CLIENT APPROVED
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-primary">WO-10493</td>
                <td className="py-2.5 px-3 font-bold">#R04-C18</td>
                <td className="py-2.5 px-3 font-sans">Thermal Runaway Hotspot</td>
                <td className="py-2.5 px-3 font-sans text-secondary">Tech #02 (K. Verma)</td>
                <td className="py-2.5 px-3 text-warning font-bold">6h Remaining</td>
                <td className="py-2.5 px-3">
                  <span className="bg-[#ecfdf3] text-[#027a48] px-2 py-0.5 text-[9px] font-bold uppercase border border-[#abefc6]">
                    CLIENT APPROVED
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-primary">WO-10495</td>
                <td className="py-2.5 px-3 font-bold">#R15-C22</td>
                <td className="py-2.5 px-3 font-sans">Heavy Desert Soiling</td>
                <td className="py-2.5 px-3 font-sans text-secondary">Cleaning Crew Alpha</td>
                <td className="py-2.5 px-3 text-[#027a48] font-bold">36h Remaining</td>
                <td className="py-2.5 px-3">
                  <span className="bg-[#ecfdf3] text-[#027a48] px-2 py-0.5 text-[9px] font-bold uppercase border border-[#abefc6]">
                    CLIENT APPROVED
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
