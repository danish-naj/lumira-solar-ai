import json, os

root_vercel = {
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}

frontend_vercel = {
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}

with open(r"D:\AntigravityProjects\solarguard-ai\vercel.json", "w", encoding="utf-8") as f:
    json.dump(root_vercel, f, indent=2)

with open(r"D:\AntigravityProjects\solarguard-ai\frontend\vercel.json", "w", encoding="utf-8") as f:
    json.dump(frontend_vercel, f, indent=2)

print("Configured vercel.json in root and frontend.")
