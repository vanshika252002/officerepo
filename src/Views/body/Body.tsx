import { useState } from 'react';
import {
  MapContainer,
  useMapEvents,
  TileLayer,
  Popup,
  Marker,
} from 'react-leaflet';
import "leaflet-rotatedmarker";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useGetWeatherByCoordsQuery } from '../../Services/Api/weather/index';
import MiniMapView from '../minimapview/MiniMapView';

import {useGetAllFlightsQuery} from '../../Services/Api/liveflight';
import { ICONS } from '../../assets';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './body.css';
import Footer from '../footer/Footer';

import { useGetEarthquakesQuery } from '../../Services/Api/earthquake';
import CustomZoom from '../customZoom/CustomZoom';
import Earthquake from '../earthquake/Earthquake';
import Loading from '../loading/Loading';
import { useGetGeolocationByLatLngQuery } from '../../Services/Api/geolocation';

const FlightIcon=new Icon({
  iconUrl:ICONS.flightLogo,
  iconSize:[38,38],
})

const EarthquakeAlert=new Icon({
  iconUrl:ICONS.earthquakealert,
  iconSize:[38,38],
})
const Body=()=> {

  const [flight,setFlight]=useState<boolean>(false);
  const [alert,setAlert]=useState<boolean>(false);

  const chooseOption={flight:{flight,setFlight},earthquake:{alert,setAlert}}

  const [clickedLocation, setClickedLocation] = useState<
    [number, number] | null
  >(null);
  const lat = clickedLocation?.[0];
  const lon = clickedLocation?.[1];
  const [footerVisible,setFooterVisible]=useState<boolean>(true);
  const [miniMapVisible,setMiniMapVisible]=useState<boolean>(false);
 const [earthquakeVisible,setEarthquakeVisible]=useState<boolean>(false);

const {data:geolocation}=useGetGeolocationByLatLngQuery({lat:lat,lng:lon},{skip:!lat || !lon})
 // console.log("reverse place from lat and lon is",geolocation?.results[0].annotations.flag,geolocation?.results[0].components.state);
  
  
  const { data, isLoading } = useGetWeatherByCoordsQuery(
    { lat, lon },
    { skip: !lat || !lon }
  );
  
  const {data:liveflight,isLoading:flightLoading}=useGetAllFlightsQuery(null); 
  const FlightDetails=liveflight?.states||null;
 console.log("flight dtaild param",FlightDetails);
   const [startTime]=useState<string>("2024-03-01");
   const [endTime]=useState<string>("2024-04-01")
    const {data:earthquakeData,isLoading:earthquakeLoading} = useGetEarthquakesQuery({startTime :startTime,endTime:endTime});
 //earthquakeData?.features?.map((item)=>{console.log("lat and lon ",item.geometry.coordinates[0],item.geometry.coordinates[1])})




  //const {data:earthquakeData}=useGetEarthquakesQuery({startTime:"2024-03-01", endTime:"2024-04-01"})
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setClickedLocation([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  return (
    <div className='linear-gradient-body'>
       {/* <Earthquake startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime} /> */}
     
      <MapContainer className='leaf1'
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
    
    <MapClickHandler />
    <CustomZoom chooseOption={chooseOption}/>
   <MarkerClusterGroup chukedLoading
   showCoverageOnHover={false}
   >
   {flightLoading && <Loading/>}
   { flight && FlightDetails?.map((details:[string,string,string,number,number,number,number,number,boolean,number,number,number,number[],number,string,boolean,number,number]) =>
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

{earthquakeLoading && <Loading/>}
 { alert && earthquakeData && earthquakeData.features?.map((item:{geometry:{coordinates:[number,number]},properties:{place:string,alert:string}})=>(
  item.properties.alert &&
  <Marker position={[item.geometry.coordinates[0],item.geometry.coordinates[1]]} icon={EarthquakeAlert}>
    <Popup>
       <h2><strong>{item.properties.place}</strong></h2>
    </Popup>
  </Marker>
))} 
  

    {clickedLocation !== null && (
      <Popup position={clickedLocation}>
        <div>
          {isLoading && <p>Loading Weather...</p>}
          {data && (
            <div className='popup'>
              <h1>{geolocation?.results[0]?.annotations?.flag} {geolocation?.results[0].components.state}</h1>
              <br/>
              <strong>Weather : </strong>
              {data.weather[0].description}
              <br />
              <strong>Temperature : </strong>
              {data.main.temp}°C
              <br />
              <strong>Humidity : </strong>
              {data.main.humidity}%
              <br />
              <strong>Wind Speed : </strong>
              {data.wind.speed}
            </div>
          )}
        </div>
      </Popup>
    )}
    
  </MapContainer>

  {footerVisible && <Footer   setFooterVisible={setFooterVisible} setMiniMapVisible={setMiniMapVisible} setEarthquakeVisible={setEarthquakeVisible}/>}
    {miniMapVisible && <MiniMapView setFooterVisible={setFooterVisible} setMiniMapVisible={setMiniMapVisible} lat={lat??0} lon={lon??0}/>}
    {earthquakeVisible && <Earthquake setFooterVisible={setFooterVisible} setEarthquakeVisible={setEarthquakeVisible} /> }
  </div>
    
  );
}

export default Body;