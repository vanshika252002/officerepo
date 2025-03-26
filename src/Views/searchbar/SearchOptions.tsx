import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { Button } from "../../Components/Common";
import Weather from '../weather/Weather';
import './searchoptions.css';
import { ICONS } from '../../assets';
type SearchbarProps={
  setSearchBar:(value:boolean)=>void;
}
function SearchBar({setSearchBar}:SearchbarProps) {
  const navigate = useNavigate();
  const [weather,setWeather]=useState(false);

  return (
    <div className="searchbar-wrapper">
      <div className="search_shortcuts">
        <h2>SHORTCUTS TO FIND</h2>
      </div>
      <div className="searchbar-options">
        <ul>
          <li onClick={() =>{setWeather(true);setSearchBar(false)}}>
            <img src={ICONS.weather} />
            Weather
          </li>
          <li onClick={() => navigate('')}>
            <img src={ICONS.flightroute} />
            Flight by route
          </li>
          <li>
            <img src={ICONS.liveairplane} />
            LIVE flight by airplane
          </li>
          <li>
            <img src={ICONS.flighthistory} /> Flight history
          </li>
          <li>
            <img src={ICONS.airports} /> Airports
          </li>
          <li>
            <img src={ICONS.nearby} /> Nearby
          </li>
        </ul>
      </div>
      {weather && (
  <div className="weather-overlay">
    <div><button className="close-btn" onClick={() =>{ setWeather(false);setSearchBar(true)}}>✖</button></div>
    <Weather />
  </div>
)}
    </div>
    
  );
}
export default SearchBar;