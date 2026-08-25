import io
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
