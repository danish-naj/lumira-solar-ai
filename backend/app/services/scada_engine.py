import random
import time
from typing import List
from app.models.schemas import ScadaStringReading

def get_live_scada_telemetry(farm_id: str, inverter_count: int = 6) -> List[ScadaStringReading]:
    """
    Generates real-time telemetry across inverter strings and identifies
    underperforming strings that warrant targeted inspections.
    """
    readings = []
    # Base solar irradiance 860 W/m2 -> Expected string power ~18.5 kW
    expected_p_kw = 18.5
    
    for inv_idx in range(1, inverter_count + 1):
        inv_id = f"INV-{inv_idx:02d}"
        for str_idx in range(1, 9):
            str_id = f"{inv_id}-STR{str_idx:02d}"
            
            # Inject realistic anomalies for specific strings
            is_anomaly = (inv_idx == 2 and str_idx == 4) or (inv_idx == 4 and str_idx == 7)
            
            if is_anomaly:
                v = round(random.uniform(520.0, 560.0), 1)
                i = round(random.uniform(16.0, 20.5), 1)
                p = round((v * i) / 1000.0, 2)
                dev_pct = round(((expected_p_kw - p) / expected_p_kw) * 100.0, 1)
                action = f"Targeted drone/thermal inspection recommended for Inverter {inv_id}, String {str_idx}."
                target_rows = f"Rows {(inv_idx-1)*3 + 1}-{(inv_idx-1)*3 + 3}, Columns 20-40"
            else:
                v = round(random.uniform(670.0, 695.0), 1)
                i = round(random.uniform(25.8, 27.5), 1)
                p = round((v * i) / 1000.0, 2)
                dev_pct = round(random.uniform(-1.5, 3.2), 1)
                action = "Normal operation - within nominal irradiance baseline."
                target_rows = None
                
            readings.append(ScadaStringReading(
                string_id=str_id,
                inverter_id=inv_id,
                voltage_v=v,
                current_a=i,
                power_kw=p,
                expected_power_kw=expected_p_kw,
                deviation_pct=dev_pct,
                is_anomalous=is_anomaly,
                recommended_action=action,
                target_rows=target_rows
            ))
            
    return readings
