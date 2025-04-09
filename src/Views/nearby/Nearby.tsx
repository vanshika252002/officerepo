
import { useEffect, useState ,useMemo} from 'react';
import './nearby.css';
import {useGetAllFlightsQuery} from '../../Services/Api/liveflight';
import Loading from '../loading/Loading';

type details=[string,string,string,number,number,number,number,number,boolean,number]
interface nearbyProps{
  chooseOption:{
    nearby:{setNearByVisible:(value:boolean)=>void}
  };
  setSearchBar:(value:boolean)=>void;
}

const Nearby=({chooseOption,setSearchBar}:nearbyProps)=>{
    const [lat,setLat]=useState<number|null>(null);
    const [lon,setLon]=useState<number |null>(null);
    const {data:liveflight,isLoading}=useGetAllFlightsQuery(null);
    const FlightDetails=liveflight?.states||null;
   console.log("1")
   useEffect(()=>{
    console.log("3");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);
                console.log("lat", position.coords.latitude,"lon",position.coords.longitude);
            },
            (error) => {
              console.error("Error getting location:", error.message);
            }
          );
    }
   },[])
      
      function getDistanceFromLatLonInKm(lat1:number, lon1:number, lat2:number, lon2:number) {
        console.log("2")
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d; 
      }
      const nearbyFlights = useMemo(() => {
        return FlightDetails?.filter((details:details) => {
          const flightLat = details[6]; 
          const flightLon = details[5]; 
          if (flightLat && flightLon && lat!==null && lon!==null) {
            const distance = getDistanceFromLatLonInKm(lat, lon, flightLat, flightLon);
            return distance <= 500; 
          }
          return false;
        });
      }, [FlightDetails, lat, lon]);
    
      
    return (
        <div className='near-by-wrappper'>
             <div className="near-by-header">  
                <div className='near-by-f1'><button onClick={()=>{setSearchBar(true); chooseOption.nearby.setNearByVisible(false)}}>x</button></div>
                <div className='near-by-f2'><span>Nearby</span></div>
            </div>
            {!lat && !lon && <Loading/>}
          { isLoading  && <Loading/>} 
             {/* {isLoading  && <div className='near-by-loading'> Loading....</div>} */}
                 
                 {<div className='near-by-list-wrapper'>
                  {  nearbyFlights?.map((details:details)=>(
                <div className='nearby'>
                    <div className='n11'>
                        <h2>{details[2]}</h2>
                        </div>

                        <div className='n1'>
                        <div className='n2'><span>Icao Code :</span></div>
                        <div className='n3'><span>{details[0]}</span></div>
                        </div>
                        <div className='n1'>
                        <div className='n2'><span>Latitude :</span></div>
                        <div className='n3'><span>{details[6]}</span></div>
                        </div>
                        <div className='n1'>
                        <div className='n2'><span>Longitude :</span></div>
                        <div className='n3'><span>{details[5]}</span></div>
                        </div>
                        <div className='n1'>
                        <div className='n2'><span>Velocity :</span></div>
                        <div className='n3'><span>{details[9]}</span></div>
                        </div>
        
                    </div>
               ))}
                    </div>
                    }
            </div>
    )
}
export default Nearby;