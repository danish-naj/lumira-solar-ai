import os

dirs = [
    r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\FlightPlanner",
    r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Predictive",
    r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Portfolio",
    r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\VoiceCopilot"
]

for d in dirs:
    os.makedirs(d, exist_ok=True)
    print(f"Created directory: {d}")
