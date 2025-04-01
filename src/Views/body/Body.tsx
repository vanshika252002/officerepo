import { useState } from 'react';
import {
  MapContainer,
  useMapEvents,
  TileLayer,
  ZoomControl,
  Popup,
  Marker,
} from 'react-leaflet';
import "leaflet-rotatedmarker";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useGetWeatherByCoordsQuery } from '../../Services/Api/weather/index';
import MiniMapView from '../minimapview/MiniMapView';
//import { useGetGeolocationByCoordsQuery } from '../../Services/Api/geolocation';
import {useGetAllFlightsQuery} from '../../Services/Api/liveflight';
import { ICONS } from '../../assets';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './body.css';
import Footer from '../footer/Footer';



const FlightIcon=new Icon({
  iconUrl:ICONS.flightLogo,
  iconSize:[38,38],
})

function Body() {
  const [clickedLocation, setClickedLocation] = useState<
    [number, number] | null
  >(null);
  const lat = clickedLocation?.[0];
  const lon = clickedLocation?.[1];
  const [footerVisible,setFooterVisible]=useState<boolean>(true);
  const [miniMapVisible,setMiniMapVisible]=useState<boolean>(false);

  const { data, isLoading } = useGetWeatherByCoordsQuery(
    { lat, lon },
    { skip: !lat || !lon }
  );
  //const {data:geolocationData} =useGetGeolocationByCoordsQuery({query:"airports"});
  const {data:liveflight}=useGetAllFlightsQuery(null); 
  const FlightDetails=liveflight?.states||null;
  //console.log("data of live flight ",liveflight?.states)
 // FlightDetails?.map((data)=>console.log("facing" , data[10]));
//console.log("excess data",FlightDetails , FlightDetails.length)
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setClickedLocation([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  return (
    <div><MapContainer className='leaf1'
    center={[20.5937, 78.9629] as [number, number]}
    zoom={5}
    style={{ height: '100%', width: '100%' }}
    zoomControl={false}
    minZoom={3} 
maxBounds={[[85, -180], [-85, 180]]}
maxBoundsViscosity={1.0} 
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <ZoomControl position="bottomleft" />
    <MapClickHandler />
   <MarkerClusterGroup chukedLoading
   >
   {FlightDetails?.map((details) =>
      details[5] !== null && details[6]!== null && (
        <Marker
          key={details[0]}
          position={[details[5],details[6]]}
          icon={FlightIcon}
          rotationAngle={details[10]}
          rotationOrigin="center center"
        
        >
          <Popup>
            <h2><strong>Origin : {details[2]}</strong></h2>
            <strong>Flight ID:</strong> {details[0]} <br />
            <strong>Latitude:</strong> {details[5]} <br />
            <strong>Longitude:</strong> {details[6]}
          </Popup>
        </Marker>
      )
    )
}
   </MarkerClusterGroup>
    {clickedLocation !== null && (
      <Popup position={clickedLocation}>
        <div>
          {isLoading && <p>Loading Weather...</p>}
          {data && (
            <p>
              <strong>Weather : </strong>
              {data.weather[0].description}
              <br />
              <strong>Temperature :</strong>
              {data.main.temp}°C
              <br />
              <strong>Humidity :</strong>
              {data.main.humidity}%
              <br />
              <strong>Wind Speed :</strong>
              {data.wind.speed}
            </p>
          )}
        </div>
      </Popup>
    )}
    
  </MapContainer>
  {footerVisible && <Footer   setFooterVisible={setFooterVisible} setMiniMapVisible={setMiniMapVisible}/>}
    {miniMapVisible && <MiniMapView setFooterVisible={setFooterVisible} setMiniMapVisible={setMiniMapVisible} lat={lat} lon={lon}/>}
  </div>
    
  );
}

export default Body;