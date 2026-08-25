from typing import List, Any

def calculate_module_health_score(defects: List[Any], age_years: float = 2.0, nominal_power_w: float = 450.0) -> int:
    """
    Computes a 0-100 health score calibrated against defect type, severity,
    temperature delta, and historical degradation according to IEC 62446-3.
    """
    if not defects:
        # Nominal baseline: ~98-100 score
        base_score = int(100 - min(4, age_years * 0.5))
        return max(95, base_score)
        
    score = 100.0
    for defect in defects:
        # Extract defect type string
        if hasattr(defect, "type"):
            raw_type = defect.type.value if hasattr(defect.type, "value") else str(defect.type)
        elif isinstance(defect, dict):
            raw_type = str(defect.get("type", ""))
        else:
            raw_type = str(defect)

        # Extract severity string
        if hasattr(defect, "severity"):
            raw_sev = defect.severity.value if hasattr(defect.severity, "value") else str(defect.severity)
        elif isinstance(defect, dict):
            raw_sev = str(defect.get("severity", ""))
        else:
            raw_sev = "Critical" if "Critical" in str(defect) else "Medium"

        # Extract delta T
        if hasattr(defect, "temperature_delta_c"):
            delta_t = float(defect.temperature_delta_c or 0.0)
        elif isinstance(defect, dict):
            delta_t = float(defect.get("temperature_delta_c", 0.0) or 0.0)
        else:
            delta_t = 0.0
            
        type_str = str(raw_type).upper()
        sev_str = str(raw_sev).upper()

        if "HOTSPOT" in type_str:
            # Critical / Severe Thermal Hotspot: Health 10-45
            penalty = 55.0 + min(35.0, delta_t * 1.5)
        elif "CRACK" in type_str:
            # Wafer Microcracks: Health 50-68
            penalty = 48.0 if "CRIT" in sev_str or "HIGH" in sev_str else 35.0
        elif "PID" in type_str:
            # Potential Induced Degradation: Health 55-65
            penalty = 42.0
        elif "SOIL" in type_str:
            # Soiling: Health 70-82
            penalty = 28.0 if "HIGH" in sev_str else (20.0 if "MED" in sev_str else 10.0)
        elif "SHAD" in type_str:
            # Shading: Health 72-84
            penalty = 26.0 if "HIGH" in sev_str else 18.0
        elif "SNAIL" in type_str or "DELAM" in type_str:
            # Low risk snail trail / delamination: Health 86-93
            penalty = 12.0
        else:
            penalty = 10.0
            
        score -= penalty
        
    return max(5, min(100, int(score)))

def calculate_farm_health_score(modules) -> int:
    if not modules:
        return 100
    scores = [m.health_score if hasattr(m, "health_score") else m["health_score"] for m in modules]
    return int(sum(scores) / len(scores))
