import { useState, useEffect, useRef } from 'react';
//import { useLazyGetWeatherByCoordsQuery } from '../../Services/Api/weather';


import SearchBar from '../searchbar/SearchOptions';
import Weather from '../weather/Weather';
import FlightByRoute from '../flightbyroute';
import FlightInformation from '../flightInformation';
import Nearby from '../nearby';                                                    //components
import Airports from '../airports';
import AirportCountryFlights from '../airportCountryFlights';
import Live from '../live';

import { Props } from './Types/types';                                         //types+css
import { ICONS } from '../../assets';
import './tocheck.css';
import Confirmation from '../Confirmation';

const ToCheck = ({clickedLocation,setSelectedLocation,setFlight,setAlert,setClickedLocation,visible,setVisible,setFly,setFlyToTarget}:Props) => {
// const [visible,setVisible]=useState<string>(""); //visibility,
const [logout,setLogout]=useState<boolean>(false);
//const [clickedLocationWeather, setClickedLocationWeather] = useState<{lat:number,lon:number} | null>(null);

  const [place, setPlace] = useState('');
   const [origin, setOrigin] = useState('');
  const [country, setCountry] = useState<string>('');
  const [icaoCode, setIcaoCode] = useState<string>('');



  

  const chooseOption = {
    weather: {
     
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

  // const [triggerWeather, { data: weatherData }] =
  //   useLazyGetWeatherByCoordsQuery();

  // useEffect(() => {
  //   if (clickedLocationWeather) {
  //     triggerWeather({ lat: clickedLocationWeather.lat, lon: clickedLocationWeather.lon });
  //   }
  // }, [clickedLocationWeather, triggerWeather]);

  const handleLogout = () => {
    //console.log(alert("want to logout ?"));
      setLogout(true);
    // signOut(auth);
    // dispatch(updateAuthTokenRedux({ token: null }));
  };

  const inputRef = useRef<HTMLDivElement>(null);
  const inputRef1 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!inputRef.current?.contains(event.target as Node) && visible!="earthquake-list") {
        setVisible("");
        setFly(false);
        setSelectedLocation(null);
    
        setClickedLocation(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return (
    <div className="h1">
      <div className="h2">
        <img src={ICONS.trackitlive} alt="Header Logo" />
      </div>
      <div className="h5">
        <div className="refrence-to-options" ref={inputRef}>
          <div className="h7" onClick={() => { setVisible("searchbar"),setAlert(false)}}>
            {
              <div className="h3" ref={inputRef1}>
                <img src={ICONS.searching} alt="Search Icon" />
               {/* <span>Search</span> */}
              </div>
            }
          </div>
          {visible=="searchbar"  && (
            <SearchBar
              chooseOption={chooseOption}
              setVisible={setVisible}
              setSelectedLocation={setSelectedLocation}
              setFlight={setFlight}
              setClickedLocation={setClickedLocation}
              
            />
          )}
          {visible=="weather" && (
            <Weather  clickedLocation={clickedLocation} chooseOption={chooseOption} setVisible={setVisible} setClickedLocation={setClickedLocation}  setFly={setFly}
            setFlyToTarget={setFlyToTarget}/>
          )}
          
          {visible=="flight-by-route" && (
            <FlightByRoute
              chooseOption={chooseOption}
             setVisible={setVisible}
            />
          )}
          {visible=="flight-details" && <FlightInformation setFly={setFly}
            setFlyToTarget={setFlyToTarget} chooseOption={chooseOption} setVisible={setVisible}  setFlight={setFlight} setSelectedLocation={setSelectedLocation} />}
          {visible=="nearby" && (
            <Nearby
             setFly={setFly}
              setFlyToTarget={setFlyToTarget}
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
            setFlight={setFlight}    setFly={setFly}
            setFlyToTarget={setFlyToTarget}/>
          )}
          
          {visible=="live-flight" && (
            <Live setVisible={setVisible}    setSelectedLocation={setSelectedLocation}
            setFlight={setFlight}  setFly={setFly}
            setFlyToTarget={setFlyToTarget} />
          )}
        </div>
        <div className="h4">
          <button onClick={handleLogout}>Logout</button>
        </div>
        {logout && <Confirmation setLogout={setLogout}/>}
      </div>
    </div>
  );
};

export default ToCheck;
