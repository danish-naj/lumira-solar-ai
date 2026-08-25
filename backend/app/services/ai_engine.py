import time
import random
from app.models.schemas import (
    DefectType, SeverityLevel, InspectionSource, DefectDetail, InspectionResult, RepairVerificationResult
)
from app.data.sample_images import (
    create_rgb_panel, create_thermal_panel, create_xai_heatmap_overlay
)
from app.services.scoring_engine import calculate_module_health_score
from app.services.energy_loss_calc import calculate_energy_and_financial_loss

def run_ai_inspection(farm_id: str, source: str = "Drone Survey", module_id: str = "R12-C37", defect_type_hint: str = None) -> InspectionResult:
    """
    Simulates the full multi-stage AI Vision & Explainable AI diagnostic pipeline
    """
    # Normalize source
    try:
        norm_source = InspectionSource(source)
    except:
        norm_source = InspectionSource.DRONE

    # Pick defect profile
    if defect_type_hint:
        try:
            selected_type = DefectType(defect_type_hint)
        except:
            selected_type = DefectType.HOTSPOT
    else:
        if norm_source == InspectionSource.THERMAL:
            selected_type = DefectType.HOTSPOT
        elif norm_source == InspectionSource.PHONE:
            selected_type = random.choice([DefectType.SOILING, DefectType.CRACK, DefectType.SHADING])
        elif norm_source == InspectionSource.VEHICLE:
            selected_type = random.choice([DefectType.SOILING, DefectType.DELAMINATION])
        else:
            selected_type = random.choice([DefectType.HOTSPOT, DefectType.CRACK, DefectType.SOILING, DefectType.PID])
            
    confidence = round(random.uniform(0.93, 0.99), 3)
    bbox = [260, 95, 320, 150]
    
    if selected_type == DefectType.HOTSPOT:
        severity = SeverityLevel.CRITICAL
        delta_t = round(random.uniform(16.5, 26.2), 1)
        region = "Upper-Right Bypass Sub-string (Cell 8)"
        loss_pct = 34.0
        xai_text = f"Thermal anomaly detected in upper-right cell region. Localized temperature delta is +{delta_t}°C above neighboring cells. Bypass diode thermal runaway or localized shunt resistance breakdown confirmed."
    elif selected_type == DefectType.CRACK:
        severity = SeverityLevel.HIGH
        delta_t = round(random.uniform(3.5, 6.8), 1)
        region = "Center Cell #14 Main Busbar"
        loss_pct = 20.0
        xai_text = "Microcrack pattern identified traversing the main busbar. Mechanical fracture discontinuity causing localized current restriction and active cell degradation."
    elif selected_type == DefectType.PID:
        severity = SeverityLevel.HIGH
        delta_t = 6.2
        region = "Negative Pole String Edge"
        loss_pct = 22.0
        xai_text = "Potential-Induced Degradation (PID) signature detected along negative terminal string frame edge. Surface shunting active."
    elif selected_type == DefectType.SOILING:
        severity = SeverityLevel.MEDIUM
        delta_t = 1.2
        region = "Lower Edge Glass Substrate"
        loss_pct = 14.0
        xai_text = "Heavy desert dust and particulate encrustation obscuring lower cell active area. Uniform optical transmission attenuation observed."
    elif selected_type == DefectType.SHADING:
        severity = SeverityLevel.MEDIUM
        delta_t = 2.0
        region = "Perimeter Array Margin"
        loss_pct = 16.5
        xai_text = "Vegetation and tracker margin shading cast over sub-string. Active bypass diode conduction observed."
    else:
        severity = SeverityLevel.LOW
        delta_t = 0.8
        region = "Frontsheet EVA Boundary"
        loss_pct = 3.0
        xai_text = "Moisture ingress snail trails and slight EVA encapsulant discoloration. Cell efficiency within tolerance."

    defect = DefectDetail(
        id=f"DEF-{int(time.time()*1000)%10000:04d}",
        type=selected_type,
        severity=severity,
        confidence=confidence,
        detected_at=time.strftime("%Y-%m-%d %H:%M:%S"),
        source=norm_source,
        affected_cell_region=region,
        temperature_delta_c=delta_t,
        estimated_power_loss_pct=loss_pct,
        xai_explanation=xai_text,
        bounding_box=bbox,
        heatmap_url=create_xai_heatmap_overlay(selected_type.value, bbox),
        original_image_url=create_thermal_panel(selected_type.value, has_hotspot=(severity == SeverityLevel.CRITICAL), bbox=bbox) if norm_source == InspectionSource.THERMAL or severity == SeverityLevel.CRITICAL else create_rgb_panel(selected_type.value, bbox=bbox)
    )

    new_health = calculate_module_health_score([defect])
    loss_kwh, loss_usd = calculate_energy_and_financial_loss(450.0, new_health, selected_type.value)

    return InspectionResult(
        inspection_id=f"INSP-{int(time.time())}",
        farm_id=farm_id,
        module_id=module_id,
        source=norm_source,
        defect_detected=defect,
        new_health_score=new_health,
        energy_impact_kwh=loss_kwh,
        monetary_impact_usd=loss_usd,
        recommended_action=f"Dispatch targeted maintenance for {selected_type.value} remediation. Expected energy recovery: {loss_kwh} kWh/day."
    )

def verify_repair_with_ai(farm_id: str, work_order_id: str, target_module_id: str, technician_notes: str = "") -> RepairVerificationResult:
    """
    Simulates AI automated post-repair thermal scan verification.
    """
    confidence = round(random.uniform(0.97, 0.995), 3)
    norm_delta_t = round(random.uniform(0.1, 0.3), 2)
    
    clean_thermal = create_thermal_panel("Healthy", has_hotspot=False)
    clean_rgb = create_rgb_panel("Healthy")

    return RepairVerificationResult(
        work_order_id=work_order_id,
        verification_status="Passed (Certified Nominal)",
        verified_by_ai=True,
        confidence=confidence,
        post_repair_delta_t=norm_delta_t,
        restored_health_score=100,
        energy_recovered_kwh=1.42,
        financial_recovered_usd=0.12,
        notes=f"AI multispectral scan verified complete thermal normalization (ΔT = {norm_delta_t}°C < 0.4°C threshold). Module health restored to 100/100 nominal baseline.",
        after_image_url=clean_thermal
    )
