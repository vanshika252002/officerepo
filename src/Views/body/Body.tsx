import { useState, useEffect } from 'react';

import {
  MapContainer,
  useMap,
  useMapEvents,
  TileLayer,
  Popup,
  Marker,
} from 'react-leaflet';
import 'leaflet-rotatedmarker';
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
import Loading from '../loading/Loading';
import { useLazyGetGeolocationByLatLngQuery } from '../../Services/Api/geolocation';

interface Props {
  selectedLocation: {
    id: string;
    lat: number;
    lon: number;
    angle: number;
  } | null;
  setSelectedLocation: (location: {
    id: string;
    lat: number;
    lon: number;
    angle: number;
  }) => void;
  flight: boolean;
  setFlight: (value: boolean) => void;
}

const createFlightIcon = (fillColor: string, size = 38) =>
  new L.DivIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512" fill="${fillColor}">
        <path d="M256 0c17.67 0 32 14.33 32 32v192h64l48-96h32v112h48v32h-48v112h-32l-48-96h-64v192c0 17.67-14.33 32-32 32s-32-14.33-32-32V320h-64l-48 96h-32V304H32v-32h48V160h32l48 96h64V32c0-17.67 14.33-32 32-32z"/>
      </svg>
    `,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });


const EarthquakeAlert = new Icon({
  iconUrl: ICONS.earthquakealert,
  iconSize: [38, 38],
});

type Details = [
  string,
  string,
  string,
  number,
  number,
  number,
  number,
  number,
  boolean,
  number,
  number,
];

const Body = ({
  selectedLocation,
  setSelectedLocation,
  flight,
  setFlight,
}: Props) => {
  const [alert, setAlert] = useState<boolean>(false);

  const chooseOption = {
    flight: { flight, setFlight },
    earthquake: { alert, setAlert },
  };

  const [clickedLocation, setClickedLocation] = useState<
    [number, number] | null
  >(null);
  const lat = clickedLocation?.[0];
  const lon = clickedLocation?.[1];

  const [footerVisible, setFooterVisible] = useState<boolean>(true);
  const [miniMapVisible, setMiniMapVisible] = useState<boolean>(false);
  const [earthquakeVisible, setEarthquakeVisible] = useState<boolean>(false);

  const [triggerWeather, { data: weatherData, isLoading: weatherLoading }] =
    useLazyGetWeatherByCoordsQuery();
  const [triggerGeolocation, { data: geolocation }] =
    useLazyGetGeolocationByLatLngQuery();

  const { data: liveflight, isLoading: flightLoading } =
    useGetAllFlightsQuery(null);
  const FlightDetails = liveflight?.states || null;

  const [startTime] = useState<string>('2024-03-01');
  const [endTime] = useState<string>('2024-04-01');
  const { data: earthquakeData, isLoading: earthquakeLoading } =
    useGetEarthquakesQuery({ startTime, endTime });

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
        map.flyTo([selectedLocation.lat, selectedLocation.lon],8, {
          duration: 1.5,
        });
      }
    }, [selectedLocation, map]);
  
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
          {flightLoading && <Loading />}
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
                    icon={createFlightIcon('green')}
                    rotationAngle={details[10]}
                    rotationOrigin="center center"
                    eventHandlers={{
                      click: () => {
                        setSelectedLocation({
                          id: details[0],
                          lat: details[6],
                          lon: details[5],
                          angle: details[10],
                        });
                      },
                    }}
                  >
                    <Popup>
                      <strong>Flight ID:</strong> {details[0]} <br />
                      <strong>Origin:</strong> {details[2]} <br />
                      <strong>Lat:</strong> {details[6]} <br />
                      <strong>Lon:</strong> {details[5]} <br />
                      <strong>Velocity:</strong> {details[9]}
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
        </MarkerClusterGroup>

        {flight && selectedLocation?.lat && selectedLocation?.lon && (
          <Marker
            position={[selectedLocation.lat, selectedLocation.lon]}
            icon={createFlightIcon('red', 42)}
            zIndexOffset={1000}
            rotationAngle={selectedLocation.angle}
            rotationOrigin="center center"
          >
            <Popup autoOpen={true}>
              <strong>Flight ID:</strong> {selectedLocation.id} <br />
              <strong>Lat:</strong> {selectedLocation.lat} <br />
              <strong>Lon:</strong> {selectedLocation.lon}
            </Popup>
          </Marker>
        )}

        {earthquakeLoading && <Loading />}
        {alert &&
          earthquakeData?.features?.map((item) => {
            const [lng, lat] = item.geometry.coordinates;
            return (
              item.properties.alert && (
                <Marker
                  key={`${lat}-${lng}`}
                  position={[lat, lng]}
                  icon={EarthquakeAlert}
                >
                  <Popup>
                    <h2>
                      <strong>{item.properties.place}</strong>
                    </h2>
                  </Popup>
                </Marker>
              )
            );
          })}

        {clickedLocation && (
          <Popup position={clickedLocation}>
            <div>
              {weatherLoading && <p>Loading Weather...</p>}
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
          setMiniMapVisible={setMiniMapVisible}
          setEarthquakeVisible={setEarthquakeVisible}
        />
      )}
      {earthquakeVisible && (
        <Earthquake
          setFooterVisible={setFooterVisible}
          setEarthquakeVisible={setEarthquakeVisible}
        />
      )}
    </div>
  );
};

export default Body;
