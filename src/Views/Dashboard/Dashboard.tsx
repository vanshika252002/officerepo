
import { useState } from "react";
 import Body from "../body/Body";

import './Dashboard.css';
import ToCheck from "../tocheck/ToCheck";


export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<{ id: string; lat: number | null; lon: number | null } | null>(null);

  const [clickedLocation, setClickedLocation] = useState<
  [number, number] | null
>(null);
  
  const [flight, setFlight] = useState<boolean>(true);
   const [alert, setAlert] = useState<boolean>(false);
   const [visible,setVisible]=useState<string>("");

   const [flyToTarget, setFlyToTarget] = useState<[number, number] | null>(null);
const [fly,setFly]=useState<boolean>(false);



   return (
    <div className="dashboard-wrapper">
      <ToCheck
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        setClickedLocation={setClickedLocation}
        setFlight={setFlight}
        setAlert={setAlert}
        setVisible={setVisible}
          visible={visible}
          flyToTarget={flyToTarget}
          setFlyToTarget={setFlyToTarget}
          setFly={setFly}
      />
      <div className="body-wrapper">
        <Body
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          clickedLocation={clickedLocation}
          setClickedLocation={setClickedLocation}
          flight={flight}
          setFlight={setFlight}
          alert={alert}
          setAlert={setAlert}
          setVisible={setVisible}

          visible={visible}
             fly={fly}
             setFly={setFly}
             flyToTarget={flyToTarget}
             setFlyToTarget={setFlyToTarget}

/>
      </div>
    </div>
  );
}