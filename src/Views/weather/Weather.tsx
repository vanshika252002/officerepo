import { useEffect, useState } from 'react';
import { Input ,Button} from '../../Components/Common';
import { useGetGeolocationByCoordsQuery } from "../../Services/Api/geolocation";
// import { useGetWeatherByCoordsQuery } from "../../Services/Api/weather";
import './weather.css'
type weatherprops={
  setSearchBar:(value:boolean)=>void;
  setWeatherVisible:(value:boolean)=>void;
  setSelectedLocation: (location: { lat: number; lon: number }) => void;
  setWeatherDetails:(value:boolean)=>void
 
}
function Weather({setWeatherVisible,setSearchBar,setSelectedLocation,setWeatherDetails}:weatherprops) {
  const [place, setPlace] = useState(""); 
  const [locations, setLocations] = useState([]); 
 // const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lon: number } | null>(null);
  const { data } = useGetGeolocationByCoordsQuery(place, { skip: !place || place.length < 3 });

  useEffect(() => {
    if (data?.results) {
      setLocations(data.results);
    }
  }, [data]);

//console.log("setWeathervisible",weatherVisible)
  return (
    <div className="weather-container-wrapper" onClick={(e)=>e.stopPropagation()}>
      <div><Button onClick={()=>{setWeatherVisible(false);setSearchBar(true)}} label="x"/></div>
      <div>
        <Input placeholder="Enter a place" onChange={(e) => {setPlace(e.target.value)}} />
      </div>
  <div className="locations-list">
    {locations.length > 0 && (
      <div><h3>Select a Location:</h3> </div>
    )}
    <div className='scroll-weather'>
    {locations.map((location: any, index: number) => (
      <div 
        key={index} 
        className="custom-item" 
        onClick={() =>{ setSelectedLocation({ lat: location.geometry.lat, lon: location.geometry.lng }),setWeatherVisible(false),setWeatherDetails(true)}
   
      }
      >
        <strong>{location.formatted}</strong>  ({location.geometry.lat}, {location.geometry.lng})
      </div>
    ))}
    </div>
    
  </div>
   
   
   </div>
    
 

  );
}

export default Weather;