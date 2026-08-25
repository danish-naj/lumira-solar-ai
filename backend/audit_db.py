import os
from app.database import db

farms = db.get_all_farms()
print(f"=== FULL PORTFOLIO AUDIT ({len(farms)} SITES) ===")
for f in farms:
    mods = db.get_modules(f.id)
    crit = [m for m in mods if m.health_score < 50]
    warn = [m for m in mods if m.health_score >= 50 and m.health_score < 85]
    nom = [m for m in mods if m.health_score >= 85]
    print(f"[{f.id}] {f.name} ({f.capacity_mw} MW) | Overall Health: {f.health_score}/100")
    print(f"  - Modules: {len(mods)} total | {len(crit)} Critical (<50) | {len(warn)} Warning (50-84) | {len(nom)} Healthy (>85)")
    print(f"  - Daily Losses: {f.total_daily_loss_kwh} kWh/d (${f.total_daily_loss_usd}/d / ₹{round(f.total_daily_loss_usd*85, 2)}/d)")
    print(f"  - Sample Defect Modules:")
    for dmod in (crit + warn)[:3]:
        d = dmod.defects[0] if dmod.defects else None
        print(f"    * {dmod.id} (Health {dmod.health_score}/100, Inv {dmod.inverter_id}): {d.type.value if d else 'Nominal'} (DeltaT: +{d.temperature_delta_c if d else 0}°C)")
