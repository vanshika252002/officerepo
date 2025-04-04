import { useState } from 'react';
import FlightInformation from '../flightInformation';

import './flightbyroute.css'
//import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';

const FlightByRoute=({setSearchBar})=>{
   const [flight,setFlight]=useState<boolean>(false);
    const [origin ,setOrigin]=useState<string>("");
  console.log("i am in flight by route ")
    return (
        <div className="flight-by-route-wrappper" onClick={(e)=>{e.stopPropagation();setSearchBar(false)}}>
            <div className="flight-by-route-header">  
                <div className='f1'><button>x</button></div>
                <div className='f2'><span>Flight By Route</span></div>
            </div>

            <div className="flight-by-route"> 
                <div className="flight-by-route-origin"><span>Origin</span></div>
            </div>
            <div className="flight-by-route-search"><input type="text" onChange={(e)=>{setOrigin(e.target.value); }}/></div>
            <div className="flight-by-route-search"><button onClick={()=>{setFlight(true)}}>Search</button></div>
          {origin && flight && <FlightInformation origin={origin}/>}
        
        </div>
    )
}
export default FlightByRoute;