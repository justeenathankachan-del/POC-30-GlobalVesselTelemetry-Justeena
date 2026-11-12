# User Acceptance Testing (UAT) Checklist — POC-30

**PoC ID:** POC-30  
**PoC Title:** Global Vessel Telemetry & Port Congestion Monitor  
**Developer:** Justeena Thankachan  
**Status:** PASS  

## Test Matrix
- [x] **Application Build:** Compiles cleanly with zero TypeScript or Turbopack errors.
- [x] **Map Rendering:** All 12 global port hubs render with proportional vessel-volume radii.
- [x] **Interactive Popups:** Clicking any port node displays Active Vessels, Anchored Queue, Avg Dwell Time, Congestion Index, and Dominant Vessel Class.
- [x] **Corridor Filter:** Filtering by Maritime Trade Corridor dynamically updates KPI cards and map markers.
- [x] **Vessel Class Filter:** Filtering by Dominant Vessel Class recalculates active vessels and average dwell metrics accurately.
- [x] **CSV Export:** Clicking "Download Sample Data (CSV)" exports the filtered dataset cleanly.
- [x] **Responsive Layout:** Adapts cleanly across desktop and mobile viewports.
-