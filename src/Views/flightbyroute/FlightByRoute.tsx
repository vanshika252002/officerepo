import { useState } from 'react';
import './flightbyroute.css';

interface RouteProps {
  chooseOption: {
    flight: {
      setFlightVisible: (value: boolean) => void;
      setFlightData: (value: boolean) => void;
      origin: { origin: string; setOrigin: (value: string) => void };
    };
  };
  setSearchBar: (value: boolean) => void;
}

const FlightByRoute = ({ chooseOption, setSearchBar }: RouteProps) => {
  const [originInput, setOriginInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOriginInput(value);
    chooseOption.flight.origin.setOrigin(value);
  };

  const handleSearch = () => {
    if (originInput.trim() !== '') {
      chooseOption.flight.setFlightData(true);
      chooseOption.flight.setFlightVisible(false);
    }
  };

  return (
    <div className="flight-by-route-wrappper">
      <div className="flight-by-route-header">
        <div
          className="f1"
          onClick={() => {
            setSearchBar(true);
            chooseOption.flight.setFlightVisible(false);
          }}
        >
          <button aria-label="Close Flight By Route">x</button>
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
