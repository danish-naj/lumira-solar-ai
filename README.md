<div align="center">

# Lumira ✦
### Solar Asset Intelligence & Hardware-Agnostic AI Operating System

[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.12-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)](LICENSE)
[![Standards](https://img.shields.io/badge/Standard-IEC%2062446--3-027a48?style=flat-square)]()

**Lumira** is an enterprise-grade, hardware-agnostic AI operating system engineered for utility-scale solar asset owners, IPPs, and O&M contractors. It converts raw inspection imagery (Drone Orthomosaics, Handheld Thermography, Vehicle Scanners, Smartphone RGB) and SCADA telemetry into high-precision 2D Digital Twins with closed-loop predictive work order verification.

[Explore Product Whitepaper](docs/PRODUCT_SPECIFICATION.md) · [View Interactive Demo](lumira_standalone_prototype.html) · [API Reference](http://localhost:8000/docs)

</div>

---

## ⚡ Key Architectural Capabilities

```
                  ┌─────────────────────────────────────────────────────────┐
                  │                 MULTI-MODAL INGESTION                   │
                  │   [Drone Ortho]  [Thermal IR]  [Vehicle]  [Smartphone]  │
                  └────────────────────────────┬────────────────────────────┘
                                               │
                                               ▼
                  ┌─────────────────────────────────────────────────────────┐
                  │           LUMIRA COMPUTER VISION & XAI PIPELINE         │
                  │   1. Geo-Registration & Sub-Module Segmentation (IoU)   │
                  │   2. Multi-Class Defect Classifier (IEC 62446-3)        │
                  │   3. Explainable AI Heatmaps (Grad-CAM Saliency)        │
                  └────────────────────────────┬────────────────────────────┘
                                               │
                                               ▼
                  ┌─────────────────────────────────────────────────────────┐
                  │            2D DIGITAL TWIN PV MATRIX (1,200 CELLS)      │
                  │   Real-time Health Scoring, Delta-T, & Yield Loss ($/₹) │
                  └─────────────┬─────────────────────────────┬─────────────┘
                                │                             │
                                ▼                             ▼
    ┌──────────────────────────────────────┐    ┌──────────────────────────────────────┐
    │     AI-GUIDED SCADA DISPATCH         │    │      CLOSED-LOOP O&M WORK ORDERS     │
    │  - Real-time String V-I Anomaly      │    │  - P1/P2/P3 Prioritized Kanban       │
    │  - 98.6% Flight Inspection Time Saved│    │  - Brutalist AI Repair Verification  │
    └──────────────────────────────────────┘    └──────────────────────────────────────┘
```

---

## 🌟 Modules & Features

### 1. 🎛️ Executive Cockpit & Fleet Overview
* **7:5 Asymmetric Split Architecture:** Live fleet health scoring ($97/100$), IEC 62446-3 Defect Taxonomy distribution, power loss analytics, and AI SCADA directives.
* **Surgical Status Indication:** Strict monochrome aesthetic with surgical status colors (Nominal `#027a48`, Warning `#b54708`, Critical `#d92d20`).

### 2. 🗺️ 2D Digital Twin Solar Grid
* **1,200 Interactive Cell Matrix:** Full spatial mapping across inverters `INV-01` through `INV-06`.
* **Slide-Over Diagnostic Drawer:** Instant layer switching (`AI HEATMAP`, `THERMAL IR`, `RGB VISUAL`), $\Delta T$ temperature delta readouts, daily loss computations, and one-click work order creation.

### 3. 🔬 Multi-Source AI Inspection Studio
* **Hardware-Agnostic Ingestion:** Compatible with DJI Zenmuse H20T/M300, FLIR E-Series, vehicle roof mounts, and mobile devices.
* **5-Stage Pipeline Stepper:** `INGEST` ➔ `SEGMENT` ➔ `CLASSIFY` ➔ `XAI HEATMAP` ➔ `SYNC GRID`.
* **Dual Visualization:** Side-by-side Raw Thermal IR vs Grad-CAM saliency bounding boxes with corner-bracketed engineering rationales.

### 4. ⚡ AI-Guided SCADA Telemetry & Targeted Routing
* **Inverter String Anomaly Detection:** Pinpoints string-level VI curve mismatches (e.g. `INV-02 STR04` with $-28.5\%$ power drop).
* **98.6% Flight Time Reduction:** Directs targeted inspections strictly to anomalous strings (16 modules vs entire 1,200 module field).

### 5. 🛠️ Closed-Loop O&M Work Orders & AI Verification
* **Kanban & Table Views:** Dual lifecycle management (`Detected`, `Assigned`, `In Repair`, `Resolved`, `Verified`).
* **AI Repair Verification Protocol Modal:** Validates post-maintenance multispectral scans, verifies $\Delta T < 0.4^\circ\text{C}$ normalization, and restores module health score to $100/100$.

### 6. 📑 Executive Audit Reports & Printable Certificates
* **A4 Audit Document Container:** Certified compliance report adhering to IEC 62446-3 standards.
* **One-Click Export:** Native browser high-definition PDF print formatting and raw CSV telemetry export.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Tailwind CSS v4, Lucide Icons, JetBrains Mono, Inter |
| **Bundler & Dev** | Vite 8.2, Rolldown engine, Hot Module Replacement (HMR) |
| **Backend API** | FastAPI, Uvicorn, Pydantic v2, Python 3.11+ |
| **Data Engine** | NumPy, Pillow, Radiometric Exif / Thermal parsers |
| **Standards** | IEC 62446-3 (Outdoor Infrared Thermography of PV Modules) |

---

## 🚀 Quickstart Guide

### Prerequisites
* **Node.js** (v18.0.0 or higher) & **npm**
* **Python** (v3.10 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/lumira-solar-ai.git
cd lumira-solar-ai
```

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
# source .venv/bin/activate

pip install -r requirements.txt
python run.py
```
* Backend API will be live at `http://localhost:8000`
* Swagger Interactive Docs: `http://localhost:8000/docs`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
* Frontend Application will be live at `http://localhost:5173`

---

## 💰 Commercial & Revenue Model

Lumira operates on a tiered **Capacity-Based Annual SaaS** licensing model with proven unit economics across global and Indian renewable energy markets:

| Tier | Capacity Range | Global Pricing (USD) | India Pricing (INR ₹) |
| :--- | :--- | :--- | :--- |
| **Commercial & Industrial (C&I)** | Up to 10 MW | $250 / MW / year | ₹15,000 / MW / year |
| **Utility Scale Standard** | 10 MW – 100 MW | $180 / MW / year | ₹10,000 / MW / year |
| **Mega Solar Parks (GW-Scale)** | 100 MW+ | $110 / MW / year | ₹6,000 / MW / year |

> **ROI Benchmark (100 MW Solar Park):** Recovers **$124,000 / ₹1.06 Crores** annually in avoided clipping loss and targeted flight savings, delivering a **10.8x Return on Investment**.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Built with ✦ by the Lumira Engineering Team.
</div>
