import { useGetGeolocationByCoordsQuery } from '../../Services/Api/geolocation';
import Loading from '../loading/Loading';
import { ICONS } from '../../assets';

import './airports.css';
interface Airports {
  chooseOption: {
    airport: {
      country: {
        setCountry: (countryName: string) => void;
      };
    };
  };
  setVisible: (value:string) => void;
}
interface Data {
  components: {
    country: string;
  };
  annotations: {
    flag: string;
  };
}

const Airports = ({ chooseOption, setVisible }: Airports) => {
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
             setVisible("searchbar")
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
             setVisible("airport-by-code")
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
