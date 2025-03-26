import { useEffect, useState} from 'react';
import { Input} from '../../Components/Common';
import { useGetGeolocationByCoordsQuery } from "../../Services/Api/geolocation";
import { useGetWeatherByCoordsQuery } from "../../Services/Api/weather";
function Weather() {
  //const  [query,setQuery]=useState<"city"|"airport"|"landmark"|null>(null);
  const [place,setPlace]=useState("");
  
  const [clickedLocation, setClickedLocation] = useState<
      [number, number] | null
    >(null);
    const lat = clickedLocation ? clickedLocation[0] : null;
    const lon = clickedLocation ? clickedLocation[1] : null;
  
    const { data:weatherData,isLoading} = useGetWeatherByCoordsQuery(
      { lat, lon },
      { skip: !lat || !lon }
    );

    const {data} = useGetGeolocationByCoordsQuery(place,{skip:!place||place.length<3});
    useEffect(()=>{
    if(data?.results)
    {
      const matchedData=data.results.find((result:any)=>{
        return (
          result?.components?.city &&
          result?.components?.city ===
            (place.trim().charAt(0).toUpperCase() + place.trim().slice(1).toLowerCase())
        )
      })
      if(matchedData)
      {
        setClickedLocation([matchedData.geometry.lng, matchedData.geometry.lat]);
      }
    }
    },[place,data])
  console.log("weather data ",weatherData);


  
  return (
    <div  className="weather-container-wrapper">
      <div><Input placeholder='Enter the place' onChange={(e)=>setPlace(e.target.value)}/></div>
       
       <div>
        {isLoading && <p>Loading...</p>}
       {place && weatherData && weatherData.weather && weatherData.weather.length > 0 &&(
              <p>
                <h2> <strong>{place}</strong></h2>
                <strong>Weather : </strong>
                {weatherData.weather[0].description}
                <br />
                <strong>Temperature :</strong>
                {weatherData.main.temp}°C
                <br />
                <strong>Humidity :</strong>
                {weatherData.main.humidity}%
                <br />
                <strong>Wind Speed :</strong>
                {weatherData.wind.speed}
              </p>
            )}
       </div>
    </div>
  );
}
export default Weather;




/*
  <div className="weather-container">
        <h2>WEATHER</h2>
      </div>
      <div><Input type="text" placeholder="Enter the place " /></div>
      <div className="weather-options">
        <div>
          <Button label="City"  onClick={()=>setCity("city")}/>
          {city && data}
        </div>
        <div>
          <Button label="Airports" />
        </div>
        <div>
          <Button label="LandMarks" />
        </div>
      </div>
*/