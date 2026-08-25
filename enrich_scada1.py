import os

SCADA_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\GuidedInspection\GuidedInspection.jsx"

p1 = """import React, { useState, useEffect } from "react";
import { 
  Zap, 
  TrendingDown, 
  Navigation, 
  ArrowRight, 
  Crosshair, 
  Brain, 
  Grid, 
  AlertTriangle, 
  Timer, 
  Clock, 
  Activity, 
  Sun, 
  Wind, 
  Thermometer, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Sliders
} from "lucide-react";
import { fetchScadaReadings } from "../../services/api";

export default function GuidedInspection({ farm, onNavigateToMap }) {
  const [selectedString, setSelectedString] = useState("INV-04-STR04");
  const [curveMode, setCurveMode] = useState("IV"); // 'IV' | 'PV'

  // Central Inverter Fleet Telemetry
  const inverters = [
    { id: "INV-01", name: "Sungrow SG3125HV #1", power_kw: 3080, dc_v: 1245, dc_a: 2470, eff: "98.9%", temp: 48.2, status: "Optimal" },
    { id: "INV-02", name: "Sungrow SG3125HV #2", power_kw: 2890, dc_v: 1180, dc_a: 2450, eff: "97.4%", temp: 54.6, status: "Mismatch" },
    { id: "INV-03", name: "Sungrow SG3125HV #3", power_kw: 3110, dc_v: 1250, dc_a: 2490, eff: "99.1%", temp: 47.9, status: "Optimal" },
    { id: "INV-04", name: "Sungrow SG3125HV #4", power_kw: 2750, dc_v: 1140, dc_a: 2410, eff: "96.2%", temp: 58.4, status: "Hotspot Alert" },
    { id: "INV-05", name: "Sungrow SG3125HV #5", power_kw: 3040, dc_v: 1238, dc_a: 2460, eff: "98.8%", temp: 49.1, status: "Optimal" },
    { id: "INV-06", name: "Sungrow SG3125HV #6", power_kw: 3095, dc_v: 1248, dc_a: 2480, eff: "98.9%", temp: 48.5, status: "Optimal" },
  ];

  // String Combiner Fleet Ranking & Anomaly Table (Top 8 ranked by deviation)
  const stringRankings = [
    { id: "INV-04-STR04", inverter: "INV-04", target_module: "R12-C37", voltage_v: 32.4, nominal_v: 41.8, current_a: 9.8, nominal_a: 12.9, deviation_pct: "-22.5%", delta_t: "+18.4°C", issue: "Bypass Diode Thermal Runaway", status: "Critical (P1)", is_anomalous: true },
    { id: "INV-02-STR02", inverter: "INV-02", target_module: "R04-C18", voltage_v: 28.6, nominal_v: 41.8, current_a: 8.4, nominal_a: 12.9, deviation_pct: "-31.6%", delta_t: "+24.5°C", issue: "Ribbon Lead Fracture", status: "Critical (P1)", is_anomalous: true },
    { id: "INV-05-STR07", inverter: "INV-05", target_module: "R07-C45", voltage_v: 38.2, nominal_v: 41.8, current_a: 11.2, nominal_a: 12.9, deviation_pct: "-8.6%", delta_t: "+4.2°C", issue: "Wafer Busbar Microcrack", status: "High (P2)", is_anomalous: true },
    { id: "INV-01-STR03", inverter: "INV-01", target_module: "R15-C22", voltage_v: 39.5, nominal_v: 41.8, current_a: 10.8, nominal_a: 12.9, deviation_pct: "-5.5%", delta_t: "+1.2°C", issue: "Desert Sand Soiling", status: "Medium (P3)", is_anomalous: true },
    { id: "INV-03-STR01", inverter: "INV-03", target_module: "R01-C01", voltage_v: 41.7, nominal_v: 41.8, current_a: 12.8, nominal_a: 12.9, deviation_pct: "-0.2%", delta_t: "+0.1°C", issue: "Nominal Operating State", status: "Optimal", is_anomalous: false },
    { id: "INV-06-STR05", inverter: "INV-06", target_module: "R18-C52", voltage_v: 41.5, nominal_v: 41.8, current_a: 12.7, nominal_a: 12.9, deviation_pct: "-0.7%", delta_t: "+0.3°C", issue: "Nominal Operating State", status: "Optimal", is_anomalous: false },
  ];

  const currentActiveString = stringRankings.find(s => s.id === selectedString) || stringRankings[0];
"""

with open(SCADA_FILE, "w", encoding="utf-8") as f:
    f.write(p1)

print("Wrote GuidedInspection p1.")
