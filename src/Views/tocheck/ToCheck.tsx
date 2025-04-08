import { useState ,useEffect,useRef} from 'react';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux'
import { auth } from '../../Components/firebase';
import { Button } from '../../Components/Common';
import { useGetWeatherByCoordsQuery } from '../../Services/Api/weather';
import { updateAuthTokenRedux } from '../../Store/Common';
import './tocheck.css';
import { ICONS } from '../../assets';
import SearchBar from '../searchbar/SearchOptions';
import Weather from '../weather/Weather';
import FlightByRoute from '../flightbyroute';
import FlightInformation from '../flightInformation';
import Nearby from '../nearby';
import Airports from '../airports';

const ToCheck=()=>{
    const dispatch = useDispatch();
    const [searchBar, setSearchBar] = useState<boolean>(false);
    const [weatherDetails, setWeatherDetails] = useState<boolean>(false);  //weather 
  const [weatherVisible,setWeatherVisible]=useState<boolean>(false);
  const [place, setPlace] = useState(""); 
  

  const [flightVisible,setFlightVisible]=useState<boolean>(false);
  const [flightData,setFlightData]=useState<boolean>(false);           //flight by route
    const [origin,setOrigin]=useState("");
    
const [nearbyVisible ,setNearByVisible]=useState<boolean>(false);     //nearby

const [airportByCountry ,setAirportByCountry]=useState<boolean>(false);   //airport by country
const [country,setCountry]=useState<string>("");


    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lon: number } | null>(null);
 
    const chooseOption={weather:{weatherDetails,setWeatherDetails,weatherVisible,setWeatherVisible,setSelectedLocation,place:{place,setPlace}},
  flight:{flightVisible,setFlightVisible,flightData,setFlightData,origin:{origin,setOrigin}}
     , nearby:{nearbyVisible,setNearByVisible},
     airport:{airportByCountry,setAirportByCountry,country:{country,setCountry}}
};  //chooseOption 




    const { data: weatherData } = useGetWeatherByCoordsQuery(
      { lat: selectedLocation?.lat, lon: selectedLocation?.lon },
      { skip: !selectedLocation }
    );

    
const handleLogout = () => {
signOut(auth);
dispatch(updateAuthTokenRedux({ token: null }));

  };

    const inputRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
       // console.log('input refrence ', inputRef.current);
        function handleClickOutside(event: MouseEvent) {
          if (!inputRef.current?.contains(event.target as Node)) {
            setSearchBar(false);
          }
        }
    document.addEventListener('mousedown', handleClickOutside);
    return ()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    }}, []);
  console.log("weather visisble",weatherVisible)
   

console.log("country selected",country);


    return(
        <div  className="h1">
            <div className="h2"><img src={ICONS.headerLogo}/></div>
            <div className='h5'>

            <div className='refrence-to-options' ref={inputRef}>
            <div className="h7" onClick={()=>setSearchBar(true)}>
                <div className='h3'><img src={ICONS.searchLogo}/><input type="text" /></div>
            </div>
                {searchBar && <SearchBar chooseOption={chooseOption} setSearchBar={setSearchBar} />}
               {weatherVisible && <Weather chooseOption={chooseOption} setSearchBar={setSearchBar}/>}
               {weatherDetails && weatherData && <div className='weather-details' onClick={(e)=>e.stopPropagation()}>
  <div><Button  onClick={()=>{setWeatherDetails(false); setWeatherVisible(true)}} label="x"/></div>
  <h2><strong>{place}</strong></h2>
  <p><strong>Weather:</strong> {weatherData.weather[0]?.description}</p>
  <p><strong>Temperature:</strong> {weatherData.main?.temp}°C</p>
  <p><strong>Humidity:</strong> {weatherData.main?.humidity}%</p>
  <p><strong>Wind Speed:</strong> {weatherData.wind?.speed} m/s</p>
</div>}

{flightVisible &&  <FlightByRoute chooseOption={chooseOption} setSearchBar={setSearchBar}/>}
{flightData && <FlightInformation chooseOption={chooseOption}  />}


   {nearbyVisible && <Nearby chooseOption={chooseOption} setSearchBar={setSearchBar}/>}     
   {airportByCountry && <Airports chooseOption={chooseOption} setSearchBar={setSearchBar}/>}   
            </div>
            <div className="h4"><button onClick={handleLogout}>Logout</button></div>
            </div>
            
        </div>


    )
}
export default ToCheck;