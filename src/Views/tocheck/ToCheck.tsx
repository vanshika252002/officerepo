import { useState, useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../../Components/firebase';

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
//import Searching from '../searching';
import Live from '../live';

interface Props{
  setFlight:(value:boolean)=>void;
  selectedLocation:{id:string,lat:number|null,lon:number|null}|null;
  setSelectedLocation:(location:{id:string,lat:number|null,lon:number|null}|null)=>void;
  setClickedLocation: (location: [number, number] | null) => void;
}
const ToCheck = ({setSelectedLocation,setFlight}:Props) => {
  const dispatch = useDispatch();

const [visible,setVisible]=useState<string>(""); //visibility
const [clickedLocationWeather, setClickedLocationWeather] = useState<
{lat:number,lon:number} | null
>(null);

  const [place, setPlace] = useState('');
   const [origin, setOrigin] = useState('');
  const [country, setCountry] = useState<string>('');
  const [icaoCode, setIcaoCode] = useState<string>('');


  const chooseOption = {
    weather: {
      setClickedLocationWeather,
      place: { place, setPlace },
    },
    flight: {
    
      origin: { origin, setOrigin },
    },
   
   
    airport: {
  
      country: { country, setCountry },
      code: { icaoCode, setIcaoCode },
    },
  };

  const [triggerWeather, { data: weatherData }] =
    useLazyGetWeatherByCoordsQuery();

  useEffect(() => {
    if (clickedLocationWeather) {
      triggerWeather({ lat: clickedLocationWeather.lat, lon: clickedLocationWeather.lon });
    }
  }, [clickedLocationWeather, triggerWeather]);

  const handleLogout = () => {
    signOut(auth);
    dispatch(updateAuthTokenRedux({ token: null }));
  };

  const inputRef = useRef<HTMLDivElement>(null);
  const inputRef1 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!inputRef.current?.contains(event.target as Node)) {
        setVisible("");
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
        <img src={ICONS.trackitlive} alt="Header Logo" />
      </div>
      <div className="h5">
        <div className="refrence-to-options" ref={inputRef}>
          <div className="h7" onClick={() => { setVisible("searchbar")}}>
            {
              <div className="h3" ref={inputRef1}>
                <img src={ICONS.search} alt="Search Icon" />
               {/* <span>Search</span> */}
              </div>
            }
          </div>
          {visible=="searchbar"  && (
            <SearchBar
              chooseOption={chooseOption}
              setVisible={setVisible}
            />
          )}
          {visible=="weather" && (
            <Weather chooseOption={chooseOption} setVisible={setVisible} />
          )}
          {visible=="weatherdetails" && weatherData && (
            <div
              className="weather-details-ww"
              onClick={(e) => e.stopPropagation()}
            >
               <div className='weather-btn'>
      <button onClick={()=>{setVisible("weather")}}> <img src={ICONS.arrow}/></button>
      <div className='w1'><span>Weather</span></div>
      </div>
              <div className='weather-ww1'>
              <h3>
                <strong>{place}</strong>
              </h3>
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
            </div>
          )}
          {visible=="flight-by-route" && (
            <FlightByRoute
              chooseOption={chooseOption}
             setVisible={setVisible}
            />
          )}
          {visible=="flight-details" && <FlightInformation chooseOption={chooseOption} setVisible={setVisible} />}
          {visible=="nearby" && (
            <Nearby
            
              
              setSelectedLocation={setSelectedLocation}
              setFlight={setFlight}
              setVisible={setVisible}
            />
          )}
          {visible=="airports" && (
            <Airports chooseOption={chooseOption} setVisible={setVisible} />
          )}
          {visible=="airport-by-code" && (
            <AirportCountryFlights chooseOption={chooseOption} setVisible={setVisible} setSelectedLocation={setSelectedLocation}
            setFlight={setFlight}/>
          )}
          
          {visible=="live-flight" && (
            <Live setVisible={setVisible}    setSelectedLocation={setSelectedLocation}
            setFlight={setFlight} />
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
