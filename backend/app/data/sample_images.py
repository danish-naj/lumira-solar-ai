import io
import base64
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import numpy as np

def create_rgb_panel(defect_type="Healthy", bbox=None):
    width, height = 400, 300
    img = Image.new("RGB", (width, height), (30, 41, 59))
    draw = ImageDraw.Draw(img)
    
    # Outer frame
    draw.rectangle([10, 10, width-10, height-10], outline=(148, 163, 184), width=3, fill=(15, 23, 42))
    
    # 6x10 solar cells
    cell_w = (width - 30) // 10
    cell_h = (height - 30) // 6
    
    for r in range(6):
        for c in range(10):
            x1 = 15 + c * cell_w
            y1 = 15 + r * cell_h
            x2 = x1 + cell_w - 2
            y2 = y1 + cell_h - 2
            
            # Base silicon blue gradient
            base_blue = int(140 + 20 * np.sin(r + c))
            fill_color = (20, 50, base_blue)
            
            if defect_type == "Thermal Hotspot" and r == 2 and c == 7:
                fill_color = (60, 40, 120)  # slightly darker/strained
            elif defect_type == "Physical Crack" and r == 3 and c == 4:
                fill_color = (15, 30, 80)
            elif defect_type == "Heavy Soiling" and r >= 3:
                fill_color = (80, 70, 50)  # dusty brownish
            elif defect_type == "Vegetation Shading" and (c <= 2 or r <= 1):
                fill_color = (10, 25, 40)  # shadow
            elif defect_type == "Delamination / Snail Trail" and r == 1 and c == 5:
                fill_color = (40, 70, 110)
                
            draw.rectangle([x1, y1, x2, y2], fill=fill_color, outline=(71, 85, 105), width=1)
            
            # Cell busbars
            draw.line([x1 + cell_w//3, y1, x1 + cell_w//3, y2], fill=(148, 163, 184), width=1)
            draw.line([x1 + 2*cell_w//3, y1, x1 + 2*cell_w//3, y2], fill=(148, 163, 184), width=1)

    # Specific defect visual overlays
    if defect_type == "Physical Crack":
        # Draw zigzag white/gray crack
        cx1, cy1 = 15 + 4 * cell_w + 5, 15 + 3 * cell_h + 5
        draw.line([cx1, cy1, cx1+12, cy1+18, cx1+22, cy1+14, cx1+30, cy1+35], fill=(240, 240, 240), width=2)
        draw.line([cx1+12, cy1+18, cx1+6, cy1+28], fill=(220, 220, 220), width=1)
    elif defect_type == "Heavy Soiling":
        # Draw dusty particle speckles
        for _ in range(150):
            sx = np.random.randint(20, width-20)
            sy = np.random.randint(height//2, height-20)
            draw.ellipse([sx, sy, sx+np.random.randint(2, 6), sy+np.random.randint(2, 6)], fill=(168, 140, 90, 180))
    elif defect_type == "Vegetation Shading":
        # Draw leaf silhouette overlay
        draw.polygon([(15, 15), (90, 20), (120, 90), (60, 130), (15, 80)], fill=(16, 60, 28))
    elif defect_type == "Delamination / Snail Trail":
        # Snail trail silver lines
        stx, sty = 15 + 5 * cell_w + 2, 15 + 1 * cell_h + 4
        draw.line([stx, sty, stx+10, sty+20, stx+20, sty+15, stx+28, sty+28], fill=(200, 210, 225), width=2)

    # If bounding box is requested
    if bbox:
        draw.rectangle(bbox, outline=(239, 68, 68), width=3)
        draw.text((bbox[0]+4, bbox[1]-16), f"DEFECT: {defect_type}", fill=(239, 68, 68))
        
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=90)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")

def create_thermal_panel(defect_type="Healthy", has_hotspot=False, bbox=None):
    width, height = 400, 300
    # Ironbow thermal colormap simulation: 25°C = purple/dark blue (30, 10, 80), 55°C = orange/yellow/white
    arr = np.zeros((height, width, 3), dtype=np.uint8)
    
    # Baseline ambient ~32°C (deep purple-indigo)
    arr[:, :, 0] = 50   # R
    arr[:, :, 1] = 20   # G
    arr[:, :, 2] = 110  # B
    
    # Add subtle module grid temperature gradient
    for r in range(6):
        for c in range(10):
            y1, y2 = 15 + r*45, 15 + (r+1)*45 - 2
            x1, x2 = 15 + c*37, 15 + (c+1)*37 - 2
            arr[y1:y2, x1:x2, 0] = np.clip(arr[y1:y2, x1:x2, 0] + 15 + (r%2)*5, 0, 255)
            arr[y1:y2, x1:x2, 1] = np.clip(arr[y1:y2, x1:x2, 1] + 10, 0, 255)
            arr[y1:y2, x1:x2, 2] = np.clip(arr[y1:y2, x1:x2, 2] + 20, 0, 255)

    if defect_type == "Thermal Hotspot" or has_hotspot:
        # Create intense localized thermal hotspot at cell (2, 7)
        cy, cx = 15 + 2*45 + 22, 15 + 7*37 + 18
        for y in range(height):
            for x in range(width):
                dist = np.sqrt((x - cx)**2 + (y - cy)**2)
                if dist < 45:
                    heat_factor = np.exp(-dist / 14)
                    # Shift to bright yellow/white/orange
                    arr[y, x, 0] = int(min(255, arr[y, x, 0] + heat_factor * 200))
                    arr[y, x, 1] = int(min(255, arr[y, x, 1] + heat_factor * 180))
                    arr[y, x, 2] = int(max(20, arr[y, x, 2] - heat_factor * 90 + heat_factor * 160))

    img = Image.fromarray(arr)
    draw = ImageDraw.Draw(img)
    draw.rectangle([10, 10, width-10, height-10], outline=(100, 100, 150), width=2)
    
    # Thermal scale bar
    draw.rectangle([width-25, 20, width-15, height-20], outline=(255, 255, 255), width=1)
    for i in range(height-40):
        t_ratio = 1.0 - (i / (height-40))
        r_c = int(255 * t_ratio)
        g_c = int(200 * t_ratio if t_ratio > 0.5 else 40)
        b_c = int(220 * (1 - t_ratio))
        draw.line([width-24, 20+i, width-16, 20+i], fill=(r_c, g_c, b_c))
        
    draw.text((width-45, 15), "58°C", fill=(255, 255, 255))
    draw.text((width-45, height-25), "28°C", fill=(200, 200, 255))
    
    if bbox:
        draw.rectangle(bbox, outline=(239, 68, 68), width=3)
        draw.text((bbox[0]+4, bbox[1]-16), "HOTSPOT +24.6°C", fill=(255, 255, 255))

    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=90)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")

def create_xai_heatmap_overlay(rgb_base64_or_type="Thermal Hotspot", bbox=(260, 95, 320, 150)):
    # Generate an explainable AI Grad-CAM attention heatmap overlay
    width, height = 400, 300
    base_img = Image.new("RGB", (width, height), (20, 35, 65))
    draw = ImageDraw.Draw(base_img)
    
    # Draw base cells
    for r in range(6):
        for c in range(10):
            draw.rectangle([15 + c*37, 15 + r*45, 15 + (c+1)*37 - 2, 15 + (r+1)*45 - 2], 
                           outline=(40, 60, 90), fill=(25, 45, 80))
                           
    # Create Grad-CAM heatmap array
    cx = (bbox[0] + bbox[2]) // 2
    cy = (bbox[1] + bbox[3]) // 2
    
    heatmap = np.zeros((height, width, 4), dtype=np.uint8)
    for y in range(height):
        for x in range(width):
            dist = np.sqrt((x - cx)**2 + (y - cy)**2)
            if dist < 70:
                intensity = np.exp(-dist / 22)
                # Jet colormap: Red -> Yellow -> Green -> Cyan
                heatmap[y, x, 0] = int(255 * intensity)
                heatmap[y, x, 1] = int(200 * (1 - abs(intensity - 0.5) * 2))
                heatmap[y, x, 2] = int(50 * (1 - intensity))
                heatmap[y, x, 3] = int(190 * intensity) # Alpha
                
    overlay = Image.fromarray(heatmap, "RGBA")
    base_img.paste(overlay, (0, 0), overlay)
    
    final_draw = ImageDraw.Draw(base_img)
    final_draw.rectangle(bbox, outline=(239, 68, 68), width=3)
    final_draw.text((bbox[0], bbox[1]-16), "AI FOCUS: 96.4%", fill=(255, 230, 0))
    
    buf = io.BytesIO()
    base_img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")
