# LUMIRA SOLAR AI ✦
## Comprehensive Feature Architecture, System Specification & Revenue Models (Global & Indian Market Edition)

```
                                  L U M I R A  ✦  S O L A R  A I
                  ┌─────────────────────────────────────────────────────────┐
                  │   EXHAUSTIVE PRODUCT SPECIFICATION, TECHNICAL DEEP DIVE, │
                  │   BUSINESS MODEL, PRICING TIERS, & REVENUE ARCHITECTURE │
                  │   (GLOBAL USD $ & INDIAN RUPEES ₹ COMMERCIAL EDITIONS)  │
                  └─────────────────────────────────────────────────────────┘
```

---

## 1. Executive Fleet Overview & Command Cockpit (7:5 Split Architecture)

The **Fleet Overview & Command Cockpit** is an executive-level operational bridge engineered for immediate situational awareness across multi-gigawatt solar portfolios. It employs a **7:5 asymmetric layout split** that balances fleet-wide statistical distributions against actionable SCADA directives and real-time defect queues.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  TOP KPI STRIP (4 Modular Metric Blocks · 44px Monospace Numerals · Real-time Polling)   │
├──────────────────────────┬──────────────────────────┬────────────────────────────────────┤
│ 1. Plant Health: 97/100  │ 2. Active Modules: 1,200 │ 3. Est. Daily Loss: 4.24 kWh/d     │
│    (Nominal Baseline)    │    (50.0 MW Peak DC)     │    (≈ $0.35/day · $1,548/yr Risk)  │
└──────────────────────────┴──────────────────────────┴────────────────────────────────────┘
┌──────────────────────────────────────────────────┬───────────────────────────────────────┐
│ LEFT COLUMN (SPAN 7: HEALTH & DEFECT TAXONOMY)   │ RIGHT COLUMN (SPAN 5: DIRECTIVES)     │
├──────────────────────────────────────────────────┼───────────────────────────────────────┤
│ • Segmented Plant Health Bar (92% / 6% / 2%)     │ • AI-Guided SCADA Directive Box       │
│ • Defect Taxonomy Table (IEC 62446-3 Compliant)  │   (Power drop isolation & dispatch)   │
│   - Thermal Hotspots (12 Units, -1.4% Yield)     │ • High-Priority Action Queue          │
│   - Microcracks (34 Units, -0.8% Yield)          │   (#R12-C37 & #R04-C18 with 2.5D      │
│   - Soiling (128 Units, -2.1% Yield)             │    hover shadow offsets)              │
│   - Shading (45 Units, -1.2% Yield)              │                                       │
│   - Snail Trails (87 Units, -0.1% Yield)         │                                       │
└──────────────────────────────────────────────────┴───────────────────────────────────────┘
```

### 1.1 Top KPI Strip Specifications
* **Plant Health Score ($S_{\text{plant}}$):** Calculated dynamically using a weighted defect penalty algorithm:
  $$S_{\text{plant}} = 100 - \sum_{i=1}^{N} \left( \frac{\omega_{\text{severity}} \times \text{DefectCount}_i}{N_{\text{total\_modules}}} \times 100 \right)$$
  Where $\omega_{\text{Critical}} = 1.0$, $\omega_{\text{High}} = 0.5$, $\omega_{\text{Medium}} = 0.2$, $\omega_{\text{Low}} = 0.05$.
* **Active PV Modules:** Real-time count ($1,200$ modules mapped across $6$ inverters representing $50.0\text{ MW}$ rated DC capacity).
* **Estimated Daily Loss:** Aggregated daily energy dissipation in $\text{kWh/d}$ with real-time financial translation based on the power purchase agreement (PPA) tariff rate ($\$0.082/\text{kWh}$ / $₹2.80/\text{kWh}$).
* **Active O&M Tickets:** Instant tally of open field tickets with active critical flags ($2\text{ Critical}$ bypass diode failures scheduled).

### 1.2 Health Distribution & Defect Taxonomy Engine
* **Segmented Bar Visualization:** Multi-colored solid bar showing $92\%$ Nominal ($1,104$ modules in `#027a48`), $6\%$ Warning ($72$ modules in `#b54708`), and $2\%$ Critical ($24$ modules in `#d92d20`).
* **IEC 62446-3 Defect Taxonomy Breakdown:**
  1. **Thermal Hotspots (Critical):** Single/multi-cell localized overheating caused by reverse-bias dissipation ($\Delta T > 10.0^\circ\text{C}$). Yield impact: $-1.4\%$.
  2. **Microcracks (High):** Mechanical sub-wafer fractures originating from thermal cycling or hail impact. Yield impact: $-0.8\%$.
  3. **Soiling (Medium):** Non-uniform particulate, dust, or organic accumulation. Yield impact: $-2.1\%$.
  4. **Shading (Medium):** Static or dynamic localized obstructions. Yield impact: $-1.2\%$.
  5. **Snail Trails (Low):** Chemical discoloration along microcrack lines from moisture ingress and silver nanoparticle deposition. Yield impact: $-0.1\%$.

---

## 2. 2D Digital Twin Solar Grid (Spatial Topology Engine)

The **2D Digital Twin Solar Grid** provides an interactive spatial representation of the physical solar field. It bridges physical hardware topology with electrical circuit hierarchies.

```
       COLUMNS (1 TO 60) ─────────────────────────────────────────────────────────────►
       ┌───────────┬───────────┬───────────┬───────────┬───────────┬───────────┐
       │  INV-01   │  INV-02   │  INV-03   │  INV-04   │  INV-05   │  INV-06   │
  R 01 │ [][][][][]│ [][][][][]│ [][][][][]│ [][][][][]│ [][][][][]│ [][][][][]│
  O 02 │ [][][][][]│ [][][][][]│ [][][][][]│ [][][][][]│ [][][][][]│ [][][][][]│
  W .. │ [][][][][]│ [][][][][]│ [][][][][]│ [][][!][][]│ [][][][][]│ [][][][][]│ ◄── #R12-C37 (Critical Hotspot)
  S 20 │ [][][][][]│ [][][][][]│ [][][][][]│ [][][][][]│ [][][][][]│ [][][][][]│
       └───────────┴───────────┴───────────┴───────────┴───────────┴───────────┘
```

### 2.1 Spatial Coordinate Mapping Architecture
* **Coordinate Scheme:** Every physical PV module possesses a unique topological coordinate:
  $$\text{Module ID} = \text{Row}_{XX} - \text{Col}_{YY} \quad (XX \in [01..20], \, YY \in [01..60])$$
* **Electrical Hierarchy Mapping:**
  $$\text{Module ID} \longleftrightarrow \text{Inverter ID} \, (\text{INV-01 to 06}) \longleftrightarrow \text{Combiner Box} \longleftrightarrow \text{String ID} \, (\text{STR-01 to 12})$$
* **Interactive Canvas Matrix:** 1,200 individual cell rectangles rendered at $20\text{px} \times 20\text{px}$ aspect ratios with instant hover magnification, state-based color styling (`#ecfdf3` Healthy, `#fffaeb` Warning, `#fef3f2` Critical with pulsing animations), and active selection rings.

### 2.2 Segmented Severity Filter Bar
Enclosed in a blueprint container (`border border-border-strong p-1 bg-surface-container-low`), the filter allows multi-state filtering:
* `[All States]` — Full plant visibility ($1,200$ modules).
* `[🔴 Critical (<50)]` — Filters only modules with health scores below $50$ ($\Delta T > 10.0^\circ\text{C}$).
* `[🟡 Warning (50-84)]` — Filters modules requiring scheduled maintenance.
* `[🟢 Healthy (>85)]` — Filters certified nominal panels.

### 2.3 Slide-Over Module Inspector Drawer (`w-[400px]`)
* **Header Bar:** Panel ID `#R12-C37`, Health Score Badge (`! HEALTH: 42/100 CRITICAL`), and GPS Geolocation (`Lat 27.5410, Long 71.9205`).
* **Multi-Modal Visualizer:**
  * `[AI HEATMAP]` — Grad-CAM activation layer highlighting defective cells.
  * `[THERMAL IR]` — Radiometric thermal infrared capture showing temperature delta gradients.
  * `[RGB VISUAL]` — Ultra-high-resolution visible spectrum photographic image.
* **Double-Border Blueprint Diagnostic Card (`absolute inset-2 border border-border-strong`):**
  * Failure mechanism explanation (e.g. *"Localized temperature delta of +18.4°C detected across cells C3-C5. Signature consistent with severe bypass diode failure."*).
  * Quantified metrics: $\Delta T = +18.4^\circ\text{C}$, Estimated Power Loss = $-34.0\%$.
* **Energy Loss & Financial Risk Strip:** Daily energy loss ($1.42\text{ kWh/d}$) and daily revenue delta ($\$0.12/\text{d}$ / $₹10.20/\text{d}$).
* **Action Footer:** Full-width solid black `CREATE WORK ORDER →` button that creates maintenance tickets in the O&M subsystem.

---

## 3. Multi-Source AI Inspection Studio (Computer Vision Engine)

The **Multi-Source AI Inspection Studio** is a hardware-agnostic diagnostic pipeline that ingests inspection data from any drone, vehicle, handheld camera, or smartphone.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        5-STAGE DIAGNOSTIC PIPELINE STEPPER                             │
├─────────────┬─────────────┬─────────────┬──────────────────────────┬───────────────────┤
│ 1. INGEST   │ 2. SEGMENT  │ 3. CLASSIFY │ 4. XAI HEATMAP           │ 5. SYNC GRID      │
│ Ingest Data │ Sub-Module  │ Multi-Class │ Grad-CAM Activation Map  │ Synchronize       │
│ & Exif Geotag│ Boundaries │ CNN Model   │ & Anomaly Bounding Box   │ 2D Digital Twin   │
└─────────────┴─────────────┴─────────────┴──────────────────────────┴───────────────────┘
```

### 3.1 4-Channel Ingestion Modalities
1. **Drone Orthomosaics:** Fused Radiometric RJPEG + High-Resolution RGB ($GSD < 1.5\text{ cm/px}$).
2. **Handheld Thermal Cameras:** Industrial FLIR/Hikmicro radiometric streams ($640 \times 480$ resolution).
3. **Vehicle Camera Arrays:** Ground rover/truck mounted multi-angle drive-by array with perspective distortion correction.
4. **Smartphone RGB Visual:** Technician mobile photo capture with sub-centimeter GSD ($0.5\text{ cm/px}$) for rapid triage.

### 3.2 5-Stage Computer Vision Pipeline
* **Stage 1: INGEST:** Extracts radiometric temperature matrices from raw TIFF/RJPEG metadata, parses GPS coordinates, and normalizes ambient irradiance variations.
* **Stage 2: SEGMENT:** Utilizes semantic boundary detection to segment module frames and isolate internal wafer substrings (Cells C1–C60).
* **Stage 3: CLASSIFY:** A convolutional neural network evaluates thermal gradients and spatial geometries to classify defect types with $>95\%$ confidence.
* **Stage 4: XAI HEATMAP (Explainable AI):** Generates Grad-CAM activation maps overlaid on raw imagery with automated bounding boxes (`ANOMALY_01`) isolating defective cells.
* **Stage 5: SYNC GRID:** Propagates findings directly to the 2D Digital Twin matrix, updating module health scores and revenue risk counters.

---

## 4. AI-Guided SCADA Telemetry & Targeted Inspection

The **AI-Guided SCADA Telemetry** module eliminates random, blind drone flight paths by analyzing string-level electrical curves to pinpoint anomalous zones before dispatch.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ SCADA Inverter Telemetry Feed (INV-02 · STR04) ───────► VI Curve Anomaly Detected     │
│ [Voltage: 540.0 V | Current: 18.2 A | Irradiance: 860 W/m²]   (-28.5% Power Drop)      │
└───────────────────────────────────┬────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TARGETED DIRECTIVE: Target Area: Rows 4-6, Columns 25-40 (16 Modules Isolated)        │
│ • 98.6% INSPECTION TIME SAVED: Flight restricted to 16 modules instead of 1,200       │
│ • "DISPATCH TARGETED ROUTE" generates automated drone waypoint coordinates             │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.1 $V$-$I$ Telemetry Anomaly Detection
* **Monitored Electrical Parameters:** String Voltage ($V_{\text{string}}$), String Current ($I_{\text{string}}$), Global Horizontal Irradiance ($G$), and Ambient Temperature ($T_{\text{amb}}$).
* **Sub-String Mismatch Algorithm:** Continuously calculates expected string power $P_{\text{expected}}(G, T)$ vs measured power $P_{\text{measured}}$. When power drop $\Delta P > 15\%$, an anomalous string event is triggered.

### 4.2 Targeted Route Dispatch
* **Inspection Efficiency:** Rather than launching full-field aerial surveys over 1,200 panels ($4.5\text{ hours}$ flight time), Lumira isolates the exact physical sub-array (e.g., Rows 4–6, Columns 25–40, 16 modules).
* **Time Savings:** **$98.6\%$ reduction in inspection time** (completed in $< 4\text{ minutes}$).
* **Waypoint Flight Generation:** 1-click `DISPATCH TARGETED ROUTE →` outputs automated drone flight paths for DJI, Autel, and Skydio platforms.

---

## 5. Closed-Loop O&M Work Orders & Repair Verification

The **Closed-Loop O&M** module ensures that maintenance actions are verified using post-repair computer vision scans before work orders can be closed.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌────────────────────────┐
│  DETECTED    │ ──► │   ASSIGNED   │ ──► │  IN REPAIR   │ ──► │  RESOLVED / VERIFIED   │
│ (AI Anomaly) │     │ (Technician) │     │ (Replaced)   │     │ (AI Delta T < 0.4°C)   │
└──────────────┘     └──────────────┘     └──────────────┘     └────────────────────────┘
```

### 5.1 Dual-View Interface
* **Interactive Kanban Board:** 4 status columns (`DETECTED`, `ASSIGNED`, `IN REPAIR`, `RESOLVED`) with 2.5D solid shadow cards (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`).
* **Tabular Data Table View:** Filterable table displaying Ticket ID, Target Module, Defect Class, Priority Pills (`P1 CRITICAL`, `P2 HIGH`, `P3 NORMAL`), Status, and Action buttons.

### 5.2 Brutalist AI Repair Verification Protocol Modal
* **3-Column Summary Bento:** Displays Ticket ID (`WO-10492`), Target (`Panel #R12-C37`), and Defect (`Thermal Hotspot`).
* **Technician Notes Form:** Input field for repair documentation (e.g., *"Replaced bypass diode and cleaned junction box"*).
* **Post-Repair Scan Verification Engine:**
  * Runs post-repair radiometric scan analysis.
  * Checks thermal gradient criterion: $\Delta T < 0.4^\circ\text{C}$.
  * Restores module health score: $42/100 \longrightarrow 100/100$ (Certified Nominal).
  * Certifies the ticket and marks the work order `VERIFIED`.

---

## 6. Executive Asset Health & Loss Audit Reports

The **Audit Reports Hub** generates investor-grade audit certificates for financial institutions, insurers, and warranty claims.

### 6.1 A4 Printable Document Container (`210mm` $\times$ `297mm`)
* **Document Header:** `Lumira ✦ SOLAR ASSET INTELLIGENCE — AUDIT CERTIFICATE` with unique verification code `DOC_ID: LSAI-20260824-B04` and `STATUS: CERTIFIED`.
* **3-Column Metadata Bento:**
  * `SITE & LOCATION`: Bhadla Solar Park - Sector 4 · 50.0 MW
  * `AUDIT TIMESTAMP`: `2026-08-24 14:32:00 UTC`
  * `PLANT HEALTH SCORE`: `97/100` with 97% progress bar.
* **4 Summary Loss Metric Boxes:**
  * `TOTAL MODULES`: $1,200\text{ Units}$
  * `CRITICAL FAULTS`: $4\text{ Units}$ (with `!` indicator)
  * `DAILY ENERGY LOSS`: $4.24\text{ kWh/d}$
  * `ANNUAL REVENUE RISK`: $\$1,548/\text{yr}$ / $₹1,31,500/\text{yr}$
* **Critical Remediation Priority Table:** Tabular list of defect IDs, defect types, temperature gradients ($\Delta T$), daily energy loss, and prescriptive remediation instructions.
* **Export Engine:** Native 1-click `EXPORT CSV` and `PRINT AUDIT DOCUMENT` (with print stylesheets).

---

## 7. Mathematical Diagnostic Formulations

### 7.1 Temperature Gradient ($\Delta T$)
$$\Delta T = T_{\text{cell\_hotspot}} - T_{\text{module\_ambient\_baseline}}$$
* $\Delta T < 3.0^\circ\text{C}$: **Nominal Baseline**
* $3.0^\circ\text{C} \le \Delta T < 10.0^\circ\text{C}$: **Warning (P2/P3)**
* $\Delta T \ge 10.0^\circ\text{C}$: **Critical (P1 — Hotspot / Diode Failure)**

### 7.2 Module Power Loss
$$P_{\text{loss}} = P_{\text{rated}} \times \left(1 - \frac{V_{\text{actual}} \times I_{\text{actual}}}{V_{\text{mpp}} \times I_{\text{mpp}}}\right)$$

### 7.3 Daily & Annual Financial Loss
$$\text{Loss}_{\text{daily\_INR}} = E_{\text{daily\_loss\_kWh}} \times \text{PPA Tariff}_{(₹/\text{kWh})}$$
$$\text{Loss}_{\text{annual\_INR}} = \text{Loss}_{\text{daily\_INR}} \times 365$$

---

## 8. Business & Revenue Models — Indian Market Edition (₹ INR)

Lumira Solar AI is customized for the rapid growth of the Indian utility and commercial solar sectors (Adani Green, Tata Power Solar, NTPC Renewable, Azure Power, ReNew Power, CleanMax, Fourth Partner Energy).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                 LUMIRA INDIAN MARKET REVENUE STREAMS (₹ INR)                           │
├──────────────────────────┬──────────────────────────┬──────────────────────────────────┤
│ 1. CAPACITY-BASED SAAS   │ 2. INSPECTION-AS-A-SVC   │ 3. VALUE-SHARE GAIN CONTRACTS    │
│    ₹6,000 – ₹15,000 / MW │    ₹4.00 / module scan   │    15% - 20% of recovered yield  │
│    (Core Recurring ARR)  │    (Indian Drone DSPs)   │    (Utility IPP Mega Parks)      │
└──────────────────────────┴──────────────────────────┴──────────────────────────────────┘
```

### 8.1 Tiered Capacity-Based Subscriptions (INR ₹)

| Pricing Tier | Plant Capacity | Price per MW/Year | Annual Contract Value (ACV) | Target Indian Customer |
| :--- | :--- | :--- | :--- | :--- |
| **Starter (C&I / Rooftop)** | Up to $10\text{ MW}$ | **₹6,000 / MW / year** | Up to **₹60,000 / year** | Commercial factories, industrial rooftop arrays, hospital campuses, solar EPCs during 2-year warranty period. |
| **Professional (Utility)** | $10\text{ MW}$ to $100\text{ MW}$ | **₹10,000 / MW / year** | **₹1.0 Lakh to ₹10.0 Lakhs / yr** | Standard grid-scale IPP solar parks (e.g. 50 MW Bhadla, Pavagada, Neemuch blocks). |
| **Enterprise (Mega Fleet)** | $> 100\text{ MW}$ | **₹15,000 / MW / year** | **₹15.0 Lakhs to ₹75.0 Lakhs / yr** | Major IPPs (Adani, Tata, NTPC, ReNew, Avaada) managing gigawatt portfolios across multiple states. |

---

### 8.2 Usage-Based Compute: Inspection-as-a-Service (IaaS in ₹)
* **Target Audience:** Indian DGCA-certified drone operators, aerial surveying startups, and third-party inspection firms (e.g., Garuda Aerospace, IdeaForge partners, Skylark Drones).
* **Pricing Metric:**
  * **₹4.00 per module analyzed** (₹4,800 for a 1,200-module block).
  * Or **₹3,500 per gigabyte of radiometric orthomosaic data**.

---

### 8.3 High-Value Add-On Services (INR ₹)
1. **Closed-Loop AI Verification Protocol:**
   * **₹1,200 per verified work order** (includes post-repair multispectral thermal delta re-certification).
2. **OEM Module Warranty Recovery Package:**
   * **₹35,000 per certified batch report**.
   * Generates legally binding claim documentation recovering **₹15 Lakhs to ₹40 Lakhs** in replacement modules from Tier 1 manufacturers (Waaree, Goldi, Vikram Solar, Tata Power, Adani Solar).

---

## 9. Customer ROI & Unit Economics in INR (100 MW Indian Solar Park)

Under a standard **SECI / Discom PPA tariff of ₹2.80 per kWh**, a **100 MW Indian solar park** yields exceptional financial returns:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               100 MW INDIAN SOLAR PARK ANNUAL FINANCIAL IMPACT (INR ₹)                 │
├────────────────────────────────────────────────────────────┬───────────────────────────┤
│ 1. PPA Yield Revenue Recovered (Hotspot & Soiling Fixes)   │ + ₹45.0 Lakhs / year      │
│ 2. Aerial Survey OPEX Saved (98.6% Targeted Flight Time)   │ + ₹18.0 Lakhs / year      │
│ 3. OEM Module Warranty Claims Recovered (Tier-1 Panels)    │ + ₹35.0 Lakhs / year      │
│ 4. Insurance Deductible & Risk Rebates (Certified Audits)  │ + ₹8.0 Lakhs / year       │
├────────────────────────────────────────────────────────────┼───────────────────────────┤
│ TOTAL ANNUAL ECONOMIC VALUE CREATED                        │ + ₹1.06 Crores / year     │
│ LESS: Lumira Enterprise SaaS Fee (100 MW @ ₹15,000/MW/yr)  │ - ₹15.0 Lakhs / year      │
├────────────────────────────────────────────────────────────┼───────────────────────────┤
│ NET ANNUAL CASH PROFIT TO ASSET OWNER                      │ + ₹91.0 Lakhs / year      │
│ CUSTOMER RETURN ON INVESTMENT (ROI)                        │ 7.1x (Payback < 51 days)  │
└────────────────────────────────────────────────────────────┴───────────────────────────┘
```
