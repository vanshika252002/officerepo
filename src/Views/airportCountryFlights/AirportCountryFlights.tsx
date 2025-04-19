import './airportCountryFlights.css';
import { ICONS } from '../../assets';
import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
import Loading from '../loading/Loading';
import { useState } from 'react';

interface AirportCountryFlightsProps {
  chooseOption: {
    airport: {
    
      country: { country: string };
      code: {
        setIcaoCode: (value: string) => void;
        icaoCode: string;
      };
     
    };
    
  };
  setVisible:(value:string)=>void;
  setSelectedLocation:any;
  setFlight:any;
}
type Details = [string, string, string, number, number, number, number, number, boolean, number];

const AirportCountryFlights = ({ chooseOption,setVisible ,setSelectedLocation,setFlight,setFly,setFlyToTarget}: AirportCountryFlightsProps) => {
  const { airport } = chooseOption;
  const { code } = airport;
  const { country } = airport;

  const [expandedIcao, setExpandedIcao] = useState<string | null>(null);

  const toggleAccordion = (icaoCode: string) => {
    setExpandedIcao(prev => (prev === icaoCode ? null : icaoCode));
  };

  const { data: flightData, isLoading } = useGetAllFlightsQuery(null);

  const filteredFlights = flightData?.states?.filter(
    (detail:Details) => country.country.toLowerCase() === detail[2]?.toLowerCase()
  );

  return (
    <div className='country-flight-wrappper'>
      {isLoading && <Loading />}

      <div className='country-flight-header'>
        <div className='country-flight-f1'>
          <button onClick={() => {
           setVisible("airports");
           setFlight(false);
           setSelectedLocation(null);
          }}>
            <img src={ICONS.arrow} />
          </button>
        </div>
        <div className='country-flight-f2'>
          <span>Country Flights</span>
        </div>
      </div>

      {flightData?.states==null &&  <div className="fi-no-results"> Data is not Available right now  </div>}
        {!isLoading && filteredFlights?.length === 0 && (
          <div className='no-flights-found'>
            <p>No flights found for <strong>{country.country}</strong>.</p>
          </div>
        )}

        {filteredFlights?.length>0 && <div className='country-flight-list-wrapper'>
        {  filteredFlights?.map((detail:Details) => {
          const icaoCode = detail[0];
          const flightCountry = detail[2];
          const longitude = detail[5];
          const latitude = detail[6];
     
          const isExpanded = expandedIcao === icaoCode;

          return (
            <div className='airports' key={icaoCode}>
              <button
                className='airport-country-n1'
                onClick={() => {
                  toggleAccordion(icaoCode);
                  code.setIcaoCode(icaoCode);
                }}
              >
                <div className='logo' >
                  <img src={ICONS.airports} alt="airport icon" />
                </div>
                <div className='formatted'>
                  <span>{icaoCode}</span>
                </div>
                <div className={`accordion-toggle-symbol ${isExpanded ? 'open' : ''}`}>
                  <img src={ICONS.accordianLogo} />
                </div>
              </button>
                
              {isExpanded && (
                <div>
                  
                  
                  <div className="accordion-content">
                  <div className='acc-btn'><button onClick={() => {
              setSelectedLocation({ lat: latitude, lon:longitude, id:icaoCode });
              setFlight(true);setFly(true);setFlyToTarget([latitude,longitude])
            }}><img src={ICONS.showonmap}/><span>Show on Map</span></button></div>
                  <div className='data-flight'>
                    <p><strong>ICAO Code:</strong> {icaoCode}</p>
                  <p><strong>Country:</strong> {flightCountry}</p>
                  <p><strong>Latitude:</strong> {latitude}</p>
                  <p><strong>Longitude:</strong> {longitude}</p></div>
                </div>
                  </div>
              )}
            </div>
          );
        })
       } </div>}
     
    </div>
  );
};

export default AirportCountryFlights;