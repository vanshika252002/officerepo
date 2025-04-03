import { useNavigate } from 'react-router-dom';
//import { useState } from 'react';
// import { Button } from "../../Components/Common";
import './searchoptions.css';
import { ICONS } from '../../assets';
type SearchbarProps={
  setSearchBar:(value:boolean)=>void;
  setWeatherVisible:(value:boolean)=>void;
  weatherVisible:boolean;
}
function SearchBar({setSearchBar,setWeatherVisible,weatherVisible}:SearchbarProps) {
  const navigate = useNavigate();
  
console.log("weather visible",weatherVisible)
  return (
    <div className="searchbar-wrapper">
      <div className="search_shortcuts">
        <h2>SHORTCUTS TO FIND</h2>
      </div>
      <div className="searchbar-options">
        <ul>
          <li onClick={(e) => {e.stopPropagation(); setSearchBar(false) ; setWeatherVisible(true);}}>
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
            <img src={ICONS.airports} /> Airports
          </li>
          <li>
            <img src={ICONS.nearby} /> Nearby
          </li>
        </ul>
      </div>
     
    </div>
    
  );
}
export default SearchBar;