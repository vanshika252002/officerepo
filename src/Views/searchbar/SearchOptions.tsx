import { useNavigate } from 'react-router-dom';
// import { Button } from "../../Components/Common";
import './searchoptions.css';
import { ICONS } from '../../assets';

function SearchBar() {
  const navigate = useNavigate();
  return (
    <div className="searchbar-wrapper">
      <div className="search_shortcuts">
        <h2>SHORTCUTS TO FIND</h2>
      </div>
      <div className="searchbar-options">
        <ul>
          <li onClick={() => navigate('/weather')}>
            <img src={ICONS.weather} />
            Weather
          </li>
          <li onClick={() => navigate('')}>
            <img src={ICONS.flightroute} />
            Flight by route
          </li>
          <li>
            <img src={ICONS.liveairplane} />
            LIVE flight by airplane
          </li>
          <li>
            <img src={ICONS.flighthistory} /> Flight history
          </li>
          <li>
            <img src={ICONS.airports} /> Airports
          </li>
          <li>
            <img src={ICONS.nearby} /> Nearby
          </li>
        </ul>
      </div>
    </div>
  );
}
export default SearchBar;
