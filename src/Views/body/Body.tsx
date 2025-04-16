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

import { useGetEarthquakesQuery } from '../../Services/Api/earthquake';
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
  setFlight,alert,setAlert
}: Props) => {
 

  const chooseOption = {
    flight: { flight, setFlight },
    earthquake: { alert, setAlert },
  };

  const [startTime, setStartTime] = useState<string|null>('2024-03-01'); //forearthquake
  const [endTime, setEndTime] = useState<string|null>('2024-04-01');
  console.log('start time and end time int the body ', startTime, ' ', endTime);
  const [footerVisible, setFooterVisible] = useState<boolean>(true);

  const [earthquakeVisible, setEarthquakeVisible] = useState<boolean>(false);

  const [triggerWeather, { data: weatherData }] =
    useLazyGetWeatherByCoordsQuery();
  const [triggerGeolocation, { data: geolocation }] =
    useLazyGetGeolocationByLatLngQuery();

  const { data: liveflight} =
    useGetAllFlightsQuery(null);
  const FlightDetails = liveflight?.states || null;

  const { data: earthquakeData } =
    useGetEarthquakesQuery({ startTime, endTime });

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

  const FlyToSelectedFlight = () => {
    const map = useMap();
    setClickedLocation(null);
    useEffect(() => {
      if (selectedLocation?.lat && selectedLocation?.lon) {
        map.flyTo([selectedLocation.lat, selectedLocation.lon], 8, {
          duration: 1.5,
        });
      }
    }, [selectedLocation, map]);
    return null;
  };
  // const FlyToSelectedWeather = () => {
  //   const map = useMap();
  //  setSelectedLocation(null);
  //   if(clickedLocation)
  //   {const [lat, lon] = clickedLocation;
  //   useEffect(() => {
  //     if (lat && lon) {
  //       map.flyTo([lat,lon], 8, {
  //         duration: 1.5,
  //       });
  //     }
  //   }, [clickedLocation,map]);
  // }
  //   return null;

  // };


  console.log("arabian sea",geolocation?.results[0]?.component?.formatted);
  return (
    <div className="linear-gradient-body">
      <MapContainer
        className="leaf1"
        center={[20.5937, 78.9629] as [number, number]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        minZoom={2}
       
       
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {flight && selectedLocation && <FlyToSelectedFlight />}
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
         <Tooltip>
         <strong>Flight ID:</strong> {selectedLocation.id} <br />
            <strong>Lat:</strong> {selectedLocation.lat} <br />
            <strong>Lon:</strong> {selectedLocation.lon}
         </Tooltip>
           
            
        </Marker>
      )}

<MarkerClusterGroup>
        {alert &&
          earthquakeData?.features?.map((item: EarthquakeFeature) => {
            const [lng, lat] = item.geometry.coordinates;
            if (item.properties.mag == 5.5) {
              console.log('present', item.properties.place);
              console.log('start time ', startTime, 'and ', endTime);
            }
            return (
              <Marker
                key={`${lat}-${lng}`}
                position={[lat, lng]}
                icon={EarthquakeAlert}
              >
                 <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent={false}>
                  <div className='earthquake-tooltip'>
                  
                    <strong>{item.properties.place}</strong>
                  
                  <p>Magnitude: {item.properties.mag}</p>
                  </div>
              </Tooltip>
              </Marker>
            );
          })}
</MarkerClusterGroup>
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

      {footerVisible && (
        <Footer
          setFooterVisible={setFooterVisible}
          setEarthquakeVisible={setEarthquakeVisible}
          setAlert={setAlert}
          setFlight={setFlight}
        />
      )}
      {earthquakeVisible && (
        <Earthquake
          setFooterVisible={setFooterVisible}
          setEarthquakeVisible={setEarthquakeVisible}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          startTime={startTime}
          endTime={endTime}
          setAlert={setAlert}
        />
      )}
    </div>
  );
};

export default Body;
