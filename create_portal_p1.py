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
  Maximize2
} from "lucide-react";

export default function FieldInspectorPortal({ farm, onSubmitReportToClient, onNavigateTab }) {
  // Master Stage Navigation:
  // 1 = Modality Selection & Dock Alpha Pre-Flight Check
  // 2 = Interactive Flight Path Planning & Physics
  // 3 = In-Flight Live Data Collection HUD (Automated Sweep WP 1-12)
  // 4 = AI Anomaly Diagnostics & Loss Analysis
  // 5 = Official Certified Report & 1-Click Client Forwarding
  const [currentStage, setCurrentStage] = useState(1);

  // Stage 1: Modality Selection & Dock Alpha Pre-Flight Check
  const [selectedMethods, setSelectedMethods] = useState(["Drone Orthomosaic"]);
  const [dockHatchOpen, setDockHatchOpen] = useState(false);
  const [dockStatus, setDockStatus] = useState("Rapid Charged (100%)");

  // Stage 2: Flight Path Parameters
  const [altitudeM, setAltitudeM] = useState(35.0);
  const [speedMs, setSpeedMs] = useState(5.0);
  const [frontOverlap, setFrontOverlap] = useState(80);
  const [sideOverlap, setSideOverlap] = useState(75);
  const [gimbalPitch, setGimbalPitch] = useState(-90);
  const [selectedWaypoint, setSelectedWaypoint] = useState(1);

  // Stage 3: Live In-Flight Collection HUD
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

  // Stage 4: AI Anomaly Diagnostics
  const [selectedDefectIdx, setSelectedDefectIdx] = useState(0);
  const [visualLayer, setVisualLayer] = useState("heatmap"); // 'heatmap' | 'thermal' | 'optical'

  // Stage 5: Client Report Submission
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // 12 Lawnmower Flight Waypoints across Sector 4
  const flightWaypoints = [
    { id: 1, x: 50, y: 50, row: "Row 1-2 (North Edge)", label: "WP-01", alt: "35m", speed: "5.0m/s" },
    { id: 2, x: 350, y: 50, row: "Row 1-2 (East Turn)", label: "WP-02", alt: "35m", speed: "5.0m/s" },
    { id: 3, x: 350, y: 80, row: "Row 3-4 (Inbound East)", label: "WP-03", alt: "35m", speed: "5.0m/s" },
    { id: 4, x: 50, y: 80, row: "Row 3-4 (West Turn)", label: "WP-04", alt: "35m", speed: "5.0m/s" },
    { id: 5, x: 50, y: 110, row: "Row 5-6 (West Edge)", label: "WP-05", alt: "35m", speed: "5.0m/s" },
    { id: 6, x: 350, y: 110, row: "Row 5-6 (East Turn)", label: "WP-06", alt: "35m", speed: "5.0m/s" },
    { id: 7, x: 350, y: 140, row: "Row 7-8 (Inbound East)", label: "WP-07", alt: "35m", speed: "5.0m/s" },
    { id: 8, x: 50, y: 140, row: "Row 7-8 (West Turn)", label: "WP-08", alt: "35m", speed: "5.0m/s" },
    { id: 9, x: 50, y: 170, row: "Row 9-10 (West Edge)", label: "WP-09", alt: "35m", speed: "5.0m/s" },
    { id: 10, x: 350, y: 170, row: "Row 9-10 (East Turn)", label: "WP-10", alt: "35m", speed: "5.0m/s" },
    { id: 11, x: 350, y: 200, row: "Row 11-12 (Inbound East)", label: "WP-11", alt: "35m", speed: "5.0m/s" },
    { id: 12, x: 50, y: 200, row: "Row 11-12 (South Edge / Return)", label: "WP-12", alt: "35m", speed: "5.0m/s" },
  ];

  // Detected Defects from Mission
  const detectedDefects = [
    {
      id: "DEF-01",
      module_id: "R12-C37",
      inverter: "INV-04",
      type: "Cell #8 Diode Shunt Breakdown",
      severity: "Critical",
      deltaT: "+18.4°C",
      confidence: "99.4%",
      loss_kwh: 1.42,
      loss_inr: "₹44,050 / yr ($528)",
      region: "Upper-Right Bypass Sub-string (Cell 8)",
      action: "Replace bypass diode assembly & re-torque DC lugs",
      opticalImg: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
      thermalImg: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "DEF-02",
      module_id: "R04-C18",
      inverter: "INV-02",
      type: "Ribbon Lead Thermal Burnout",
      severity: "Critical",
      deltaT: "+24.5°C",
      confidence: "98.8%",
      loss_kwh: 1.85,
      loss_inr: "₹57,400 / yr ($688)",
      region: "Internal Ribbon Solder Joint",
      action: "Re-solder copper ribbon lead with thermal sealant",
      opticalImg: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
      thermalImg: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "DEF-03",
      module_id: "R07-C45",
      inverter: "INV-05",
      type: "Wafer Busbar Microfracture Lattice",
      severity: "High",
      deltaT: "+4.2°C",
      confidence: "97.6%",
      loss_kwh: 0.88,
      loss_inr: "₹27,300 / yr ($328)",
      region: "Center Cell #14 Main Busbar",
      action: "Apply micro-soldering bridge on silver fingers 2 & 3",
      opticalImg: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
      thermalImg: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "DEF-04",
      module_id: "R15-C22",
      inverter: "INV-01",
      type: "Desert Sand & Calcareous Encrustation",
      severity: "Medium",
      deltaT: "+1.2°C",
      confidence: "98.2%",
      loss_kwh: 0.65,
      loss_inr: "₹20,150 / yr ($242)",
      region: "Lower Array Surface Glass",
      action: "Dispatch waterless micro-fiber crawler robot",
      opticalImg: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
      thermalImg: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Stage 3: Live In-Flight Sweep Progress Simulator
  useEffect(() => {
    let timer = null;
    if (isCollecting && scanProgress < 100) {
      timer = setInterval(() => {
        setScanProgress((prev) => {
          const next = prev + 5;
          const wpIdx = Math.min(12, Math.floor((next / 100) * 12) + 1);
          setCurrentWaypoint(wpIdx);

          if (next >= 100) {
            setIsCollecting(false);
            setTelemetry((t) => ({ ...t, frames: 1200, batterySoC: 64 }));
            setTimeout(() => {
              setCurrentStage(4); // Automatically transition to AI Diagnostics when flight completes!
            }, 800);
            return 100;
          }

          setTelemetry((t) => ({
            ...t,
            frames: Math.floor((next / 100) * 1200),
            batterySoC: Math.max(64, Math.floor(100 - (next / 100) * 36)),
            thermalTemp: (40.5 + Math.random() * 2.0).toFixed(1)
          }));
          return next;
        });
      }, 350);
    }
    return () => clearInterval(timer);
  }, [isCollecting, scanProgress]);
"""

with open(PORTAL_FILE, "w", encoding="utf-8") as f:
    f.write(p1)
print("Wrote FieldInspectorPortal part 1.")
