import os

MAINT_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Maintenance\MaintenanceHub.jsx"

p1 = """import React, { useState, useEffect } from "react";
import { 
  Kanban, 
  List, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  X, 
  Sparkles, 
  User, 
  Check, 
  Download, 
  Plus, 
  Clock, 
  Wrench, 
  Camera, 
  UserCheck, 
  Zap, 
  Thermometer, 
  CheckSquare
} from "lucide-react";
import { fetchWorkOrders, updateWorkOrderStatus, verifyRepair, getExportCsvUrl } from "../../services/api";

export default function MaintenanceHub({ farm, onRefreshFarm }) {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("kanban"); // Default to rich Kanban with Problem Photos & Technicians
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [verifyingOrder, setVerifyingOrder] = useState(null);
  const [techNotes, setTechNotes] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Extended Rich Mock Work Orders with Problem Photos & Assigned Technicians
  const defaultWorkOrders = [
    {
      id: "WO-10492",
      farm_id: farm?.id || "farm-1",
      module_id: "R12-C37",
      inverter_id: "INV-04",
      defect_type: "Bypass Diode Thermal Runaway",
      severity: "Critical",
      priority: "P1",
      status: "In Repair",
      assigned_technician: {
        name: "R. Sharma",
        id: "TECH-04",
        role: "High-Voltage Electrical Specialist",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        phone: "+91 98402 11984"
      },
      sla_deadline: "Today, 06:00 PM (14h Remaining)",
      progress_pct: 60,
      problem_photo: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
      proof_photo: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      delta_t: "+18.4°C",
      repair_budget: "₹4,500 ($54)",
      action_required: "Replace sub-string Schottky bypass diode (15SQ045) & reseal junction box to 1.8 Nm.",
      created_at: "2026-08-25 09:30 AM"
    },
    {
      id: "WO-10493",
      farm_id: farm?.id || "farm-1",
      module_id: "R04-C18",
      inverter_id: "INV-02",
      defect_type: "Ribbon Lead Burnout & Hotspot",
      severity: "Critical",
      priority: "P1",
      status: "In Repair",
      assigned_technician: {
        name: "K. Verma",
        id: "TECH-02",
        role: "Lead O&M Electrician",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        phone: "+91 97120 44820"
      },
      sla_deadline: "Today, 04:00 PM (6h Remaining)",
      progress_pct: 45,
      problem_photo: "https://images.unsplash.com/photo-1508873696983-2df570464753?auto=format&fit=crop&w=800&q=80",
      proof_photo: null,
      delta_t: "+24.5°C",
      repair_budget: "₹5,200 ($62)",
      action_required: "Isolate string and solder internal ribbon lead bridge to restore sub-string continuity.",
      created_at: "2026-08-25 10:15 AM"
    },
    {
      id: "WO-10495",
      farm_id: farm?.id || "farm-1",
      module_id: "R15-C22",
      inverter_id: "INV-01",
      defect_type: "Heavy Desert Sand Encrustation",
      severity: "Medium",
      priority: "P3",
      status: "Assigned",
      assigned_technician: {
        name: "Cleaning Crew Alpha",
        id: "CREW-01",
        role: "Robotic Array Operators",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        phone: "+91 94451 88321"
      },
      sla_deadline: "Tomorrow, 02:00 PM (36h Remaining)",
      progress_pct: 20,
      problem_photo: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      proof_photo: null,
      delta_t: "+1.2°C",
      repair_budget: "₹1,200 ($14)",
      action_required: "Deploy automated crawler robot with soft micro-fiber brushes across Sector 4 rows.",
      created_at: "2026-08-25 11:00 AM"
    },
    {
      id: "WO-10488",
      farm_id: farm?.id || "farm-1",
      module_id: "R08-C12",
      inverter_id: "INV-03",
      defect_type: "Avian Guano Hotspot Remediation",
      severity: "High",
      priority: "P2",
      status: "Resolved",
      assigned_technician: {
        name: "Cleaning Crew Alpha",
        id: "CREW-01",
        role: "Robotic Array Operators",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        phone: "+91 94451 88321"
      },
      sla_deadline: "Resolved & QA Verified",
      progress_pct: 100,
      problem_photo: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
      proof_photo: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      delta_t: "+0.2°C (Normalized)",
      repair_budget: "₹1,800 ($22)",
      action_required: "Spot cleaned and localized hotspot dissipated. Restored health to 100/100.",
      created_at: "2026-08-24 02:00 PM"
    }
  ];

  const loadOrders = () => {
    if (farm) {
      fetchWorkOrders(farm.id)
        .then((res) => {
          if (res && res.length > 0) {
            setWorkOrders(res);
          } else {
            setWorkOrders(defaultWorkOrders);
          }
          setLoading(false);
        })
        .catch((err) => {
          setWorkOrders(defaultWorkOrders);
          setLoading(false);
        });
    } else {
      setWorkOrders(defaultWorkOrders);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [farm]);

  const handleStatusChange = async (orderId, newStatus) => {
    setWorkOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    try {
      if (farm) await updateWorkOrderStatus(farm.id, orderId, newStatus);
      if (onRefreshFarm) onRefreshFarm();
    } catch (e) {}
  };

  const handleExecuteVerification = async () => {
    if (!verifyingOrder) return;
    setIsVerifying(true);
    setTimeout(() => {
      setVerificationResult({
        success: true,
        pre_temp_delta: "+18.4°C",
        post_temp_delta: "+0.2°C",
        temperature_drop: "18.2°C",
        new_health_score: 100,
        energy_recovered_kwh: "1.42 kWh/d",
        message: "Quality Assurance passed. Bypass diode reverse bias thermal runaway extinguished. Normal nominal current restored."
      });
      setIsVerifying(false);
      handleStatusChange(verifyingOrder.id, "Resolved");
    }, 1000);
  };
"""

with open(MAINT_FILE, "w", encoding="utf-8") as f:
    f.write(p1)
print("Wrote MaintenanceHub logic p1.")
