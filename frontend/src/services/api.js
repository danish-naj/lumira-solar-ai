const API_BASE = "http://localhost:8000/api";

export async function fetchFarms() {
  const res = await fetch(`${API_BASE}/farms`);
  if (!res.ok) throw new Error("Failed to fetch farms");
  return res.json();
}

export async function fetchFarm(farmId) {
  const res = await fetch(`${API_BASE}/farms/${farmId}`);
  if (!res.ok) throw new Error("Failed to fetch farm");
  return res.json();
}

export async function fetchModules(farmId, filters = {}) {
  const params = new URLSearchParams();
  if (filters.defect_type && filters.defect_type !== "ALL") params.append("defect_type", filters.defect_type);
  if (filters.severity && filters.severity !== "ALL") params.append("severity", filters.severity);
  if (filters.inverter_id && filters.inverter_id !== "ALL") params.append("inverter_id", filters.inverter_id);
  
  const res = await fetch(`${API_BASE}/farms/${farmId}/modules?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch modules");
  return res.json();
}

export async function fetchModuleDetail(farmId, moduleId) {
  const res = await fetch(`${API_BASE}/farms/${farmId}/modules/${moduleId}`);
  if (!res.ok) throw new Error("Failed to fetch module");
  return res.json();
}

export async function uploadInspection(data) {
  const res = await fetch(`${API_BASE}/inspect/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Inspection failed");
  return res.json();
}

export async function fetchScadaReadings(farmId) {
  const res = await fetch(`${API_BASE}/scada/readings/${farmId}`);
  if (!res.ok) throw new Error("Failed to fetch SCADA");
  return res.json();
}

export async function fetchWorkOrders(farmId) {
  const res = await fetch(`${API_BASE}/workorders/${farmId}`);
  if (!res.ok) throw new Error("Failed to fetch work orders");
  return res.json();
}

export async function createWorkOrder(farmId, moduleId, defectType, severity) {
  const params = new URLSearchParams({ farm_id: farmId, module_id: moduleId, defect_type: defectType, severity });
  const res = await fetch(`${API_BASE}/workorders?${params.toString()}`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to create work order");
  return res.json();
}

export async function updateWorkOrderStatus(farmId, orderId, status, notes = "") {
  const params = new URLSearchParams({ status, notes });
  const res = await fetch(`${API_BASE}/workorders/${farmId}/${orderId}?${params.toString()}`, { method: "PUT" });
  if (!res.ok) throw new Error("Failed to update work order");
  return res.json();
}

export async function verifyRepair(farmId, orderId, data) {
  const res = await fetch(`${API_BASE}/workorders/${farmId}/${orderId}/verify-repair`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Repair verification failed");
  return res.json();
}

export async function fetchReportSummary(farmId) {
  const res = await fetch(`${API_BASE}/reports/${farmId}/summary`);
  if (!res.ok) throw new Error("Failed to fetch report");
  return res.json();
}

export const fetchExecutiveReport = fetchReportSummary;

export function getExportCsvUrl(farmId) {
  return `${API_BASE}/reports/${farmId}/export-csv`;
}
