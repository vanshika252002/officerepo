//import { useNavigate } from 'react-router-dom';
//import { useState } from 'react';
// import { Button } from "../../Components/Common";
import './searchoptions.css';
import { ICONS } from '../../assets';
type SearchbarProps={
 chooseOption:any;
 setVisible:any;
}
function SearchBar({chooseOption,setVisible}:SearchbarProps) {
 
console.log("weather visible in weather",chooseOption.weather.weatherVisible)
  return (
    <div className="searchbar-wrapper">
      <div className="search_shortcuts">
        <h2>SHORTCUTS TO FIND</h2>
      </div>
      <div className="searchbar-options">
        <ul>
          <li onClick={(e) => {e.stopPropagation(); setVisible("weather") ; }}>
            <img src={ICONS.weather} />
            Weather
          </li>
          <li onClick={(e) =>{e.stopPropagation();setVisible("flight-by-route")}}>
            <img src={ICONS.flightroute} />
            Flight by route
          </li>
          <li onClick={(e)=>{e.stopPropagation(); setVisible("live-flight")}}>
            <img src={ICONS.liveairplane} />
            LIVE flight by airplane
          </li>
          <li onClick={(e)=>{e.stopPropagation();setVisible("airports")}}>
            <img src={ICONS.airports} /> Airports
          </li>
          <li onClick={(e)=>{e.stopPropagation();setVisible("nearby")}}>
            <img src={ICONS.nearby} /> Nearby
          </li>
        </ul>
      </div>
     
    </div>
    
  );
}
export default SearchBar;