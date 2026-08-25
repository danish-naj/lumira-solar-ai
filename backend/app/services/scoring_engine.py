def calculate_module_health_score(defects, age_years=2.5, nominal_power_w=450.0):
    """
    Computes a 0-100 health score calibrated against defect type, severity,
    temperature delta, and historical degradation.
    """
    if not defects:
        # Normal degradation: ~0.5% per year
        base_score = int(100 - min(10, age_years * 0.7))
        return max(85, base_score)
        
    score = 100.0
    for defect in defects:
        d_type = getattr(defect, "type", defect.get("type") if isinstance(defect, dict) else "")
        severity = getattr(defect, "severity", defect.get("severity") if isinstance(defect, dict) else "")
        delta_t = getattr(defect, "temperature_delta_c", defect.get("temperature_delta_c", 0.0) if isinstance(defect, dict) else 0.0) or 0.0
        
        if "Hotspot" in str(d_type):
            penalty = 45.0 + min(30.0, delta_t * 1.2)
        elif "Crack" in str(d_type):
            penalty = 40.0 if severity == "Critical" else 28.0
        elif "Soiling" in str(d_type):
            penalty = 22.0 if severity == "High" else 14.0
        elif "Shading" in str(d_type):
            penalty = 25.0 if severity == "High" else 15.0
        elif "Delamination" in str(d_type):
            penalty = 20.0
        else:
            penalty = 10.0
            
        score -= penalty
        
    return max(5, min(100, int(score)))

def calculate_farm_health_score(modules):
    if not modules:
        return 100
    scores = [m.health_score if hasattr(m, "health_score") else m["health_score"] for m in modules]
    return int(sum(scores) / len(scores))
