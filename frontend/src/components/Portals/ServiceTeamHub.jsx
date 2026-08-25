import React, { useState, useRef } from "react";
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  Upload, 
  Camera, 
  ShieldAlert, 
  Check, 
  UserCheck, 
  FileCheck2, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle,
  Zap
} from "lucide-react";

export default function ServiceTeamHub({ farm, onCompleteTicket, onNavigateTab }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [techNotes, setTechNotes] = useState("");
  const [completedTickets, setCompletedTickets] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // Active Service Tickets Dispatched by Client
  const [tickets, setTickets] = useState([
    {
      id: "WO-10492",
      farm_id: farm?.id || "farm-1",
      module_id: "R12-C37",
      defect_type: "Bypass Diode Thermal Runaway",
      severity: "Critical (P1)",
      assigned_to: "Technician #04 (R. Sharma)",
      technician_role: "High-Voltage Electrical Specialist",
      sla_deadline: "Today, 06:00 PM (14h Remaining)",
      priority_color: "bg-[#fef3f2] text-critical border-critical",
      required_action: "Replace sub-string Schottky bypass diode (15SQ045) in junction box. Verify torque to 1.8 Nm.",
      safety_protocol: "Lockout/Tagout Inverter INV-04 Combiner. Use 1000V insulated tools.",
      spare_parts: ["Schottky Diode 15SQ045 x 1", "Silicone Junction Sealant x 1", "MC4 Connector Pair x 1"],
      status: "In Repair"
    },
    {
      id: "WO-10493",
      farm_id: farm?.id || "farm-1",
      module_id: "R04-C18",
      defect_type: "Thermal Runaway Hotspot",
      severity: "Critical (P1)",
      assigned_to: "Technician #02 (K. Verma)",
      technician_role: "Lead O&M Electrician",
      sla_deadline: "Today, 04:00 PM (6h Remaining)",
      priority_color: "bg-[#fef3f2] text-critical border-critical",
      required_action: "Isolate string and solder ribbon bridge to restore sub-string continuity.",
      safety_protocol: "Arc flash shield mandatory. Verify zero DC current before disassembling.",
      spare_parts: ["Lead-Free Solar Solder Wire", "Heat Shrink Tubing"],
      status: "In Repair"
    },
    {
      id: "WO-10495",
      farm_id: farm?.id || "farm-1",
      module_id: "R15-C22",
      defect_type: "Heavy Desert Soiling",
      severity: "Medium (P3)",
      assigned_to: "Cleaning Crew Alpha",
      technician_role: "Robotic Cleaning Operator",
      sla_deadline: "Tomorrow, 02:00 PM (36h Remaining)",
      priority_color: "bg-[#fffaeb] text-warning border-[#b54708]/20",
      required_action: "Deploy automated crawler robot with soft micro-fiber brushes across Sector 4 rows.",
      safety_protocol: "Lock trackers in 0° horizontal stow position.",
      spare_parts: ["Deionized Water (50L)", "Replacement Micro-fiber Rollers"],
      status: "Assigned"
    }
  ]);

  const activeTicket = selectedTicket || tickets[0];

  const handleProofSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProofImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompleteWork = () => {
    if (!activeTicket) return;
    setSubmitting(true);

    setTimeout(() => {
      setCompletedTickets(prev => [...prev, activeTicket.id]);
      setSubmitting(false);
      if (onCompleteTicket) {
        onCompleteTicket({
          ticket_id: activeTicket.id,
          module_id: activeTicket.module_id,
          proof_image: proofImage || "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
          notes: techNotes || "Bypass diode replaced with 15SQ045, contacts cleaned, and junction resealed. Thermal continuity verified.",
          completed_at: new Date().toLocaleString()
        });
      }
    }, 800);
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* Service Hub Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              SERVICE O&M & FIELD TECHNICIAN COMMAND
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Active Crew: Shift Alpha (Sector 4 O&M Hub)
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Client-Approved Work Orders & SLA Execution Queue
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono-data text-xs">
          <div className="border border-border-subtle bg-white px-3 py-1.5 text-center">
            <span className="text-[10px] text-secondary uppercase block font-sans">Assigned Tickets</span>
            <strong className="text-primary text-sm">{tickets.length}</strong>
          </div>
          <div className="border border-border-subtle bg-white px-3 py-1.5 text-center">
            <span className="text-[10px] text-secondary uppercase block font-sans">Completed Today</span>
            <strong className="text-[#027a48] text-sm">{completedTickets.length}</strong>
          </div>
        </div>
      </div>

      {/* 2-Column Workflow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Dispatched Tickets List (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-3 lg:border-r border-border-subtle lg:pr-8 pr-0">
          <div className="flex justify-between items-center border-b border-border-subtle pb-2 mb-2">
            <h2 className="font-label-caps text-xs text-secondary uppercase font-bold tracking-wider">
              AUTO-ASSIGNED SERVICE TICKETS
            </h2>
            <span className="text-[10px] font-mono-data text-secondary">Ordered by SLA Priority</span>
          </div>

          <div className="space-y-3 font-mono-data text-xs">
            {tickets.map((t) => {
              const isSelected = activeTicket.id === t.id;
              const isDone = completedTickets.includes(t.id);
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  className={`p-4 border-2 transition-all cursor-pointer bg-white ${
                    isSelected ? "border-primary shadow-xs" : "border-border-subtle hover:border-primary"
                  } ${isDone ? "bg-[#f6fef9] border-[#027a48]" : ""}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-primary text-sm">{t.id} · #{t.module_id}</span>
                      <div className="text-[11px] text-secondary font-sans mt-0.5">{t.defect_type}</div>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${isDone ? "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]" : t.priority_color}`}>
                      {isDone ? "✓ COMPLETED" : t.severity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-secondary border-t border-border-subtle pt-2">
                    <div className="flex items-center gap-1 font-sans">
                      <UserCheck className="w-3.5 h-3.5 text-primary" />
                      <span className="truncate max-w-[150px]">{t.assigned_to}</span>
                    </div>
                    <div className="flex items-center gap-1 text-critical font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{t.sla_deadline.split("(")[1]?.replace(")", "") || "14h Left"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Execution Workspace & Proof-of-Work Uploader (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Active Ticket Details */}
          <div className="border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] font-mono-data font-bold text-secondary uppercase block">
                  ACTIVE REPAIR ASSIGNMENT · SLA DEADLINE: {activeTicket.sla_deadline}
                </span>
                <h3 className="font-bold text-lg text-primary font-mono-data">
                  {activeTicket.id} · PANEL #{activeTicket.module_id}
                </h3>
              </div>
              <span className="font-mono-data text-xs text-primary font-bold bg-surface px-2.5 py-1 border border-border-subtle">
                {activeTicket.assigned_to}
              </span>
            </div>

            {/* Repair Guide */}
            <div className="space-y-1 text-xs">
              <span className="font-mono-data font-bold text-primary uppercase text-[11px] block">
                STEP-BY-STEP REPAIR PROTOCOL:
              </span>
              <p className="text-primary bg-surface p-3 border border-border-subtle leading-relaxed">
                {activeTicket.required_action}
              </p>
            </div>

            {/* Safety Protocol */}
            <div className="space-y-1 text-xs">
              <span className="font-mono-data font-bold text-critical uppercase text-[11px] flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                MANDATORY SAFETY PROTOCOL:
              </span>
              <p className="text-critical bg-[#fef3f2] p-2.5 border border-critical/30 leading-relaxed font-medium">
                {activeTicket.safety_protocol}
              </p>
            </div>

            {/* Spare Parts */}
            <div>
              <span className="font-mono-data font-bold text-secondary uppercase text-[10px] block mb-1.5">
                VERIFIED BILL OF MATERIALS (SPARE PARTS):
              </span>
              <div className="flex flex-wrap gap-2 font-mono-data text-xs">
                {activeTicket.spare_parts.map((p, idx) => (
                  <span key={idx} className="bg-surface border border-border-strong px-2.5 py-1 text-primary font-bold">
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Proof of Work Uploader */}
            <div className="border-t border-border-subtle pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-mono-data text-xs font-bold text-primary uppercase flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-primary" />
                  UPLOAD COMPLETED REPAIR PHOTO (PROOF OF WORK)
                </label>
                {proofImage && <span className="text-[10px] font-mono-data text-[#027a48] font-bold">✓ PHOTO ATTACHED</span>}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                onChange={handleProofSelect}
                className="hidden"
              />

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border-strong p-4 flex flex-col items-center justify-center text-center bg-surface hover:bg-white hover:border-primary cursor-pointer transition-all"
              >
                {proofImage ? (
                  <div className="flex items-center gap-3">
                    <img src={proofImage} alt="Proof" className="w-16 h-16 object-cover border border-border-strong" />
                    <div className="text-left text-xs font-mono-data">
                      <strong className="text-primary block">Proof Photo Attached</strong>
                      <span className="text-secondary text-[11px]">Click to replace picture</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-secondary mb-1" />
                    <span className="text-xs font-bold text-primary uppercase font-mono-data">Take photo or browse image</span>
                    <span className="text-[11px] text-secondary">Shows repaired diode / cleaned surface</span>
                  </>
                )}
              </div>

              {/* Technician Notes */}
              <div>
                <label className="font-mono-data text-[10px] text-secondary uppercase font-bold block mb-1">
                  TECHNICIAN EXECUTION NOTES
                </label>
                <textarea
                  rows={2}
                  value={techNotes}
                  onChange={(e) => setTechNotes(e.target.value)}
                  placeholder="e.g. Diode replaced with 15SQ045, junction sealed. Thermal continuity checked at 1.8 Nm."
                  className="w-full bg-white border border-border-strong p-2.5 font-mono-data text-xs text-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Complete & Submit for QA Button */}
            {completedTickets.includes(activeTicket.id) ? (
              <div className="bg-[#ecfdf3] border-2 border-[#027a48] p-3 text-center text-xs font-bold font-mono-data text-[#027a48] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>WORK COMPLETED · TICKET SUBMITTED TO INSPECTOR FOR AI QA SCAN</span>
              </div>
            ) : (
              <button
                onClick={handleCompleteWork}
                disabled={submitting}
                className="w-full bg-primary text-white font-bold py-3.5 px-6 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>{submitting ? "SUBMITTING PROOF OF WORK..." : "SUBMIT PROOF OF WORK & REQUEST RE-INSPECTION QA"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
