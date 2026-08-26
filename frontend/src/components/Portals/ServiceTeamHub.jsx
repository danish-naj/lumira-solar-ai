import RoboticSwarmFleet from "../SwarmFleet/RoboticSwarmFleet";
import VoiceCopilot from "../VoiceCopilot/VoiceCopilot";
import { Car, Radio } from "lucide-react";
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
  Zap, 
  Layers, 
  ShieldCheck, 
  Download, 
  Calendar, 
  Users, 
  FileText, 
  CheckSquare, 
  Sliders, 
  Activity,
  Award
} from "lucide-react";

export default function ServiceTeamHub({ farm, onCompleteTicket, onNavigateTab }) {
  // 5-Section Sidebar Navigation
  // 1 = Work Orders Queue, 2 = Repair Execution Guide, 3 = Proof-of-Work Uploader, 4 = Technician Roster, 5 = Completed Repairs Archive
  const [activeTab, setActiveTab] = useState(1);

  // Filter for Tab 1
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  // Active Ticket Selection
  const [selectedTicketId, setSelectedTicketId] = useState("WO-10492");

  // Proof-of-Work State for Tab 3
  const [proofImage, setProofImage] = useState(null);
  const [techNotes, setTechNotes] = useState("");
  const [torqueValue, setTorqueValue] = useState("1.8 Nm");
  const [continuityVerified, setContinuityVerified] = useState(true);
  const [submittingProof, setSubmittingProof] = useState(false);
  const [completedTickets, setCompletedTickets] = useState(["WO-10488"]);

  const fileInputRef = useRef(null);

  // Active Dispatched Service Tickets
  const [tickets, setTickets] = useState([
    {
      id: "WO-10492",
      farm_id: farm?.id || "farm-1",
      module_id: "R12-C37",
      inverter: "INV-04",
      defect_type: "Bypass Diode Thermal Runaway",
      severity: "Critical (P1)",
      client_approved: true,
      approved_budget: "₹4,500 ($54)",
      assigned_to: "Technician #04 (R. Sharma)",
      technician_role: "High-Voltage Electrical Specialist",
      sla_deadline: "14h 22m Remaining (Today 06:00 PM)",
      sla_status: "on-track",
      priority_color: "bg-[#fef3f2] text-critical border-critical",
      required_action: "Replace sub-string Schottky bypass diode (15SQ045) in junction box. Verify torque to 1.8 Nm.",
      safety_protocol: "Lockout/Tagout Inverter INV-04 Combiner. Mandatory Class 0 (1000V) dielectric gloves & face shield.",
      spare_parts: ["Schottky Diode 15SQ045 x 1", "Silicone Junction Sealant x 1", "MC4 Connector Pair x 1"],
      tools_required: ["1000V Insulated Screwdriver Set", "Calibrated Torque Wrench (0-5 Nm)", "Fluke 87V Digital Multimeter"],
      steps: [
        { name: "Lockout / Tagout (LOTO)", desc: "Open DC disconnect on Combiner Box DC-04. Verify zero current with clamp meter.", done: true },
        { name: "Junction Box Removal", desc: "Unscrew waterproof lid, inspect bypass diode terminals for soot / thermal melt.", done: true },
        { name: "Desoldering & Installation", desc: "Desolder defective diode, solder new 15SQ045 with lead-free solar solder.", done: false },
        { name: "Torque & Sealing", desc: "Torque terminal lugs to 1.8 Nm. Apply RTV silicone bead around junction perimeter.", done: false },
        { name: "Thermal Spot Verification", desc: "Re-energize string, scan with thermal spot gun to confirm ΔT < 0.4°C.", done: false }
      ],
      status: "In Repair"
    },
    {
      id: "WO-10493",
      farm_id: farm?.id || "farm-1",
      module_id: "R04-C18",
      inverter: "INV-02",
      defect_type: "Ribbon Lead Burnout & Hotspot",
      severity: "Critical (P1)",
      client_approved: true,
      approved_budget: "₹5,200 ($62)",
      assigned_to: "Technician #02 (K. Verma)",
      technician_role: "Lead O&M Electrician",
      sla_deadline: "6h 15m Remaining (Today 04:00 PM)",
      sla_status: "urgent",
      priority_color: "bg-[#fef3f2] text-critical border-critical",
      required_action: "Isolate string and solder internal ribbon lead bridge to restore sub-string continuity.",
      safety_protocol: "Arc flash shield mandatory. Verify zero DC current before disassembling junction box.",
      spare_parts: ["Lead-Free Solar Solder Wire", "Heat Shrink Tubing", "Silver Ribbon Conductor"],
      tools_required: ["60W Portable Soldering Iron", "1000V Insulated Pliers", "FLIR TG165 Thermal Camera"],
      steps: [
        { name: "LOTO String Isolation", desc: "Disconnect string fuses on Inverter INV-02 DC input board.", done: true },
        { name: "Ribbon Lead Preparation", desc: "Scrape oxidized silver contacts, clean with isopropyl alcohol.", done: false },
        { name: "Micro-soldering Bridge", desc: "Solder silver conductor bridge across fractured busbar ribbon.", done: false },
        { name: "Reseal & Test", desc: "Reapply junction sealant and conduct 1000V insulation resistance check.", done: false }
      ],
      status: "In Repair"
    },
    {
      id: "WO-10495",
      farm_id: farm?.id || "farm-1",
      module_id: "R15-C22",
      inverter: "INV-01",
      defect_type: "Heavy Desert Sand Encrustation",
      severity: "Medium (P3)",
      client_approved: true,
      approved_budget: "₹1,200 ($14)",
      assigned_to: "Cleaning Crew Alpha",
      technician_role: "Robotic Cleaning Operator",
      sla_deadline: "36h Remaining (Tomorrow 02:00 PM)",
      sla_status: "on-track",
      priority_color: "bg-[#fffaeb] text-warning border-[#b54708]/20",
      required_action: "Deploy automated crawler robot with soft micro-fiber brushes across Sector 4 rows.",
      safety_protocol: "Lock trackers in 0° horizontal stow position before placing crawler on array.",
      spare_parts: ["Deionized Water (50L)", "Replacement Micro-fiber Rollers"],
      tools_required: ["Autonomous Solar Crawler Bot", "Deionized Water Sprayer Unit"],
      steps: [
        { name: "Tracker Stow Lock", desc: "Lock string table tracker at 0° horizontal plane via SCADA controller.", done: true },
        { name: "Crawler Alignment", desc: "Position crawler bot tracks on lower module frame rail.", done: true },
        { name: "Automated Dry Clean Pass", desc: "Run high-speed rotary micro-fiber sweep across 60 panels in string.", done: false },
        { name: "Optical Inspection", desc: "Verify soiling removal with optical gloss meter (>98% transmission).", done: false }
      ],
      status: "Assigned"
    }
  ]);

  // On-duty Technician Roster
  const technicianRoster = [
    {
      name: "R. Sharma",
      id: "TECH-04",
      role: "High-Voltage Electrical Specialist",
      status: "On-Site (Sector 4)",
      active_tickets: 3,
      sla_compliance: "99.2%",
      certifications: ["IEC 62446 Certified", "1500V DC Specialist", "CPR/First Aid"],
      tool_calibrated_until: "Nov 2026"
    },
    {
      name: "K. Verma",
      id: "TECH-02",
      role: "Lead O&M Electrician",
      status: "On-Site (Sector 4)",
      active_tickets: 2,
      sla_compliance: "98.8%",
      certifications: ["Level-II Thermographer", "LOTO Authorized Supervisor"],
      tool_calibrated_until: "Jan 2027"
    },
    {
      name: "Cleaning Crew Alpha",
      id: "CREW-01",
      role: "Robotic Array Cleaning Team",
      status: "Active Clean Pass",
      active_tickets: 4,
      sla_compliance: "100%",
      certifications: ["Autonomous Robot Operator", "Waterless Cleaning Certified"],
      tool_calibrated_until: "Oct 2026"
    }
  ];

  // Completed & Verified Repairs Archive
  const completedArchive = [
    {
      ticket_id: "WO-10488",
      module_id: "R08-C12",
      defect_type: "Avian Guano Hotspot Remediation",
      technician: "Cleaning Crew Alpha",
      completed_at: "2026-08-24 03:45 PM",
      pre_temp_delta: "+12.8°C",
      post_temp_delta: "+0.2°C (Normalized)",
      pre_health: "42 / 100",
      post_health: "100 / 100",
      qa_status: "Verified by Capt. A. Nair",
      certificate_id: "CERT-QA-84920"
    },
    {
      ticket_id: "WO-10485",
      module_id: "R02-C44",
      defect_type: "Bypass Diode Short-Circuit",
      technician: "Tech #04 (R. Sharma)",
      completed_at: "2026-08-23 11:20 AM",
      pre_temp_delta: "+19.2°C",
      post_temp_delta: "+0.1°C (Normalized)",
      pre_health: "32 / 100",
      post_health: "100 / 100",
      qa_status: "Verified by Capt. A. Nair",
      certificate_id: "CERT-QA-84918"
    }
  ];

  const activeTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const filteredTickets = tickets.filter(t => {
    if (priorityFilter === "P1" && !t.severity.includes("P1")) return false;
    if (priorityFilter === "P2" && !t.severity.includes("P2")) return false;
    if (priorityFilter === "P3" && !t.severity.includes("P3")) return false;
    return true;
  });

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
    setSubmittingProof(true);

    setTimeout(() => {
      setCompletedTickets(prev => [...prev, activeTicket.id]);
      setSubmittingProof(false);
      if (onCompleteTicket) {
        onCompleteTicket({
          ticket_id: activeTicket.id,
          module_id: activeTicket.module_id,
          proof_image: proofImage || "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
          torque_reading: torqueValue,
          notes: techNotes || "Schottky bypass diode 15SQ045 replaced, junction box resealed with RTV silicone. Torque verified at 1.8 Nm.",
          completed_at: new Date().toLocaleString()
        });
      }
    }, 900);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-64px)] select-none bg-surface-container-lowest font-sans">
      {/* ========================================================================= */}
      {/* SERVICE TEAM COMMAND SIDEBAR                                              */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-72 bg-surface border-r border-border-subtle p-5 flex flex-col justify-between shrink-0 space-y-6">
        <div>
          {/* Header */}
          <div className="border-b border-border-subtle pb-3 mb-4">
            <div className="flex items-center gap-1.5 text-primary font-bold text-xs uppercase font-mono-data mb-1">
              <Wrench className="w-3.5 h-3.5" />
              <span>SERVICE COMMAND HUB</span>
            </div>
            <h2 className="text-sm font-bold text-primary font-mono-data">
              SolarGuard Field Service
            </h2>
            <span className="text-[10px] text-secondary font-mono-data block mt-0.5">
              Sector 4 O&M Dispatch Base
            </span>
          </div>

          {/* Sidebar Nav Links */}
          <div className="space-y-2 font-mono-data text-xs">
            <button
              onClick={() => setActiveTab(1)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 1 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 1 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                1
              </span>
              <div>
                <span className="block uppercase text-[11px]">DISPATCHED TICKETS</span>
                <span className={`text-[9px] font-sans ${activeTab === 1 ? "text-white/80" : "text-secondary"}`}>
                  {tickets.length} Approved by Client
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(2)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 2 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 2 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                2
              </span>
              <div>
                <span className="block uppercase text-[11px]">REPAIR & LOTO GUIDE</span>
                <span className={`text-[9px] font-sans ${activeTab === 2 ? "text-white/80" : "text-secondary"}`}>
                  {activeTicket.module_id} Procedures & BOM
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(3)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 3 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 3 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                3
              </span>
              <div>
                <span className="block uppercase text-[11px]">PROOF-OF-WORK</span>
                <span className={`text-[9px] font-sans ${activeTab === 3 ? "text-white/80" : "text-secondary"}`}>
                  {completedTickets.includes(activeTicket.id) ? "✓ Ready for QA" : "Upload Photo & Logs"}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(4)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 4 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 4 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                4
              </span>
              <div>
                <span className="block uppercase text-[11px]">TECHNICIAN ROSTER</span>
                <span className={`text-[9px] font-sans ${activeTab === 4 ? "text-white/80" : "text-secondary"}`}>
                  3 Active On-Site
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab(5)}
              className={`w-full p-3 text-left border flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === 5 
                  ? "bg-primary text-white border-primary shadow-xs font-bold" 
                  : "bg-white text-secondary border-border-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${activeTab === 5 ? "bg-white text-primary border-white" : "border-border-strong"}`}>
                5
              </span>
              <div>
                <span className="block uppercase text-[11px]">QA ARCHIVE</span>
                <span className={`text-[9px] font-sans ${activeTab === 5 ? "text-white/80" : "text-secondary"}`}>
                  {completedArchive.length} Verified Tickets
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar Footer: Switcher to Client Portal */}
        <div className="border-t border-border-subtle pt-3">
          <button
            onClick={() => onNavigateTab("client-portal")}
            className="w-full bg-white border border-border-strong hover:bg-surface text-primary font-mono-data text-xs font-bold py-2.5 px-3 uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
          >
            <span>SWITCH TO CLIENT PORTAL →</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN SERVICE WORKSPACE                                                    */}
      {/* ========================================================================= */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
        {/* ========================================================================= */}
        {/* TAB 1: DISPATCHED WORK ORDERS & LIVE SLA QUEUE                            */}
        {/* ========================================================================= */}
        {activeTab === 1 && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-4 gap-3">
              <div>
                <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                  SECTION 1 OF 5: DISPATCH QUEUE & SLA COUNTDOWN
                </span>
                <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                  Client-Approved Work Orders Queue ({tickets.length})
                </h1>
                <p className="text-secondary text-xs mt-1">
                  Work orders authorized by Asset Owner with assigned technicians, budgets, and strict resolution timers.
                </p>
              </div>

              {/* Priority Filter */}
              <div className="flex items-center gap-1 border-2 border-primary p-1 bg-white font-mono-data text-xs shadow-xs">
                {["ALL", "P1", "P2", "P3"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriorityFilter(p)}
                    className={`px-3 py-1 font-bold transition-all cursor-pointer ${
                      priorityFilter === p ? "bg-primary text-white" : "text-secondary hover:bg-surface"
                    }`}
                  >
                    {p === "ALL" ? "All Priorities" : `${p} Priority`}
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-data text-xs">
              {filteredTickets.map((t) => {
                const isSelected = activeTicket.id === t.id;
                const isDone = completedTickets.includes(t.id);
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`border-2 p-5 bg-white transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected ? "border-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ring-1 ring-primary" : "border-border-subtle hover:border-primary"
                    } ${isDone ? "bg-[#f6fef9] border-[#027a48]" : ""}`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex justify-between items-start border-b border-border-subtle pb-2.5 mb-3">
                        <div>
                          <span className="text-[10px] text-secondary font-bold uppercase block">{t.id} · {t.inverter}</span>
                          <strong className="text-sm text-primary font-mono-data block mt-0.5">
                            PANEL #{t.module_id} · {t.defect_type}
                          </strong>
                        </div>
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${isDone ? "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]" : t.priority_color}`}>
                          {isDone ? "✓ COMPLETED" : t.severity}
                        </span>
                      </div>

                      {/* Budget & Authorization */}
                      <div className="grid grid-cols-2 gap-2 bg-surface p-2.5 border border-border-subtle mb-3">
                        <div>
                          <span className="text-[9px] text-secondary font-sans uppercase block">Authorized Budget:</span>
                          <strong className="text-[#027a48]">{t.approved_budget}</strong>
                        </div>
                        <div>
                          <span className="text-[9px] text-secondary font-sans uppercase block">Client Status:</span>
                          <strong className="text-primary font-sans text-[11px]">✓ Approved</strong>
                        </div>
                      </div>

                      {/* Required Action Snippet */}
                      <p className="font-sans text-xs text-secondary mb-3 line-clamp-2">
                        {t.required_action}
                      </p>

                      {/* Assigned Tech & SLA Countdown Clock */}
                      <div className="flex items-center justify-between text-[11px] text-secondary border-t border-border-subtle pt-2.5 font-mono-data">
                        <div className="flex items-center gap-1 font-sans">
                          <UserCheck className="w-3.5 h-3.5 text-primary" />
                          <span className="truncate max-w-[130px] font-bold text-primary">{t.assigned_to.split("(")[0]}</span>
                        </div>
                        <div className="flex items-center gap-1 text-critical font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{t.sla_deadline.split("(")[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Link to Procedure */}
                    <div className="mt-4 pt-2 border-t border-border-subtle">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTicketId(t.id);
                          setActiveTab(2);
                        }}
                        className="w-full bg-surface border border-border-strong hover:bg-primary hover:text-white text-primary font-bold py-2 px-3 text-[11px] uppercase transition-all flex items-center justify-between"
                      >
                        <span>OPEN REPAIR PROCEDURE & LOTO GUIDE →</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ACTIVE REPAIR EXECUTION & LOTO GUIDE                               */}
        {/* ========================================================================= */}
        {activeTab === 2 && (
          <div className="space-y-6 max-w-5xl">
            <div className="border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                  SECTION 2 OF 5: FIELD REPAIR PROCEDURE & LOTO PROTOCOL
                </span>
                <span className="bg-primary text-white text-[9px] font-mono-data font-bold px-2 py-0.5 uppercase">
                  ACTIVE TICKET: {activeTicket.id}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-primary font-headline-lg">
                Remediation Protocol: Panel #{activeTicket.module_id} ({activeTicket.inverter})
              </h1>
              <p className="text-secondary text-xs mt-1">
                Follow lockout/tagout safety protocols and torque specifications. Assigned to <strong>{activeTicket.assigned_to}</strong>.
              </p>
            </div>

            {/* Mandatory Safety Alert */}
            <div className="border-2 border-critical bg-[#fef3f2] p-5 space-y-2 font-mono-data text-xs shadow-xs">
              <div className="flex items-center gap-2 text-critical font-bold uppercase text-xs">
                <ShieldAlert className="w-5 h-5 text-critical" />
                <span>MANDATORY HIGH-VOLTAGE SAFETY & ARC FLASH PROTOCOL</span>
              </div>
              <p className="font-sans text-xs text-critical leading-relaxed font-medium">
                {activeTicket.safety_protocol}
              </p>
            </div>

            {/* Step-by-Step Procedure Checklist */}
            <div className="border border-border-strong bg-white p-6 space-y-4 font-mono-data text-xs shadow-xs">
              <h3 className="font-bold text-primary uppercase text-xs flex items-center gap-2 border-b border-border-subtle pb-2">
                <Wrench className="w-4 h-4 text-primary" />
                STEP-BY-STEP REMEDIATION PROCEDURE
              </h3>

              <div className="space-y-3">
                {activeTicket.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-surface border border-border-subtle">
                    <div className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border shrink-0 mt-0.5 ${step.done ? "bg-primary text-white border-primary" : "bg-white text-secondary border-border-strong"}`}>
                      {step.done ? <Check className="w-3 h-3" /> : idx + 1}
                    </div>
                    <div>
                      <strong className="text-primary font-sans text-xs block">{step.name}</strong>
                      <p className="text-secondary text-[11px] font-sans mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill of Materials (BOM) & Tooling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-data text-xs">
              {/* Spare Parts */}
              <div className="border border-border-strong bg-white p-4 space-y-2 shadow-xs">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5">
                  VERIFIED SPARE PARTS (BILL OF MATERIALS):
                </strong>
                <div className="space-y-1.5 pt-1">
                  {activeTicket.spare_parts.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-primary font-sans text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#027a48]" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Required */}
              <div className="border border-border-strong bg-white p-4 space-y-2 shadow-xs">
                <strong className="text-primary uppercase text-xs block border-b border-border-subtle pb-1.5">
                  MANDATORY CALIBRATED TOOLING:
                </strong>
                <div className="space-y-1.5 pt-1">
                  {activeTicket.tools_required.map((tool, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-primary font-sans text-xs">
                      <Wrench className="w-3.5 h-3.5 text-primary" />
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Proceed to Upload Proof Button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveTab(3)}
                className="bg-primary text-white font-bold py-3.5 px-6 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>PROCEED TO PROOF-OF-WORK UPLOADER →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PROOF-OF-WORK UPLOADER & TECHNICIAN LOGS                           */}
        {/* ========================================================================= */}
        {activeTab === 7 && (
          <div className="space-y-6 max-w-5xl">
            <div className="border-b border-border-subtle pb-4">
              <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                SECTION 3 OF 5: CLOSE WORK ORDER & SUBMIT FOR QA
              </span>
              <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                Proof of Work Uploader & Execution Logs
              </h1>
              <p className="text-secondary text-xs mt-1">
                Upload completed repair ground photo, log torque readings, and transmit ticket to Inspector for AI QA verification.
              </p>
            </div>

            <div className="border-2 border-primary bg-white p-6 space-y-5 font-mono-data text-xs shadow-xs">
              <div className="flex justify-between items-center border-b border-border-subtle pb-3">
                <div>
                  <span className="text-[10px] text-secondary font-bold uppercase block">
                    TICKET REF: {activeTicket.id} · PANEL #{activeTicket.module_id}
                  </span>
                  <strong className="text-base text-primary font-mono-data">
                    {activeTicket.defect_type} Remediation
                  </strong>
                </div>
                <span className="bg-surface text-primary border border-border-strong px-2.5 py-1 text-xs font-bold font-mono-data">
                  {activeTicket.assigned_to}
                </span>
              </div>

              {/* Photo Uploader Dropzone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary uppercase block">
                  1. COMPLETED WORK GROUND PHOTO (E.G. REPLACED DIODE / CLEANED GLASS)
                </label>
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
                  className="border-2 border-dashed border-border-strong p-6 flex flex-col items-center justify-center text-center bg-surface hover:bg-white hover:border-primary cursor-pointer transition-all"
                >
                  {proofImage ? (
                    <div className="flex items-center gap-4">
                      <img src={proofImage} alt="Proof" className="w-20 h-20 object-cover border-2 border-primary" />
                      <div className="text-left">
                        <strong className="text-primary text-xs font-bold block">✓ Ground Proof Photo Attached</strong>
                        <span className="text-secondary text-[11px] font-sans">Click to snap alternative photo</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Camera className="w-6 h-6 text-primary mb-2" />
                      <strong className="text-xs text-primary uppercase">SNAP PHOTO OR UPLOAD COMPLETED WORK PROOF</strong>
                      <span className="text-secondary text-[11px] font-sans mt-0.5">Shows new bypass diode installed in junction box</span>
                    </>
                  )}
                </div>
              </div>

              {/* Measurements & Log Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase block mb-1">
                    2. CALIBRATED TORQUE APPLIED (NM)
                  </label>
                  <input
                    type="text"
                    value={torqueValue}
                    onChange={(e) => setTorqueValue(e.target.value)}
                    className="w-full bg-white border border-border-strong p-2.5 font-mono-data text-primary text-xs font-bold focus:outline-none"
                    placeholder="1.8 Nm"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase block mb-1">
                    3. DC CONTINUITY & RESISTANCE CHECK
                  </label>
                  <div className="flex items-center gap-2 p-2 bg-surface border border-border-strong h-[38px]">
                    <input
                      type="checkbox"
                      checked={continuityVerified}
                      onChange={(e) => setContinuityVerified(e.target.checked)}
                      className="accent-primary"
                    />
                    <span className="text-xs font-sans text-primary">Zero reverse-bias leakage verified with Fluke 87V</span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-secondary uppercase block mb-1">
                    4. TECHNICIAN EXECUTION NOTES
                  </label>
                  <textarea
                    rows={3}
                    value={techNotes}
                    onChange={(e) => setTechNotes(e.target.value)}
                    placeholder="e.g. Diode replaced with 15SQ045, junction sealed. Thermal continuity checked at 1.8 Nm."
                    className="w-full bg-white border border-border-strong p-2.5 font-mono-data text-xs text-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div>
                {completedTickets.includes(activeTicket.id) ? (
                  <div className="bg-[#ecfdf3] border-2 border-[#027a48] p-4 text-center text-xs font-bold font-mono-data text-[#027a48] flex items-center justify-center gap-2 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-[#027a48]" />
                    <span>PROOF OF WORK SUBMITTED · PENDING QA RE-INSPECTION BY CAPT. A. NAIR</span>
                  </div>
                ) : (
                  <button
                    onClick={handleCompleteWork}
                    disabled={submittingProof}
                    className="w-full bg-primary text-white font-bold py-4 px-6 border-2 border-primary hover:bg-white hover:text-primary transition-all uppercase text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>{submittingProof ? "SUBMITTING PROOF & NOTIFYING INSPECTOR..." : "SUBMIT PROOF OF WORK & REQUEST RE-INSPECTION QA"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: TECHNICIAN FLEET ROSTER & SHIFT SCHEDULE                           */}
        {/* ========================================================================= */}
        {activeTab === 6 && (
          <div className="space-y-6 max-w-5xl">
            <div className="border-b border-border-subtle pb-4">
              <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                SECTION 4 OF 5: FIELD CREW MANAGEMENT & CERTIFICATIONS
              </span>
              <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                On-Duty Technician Fleet Roster & Tooling Calibration
              </h1>
              <p className="text-secondary text-xs mt-1">
                Active solar O&M technicians deployed across Sector 4 with live SLA resolution rates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-data text-xs">
              {technicianRoster.map((t, idx) => (
                <div key={idx} className="border-2 border-primary bg-white p-5 space-y-3 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start border-b border-border-subtle pb-2.5">
                      <div>
                        <strong className="text-sm font-bold text-primary block">{t.name}</strong>
                        <span className="text-[10px] text-secondary font-sans">{t.id} · {t.role}</span>
                      </div>
                      <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2 py-0.5 text-[9px] font-bold uppercase">
                        {t.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-secondary font-sans">Active Assigned Tickets:</span>
                        <strong className="text-primary font-bold">{t.active_tickets} Tickets</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary font-sans">SLA Resolution Rate:</span>
                        <strong className="text-[#027a48] font-bold">{t.sla_compliance}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary font-sans">Tool Calibrated Until:</span>
                        <strong className="text-primary">{t.tool_calibrated_until}</strong>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border-subtle mt-3">
                      <span className="text-[9px] text-secondary uppercase font-bold block mb-1">
                        CERTIFICATIONS:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {t.certifications.map((c, i) => (
                          <span key={i} className="bg-surface border border-border-subtle px-1.5 py-0.5 text-[9px] text-primary">
                            ✓ {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: COMPLETED REPAIRS ARCHIVE & QUALITY ASSURANCE HISTORY              */}
        {/* ========================================================================= */}
        {activeTab === 7 && (
          <div className="space-y-6 max-w-5xl">
            <div className="border-b border-border-subtle pb-4">
              <span className="text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block">
                SECTION 5 OF 5: RESOLVED WORK ORDERS & VERIFIED AUDITS
              </span>
              <h1 className="text-2xl font-bold text-primary mt-1 font-headline-lg">
                Completed Repairs Archive & AI Verification Records
              </h1>
              <p className="text-secondary text-xs mt-1">
                Historic record of all field repairs certified and verified by Level-III thermography inspection.
              </p>
            </div>

            <div className="border border-border-strong bg-white overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse font-mono-data">
                <thead>
                  <tr className="bg-surface border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                    <th className="py-3 px-4">Ticket ID</th>
                    <th className="py-3 px-4">Panel Location</th>
                    <th className="py-3 px-4 font-sans">Defect Classification</th>
                    <th className="py-3 px-4">Pre / Post Temp (ΔT)</th>
                    <th className="py-3 px-4">Health Recovery</th>
                    <th className="py-3 px-4 font-sans">QA Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-xs">
                  {completedArchive.map((arc, idx) => (
                    <tr key={idx} className="hover:bg-surface transition-colors">
                      <td className="py-3 px-4 font-bold text-primary">{arc.ticket_id}</td>
                      <td className="py-3 px-4 font-bold">#{arc.module_id}</td>
                      <td className="py-3 px-4 font-sans text-primary">{arc.defect_type}</td>
                      <td className="py-3 px-4 font-mono-data">
                        <span className="text-critical line-through">{arc.pre_temp_delta}</span>{" "}
                        ➔ <strong className="text-[#027a48]">{arc.post_temp_delta}</strong>
                      </td>
                      <td className="py-3 px-4 font-mono-data">
                        <span className="text-critical">{arc.pre_health}</span>{" "}
                        ➔ <strong className="text-[#027a48]">{arc.post_health}</strong>
                      </td>
                      <td className="py-3 px-4 font-sans">
                        <span className="bg-[#ecfdf3] text-[#027a48] border border-[#abefc6] px-2 py-0.5 text-[9px] font-bold uppercase inline-block">
                          ✓ {arc.qa_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quality Assurance Guarantee Card */}
            <div className="border-2 border-[#027a48] bg-[#f6fef9] p-5 space-y-2 font-mono-data text-xs shadow-xs">
              <div className="flex items-center gap-2 text-[#027a48] font-bold uppercase text-xs">
                <Award className="w-5 h-5 text-[#027a48]" />
                <span>CLOSED-LOOP QUALITY ASSURANCE CERTIFICATION (IEC 62446-3)</span>
              </div>
              <p className="font-sans text-xs text-primary leading-relaxed">
                Every repaired module undergoes post-remediation radiometric thermal re-scanning by certified inspectors to guarantee that cell operating temperatures have normalized within $\pm 0.4^\circ	ext{C}$ of adjacent nominal strings before work orders are officially closed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
