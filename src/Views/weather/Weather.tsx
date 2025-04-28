import { useEffect, useState } from 'react';
import { useLazyGetGeolocationByCoordsQuery } from '../../Services/Api/geolocation';

import Loading from '../loading';
import { useDebounce } from '../../Shared/Utils';
import { Input } from '../../Components/Common';

import { Weatherprops } from './Types/types';
import { ICONS } from '../../assets';
import './weather.css';

function Weather({
  setVisible,
  setClickedLocation,
  setFly,
  setFlyToTarget,
  clickedLocation,
}: Weatherprops) {
  const [city, setCity] = useState('');
  const [locations, setLocations] = useState([]);
  const debouncedCity = useDebounce(city, 400);
  const [triggerGeolocationQuery, { data, isLoading }] =
    useLazyGetGeolocationByCoordsQuery();
  useEffect(() => {
    const trimmedCity = debouncedCity.trim();
    if (trimmedCity.length >= 3) {
      triggerGeolocationQuery(trimmedCity);
    } else {
      setLocations([]);
    }
  }, [debouncedCity, triggerGeolocationQuery]);

  useEffect(() => {
    if (data?.results) {
      setLocations(data.results);
    } else {
      setLocations([]);
    }
  }, [data]);

  useEffect(() => {
    if (clickedLocation) {
      console.log('workin fine', clickedLocation);
      setFlyToTarget([clickedLocation[0], clickedLocation[1]]);
    }
  }, [clickedLocation]);

  console.log('location', locations);
  return (
    <div
      className="weather-container-wrapper"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="weather-btn">
        <button
          onClick={() => {
            setVisible('searchbar');
            setClickedLocation(null);
          }}
        >
          {' '}
          <img src={ICONS.arrow} />
        </button>
        <div className="w1">
          <span>Weather</span>
        </div>
      </div>

      <div className="w2">
        <Input
          placeholder="Enter a place"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>
      {isLoading && <Loading />}

      {!isLoading && debouncedCity && locations.length === 0 && (
        <div>Location is not found</div>
      )}

      <div className="locations-list">
        {locations.length > 0 && (
          <div>
            <h3>Select a Location:</h3>{' '}
          </div>
        )}
        <div className="scroll-weather">
          {locations.map((location: any, index: number) => (
            <button
              key={index}
              className="custom-item"
              onClick={() => {
                setClickedLocation([
                  location?.geometry?.lat,
                  location?.geometry?.lng,
                ]),
                  setFly(true);
              }}
            >
              <div className="Location">
                <strong>{location.formatted}</strong>
              </div>
              <div className="latitude-longitude">
                <span>
                  ({location.geometry.lat}, {location.geometry.lng})
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weather;
