import { useEffect, memo } from 'react';
import { useMap } from 'react-leaflet';
interface Props{
    flyToTarget:[number,number]
}

const FlyToTarget = ({ flyToTarget }:Props) => {
  const map = useMap();
  // const prevTargetPosition = useRef<[number, number] | null>(null);
console.log("fly too ...  ")
    useEffect(() => {
    if (flyToTarget) {
      map.flyTo(flyToTarget, 8, { duration: 1 });
    }
  }, [flyToTarget, map]);

  return null;
};


export default memo(FlyToTarget);


// const FlyToTarget = () => {
//   const map = useMap();

//   useEffect(() => {
//     if (flyToTarget) {
//       map.flyTo(flyToTarget, 8, { duration: 1.5 });
//     }
//   }, [flyToTarget, map]);

//   return null;
// };



{
  /*
  import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFlights } from '../../Store/flight';
import * as L from 'leaflet';
import { Tooltip } from 'react-leaflet';
import FlyToTarget from './FlightToTarget';

import {
  MapContainer,
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
import 'leaflet-rotatedmarker';

import { useLazyGetEarthquakesQuery } from '../../Services/Api/earthquake';
import CustomZoom from '../customZoom/CustomZoom';
import Earthquake from '../earthquake/Earthquake';

import { useLazyGetGeolocationByLatLngQuery } from '../../Services/Api/geolocation';
import { EarthquakeFeature, Props, Details } from './Types/Types';
import Loading from '../loading';

const createFlightIcon = (fillColor: string, size = 38) =>
  new L.DivIcon({
    html: `
      <div class="flight-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg"
          width="${size}" height="${size}"
          viewBox="0 0 24 24">
          <path fill="${fillColor}" d="M21 16v-2l-8-5V3.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V9L3 14v2l8-1.5v3L9.5 19v1l2.5-.5 2.5.5v-1L13 17.5v-3L21 16z"/>
        </svg>
      </div>
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
  alert,
  setAlert,
  visible,
  setVisible,
  setFlyToTarget,
  flyToTarget,
  fly,
  setFly
}: Props) => {
  const dispatch = useDispatch();
  const flightMarkersRef = useRef<Map<string, L.Marker>>(new Map());
  const mapRef = useRef<L.Map | null>(null); // Ref for the map

  const [startTime, setStartTime] = useState<string | null>('2025-03-01'); // for earthquake
  const [endTime, setEndTime] = useState<string | null>('2025-04-01');
  const [clickedLocationEarthquake, setClickedLocationEarthquake] = useState<
    [number, number, string, number] | null
  >(null);

  const [triggerWeather, { data: weatherData }] = useLazyGetWeatherByCoordsQuery();
  const [triggerGeolocation, { data: geolocation }] = useLazyGetGeolocationByLatLngQuery();
  const { data: liveflight, isLoading: loadingFlights } = useGetAllFlightsQuery(null);
  const FlightDetails = liveflight?.states || null;

  const [triggerEarthquakeQuery, { data: earthquakeData }] = useLazyGetEarthquakesQuery();

  useEffect(() => {
    if (liveflight?.states) {
      dispatch(setFlights(liveflight.states));
    }
  }, [liveflight]);

  useEffect(() => {
    if (startTime && endTime) {
      if (alert || visible === 'earthquake-list') {
        triggerEarthquakeQuery({ startTime, endTime });
        setClickedLocationEarthquake(null);
      }
    }
  }, [startTime, endTime, alert, visible, triggerEarthquakeQuery]);

  useEffect(() => {
    if (!flight || !FlightDetails || !mapRef.current) return;

    const map = mapRef.current;
    const currentIds = new Set();

    FlightDetails.forEach((details: Details) => {
      const id = details[0];
      const lat = details[6];
      const lon = details[5];
      const angle = details[10] || 0;

      currentIds.add(id);

      if (lat == null || lon == null) return;

      const existingMarker = flightMarkersRef.current.get(id);

      // If selected, render it via React instead (to get JSX-level tooltip etc)
      if (selectedLocation?.id === id) {
        if (existingMarker) {
          map.removeLayer(existingMarker);
          flightMarkersRef.current.delete(id);
        }
        return;
      }

      if (existingMarker) {
        existingMarker.setLatLng([lat, lon]);
        (existingMarker as any).setRotationAngle(angle);
      } else {
        const newMarker = L.marker([lat, lon], {
          icon: createFlightIcon('green', 42),
          rotationAngle: angle,
          rotationOrigin: 'center center',
        }).addTo(map);

        newMarker.on('click', () => {
          setSelectedLocation({ id, lat, lon, angle, origin: details[2] });
          setClickedLocation(null);
        });

        newMarker.bindTooltip(
          `<strong>Origin:</strong> ${details[2]}<br/><strong>Flight ID:</strong> ${id}`
        );

        flightMarkersRef.current.set(id, newMarker);
      }
    });

    // Remove stale markers
    flightMarkersRef.current.forEach((marker, id) => {
      if (!currentIds.has(id)) {
        map.removeLayer(marker);
        flightMarkersRef.current.delete(id);
      }
    });

  }, [FlightDetails, flight, selectedLocation?.id]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newLat = e.latlng.lat;
        const newLon = e.latlng.lng;
        setClickedLocation([newLat, newLon]);
        triggerWeather({ lat: newLat, lon: newLon });
        triggerGeolocation({ lat: newLat, lng: newLon });
        setSelectedLocation(null); // flight
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

  useEffect(() => {
    if (selectedLocation && FlightDetails) {
      const updated = FlightDetails.find(
        (details: Details) => details[0] === selectedLocation.id
      );

      if (updated) {
        setSelectedLocation({
          id: updated[0],
          lat: updated[6],
          lon: updated[5],
          angle: updated[10],
          origin: updated[2]
        });
      } else {
        setSelectedLocation(null);
      }
    }
  }, [FlightDetails]);

  return (
    <div className="linear-gradient-body">
      <MapContainer
        ref={mapRef}
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
        <CustomZoom />
        <MarkerClusterGroup showCoverageOnHover={false}>
          {loadingFlights && <Loading />}
        </MarkerClusterGroup>

        {flight && selectedLocation?.lat && selectedLocation?.lon && (
          <Marker
            key={selectedLocation.id}
            position={[selectedLocation.lat, selectedLocation.lon]}
            icon={createFlightIcon('red', 42)}
            rotationAngle={selectedLocation.angle || 0}
            rotationOrigin="center center"
            zIndexOffset={1000}
          >
            <Tooltip permanent>
              <strong>Flight ID:</strong> {selectedLocation.id} <br />
              <strong>Origin:</strong> {selectedLocation.origin}
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
                      <div className="earthquake-tooltip">
                        <strong>{quake.properties.place}</strong>
                        <p>Magnitude: {quake.properties.mag}</p>
                      </div>
                    </Tooltip>
                  </Marker>
                ))}
            </MarkerClusterGroup>

            {clickedLocationEarthquake && (
              <Marker
                position={[clickedLocationEarthquake[0], clickedLocationEarthquake[1]]}
                icon={EarthquakeAlert}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                  <div className="earthquake-tooltip">
                    <strong>{clickedLocationEarthquake[2]}</strong>
                    <p>Magnitude: {clickedLocationEarthquake[3]}</p>
                  </div>
                </Tooltip>
              </Marker>
            )}
          </>
        )}

        {fly && flyToTarget && <FlyToTarget flyToTarget={flyToTarget} />}
        <MiniMapControl />
      </MapContainer>

      <Footer setFly={setFly} setAlert={setAlert} setFlight={setFlight} setVisible={setVisible} />

      {visible === "earthquake-list" && (
        <Earthquake
          setFly={setFly}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          startTime={startTime}
          endTime={endTime}
          setAlert={setAlert}
          setClickedLocationEarthquake={setClickedLocationEarthquake}
          setClickedLocation={setClickedLocation}
          setVisible={setVisible}
          setFlyToTarget={setFlyToTarget}
          visible={visible}
        />
      )}
    </div>
  );
};

export default Body;

  */
}