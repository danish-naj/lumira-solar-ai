import os

MAINT_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Maintenance\MaintenanceHub.jsx"

p2 = """
  const columns = [
    { id: "Detected", label: "DETECTED & QUEUED", color: "border-secondary" },
    { id: "Assigned", label: "AUTO-ASSIGNED", color: "border-warning" },
    { id: "In Repair", label: "IN REPAIR (ON-SITE)", color: "border-primary" },
    { id: "Resolved", label: "RESOLVED & QA VERIFIED", color: "border-[#027a48]" }
  ];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              CLOSED-LOOP O&M DISPATCH
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Sector 4 Active Field Tickets
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Work Orders, Problem Photos & Technician Execution
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex border-2 border-primary bg-white p-0.5 font-mono-data text-xs shadow-xs">
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1 font-bold transition-all cursor-pointer ${
                viewMode === "kanban" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
              }`}
            >
              KANBAN BOARD
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 font-bold transition-all cursor-pointer ${
                viewMode === "list" ? "bg-primary text-white" : "text-secondary hover:bg-surface"
              }`}
            >
              TABLE LIST
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-data text-xs">
          {columns.map((col) => {
            const colOrders = workOrders.filter(w => w.status === col.id);
            return (
              <div key={col.id} className="bg-surface border border-border-strong p-4 space-y-3 flex flex-col justify-between min-h-[600px]">
                <div>
                  {/* Column Header */}
                  <div className={`flex justify-between items-center border-b-2 ${col.color} pb-2 mb-3`}>
                    <strong className="text-primary uppercase text-xs">{col.label}</strong>
                    <span className="bg-white border border-border-strong px-2 py-0.5 text-[10px] font-bold">
                      {colOrders.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="space-y-3">
                    {colOrders.map((order) => (
                      <div key={order.id} className="border-2 border-border-strong bg-white p-4 space-y-3 shadow-xs hover:border-primary transition-all">
                        <div className="flex justify-between items-start border-b border-border-subtle pb-2">
                          <div>
                            <span className="text-[10px] text-secondary font-bold uppercase block">{order.id} · {order.inverter_id || "INV-04"}</span>
                            <strong className="text-xs text-primary font-mono-data block mt-0.5">#{order.module_id}</strong>
                          </div>
                          <span className={`px-1.5 py-0.2 text-[9px] font-bold uppercase border ${
                            order.severity === "Critical" ? "bg-[#fef3f2] text-critical border-critical" : "bg-[#fffaeb] text-warning border-warning"
                          }`}>
                            {order.priority || "P1"}
                          </span>
                        </div>

                        {/* Problem Photo (Before Repair) */}
                        <div className="relative border border-border-strong h-32 bg-black overflow-hidden flex items-center justify-center">
                          <img 
                            src={order.problem_photo || "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80"} 
                            alt="Problem Scan"
                            className="w-full h-full object-cover opacity-85"
                          />
                          <span className="absolute top-1 left-1 bg-critical text-white text-[8px] font-bold px-1 uppercase">
                            PROBLEM PHOTO: {order.delta_t || "+18.4°C"}
                          </span>
                        </div>

                        {/* Defect Description */}
                        <div>
                          <span className="font-bold text-primary text-xs block">{order.defect_type}</span>
                          <p className="text-secondary font-sans text-[11px] mt-0.5 line-clamp-2">
                            {order.action_required || "Replace bypass diode and verify torque specs."}
                          </p>
                        </div>

                        {/* Assigned Technician Profile */}
                        <div className="border-t border-border-subtle pt-2 flex items-center justify-between font-sans text-xs">
                          <div className="flex items-center gap-2">
                            <img 
                              src={order.assigned_technician?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                              alt="Tech" 
                              className="w-6 h-6 rounded-full object-cover border border-border-strong"
                            />
                            <div>
                              <strong className="text-primary text-[11px] block">{order.assigned_technician?.name || "R. Sharma"}</strong>
                              <span className="text-secondary text-[9px] block">{order.assigned_technician?.role?.split(" ")[0] || "HV Specialist"}</span>
                            </div>
                          </div>
                          <span className="text-critical font-mono-data text-[10px] font-bold">
                            {order.sla_deadline?.split("(")[1]?.replace(")", "") || "14h Left"}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="border-t border-border-subtle pt-2 flex gap-1.5">
                          {order.status === "In Repair" && (
                            <button
                              onClick={() => {
                                setVerifyingOrder(order);
                                setVerificationResult(null);
                              }}
                              className="w-full bg-primary text-white font-bold py-1.5 text-[10px] uppercase tracking-wider hover:bg-white hover:text-primary border border-primary transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Sparkles className="w-3 h-3 text-warning" />
                              <span>RUN AI QA SCAN</span>
                            </button>
                          )}

                          {order.status === "Assigned" && (
                            <button
                              onClick={() => handleStatusChange(order.id, "In Repair")}
                              className="w-full bg-surface text-primary font-bold py-1.5 text-[10px] uppercase border border-border-strong hover:bg-white transition-all cursor-pointer"
                            >
                              MARK IN REPAIR →
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table List View */
        <div className="border border-border-strong bg-white overflow-hidden shadow-xs font-mono-data text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border-subtle text-secondary uppercase font-bold text-[10px]">
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Panel Location</th>
                <th className="py-3 px-4 font-sans">Defect Classification</th>
                <th className="py-3 px-4 font-sans">Assigned Technician</th>
                <th className="py-3 px-4">SLA Deadline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-xs">
              {workOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface transition-colors">
                  <td className="py-3 px-4 font-bold text-primary">{order.id}</td>
                  <td className="py-3 px-4 font-bold">#{order.module_id}</td>
                  <td className="py-3 px-4 font-sans text-primary">{order.defect_type}</td>
                  <td className="py-3 px-4 font-sans text-secondary">{order.assigned_technician?.name || "R. Sharma"}</td>
                  <td className="py-3 px-4 text-critical font-bold">{order.sla_deadline}</td>
                  <td className="py-3 px-4">
                    <span className="bg-surface border border-border-strong px-2 py-0.5 text-[9px] font-bold uppercase">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setVerifyingOrder(order)}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      AI QA Scan →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* AI Post-Repair Verification Modal */}
      {verifyingOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-primary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl overflow-hidden font-mono-data text-xs">
            <div className="p-4 border-b-2 border-primary bg-surface flex justify-between items-center">
              <strong className="text-primary uppercase text-xs">
                AI QUALITY ASSURANCE VERIFICATION SCAN: {verifyingOrder.id} (#{verifyingOrder.module_id})
              </strong>
              <button onClick={() => setVerifyingOrder(null)} className="p-1 hover:bg-white border border-transparent hover:border-primary cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Pre-Repair */}
                <div className="space-y-1">
                  <span className="text-[10px] text-critical uppercase font-bold block">1. PRE-REPAIR PROBLEM SCAN</span>
                  <div className="h-40 bg-black border-2 border-critical overflow-hidden relative">
                    <img 
                      src={verifyingOrder.problem_photo || "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80"} 
                      alt="Pre-Repair" 
                      className="w-full h-full object-cover opacity-80" 
                    />
                    <span className="absolute bottom-1 right-1 bg-critical text-white px-1 text-[9px] font-bold">
                      ΔT +18.4°C
                    </span>
                  </div>
                </div>

                {/* Post-Repair */}
                <div className="space-y-1">
                  <span className="text-[10px] text-[#027a48] uppercase font-bold block">2. POST-REPAIR VERIFICATION SCAN</span>
                  <div className="h-40 bg-black border-2 border-[#027a48] overflow-hidden relative">
                    <img 
                      src={verifyingOrder.proof_photo || "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"} 
                      alt="Post-Repair" 
                      className="w-full h-full object-cover opacity-90" 
                    />
                    <span className="absolute bottom-1 right-1 bg-[#027a48] text-white px-1 text-[9px] font-bold">
                      ΔT +0.2°C (NORMALIZED)
                    </span>
                  </div>
                </div>
              </div>

              {verificationResult && (
                <div className="bg-[#ecfdf3] border-2 border-[#027a48] p-4 space-y-1 font-sans text-xs">
                  <strong className="text-[#027a48] block uppercase font-mono-data font-bold">
                    ✓ QUALITY ASSURANCE PASSED (IEC 62446-3 CERTIFIED)
                  </strong>
                  <p className="text-primary text-xs leading-relaxed">
                    {verificationResult.message} Temperature delta dropped by <strong>18.2°C</strong>. Operating health score restored to <strong>100/100</strong>.
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border-subtle bg-surface flex justify-between items-center">
              <button 
                onClick={() => setVerifyingOrder(null)}
                className="bg-white border border-border-strong text-secondary font-bold px-4 py-2 text-xs uppercase hover:text-primary cursor-pointer"
              >
                Close
              </button>

              {!verificationResult && (
                <button
                  onClick={handleExecuteVerification}
                  disabled={isVerifying}
                  className="bg-primary text-white font-bold px-6 py-2.5 text-xs uppercase tracking-wider hover:bg-white hover:text-primary border border-primary transition-all cursor-pointer shadow-xs"
                >
                  <span>{isVerifying ? "ANALYZING RADIOMETRIC SCAN..." : "CONFIRM AI QA PASS"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"""

with open(MAINT_FILE, "a", encoding="utf-8") as f:
    f.write(p2)
print("Completed full MaintenanceHub.jsx with Problem Photos & Technician Profiles.")
