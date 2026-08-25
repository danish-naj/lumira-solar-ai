import React, { useState } from "react";
import { 
  Car, 
  Sparkles, 
  BatteryCharging, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Sliders, 
  Zap, 
  Droplet
} from "lucide-react";

export default function RoboticSwarmFleet({ farm }) {
  const [swarmActive, setSwarmActive] = useState(true);
  const [brushRPM, setBrushRPM] = useState(1200);

  const swarmBots = [
    { id: "BOT-01", name: "Crawler Alpha-1", row: "Sector 4 Row 15", battery: "92%", brush_rpm: brushRPM, speed: "25 m/min", progress: 78, status: "Active Clean Pass" },
    { id: "BOT-02", name: "Crawler Alpha-2", row: "Sector 4 Row 16", battery: "88%", brush_rpm: brushRPM, speed: "25 m/min", progress: 64, status: "Active Clean Pass" },
    { id: "BOT-03", name: "Crawler Alpha-3", row: "Sector 4 Row 17", battery: "95%", brush_rpm: brushRPM, speed: "25 m/min", progress: 90, status: "Active Clean Pass" },
    { id: "BOT-04", name: "Crawler Alpha-4", row: "Sector 4 Row 18", battery: "74%", brush_rpm: brushRPM, speed: "25 m/min", progress: 42, status: "Active Clean Pass" },
    { id: "BOT-05", name: "Crawler Alpha-5", row: "Dock Pad Alpha", battery: "100%", brush_rpm: 0, speed: "0 m/min", progress: 100, status: "Charged & Standby" },
    { id: "BOT-06", name: "Crawler Alpha-6", row: "Dock Pad Alpha", battery: "100%", brush_rpm: 0, speed: "0 m/min", progress: 100, status: "Charged & Standby" },
  ];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Car className="w-4 h-4 text-primary" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              AUTONOMOUS ROBOTIC SWARM FLEET MANAGER
            </span>
            <span className="font-mono-data text-xs text-secondary">
              Sector 4 Waterless Micro-Fiber Cleaning Crawler Swarm
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Autonomous Crawler Robot Fleet Telemetry & Swarm Dispatch
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {swarmActive ? (
            <button
              onClick={() => setSwarmActive(false)}
              className="bg-warning text-primary font-mono-data text-xs font-bold py-2.5 px-4 uppercase tracking-wider border-2 border-primary hover:bg-white transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Pause className="w-4 h-4" />
              <span>PAUSE SWARM</span>
            </button>
          ) : (
            <button
              onClick={() => setSwarmActive(true)}
              className="bg-[#027a48] text-white font-mono-data text-xs font-bold py-2.5 px-4 uppercase tracking-wider border-2 border-[#027a48] hover:bg-white hover:text-[#027a48] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Play className="w-4 h-4" />
              <span>RESUME SWARM PASS</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Swarm Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono-data text-xs">
        {swarmBots.map((bot) => (
          <div key={bot.id} className="border-2 border-primary bg-white p-5 space-y-3 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start border-b border-border-subtle pb-2.5">
                <div>
                  <strong className="text-sm font-bold text-primary block">{bot.name}</strong>
                  <span className="text-[10px] text-secondary font-sans">{bot.row}</span>
                </div>
                <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${
                  bot.status.includes("Active") ? "bg-[#ecfdf3] text-[#027a48] border-[#abefc6]" : "bg-surface text-secondary border-border-strong"
                }`}>
                  {bot.status}
                </span>
              </div>

              {/* Telemetry Metrics */}
              <div className="space-y-1.5 pt-3 text-xs font-sans text-secondary">
                <div className="flex justify-between"><span>Battery Level:</span> <strong className="font-mono-data text-primary">{bot.battery}</strong></div>
                <div className="flex justify-between"><span>Brush Speed:</span> <strong className="font-mono-data text-primary">{bot.brush_rpm} RPM</strong></div>
                <div className="flex justify-between"><span>Linear Cleaning Speed:</span> <strong className="font-mono-data text-primary">{bot.speed}</strong></div>
              </div>

              {/* Progress Bar */}
              <div className="pt-3">
                <div className="flex justify-between text-[10px] mb-1">
                  <span>Row Progress:</span>
                  <strong className="text-primary">{bot.progress}%</strong>
                </div>
                <div className="w-full bg-surface border border-border-strong h-2 overflow-hidden">
                  <div style={{ width: `${bot.progress}%` }} className="bg-primary h-full transition-all" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
