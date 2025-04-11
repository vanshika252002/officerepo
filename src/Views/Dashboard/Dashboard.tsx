
import { useState } from "react";
 import Body from "../body/Body";


import ToCheck from "../tocheck/ToCheck";


export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<{
    id: string;
    lat: number;
    lon: number;
    angle: number;
  } | null>(null);

  const [clickedLocation, setClickedLocation] = useState<
  [number, number] | null
>(null);
  
  const [flight, setFlight] = useState<boolean>(false);
return (
  <div>
 
     
      <ToCheck selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} setClickedLocation={setClickedLocation} setFlight={setFlight}/>
      <Body selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} clickedLocation={clickedLocation} setClickedLocation={setClickedLocation}  flight={flight} setFlight={setFlight}/> 

  </div>
);
}