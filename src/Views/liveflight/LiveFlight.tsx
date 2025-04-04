//import { ICONS } from '../../assets';
//import FlightInformation from '../flightInformation';
import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
import './liveflight.css'
const LiveFlight=()=>{
 
     const {data:liveflight}=useGetAllFlightsQuery(null);
        const FlightDetails=liveflight?.states||null;
    
    FlightDetails?.map((details:[string,string,string,number,number,number,number,number,boolean,number,number,number,number[],number,string,boolean,number,number])=>{
        details[5] && details[6] && console.log("flight info",details[2]," ",details[0]," ",details[5]," ",details[6], "type of origin ",(origin.charAt(0).toUpperCase()+origin.slice(1)).trim(),details[2])
    })
    
    return(
        <div className="l-f-1">
          <div className="l-f-header">  
                <div className='l-f-header-btn'><button>x</button></div>
                <div className='l-f-header-span'><span> LIVE flight</span></div>
            </div>
            <div className="l-f-search"><input type="text" placeholder=' EnterICAO code or Origin ' /></div>
            <div className='l-f'>
            {FlightDetails?.map((details:[string,string,string,number,number,number,number,number,boolean,number,number,number,number[],number,string,boolean,number,number])=>( 
                details[5]&& details[6] && (
                <div key={details[0]} className='wrapper-for-flight-information'>
                <div className='flightInformation-origin'>
                    <div className='fi-o1'><span>Icao24 code</span></div>
                    <div className='fi-o2'><span>{details[0]}</span></div>
                </div>
                    </div>
                ))
               )}
           
            </div>
        </div>
    )
}
export default LiveFlight;