"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { PortFacility } from "./portsData";

interface PortCongestionMapProps {
  ports: PortFacility[];
  selectedPort: PortFacility | null;
  onSelectPort: (port: PortFacility) => void;
}

export default function PortCongestionMap({
  ports,
  selectedPort,
  onSelectPort,
}: PortCongestionMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-[#050D1A] flex items-center justify-center text-cyan-400 text-xs font-mono">
        Initializing Full-Screen Global AIS Maritime Telemetry Stage...
      </div>
    );
  }

  const getMarkerColor = (status: PortFacility["status"]) => {
    if (status === "Severe Congestion") return "#F43F5E"; // Coral / Rose Alert
    if (status === "Moderate Delay") return "#F59E0B"; // Amber Delay
    return "#06B6D4"; // Electric Cyan Normal Flow
  };

  return (
    <MapContainer
      center={[18, 15]}
      zoom={2}
      minZoom={2}
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", background: "#050D1A" }}
      className="z-0"
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
      />
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
        attribution=""
      />

      {ports.map((port) => {
        const isSelected = selectedPort?.id === port.id;
        const color = getMarkerColor(port.status);
        const radius = Math.max(6, Math.min(11, port.activeVessels / 28));

        return (
          <CircleMarker
            key={port.id}
            center={[port.lat, port.lng]}
            radius={isSelected ? radius + 3.5 : radius}
            pathOptions={{
              color: isSelected ? "#FFFFFF" : color,
              fillColor: color,
              fillOpacity: isSelected ? 0.98 : 0.85,
              weight: isSelected ? 2.5 : 1.75,
            }}
            eventHandlers={{
              click: () => onSelectPort(port),
            }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
              <div className="text-xs font-sans">
                <div className="font-bold text-slate-900">
                  {port.name} ({port.id})
                </div>
                <div className="text-slate-700">
                  {port.activeVessels} active vessels • {port.anchoredQueue} queued ({port.status})
                </div>
                <div className="text-[10px] text-cyan-700 font-semibold mt-0.5">
                  Click port node for telemetry drawer →
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}