import os

PLANNER_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\FlightPlanner\DroneFlightPlanner.jsx"

p1 = """import React, { useState, useEffect } from "react";
import { 
  Plane, 
  Play, 
  Pause, 
  RotateCcw, 
  Crosshair, 
  Layers, 
  Compass, 
  Zap, 
  Sun, 
  Wind, 
  Thermometer, 
  CheckCircle2, 
  Car, 
  Sparkles, 
  ShieldAlert, 
  ArrowRight,
  Maximize2
} from "lucide-react";

export default function DroneFlightPlanner({ farm, onNavigateToMap }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentWaypoint, setCurrentWaypoint] = useState(1);
  const [flightProgress, setFlightProgress] = useState(15);
  const [droneAltitude, setDroneAltitude] = useState(35); // meters AGL
  const [droneSpeed, setDroneSpeed] = useState(4.2); // m/s
  const [gimbalPitch, setGimbalPitch] = useState(90); // 90° = Nadir
  const [cameraMode, setCameraMode] = useState("thermal"); // 'thermal' | 'rgb'
  const [swarmRoverDispatched, setSwarmRoverDispatched] = useState(false);

  // Flight Path Waypoints (Lawnmower Sweep across Sector 4)
  const waypoints = [
    { id: 1, x: 50, y: 40, label: "WP-01 (Start Array)", status: "Completed" },
    { id: 2, x: 200, y: 40, label: "WP-02 (Turn 1)", status: "Completed" },
    { id: 3, x: 350, y: 40, label: "WP-03 (Turn 2)", status: "In Progress" },
    { id: 4, x: 450, y: 40, label: "WP-04 (Row End)", status: "Queued" },
    { id: 5, x: 450, y: 90, label: "WP-05 (Row 2 Start)", status: "Queued" },
    { id: 6, x: 300, y: 90, label: "WP-06 (Sweep Left)", status: "Queued" },
    { id: 7, x: 150, y: 90, label: "WP-07 (Sweep Left)", status: "Queued" },
    { id: 8, x: 50, y: 90, label: "WP-08 (Row 2 End)", status: "Queued" },
    { id: 9, x: 50, y: 140, label: "WP-09 (Row 3 Start)", status: "Queued" },
    { id: 10, x: 250, y: 140, label: "WP-10 (Hotspot Alert)", status: "Queued" },
    { id: 11, x: 450, y: 140, label: "WP-11 (Row 3 End)", status: "Queued" },
    { id: 12, x: 450, y: 190, label: "WP-12 (Final Approach)", status: "Queued" },
  ];

  useEffect(() => {
    let interval = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setFlightProgress((prev) => {
          if (prev >= 100) {
            setIsSimulating(false);
            return 100;
          }
          return prev + 2;
        });
        setCurrentWaypoint((prev) => (prev < 12 ? prev + 1 : 12));
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleDispatchSwarm = () => {
    setSwarmRoverDispatched(true);
  };
"""

with open(PLANNER_FILE, "w", encoding="utf-8") as f:
    f.write(p1)

print("Wrote DroneFlightPlanner p1.")
