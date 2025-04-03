import {useEffect} from 'react';
import { MapContainer, TileLayer,Marker, useMap } from "react-leaflet";
import { ICONS } from "../../assets";
import './minimapview.css';
import 'leaflet/dist/leaflet.css';
interface MinimapViewProps {
  lat:number;
  lon:number;
  setFooterVisible:(value:boolean)=>void;
  setMiniMapVisible:(value:boolean)=>void;
}
type Mapupdater={
  lat:number;
  lon:number;
}
const MiniMapView=({setFooterVisible,setMiniMapVisible,lat,lon}:MinimapViewProps)=>{
  console.log("clciked location",lat,lon);
  const MapUpdater=({lat,lon}:Mapupdater)=>{
    const map=useMap();
    useEffect(()=>{
      if(lat && lon){
        map.flyTo([lat,lon],12,{duration:0.7});
      }
    },[lat,lon])
    return null;
  }
    return (
        <div className="mini-map-wrapper" onClick={(e)=>e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
            <div className="mini-map-header">
                <div className="mini-map-h2"><h2>Map</h2></div>
                <div className="mini-map-button"><button onClick={()=>{setFooterVisible(true);setMiniMapVisible(false);}}><img src={ICONS.crossSymbol} alt="nodata"/></button></div>
                
            </div>
            <div className="mini-map-view">
            {lat && lon && <MapContainer 
                    center={[lat,lon] as [number, number]}
                    zoom={5} 
                    className="leaf2"
                >
                    <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {lat && lon && <Marker position={[lat,lon]} />}
                    <MapUpdater lat={lat} lon={lon}/>
                </MapContainer>}
            </div>
        </div>
    )
}

export default MiniMapView;