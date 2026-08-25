import os

LABS_DIR = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\BreakthroughLabs"
os.makedirs(LABS_DIR, exist_ok=True)

LABS_FILE = os.path.join(LABS_DIR, "BreakthroughLabs.jsx")

p1 = """import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Layers, 
  Sun, 
  Flame, 
  Leaf, 
  Satellite, 
  Moon, 
  BatteryCharging, 
  Radio, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Activity, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  Clock, 
  Maximize2,
  DollarSign,
  Cpu
} from "lucide-react";

export default function BreakthroughLabs({ farm, onNavigateTab }) {
  // Active Lab Module: 'bifacial' | 'terrain' | 'fire' | 'carbon' | 'sar' | 'el' | 'bess' | 'dock' | 'cyber'
  const [activeLab, setActiveLab] = useState("bifacial");

  // State for Lab 1: Bifacial Albedo
  const [albedoValue, setAlbedoValue] = useState(0.28); // 0.15 - 0.40
  const [frontGHI, setFrontGHI] = useState(942); // W/m²

  // State for Lab 2: Terrain Backtracking
  const [terrainSlope, setTerrainSlope] = useState(3.5); // degrees
  const [trackerTilt, setTrackerTilt] = useState(42.5); // degrees
  const [shadingMitigated, setShadingMitigated] = useState(true);

  // State for Lab 3: Thermal Runaway Cascade
  const [diodeTemp, setDiodeTemp] = useState(88.4); // °C
  const [stringTripped, setStringTripped] = useState(false);

  // State for Lab 4: Carbon Credit & Green Hydrogen
  const [carbonPriceINR, setCarbonPriceINR] = useState(1000); // ₹ per ton CO2

  // State for Lab 7: BESS Arbitrage
  const [gridSpotPrice, setGridSpotPrice] = useState(4.85); // ₹/kWh

  // State for Lab 8: Drone Dock
  const [dockStatus, setDockStatus] = useState("Charging (84%)");
  const [dockHatchOpen, setDockHatchOpen] = useState(false);

  // State for Lab 9: Cyber Defense
  const [cyberAlerts, setCyberAlerts] = useState([
    { id: "CYB-101", ip: "192.168.1.104", type: "Modbus/TCP Unauthorized Register Write (Holding Register 40012)", severity: "Blocked", time: "10 mins ago" },
    { id: "CYB-102", ip: "10.0.4.22", type: "Inverter Frequency Desync Pulse Injection", severity: "Quarantined", time: "25 mins ago" }
  ]);

  const labsMenu = [
    { id: "bifacial", name: "1. Bifacial Albedo Engine", icon: Layers, tag: "DUAL-SIDED PHYSICS" },
    { id: "terrain", name: "2. Terrain Backtracking AI", icon: Sun, tag: "SHADOW OPTIMIZER" },
    { id: "fire", name: "3. Fire Cascade Predictor", icon: Flame, tag: "THERMAL CASCADE" },
    { id: "carbon", name: "4. Carbon & Green H₂", icon: Leaf, tag: "I-REC & H2 YIELD" },
    { id: "sar", name: "5. Satellite SAR Subsidence", icon: Satellite, tag: "FOUNDATION RADAR" },
    { id: "el", name: "6. EL Night X-Ray Tomogram", icon: Moon, tag: "WAFER TOMOGRAPHY" },
    { id: "bess", name: "7. Spot BESS & VPP FFR", icon: BatteryCharging, tag: "GRID ARBITRAGE" },
    { id: "dock", name: "8. Drone Nest 24/7 Dock", icon: Radio, tag: "ZERO-PILOT HANGAR" },
    { id: "cyber", name: "9. SCADA Cyber Firewall", icon: ShieldCheck, tag: "INTRUSION SHIELD" },
  ];
"""

with open(LABS_FILE, "w", encoding="utf-8") as f:
    f.write(p1)

print("Wrote BreakthroughLabs state and data p1.")
