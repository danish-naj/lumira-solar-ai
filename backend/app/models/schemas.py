from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum

class DefectType(str, Enum):
    HOTSPOT = "Thermal Hotspot"
    CRACK = "Physical Crack"
    SOILING = "Heavy Soiling"
    SHADING = "Vegetation Shading"
    DELAMINATION = "Delamination / Snail Trail"
    PID = "Potential-Induced Degradation (PID)"
    SNAIL_TRAIL = "Snail Trail"
    HEALTHY = "Healthy (No Defect)"

    @classmethod
    def _missing_(cls, value):
        val_str = str(value).upper()
        if "HOT" in val_str or "DIODE" in val_str:
            return cls.HOTSPOT
        elif "CRACK" in val_str or "FRACT" in val_str:
            return cls.CRACK
        elif "SOIL" in val_str or "DUST" in val_str or "SAND" in val_str:
            return cls.SOILING
        elif "SHAD" in val_str:
            return cls.SHADING
        elif "PID" in val_str:
            return cls.PID
        elif "SNAIL" in val_str:
            return cls.SNAIL_TRAIL
        elif "DELAM" in val_str:
            return cls.DELAMINATION
        return cls.HOTSPOT


class SeverityLevel(str, Enum):
    CRITICAL = "Critical"
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"
    NONE = "None"

class InspectionSource(str, Enum):
    PHONE = "Smartphone RGB"
    SMARTPHONE = "Smartphone RGB"
    THERMAL = "Handheld Thermal"
    VEHICLE = "Vehicle Camera"
    DRONE = "Drone Survey"
    SCADA = "SCADA Telemetry"
    DATASET = "Existing Dataset"

    @classmethod
    def _missing_(cls, value):
        val_str = str(value).upper()
        if "DRONE" in val_str:
            return cls.DRONE
        elif "THERM" in val_str:
            return cls.THERMAL
        elif "VEHIC" in val_str:
            return cls.VEHICLE
        elif "PHONE" in val_str or "SMART" in val_str or "RGB" in val_str:
            return cls.PHONE
        elif "SCADA" in val_str:
            return cls.SCADA
        return cls.DRONE


class WorkOrderStatus(str, Enum):
    DETECTED = "Detected"
    ASSIGNED = "Assigned"
    IN_REPAIR = "In Repair"
    IN_PROGRESS = "In Repair"
    RESOLVED = "Resolved"
    VERIFIED = "Verified"

class DefectDetail(BaseModel):
    id: str
    type: DefectType
    severity: SeverityLevel
    confidence: float = Field(..., ge=0.0, le=1.0)
    detected_at: str
    source: InspectionSource
    affected_cell_region: Optional[str] = "Cell (Row 3, Col 4)"
    temperature_delta_c: Optional[float] = 0.0
    estimated_power_loss_pct: float = 0.0
    xai_explanation: str
    bounding_box: Optional[List[int]] = None  # [x, y, w, h]
    heatmap_url: Optional[str] = None
    original_image_url: Optional[str] = None

class SolarModule(BaseModel):
    id: str  # e.g. "R12-C37"
    farm_id: str
    array_id: str
    inverter_id: str
    string_id: str
    row: int
    col: int
    latitude: float
    longitude: float
    health_score: int = Field(..., ge=0, le=100)
    status: SeverityLevel
    nominal_power_w: float = 450.0
    current_power_w: float = 450.0
    last_inspected: str
    defects: List[DefectDetail] = []
    daily_energy_loss_kwh: float = 0.0
    daily_revenue_loss_usd: float = 0.0

class SolarFarm(BaseModel):
    id: str
    name: str
    location: str
    capacity_mw: float
    total_modules: int
    rows: int
    cols: int
    health_score: int
    healthy_count: int
    warning_count: int
    critical_count: int
    total_daily_loss_kwh: float
    total_daily_loss_usd: float
    open_work_orders: int
    created_at: str
    inverter_count: int

class WorkOrder(BaseModel):
    id: str
    farm_id: str
    module_id: str
    defect_type: DefectType
    severity: SeverityLevel
    priority: str
    status: WorkOrderStatus
    assigned_to: Optional[str] = "Technician #04"
    created_at: str
    updated_at: str
    estimated_repair_time_hrs: float = 1.5
    repair_notes: Optional[str] = ""
    before_image_url: Optional[str] = None
    after_image_url: Optional[str] = None
    verification_passed: Optional[bool] = None
    verified_at: Optional[str] = None

class ScadaStringReading(BaseModel):
    string_id: str
    inverter_id: str
    voltage_v: float
    current_a: float
    power_kw: float
    expected_power_kw: float
    deviation_pct: float
    is_anomalous: bool
    recommended_action: Optional[str] = None
    target_rows: Optional[str] = None

class InspectionUploadRequest(BaseModel):
    farm_id: str
    source: InspectionSource
    target_module_id: Optional[str] = None
    image_base64: Optional[str] = None
    defect_type_hint: Optional[str] = None

class InspectionResult(BaseModel):
    inspection_id: str
    farm_id: str
    module_id: str
    timestamp: str
    source: InspectionSource
    panel_detected: bool
    confidence: float
    defect_detected: DefectDetail
    new_health_score: int
    energy_impact_kwh: float
    monetary_impact_usd: float
    xai_heatmap_base64: Optional[str] = None
    processed_image_base64: Optional[str] = None

class RepairVerificationRequest(BaseModel):
    work_order_id: str
    after_image_base64: Optional[str] = None
    technician_notes: Optional[str] = "Replaced bypass diode and cleaned cell junction."

class RepairVerificationResult(BaseModel):
    work_order_id: str
    module_id: str
    passed: bool
    confidence: float
    verification_notes: str
    previous_health_score: int
    restored_health_score: int
    verified_at: str
