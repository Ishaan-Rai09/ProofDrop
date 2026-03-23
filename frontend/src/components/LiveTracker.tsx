"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface LiveTrackerProps {
  status: string;
  isConfirmed: boolean;
  className?: string;
}

// Generate some sleek marker icons to fit the Dark/Gold theme
const createDotIcon = (color: string, size = 16) => {
  return L.divIcon({
    className: "custom-dot-icon",
    html: `<div style="
      background-color: ${color};
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      border: 3px solid #111;
      box-shadow: 0 0 15px ${color};
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const SENDER_ICON = createDotIcon("#C7A36F", 20); // Gold
const RECEIVER_ICON = createDotIcon("#22c55e", 20); // Green
const AGENT_ICON = createDotIcon("#3b82f6", 24); // Blue for agent

// Hardcoded coordinates for the map demo (SF -> Oakland)
const SENDER_POS: [number, number] = [37.7749, -122.4194];
const RECEIVER_POS: [number, number] = [37.8044, -122.2712];
const ROUTE: [number, number][] = [SENDER_POS, RECEIVER_POS];

export default function LiveTracker({ status = "", isConfirmed, className = "h-96" }: LiveTrackerProps) {
  const [agentPos, setAgentPos] = useState<[number, number]>(SENDER_POS);
  const [statusText, coordsStr] = (status || "").split("|");
  const shouldSimulate = statusText === "In Transit" && !isConfirmed && !coordsStr;

  let targetPos: [number, number] | null = null;
  if (coordsStr) {
    const [latStr, lngStr] = coordsStr.split(",");
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);
    if (!isNaN(lat) && !isNaN(lng)) {
      targetPos = [lat, lng];
    }
  }

  const resolvedAgentPos = targetPos
    ?? (isConfirmed || statusText === "Delivered" ? RECEIVER_POS : SENDER_POS);

  const initialCenter = targetPos ?? [37.789, -122.345];

  useEffect(() => {
    if (!shouldSimulate) {
      return;
    }

    let progress = 0.1;
    const speed = 0.005;
    const interval = setInterval(() => {
        progress += speed;
        if (progress > 0.95) progress = 0.1;
        const lat = SENDER_POS[0] + (RECEIVER_POS[0] - SENDER_POS[0]) * progress;
        const lng = SENDER_POS[1] + (RECEIVER_POS[1] - SENDER_POS[1]) * progress;

        setAgentPos([lat, lng]);
      }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [shouldSimulate]);

  const displayedAgentPos = shouldSimulate ? agentPos : resolvedAgentPos;

  return (
    <div className={`w-full rounded-xl overflow-hidden border border-gray-800 shadow-2xl relative z-0 ${className}`}>
      <MapContainer
        key={initialCenter.join(",")} // Force map to re-center when coordinates change
        center={initialCenter} // Dynamic center instead of hardcoded middle of the bay
        zoom={targetPos ? 15 : 12}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
      >
        {/* Sleek Dark Mode Tiles from CartoDB */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <Polyline positions={ROUTE} color="#333" weight={3} dashArray="5, 10" />

        <Marker position={SENDER_POS} icon={SENDER_ICON}>
          <Popup className="font-mono text-black">
            <b>Sender Location</b><br/>Parcel Origination Point
          </Popup>
        </Marker>

        <Marker position={RECEIVER_POS} icon={RECEIVER_ICON}>
          <Popup className="font-mono text-black">
            <b>Receiver Location</b><br/>Final Delivery Destination
          </Popup>
        </Marker>

        {(statusText !== "Pending" && statusText !== "Created") && (
          <Marker position={displayedAgentPos} icon={AGENT_ICON}>
            <Popup className="font-mono text-black">
              <b>Delivery Agent</b><br/>Current GPS Location<br/>
              {coordsStr ? `(Verified On-Chain)` : `(Simulated Transit)`}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
