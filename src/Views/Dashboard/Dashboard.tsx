
import { useState } from "react";
 import Body from "../body/Body";


import ToCheck from "../tocheck/ToCheck";


export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<{ id: string; lat: number | null; lon: number | null } | null>(null);

  const [clickedLocation, setClickedLocation] = useState<
  [number, number] | null
>(null);
  
  const [flight, setFlight] = useState<boolean>(false);
   const [alert, setAlert] = useState<boolean>(false);
return (
  <div>
 
     
      <ToCheck selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} setClickedLocation={setClickedLocation} setFlight={setFlight} setAlert={setAlert}/>
      <Body selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} clickedLocation={clickedLocation} setClickedLocation={setClickedLocation}  flight={flight} setFlight={setFlight} alert={alert} setAlert={setAlert}/> 

  </div>
);
}