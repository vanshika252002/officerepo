import { useState, useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../../Components/firebase';
import { Button } from '../../Components/Common';
import { useLazyGetWeatherByCoordsQuery } from '../../Services/Api/weather';
import { updateAuthTokenRedux } from '../../Store/Common';
import './tocheck.css';
import { ICONS } from '../../assets';
import SearchBar from '../searchbar/SearchOptions';
import Weather from '../weather/Weather';
import FlightByRoute from '../flightbyroute';
import FlightInformation from '../flightInformation';
import Nearby from '../nearby';
import Airports from '../airports';
import AirportCountryFlights from '../airportCountryFlights';
import Searching from '../searching';
import Live from '../live';

interface Props{
  setFlight:(value:boolean)=>void;
  selectedLocation:{id:string,lat:number|null,lon:number|null}|null;
  setSelectedLocation:(location:{id:string,lat:number|null,lon:number|null}|null)=>void;
  setClickedLocation: (location: [number, number] | null) => void;
}
const ToCheck = ({selectedLocation,setSelectedLocation,setFlight}:Props) => {
  const dispatch = useDispatch();

  const [searchingVisible, setSearchingVisible] = useState<boolean>(false);
  const [searchedData, setSearchedData] = useState<string>('');

  const [searchBar, setSearchBar] = useState<boolean>(false);
  const [weatherDetails, setWeatherDetails] = useState<boolean>(false); // weather details view
  const [weatherVisible, setWeatherVisible] = useState<boolean>(false); // search UI for weather
  const [place, setPlace] = useState('');

  const [flightVisible, setFlightVisible] = useState<boolean>(false);
  const [flightData, setFlightData] = useState<boolean>(false); // flight by route details
  const [origin, setOrigin] = useState('');

  const [nearbyVisible, setNearByVisible] = useState<boolean>(false);
  const [live, setLive] = useState<boolean>(false);

  const [airportByCountry, setAirportByCountry] = useState<boolean>(false);
  const [airportByCode, setAirportByCode] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('');
  const [icaoCode, setIcaoCode] = useState<string>('');


  const chooseOption = {
    searching: { searchedData, setSearchedData, setSearchingVisible },
    weather: {
      weatherDetails,
      setWeatherDetails,
      weatherVisible,
      setWeatherVisible,
      setSelectedLocation,
      place: { place, setPlace },
    },
    flight: {
      flightVisible,
      setFlightVisible,
      flightData,
      setFlightData,
      origin: { origin, setOrigin },
    },
    nearby: { nearbyVisible, setNearByVisible },
    live: { live, setLive },
    airport: {
      airportByCountry,
      setAirportByCountry,
      airportByCode,
      setAirportByCode,
      country: { country, setCountry },
      code: { icaoCode, setIcaoCode },
    },
  };

  const [triggerWeather, { data: weatherData }] =
    useLazyGetWeatherByCoordsQuery();

  useEffect(() => {
    if (selectedLocation) {
      triggerWeather({ lat: selectedLocation.lat, lon: selectedLocation.lon });
    }
  }, [selectedLocation, triggerWeather]);

  const handleLogout = () => {
    signOut(auth);
    dispatch(updateAuthTokenRedux({ token: null }));
  };

  const inputRef = useRef<HTMLDivElement>(null);
  const inputRef1 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!inputRef.current?.contains(event.target as Node)) {
        setSearchBar(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h1">
      <div className="h2">
        <img src={ICONS.headerLogo} alt="Header Logo" />
      </div>
      <div className="h5">
        <div className="refrence-to-options" ref={inputRef}>
          <div className="h7" onClick={() => {!weatherVisible && !weatherDetails && !flightVisible && !flightData && !airportByCountry  && !airportByCode && !searchingVisible  && !live  && !nearbyVisible && setSearchBar(true)}}>
            {
              <div className="h3" ref={inputRef1}>
                <img src={ICONS.search} alt="Search Icon" />
               <span>Search</span>
              </div>
            }
          </div>
          {searchBar && (
            <SearchBar
              chooseOption={chooseOption}
              setSearchBar={setSearchBar}
            />
          )}
          {weatherVisible && (
            <Weather chooseOption={chooseOption} setSearchBar={setSearchBar} />
          )}
          {weatherDetails && weatherData && (
            <div
              className="weather-details"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <Button
                  onClick={() => {
                    setWeatherDetails(false);
                    setWeatherVisible(true);
                  }}
                  label="x"
                />
              </div>
              <h2>
                <strong>{place}</strong>
              </h2>
              <p>
                <strong>Weather:</strong> {weatherData.weather[0]?.description}
              </p>
              <p>
                <strong>Temperature:</strong> {weatherData.main?.temp}°C
              </p>
              <p>
                <strong>Humidity:</strong> {weatherData.main?.humidity}%
              </p>
              <p>
                <strong>Wind Speed:</strong> {weatherData.wind?.speed} m/s
              </p>
            </div>
          )}
          {flightVisible && (
            <FlightByRoute
              chooseOption={chooseOption}
              setSearchBar={setSearchBar}
            />
          )}
          {flightData && <FlightInformation chooseOption={chooseOption} />}
          {nearbyVisible && (
            <Nearby
              chooseOption={chooseOption}
              setSearchBar={setSearchBar}
              setSelectedLocation={setSelectedLocation}
              setFlight={setFlight}
            />
          )}
          {airportByCountry && (
            <Airports chooseOption={chooseOption} setSearchBar={setSearchBar} />
          )}
          {airportByCode && (
            <AirportCountryFlights chooseOption={chooseOption} />
          )}
          {searchingVisible &&  <Searching chooseOption={chooseOption} />}
          {live && (
            <Live chooseOption={chooseOption} setSearchBar={setSearchBar} />
          )}
        </div>
        <div className="h4">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ToCheck;
