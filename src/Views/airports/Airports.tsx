import { useGetGeolocationByCoordsQuery } from '../../Services/Api/geolocation';
import Loading from '../loading/Loading';
import { ICONS } from '../../assets';

import './airports.css';
interface Airports {
  chooseOption: {
    airport: {
      setAirportByCountry: (value: boolean) => void;
      setAirportByCode: (value: boolean) => void;
      country: {
        setCountry: (countryName: string) => void;
      };
    };
  };
  setSearchBar: (value: boolean) => void;
}
interface Data {
  components: {
    country: string;
  };
  annotations: {
    flag: string;
  };
}

const Airports = ({ chooseOption, setSearchBar }: Airports) => {
  const { data: airports, isLoading } =
    useGetGeolocationByCoordsQuery('airport');

  const uniqueSortedCountries = Array.from(
    new Map(
      airports?.results?.map((item:Data) => [item.components.country, item])
    ).values()as Iterable<Data>
  ).sort((a, b) => a.components.country.localeCompare(b.components.country));

  return (
    <div className="airport-wrappper">
      {isLoading && <Loading />}
      <div className="airport-header">
        <div className="airport-f1">
          <button
            onClick={() => {
              chooseOption.airport.setAirportByCountry(false),
                setSearchBar(true);
            }}
          >
            <img src={ICONS.arrow} />
          </button>
        </div>
        <div className="airport-f2">
          <span>Airport By Country</span>
        </div>
      </div>
      <div className="airport-list-wrapper">
        {uniqueSortedCountries.map((item) => (
          <div className="airport" key={item.components.country}>
            <button
              className="airport-n1"
              onClick={() => {
                chooseOption.airport.country.setCountry(
                  item.components.country
                );
                chooseOption.airport.setAirportByCountry(false);
                chooseOption.airport.setAirportByCode(true);
              }}
            >
              <div className="flag">
                <span>{item.annotations.flag}</span>
              </div>
              <div className="country">
                <span>{item.components.country}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Airports;
