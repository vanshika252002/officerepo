import { useState, useEffect } from 'react';
import * as L from 'leaflet';

// import 'leaflet-rotatedmarker';

// import {createFlightIcon} from './flight';
import {
  MapContainer,
  useMap,
  useMapEvents,
  TileLayer,
  Popup,
  Marker,
} from 'react-leaflet';
// import 'leaflet-rotatedmarker';
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
  setFlight,
}: Props) => {
  const [alert, setAlert] = useState<boolean>(false);

  const chooseOption = {
    flight: { flight, setFlight },
    earthquake: { alert, setAlert },
  };

  const [startTime, setStartTime] = useState<string>('2024-03-01'); //forearthquake
  const [endTime, setEndTime] = useState<string>('2024-04-01');
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
        setSelectedLocation(null);
      },
    });
    return null;
  };

  const FlyToSelectedFlight = () => {
    const map = useMap();
    useEffect(() => {
      if (selectedLocation?.lat && selectedLocation?.lon) {
        map.flyTo([selectedLocation.lat, selectedLocation.lon], 8, {
          duration: 1.5,
        });
      }
    }, [selectedLocation, map]);
    return null;
  };

  return (
    <div className="linear-gradient-body">
      <MapContainer
        className="leaf1"
        center={[20.5937, 78.9629] as [number, number]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        minZoom={3}
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
                if (details[0] == '710054') {
                  console.log('angle is ', details[9]);
                }

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
                          
                        });
                      },
                    }}
                  ></Marker>
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
            <Popup>
             
              <strong>Flight ID:</strong> {selectedLocation.id} <br />
              <strong>Lat:</strong> {selectedLocation.lat} <br />
              <strong>Lon:</strong> {selectedLocation.lon}
            </Popup>
          </Marker>
        )}

   
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
                <Popup>
                  <h2>
                    <strong>{item.properties.place}</strong>
                  </h2>
                  <p>Magnitude: {item.properties.mag}</p>
                </Popup>
              </Marker>
            );
          })}

        {clickedLocation && (
          <Popup position={clickedLocation}>
            <div>
            
              {weatherData && (
                <div className="popup">
                  <h1>
                    {geolocation?.results[0]?.annotations?.flag}{' '}
                    {geolocation?.results[0]?.components?.state}
                  </h1>
                  <br />
                  <strong>Weather:</strong> {weatherData.weather[0].description}
                  <br />
                  <strong>Temperature:</strong> {weatherData.main.temp}°C
                  <br />
                  <strong>Humidity:</strong> {weatherData.main.humidity}%<br />
                  <strong>Wind Speed:</strong> {weatherData.wind.speed}
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
