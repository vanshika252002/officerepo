import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
import './flightInformation.css';
interface FlightInformationProps{
    origin:string}
const FlightInformation=({origin}:FlightInformationProps)=>{
    const {data:liveflight}=useGetAllFlightsQuery(null);
    const FlightDetails=liveflight?.states||null;

FlightDetails?.map((details:[string,string,string,number,number,number,number,number,boolean,number,number,number,number[],number,string,boolean,number,number])=>{
    details[5] && details[6] && console.log("flight info",details[2]," ",details[0]," ",details[5]," ",details[6], "type of origin ",(origin.charAt(0).toUpperCase()+origin.slice(1)).trim(),details[2])
})



    return (
        <div className="flightInformation-wrapper">
          <div className="flightInformation-header">  
                <div className='fi1'><button>x</button></div>
                <div className='fi2'><span>Flights</span></div>
            </div>
          {FlightDetails && <div className='fd'>
            {FlightDetails?.map((details:[string,string,string,number,number,number,number,number,boolean,number,number,number,number[],number,string,boolean,number,number])=>( 
                details[5]&& details[6] &&  (origin.charAt(0).toUpperCase()+origin.slice(1).toLowerCase()==details[2]) && (
                <div key={details[0]} className='wrapper-for-flight-information'>
                     <div className="flightInformation-origin">
                <div className='fi-o1'><span>Origin</span></div>
                <div className='fi-o2'> <span>{details[2]}</span></div>
                </div>
                <div className='flightInformation-origin'>
                    <div className='fi-o1'><span>Icao24 code</span></div>
                    <div className='fi-o2'><span>{details[0]}</span></div>
                </div>
                <div className='flightInformation-origin'>
                    <div className='fi-o1'><span>Latitude</span></div>
                    <div className='fi-o2'><span>----</span></div>
                </div>
                <div className='flightInformation-origin'>
                    <div className='fi-o1'><span>Longitude</span></div>
                    <div className='fi-o2'><span>Longitue</span></div>
                </div>
                    </div>
                ))
               )}
            </div>}

          
        </div>
    )
    }

export default FlightInformation;