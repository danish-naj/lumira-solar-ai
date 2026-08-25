import random
import time
from app.models.schemas import (
    SolarFarm, SolarModule, DefectDetail, DefectType, SeverityLevel, InspectionSource, WorkOrder, WorkOrderStatus
)
from app.data.sample_images import (
    create_rgb_panel, create_thermal_panel, create_xai_heatmap_overlay
)
from app.services.scoring_engine import calculate_module_health_score
from app.services.energy_loss_calc import calculate_energy_and_financial_loss

def generate_bhadla_farm():
    rows, cols = 20, 60
    total_modules = rows * cols
    modules = []
    
    # Specific known defect coordinates for demonstration
    defect_map = {
        (4, 18): (DefectType.HOTSPOT, SeverityLevel.CRITICAL, 24.5, "Cell (Row 2, Col 7) - Bypass diode thermal runaway", [260, 95, 320, 150]),
        (12, 37): (DefectType.HOTSPOT, SeverityLevel.CRITICAL, 18.4, "Upper-Right Cell #8 - Localized shunt resistance failure", [260, 95, 320, 150]),
        (7, 45): (DefectType.CRACK, SeverityLevel.HIGH, 4.2, "Busbar cross-section microcrack fracture", [140, 120, 200, 180]),
        (15, 22): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.2, "Heavy sand and dust deposition on lower half", [30, 140, 360, 270]),
        (2, 8): (DefectType.SHADING, SeverityLevel.MEDIUM, 2.1, "Perimeter acacia tree canopy shadow", [20, 20, 120, 140]),
        (18, 52): (DefectType.DELAMINATION, SeverityLevel.LOW, 0.8, "Moisture ingress snail trails along finger grid", [180, 50, 250, 120]),
        (8, 12): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.5, "Bird droppings & localized dirt crusting", [100, 80, 180, 140]),
        (14, 58): (DefectType.CRACK, SeverityLevel.HIGH, 3.8, "Hail impact radial microfracture", [210, 130, 270, 190]),
        (6, 29): (DefectType.HOTSPOT, SeverityLevel.CRITICAL, 21.0, "Internal solder joint fatigue hotspot", [260, 95, 320, 150]),
        (17, 10): (DefectType.SHADING, SeverityLevel.MEDIUM, 1.8, "Inverter fence perimeter shade", [20, 20, 140, 150]),
        (10, 50): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.1, "Dust accumulation from access road", [30, 140, 360, 270]),
        (19, 33): (DefectType.HOTSPOT, SeverityLevel.HIGH, 15.2, "Sub-string bypass diode overheating", [260, 95, 320, 150]),
    }
    
    healthy_cnt, warn_cnt, crit_cnt = 0, 0, 0
    total_loss_kwh, total_loss_usd = 0.0, 0.0

    for r in range(1, rows + 1):
        for c in range(1, cols + 1):
            mod_id = f"R{r:02d}-C{c:02d}"
            inv_idx = ((r - 1) // 4) + 1
            inv_id = f"INV-{inv_idx:02d}"
            str_idx = ((c - 1) // 8) + 1
            str_id = f"{inv_id}-STR{str_idx:02d}"
            
            defects = []
            if (r, c) in defect_map:
                d_type, d_sev, d_dt, d_exp, d_bbox = defect_map[(r, c)]
                is_thermal = "Hotspot" in d_type.value
                defects.append(DefectDetail(
                    id=f"DEF-{r:02d}{c:02d}",
                    type=d_type,
                    severity=d_sev,
                    confidence=round(random.uniform(0.92, 0.98), 3),
                    detected_at="2026-08-22 14:30:00",
                    source=InspectionSource.THERMAL if is_thermal else InspectionSource.DRONE,
                    affected_cell_region=d_exp.split(" - ")[0] if " - " in d_exp else "Active Area",
                    temperature_delta_c=d_dt,
                    estimated_power_loss_pct=34.0 if d_sev == SeverityLevel.CRITICAL else (20.0 if d_sev == SeverityLevel.HIGH else 12.0),
                    xai_explanation=d_exp,
                    bounding_box=d_bbox,
                    heatmap_url=create_xai_heatmap_overlay(d_type.value, d_bbox),
                    original_image_url=create_thermal_panel(d_type.value, has_hotspot=True, bbox=d_bbox) if is_thermal else create_rgb_panel(d_type.value, bbox=d_bbox)
                ))
            
            score = calculate_module_health_score(defects, age_years=2.0)
            
            if score >= 85:
                status = SeverityLevel.NONE
                healthy_cnt += 1
            elif score >= 50:
                status = SeverityLevel.MEDIUM
                warn_cnt += 1
            else:
                status = SeverityLevel.CRITICAL
                crit_cnt += 1
                
            loss_kwh, loss_usd = calculate_energy_and_financial_loss(450.0, score, defects[0].type.value if defects else None)
            total_loss_kwh += loss_kwh
            total_loss_usd += loss_usd
            
            modules.append(SolarModule(
                id=mod_id,
                farm_id="farm-1",
                array_id="Array-Alpha",
                inverter_id=inv_id,
                string_id=str_id,
                row=r,
                col=c,
                latitude=27.5398 + (r * 0.0001),
                longitude=71.9168 + (c * 0.0001),
                health_score=score,
                status=status,
                nominal_power_w=450.0,
                current_power_w=round(450.0 * (score / 100.0), 1),
                last_inspected="2026-08-22",
                defects=defects,
                daily_energy_loss_kwh=loss_kwh,
                daily_revenue_loss_usd=loss_usd
            ))

    farm_score = int(sum(m.health_score for m in modules) / len(modules))
    
    farm = SolarFarm(
        id="farm-1",
        name="Bhadla Solar Park - Sector 4",
        location="Bhadla, Rajasthan, India",
        capacity_mw=50.0,
        total_modules=total_modules,
        rows=rows,
        cols=cols,
        health_score=farm_score,
        healthy_count=healthy_cnt,
        warning_count=warn_cnt,
        critical_count=crit_cnt,
        total_daily_loss_kwh=round(total_loss_kwh, 2),
        total_daily_loss_usd=round(total_loss_usd, 2),
        open_work_orders=5,
        created_at="2024-01-15",
        inverter_count=6
    )

    work_orders = [
        WorkOrder(
            id="WO-10492",
            farm_id="farm-1",
            module_id="R12-C37",
            defect_type=DefectType.HOTSPOT,
            severity=SeverityLevel.CRITICAL,
            priority="Critical (P1)",
            status=WorkOrderStatus.IN_REPAIR,
            assigned_to="Technician #04 (R. Sharma)",
            created_at="2026-08-22 15:10:00",
            updated_at="2026-08-23 09:30:00",
            estimated_repair_time_hrs=2.0,
            repair_notes="Replacing sub-string bypass diode and inspecting terminal junction box.",
            before_image_url=create_thermal_panel("Thermal Hotspot", has_hotspot=True),
            after_image_url=None
        ),
        WorkOrder(
            id="WO-10488",
            farm_id="farm-1",
            module_id="R04-C18",
            defect_type=DefectType.HOTSPOT,
            severity=SeverityLevel.CRITICAL,
            priority="Critical (P1)",
            status=WorkOrderStatus.ASSIGNED,
            assigned_to="Technician #02 (K. Patel)",
            created_at="2026-08-22 16:00:00",
            updated_at="2026-08-22 16:00:00",
            estimated_repair_time_hrs=1.5,
            repair_notes="High thermal runaway delta (+24.5°C). Priority repair.",
            before_image_url=create_thermal_panel("Thermal Hotspot", has_hotspot=True),
            after_image_url=None
        ),
        WorkOrder(
            id="WO-10476",
            farm_id="farm-1",
            module_id="R07-C45",
            defect_type=DefectType.CRACK,
            severity=SeverityLevel.HIGH,
            priority="High (P2)",
            status=WorkOrderStatus.DETECTED,
            assigned_to="Unassigned",
            created_at="2026-08-23 08:20:00",
            updated_at="2026-08-23 08:20:00",
            estimated_repair_time_hrs=3.0,
            repair_notes="Full cell replacement scheduled during next maintenance cycle.",
            before_image_url=create_rgb_panel("Physical Crack"),
            after_image_url=None
        ),
        WorkOrder(
            id="WO-10450",
            farm_id="farm-1",
            module_id="R15-C22",
            defect_type=DefectType.SOILING,
            severity=SeverityLevel.MEDIUM,
            priority="Normal (P3)",
            status=WorkOrderStatus.ASSIGNED,
            assigned_to="Cleaning Crew Alpha",
            created_at="2026-08-23 10:15:00",
            updated_at="2026-08-23 10:15:00",
            estimated_repair_time_hrs=0.5,
            repair_notes="Robotic dry-cleaning pass scheduled for row 15.",
            before_image_url=create_rgb_panel("Heavy Soiling"),
            after_image_url=None
        ),
        WorkOrder(
            id="WO-10432",
            farm_id="farm-1",
            module_id="R02-C08",
            defect_type=DefectType.SHADING,
            severity=SeverityLevel.MEDIUM,
            priority="Normal (P3)",
            status=WorkOrderStatus.RESOLVED,
            assigned_to="Vegetation Ground Team",
            created_at="2026-08-21 11:00:00",
            updated_at="2026-08-23 14:00:00",
            estimated_repair_time_hrs=1.0,
            repair_notes="Perimeter trees trimmed back by 4 meters. Awaiting visual AI verification.",
            before_image_url=create_rgb_panel("Vegetation Shading"),
            after_image_url=create_rgb_panel("Healthy")
        ),
    ]

    return farm, modules, work_orders

def generate_apex_rooftop():
    rows, cols = 10, 40
    modules = []
    healthy_cnt, warn_cnt, crit_cnt = 0, 0, 0
    total_loss_kwh, total_loss_usd = 0.0, 0.0

    for r in range(1, rows + 1):
        for c in range(1, cols + 1):
            mod_id = f"R{r:02d}-C{c:02d}"
            inv_id = f"INV-0{((r-1)//5)+1}"
            str_id = f"{inv_id}-STR{((c-1)//10)+1:02d}"
            
            defects = []
            if (r, c) == (3, 14):
                defects.append(DefectDetail(
                    id="DEF-APEX-01",
                    type=DefectType.SOILING,
                    severity=SeverityLevel.HIGH,
                    confidence=0.96,
                    detected_at="2026-08-23 09:00:00",
                    source=InspectionSource.PHONE,
                    affected_cell_region="HVAC exhaust vent deposit",
                    temperature_delta_c=2.2,
                    estimated_power_loss_pct=28.0,
                    xai_explanation="Industrial soot buildup from rooftop air handling unit.",
                    bounding_box=[50, 50, 320, 220],
                    heatmap_url=create_xai_heatmap_overlay("Heavy Soiling", [50, 50, 320, 220]),
                    original_image_url=create_rgb_panel("Heavy Soiling")
                ))
            elif (r, c) == (7, 28):
                defects.append(DefectDetail(
                    id="DEF-APEX-02",
                    type=DefectType.HOTSPOT,
                    severity=SeverityLevel.CRITICAL,
                    confidence=0.94,
                    detected_at="2026-08-23 11:30:00",
                    source=InspectionSource.THERMAL,
                    affected_cell_region="Junction box connection",
                    temperature_delta_c=19.2,
                    estimated_power_loss_pct=30.0,
                    xai_explanation="Overheating junction box terminal due to loose MC4 connector.",
                    bounding_box=[260, 95, 320, 150],
                    heatmap_url=create_xai_heatmap_overlay("Thermal Hotspot", [260, 95, 320, 150]),
                    original_image_url=create_thermal_panel("Thermal Hotspot", has_hotspot=True)
                ))

            score = calculate_module_health_score(defects, age_years=1.0)
            if score >= 85:
                status = SeverityLevel.NONE
                healthy_cnt += 1
            elif score >= 50:
                status = SeverityLevel.MEDIUM
                warn_cnt += 1
            else:
                status = SeverityLevel.CRITICAL
                crit_cnt += 1
                
            loss_kwh, loss_usd = calculate_energy_and_financial_loss(450.0, score)
            total_loss_kwh += loss_kwh
            total_loss_usd += loss_usd
            
            modules.append(SolarModule(
                id=mod_id,
                farm_id="farm-2",
                array_id="Roof-Array-1",
                inverter_id=inv_id,
                string_id=str_id,
                row=r,
                col=c,
                latitude=12.9716 + (r * 0.00005),
                longitude=77.5946 + (c * 0.00005),
                health_score=score,
                status=status,
                nominal_power_w=450.0,
                current_power_w=round(450.0 * (score/100.0), 1),
                last_inspected="2026-08-23",
                defects=defects,
                daily_energy_loss_kwh=loss_kwh,
                daily_revenue_loss_usd=loss_usd
            ))

    farm_score = int(sum(m.health_score for m in modules) / len(modules))
    farm = SolarFarm(
        id="farm-2",
        name="Apex Logistics Rooftop Facility",
        location="Bengaluru, Karnataka, India",
        capacity_mw=0.25,
        total_modules=rows*cols,
        rows=rows,
        cols=cols,
        health_score=farm_score,
        healthy_count=healthy_cnt,
        warning_count=warn_cnt,
        critical_count=crit_cnt,
        total_daily_loss_kwh=round(total_loss_kwh, 2),
        total_daily_loss_usd=round(total_loss_usd, 2),
        open_work_orders=2,
        created_at="2025-06-10",
        inverter_count=2
    )
    
    work_orders = [
        WorkOrder(
            id="WO-APEX-01",
            farm_id="farm-2",
            module_id="R07-C28",
            defect_type=DefectType.HOTSPOT,
            severity=SeverityLevel.CRITICAL,
            priority="Critical (P1)",
            status=WorkOrderStatus.ASSIGNED,
            assigned_to="Technician #01 (M. Ananth)",
            created_at="2026-08-23 11:45:00",
            updated_at="2026-08-23 11:45:00",
            estimated_repair_time_hrs=1.0,
            repair_notes="Inspect MC4 connectors on junction box.",
            before_image_url=create_thermal_panel("Thermal Hotspot", has_hotspot=True),
            after_image_url=None
        )
    ]
    return farm, modules, work_orders

def generate_pavagada_farm():
    rows, cols = 20, 60
    total_modules = rows * cols
    modules = []
    
    defect_map = {
        (5, 14): (DefectType.HOTSPOT, SeverityLevel.CRITICAL, 26.8, "Cell #12 Diode Thermal Breakdown", [260, 95, 320, 150]),
        (11, 42): (DefectType.CRACK, SeverityLevel.HIGH, 4.5, "Wafer Microfracture - Hail Impact", [140, 120, 200, 180]),
        (16, 25): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.4, "Heavy Red Soil Deposition", [30, 140, 360, 270]),
        (3, 19): (DefectType.SHADING, SeverityLevel.MEDIUM, 2.0, "Transmission Line Shadow", [20, 20, 120, 140]),
        (9, 31): (DefectType.DELAMINATION, SeverityLevel.LOW, 0.7, "EVA Yellowing & Snail Trail", [180, 50, 250, 120]),
    }
    
    healthy_cnt, warn_cnt, crit_cnt = 0, 0, 0
    total_loss_kwh, total_loss_usd = 0.0, 0.0

    for r in range(1, rows + 1):
        for c in range(1, cols + 1):
            mod_id = f"R{r:02d}-C{c:02d}"
            inv_idx = ((r - 1) // 4) + 1
            inv_id = f"INV-{inv_idx:02d}"
            str_idx = ((c - 1) // 8) + 1
            str_id = f"{inv_id}-STR{str_idx:02d}"
            
            defects = []
            if (r, c) in defect_map:
                d_type, d_sev, d_dt, d_exp, d_bbox = defect_map[(r, c)]
                is_thermal = "Hotspot" in d_type.value
                defects.append(DefectDetail(
                    id=f"DEF-PAV-{r:02d}{c:02d}",
                    type=d_type,
                    severity=d_sev,
                    confidence=0.965,
                    detected_at="2026-08-24 09:15:00",
                    source=InspectionSource.DRONE if not is_thermal else InspectionSource.THERMAL,
                    affected_cell_region=d_exp.split(" - ")[0],
                    temperature_delta_c=d_dt,
                    estimated_power_loss_pct=36.0 if d_sev == SeverityLevel.CRITICAL else 15.0,
                    xai_explanation=d_exp,
                    bounding_box=d_bbox,
                    heatmap_url=create_xai_heatmap_overlay(d_type.value, d_bbox),
                    original_image_url=create_thermal_panel(d_type.value, has_hotspot=is_thermal) if is_thermal else create_rgb_panel(d_type.value)
                ))

            score = calculate_module_health_score(defects, age_years=2.0)
            if score >= 85:
                status = SeverityLevel.NONE
                healthy_cnt += 1
            elif score >= 50:
                status = SeverityLevel.MEDIUM
                warn_cnt += 1
            else:
                status = SeverityLevel.CRITICAL
                crit_cnt += 1
                
            loss_kwh, loss_usd = calculate_energy_and_financial_loss(540.0, score)
            total_loss_kwh += loss_kwh
            total_loss_usd += loss_usd
            
            modules.append(SolarModule(
                id=mod_id,
                farm_id="farm-3",
                array_id="Pavagada-Sector-2",
                inverter_id=inv_id,
                string_id=str_id,
                row=r,
                col=c,
                latitude=14.1032 + (r * 0.0001),
                longitude=77.2711 + (c * 0.0001),
                health_score=score,
                status=status,
                nominal_power_w=540.0,
                current_power_w=round(540.0 * (score/100.0), 1),
                last_inspected="2026-08-24",
                defects=defects,
                daily_energy_loss_kwh=loss_kwh,
                daily_revenue_loss_usd=loss_usd
            ))

    farm_score = int(sum(m.health_score for m in modules) / len(modules))
    farm = SolarFarm(
        id="farm-3",
        name="Pavagada Ultra Mega Solar Park - Sector 2",
        location="Tumakuru, Karnataka, India",
        capacity_mw=100.0,
        total_modules=rows*cols,
        rows=rows,
        cols=cols,
        health_score=farm_score,
        healthy_count=healthy_cnt,
        warning_count=warn_cnt,
        critical_count=crit_cnt,
        total_daily_loss_kwh=round(total_loss_kwh, 2),
        total_daily_loss_usd=round(total_loss_usd, 2),
        open_work_orders=3,
        created_at="2024-03-15",
        inverter_count=6
    )
    
    work_orders = [
        WorkOrder(
            id="WO-PAV-101",
            farm_id="farm-3",
            module_id="R05-C14",
            defect_type=DefectType.HOTSPOT,
            severity=SeverityLevel.CRITICAL,
            priority="Critical (P1)",
            status=WorkOrderStatus.DETECTED,
            assigned_to="Unassigned (Field Ops)",
            created_at="2026-08-24 09:20:00",
            updated_at="2026-08-24 09:20:00",
            estimated_repair_time_hrs=2.0,
            repair_notes="High temperature delta +26.8°C. Replace bypass diode.",
            before_image_url=create_thermal_panel("Thermal Hotspot", has_hotspot=True),
            after_image_url=None
        )
    ]
    return farm, modules, work_orders
