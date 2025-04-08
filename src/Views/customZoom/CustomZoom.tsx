import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { ICONS } from '../../assets';
import './customZoom.css';

const CustomZoom = () => {
  const map = useMap();
  const zoomControlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = zoomControlRef.current;
    if (!el) return;

    // Prevent Leaflet map click on zoom button clicks
    L.DomEvent.disableClickPropagation(el);
    L.DomEvent.disableScrollPropagation(el);
  }, []);

  return (
    <div className="custom-zoom" ref={zoomControlRef}>
      <button title="Zoom In" onClick={() => map.zoomIn()}>+</button>
      <button title="Zoom out" onClick={() => map.zoomOut()}>−</button>
      <div title='Earthquake alert' className='alert1'><img src={ICONS.earthquakealert}/></div>
      <div title='LIVE flight' className='alert2'><img src={ICONS.flightLogo}/></div>
    </div>
  );
};

export default CustomZoom;
