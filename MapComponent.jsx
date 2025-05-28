import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css'; // Import Leaflet Draw CSS
import 'leaflet-draw'; // Import Leaflet Draw JS

// Fix for default Leaflet icon paths issue with Webpack
// https://leafletjs.com/examples/quick-start/
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


// Custom icons for guards (green for in-bounds, red for out-of-bounds)
const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Using a standard blue marker for offices for better visibility
const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


const MapComponent = forwardRef(({ officeLocations, guardLocations, onMarkerClick }, ref) => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null); // To store the Leaflet map instance
    const markersAndCirclesRef = useRef([]); // To keep track of markers and circles for cleanup
    const drawnItemsRef = useRef(null); // To store the FeatureGroup for drawn layers

    useImperativeHandle(ref, () => ({
        // Expose a method to pan the map
        panTo: (latlng, zoom) => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.setView(latlng, zoom);
            }
        },
        // You can expose other Leaflet map methods here if needed
    }));


    useEffect(() => {
        // Initialize map only once
        if (mapContainerRef.current && !mapInstanceRef.current) {
            const map = L.map(mapContainerRef.current, {
                center: [20.5937, 78.9629], // Center of India
                zoom: 5,
                zoomControl: true, // Re-enabled zoom controls
                attributionControl: false // Hide attribution if you don't want it
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                noWrap: true // Prevents map from repeating horizontally
            }).addTo(map);

            mapInstanceRef.current = map; // Store map instance

            // Initialize Leaflet Draw FeatureGroup and Control
            drawnItemsRef.current = new L.FeatureGroup().addTo(map);
            const drawControl = new L.Control.Draw({
                edit: {
                    featureGroup: drawnItemsRef.current
                },
                draw: {
                    polygon: {
                        allowIntersection: false, // Restricts polygons to not intersect themselves
                        showArea: true
                    },
                    polyline: true,
                    rectangle: true,
                    circle: true,
                    marker: false, // We're adding custom markers, so disable default draw marker
                    circlemarker: false,
                }
            });
            map.addControl(drawControl);

            // Event listeners for Leaflet Draw
            map.on(L.Draw.Event.CREATED, function (event) {
                const layer = event.layer;
                drawnItemsRef.current.addLayer(layer);
                console.log('Drawn Layer (GeoJSON):', layer.toGeoJSON());
                // In a real application, you would typically save this GeoJSON data
                // to your database (e.g., Firestore) to persist the drawn boundaries.
            });

            map.on(L.Draw.Event.EDITED, function (event) {
                event.layers.eachLayer(function (layer) {
                    console.log('Edited Layer (GeoJSON):', layer.toGeoJSON());
                    // Update the corresponding data in your database.
                });
            });

            map.on(L.Draw.Event.DELETED, function (event) {
                event.layers.eachLayer(function (layer) {
                    console.log('Deleted Layer (GeoJSON):', layer.toGeoJSON());
                    // Remove the corresponding data from your database.
                });
            });

        }

        const map = mapInstanceRef.current;
        if (!map) return; // Exit if map not initialized

        // Clear existing markers and circles before adding new ones
        markersAndCirclesRef.current.forEach(layer => layer.remove()); // Use remove() for Leaflet layers
        markersAndCirclesRef.current = []; // Reset the array

        // Add office markers and circles
        officeLocations.forEach(office => {
            const marker = L.marker([office.lat, office.lng], {
                icon: blueIcon // Using the standard blue marker for offices
            }).addTo(map);

            marker.bindPopup(`<b>${office.name}</b><br>${office.address}<br>Guards: ${office.numGuards}`);

            marker.on('click', () => {
                if (onMarkerClick) {
                    onMarkerClick(office);
                }
            });

            // Add geofence circle (500m radius)
            const circle = L.circle([office.lat, office.lng], {
                color: '#4285F4',
                fillColor: '#4285F4',
                fillOpacity: 0.1,
                radius: 500 // In meters
            }).addTo(map);

            markersAndCirclesRef.current.push(marker);
            markersAndCirclesRef.current.push(circle);
        });

        // Add guard markers with images
        guardLocations.forEach(guard => {
            const office = officeLocations.find(o => o.id === guard.officeId);
            let isOutside = false;

            // Calculate distance to check if guard is outside geofence
            if (office && L.latLng(guard.lat, guard.lng).distanceTo(L.latLng(office.lat, office.lng)) > 500) {
                isOutside = true;
            }

            // Create a custom DivIcon for the guard's image
            const guardImageIcon = L.divIcon({
                className: 'custom-guard-icon',
                html: `<img src="${guard.image}" onerror="this.onerror=null;this.src='https://placehold.co/40x40/cccccc/000000?text=NA'" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid ${isOutside ? 'red' : 'green'}; object-fit: cover;">`,
                iconSize: [40, 40], // Size of the icon
                iconAnchor: [20, 20], // Anchor point of the icon
                popupAnchor: [0, -20] // Anchor point for the popup relative to the icon
            });

            const marker = L.marker([guard.lat, guard.lng], {
                icon: guardImageIcon // Use the custom image icon
            }).addTo(map);

            marker.bindPopup(`
                <div class="text-sm text-gray-800">
                    <p class="font-bold">Guard: ${guard.name}</p>
                    <p>Office: ${office ? office.name : 'N/A'}</p>
                    ${isOutside ? '<p style="color: red; font-weight: bold;">Outside Geofence!</p>' : ''}
                </div>
            `);
            markersAndCirclesRef.current.push(marker);
        });


        // Cleanup function for Leaflet map and its layers
        return () => {
            if (mapInstanceRef.current) {
                // Clear all layers from the map before removing the map instance
                mapInstanceRef.current.eachLayer(function (layer) {
                    mapInstanceRef.current.removeLayer(layer);
                });
                mapInstanceRef.current.remove(); // Remove the map instance
                mapInstanceRef.current = null;
            }
        };
    }, [officeLocations, guardLocations, onMarkerClick]); // Dependencies for this effect

    return (
        <>
            <div
                id="map" // Ensure this ID is unique if you have multiple maps
                ref={mapContainerRef}
                style={{ height: '100%', width: '100%' }} // Make it fill the parent div
            ></div>
        </>
    );
});

export default MapComponent;
