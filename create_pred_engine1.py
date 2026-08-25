import os

PRED_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Predictive\PredictiveYieldEngine.jsx"

p1 = """import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Sun, 
  Wind, 
  Thermometer, 
  Layers, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Zap, 
  Clock, 
  ArrowRight, 
  Activity, 
  Sliders,
  Cloud
} from "lucide-react";

export default function PredictiveYieldEngine({ farm }) {
  const [cloudSpeed, setCloudSpeed] = useState(4.5); // m/s
  const [cloudCoverage, setCloudCoverage] = useState(30); // %
  const [cleaningDayThreshold, setCleaningDayThreshold] = useState(5);
  const [cloudOffset, setCloudOffset] = useState(0);

  // Next-7-Day Generation & Meteorological ML Forecast
  const sevenDayForecast = [
    { day: "Wed (Today)", date: "26 Aug", ghi: "942 W/m²", temp_max: "41.8°C", cloud: "10%", predicted_mwh: 248.5, revenue_inr: "₹14.91 L", revenue_usd: "$17.89K", status: "Optimal" },
    { day: "Thu", date: "27 Aug", ghi: "955 W/m²", temp_max: "42.5°C", cloud: "5%", predicted_mwh: 251.2, revenue_inr: "₹15.07 L", revenue_usd: "$18.08K", status: "Optimal" },
    { day: "Fri", date: "28 Aug", ghi: "910 W/m²", temp_max: "40.2°C", cloud: "25%", predicted_mwh: 239.8, revenue_inr: "₹14.38 L", revenue_usd: "$17.25K", status: "Scattered Clouds" },
    { day: "Sat", date: "29 Aug", ghi: "880 W/m²", temp_max: "39.0°C", cloud: "40%", predicted_mwh: 228.4, revenue_inr: "₹13.70 L", revenue_usd: "$16.44K", status: "Cloud Vectors" },
    { day: "Sun (Optimal Clean)", date: "30 Aug", ghi: "960 W/m²", temp_max: "43.0°C", cloud: "0%", predicted_mwh: 254.8, revenue_inr: "₹15.28 L", revenue_usd: "$18.34K", status: "High Solar Peak" },
    { day: "Mon", date: "31 Aug", ghi: "948 W/m²", temp_max: "42.1°C", cloud: "10%", predicted_mwh: 249.6, revenue_inr: "₹14.97 L", revenue_usd: "$17.96K", status: "Optimal" },
    { day: "Tue", date: "01 Sep", ghi: "940 W/m²", temp_max: "41.5°C", cloud: "15%", predicted_mwh: 247.1, revenue_inr: "₹14.82 L", revenue_usd: "$17.78K", status: "Optimal" },
  ];

  // Animated Cloud Vector Movement Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCloudOffset((prev) => (prev >= 400 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);
"""

with open(PRED_FILE, "w", encoding="utf-8") as f:
    f.write(p1)

print("Wrote PredictiveYieldEngine logic p1.")
