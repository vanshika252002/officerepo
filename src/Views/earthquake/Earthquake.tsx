import './earthquake.css';
import {useState} from 'react';
//import { earthquakeApi } from '../../Services/Api/earthquake';
import { useDebounce } from '../debouncing/useDebounce';
import { useGetEarthquakesQuery } from '../../Services/Api/earthquake';
import { skipToken } from '@reduxjs/toolkit/query';

const Earthquake=()=>{
   const [startTime,setStartTime]=useState<string|null>("2024-03-01");
   const [endTime,setEndTime]=useState<string|null>("2024-04-01")
   const debounceStartTime=useDebounce(startTime,600);
const debouncedEndTime=useDebounce(endTime,600);
    const {data:earthquakeData} = useGetEarthquakesQuery(startTime && endTime ?{startTime :debounceStartTime,endTime:debouncedEndTime}:skipToken);
const earthquakeList = earthquakeData?.features?.map((item)=>{if(item.properties.alert)
    console.log(item.properties.alert)})
 //console.log( ` earthquake magnitude ${item.properties.mag} place ${item.properties.place} time ${item.properties.time} `)})
  // console.log("earthquake data" , earthquakeData);




 const Timestamp=(timestamp)=>{
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
           
            {earthquakeData && <div className="earthquake-list">{earthquakeData?.features?.map((item)=>(<div className='items'>
    <div className='earthquake-magnitude'><span>{item.properties.mag}</span></div>
    <div className='earthquake-properties'>
        <div className='place'> <h4><strong>{item.properties.place}</strong></h4></div>
        <div className='time'> <h5>{Timestamp(item.properties.time)}</h5></div>
    </div>
    </div> ))}</div>}
                
            
            
          </div>
    )
}
export default Earthquake;



