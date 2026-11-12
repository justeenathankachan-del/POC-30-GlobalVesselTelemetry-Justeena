'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Ship,
  Anchor,
  Clock,
  AlertTriangle,
  Download,
  Globe,
  ShieldCheck,
  Activity,
  Navigation,
} from 'lucide-react';
import {
  PORTS_DATA,
  VESSEL_MIX_SHARE,
  MARITIME_EVENTS,
  VesselClass,
  MaritimeCorridor,
} from './portsData';

const PortCongestionMap = dynamic(() => import('./PortCongestionMap'), {
  ssr: false,
});

export default function GlobalVesselTelemetryDashboard() {
  const [selectedCorridor, setSelectedCorridor] = useState<string>('All');
  const [selectedVesselClass, setSelectedVesselClass] = useState<string>('All');

  const filteredPorts = useMemo(() => {
    return PORTS_DATA.filter((port) => {
      const corridorMatch =
        selectedCorridor === 'All' || port.corridor === (selectedCorridor as MaritimeCorridor);
      const classMatch =
        selectedVesselClass === 'All' ||
        port.dominantVesselClass === (selectedVesselClass as VesselClass);
      return corridorMatch && classMatch;
    });
  }, [selectedCorridor, selectedVesselClass]);

  const metrics = useMemo(() => {
    if (filteredPorts.length === 0) {
      return { totalVessels: 0, totalQueued: 0, avgDwell: '0.0', avgCongestion: 0 };
    }
    const totalVessels = filteredPorts.reduce((acc, p) => acc + p.activeVessels, 0);
    const totalQueued = filteredPorts.reduce((acc, p) => acc + p.anchoredQueue, 0);
    const avgDwell = (
      filteredPorts.reduce((acc, p) => acc + p.avgDwellHours, 0) / filteredPorts.length
    ).toFixed(1);
    const avgCongestion = Math.round(
      filteredPorts.reduce((acc, p) => acc + p.congestionIndex, 0) / filteredPorts.length
    );

    return { totalVessels, totalQueued, avgDwell, avgCongestion };
  }, [filteredPorts]);

  const handleDownloadCsv = () => {
    const headers = [
      'Port_ID',
      'Port_Name',
      'Country',
      'Corridor',
      'Active_Vessels',
      'Anchored_Queue',
      'Avg_Dwell_Hours',
      'Congestion_Index',
      'Status',
      'Dominant_Vessel_Class',
      'Annual_TEU_Millions',
    ];

    const rows = filteredPorts.map((p) => [
      p.id,
      `"${p.name}"`,
      p.country,
      p.corridor,
      p.activeVessels,
      p.anchoredQueue,
      p.avgDwellHours,
      p.congestionIndex,
      `"${p.status}"`,
      p.dominantVesselClass,
      p.annualTeuMillions,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'poc30_global_vessel_telemetry.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-sky-500/30">
      {/* Top Intelligence Header */}
      <header className="border-b border-slate-800/80 bg-[#0B1117]/90 backdrop-blur sticky top-0 z-20 px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-sky-400">
              <Navigation className="w-3.5 h-3.5" />
              <span>REAL RAILS // MARITIME & SUPPLY CHAIN INTELLIGENCE (POC-30)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              Global Vessel Telemetry & Port Congestion Monitor
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AIS SATELLITE FEED LIVE
            </span>
            <span className="hidden md:inline-block text-slate-400">
              NODES: {filteredPorts.length} MAJOR HUBS
            </span>
          </div>
        </div>
      </header>

      {/* Main 70 / 30 Split Workspace */}
      <main className="max-w-[1600px] mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 70% DATA & VISUALIZATION COLUMN (8 cols on 12-col grid) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 4 KPI Telemetry Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0B1117] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>ACTIVE VESSELS</span>
                <Ship className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-mono font-bold text-white mt-2">
                {metrics.totalVessels.toLocaleString()}
              </div>
              <div className="text-[11px] text-sky-400 mt-1 font-mono">
                In-port & approach zones
              </div>
            </div>

            <div className="bg-[#0B1117] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>ANCHORED QUEUE</span>
                <Anchor className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-mono font-bold text-rose-400 mt-2">
                {metrics.totalQueued}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                Awaiting berth allocation
              </div>
            </div>

            <div className="bg-[#0B1117] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>AVG DWELL TIME</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-mono font-bold text-white mt-2">
                {metrics.avgDwell} <span className="text-sm font-normal text-slate-400">hrs</span>
              </div>
              <div className="text-[11px] text-amber-400 mt-1 font-mono">
                Turnaround benchmark
              </div>
            </div>

            <div className="bg-[#0B1117] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>CONGESTION INDEX</span>
                <AlertTriangle className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-mono font-bold text-white mt-2">
                {metrics.avgCongestion}
                <span className="text-sm font-normal text-slate-400">/100</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                Weighted bottleneck score
              </div>
            </div>
          </div>

          {/* Interactive Geospatial Map Container */}
          <div className="bg-[#0B1117] border border-slate-800 rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Global Maritime Chokepoints & Port Congestion Telemetry
                </h2>
                <p className="text-xs text-slate-400">
                  Circle radius scaled by active vessel volume • Click any port node for berth & dwell breakdown
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Severe
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Moderate
                </span>
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Normal
                </span>
              </div>
            </div>

            <PortCongestionMap ports={filteredPorts} />
          </div>

          {/* Bottom Split: Fleet Mix Share + Maritime Event Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vessel Class Mix Distribution */}
            <div className="bg-[#0B1117] border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-3">
                <Activity className="w-4 h-4" />
                <span>Global Fleet Telemetry Share</span>
              </div>
              <div className="space-y-4">
                {VESSEL_MIX_SHARE.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="font-mono font-bold text-white">{item.share}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.share}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Maritime Dispatch & Port Advisory Timeline */}
            <div className="bg-[#0B1117] border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-3">
                <Globe className="w-4 h-4" />
                <span>Maritime Dispatch & Port Advisories</span>
              </div>
              <div className="space-y-3">
                {MARITIME_EVENTS.map((evt) => (
                  <div
                    key={evt.id}
                    className="border-l-2 border-sky-500/60 pl-3 py-0.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{evt.port}</span>
                      <span className="font-mono text-[10px] text-slate-400">{evt.time}</span>
                    </div>
                    <div className="text-sky-400 font-medium text-[11px]">{evt.type}</div>
                    <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                      {evt.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 30% INTELLIGENCE & CONTROL SIDEBAR (4 cols on 12-col grid) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Interactive Filter Controls */}
          <div className="bg-[#0B1117] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-sky-400">
              Telemetry Filters & Levers
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5">
                Maritime Trade Corridor
              </label>
              <select
                value={selectedCorridor}
                onChange={(e) => setSelectedCorridor(e.target.value)}
                className="w-full bg-[#030712] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
              >
                <option value="All">All Global Corridors</option>
                <option value="Asia-Pacific">Asia-Pacific</option>
                <option value="Europe-Med">Europe & Mediterranean</option>
                <option value="North America">Americas & Trans-Pacific</option>
                <option value="Middle East">Middle East & Red Sea</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5">
                Dominant Vessel Class
              </label>
              <select
                value={selectedVesselClass}
                onChange={(e) => setSelectedVesselClass(e.target.value)}
                className="w-full bg-[#030712] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-400"
              >
                <option value="All">All Vessel Classes</option>
                <option value="Container">Container Ships</option>
                <option value="Bulk Carrier">Bulk Carriers</option>
                <option value="Tanker">Crude & LNG Tankers</option>
                <option value="Ro-Ro">Ro-Ro Vessels</option>
              </select>
            </div>

            <button
              onClick={handleDownloadCsv}
              className="w-full mt-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Sample Data (CSV)
            </button>
          </div>

          {/* Intelligence Narrative: Why This Matters */}
          <div className="bg-[#0B1117] border border-slate-800 rounded-xl p-5 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-sky-400">
              Why This Matters
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Over <span className="text-white font-semibold">80% of global merchandise trade</span> moves by sea. Even a 24-hour anchorage delay at major transshipment hubs like Shanghai, Singapore, or Rotterdam triggers cascading inventory shortages, freight rate spikes, and manufacturing bottlenecks downstream.
            </p>
          </div>

          {/* Governance Narrative: Who Controls The Rail */}
          <div className="bg-[#0B1117] border border-slate-800 rounded-xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Who Controls The Rail</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vessel movements are governed by the <span className="text-white font-semibold">International Maritime Organization (IMO)</span> AIS transponder mandates, regional <span className="text-white font-semibold">Port Authorities</span> (berth slot allocation & pilotage), and national <span className="text-white font-semibold">Customs & Border Agencies</span> clearing manifest cargo.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}