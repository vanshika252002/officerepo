import { SearchbarProps } from './Types/types';
import './searchoptions.css';
import { ICONS } from '../../assets';

function SearchBar({chooseOption,setVisible,setSelectedLocation,setFlight,setClickedLocation}:SearchbarProps) {
 
console.log("weather visible in weather",chooseOption.weather.weatherVisible)
  return (
    <div className="searchbar-wrapper">
      <div className="search_shortcuts">
        <h2>SHORTCUTS TO FIND</h2>
      </div>
      <div className="searchbar-options">
        <ul onClick={(e) => {e.stopPropagation()}}>
          <li onClick={() => { setVisible("weather") ;setSelectedLocation(null);setClickedLocation(null),setFlight(false) }}>
            <img src={ICONS.weather} />
            Weather
          </li>
          <li onClick={() =>{setVisible("flight-by-route")}}>
            <img src={ICONS.flightroute} />
            Flight by route
          </li>
          <li onClick={()=>{ setVisible("live-flight")}}>
            <img src={ICONS.liveairplane} />
            LIVE flight by airplane
          </li>
          <li onClick={()=>{setVisible("airports")}}>
            <img src={ICONS.airports} /> Airports
          </li>
          <li onClick={()=>{setVisible("nearby")}}>
            <img src={ICONS.nearby} /> Nearby
          </li>
        </ul>
      </div>
     
    </div>
    
  );
}
export default SearchBar;