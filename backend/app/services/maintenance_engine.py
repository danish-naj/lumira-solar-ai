import time
from typing import List, Optional
from app.models.schemas import WorkOrder, WorkOrderStatus, DefectType, SeverityLevel

def create_work_order_from_defect(farm_id: str, module_id: str, defect_type: DefectType, severity: SeverityLevel) -> WorkOrder:
    priority = "Critical (P1)" if severity == SeverityLevel.CRITICAL else ("High (P2)" if severity == SeverityLevel.HIGH else "Normal (P3)")
    return WorkOrder(
        id=f"WO-{int(time.time()*1000)%100000}",
        farm_id=farm_id,
        module_id=module_id,
        defect_type=defect_type,
        severity=severity,
        priority=priority,
        status=WorkOrderStatus.ASSIGNED,
        assigned_to="Technician #04 (R. Sharma)",
        created_at=time.strftime("%Y-%m-%d %H:%M:%S"),
        updated_at=time.strftime("%Y-%m-%d %H:%M:%S"),
        estimated_repair_time_hrs=2.0 if severity == SeverityLevel.CRITICAL else 1.0,
        repair_notes="AI flagged anomaly during multi-source inspection. Replace bypass diode / wash surface.",
        before_image_url=None,
        after_image_url=None,
        verification_passed=None
    )
