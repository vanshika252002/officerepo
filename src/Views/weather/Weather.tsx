import { useEffect, useState } from 'react';
import { Input ,Button} from '../../Components/Common';
import Loading from '../loading';
import{ useLazyGetGeolocationByCoordsQuery } from "../../Services/Api/geolocation";
import { useDebounce } from '../debouncing/useDebounce';
// import { useGetWeatherByCoordsQuery } from "../../Services/Api/weather";
import './weather.css'
interface weatherprops{
chooseOption:any;
 setSearchBar:any;

}
function Weather({chooseOption,setSearchBar}:weatherprops) {
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
      <div className='weather-btn'><Button onClick={()=>{chooseOption.weather.setWeatherVisible(false);setSearchBar(true)}} label="x"/></div>
      <div>
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
      <div 
        key={index} 
        className="custom-item" 
        onClick={() =>{ chooseOption.weather.place.setPlace(location.formatted),chooseOption.weather.setSelectedLocation({ lat: location.geometry.lat, lon: location.geometry.lng }),chooseOption.weather.setWeatherVisible(false),chooseOption.weather.setWeatherDetails(true)}
   
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