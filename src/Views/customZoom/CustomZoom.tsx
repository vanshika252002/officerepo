import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { ICONS } from '../../assets';
import './customZoom.css';
import { Props } from './Types/types';

const CustomZoom = ({chooseOption}:Props) => {
  const map = useMap();
  const zoomControlRef = useRef<HTMLDivElement>(null);
   
  const {earthquake,flight,visibility}=chooseOption;

  
  useEffect(() => {
    const el = zoomControlRef.current;
    if (!el) return;
    L.DomEvent.disableClickPropagation(el);
    L.DomEvent.disableScrollPropagation(el);
  }, []);

  return (
    <div className="custom-zoom" ref={zoomControlRef}>
      <button title="Zoom In" className='btn-zoom' onClick={() => map.zoomIn()}>+</button>
      <button title="Zoom out" className='btn-zoom' onClick={() => map.zoomOut()}>−</button>
      <button title='Earthquake alert' className={`${earthquake.alert?"opacity-on":"opacity-off"}`} onClick={()=>{earthquake.setAlert(!earthquake.alert),flight.setFlight(false)}}><img src={ICONS.earthquakealert}/></button>
      <button title='LIVE flight' className={`${flight.flight?"opacity-on":"opacity-off"}`} onClick={()=>{flight.setFlight(!flight.flight),earthquake.setAlert(false),visibility.setVisible("")}}><img src={ICONS.flightLogo}/></button>
    </div>
  );
};

export default CustomZoom;


/*

*/ 