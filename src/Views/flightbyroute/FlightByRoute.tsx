import { useState } from 'react';
import { ICONS } from '../../assets';
import './flightbyroute.css';

interface RouteProps {
  chooseOption: {
    flight: {
     
      origin: { origin: string; setOrigin: (value: string) => void };
    };
  };
  setVisible: (value:string) => void;
  
}

const FlightByRoute = ({ chooseOption, setVisible}: RouteProps) => {
  const [originInput, setOriginInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOriginInput(value);
    chooseOption.flight.origin.setOrigin(value);
  };

  const handleSearch = () => {
    if (originInput.trim() !== '') {
     setVisible("flight-details");
    }
  };

  return (
    <div className="flight-by-route-wrappper">
      <div className="flight-by-route-header">
        <div
          className="f1"
          onClick={() => {
            setVisible("searchbar")
            
          }}
        >
          <button aria-label="Close Flight By Route"><img src={ICONS.arrow}/></button>
        </div>
        <div className="f2">
          <span>Flight by route</span>
        </div>
      </div>
      <div className="flight-by-route">
        <div className="flight-by-route-origin">
          
          <span>Origin</span>
        </div>
      </div>
      <div className="flight-by-route-search">
        {/* <img src={ICONS.flightbyroute1}/> */}
        <input
          type="text"
          value={originInput}
          onChange={handleInputChange}
          placeholder="Enter country"
        />
      </div>
      <div className="flight-by-route-search">
        <button onClick={handleSearch} disabled={!originInput.trim()}>
          Search
        </button>
      </div>
    </div>
  );
};

export default FlightByRoute;
