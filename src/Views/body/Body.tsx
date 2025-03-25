import { useState } from 'react';
import {
  MapContainer,
  useMapEvents,
  TileLayer,
  ZoomControl,
  Popup,
} from 'react-leaflet';
import { useGetWeatherByCoordsQuery } from '../../Services/Api/weather/index';


import 'leaflet/dist/leaflet.css';
import './body.css';

function Body() {
  const [clickedLocation, setClickedLocation] = useState<
    [number, number] | null
  >(null);
  const lat = clickedLocation ? clickedLocation[0] : null;
  const lon = clickedLocation ? clickedLocation[1] : null;

  const { data, isLoading } = useGetWeatherByCoordsQuery(
    { lat, lon },
    { skip: !lat || !lon }
  );
  
  
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setClickedLocation([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  return (
    <MapContainer
      center={[20.5937, 78.9629] as [number, number]}
      zoom={5}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomleft" />
      <MapClickHandler />
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
  );
}

export default Body;
