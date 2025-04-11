import { useEffect, useState } from 'react';
import { Input, Button } from '../../Components/Common';
import { useGetGeolocationByCoordsQuery } from "../../Services/Api/geolocation";
import { useDebounce } from '../debouncing/useDebounce';
import './weather.css';

interface weatherprops {
  chooseOption: any;
  setSearchBar: any;
}

function Weather({ chooseOption, setSearchBar }: weatherprops) {
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const debouncedCity = useDebounce(city, 400);

  const { data } = useGetGeolocationByCoordsQuery(debouncedCity, {
    skip: !debouncedCity || debouncedCity.length < 3,
  });

  useEffect(() => {
    if (debouncedCity.length >= 3) {
      setHasSearched(true);
    }

    if (data?.results) {
      setLocations(data.results);
    } else if (data && !data.results?.length) {
      setLocations([]); // Ensure it's empty if no results
    }
  }, [data, debouncedCity]);

  return (
    <div className="weather-container-wrapper" onClick={(e) => e.stopPropagation()}>
      <div className="weather-btn">
        <Button
          onClick={() => {
            chooseOption.weather.setWeatherVisible(false);
            setSearchBar(true);
          }}
          label="x"
        />
      </div>

      <div>
        <Input
          placeholder="Enter a place"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>

      <div className="locations-list">
        {locations.length > 0 && <h3>Select a Location:</h3>}

        <div className="scroll-weather">
          {locations.map((location: any, index: number) => (
            <div
              key={index}
              className="custom-item"
              onClick={() => {
                chooseOption.weather.place.setPlace(location.formatted);
                chooseOption.weather.setSelectedLocation({
                  lat: location.geometry.lat,
                  lon: location.geometry.lng,
                });
                chooseOption.weather.setWeatherVisible(false);
                chooseOption.weather.setWeatherDetails(true);
             
              }}
            >
              <strong>{location.formatted}</strong> ({location.geometry.lat}, {location.geometry.lng})
            </div>
          ))}

          {hasSearched && locations.length === 0 && (
            <div className="no-city-found">No city found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
