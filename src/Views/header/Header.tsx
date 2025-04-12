// import { ReactNode, useState, useRef ,useEffect} from 'react';
// import { signOut } from 'firebase/auth';
// import { useDispatch } from 'react-redux';
// import { auth } from '../../Components/firebase';
// import { useGetWeatherByCoordsQuery } from "../../Services/Api/weather";
// import { updateAuthTokenRedux } from '../../Store/Common';
// import { Button, Input } from '../../Components/Common';
// import Weather from '../weather/Weather';
// import { ICONS } from '../../assets';
// import { DATA } from '..';
// import './header.css';
// import SearchOptions from '../searchbar/SearchOptions';
// const API_KEY = import.meta.env.VITE_GEOLOCATION_API_KEY;
// type HeaderProps = {
//   children?: ReactNode;
// };
// const Header: React.FC<HeaderProps> = () => {
//   console.log("key",API_KEY);
//   const dispatch = useDispatch();
//   const [weatherVisible,setWeatherVisible]=useState<boolean>(false);
//   const inputRef = useRef<HTMLDivElement>(null);
//   const [searchBar, setSearchBar] = useState<boolean>(false);
//   const [weatherDetails, setWeatherDetails] = useState<boolean>(false);
//   const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lon: number } | null>(null);
//   const { data: weatherData } = useGetWeatherByCoordsQuery(
//       { lat: selectedLocation?.lat, lon: selectedLocation?.lon },
//       { skip: !selectedLocation }
//     );
//   console.log("searchbar",searchBar);

//   const handleLogout = () => {
//     // first approach
//     // localStorage.clear();
//     // window.location.reload();
//     // console.log("localstorage is cleared");
// signOut(auth);
// dispatch(updateAuthTokenRedux({ token: null }));

//   };

//   useEffect(() => {
//    // console.log('input refrence ', inputRef.current);
//     function handleClickOutside(event: MouseEvent) {
//       if (!inputRef.current?.contains(event.target as Node)) {
//         setSearchBar(false);
//       }
//     }
// document.addEventListener('mousedown', handleClickOutside);
// return ()=>{
//   document.removeEventListener('mousedown', handleClickOutside);
// }}, []);

//   return (
//     <div className={DATA.HeaderContainer}>
//       <img src={ICONS.headerLogo} alt={DATA.Logo} />
//       <div  className="tocheck" ref={inputRef}>
//         <div 
//           className='search-container'
//           onClick={() => { console.log("searchcontainer in header");

//             !weatherVisible &&   setSearchBar(true)}}
//         >
// <img src={ICONS.searchLogo} alt={DATA.Logo} />
//           <Input type={DATA.TypeText as any}  />
//           {searchBar && <SearchOptions setSearchBar={setSearchBar} setWeatherVisible={setWeatherVisible} weatherVisible={weatherVisible}/>}
//           {weatherVisible && <Weather setSearchBar={setSearchBar} setWeatherVisible={setWeatherVisible} setSelectedLocation={setSelectedLocation} setWeatherDetails={setWeatherDetails}/>}


//         {selectedLocation && weatherData && weatherData.weather && weatherDetails && (

// <div className='weather-details' onClick={(e)=>e.stopPropagation()}>
//   <div><Button  onClick={()=>{setWeatherDetails(false); setWeatherVisible(true)}} label="x"/></div>
//   <h2><strong>Weather</strong></h2>
//   <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
//   <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
//   <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
//   <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
// </div>
// )}

//         </div>
//       </div>
//       <div className="user-profile">
//         <Button label="Logout" onClick={handleLogout} />
//       </div>
//     </div>
//   );
// };

// export default Header;