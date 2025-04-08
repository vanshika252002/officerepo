import './airportCountryFlights.css';
import { ICONS } from '../../assets';
//import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
import { useGetGeolocationByCoordsQuery } from '../../Services/Api/geolocation';
import Loading from '../loading/Loading';


const AirportCountryFlights=()=>{
    const {data:airports,isLoading}= useGetGeolocationByCoordsQuery("airport");
       
        // airports?.results?.map((item)=>{
        //     console.log("pp",item.formatted)
           
        // })

const seen = new Set();

airports?.results?.forEach((item) => {
  const address = item.formatted;
  if (!seen.has(address)) {
    seen.add(address);
    console.log("🛫 Unique Airport:", address);
  }
});




//  const {data:flightData,isLoading}=useGetAllFlightsQuery(null);
//  flightData?.states?.map((detail)=>{if(detail[2]=="India")
//     console.log("detail code ",detail[0],detail[2],detail[5],detail[6])
//  })
    return (
        <div className='country-flight-wrappper'>
        {isLoading  && <Loading/>}
        
        <div className="country-flight-header">  
                    <div className='country-flight-f1'><button onClick={()=>{chooseOption.airport.setAirportByCountry(false),setSearchBar(true)}}>x</button></div>
                    <div className='country-flight-f2'><span>Country Flights </span></div>
                </div>

                <div className="country-flight-search"><input type="text" placeholder="Enter Icao code"/></div>

                <div className='country-flight-list-wrapper'>
         {
  airports?.results?.map(item => (
    <div className='airports' key={item.components.country}>
      <button className='airport-country-n1' onClick={()=>{chooseOption.airport.country.setCountry(item.components.country);chooseOption.airport.setAirportByCountry(false)}}>
        <div className='logo'>
          <img src={ICONS.airports}/>
        </div>
        <div className='formatted'>
          <span>{item.formatted}</span>
        </div>
      </button>
    </div>
))}

       
                    </div>

          </div>

    )
}
export default AirportCountryFlights;