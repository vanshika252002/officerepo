import './live.css';
import { ICONS } from '../../assets';
import { useMemo } from 'react';
import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
import {FlightData } from './Types/types';
interface Props{
  chooseOption:{live:{setLive:(value:boolean)=>void}};
  setSearchBar:(value:boolean)=>void
}
const Live=({chooseOption,setSearchBar}:Props)=>{
    const { data: LiveFlights } = useGetAllFlightsQuery(null);

    const flightsByOrigin = useMemo<Record<string, FlightData[]>>(() => {
      if (!LiveFlights?.states) return {};
    
      return LiveFlights.states.reduce((acc: Record<string, FlightData[]>, flight: any[]) => {
        const [
          icao,            
          ,                
          originCountry,   
          , ,              
          lon,             
          lat,
          alt  
          
        ] = flight;
        if (!acc[originCountry]) {
          acc[originCountry] = [];
        }
    
        acc[originCountry].push({
          icao,
          lon,
          lat,
          alt
        });
    
        return acc;
      }, {});
    }, [LiveFlights]);
    console.log(flightsByOrigin);
    
    return (
        <div className='airport-wrappper'>
       
           <div className="airport-header">  
                          <div className='airport-f1'><button onClick={()=>{chooseOption.live.setLive(false),setSearchBar(true)}}><img src={ICONS.arrow} /></button></div>
                          <div className='airport-f2'><span>Live Flights</span></div>
                      </div>
                      <div className='f12'>
    {Object.entries(flightsByOrigin).map(([country, flights]) => (
      <div key={country} style={{ marginBottom: '20px' }}>
        <button>{country}</button>
        <ul>
          {flights.map(({ icao, alt, lon }:FlightData ) => (
            <li key={icao}>
              ICAO: <strong>{icao}</strong> | Altitude: <strong>{alt}</strong> | Longitude: <strong>{lon}</strong>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
                      
        </div>
    )
}
export default Live;