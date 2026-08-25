import os

DASHBOARD_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Dashboard\DashboardView.jsx"

p1 = """import React, { useState } from "react";
import { 
  ShieldAlert, 
  TrendingDown, 
  Wrench, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Layers, 
  Sun, 
  Wind, 
  Thermometer, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Cpu, 
  Building2, 
  DollarSign, 
  AlertTriangle, 
  FileText, 
  X,
  Compass,
  BarChart3,
  MapPin,
  Check
} from "lucide-react";

export default function DashboardView({ farm, onNavigateTab, onSelectModule }) {
  // Deep-dive Modal State
  const [activeModal, setActiveModal] = useState(null);

  // Inverter Fleet Live Telemetry (INV-01 to INV-06)
  const inverters = [
    { id: "INV-01", name: "Sungrow SG3125HV #1", power_kw: 3080, target_kw: 3125, dc_v: 1245, temp_c: 48.2, health: 98, status: "Optimal" },
    { id: "INV-02", name: "Sungrow SG3125HV #2", power_kw: 2890, target_kw: 3125, dc_v: 1180, temp_c: 54.6, health: 91, status: "String Mismatch" },
    { id: "INV-03", name: "Sungrow SG3125HV #3", power_kw: 3110, target_kw: 3125, dc_v: 1250, temp_c: 47.9, health: 99, status: "Optimal" },
    { id: "INV-04", name: "Sungrow SG3125HV #4", power_kw: 2750, target_kw: 3125, dc_v: 1140, temp_c: 58.4, health: 86, status: "Hotspot Alert" },
    { id: "INV-05", name: "Sungrow SG3125HV #5", power_kw: 3040, target_kw: 3125, dc_v: 1238, temp_c: 49.1, health: 97, status: "Optimal" },
    { id: "INV-06", name: "Sungrow SG3125HV #6", power_kw: 3095, target_kw: 3125, dc_v: 1248, temp_c: 48.5, health: 98, status: "Optimal" },
  ];

  // Failure Mode Taxonomy Breakdown
  const defectTaxonomy = [
    { type: "Thermal Hotspots", count: 8, deltaT: "+18.4°C", severity: "Critical", loss_kwh: 1.42, annual_loss_inr: "₹44,050", annual_loss_usd: "$528", primaryMod: "R12-C37", action: "Diode Replacement" },
    { type: "Wafer Microcracks", count: 14, deltaT: "+4.2°C", severity: "High", loss_kwh: 0.88, annual_loss_inr: "₹27,300", annual_loss_usd: "$328", primaryMod: "R07-C45", action: "Micro-soldering" },
    { type: "Desert Sand Soiling", count: 42, deltaT: "+1.2°C", severity: "Medium", loss_kwh: 0.65, annual_loss_inr: "₹35,680", annual_loss_usd: "$428", primaryMod: "R15-C22", action: "Robotic Wash" },
    { type: "Potential-Induced Degradation (PID)", count: 3, deltaT: "+6.5°C", severity: "High", loss_kwh: 0.95, annual_loss_inr: "₹18,400", annual_loss_usd: "$220", primaryMod: "R08-C50", action: "Anti-PID Offset" },
    { type: "Vegetation Shading", count: 6, deltaT: "+2.1°C", severity: "Medium", loss_kwh: 0.45, annual_loss_inr: "₹8,900", annual_loss_usd: "$106", primaryMod: "R20-C10", action: "Perimeter Trim" },
    { type: "Snail Trails", count: 12, deltaT: "+0.8°C", severity: "Low", loss_kwh: 0.25, annual_loss_inr: "₹4,200", annual_loss_usd: "$50", primaryMod: "R18-C52", action: "Monitor" },
  ];

  // High Priority Action Items
  const actionQueue = [
    { id: "ACT-01", module: "R12-C37", inverter: "INV-04", issue: "Severe Bypass Diode Hotspot (+18.4°C)", urgency: "Critical (P1)", assigned: "Tech #04 (R. Sharma)", sla: "14h Remaining", cost: "₹4,500" },
    { id: "ACT-02", module: "R04-C18", inverter: "INV-02", issue: "Ribbon Lead Burnout & Hotspot (+24.5°C)", urgency: "Critical (P1)", assigned: "Tech #02 (K. Verma)", sla: "6h Remaining", cost: "₹5,200" },
    { id: "ACT-03", module: "R15-C22", inverter: "INV-01", issue: "Heavy Desert Sand Soiling (24.2% Opacity)", urgency: "Medium (P3)", assigned: "Cleaning Crew Alpha", sla: "36h Remaining", cost: "₹1,200" }
  ];
"""

with open(DASHBOARD_FILE, "w", encoding="utf-8") as f:
    f.write(p1)
print("Wrote DashboardView p1")
