import React, { useState } from "react";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Wrench, 
  Activity, 
  Zap, 
  Layers, 
  ArrowRight,
  Radio
} from "lucide-react";

export default function VoiceCopilot({ farm, onNavigateTab }) {
  const [isListening, setIsListening] = useState(false);
  const [speechOutput, setSpeechOutput] = useState("Lumira Voice AI active. Ready for hands-free field instructions.");
  const [selectedVoiceCommand, setSelectedVoiceCommand] = useState(null);

  // Voice Command Triggers
  const handleVoiceCommand = (cmd) => {
    setSelectedVoiceCommand(cmd);
    setIsListening(true);

    if (cmd === "loto_step1") {
      setSpeechOutput("Vocal Step 1: Open DC Combiner Box DC-04 disconnect. Verify zero current with 1000V rated clamp meter before proceeding.");
    } else if (cmd === "torque_verify") {
      setSpeechOutput("Calibrated Torque verified: 1.8 Newton-meters logged. Terminal lugs secure. Applying RTV silicone seal.");
    } else if (cmd === "read_voltage") {
      setSpeechOutput("Inverter INV-04 DC Bus Voltage is currently 1,140 Volts DC. Operating temperature is 58.4 degrees Celsius.");
    } else if (cmd === "acoustic_scan") {
      setSpeechOutput("Acoustic Resonance Analysis complete: High-frequency ultrasonic ripple detected at 18.4 kHz on Cell 14. Wafer microcrack propagation risk: 88%.");
    }

    setTimeout(() => {
      setIsListening(false);
    }, 1500);
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-[1600px] mx-auto select-none bg-surface-container-lowest font-sans">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-primary pb-4 gap-4 bg-surface p-5 border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-4 h-4 text-primary animate-pulse" />
            <span className="bg-primary text-white font-mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              HANDS-FREE VOICE AI COPILOT
            </span>
            <span className="font-mono-data text-xs text-secondary">
              For Technicians in Class 0 Dielectric Gloves & PPE
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
            Hands-Free Audio Copilot & Microcrack Resonance Physics
          </h1>
        </div>

        {/* Audio Status */}
        <div className="flex items-center gap-2 border-2 border-primary bg-white px-3 py-1.5 font-mono-data text-xs shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block animate-pulse" />
          <span className="font-bold text-primary">AUDIO ENGINE ONLINE</span>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono-data text-xs">
        {/* Left Column: Interactive Hands-Free Voice Controller (7 Cols) */}
        <div className="lg:col-span-7 border-2 border-primary bg-white p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-border-subtle pb-3 mb-4">
              <strong className="text-primary uppercase text-xs flex items-center gap-2">
                <Mic className="w-4 h-4 text-primary" />
                <span>FIELD VOICE RECOGNITION & SYNTHESIS HUD</span>
              </strong>
              <span className={`px-2 py-0.5 text-[9px] font-bold uppercase ${isListening ? "bg-critical text-white animate-pulse" : "bg-surface text-secondary"}`}>
                {isListening ? "● LISTENING..." : "STANDBY"}
              </span>
            </div>

            {/* Vocal Response Dialogue Box */}
            <div className="bg-[#0f172a] text-white p-5 border border-border-strong space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[#38bdf8] text-[10px] font-bold">
                <Volume2 className="w-4 h-4" />
                <span>LUMIRA SYNTHESIZED SPEECH OUTPUT:</span>
              </div>
              <p className="text-sm font-sans font-medium text-white leading-relaxed">
                "{speechOutput}"
              </p>
            </div>

            {/* Hands-Free Voice Command Buttons */}
            <div className="space-y-2">
              <span className="text-[10px] text-secondary font-bold uppercase block">
                TEST HANDS-FREE VOICE COMMAND PHRASES:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => handleVoiceCommand("loto_step1")}
                  className="p-3 bg-surface border border-border-strong hover:border-primary hover:bg-white text-left text-xs font-bold text-primary transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>"Read LOTO Step 1 Instructions"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleVoiceCommand("torque_verify")}
                  className="p-3 bg-surface border border-border-strong hover:border-primary hover:bg-white text-left text-xs font-bold text-primary transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>"Log Calibrated Torque 1.8 Nm"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleVoiceCommand("read_voltage")}
                  className="p-3 bg-surface border border-border-strong hover:border-primary hover:bg-white text-left text-xs font-bold text-primary transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>"Report Inverter DC Voltage"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleVoiceCommand("acoustic_scan")}
                  className="p-3 bg-[#f6fef9] border-2 border-[#027a48] text-left text-xs font-bold text-[#027a48] transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>"Run Acoustic Resonance Scan"</span>
                  <Sparkles className="w-3.5 h-3.5 text-warning" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: GROUNDBREAKING Microcrack Resonance Physics AI (5 Cols) */}
        <div className="lg:col-span-5 border-2 border-primary bg-white p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center border-b border-border-subtle pb-2">
            <strong className="text-primary uppercase text-xs flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-warning" />
              <span>ACOUSTIC & THERMAL RESONANCE PHYSICS AI</span>
            </strong>
          </div>

          <p className="font-sans text-xs text-primary leading-relaxed">
            Lumira cross-correlates thermal gradients ($\Delta T$), high-frequency DC voltage ripple ($V_{pp}$), and module acoustic vibration to predict internal wafer microcrack propagation <strong>before glass shattering occurs</strong>.
          </p>

          <div className="bg-surface p-4 border border-border-subtle space-y-2 text-xs">
            <div className="flex justify-between"><span>Target Module:</span> <strong className="text-primary font-mono-data">#R07-C45 (INV-05)</strong></div>
            <div className="flex justify-between"><span>Ultrasonic Resonance:</span> <strong className="text-critical font-mono-data">18.4 kHz (Anomalous)</strong></div>
            <div className="flex justify-between"><span>DC Voltage Ripple ($V_{pp}$):</span> <strong className="text-critical font-mono-data">14.2 mV Peak</strong></div>
            <div className="flex justify-between"><span>Microcrack Propagation Risk:</span> <strong className="text-critical font-mono-data">88% (High Severity)</strong></div>
          </div>

          <div className="p-3 bg-[#fef3f2] border border-critical text-xs text-critical font-sans space-y-1">
            <strong className="font-mono-data font-bold block uppercase">PREDICTIVE ACTION:</strong>
            <span>Dispatch field technician for micro-soldering bridge on silver busbars 2 & 3 to prevent catastrophic hot-spot glass failure.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
