import { useState, useEffect } from 'react';
import * as L from 'leaflet';
import { Tooltip } from 'react-leaflet';

import {
  MapContainer,
  useMap,
  useMapEvents,
  TileLayer,
  Popup,
  Marker,
} from 'react-leaflet';

import MarkerClusterGroup from 'react-leaflet-cluster';
import { useLazyGetWeatherByCoordsQuery } from '../../Services/Api/weather';
import MiniMapControl from '../minimapview/MiniMapView';

import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
import { ICONS } from '../../assets';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './body.css';
import Footer from '../footer/Footer';

import { useLazyGetEarthquakesQuery } from '../../Services/Api/earthquake';
import CustomZoom from '../customZoom/CustomZoom';
import Earthquake from '../earthquake/Earthquake';

import { useLazyGetGeolocationByLatLngQuery } from '../../Services/Api/geolocation';
import { EarthquakeFeature, Props, Details } from './Types/Types';

const createFlightIcon = (fillColor: string, size = 38) =>
  new L.DivIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg"
     width="${size}" height="${size}"
     viewBox="0 0 24 24"
     style="transform: rotate(${45}deg);">
  <path fill="${fillColor}" d="M21 16v-2l-8-5V3.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V9L3 14v2l8-1.5v3L9.5 19v1l2.5-.5 2.5.5v-1L13 17.5v-3L21 16z"/>
</svg>
    `,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

const EarthquakeAlert = new Icon({
  iconUrl: ICONS.earthquakealert,
  iconAnchor: [20, 20],
  iconSize: [38, 38],
});

const Body = ({
  selectedLocation,
  setSelectedLocation,
  clickedLocation,
  setClickedLocation,
  flight,
  setFlight,alert,setAlert,visible,setVisible,setFlyToTarget,flyToTarget,fly,setFly
}: Props) => {
 

  const chooseOption = {
    flight: { flight, setFlight },
    earthquake: { alert, setAlert },
  };

  const [startTime, setStartTime] = useState<string|null>('2025-03-01'); //forearthquake
  const [endTime, setEndTime] = useState<string|null>('2025-04-01');
  const [clickedLocationEarthquake,setClickedLocationEarthquake]= useState<
  [number, number,string,number] | null
>(null);


  const [footerVisible, setFooterVisible] = useState<boolean>(true);

  const [earthquakeVisible, setEarthquakeVisible] = useState<boolean>(false);

  const [triggerWeather, { data: weatherData }] =
    useLazyGetWeatherByCoordsQuery();
  const [triggerGeolocation, { data: geolocation }] =
    useLazyGetGeolocationByLatLngQuery();

  const { data: liveflight} =
    useGetAllFlightsQuery(null);

  const FlightDetails = liveflight?.states || null;
  const [triggerEarthquakeQuery, { data: earthquakeData }] = useLazyGetEarthquakesQuery();

  useEffect(() => {
    if (startTime && endTime) {
      triggerEarthquakeQuery({ startTime, endTime });
      setClickedLocationEarthquake(null);
    }
  }, [startTime, endTime]);

  //console.log("earthquakeData",earthquakeData);
  // console.log('selected angle is', selectedLocation?.angle);

  

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newLat = e.latlng.lat;
        const newLon = e.latlng.lng;
        setClickedLocation([newLat, newLon]);
        triggerWeather({ lat: newLat, lon: newLon });
        triggerGeolocation({ lat: newLat, lng: newLon });
        setSelectedLocation(null);         //flight
      },
    });
    return null;
  };
   useEffect(() => {
    if (clickedLocation) {
      const [lat, lon] = clickedLocation;
      triggerWeather({ lat, lon });
      triggerGeolocation({ lat, lng: lon });
    }
  }, [clickedLocation]);

  const FlyToTarget = () => {
    const map = useMap();
  
    useEffect(() => {
      if (flyToTarget) {
        map.flyTo(flyToTarget, 8, { duration: 1.5 });
      }
    }, [flyToTarget, map]);
  
    return null;
  };
  

  


  
  // useEffect(() => {
  //   if (earthquakeData?.length > 0) {
  //     setClickedLocationEarthquake(null);
  //   }
  // }, [earthquakeData]);
  
  return (
    <div className="linear-gradient-body">
      <MapContainer
        className="leaf1"
        center={[20.5937, 78.9629] as [number, number]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        minZoom={2}
        maxBounds={[
          [85, -180],
          [-85, 180],
        ]}
       
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

       
        <MapClickHandler />
        <CustomZoom chooseOption={chooseOption} />
        <MarkerClusterGroup showCoverageOnHover={false}>
        
        {flight && 
          FlightDetails?.map((details: Details) => {
            const isSelected =
              selectedLocation?.id === details[0] &&
              selectedLocation?.lat === details[6] &&
              selectedLocation?.lon === details[5];

            if (isSelected) return null;

            if (details[5] !== null && details[6] !== null) {
             
              return (
                <Marker
                  key={details[0]}
                  position={[details[6], details[5]]}
                  icon={createFlightIcon('green', 42)}
                  rotationAngle={0}
                  rotationOrigin="center center"
                  eventHandlers={{
                    click: () => {
                      setSelectedLocation({
                        id: details[0],
                        lat: details[6],
                        lon: details[5],
                        
                      }),setClickedLocation(null)
                    },
                  }}
                >
            <Tooltip>
         <strong>Flight ID:</strong> {details[0]}<br />
            <strong>Lat:</strong>  {details[6]} <br />
            <strong>Lon:</strong> {details[5]}
         </Tooltip>
           

                </Marker>
              );
            }
            return null;
          })}
      </MarkerClusterGroup>

      {flight && selectedLocation?.lat && selectedLocation?.lon && (
        <Marker
          key={selectedLocation.id}
          position={[selectedLocation.lat, selectedLocation.lon]}
          icon={createFlightIcon('red', 42)}
          zIndexOffset={1000}
          rotationAngle={0}
          rotationOrigin="center center "
        >
         <Tooltip permanent>
         <strong>Flight ID:</strong> {selectedLocation.id} <br />
            {/* <strong>Lat:</strong> {selectedLocation.lat} <br />
            <strong>Lon:</strong> {selectedLocation.lon} */}
         </Tooltip>
           
            
        </Marker>
      )}



{alert && earthquakeData?.features && (
          <>
            <MarkerClusterGroup showCoverageOnHover={false}>
              {earthquakeData.features
                .filter(
                  (quake: EarthquakeFeature) =>
                    !clickedLocationEarthquake ||
                    (quake.geometry.coordinates[1] !== clickedLocationEarthquake[0] ||
                      quake.geometry.coordinates[0] !== clickedLocationEarthquake[1])
                )
                .map((quake: EarthquakeFeature) => (
                  <Marker
                    key={quake.id}
                    position={[
                      quake.geometry.coordinates[1],
                      quake.geometry.coordinates[0],
                    ]}
                    icon={EarthquakeAlert}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                    <div className='earthquake-tooltip'>
                  
                  <strong>{quake.properties.place}</strong>
                
                <p>Magnitude: {quake.properties.mag}</p>
                </div>
                    </Tooltip>
                  </Marker>
                ))}
            </MarkerClusterGroup>

       
            {clickedLocationEarthquake  && (
              <Marker
                position={[clickedLocationEarthquake[0],clickedLocationEarthquake[1]]}
                icon={EarthquakeAlert}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                <div className='earthquake-tooltip'>
                  
                  <strong>{clickedLocationEarthquake[2]}</strong>
                
                <p>Magnitude: {clickedLocationEarthquake[3]}</p>
                </div>
                </Tooltip>
              </Marker>
            )}
          </>
        )}
            {fly && flyToTarget &&  <FlyToTarget/>}




        {clickedLocation && (
          <Popup position={clickedLocation}>
            <div>
            {/* {clickedLocation && <FlyToSelectedWeather/>} */}
              {weatherData && (
                <div className="popup">
                 { geolocation?.results[0]?.annotations?.flag && geolocation?.results[0]?.components?.state ? <h2>
                    {geolocation?.results[0]?.annotations?.flag}{' '}
                    {geolocation?.results[0]?.components?.state}
                  </h2>:<h2>{geolocation?.results[0]?.formatted} </h2>}
               
                  <br />
                 <span> <strong>Weather:</strong> {weatherData.weather[0].description}</span>
                  <br />
                  <span><strong>Temperature:</strong> {weatherData.main.temp}°C</span>
                  <br />
                  <span><strong>Humidity:</strong> {weatherData.main.humidity}%</span>
                  <br />
                  <span><strong>Wind Speed:</strong> {weatherData.wind.speed}</span>
                  <br />
                </div>
              )}
            </div>
          </Popup>
        )}
        <MiniMapControl />
      </MapContainer>

      
        <Footer
          setFly={setFly}
          setAlert={setAlert}
          setFlight={setFlight}
          setVisible={setVisible}
        />
      
      {visible==="earthquake-list" && (
        <Earthquake
        setFly={setFly}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          startTime={startTime}
          endTime={endTime}
          setAlert={setAlert}
          setClickedLocationEarthquake={setClickedLocationEarthquake}
          setVisible={setVisible}
          setFlyToTarget={setFlyToTarget}
          visible={visible}
        />
      )}
    </div>
  );
};

export default Body;
