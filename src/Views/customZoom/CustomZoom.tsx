import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { ICONS } from '../../assets';
import './customZoom.css';
interface Props{
  chooseOption:{flight:{setFlight:(value:boolean)=>void,flight:boolean},earthquake:{setAlert:(value:boolean)=>void,alert:boolean}}
}
const CustomZoom = ({chooseOption}:Props) => {
  const map = useMap();
  const zoomControlRef = useRef<HTMLDivElement>(null);
   
  const {earthquake,flight}=chooseOption;

  
  useEffect(() => {
    const el = zoomControlRef.current;
    if (!el) return;
    L.DomEvent.disableClickPropagation(el);
    L.DomEvent.disableScrollPropagation(el);
  }, []);

  return (
    <div className="custom-zoom" ref={zoomControlRef}>
      <button title="Zoom In" onClick={() => map.zoomIn()}>+</button>
      <button title="Zoom out" onClick={() => map.zoomOut()}>−</button>
      <button title='Earthquake alert' className='alert1' onClick={()=>{earthquake.setAlert(!earthquake.alert),flight.setFlight(false)}}><img src={ICONS.earthquakealert}/></button>
      <button title='LIVE flight' className='alert2' onClick={()=>{flight.setFlight(!flight.flight),earthquake.setAlert(false)}}><img src={ICONS.flightLogo}/></button>
    </div>
  );
};

export default CustomZoom;