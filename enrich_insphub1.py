import os

INSP_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\InspectionHub\InspectionHub.jsx"

p1 = """import React, { useState } from "react";
import { 
  Plane, 
  Smartphone, 
  Thermometer, 
  Car, 
  Sparkles, 
  Brain, 
  Layers, 
  ArrowRight, 
  Activity, 
  ShieldAlert, 
  Wrench, 
  CheckCircle2, 
  Eye, 
  Compass, 
  Sun, 
  Wind, 
  Database, 
  DollarSign,
  Zap
} from "lucide-react";

export default function InspectionHub({ farm, onNavigateToMap, onInspectionComplete }) {
  // Selected Hardware Source: 'drone' | 'phone' | 'flir' | 'rover'
  const [selectedSourceId, setSelectedSourceId] = useState("drone");
  const [activeLayer, setActiveLayer] = useState("xai"); // 'xai' | 'thermal' | 'rgb'
  const [selectedAnomalyIdx, setSelectedAnomalyIdx] = useState(0);

  // Hardware Sources & Their Latest Captured Data Streams
  const hardwareSources = [
    {
      id: "drone",
      name: "Drone Survey (Aerial IR + RGB)",
      hardware: "DJI Matrice 300 RTK + Zenmuse H20T Thermal",
      mission_id: "MIS-8492",
      captured_at: "Today, 09:30 AM",
      pilot: "Capt. A. Nair (Level-III Pilot #8492)",
      coverage: "1,200 Modules (Sector 4)",
      resolution: "0.5 cm/px GSD Orthomosaic",
      altitude: "35.0 m AGL",
      speed: "4.2 m/s",
      irradiance: "942 W/m² (Optimal)",
      icon: Plane,
      tag: "AERIAL SURVEY",
      anomalies: [
        {
          id: "ANOM-01",
          target: "R12-C37",
          inverter: "INV-04",
          type: "Bypass Diode Thermal Runaway",
          severity: "Critical",
          deltaT: "+18.4°C",
          loss_kwh: 1.42,
          annual_loss_inr: "₹44,050",
          annual_loss_usd: "$528",
          affected_region: "Upper-Right Bypass Sub-string (Cell 8)",
          electrical_effect: "Severe reverse-bias localized heating. Bypass diode internal short-circuit confirmed. Shunt resistance dropped below 0.05 Ω.",
          repair_action: "Replace sub-string Schottky bypass diode (15SQ045) & reseal junction box to 1.8 Nm.",
          safety_caution: "HIGH ARC FLASH HAZARD (>600V DC). Lockout/Tagout Inverter INV-04 DC Combiner before contact.",
          image_xai: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
          image_thermal: "https://images.unsplash.com/photo-1508873696983-2df570464753?auto=format&fit=crop&w=800&q=80",
          image_rgb: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
          box: { x: 35, y: 15, w: 40, h: 50 },
          confidence: 99.2
        },
        {
          id: "ANOM-02",
          target: "R04-C18",
          inverter: "INV-02",
          type: "Ribbon Lead Burnout & Hotspot",
          severity: "Critical",
          deltaT: "+24.5°C",
          loss_kwh: 1.58,
          annual_loss_inr: "₹48,900",
          annual_loss_usd: "$586",
          affected_region: "Center Sub-string Lead Conductor",
          electrical_effect: "Discontinuity in primary silver busbar ribbon conductor causing extreme localized arc heating (+24.5°C).",
          repair_action: "Isolate string and solder internal ribbon lead bridge to restore sub-string continuity.",
          safety_caution: "Fire hazard risk. Isolate string combiner immediately with 1000V dielectric gloves.",
          image_xai: "https://images.unsplash.com/photo-1508873696983-2df570464753?auto=format&fit=crop&w=800&q=80",
          image_thermal: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
          image_rgb: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
          box: { x: 40, y: 20, w: 35, h: 45 },
          confidence: 98.7
        }
      ]
    },
    {
      id: "phone",
      name: "Smartphone / Field Camera (Ground Optical)",
      hardware: "High-GSD Optical Camera with Macro Ring Filter",
      mission_id: "MIS-8482",
      captured_at: "Today, 11:15 AM",
      pilot: "Tech #04 (R. Sharma - Field Ground Check)",
      coverage: "Strings 1-8 (Sector 4 Macro)",
      resolution: "0.1 mm/px Macro Resolution",
      altitude: "1.2 m Ground Level",
      speed: "Manual Inspection",
      irradiance: "945 W/m²",
      icon: Smartphone,
      tag: "GROUND MACRO",
      anomalies: [
        {
          id: "ANOM-03",
          target: "R07-C45",
          inverter: "INV-05",
          type: "Wafer Busbar Microcrack",
          severity: "High",
          deltaT: "+4.2°C",
          loss_kwh: 0.88,
          annual_loss_inr: "₹27,300",
          annual_loss_usd: "$328",
          affected_region: "Center Cell #14 Main Busbars 2 & 3",
          electrical_effect: "Mechanical impact stress fissure traversing silver metallization fingers. Localized current restriction active.",
          repair_action: "Conduct micro-soldering bridge on fractured silver fingers and apply UV sealant.",
          safetyCaution: "Fragile frontsheet glass. Use vacuum lifters; do not apply localized mechanical pressure.",
          image_xai: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
          image_thermal: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
          image_rgb: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
          box: { x: 30, y: 25, w: 45, h: 40 },
          confidence: 97.8
        },
        {
          id: "ANOM-04",
          target: "R18-C52",
          inverter: "INV-06",
          type: "Silver Finger Snail Trail",
          severity: "Low",
          deltaT: "+0.8°C",
          loss_kwh: 0.25,
          annual_loss_inr: "₹4,200",
          annual_loss_usd: "$50",
          affected_region: "Frontsheet Silver Fingers (Lower Cell)",
          electrical_effect: "Moisture & carbon dioxide ingress causing silver nanoparticle dissolution. Discoloration stabilized without bypass activation.",
          repair_action: "No immediate replacement required. Log for quarterly degradation tracking.",
          safetyCaution: "Ensure edge sealant integrity during next scheduled washing cycle.",
          image_xai: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
          image_thermal: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
          image_rgb: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
          box: { x: 25, y: 40, w: 50, h: 30 },
          confidence: 96.2
        }
      ]
    },
    {
      id: "flir",
      name: "Handheld Thermal (FLIR Thermography)",
      hardware: "FLIR T865 640x480 Calibrated Radiometric",
      mission_id: "MIS-8488",
      captured_at: "Today, 10:00 AM",
      pilot: "Capt. A. Nair (Certified Level-III Thermographer)",
      coverage: "Inverters INV-03 & INV-04 Combiners",
      resolution: "NETD < 30 mK Thermal Sensitivity",
      altitude: "Spot Ground Check",
      speed: "Calibrated Spot Inspection",
      irradiance: "940 W/m² · Emissivity 0.92",
      icon: Thermometer,
      tag: "THERMOGRAPHY",
      anomalies: [
        {
          id: "ANOM-05",
          target: "R12-C37",
          inverter: "INV-04",
          type: "Severe Sub-string Reverse Bias Runaway",
          severity: "Critical",
          deltaT: "+18.4°C",
          loss_kwh: 1.42,
          annual_loss_inr: "₹44,050",
          annual_loss_usd: "$528",
          affected_region: "Upper-Right Cell Matrix Sub-string L3",
          electrical_effect: "Direct spot thermography confirmed +18.4°C localized thermal runaway. Diode p-n junction short-circuit active.",
          repair_action: "Replace sub-string Schottky bypass diode (15SQ045) & reseal junction box to 1.8 Nm.",
          safety_caution: "Lockout/Tagout DC-04 combiner before contact. Arc flash shield mandatory.",
          image_xai: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
          image_thermal: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
          image_rgb: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
          box: { x: 35, y: 15, w: 40, h: 50 },
          confidence: 99.4
        }
      ]
    },
    {
      id: "rover",
      name: "Ground Rover / Vehicle (LIDAR + Multi-Angle)",
      hardware: "SolarRover Autonomous Crawler Bot",
      mission_id: "MIS-8469",
      captured_at: "Yesterday, 04:30 PM",
      pilot: "Autonomous Rover Controller",
      coverage: "Sector 4 Array Tracker Rows 1-20",
      resolution: "4K Multi-Angle Tilt Ingestion",
      altitude: "On-Track Frame Crawler",
      speed: "1.5 m/s",
      irradiance: "890 W/m²",
      icon: Car,
      tag: "GROUND ROVER",
      anomalies: [
        {
          id: "ANOM-06",
          target: "R15-C22",
          inverter: "INV-01",
          type: "Heavy Desert Sand Encrustation",
          severity: "Medium",
          deltaT: "+1.2°C",
          loss_kwh: 0.65,
          annual_loss_inr: "₹35,680",
          annual_loss_usd: "$428",
          affected_region: "Lower Cell Matrix Front Glass",
          electrical_effect: "Heavy silica sand accumulation reducing optical transmission by 24.2%. Current generation constrained across sub-string.",
          repair_action: "Deploy autonomous robotic dry-brush cleaning unit with deionized water rinse.",
          safety_caution: "Ensure tracker table is locked at 0° horizontal stow before placing cleaning unit.",
          image_xai: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
          image_thermal: "https://images.unsplash.com/photo-1508873696983-2df570464753?auto=format&fit=crop&w=800&q=80",
          image_rgb: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
          box: { x: 20, y: 35, w: 60, h: 45 },
          confidence: 98.4
        }
      ]
    }
  ];

  const currentSource = hardwareSources.find(s => s.id === selectedSourceId) || hardwareSources[0];
  const currentAnomaly = currentSource.anomalies[selectedAnomalyIdx] || currentSource.anomalies[0];

  const currentDisplayImage = activeLayer === "xai" 
    ? currentAnomaly.image_xai 
    : activeLayer === "thermal" 
    ? currentAnomaly.image_thermal 
    : currentAnomaly.image_rgb;
"""

with open(INSP_FILE, "w", encoding="utf-8") as f:
    f.write(p1)

print("Wrote InspectionHub logic p1.")
