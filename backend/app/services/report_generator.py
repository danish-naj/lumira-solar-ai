import csv
import io
import time
from typing import Dict, Any

def generate_csv_report(farm_data: Dict[str, Any], modules: list, work_orders: list) -> str:
    output = io.StringIO()
    writer = csv.writer(output)
    
    writer.writerow(["LUMIRA - SOLAR ASSET HEALTH & INSPECTION AUDIT REPORT"])
    writer.writerow(["Farm Name", farm_data.get("name")])
    writer.writerow(["Location", farm_data.get("location")])
    writer.writerow(["Capacity (MW)", farm_data.get("capacity_mw")])
    writer.writerow(["Overall Health Score", f"{farm_data.get('health_score')}/100"])
    writer.writerow(["Audit Timestamp", time.strftime("%Y-%m-%d %H:%M:%S")])
    writer.writerow([])
    
    writer.writerow(["MODULE ID", "ARRAY", "INVERTER", "STRING", "ROW", "COL", "HEALTH SCORE", "STATUS", "DEFECTS", "DAILY LOSS (kWh)", "DAILY LOSS ($)"])
    for m in modules:
        if m.health_score < 90 or len(m.defects) > 0:
            defect_names = "; ".join([d.type.value for d in m.defects]) if m.defects else "Normal Aging"
            writer.writerow([
                m.id, m.array_id, m.inverter_id, m.string_id, m.row, m.col,
                f"{m.health_score}/100", m.status.value, defect_names,
                m.daily_energy_loss_kwh, m.daily_revenue_loss_usd
            ])
            
    writer.writerow([])
    writer.writerow(["ACTIVE MAINTENANCE WORK ORDERS"])
    writer.writerow(["WORK ORDER ID", "MODULE ID", "DEFECT TYPE", "SEVERITY", "PRIORITY", "STATUS", "ASSIGNED TO", "CREATED AT"])
    for wo in work_orders:
        writer.writerow([
            wo.id, wo.module_id, wo.defect_type.value, wo.severity.value,
            wo.priority, wo.status.value, wo.assigned_to, wo.created_at
        ])
        
    return output.getvalue()
