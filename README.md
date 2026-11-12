# POC-30: Global Vessel Telemetry & Port Congestion Monitor

Real Rails Batch 8 — Phase 1 Intelligence Asset

## Overview
An interactive maritime supply chain and port congestion intelligence dashboard built with Next.js, TypeScript, Tailwind CSS, and React-Leaflet. Tracks active vessel counts, anchorage queues, average dwell times, and congestion scores across major global transshipment hubs.

## Architecture Summary
- **Data Layer (`app/portsData.ts`):** Typed maritime hub telemetry, fleet class distributions, and port dispatch advisories.
- **Geospatial Engine (`app/PortCongestionMap.tsx`):** Client-isolated Leaflet map rendering proportional circle markers color-coded by congestion severity.
- **Intelligence Dashboard (`app/page.tsx`):** 70/30 layout pairing real-time KPI cards and interactive visualizations with corridor/vessel-class levers, regulatory context, and CSV export.

## Local Setup
```bash
npm install
npm run dev