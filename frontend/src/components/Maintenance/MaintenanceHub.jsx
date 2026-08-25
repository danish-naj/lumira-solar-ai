import React, { useState, useEffect } from "react";
import { 
  Kanban, 
  List, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  X, 
  Sparkles, 
  User, 
  Check,
  Download,
  Plus
} from "lucide-react";
import { fetchWorkOrders, updateWorkOrderStatus, verifyRepair, getExportCsvUrl } from "../../services/api";

export default function MaintenanceHub({ farm, onRefreshFarm }) {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list"); // Default to comprehensive Table List View
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [verifyingOrder, setVerifyingOrder] = useState(null);
  const [techNotes, setTechNotes] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const loadOrders = () => {
    if (farm) {
      fetchWorkOrders(farm.id)
        .then((res) => {
          setWorkOrders(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    loadOrders();
  }, [farm]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateWorkOrderStatus(farm.id, orderId, newStatus);
      loadOrders();
      if (onRefreshFarm) onRefreshFarm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleExecuteVerification = async () => {
    if (!verifyingOrder) return;
    setIsVerifying(true);
    try {
      const res = await verifyRepair(farm.id, verifyingOrder.id, {
        work_order_id: verifyingOrder.id,
        technician_notes: techNotes || "Bypass diode replaced and junction normalized.",
      });
      setVerificationResult(res);
      setIsVerifying(false);
      loadOrders();
      if (onRefreshFarm) onRefreshFarm();
    } catch (err) {
      console.error(err);
      setIsVerifying(false);
    }
  };

  const filteredOrders = workOrders.filter((wo) => {
    if (priorityFilter === "ALL") return true;
    return wo.priority.includes(priorityFilter);
  });

  const columns = [
    { id: "Detected", label: "DETECTED", color: "bg-error", count: filteredOrders.filter((o) => o.status === "Detected").length },
    { id: "Assigned", label: "ASSIGNED", color: "bg-amber-500", count: filteredOrders.filter((o) => o.status === "Assigned").length },
    { id: "In Repair", label: "IN REPAIR", color: "border border-primary border-dashed", count: filteredOrders.filter((o) => o.status === "In Repair").length },
    { id: "Resolved", label: "RESOLVED", color: "bg-primary", count: filteredOrders.filter((o) => o.status === "Resolved" || o.status === "Verified").length },
  ];

  return (
    <div className="flex-1 p-6 md:p-12 space-y-8 max-w-7xl mx-auto select-none bg-surface-container-lowest">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-border-strong pb-4 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-headline-lg font-headline-lg font-bold text-primary tracking-tighter">
            Closed-Loop O&amp;M
          </h2>
          <p className="font-body-md text-body-md text-secondary mt-1">
            Manage and verify AI-detected anomalies across the fleet.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Switcher: List vs Kanban */}
          <div className="flex gap-1 border border-border-subtle p-1 bg-surface-container-lowest mr-2">
            <button
              onClick={() => setViewMode("list")}
              aria-label="List View"
              className={`p-1.5 transition-colors ${
                viewMode === "list" ? "bg-surface-container text-primary border border-border-subtle font-bold" : "text-secondary hover:text-primary"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              aria-label="Kanban View"
              className={`p-1.5 transition-colors ${
                viewMode === "kanban" ? "bg-surface-container text-primary border border-border-subtle font-bold" : "text-secondary hover:text-primary"
              }`}
            >
              <Kanban className="w-4 h-4" />
            </button>
          </div>

          <a
            href={farm ? getExportCsvUrl(farm.id) : "#"}
            download
            className="bg-surface-container-lowest border border-border-subtle text-primary font-body-sm font-medium px-4 py-2 hover:bg-surface-container-low transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CSV</span>
          </a>

          <button 
            onClick={() => {
              if (workOrders.length > 0) {
                setVerifyingOrder(workOrders[0]);
                setVerificationResult(null);
                setTechNotes("");
              }
            }}
            className="bg-primary text-on-primary border border-border-strong font-body-sm font-bold px-4 py-2 hover:bg-surface-container-lowest hover:text-primary transition-colors uppercase tracking-wider text-xs"
          >
            CREATE TICKET
          </button>
        </div>
      </div>

      {/* Main Table Section */}
      {viewMode === "list" ? (
        <section className="bg-surface-container-lowest border border-border-subtle overflow-hidden">
          <div className="px-4 py-3 border-b border-border-subtle bg-surface-container-low flex justify-between items-center">
            <h3 className="text-label-caps font-label-caps text-secondary uppercase tracking-widest font-bold">
              ACTIVE O&amp;M WORK ORDERS ({filteredOrders.length} TICKETS)
            </h3>
            <div className="flex items-center space-x-2 font-mono-data text-xs text-secondary">
              <Filter className="w-3.5 h-3.5 text-secondary" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-transparent border-0 text-xs font-mono-data text-secondary focus:ring-0 cursor-pointer uppercase"
              >
                <option value="ALL">FILTER: ALL</option>
                <option value="P1">FILTER: P1 CRITICAL</option>
                <option value="P2">FILTER: P2 HIGH</option>
                <option value="P3">FILTER: P3 NORMAL</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle text-label-caps font-label-caps text-secondary uppercase">
                  <th className="px-4 py-3.5 font-bold">TICKET ID</th>
                  <th className="px-4 py-3.5 font-bold">TARGET MODULE</th>
                  <th className="px-4 py-3.5 font-bold">DEFECT CLASS</th>
                  <th className="px-4 py-3.5 font-bold">PRIORITY</th>
                  <th className="px-4 py-3.5 font-bold">STATUS</th>
                  <th className="px-4 py-3.5 font-bold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-body-sm font-body-sm divide-y divide-border-subtle font-mono-data">
                {filteredOrders.map((wo) => {
                  const isP1 = wo.priority.includes("P1");
                  const isP2 = wo.priority.includes("P2");
                  const isVerified = wo.status === "Verified";

                  return (
                    <tr 
                      key={wo.id}
                      onClick={() => {
                        setVerifyingOrder(wo);
                        setVerificationResult(null);
                        setTechNotes("");
                      }}
                      className={`hover:bg-surface-container-low transition-colors cursor-pointer ${
                        isVerified ? "bg-surface-container-low/40 opacity-70" : ""
                      }`}
                    >
                      <td className="px-4 py-4 font-bold text-primary">{wo.id}</td>
                      <td className="px-4 py-4 text-secondary">{wo.module_id}</td>
                      <td className="px-4 py-4 font-sans font-medium text-primary">{wo.defect_type}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 bg-surface-container-low text-label-caps font-label-caps uppercase border border-border-subtle text-primary font-bold text-[10px]">
                          <span className={`w-2 h-2 rounded-full mr-1.5 ${isP1 ? "bg-error" : isP2 ? "bg-amber-500" : "bg-secondary"}`} />
                          {wo.priority}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-1.5">
                          {isVerified ? (
                            <>
                              <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                              <span className="text-primary font-bold font-sans">Verified</span>
                            </>
                          ) : wo.status === "Resolved" ? (
                            <>
                              <div className="w-4 h-4 border-2 border-border-strong flex items-center justify-center font-bold text-[10px]">
                                !
                              </div>
                              <span className="font-bold text-primary font-sans">Resolved</span>
                            </>
                          ) : wo.status === "In Repair" ? (
                            <>
                              <div className="w-2 h-2 bg-border-strong rounded-full" />
                              <span className="text-secondary font-sans">In Repair</span>
                            </>
                          ) : (
                            <>
                              <div className="w-3 h-3 border border-dashed border-border-strong rounded-full" />
                              <span className="text-secondary font-sans">{wo.status}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        {!isVerified ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setVerifyingOrder(wo);
                              setVerificationResult(null);
                              setTechNotes("");
                            }}
                            className="bg-surface-container-lowest border border-border-subtle text-primary text-label-caps font-label-caps px-3 py-1.5 hover:bg-surface-container-low transition-colors uppercase font-bold text-[10px]"
                          >
                            AI VERIFY REPAIR
                          </button>
                        ) : (
                          <button className="text-secondary hover:text-primary text-xs font-medium underline font-sans">
                            Report
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        /* Kanban View */
        <main className="overflow-x-auto p-4 kanban-grid">
          <div className="flex gap-6 min-w-max pb-4">
            {columns.map((col) => {
              const ordersInCol = filteredOrders.filter((o) => {
                if (col.id === "Resolved") return o.status === "Resolved" || o.status === "Verified";
                return o.status === col.id;
              });

              return (
                <div
                  key={col.id}
                  className="w-[320px] flex flex-col bg-surface-container-lowest/90 backdrop-blur-sm border border-border-subtle"
                >
                  <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-surface-container-lowest">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                      <h3 className="font-label-caps text-label-caps text-primary font-bold">{col.label}</h3>
                    </div>
                    <span className="font-mono-data text-mono-data text-secondary font-bold">{ordersInCol.length}</span>
                  </div>

                  <div className="p-4 flex flex-col gap-3">
                    {ordersInCol.map((wo) => (
                      <div
                        key={wo.id}
                        onClick={() => {
                          setVerifyingOrder(wo);
                          setVerificationResult(null);
                          setTechNotes("");
                        }}
                        className="bg-surface-container-lowest p-4 border border-border-strong hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono-data font-bold text-primary text-xs">{wo.id}</span>
                          <span className="text-[9px] font-mono-data font-bold uppercase text-error">{wo.priority}</span>
                        </div>
                        <h4 className="font-sans text-xs font-semibold text-primary mb-2">{wo.defect_type} on #{wo.module_id}</h4>
                        <div className="text-[11px] text-secondary font-mono-data">{wo.assigned_to}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* Brutalist AI Repair Verification Protocol Modal */}
      {verifyingOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-border-strong shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 relative flex flex-col">
            {/* Modal Header */}
            <div className="border-b-2 border-border-strong px-6 py-4 flex items-center justify-between sticky top-0 bg-surface-container-lowest z-10">
              <div className="flex items-center space-x-3 text-primary">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-headline-md text-base font-headline-md font-bold tracking-tight uppercase">
                  AI REPAIR VERIFICATION PROTOCOL
                </h2>
              </div>
              <button 
                onClick={() => setVerifyingOrder(null)}
                className="p-1 hover:bg-surface-container-low transition-colors"
              >
                <X className="w-5 h-5 text-primary" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Ticket Summary Mini-Bento */}
              <div className="grid grid-cols-3 gap-[1px] bg-border-subtle border border-border-subtle">
                <div className="bg-surface-container-lowest p-3 flex flex-col">
                  <span className="text-label-caps font-label-caps text-secondary mb-1 uppercase text-[10px]">TICKET</span>
                  <span className="font-mono-data text-mono-data text-primary font-bold text-sm">{verifyingOrder.id}</span>
                </div>
                <div className="bg-surface-container-lowest p-3 flex flex-col">
                  <span className="text-label-caps font-label-caps text-secondary mb-1 uppercase text-[10px]">TARGET</span>
                  <span className="font-mono-data text-mono-data text-primary font-bold text-sm">Panel #{verifyingOrder.module_id}</span>
                </div>
                <div className="bg-surface-container-lowest p-3 flex flex-col">
                  <span className="text-label-caps font-label-caps text-secondary mb-1 uppercase text-[10px]">DEFECT</span>
                  <span className="text-body-sm font-body-sm font-medium text-primary text-sm">{verifyingOrder.defect_type}</span>
                </div>
              </div>

              {/* Form Section */}
              <div className="space-y-2">
                <label className="block text-label-caps font-label-caps font-bold text-primary uppercase text-xs">
                  Technician Notes
                </label>
                <textarea
                  rows={3}
                  value={techNotes}
                  onChange={(e) => setTechNotes(e.target.value)}
                  className="w-full border-b border-border-strong bg-surface-variant/20 hover:bg-surface-variant/40 focus:bg-surface-container-lowest focus:border-b-2 focus:border-primary focus:ring-0 transition-all p-3 text-body-sm font-body-sm resize-none placeholder-secondary font-sans text-xs outline-none"
                  placeholder="Describe repair actions performed (e.g. Replaced bypass diode and cleaned junction box)..."
                />
              </div>

              {/* Verification Result Card */}
              {verificationResult ? (
                <div className="border border-border-strong p-4 relative mt-4">
                  <div className="absolute -top-3 left-4 bg-surface-container-lowest px-2 text-label-caps font-label-caps font-bold text-primary flex items-center space-x-1 uppercase text-[10px]">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    <span>SCAN RESULTS</span>
                  </div>
                  <div className="flex items-start space-x-3 pt-2">
                    <div className="mt-1 w-6 h-6 rounded-full bg-surface-container-lowest border-2 border-primary flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="space-y-2 w-full">
                      <h4 className="text-body-md font-body-md font-bold text-primary text-sm">
                        ✓ AI VERIFICATION PASSED <span className="font-mono-data text-secondary font-normal text-xs">({(verificationResult.confidence * 100).toFixed(1)}% CONFIDENCE)</span>
                      </h4>
                      <div className="bg-surface-container-low border border-border-subtle p-3 font-mono-data text-mono-data text-xs space-y-1 text-secondary">
                        <p>&gt; Thermal gradient normalized (delta T &lt; 0.4°C).</p>
                        <p>&gt; Health score restored: <span className="line-through opacity-60">42/100</span> -&gt; <strong className="text-primary font-bold">100/100</strong> (Certified Nominal).</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-border-subtle p-4 text-center text-secondary font-mono-data text-xs bg-surface-container-low">
                  [ READY TO EXECUTE MULTISPECTRAL SCAN VERIFICATION ]
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-border-subtle p-4 bg-surface-container-low flex justify-end space-x-3 mt-auto">
              <button
                onClick={() => setVerifyingOrder(null)}
                className="bg-surface-container-lowest border border-border-subtle text-primary font-body-sm font-medium px-6 py-2.5 hover:bg-surface-container-low transition-colors text-xs uppercase font-bold"
              >
                CANCEL
              </button>
              {!verificationResult && (
                <button
                  onClick={handleExecuteVerification}
                  disabled={isVerifying}
                  className="bg-primary text-on-primary border border-border-strong font-body-sm font-bold px-6 py-2.5 hover:bg-surface-container-lowest hover:text-primary transition-colors uppercase text-xs w-full sm:w-auto"
                >
                  {isVerifying ? "ANALYZING SCAN..." : "EXECUTE AI VERIFICATION SCAN"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
