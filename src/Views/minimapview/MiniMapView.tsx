import { useMap } from 'react-leaflet';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';
import 'leaflet-minimap';
import './minimapview.css';
import * as L from 'leaflet';




import { useEffect } from 'react';

const MiniMapControl = () => {
  const map = useMap();

  useEffect(() => {
    const miniMapLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 0,
      maxZoom: 13,
      attribution: '',
    });

    const miniMap = new L.Control.MiniMap(miniMapLayer, {
      toggleDisplay: true,
      minimized: false,
      position: 'bottomright',
      width:300,
      height:300,
      zoomLevelOffset: -5,
      zoomAnimation: true,
      aimingRectOptions: { color: '#ff7800', weight: 1, clickable: false },
      shadowRectOptions: { color: '#000000', weight: 1, clickable: false, opacity: 0, fillOpacity: 0 },
    });

    miniMap.addTo(map);

    return () => {
      miniMap.remove();
    };
  }, [map]);

  return null;
};
export default MiniMapControl;