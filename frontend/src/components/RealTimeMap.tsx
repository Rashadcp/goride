import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Fix for default marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const userIcon = L.divIcon({
    className: "custom-user-icon",
    html: `<div style="background-color: #2563eb; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(37,99,235,0.5);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

// Component to handle map control
function MapControl({ userLoc, destLoc }: { userLoc: [number, number], destLoc: [number, number] | null }) {
    const map = useMap();
    useEffect(() => {
        if (destLoc) {
            const bounds = L.latLngBounds([userLoc, destLoc]);
            map.fitBounds(bounds, { padding: [50, 50] });
        } else if (userLoc) {
            map.setView(userLoc, map.getZoom());
        }
    }, [userLoc, destLoc, map]);
    return null;
}

export default function RealTimeMap({ destinationCoord }: { destinationCoord: [number, number] | null }) {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [route, setRoute] = useState<[number, number][]>([]);

    useEffect(() => {
        // Get user location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setUserLocation([51.505, -0.09]);
                }
            );
        } else {
            setUserLocation([51.505, -0.09]);
        }
    }, []);

    useEffect(() => {
        if (userLocation && destinationCoord) {
            const getRoute = async () => {
                try {
                    const response = await axios.get(
                        `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${destinationCoord[1]},${destinationCoord[0]}?overview=full&geometries=geojson`
                    );
                    if (response.data.routes && response.data.routes.length > 0) {
                        const coordinates = response.data.routes[0].geometry.coordinates.map(
                            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
                        );
                        setRoute(coordinates);
                    }
                } catch (error) {
                    console.error("Routing error:", error);
                }
            };
            getRoute();
        } else {
            setRoute([]);
        }
    }, [userLocation, destinationCoord]);

    if (!userLocation) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-[34px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Locating you...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full rounded-[34px] overflow-hidden relative border-4 border-white shadow-inner">
            <MapContainer
                center={userLocation}
                zoom={14}
                style={{ height: "100%", width: "100%", zIndex: 1 }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapControl userLoc={userLocation} destLoc={destinationCoord} />

                <Marker position={userLocation} icon={userIcon}>
                    <Popup>Your current location</Popup>
                </Marker>

                {destinationCoord && (
                    <Marker position={destinationCoord}>
                        <Popup>Destination</Popup>
                    </Marker>
                )}

                {route.length > 0 && (
                    <Polyline
                        positions={route}
                        color="#00FF85"
                        weight={5}
                        opacity={0.7}
                        lineJoin="round"
                    />
                )}
            </MapContainer>

            {/* Floating Info Overlay */}
            <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-950">Live Tracking</span>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
                <button
                    onClick={() => {
                        navigator.geolocation.getCurrentPosition((pos) => {
                            setUserLocation([pos.coords.latitude, pos.coords.longitude]);
                        });
                    }}
                    className="w-10 h-10 bg-white hover:bg-gray-50 text-emerald-950 rounded-xl shadow-lg flex items-center justify-center transition-all active:scale-95 border border-white"
                >
                    📍
                </button>
            </div>
        </div>
    );
}
