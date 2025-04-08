import { useGetGeolocationByCoordsQuery } from '../../Services/Api/geolocation';
import Loading from '../loading/Loading';
import './airports.css';
const Airports=({chooseOption,setSearchBar})=>{

    const {data:airports,isLoading}= useGetGeolocationByCoordsQuery("airport");
   
    airports?.results?.map((item)=>{
        console.log(item.components.country)
       
    })
     return (
   <div className='airport-wrappper'>
    {isLoading && <Loading/>}
    <div className="airport-header">  
                <div className='airport-f1'><button onClick={()=>{chooseOption.airport.setAirportByCountry(false),setSearchBar(true)}}>x</button></div>
                <div className='airport-f2'><span>Airport By Country</span></div>
            </div>
         <div className='airport-list-wrapper'>
         {[...new Map(
  airports?.results
    ?.map(item => [item.components.country, item])
).values()] 
  .sort((a, b) => a.components.country.localeCompare(b.components.country))
  .map(item => (
    <div className='airport' key={item.components.country}>
      <button className='airport-n1' onClick={()=>{chooseOption.airport.country.setCountry(item.components.country);chooseOption.airport.setAirportByCountry(false)}}>
        <div className='flag'>
          <span>{item.annotations.flag}</span>
        </div>
        <div className='country'>
          <span>{item.components.country}</span>
        </div>
      </button>
    </div>
))}

       
                    </div>
                    
   </div>
    )
}
export default Airports;