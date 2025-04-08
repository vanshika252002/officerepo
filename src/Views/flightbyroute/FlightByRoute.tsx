// import { useState } from 'react';
// import FlightInformation from '../flightInformation';

import './flightbyroute.css'
//import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';

const FlightByRoute=({chooseOption,setSearchBar})=>{
   //const [flight,setFlight]=useState<boolean>(false);
   // const [origin ,setOrigin]=useState<string>("");

    return (
        <div className="flight-by-route-wrappper">
            <div className="flight-by-route-header">  
                <div className='f1' onClick={()=>{setSearchBar(true); chooseOption.flight.setFlightVisible(false)}}><button>x</button></div>
                <div className='f2'><span>Flight by route</span></div>
            </div>

            <div className="flight-by-route"> 
                <div className="flight-by-route-origin"><span>Origin</span></div>
            </div>
            <div className="flight-by-route-search"><input type="text" onChange={(e)=>{chooseOption.flight.origin.setOrigin(e.target.value);}} placeholder="Enter country"/></div>
            <div className="flight-by-route-search"><button onClick={()=>{chooseOption.flight.setFlightData(true);chooseOption.flight.setFlightVisible(false)}}>Search</button></div>
        
        
        </div>
    )
}
export default FlightByRoute;