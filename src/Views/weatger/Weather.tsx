import { Button } from '../../Components/Common';
// import { useGetGeolocationByCoordsQuery } from "../../Services/Api/geolocation";
function Weather() {
  // const {data,isLoading} = useGetGeolocationByCoordsQuery((query))
  return (
    <div className="weather-container-wrapper">
      <div className="weather-container">
        <h2>WEATHER</h2>
      </div>
      <div className="weather-options">
        <div>
          <Button label="Cities" />
        </div>
        <div>
          <Button label="Airports" />
        </div>
        <div>
          <Button label="LandMarks" />
        </div>
      </div>
    </div>
  );
}
export default Weather;
