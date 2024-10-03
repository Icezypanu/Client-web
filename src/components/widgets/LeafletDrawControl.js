import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet'
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import icon from 'leaflet-draw/dist/images/marker-icon.png';
import iconShadow from 'leaflet-draw/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: icon,
    iconUrl: icon,
    shadowUrl: iconShadow,
});



function LeafletDrawControl({ onDrawCreated }) {
    const map = useMap();

    useEffect(() => {
        const drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        const drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
            },
            draw: {
                circle: false,
            },
        });

        map.addControl(drawControl);

        map.on('draw:created', (e) => {
            const layer = e.layer;
            drawnItems.addLayer(layer);
            onDrawCreated(layer.toGeoJSON());
        });

        return () => {
            map.removeControl(drawControl);
        };
    }, [map, onDrawCreated]);

    return null;
}

export default LeafletDrawControl;