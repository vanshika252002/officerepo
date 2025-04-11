//import { useNavigate } from 'react-router-dom';
//import { useState } from 'react';
// import { Button } from "../../Components/Common";
import './searchoptions.css';
import { ICONS } from '../../assets';
type SearchbarProps={
 chooseOption:any;
 setSearchBar:any;
}
function SearchBar({chooseOption,setSearchBar}:SearchbarProps) {
 
console.log("weather visible in weather",chooseOption.weather.weatherVisible)
  return (
    <div className="searchbar-wrapper">
      <div className="search_shortcuts">
        <h2>SHORTCUTS TO FIND</h2>
      </div>
      <div className="searchbar-options">
        <ul>
          <li onClick={(e) => {e.stopPropagation(); setSearchBar(false) ; chooseOption.weather.setWeatherVisible(true);}}>
            <img src={ICONS.weather} />
            Weather
          </li>
          <li onClick={(e) =>{e.stopPropagation();setSearchBar(false);chooseOption.flight.setFlightVisible(true)}}>
            <img src={ICONS.flightroute} />
            Flight by route
          </li>
          <li onClick={(e)=>{e.stopPropagation();setSearchBar(false); chooseOption.live.setLive(true)}}>
            <img src={ICONS.liveairplane} />
            LIVE flight by airplane
          </li>
          <li onClick={(e)=>{e.stopPropagation();setSearchBar(false);chooseOption.airport.setAirportByCountry(true)}}>
            <img src={ICONS.airports} /> Airports
          </li>
          <li onClick={(e)=>{e.stopPropagation();setSearchBar(false);chooseOption.nearby.setNearByVisible(true)}}>
            <img src={ICONS.nearby} /> Nearby
          </li>
        </ul>
      </div>
     
    </div>
    
  );
}
export default SearchBar;