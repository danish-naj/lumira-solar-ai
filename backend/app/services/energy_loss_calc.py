def calculate_energy_and_financial_loss(nominal_power_w, health_score, defect_type=None, peak_sun_hours=5.2, tariff_usd_per_kwh=0.082):
    """
    Calculates estimated daily kWh generation loss and monetary revenue impact ($ / INR).
    """
    if health_score >= 90:
        return 0.0, 0.0
        
    # Relative degradation delta
    loss_factor = (100.0 - health_score) / 100.0
    
    # Non-linear string mismatch penalty for hotspots and cracks
    if defect_type and ("Hotspot" in str(defect_type) or "Crack" in str(defect_type)):
        loss_factor = min(0.95, loss_factor * 1.35)
        
    daily_lost_kwh = round((nominal_power_w / 1000.0) * loss_factor * peak_sun_hours, 3)
    daily_lost_usd = round(daily_lost_kwh * tariff_usd_per_kwh, 3)
    
    return daily_lost_kwh, daily_lost_usd
