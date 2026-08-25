import os

dirs = [
    r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Twin3D",
    r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Warranty",
    r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\StormDefense",
    r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\SwarmFleet"
]

for d in dirs:
    os.makedirs(d, exist_ok=True)
    print(f"Created: {d}")
