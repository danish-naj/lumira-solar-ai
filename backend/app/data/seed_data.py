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
    
    # Comprehensive Real-World Defect Map spanning ALL 4 Risk Levels
    # Format: (row, col) -> (Type, Severity, DeltaT, Explanation, BoundingBox)
    defect_map = {
        # === CRITICAL RISK (Health < 50, DeltaT > 15°C, P1 Work Orders) ===
        (12, 37): (DefectType.HOTSPOT, SeverityLevel.CRITICAL, 18.4, "Cell #8 Diode Shunt Breakdown - Severe Reverse Bias Heating", [260, 95, 320, 150]),
        (4, 18): (DefectType.HOTSPOT, SeverityLevel.CRITICAL, 24.5, "Row 2 Bypass Diode Thermal Runaway - Fire Hazard Risk", [240, 90, 310, 160]),
        (6, 29): (DefectType.HOTSPOT, SeverityLevel.CRITICAL, 21.0, "Internal Ribbon Solder Joint Thermal Burnout", [250, 100, 310, 155]),
        (11, 15): (DefectType.HOTSPOT, SeverityLevel.CRITICAL, 27.2, "Junction Box Arcing & Diode Open-Circuit Failure", [230, 80, 330, 170]),

        # === HIGH RISK (Health 50-69, DeltaT 5-15°C, P2 Work Orders) ===
        (7, 45): (DefectType.CRACK, SeverityLevel.HIGH, 4.2, "Busbar Cross-Section Wafer Microfracture from Mechanical Stress", [140, 120, 200, 180]),
        (14, 58): (DefectType.CRACK, SeverityLevel.HIGH, 3.8, "Hail Impact Radial Microcrack Lattice across Cells 4-6", [210, 130, 270, 190]),
        (19, 33): (DefectType.HOTSPOT, SeverityLevel.HIGH, 15.2, "Sub-string Bypass Diode Overheating under High Irradiance", [260, 95, 320, 150]),
        (8, 50): (DefectType.PID, SeverityLevel.HIGH, 6.5, "Potential-Induced Degradation (PID) along Negative Pole Edge", [20, 20, 380, 60]),
        (13, 26): (DefectType.CRACK, SeverityLevel.HIGH, 4.8, "Cross-Cell Microfissure with Impending Busbar Disconnect", [150, 110, 210, 170]),
        (3, 40): (DefectType.HOTSPOT, SeverityLevel.HIGH, 12.1, "Localized Multi-Cell Hotspot Cluster due to Partial Shunt", [240, 85, 315, 145]),

        # === MEDIUM RISK (Health 70-84, DeltaT 2-5°C, P3 Work Orders) ===
        (15, 22): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.2, "Heavy Desert Sand & Calcareous Dust Encrustation on Lower Array", [30, 140, 360, 270]),
        (8, 12): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.5, "Bird Droppings (Guano) Fouling causing Localized Hotspot Nucleation", [100, 80, 180, 140]),
        (10, 50): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.1, "Fine Silica Dust Accumulation from Unpaved Perimeter Access Road", [30, 140, 360, 270]),
        (2, 8): (DefectType.SHADING, SeverityLevel.MEDIUM, 2.1, "Perimeter Acacia Tree Canopy Shadow cast on Strings 1-3", [20, 20, 120, 140]),
        (17, 10): (DefectType.SHADING, SeverityLevel.MEDIUM, 1.8, "Inverter Enclosure Security Fence Shadow at Low Sun Angles", [20, 20, 140, 150]),
        (9, 44): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.4, "Non-Uniform Desert Soiling reducing Short-Circuit Current", [30, 130, 370, 260]),
        (16, 25): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.3, "Heavy Red Clay Dust Crust from Pre-Monsoon Dust Storm", [30, 140, 360, 270]),
        (5, 30): (DefectType.SHADING, SeverityLevel.MEDIUM, 1.9, "Single-Axis Tracker Angular Lag inducing Inter-Row Self-Shading", [20, 20, 150, 130]),
        (14, 12): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.6, "Concentrated Avian Soiling along Top Aluminum Frame Edge", [80, 60, 170, 130]),
        (20, 55): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.2, "Mud Splash Encrustation on Lowest Module Rake during Monsoon", [30, 180, 360, 280]),

        # === LOW RISK (Health 85-94, DeltaT < 2°C, P4 Monitoring) ===
        (18, 52): (DefectType.SNAIL_TRAIL, SeverityLevel.LOW, 0.8, "Moisture Ingress Snail Trails along Silver Finger Grid", [180, 50, 250, 120]),
        (9, 31): (DefectType.DELAMINATION, SeverityLevel.LOW, 0.7, "EVA Encapsulant Yellowing & Frontsheet Edge Moisture Ingress", [180, 50, 250, 120]),
        (1, 5): (DefectType.DELAMINATION, SeverityLevel.LOW, 0.6, "Anti-Reflective Coating (ARC) Micro-Degradation on Glass Surface", [100, 40, 200, 110]),
        (5, 40): (DefectType.DELAMINATION, SeverityLevel.LOW, 0.9, "Corner EVA Delamination without Cell Damage", [20, 20, 80, 80]),
        (12, 15): (DefectType.SNAIL_TRAIL, SeverityLevel.LOW, 0.7, "Slight Snail Trail Pattern along Microcrack Line", [160, 45, 230, 115]),
        (3, 12): (DefectType.DELAMINATION, SeverityLevel.LOW, 0.5, "Minor Cleaning Brush Scratches on Anti-Reflective Coating", [50, 30, 150, 90]),
        (16, 48): (DefectType.SNAIL_TRAIL, SeverityLevel.LOW, 0.8, "Discoloration Trails on Sub-Cell Metallization", [170, 55, 240, 125]),
        (7, 2): (DefectType.SOILING, SeverityLevel.LOW, 0.4, "Light Airborne Dust Film within Acceptable Thresholds", [20, 120, 380, 260]),
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
                is_thermal = "Hotspot" in d_type.value or d_sev == SeverityLevel.CRITICAL
                defects.append(DefectDetail(
                    id=f"DEF-BHA-{r:02d}{c:02d}",
                    type=d_type,
                    severity=d_sev,
                    confidence=round(random.uniform(0.93, 0.99), 3),
                    detected_at="2026-08-25 09:30:00",
                    source=InspectionSource.THERMAL if is_thermal else InspectionSource.DRONE,
                    affected_cell_region=d_exp.split(" - ")[0] if " - " in d_exp else "Active Region",
                    temperature_delta_c=d_dt,
                    estimated_power_loss_pct=34.0 if d_sev == SeverityLevel.CRITICAL else (20.0 if d_sev == SeverityLevel.HIGH else (10.0 if d_sev == SeverityLevel.MEDIUM else 2.0)),
                    xai_explanation=d_exp,
                    bounding_box=d_bbox,
                    heatmap_url=create_xai_heatmap_overlay(d_type.value, d_bbox),
                    original_image_url=create_thermal_panel(d_type.value, has_hotspot=is_thermal, bbox=d_bbox) if is_thermal else create_rgb_panel(d_type.value, bbox=d_bbox)
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
                array_id="Bhadla-Sector-04",
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
                last_inspected="2026-08-25",
                defects=defects,
                daily_energy_loss_kwh=loss_kwh,
                daily_revenue_loss_usd=loss_usd
            ))

    farm_score = int(sum(m.health_score for m in modules) / len(modules))
    farm = SolarFarm(
        id="farm-1",
        name="Bhadla Mega Solar Park - Sector 4",
        location="Phalodi, Jodhpur, Rajasthan, India",
        capacity_mw=50.0,
        total_modules=rows*cols,
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
            status=WorkOrderStatus.RESOLVED,
            assigned_to="Technician #04 (R. Sharma)",
            created_at="2026-08-24 08:30:00",
            updated_at="2026-08-25 10:15:00",
            estimated_repair_time_hrs=1.5,
            repair_notes="Replaced bypass diode and cleaned junction box contacts. Thermal gradient normalized.",
            before_image_url=create_thermal_panel("Thermal Hotspot", has_hotspot=True, bbox=[260, 95, 320, 150]),
            after_image_url=create_thermal_panel("Healthy", has_hotspot=False)
        ),
        WorkOrder(
            id="WO-10493",
            farm_id="farm-1",
            module_id="R04-C18",
            defect_type=DefectType.HOTSPOT,
            severity=SeverityLevel.CRITICAL,
            priority="Critical (P1)",
            status=WorkOrderStatus.IN_REPAIR,
            assigned_to="Technician #02 (K. Verma)",
            created_at="2026-08-24 09:15:00",
            updated_at="2026-08-25 09:00:00",
            estimated_repair_time_hrs=2.0,
            repair_notes="Bypass diode replacement underway. String isolated at DC combiner box.",
            before_image_url=create_thermal_panel("Thermal Hotspot", has_hotspot=True, bbox=[240, 90, 310, 160]),
            after_image_url=None
        ),
        WorkOrder(
            id="WO-10494",
            farm_id="farm-1",
            module_id="R07-C45",
            defect_type=DefectType.CRACK,
            severity=SeverityLevel.HIGH,
            priority="High (P2)",
            status=WorkOrderStatus.ASSIGNED,
            assigned_to="Technician #07 (A. Patel)",
            created_at="2026-08-24 11:00:00",
            updated_at="2026-08-24 11:00:00",
            estimated_repair_time_hrs=1.0,
            repair_notes="Conduct EL imaging test and assess microcrack propagation rate.",
            before_image_url=create_rgb_panel("Physical Crack", bbox=[140, 120, 200, 180]),
            after_image_url=None
        ),
        WorkOrder(
            id="WO-10495",
            farm_id="farm-1",
            module_id="R15-C22",
            defect_type=DefectType.SOILING,
            severity=SeverityLevel.MEDIUM,
            priority="Medium (P3)",
            status=WorkOrderStatus.ASSIGNED,
            assigned_to="Cleaning Crew Alpha",
            created_at="2026-08-25 07:00:00",
            updated_at="2026-08-25 07:00:00",
            estimated_repair_time_hrs=0.5,
            repair_notes="Robotic dry cleaning scheduled for Sector 4, Rows 14-16.",
            before_image_url=create_rgb_panel("Heavy Soiling", bbox=[30, 140, 360, 270]),
            after_image_url=None
        ),
        WorkOrder(
            id="WO-10496",
            farm_id="farm-1",
            module_id="R18-C52",
            defect_type=DefectType.SNAIL_TRAIL,
            severity=SeverityLevel.LOW,
            priority="Low (P4)",
            status=WorkOrderStatus.VERIFIED,
            assigned_to="Senior QA Engineer",
            created_at="2026-08-23 14:00:00",
            updated_at="2026-08-25 08:30:00",
            estimated_repair_time_hrs=0.5,
            repair_notes="Certified nominal degradation rate. Snail trails stabilized; no bypass diode risk.",
            before_image_url=create_rgb_panel("Delamination / Snail Trail", bbox=[180, 50, 250, 120]),
            after_image_url=create_rgb_panel("Healthy")
        )
    ]
    return farm, modules, work_orders

def generate_pavagada_farm():
    rows, cols = 20, 60
    total_modules = rows * cols
    modules = []
    
    defect_map = {
        (5, 14): (DefectType.HOTSPOT, SeverityLevel.CRITICAL, 26.8, "Cell #12 Diode Thermal Breakdown", [260, 95, 320, 150]),
        (11, 42): (DefectType.CRACK, SeverityLevel.HIGH, 4.5, "Wafer Microfracture - Lightning Surge Impact", [140, 120, 200, 180]),
        (16, 25): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.4, "Heavy Red Laterite Soil Deposition", [30, 140, 360, 270]),
        (3, 19): (DefectType.SHADING, SeverityLevel.MEDIUM, 2.0, "High-Voltage Transmission Line Shadow", [20, 20, 120, 140]),
        (9, 31): (DefectType.DELAMINATION, SeverityLevel.LOW, 0.7, "EVA Yellowing & Snail Trail Discoloration", [180, 50, 250, 120]),
        (18, 10): (DefectType.PID, SeverityLevel.HIGH, 5.9, "Potential Induced Degradation - String Tail End", [20, 20, 380, 60]),
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
                is_thermal = "Hotspot" in d_type.value or d_sev == SeverityLevel.CRITICAL
                defects.append(DefectDetail(
                    id=f"DEF-PAV-{r:02d}{c:02d}",
                    type=d_type,
                    severity=d_sev,
                    confidence=0.965,
                    detected_at="2026-08-25 09:15:00",
                    source=InspectionSource.DRONE if not is_thermal else InspectionSource.THERMAL,
                    affected_cell_region=d_exp.split(" - ")[0],
                    temperature_delta_c=d_dt,
                    estimated_power_loss_pct=36.0 if d_sev == SeverityLevel.CRITICAL else 16.0,
                    xai_explanation=d_exp,
                    bounding_box=d_bbox,
                    heatmap_url=create_xai_heatmap_overlay(d_type.value, d_bbox),
                    original_image_url=create_thermal_panel(d_type.value, has_hotspot=is_thermal, bbox=d_bbox) if is_thermal else create_rgb_panel(d_type.value, bbox=d_bbox)
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
                
            loss_kwh, loss_usd = calculate_energy_and_financial_loss(540.0, score, defects[0].type.value if defects else None)
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
                last_inspected="2026-08-25",
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
            created_at="2026-08-25 09:20:00",
            updated_at="2026-08-25 09:20:00",
            estimated_repair_time_hrs=2.0,
            repair_notes="High temperature delta +26.8°C. Replace bypass diode on Combiner Box #02.",
            before_image_url=create_thermal_panel("Thermal Hotspot", has_hotspot=True, bbox=[260, 95, 320, 150]),
            after_image_url=None
        )
    ]
    return farm, modules, work_orders

def generate_apex_rooftop():
    rows, cols = 10, 40
    total_modules = rows * cols
    modules = []
    
    defect_map = {
        (7, 28): (DefectType.HOTSPOT, SeverityLevel.CRITICAL, 22.4, "Hotspot Cell #14 - Rooftop HVAC Exhaust Back-Heating", [240, 80, 310, 150]),
        (2, 14): (DefectType.SHADING, SeverityLevel.MEDIUM, 2.8, "Rooftop Ventilation Chute Shade", [20, 20, 130, 140]),
        (4, 32): (DefectType.SOILING, SeverityLevel.MEDIUM, 1.6, "Industrial Cement Particulate Soiling", [30, 140, 360, 270]),
        (8, 10): (DefectType.CRACK, SeverityLevel.HIGH, 3.2, "Foot Traffic Wafer Microfracture from Maintenance Walkway", [140, 120, 200, 180]),
    }
    
    healthy_cnt, warn_cnt, crit_cnt = 0, 0, 0
    total_loss_kwh, total_loss_usd = 0.0, 0.0

    for r in range(1, rows + 1):
        for c in range(1, cols + 1):
            mod_id = f"R{r:02d}-C{c:02d}"
            inv_idx = ((r - 1) // 5) + 1
            inv_id = f"INV-{inv_idx:02d}"
            str_idx = ((c - 1) // 8) + 1
            str_id = f"{inv_id}-STR{str_idx:02d}"
            
            defects = []
            if (r, c) in defect_map:
                d_type, d_sev, d_dt, d_exp, d_bbox = defect_map[(r, c)]
                is_thermal = "Hotspot" in d_type.value or d_sev == SeverityLevel.CRITICAL
                defects.append(DefectDetail(
                    id=f"DEF-APX-{r:02d}{c:02d}",
                    type=d_type,
                    severity=d_sev,
                    confidence=0.978,
                    detected_at="2026-08-25 10:00:00",
                    source=InspectionSource.THERMAL if is_thermal else InspectionSource.SMARTPHONE,
                    affected_cell_region=d_exp.split(" - ")[0],
                    temperature_delta_c=d_dt,
                    estimated_power_loss_pct=30.0 if d_sev == SeverityLevel.CRITICAL else 14.0,
                    xai_explanation=d_exp,
                    bounding_box=d_bbox,
                    heatmap_url=create_xai_heatmap_overlay(d_type.value, d_bbox),
                    original_image_url=create_thermal_panel(d_type.value, has_hotspot=is_thermal, bbox=d_bbox) if is_thermal else create_rgb_panel(d_type.value, bbox=d_bbox)
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
                
            loss_kwh, loss_usd = calculate_energy_and_financial_loss(450.0, score, defects[0].type.value if defects else None)
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
                latitude=18.5204 + (r * 0.00005),
                longitude=73.8567 + (c * 0.00005),
                health_score=score,
                status=status,
                nominal_power_w=450.0,
                current_power_w=round(450.0 * (score/100.0), 1),
                last_inspected="2026-08-25",
                defects=defects,
                daily_energy_loss_kwh=loss_kwh,
                daily_revenue_loss_usd=loss_usd
            ))

    farm_score = int(sum(m.health_score for m in modules) / len(modules))
    farm = SolarFarm(
        id="farm-2",
        name="Apex Logistics Rooftop Facility",
        location="Pune Industrial Corridor, Maharashtra, India",
        capacity_mw=2.5,
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
            created_at="2026-08-25 10:15:00",
            updated_at="2026-08-25 10:15:00",
            estimated_repair_time_hrs=1.0,
            repair_notes="Inspect MC4 connectors on junction box adjacent to HVAC exhaust.",
            before_image_url=create_thermal_panel("Thermal Hotspot", has_hotspot=True, bbox=[240, 80, 310, 150]),
            after_image_url=None
        )
    ]
    return farm, modules, work_orders
