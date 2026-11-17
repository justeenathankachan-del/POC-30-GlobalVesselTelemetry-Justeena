"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Ship, Anchor, Clock, AlertTriangle, Download, Navigation, Activity } from "lucide-react";
import { PORTS_DATA, VESSEL_MIX_SHARE, MARITIME_EVENTS, VesselClass, MaritimeCorridor, PortFacility } from "./portsData";

const PortCongestionMap = dynamic(() => import("./PortCongestionMap"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-[#050D1A] text-cyan-400 text-xs font-mono">
      Initializing Cinematic Maritime Stage...
    </div>
  ),
});

export default function GlobalVesselTelemetryDashboard() {
  const [selectedCorridor, setSelectedCorridor] = useState<string>("All");
  const [selectedVesselClass, setSelectedVesselClass] = useState<string>("All");
  const [selectedPort, setSelectedPort] = useState<PortFacility | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const filteredPorts = useMemo(() => {
    return PORTS_DATA.filter((port) => {
      const corridorMatch = selectedCorridor === "All" || port.corridor === (selectedCorridor as MaritimeCorridor);
      const classMatch = selectedVesselClass === "All" || port.dominantVesselClass === (selectedVesselClass as VesselClass);
      return corridorMatch && classMatch;
    });
  }, [selectedCorridor, selectedVesselClass]);

  const metrics = useMemo(() => {
    if (filteredPorts.length === 0) {
      return { totalVessels: 0, totalQueued: 0, avgDwell: "0.0", avgCongestion: 0 };
    }
    const totalVessels = filteredPorts.reduce((acc, p) => acc + p.activeVessels, 0);
    const totalQueued = filteredPorts.reduce((acc, p) => acc + p.anchoredQueue, 0);
    const avgDwell = (filteredPorts.reduce((acc, p) => acc + p.avgDwellHours, 0) / filteredPorts.length).toFixed(1);
    const avgCongestion = Math.round(filteredPorts.reduce((acc, p) => acc + p.congestionIndex, 0) / filteredPorts.length);
    return { totalVessels, totalQueued, avgDwell, avgCongestion };
  }, [filteredPorts]);

  const handleSelectPort = (port: PortFacility) => {
    setSelectedPort(port);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedPort(null);
  };

  const handleDownloadCsv = () => {
    const headers = ["Port_ID", "Port_Name", "Country", "Corridor", "Active_Vessels", "Anchored_Queue", "Avg_Dwell_Hours", "Congestion_Index", "Status", "Dominant_Vessel_Class", "Annual_TEU_Millions"];
    const rows = filteredPorts.map((p) => [p.id, `"${p.name}"`, p.country, p.corridor, p.activeVessels, p.anchoredQueue, p.avgDwellHours, p.congestionIndex, `"${p.status}"`, p.dominantVesselClass, p.annualTeuMillions]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "POC30_Global_Vessel_Telemetry.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050D1A] text-slate-100 font-sans select-none">
      <div className="absolute inset-0 z-0">
        <PortCongestionMap ports={filteredPorts} selectedPort={selectedPort} onSelectPort={handleSelectPort} />
      </div>

      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3.5 bg-gradient-to-b from-[#050D1A]/95 via-[#050D1A]/75 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#06B6D4]" />
          <div>
            <h1 className="text-sm sm:text-base font-bold tracking-wide text-white">
              Infocreon Internship - Global Vessel Telemetry & Port Congestion Monitor
            </h1>
            <p className="text-[11px] text-cyan-300/80 font-mono hidden sm:flex items-center gap-2">
              <Navigation className="w-3 h-3 text-cyan-400" />
              <span>POC-30 • AIS Satellite Feed Live • Maritime Chokepoint Intelligence</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 pointer-events-auto">
          {!isPanelOpen && (
            <button onClick={() => setIsPanelOpen(true)} className="px-3 py-1.5 rounded-full bg-[#0A1628]/90 border border-[#162A45] hover:border-cyan-400/60 text-cyan-300 text-xs font-mono tracking-wide backdrop-blur-md transition-all cursor-pointer shadow-lg">
              Port Intelligence ▸
            </button>
          )}
          <button onClick={() => setIsInfoOpen(true)} aria-label="Developer Signature & Platform Metadata" className="w-8 h-8 rounded-full bg-[#0A1628]/90 border border-[#162A45] hover:border-cyan-400 hover:text-cyan-300 text-slate-200 flex items-center justify-center text-xs font-serif italic font-bold backdrop-blur-md transition-all cursor-pointer shadow-lg">
            i
          </button>
        </div>
      </header>

      <div className="absolute top-16 left-5 z-10 flex flex-wrap items-center gap-2.5 max-w-[92vw] pointer-events-auto">
        <div className="flex items-center gap-2 bg-[#0A1628]/90 border border-[#162A45] rounded-lg px-3 py-1.5 backdrop-blur-md shadow-lg">
          <span className="text-[10px] font-mono uppercase text-cyan-400">Corridor</span>
          <select value={selectedCorridor} onChange={(e) => setSelectedCorridor(e.target.value)} className="bg-transparent text-xs text-white focus:outline-none cursor-pointer">
            <option value="All" className="bg-[#0A1628]">All Corridors</option>
            <option value="Asia-Pacific" className="bg-[#0A1628]">Asia-Pacific</option>
            <option value="Europe-Med" className="bg-[#0A1628]">Europe-Med</option>
            <option value="North America" className="bg-[#0A1628]">North America</option>
            <option value="Middle East" className="bg-[#0A1628]">Middle East</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-[#0A1628]/90 border border-[#162A45] rounded-lg px-3 py-1.5 backdrop-blur-md shadow-lg">
          <span className="text-[10px] font-mono uppercase text-cyan-400">Vessel Class</span>
          <select value={selectedVesselClass} onChange={(e) => setSelectedVesselClass(e.target.value)} className="bg-transparent text-xs text-white focus:outline-none cursor-pointer">
            <option value="All" className="bg-[#0A1628]">All Classes</option>
            <option value="Container" className="bg-[#0A1628]">Container</option>
            <option value="Bulk Carrier" className="bg-[#0A1628]">Bulk Carrier</option>
            <option value="Tanker" className="bg-[#0A1628]">Tanker</option>
            <option value="Ro-Ro" className="bg-[#0A1628]">Ro-Ro</option>
          </select>
        </div>

        <div className="hidden lg:flex items-center gap-3 bg-[#0A1628]/90 border border-[#162A45] rounded-lg px-3 py-1.5 backdrop-blur-md text-[11px] shadow-lg">
          <span className="text-slate-300 font-mono">Port Hubs: <strong className="text-cyan-400">{filteredPorts.length}</strong></span>
          <span className="text-[#162A45]">|</span>
          <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full bg-[#06B6D4]" /> Normal Flow</span>
          <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Moderate Delay</span>
          <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full bg-[#F43F5E]" /> Severe Congestion</span>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl pointer-events-auto">
        <div className="bg-[#0A1628]/90 border border-[#162A45] px-3.5 py-2.5 rounded-xl backdrop-blur-md shadow-xl">
          <span className="text-[9px] uppercase font-mono text-cyan-400/90 flex items-center gap-1"><Ship className="w-3 h-3" /> Active Vessels</span>
          <div className="text-sm sm:text-base font-bold font-mono text-white mt-0.5">{metrics.totalVessels.toLocaleString()}</div>
        </div>
        <div className="bg-[#0A1628]/90 border border-[#162A45] px-3.5 py-2.5 rounded-xl backdrop-blur-md shadow-xl">
          <span className="text-[9px] uppercase font-mono text-rose-400 flex items-center gap-1"><Anchor className="w-3 h-3" /> Anchored Queue</span>
          <div className="text-sm sm:text-base font-bold font-mono text-rose-400 mt-0.5">{metrics.totalQueued} ships</div>
        </div>
        <div className="bg-[#0A1628]/90 border border-[#162A45] px-3.5 py-2.5 rounded-xl backdrop-blur-md shadow-xl">
          <span className="text-[9px] uppercase font-mono text-amber-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Avg Berth Dwell</span>
          <div className="text-sm sm:text-base font-bold font-mono text-slate-100 mt-0.5">{metrics.avgDwell} <span className="text-[10px] font-normal text-slate-400">hrs</span></div>
        </div>
        <div className="bg-[#0A1628]/90 border border-[#162A45] px-3.5 py-2.5 rounded-xl backdrop-blur-md shadow-xl">
          <span className="text-[9px] uppercase font-mono text-cyan-400/90 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-400" /> Congestion Index</span>
          <div className="text-sm sm:text-base font-bold font-mono text-amber-400 mt-0.5">{metrics.avgCongestion} / 100</div>
        </div>
      </div>

      <aside className={`fixed top-0 right-0 z-30 h-full w-full sm:w-[410px] bg-[#0A1628]/95 border-l border-[#162A45] backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-out flex flex-col justify-between overflow-y-auto p-6 ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-3 border-b border-[#162A45] pb-4">
            <div>
              <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded">
                {selectedPort ? `${selectedPort.id} • ${selectedPort.corridor}` : "Global Maritime Intelligence"}
              </span>
              <h2 className="text-lg font-bold text-white mt-1.5">{selectedPort ? selectedPort.name : "Chokepoint & Fleet Telemetry"}</h2>
              {selectedPort && <p className="text-xs text-slate-400">{selectedPort.country}</p>}
            </div>
            <button onClick={handleClosePanel} aria-label="Close Intelligence Panel" className="w-8 h-8 rounded-lg bg-[#050D1A] border border-[#162A45] hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-colors cursor-pointer shrink-0">✕</button>
          </div>

          {selectedPort ? (
            <div className="bg-[#050D1A] border border-[#162A45] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Port Status</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${selectedPort.status === "Severe Congestion" ? "bg-rose-500/15 text-rose-400 border border-rose-500/30" : selectedPort.status === "Moderate Delay" ? "bg-amber-500/15 text-amber-400 border border-amber-500/30" : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"}`}>
                  {selectedPort.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="bg-[#0A1628] p-2.5 rounded-lg border border-[#162A45]"><span className="text-[10px] text-slate-400 block">Active Vessels</span><span className="text-sm font-bold font-mono text-cyan-300">{selectedPort.activeVessels}</span></div>
                <div className="bg-[#0A1628] p-2.5 rounded-lg border border-[#162A45]"><span className="text-[10px] text-slate-400 block">Anchored Queue</span><span className="text-sm font-bold font-mono text-rose-400">{selectedPort.anchoredQueue} ships</span></div>
                <div className="bg-[#0A1628] p-2.5 rounded-lg border border-[#162A45]"><span className="text-[10px] text-slate-400 block">Avg Berth Dwell</span><span className="text-sm font-bold font-mono text-white">{selectedPort.avgDwellHours} hrs</span></div>
                <div className="bg-[#0A1628] p-2.5 rounded-lg border border-[#162A45]"><span className="text-[10px] text-slate-400 block">Congestion Index</span><span className="text-sm font-bold font-mono text-amber-400">{selectedPort.congestionIndex} / 100</span></div>
                <div className="bg-[#0A1628] p-2.5 rounded-lg border border-[#162A45]"><span className="text-[10px] text-slate-400 block">Dominant Class</span><span className="text-xs font-semibold text-slate-200">{selectedPort.dominantVesselClass}</span></div>
                <div className="bg-[#0A1628] p-2.5 rounded-lg border border-[#162A45]"><span className="text-[10px] text-slate-400 block">Annual Volume</span><span className="text-xs font-mono font-semibold text-slate-200">{selectedPort.annualTeuMillions}M TEU</span></div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-300 bg-[#050D1A] border border-[#162A45] rounded-lg p-3 leading-relaxed">
              Click any port hub marker on the full-screen map to inspect live anchored vessel queues, berth dwell hours, congestion severity, and annual TEU throughput.
            </p>
          )}

          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">Global Fleet Class Share (%)</h3>
            <div className="bg-[#050D1A] border border-[#162A45] rounded-xl p-3.5 space-y-2.5">
              {VESSEL_MIX_SHARE.map((item) => (
                <div key={item.label} className="text-xs">
                  <div className="flex justify-between mb-1"><span className="text-slate-300">{item.label}</span><span className="font-mono text-slate-400">{item.share}%</span></div>
                  <div className="w-full bg-[#162A45] h-1.5 rounded-full overflow-hidden"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.share}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Live Port Advisories</h3>
            <div className="space-y-2">
              {MARITIME_EVENTS.map((evt) => (
                <div key={evt.id} className="bg-[#050D1A] border border-[#162A45] rounded-lg p-3 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono"><span className="text-cyan-400 font-semibold">{evt.port}</span><span className="text-slate-500">{evt.time}</span></div>
                  <div className="text-xs font-semibold text-slate-200">{evt.type}</div>
                  <p className="text-[11px] text-slate-400 leading-snug">{evt.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-5 mt-5 border-t border-[#162A45]">
          <button onClick={handleDownloadCsv} className="w-full py-2.5 px-4 rounded-lg bg-cyan-500/15 border border-cyan-500/40 hover:bg-cyan-500/25 text-cyan-300 text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export Port Telemetry (CSV)
          </button>
        </div>
      </aside>

      {isInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setIsInfoOpen(false)}>
          <div className="w-full max-w-md bg-[#0A1628] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#162A45] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Infocreon Internship • Platform Metadata</span>
                <h3 className="text-base font-bold text-white mt-0.5">Global Vessel Telemetry & Port Congestion Monitor</h3>
              </div>
              <button onClick={() => setIsInfoOpen(false)} className="w-7 h-7 rounded-lg bg-[#050D1A] border border-[#162A45] hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center text-xs cursor-pointer">✕</button>
            </div>
            <div className="space-y-2.5 text-xs bg-[#050D1A] border border-[#162A45] rounded-xl p-4 font-mono">
              <div className="flex justify-between"><span className="text-slate-400">Developed by:</span><span className="text-white font-semibold">Justeena Thankachan</span></div>
              <div className="flex justify-between"><span className="text-slate-400">PoC ID:</span><span className="text-cyan-400 font-semibold">POC-30</span></div>
              <div className="flex justify-between"><span className="text-slate-400">GitHub:</span><span className="text-cyan-300">@justeenathankachan-del</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Program:</span><span className="text-slate-200">Infocreon Internship</span></div>
              <div className="pt-2 border-t border-[#162A45]"><span className="text-slate-400 block mb-1">Architecture Stack:</span><span className="text-slate-200">Next.js, React-Leaflet, Esri Maritime Dark Tiles, Tailwind CSS</span></div>
            </div>
            <button onClick={() => setIsInfoOpen(false)} className="w-full py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors cursor-pointer">Close Metadata</button>
          </div>
        </div>
      )}
    </div>
  );
}