import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
import Loading from '../loading/Loading';
import { ICONS } from '../../assets';
import './flightInformation.css';

interface FlightDetail {
  icao24: string;
  callSign: string;
  originCountry: string;
  timePosition: number;
  lastContact: number;
  latitude: number;
  longitude: number;
  baroAltitude: number;
  onGround: boolean;
  velocity: number;
}

interface FlightInformationProps {
  chooseOption: {
    flight: {
      origin: { origin: string; setOrigin: (value: string) => void };
    };

  };
  setVisible:(value:string)=>void;
      setFlight: (value: boolean) => void;
  setSelectedLocation: (
    location: { lat: number; lon: number; id: string } | null
  ) => void;
  
}

const FlightInformation = ({chooseOption, setVisible ,setFlight,setSelectedLocation}: FlightInformationProps) => {
  const { data: liveflight, isLoading, error } = useGetAllFlightsQuery(null);

  const FlightDetails: FlightDetail[] =
    liveflight?.states?.map((tuple: any) => ({
      icao24: tuple[0],
      callSign: tuple[1],
      originCountry: tuple[2],
      timePosition: tuple[3],
      lastContact: tuple[4],
      latitude: tuple[6],
      longitude: tuple[5],
      baroAltitude: tuple[7],
      onGround: tuple[8],
      velocity: tuple[9],
    })) || [];

  const originFilter = chooseOption?.flight?.origin?.origin.trim().toLowerCase();
  const filteredFlights = FlightDetails.filter(
    (flight) => flight.originCountry.toLowerCase() === originFilter && flight.latitude && flight.longitude
  );
  console.log("filtered flights",filteredFlights);

  return (
    <div className="flightInformation-wrapper">
      <div className="flightInformation-header">
        <div className="fi1">
          <button onClick={() => {setVisible("flight-by-route");setFlight(false);setSelectedLocation(null) }} aria-label="Close Flight Information"><img src={ICONS.arrow}/></button>
        </div>
        <div className="fi2">
          <span>Flights</span>
        </div>
      </div>
      {isLoading && <Loading />}
      {error && <div className="fi-error">Error fetching flights. Please try again.</div>}
      {liveflight?.states!=null &&  filteredFlights.length === 0 && !isLoading && (
        <div className="fi-no-results">No flights found for the specified origin.</div>
      )}
      {liveflight?.states==null &&  <div className="fi-no-results"> Data is not Available right now  </div>}
      {filteredFlights.length > 0 && (
        <div className="fd">
           <div className='flight-place'><img src={ICONS.flightbyroute}/><span>{chooseOption.flight.origin.origin.charAt(0).toUpperCase()+chooseOption.flight.origin.origin.slice(1).toLowerCase()}</span> </div>
          {filteredFlights.map((flight) => (
            <div key={flight.icao24} className="wrapper-for-flight-information">
              <div className='acc-btn'>
                <button onClick={() => {
              setSelectedLocation({ lat: flight.latitude, lon:flight.longitude, id:flight.icao24 });
              setFlight(true);
            }}><img src={ICONS.showonmap}/><span>Show on Map</span></button>
                </div>

             <div className='fly'>
             <div className="flightInformation-origin">
                <div className="fi-o1"><span>Icao24 Code</span></div>
                <div className="fi-o2"><span>{flight.icao24}</span></div>
              </div>
              <div className="flightInformation-origin">
                <div className="fi-o1"><span>Latitude</span></div>
                <div className="fi-o2"><span>{flight.latitude.toFixed(2)}</span></div>
              </div>
              <div className="flightInformation-origin">
                <div className="fi-o1"><span>Longitude</span></div>
                <div className="fi-o2"><span>{flight.longitude.toFixed(2)}</span></div>
              </div>
              <div className="flightInformation-origin">
                <div className="fi-o1"><span>Velocity</span></div>
                <div className="fi-o2"><span>{flight.velocity}</span></div>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightInformation;