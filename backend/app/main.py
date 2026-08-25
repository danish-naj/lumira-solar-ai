import time
from fastapi import FastAPI, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse
from typing import List, Optional

from app.models.schemas import (
    SolarFarm, SolarModule, WorkOrder, WorkOrderStatus, DefectType, SeverityLevel,
    InspectionSource, InspectionUploadRequest, InspectionResult,
    RepairVerificationRequest, RepairVerificationResult, ScadaStringReading
)
from app.database import db
from app.services.ai_engine import run_ai_inspection, verify_repair_with_ai
from app.services.scada_engine import get_live_scada_telemetry
from app.services.maintenance_engine import create_work_order_from_defect
from app.services.report_generator import generate_csv_report

app = FastAPI(
    title="Lumira Diagnostic API",
    description="Hardware-agnostic AI Operating System for Solar Asset Inspection & Intelligence",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_class=HTMLResponse)
def root_dashboard():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Lumira Asset Intelligence</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0b0f19; color: #f8fafc; padding: 40px; }
            .card { background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 24px; max-width: 600px; margin: auto; }
            h1 { color: #f59e0b; margin-top: 0; }
            .btn { display: inline-block; background: #f59e0b; color: #0b0f19; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 15px; }
            .badge { background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-family: monospace; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>☀️ Lumira Diagnostic Engine</h1>
            <p><span class="badge">API ONLINE (Port 8000)</span></p>
            <p>Hardware-Agnostic Solar Asset Inspection, Diagnostic & Intelligence Engine.</p>
            <hr style="border-color: #1f2937; margin: 20px 0;">
            <p><strong>Explore Interactive OpenAPI Documentation:</strong></p>
            <a class="btn" href="/docs">Open Swagger API Docs →</a>
            <p style="margin-top: 20px; font-size: 13px; color: #94a3b8;">
                Frontend Web App is running at: <a style="color: #38bdf8;" href="http://localhost:5173" target="_blank">http://localhost:5173</a>
            </p>
        </div>
    </body>
    </html>
    """

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "Lumira Diagnostic Engine",
        "version": "1.0.0",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }

@app.get("/api/farms", response_model=List[SolarFarm])
def get_farms():
    return db.get_all_farms()

@app.get("/api/farms/{farm_id}", response_model=SolarFarm)
def get_farm_by_id(farm_id: str):
    farm = db.get_farm(farm_id)
    if not farm:
        raise HTTPException(status_code=404, detail="Solar farm not found")
    return farm

@app.get("/api/farms/{farm_id}/modules", response_model=List[SolarModule])
def get_farm_modules(
    farm_id: str,
    defect_type: Optional[str] = Query(None),
    severity: Optional[str] = Query(None),
    inverter_id: Optional[str] = Query(None)
):
    return db.get_modules(farm_id, defect_type, severity, inverter_id)

@app.get("/api/farms/{farm_id}/modules/{module_id}", response_model=SolarModule)
def get_module_detail(farm_id: str, module_id: str):
    mod = db.get_module(farm_id, module_id)
    if not mod:
        raise HTTPException(status_code=404, detail=f"Module {module_id} not found in farm {farm_id}")
    return mod

@app.post("/api/inspect/upload", response_model=InspectionResult)
def run_inspection(req: InspectionUploadRequest):
    target_mod = req.target_module_id or "R12-C37"
    result = run_ai_inspection(
        farm_id=req.farm_id,
        source=req.source,
        module_id=target_mod,
        defect_type_hint=req.defect_type_hint
    )
    db.update_module_defect(
        farm_id=req.farm_id,
        module_id=target_mod,
        defect=result.defect_detected,
        new_health=result.new_health_score,
        loss_kwh=result.energy_impact_kwh,
        loss_usd=result.monetary_impact_usd
    )
    return result

@app.get("/api/scada/readings/{farm_id}", response_model=List[ScadaStringReading])
def get_scada_readings(farm_id: str):
    farm = db.get_farm(farm_id)
    inv_count = farm.inverter_count if farm else 6
    return get_live_scada_telemetry(farm_id, inv_count)

@app.get("/api/workorders/{farm_id}", response_model=List[WorkOrder])
def get_work_orders(farm_id: str):
    return db.get_work_orders(farm_id)

@app.post("/api/workorders", response_model=WorkOrder)
def create_work_order(farm_id: str = Query(...), module_id: str = Query(...), defect_type: str = Query(...), severity: str = Query(...)):
    wo = create_work_order_from_defect(farm_id, module_id, DefectType(defect_type), SeverityLevel(severity))
    db.add_work_order(wo)
    return wo

@app.put("/api/workorders/{farm_id}/{work_order_id}")
def update_work_order(farm_id: str, work_order_id: str, status: str = Query(...), notes: Optional[str] = Query(None)):
    order = db.update_work_order_status(farm_id, work_order_id, WorkOrderStatus(status), notes)
    if not order:
        raise HTTPException(status_code=404, detail="Work order not found")
    return order

@app.post("/api/workorders/{farm_id}/{work_order_id}/verify-repair", response_model=RepairVerificationResult)
def verify_repair(farm_id: str, work_order_id: str, req: RepairVerificationRequest):
    order = None
    for wo in db.get_work_orders(farm_id):
        if wo.id == work_order_id:
            order = wo
            break
    if not order:
        raise HTTPException(status_code=404, detail="Work order not found")
        
    verification = verify_repair_with_ai(work_order_id, order.module_id, req.technician_notes or "")
    if verification.passed:
        db.update_work_order_status(farm_id, work_order_id, WorkOrderStatus.VERIFIED, verification.verification_notes)
    return verification

@app.get("/api/reports/{farm_id}/summary")
def get_report_summary(farm_id: str):
    farm = db.get_farm(farm_id)
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    mods = db.get_modules(farm_id)
    wos = db.get_work_orders(farm_id)
    
    critical_mods = [m for m in mods if m.health_score < 50]
    warning_mods = [m for m in mods if 50 <= m.health_score < 85]
    
    defect_counts = {}
    for m in mods:
        for d in m.defects:
            defect_counts[d.type.value] = defect_counts.get(d.type.value, 0) + 1
            
    return {
        "farm_id": farm.id,
        "farm_name": farm.name,
        "location": farm.location,
        "capacity_mw": farm.capacity_mw,
        "plant_health_score": farm.health_score,
        "total_modules": farm.total_modules,
        "healthy_count": farm.healthy_count,
        "warning_count": farm.warning_count,
        "critical_count": farm.critical_count,
        "total_daily_loss_kwh": farm.total_daily_loss_kwh,
        "total_daily_loss_usd": farm.total_daily_loss_usd,
        "annual_estimated_loss_usd": round(farm.total_daily_loss_usd * 365.0, 2),
        "open_work_orders": farm.open_work_orders,
        "defect_breakdown": defect_counts,
        "critical_action_list": [
            {
                "module_id": m.id,
                "health_score": m.health_score,
                "defect": m.defects[0].type.value if m.defects else "Unknown",
                "loss_kwh": m.daily_energy_loss_kwh,
                "action": "Immediate bypass diode replacement or string balancing required"
            }
            for m in critical_mods[:10]
        ]
    }

@app.get("/api/reports/{farm_id}/export-csv")
def export_csv(farm_id: str):
    farm = db.get_farm(farm_id)
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    csv_text = generate_csv_report(
        farm_data=farm.dict(),
        modules=db.get_modules(farm_id),
        work_orders=db.get_work_orders(farm_id)
    )
    return Response(
        content=csv_text,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=Lumira_Audit_Report_{farm_id}.csv"}
    )
