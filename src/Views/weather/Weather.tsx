import { useEffect, useState } from 'react';
import{ useLazyGetGeolocationByCoordsQuery } from "../../Services/Api/geolocation";

import Loading from '../loading';
import { useDebounce } from '../debouncing/useDebounce';
import { Input } from '../../Components/Common';



import { Weatherprops } from './Types/types';
import { ICONS } from '../../assets';
import './weather.css'

function Weather({chooseOption,setVisible,setClickedLocation,setFly,setFlyToTarget}:Weatherprops) {
  const [city, setCity] = useState(""); 
  const [locations, setLocations] = useState([]); 
 const debouncedCity = useDebounce(city, 400);

 const [triggerGeolocationQuery, { data,isLoading }] = useLazyGetGeolocationByCoordsQuery();
 useEffect(() => {
  const trimmedCity = debouncedCity.trim();
  if (trimmedCity.length >= 3) {
    triggerGeolocationQuery(trimmedCity);
  } else {
    setLocations([]); 
  }
}, [debouncedCity, triggerGeolocationQuery]);


  useEffect(() => {
    if (data?.results) {
      setLocations(data.results);
    }else{
      setLocations([])
    }
  }, [data]);

//console.log("setWeathervisible",weatherVisible)
  return (
    <div className="weather-container-wrapper" onClick={(e)=>e.stopPropagation()}>
      <div className='weather-btn'>
      <button onClick={()=>{setVisible("searchbar");setFly(false)}}> <img src={ICONS.arrow}/></button>
      <div className='w1'><span>Weather</span></div>
      </div>
      
      <div className='w2'>
        <Input placeholder="Enter a place" onChange={(e) => {setCity(e.target.value)}} />
      </div>
      {isLoading && <Loading />}

{!isLoading && debouncedCity && locations.length === 0 && (
  <div>Location is not found</div>
)}

   
  <div className="locations-list">
    {locations.length > 0 && (
      <div><h3>Select a Location:</h3> </div>
    )}
    <div className='scroll-weather'>
    {locations.map((location: any, index: number) => (
      <button
        key={index} 
        className="custom-item" 
        onClick={() =>{ chooseOption.weather.place.setPlace(location.formatted),chooseOption.weather.setClickedLocationWeather({lat:location.geometry.lat,lon:location.geometry.lng}),setClickedLocation([location?.geometry?.lat,location?.geometry?.lng,chooseOption.weather.place.place]) ,setFly(true),setFlyToTarget([location?.geometry?.lat,location?.geometry?.lng])}
        
      }
      >
        <strong>{location.formatted}</strong>  ({location.geometry.lat}, {location.geometry.lng})
      </button>
    ))}
    </div>
    
  </div>
   
   
   </div>
    
 

  );
}

export default Weather;