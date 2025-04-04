import LiveFlight from "../liveflight";
 import FlightByRoute from "../flightbyroute";
export default function Dashboard() {
 
  return (
    <div>
     
     {/* Dashboard
      <Header />
      <Body /> 
        */}
        <FlightByRoute/>
    {/* <ToCheck/> */}
  <LiveFlight/>
    </div>
  );
}
