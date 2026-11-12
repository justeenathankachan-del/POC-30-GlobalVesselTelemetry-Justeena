'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PortFacility } from './portsData';

interface PortCongestionMapProps {
  ports: PortFacility[];
}

export default function PortCongestionMap({ ports }: PortCongestionMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[430px] bg-[#0B1117] border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 text-sm font-mono">
        Initializing Global AIS Maritime Telemetry Layer...
      </div>
    );
  }

  const getMarkerColor = (status: PortFacility['status']) => {
    if (status === 'Severe Congestion') return '#F43F5E'; // Rose/Red
    if (status === 'Moderate Delay') return '#F59E0B'; // Amber
    return '#38BDF8'; // Electric Cyan
  };

  return (
    <div className="w-full h-[430px] rounded-xl overflow-hidden border border-slate-800 relative z-0">
      <MapContainer
        center={[18, 25]}
        zoom={2}
        minZoom={2}
        scrollWheelZoom={true}
        className="w-full h-full bg-[#030712]"
      >
        {/* Native Dark Basemap with English-Only Labels (No API Key Required) */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
          attribution=''
        />

        {ports.map((port) => {
          const color = getMarkerColor(port.status);
          const radius = Math.max(9, Math.min(20, port.activeVessels / 16));

          return (
            <CircleMarker
              key={port.id}
              center={[port.lat, port.lng]}
              radius={radius}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.75,
                weight: 2.5,
              }}
            >
              <Popup>
                <div className="min-w-[220px] text-slate-900 font-sans p-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {port.id} • {port.corridor}
                  </div>
                  <div className="text-sm font-bold text-slate-950 mt-0.5">
                    {port.name}
                  </div>
                  <div className="text-xs text-slate-600 mb-2">{port.country}</div>

                  <div className="grid grid-cols-2 gap-1.5 text-xs border-t border-slate-200 pt-2">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Active Vessels</span>
                      <span className="font-mono font-bold">{port.activeVessels}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Anchored Queue</span>
                      <span className="font-mono font-bold text-rose-600">
                        {port.anchoredQueue} ships
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Avg Dwell Time</span>
                      <span className="font-mono font-bold">{port.avgDwellHours} hrs</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Congestion Index</span>
                      <span className="font-mono font-bold">{port.congestionIndex}/100</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Primary Class:</span>
                    <span className="font-semibold">{port.dominantVesselClass}</span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}