import React from "react";
import logoImg from "../assets/lumira-logo.jpg";
import { Sparkles } from "lucide-react";

export default function LumiraLogo({ size = "md", showSubtitle = true }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/20 flex-shrink-0 group">
        <img 
          src={logoImg} 
          alt="Lumira Logo" 
          className={`${size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-9 h-9"} object-cover transform group-hover:scale-105 transition-transform duration-300`} 
        />
      </div>
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-base font-bold tracking-tight text-white font-sans">
            Lumira
          </span>
          <span className="text-amber-300 text-xs">✦</span>
        </div>
        {showSubtitle && (
          <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase mt-1 leading-none">
            Asset Intelligence
          </p>
        )}
      </div>
    </div>
  );
}
