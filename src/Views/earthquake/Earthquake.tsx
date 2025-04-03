import './earthquake.css';
import {useState} from 'react';
//import { earthquakeApi } from '../../Services/Api/earthquake';
import { useDebounce } from '../debouncing/useDebounce';
import { useGetEarthquakesQuery } from '../../Services/Api/earthquake';
import { skipToken } from '@reduxjs/toolkit/query';
import EarthquakeDetails from '../earthquakeDetails';

interface EarthquakeProps {
    endTime:string;
    startTime:string;
    setStartTime:(value:string)=>void;
    setEndTime:(value:string)=>void;
  }
  interface EarthquakeFeature{
    properties:{
        mag:number;
        place:string;
        time:number;
    }
  }

const Earthquake=({startTime="2025-03-01",endTime="2025-04-01",setStartTime,setEndTime}:EarthquakeProps)=>{

    const [selectedEarthquake, setSelectedEarthquake] = useState<EarthquakeFeature | null>(null);


   const debounceStartTime=useDebounce(startTime,600);
const debouncedEndTime=useDebounce(endTime,600);
    const {data:earthquakeData} = useGetEarthquakesQuery(startTime && endTime ?{startTime :debounceStartTime,endTime:debouncedEndTime}:skipToken);
//const earthquakeList = earthquakeData?.features?.map((item)=>{if(item.properties.alert)
 //   console.log(item.properties.alert)})
 //console.log( ` earthquake magnitude ${item.properties.mag} place ${item.properties.place} time ${item.properties.time} `)})
  // console.log("earthquake data" , earthquakeData);
  console.log("selected earthquake is",selectedEarthquake)



 const Timestamp=(timestamp:number)=>{
    const date=new Date(timestamp);
    //console.log("date of the earthquake is ",date);
    date.setMinutes(date.getMinutes()+330);
    return date.toISOString().replace('T',' ').slice(0,19)+"(UTC+05:30)";
 }
 return (
         <div className="earthquake-wrapper">
            <div className="earthquake-header">
                <h2><strong>Earthquake</strong></h2>
            </div>

            <div className='earthquake-timer'> 
            <div className='start'><h3>Start Time</h3><input placeholder='YYYY-MM-DD' type="text" onChange={(e)=>{setStartTime(e.target.value)}}/></div>
            <div className='end'><h3>End Time</h3><input placeholder='YYYY-MM-DD' onChange={(e)=>setEndTime(e.target.value)}/></div>
            </div>
           
            {earthquakeData && <div className="earthquake-list">{earthquakeData?.features?.map((item:EarthquakeFeature)=>(<div className='items'>
    <button className='earthquake-click-option' onClick={()=>{setSelectedEarthquake(item);
    console.log("SELECTED EARTHQUAK INSIDE ON BUTTON CLCIK ",selectedEarthquake);
    }}><div className='earthquake-magnitude'><span>{item.properties.mag}</span></div>
    <div className='earthquake-properties'>
        <div className='place-earthquake'> <h4><strong>{item.properties.place}</strong></h4></div>
        <div className='time-earthquake'> <h5>{Timestamp(item.properties.time)}</h5></div>
    </div></button>
   
    </div> ))}</div>}
                
    {selectedEarthquake && <EarthquakeDetails setSelectedEarthquake={setSelectedEarthquake} place={selectedEarthquake.properties.place} time={Timestamp(selectedEarthquake.properties.time)} lat={selectedEarthquake.geometry.coordinates[0]} lon={selectedEarthquake.geometry.coordinates[1]}/>}   
            
          </div>
    )
}
export default Earthquake;



