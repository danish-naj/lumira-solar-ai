import os

PORTAL_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Portals\FieldInspectorPortal.jsx"

p1 = """import React, { useState, useEffect } from "react";
import { 
  Camera, 
  Upload, 
  Check, 
  ArrowRight, 
  Brain, 
  Thermometer, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  Wrench, 
  Sparkles, 
  Plane, 
  Smartphone, 
  Car, 
  Compass, 
  Wind, 
  Sun, 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Layers, 
  MapPin,
  CheckSquare,
  Square,
  Radio,
  Sliders,
  Maximize2,
  Building2,
  Cpu,
  Target
} from "lucide-react";

export default function FieldInspectorPortal({ farm, onSubmitReportToClient, onNavigateTab }) {
  // Mission Mode: 'inspection' (Full Periodic Survey) | 'verification' (Targeted Post-Repair QA)
  const [missionMode, setMissionMode] = useState("verification"); // Auto-detected: Repaired work orders pending!

  // Master Stage Navigation:
  // 1 = Modality & Pre-Flight Check / Target Selection
  // 2 = Flight Planner (Full Sweep vs Targeted Spot Route)
  // 3 = Live In-Flight HUD (Full Sweep vs Spot Hover)
  // 4 = AI Diagnostics / Thermal Normalization QA
  // 5 = Report / Verified Certificate Forwarding
  const [currentStage, setCurrentStage] = useState(1);

  // Stage 1: Modality Selection & Dock Alpha Pre-Flight Check
  const [selectedMethods, setSelectedMethods] = useState(["Drone Orthomosaic"]);
  const [dockHatchOpen, setDockHatchOpen] = useState(false);

  // Targeted Post-Repair Repaired Modules Queue
  const repairedModulesQueue = [
    {
      id: "WO-8492-R12",
      module_id: "R12-C37",
      inverter: "INV-04",
      row: "Row 12 Column 37",
      repaired_by: "Tech #04 (R. Sharma)",
      repair_action: "Replaced bypass diode assembly & re-torqued DC lugs to 1.8 Nm",
      pre_repair_deltaT: "+18.4°C (Critical Hotspot)",
      post_repair_deltaT: "+0.2°C (Thermal Normalization)",
      verification_status: "Pending Inspector QA Sign-Off",
      opticalImg: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
      thermalImg: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "WO-8493-R04",
      module_id: "R04-C18",
      inverter: "INV-02",
      row: "Row 4 Column 18",
      repaired_by: "Tech #02 (K. Verma)",
      repair_action: "Re-soldered internal copper ribbon lead with thermal RTV sealant",
      pre_repair_deltaT: "+24.5°C (Burnout Hazard)",
      post_repair_deltaT: "+0.3°C (Normalized)",
      verification_status: "Pending Inspector QA Sign-Off",
      opticalImg: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
      thermalImg: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [selectedRepairedIdx, setSelectedRepairedIdx] = useState(0);

  // Flight Path Parameters
  const [altitudeM, setAltitudeM] = useState(35.0);
  const [speedMs, setSpeedMs] = useState(5.0);
  const [selectedWaypoint, setSelectedWaypoint] = useState(1);

  // Live In-Flight Collection HUD
  const [isCollecting, setIsCollecting] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentWaypoint, setCurrentWaypoint] = useState(1);
  const [cameraMode, setCameraMode] = useState("thermal"); // 'thermal' | 'optical'
  const [telemetry, setTelemetry] = useState({
    altitude: 35.0,
    speed: 5.0,
    frames: 0,
    thermalTemp: 41.2,
    batterySoC: 100,
    heading: 90
  });

  // Client Report Submission
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Lawnmower Flight Waypoints across Sector 4
  const flightWaypoints = [
    { id: 1, x: 50, y: 50, row: "Row 1-2 (North Edge)", label: "WP-01" },
    { id: 2, x: 350, y: 50, row: "Row 1-2 (East Turn)", label: "WP-02" },
    { id: 3, x: 350, y: 80, row: "Row 3-4 (Inbound East)", label: "WP-03" },
    { id: 4, x: 50, y: 80, row: "Row 3-4 (West Turn)", label: "WP-04" },
    { id: 5, x: 50, y: 110, row: "Row 5-6 (West Edge)", label: "WP-05" },
    { id: 6, x: 350, y: 110, row: "Row 5-6 (East Turn)", label: "WP-06" },
    { id: 7, x: 350, y: 140, row: "Row 7-8 (Inbound East)", label: "WP-07" },
    { id: 8, x: 50, y: 140, row: "Row 7-8 (West Turn)", label: "WP-08" },
    { id: 9, x: 50, y: 170, row: "Row 9-10 (West Edge)", label: "WP-09" },
    { id: 10, x: 350, y: 170, row: "Row 9-10 (East Turn)", label: "WP-10" },
    { id: 11, x: 350, y: 200, row: "Row 11-12 (Inbound East)", label: "WP-11" },
    { id: 12, x: 50, y: 200, row: "Row 11-12 (South Edge / Return)", label: "WP-12" },
  ];

  // Detected Defects (for Full Inspection Mode)
  const detectedDefects = [
    {
      id: "DEF-01",
      module_id: "R12-C37",
      inverter: "INV-04",
      type: "Cell #8 Diode Shunt Breakdown",
      severity: "Critical",
      deltaT: "+18.4°C",
      confidence: "99.4%",
      loss_inr: "₹44,050 / yr ($528)",
      region: "Upper-Right Bypass Sub-string (Cell 8)",
      action: "Replace bypass diode assembly & re-torque DC lugs"
    },
    {
      id: "DEF-02",
      module_id: "R04-C18",
      inverter: "INV-02",
      type: "Ribbon Lead Thermal Burnout",
      severity: "Critical",
      deltaT: "+24.5°C",
      confidence: "98.8%",
      loss_inr: "₹57,400 / yr ($688)",
      region: "Internal Ribbon Solder Joint",
      action: "Re-solder copper ribbon lead with thermal sealant"
    }
  ];

  // In-Flight Sweep Progress Simulator
  useEffect(() => {
    let timer = null;
    if (isCollecting && scanProgress < 100) {
      timer = setInterval(() => {
        setScanProgress((prev) => {
          const step = missionMode === "verification" ? 10 : 5; // Targeted spot verification is twice as fast!
          const next = prev + step;
          const wpIdx = Math.min(12, Math.floor((next / 100) * 12) + 1);
          setCurrentWaypoint(wpIdx);

          if (next >= 100) {
            setIsCollecting(false);
            setTelemetry((t) => ({ ...t, frames: missionMode === "verification" ? 48 : 1200, batterySoC: 88 }));
            setTimeout(() => {
              setCurrentStage(4); // Transition to AI Diagnostics / QA Verification
            }, 600);
            return 100;
          }

          setTelemetry((t) => ({
            ...t,
            frames: Math.floor((next / 100) * (missionMode === "verification" ? 48 : 1200)),
            batterySoC: Math.max(88, Math.floor(100 - (next / 100) * 12)),
            thermalTemp: (40.5 + Math.random() * 1.5).toFixed(1)
          }));
          return next;
        });
      }, 250);
    }
    return () => clearInterval(timer);
  }, [isCollecting, scanProgress, missionMode]);
"""

with open(PORTAL_FILE, "w", encoding="utf-8") as f:
    f.write(p1)
print("Wrote FieldInspectorPortal part 1.")
