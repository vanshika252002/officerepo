import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
import Loading from '../loading/Loading';
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
}

const FlightInformation = ({chooseOption, setVisible }: FlightInformationProps) => {
  const { data: liveflight, isLoading, error } = useGetAllFlightsQuery(null);
  console.log("liveflights",liveflight);
  const FlightDetails: FlightDetail[] =
    liveflight?.states?.map((tuple: any) => ({
      icao24: tuple[0],
      callSign: tuple[1],
      originCountry: tuple[2],
      timePosition: tuple[3],
      lastContact: tuple[4],
      latitude: tuple[5],
      longitude: tuple[6],
      baroAltitude: tuple[7],
      onGround: tuple[8],
      velocity: tuple[9],
    })) || [];

  const originFilter = chooseOption?.flight?.origin?.origin.trim().toLowerCase();
  const filteredFlights = FlightDetails.filter(
    (flight) => flight.originCountry.toLowerCase() === originFilter && flight.latitude && flight.longitude
  );

  return (
    <div className="flightInformation-wrapper">
      <div className="flightInformation-header">
        <div className="fi1">
          <button onClick={() => {setVisible("flight-by-route") }} aria-label="Close Flight Information">x</button>
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
          {filteredFlights.map((flight) => (
            <div key={flight.icao24} className="wrapper-for-flight-information">
              <div className="flightInformation-origin">
                <div className="fi-o1"><span>Origin</span></div>
                <div className="fi-o2"><span>{flight.originCountry}</span></div>
              </div>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightInformation;