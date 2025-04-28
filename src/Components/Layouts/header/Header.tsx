import { useState, useEffect, useRef } from 'react'; //third-party
//import { useLazyGetWeatherByCoordsQuery } from '../../Services/Api/weather';

import SearchBar from '../../../Views/searchbar/SearchOptions';
import Weather from '../../../Views/weather/Weather';
import FlightByRoute from '../../../Views/flightbyroute';
import FlightInformation from '../../../Views/flightinformation';
import Nearby from '../../../Views/nearby'; //components
import Airports from '../../../Views/airports';
import AirportCountryFlights from '../../../Views/airportcountryflights';
import Live from '../../../Views/live';

import { Props } from './Types/types'; //types+css
import { ICONS } from '../../../assets';
import './header.css';
import Confirmation from '../../../Views/confirmation';

const Header = ({
  clickedLocation,
  setSelectedLocation,
  setFlight,
  setAlert,
  setClickedLocation,
  visible,
  setVisible,
  setFly,
  setFlyToTarget,
}: Props) => {
  // const [filterData, setFilterData] = useState({
  //   origin: null,
  //   country:null,
  //   code: null
  // });
  const [logout, setLogout] = useState<boolean>(false);

  const [origin, setOrigin] = useState('');

  const handleLogout = () => {
    setLogout(true);
  };

  const inputRef = useRef<HTMLDivElement>(null);
  const inputRef1 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !inputRef.current?.contains(event.target as Node) &&
        visible != 'earthquake-list'
      ) {
        setVisible('');
        setFly(false);
        setSelectedLocation(null);

        setClickedLocation(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return (
    <div className="h1">
      <div className="h2">
        <img src={ICONS.trackitlive} alt="Header Logo" />
      </div>
      <div className="h5">
        <div className="refrence-to-options" ref={inputRef}>
          <div
            className="h7"
            onClick={() => {
              setVisible('searchbar'), setAlert(false);
            }}
          >
            {
              <div className="h3" ref={inputRef1}>
                <img src={ICONS.searching} alt="Search Icon" />
                {/* <span>Search</span> */}
              </div>
            }
          </div>
          {visible == 'searchbar' && (
            <SearchBar
              setVisible={setVisible}
              setSelectedLocation={setSelectedLocation}
              setFlight={setFlight}
              setClickedLocation={setClickedLocation}
            />
          )}
          {visible == 'weather' && (
            <Weather
              clickedLocation={clickedLocation}
              setVisible={setVisible}
              setClickedLocation={setClickedLocation}
              setFly={setFly}
              setFlyToTarget={setFlyToTarget}
            />
          )}

          {visible == 'flight-by-route' && (
            <FlightByRoute setOrigin={setOrigin} setVisible={setVisible} />
          )}
          {visible == 'flight-details' && (
            <FlightInformation
              setFly={setFly}
              setFlyToTarget={setFlyToTarget}
              origin={origin}
              setVisible={setVisible}
              setFlight={setFlight}
              setSelectedLocation={setSelectedLocation}
            />
          )}
          {visible == 'nearby' && (
            <Nearby
              setFly={setFly}
              setFlyToTarget={setFlyToTarget}
              setSelectedLocation={setSelectedLocation}
              setFlight={setFlight}
              setVisible={setVisible}
            />
          )}
          {visible == 'airports' && (
            <Airports setVisible={setVisible} setOrigin={setOrigin} />
          )}
          {visible == 'airport-by-code' && (
            <AirportCountryFlights
              origin={origin}
              setVisible={setVisible}
              setSelectedLocation={setSelectedLocation}
              setFlight={setFlight}
              setFly={setFly}
              setFlyToTarget={setFlyToTarget}
            />
          )}

          {visible == 'live-flight' && (
            <Live
              setVisible={setVisible}
              setSelectedLocation={setSelectedLocation}
              setFlight={setFlight}
              setFly={setFly}
              setFlyToTarget={setFlyToTarget}
            />
          )}
        </div>
        <div className="h4">
          <button onClick={handleLogout}>Logout</button>
        </div>
        {logout && <Confirmation setLogout={setLogout} />}
      </div>
    </div>
  );
};

export default Header;
