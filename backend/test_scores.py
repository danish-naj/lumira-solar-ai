import os
from app.models.schemas import DefectType, SeverityLevel, DefectDetail, InspectionSource
from app.services.scoring_engine import calculate_module_health_score

# Check calculation for hotspot
d1 = DefectDetail(
    id="1", type=DefectType.HOTSPOT, severity=SeverityLevel.CRITICAL,
    confidence=0.98, detected_at="now", source=InspectionSource.THERMAL,
    temperature_delta_c=18.4
)
print("Hotspot Score (DeltaT 18.4):", calculate_module_health_score([d1]))

d2 = DefectDetail(
    id="2", type=DefectType.CRACK, severity=SeverityLevel.HIGH,
    confidence=0.95, detected_at="now", source=InspectionSource.DRONE,
    temperature_delta_c=4.2
)
print("Crack Score:", calculate_module_health_score([d2]))

d3 = DefectDetail(
    id="3", type=DefectType.SOILING, severity=SeverityLevel.MEDIUM,
    confidence=0.94, detected_at="now", source=InspectionSource.DRONE,
    temperature_delta_c=1.2
)
print("Soiling Score:", calculate_module_health_score([d3]))

d4 = DefectDetail(
    id="4", type=DefectType.DELAMINATION, severity=SeverityLevel.LOW,
    confidence=0.91, detected_at="now", source=InspectionSource.DRONE,
    temperature_delta_c=0.8
)
print("Delamination Score:", calculate_module_health_score([d4]))
