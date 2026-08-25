import os

SEED_FILE = r"D:\AntigravityProjects\solarguard-ai\backend\app\data\seed_data.py"
SAMPLE_IMG_FILE = r"D:\AntigravityProjects\solarguard-ai\backend\app\data\sample_images.py"

# Enhanced sample images generator supporting all defect types & visual layers
sample_img_code = """import io
import base64
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

def create_rgb_panel(defect_type="Healthy", bbox=None):
    width, height = 400, 300
    img = Image.new("RGB", (width, height), (30, 41, 59))
    draw = ImageDraw.Draw(img)
    
    # Outer aluminum frame
    draw.rectangle([8, 8, width-8, height-8], outline=(148, 163, 184), width=3, fill=(15, 23, 42))
    
    # 6x10 solar cells
    cell_w = (width - 24) // 10
    cell_h = (height - 24) // 6
    
    for r in range(6):
        for c in range(10):
            x1 = 12 + c * cell_w
            y1 = 12 + r * cell_h
            x2 = x1 + cell_w - 2
            y2 = y1 + cell_h - 2
            
            # Base silicon blue gradient
            base_blue = int(150 + 15 * np.sin(r*0.8 + c*0.5))
            fill_color = (18, 48, base_blue)
            
            if "Hotspot" in defect_type and r == 2 and c == 7:
                fill_color = (80, 30, 70)  # Thermal stress discoloration
            elif "Crack" in defect_type and r == 3 and c == 4:
                fill_color = (12, 28, 70)
            elif "Soiling" in defect_type and r >= 3:
                fill_color = (95, 80, 55)  # Heavy desert dust / sand
            elif "Shading" in defect_type and (c <= 3 or r <= 1):
                fill_color = (10, 22, 38)  # Shadow
            elif "Delamination" in defect_type and r == 1 and c == 5:
                fill_color = (45, 75, 115)
            elif "Snail" in defect_type and r == 4 and c == 2:
                fill_color = (50, 65, 95)
            elif "PID" in defect_type and (r == 0 or r == 5):
                fill_color = (25, 35, 75)
                
            draw.rectangle([x1, y1, x2, y2], fill=fill_color, outline=(51, 65, 85), width=1)
            
            # Busbars
            draw.line([x1 + cell_w//3, y1, x1 + cell_w//3, y2], fill=(160, 174, 192), width=1)
            draw.line([x1 + 2*cell_w//3, y1, x1 + 2*cell_w//3, y2], fill=(160, 174, 192), width=1)

    # Defect specific visual overlays
    if "Crack" in defect_type:
        cx1, cy1 = 12 + 4 * cell_w + 6, 12 + 3 * cell_h + 4
        draw.line([cx1, cy1, cx1+12, cy1+16, cx1+20, cy1+12, cx1+28, cy1+32], fill=(245, 245, 245), width=2)
        draw.line([cx1+12, cy1+16, cx1+6, cy1+26], fill=(210, 210, 210), width=1)
    elif "Soiling" in defect_type:
        for _ in range(220):
            sx = np.random.randint(15, width-15)
            sy = np.random.randint(height//2 - 20, height-15)
            draw.ellipse([sx, sy, sx+np.random.randint(2, 5), sy+np.random.randint(2, 5)], fill=(180, 150, 100))
    elif "Shading" in defect_type:
        draw.polygon([(12, 12), (110, 15), (140, 95), (70, 140), (12, 90)], fill=(12, 30, 20))
    elif "Snail" in defect_type:
        sx, sy = 12 + 2 * cell_w + 4, 12 + 4 * cell_h + 8
        draw.line([sx, sy, sx+8, sy-4, sx+16, sy+6, sx+24, sy-2], fill=(180, 180, 180), width=2)
    elif "PID" in defect_type:
        draw.rectangle([12, 12, width-12, 35], fill=(30, 20, 60))

    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"

def create_thermal_panel(defect_type="Healthy", has_hotspot=False, bbox=None):
    width, height = 400, 300
    arr = np.full((height, width, 3), (25, 20, 60), dtype=np.uint8) # ~38°C baseline
    
    # Add subtle thermal gradient
    for y in range(height):
        for x in range(width):
            arr[y, x, 0] = int(25 + 10 * np.sin(x/50.0))
            arr[y, x, 1] = int(20 + 8 * np.cos(y/40.0))
            arr[y, x, 2] = int(60 + 12 * np.sin((x+y)/60.0))
            
    img = Image.fromarray(arr, mode="RGB")
    draw = ImageDraw.Draw(img)
    
    # Draw solar cell outlines in ironbow theme
    cell_w = (width - 24) // 10
    cell_h = (height - 24) // 6
    for r in range(6):
        for c in range(10):
            x1 = 12 + c * cell_w
            y1 = 12 + r * cell_h
            draw.rectangle([x1, y1, x1+cell_w-2, y1+cell_h-2], outline=(45, 35, 90), width=1)
            
    if has_hotspot or "Hotspot" in defect_type:
        hx, hy = 12 + 7 * cell_w + cell_w//2, 12 + 2 * cell_h + cell_h//2
        hotspot = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        hdraw = ImageDraw.Draw(hotspot)
        hdraw.ellipse([hx-35, hy-35, hx+35, hy+35], fill=(255, 60, 0, 220))
        hdraw.ellipse([hx-20, hy-20, hx+20, hy+20], fill=(255, 220, 0, 255))
        hdraw.ellipse([hx-8, hy-8, hx+8, hy+8], fill=(255, 255, 255, 255)) # Peak +18.4°C core
        hotspot = hotspot.filter(ImageFilter.GaussianBlur(radius=8))
        img = Image.alpha_composite(img.convert("RGBA"), hotspot).convert("RGB")
    elif "Crack" in defect_type:
        cx, cy = 12 + 4 * cell_w + cell_w//2, 12 + 3 * cell_h + cell_h//2
        crack_spot = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        cdraw = ImageDraw.Draw(crack_spot)
        cdraw.ellipse([cx-20, cy-20, cx+20, cy+20], fill=(240, 100, 20, 180))
        cdraw.ellipse([cx-8, cy-8, cx+8, cy+8], fill=(255, 200, 50, 220))
        crack_spot = crack_spot.filter(ImageFilter.GaussianBlur(radius=5))
        img = Image.alpha_composite(img.convert("RGBA"), crack_spot).convert("RGB")
    elif "Soiling" in defect_type:
        soil_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        sdraw = ImageDraw.Draw(soil_layer)
        sdraw.rectangle([12, height//2, width-12, height-12], fill=(60, 40, 110, 120))
        soil_layer = soil_layer.filter(ImageFilter.GaussianBlur(radius=6))
        img = Image.alpha_composite(img.convert("RGBA"), soil_layer).convert("RGB")

    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"

def create_xai_heatmap_overlay(defect_type="Healthy", bbox=None):
    width, height = 400, 300
    base_thermal = Image.new("RGB", (width, height), (20, 25, 55))
    
    heatmap = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    hdraw = ImageDraw.Draw(heatmap)
    
    if bbox:
        x1, y1, x2, y2 = bbox
        cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
        rad_x = (x2 - x1) // 2 + 10
        rad_y = (y2 - y1) // 2 + 10
        hdraw.ellipse([cx-rad_x, cy-rad_y, cx+rad_x, cy+rad_y], fill=(220, 38, 38, 200))
        hdraw.ellipse([cx-rad_x//2, cy-rad_y//2, cx+rad_x//2, cy+rad_y//2], fill=(245, 158, 11, 240))
        hdraw.ellipse([cx-rad_x//4, cy-rad_y//4, cx+rad_x//4, cy+rad_y//4], fill=(254, 240, 138, 255))
    else:
        cx, cy = width // 2, height // 2
        hdraw.ellipse([cx-40, cy-30, cx+40, cy+30], fill=(220, 38, 38, 180))
        
    heatmap = heatmap.filter(ImageFilter.GaussianBlur(radius=10))
    fused = Image.alpha_composite(base_thermal.convert("RGBA"), heatmap).convert("RGB")
    
    # Draw Grad-CAM Saliency Bounding Box with Label
    draw = ImageDraw.Draw(fused)
    if bbox:
        bx1, by1, bx2, by2 = bbox
        draw.rectangle([bx1, by1, bx2, by2], outline=(220, 38, 38), width=2)
        draw.rectangle([bx1, by1-16, bx1+70, by1], fill=(220, 38, 38))
        draw.text((bx1+4, by1-14), "ANOMALY", fill=(255, 255, 255))
        
    buf = io.BytesIO()
    fused.save(buf, format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"
"""

with open(SAMPLE_IMG_FILE, "w", encoding="utf-8") as f:
    f.write(sample_img_code)
print("Updated sample_images.py with rich multi-spectral rendering.")

# Comprehensive Seed Data covering every level of risk & IEC 62446-3 defect classes
seed_data_code = """import random
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
            status=WorkOrderStatus.IN_PROGRESS,
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
"""

with open(SEED_FILE, "w", encoding="utf-8") as f:
    f.write(seed_data_code)
print("Updated seed_data.py with comprehensive multi-tier risk dataset.")
