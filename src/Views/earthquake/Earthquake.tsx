import './earthquake.css';
import { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLazyGetEarthquakesQuery } from '../../Services/Api/earthquake';
import { useDebounce } from '../debouncing/useDebounce';

import EarthquakeDetails from '../earthquakeDetails';
import { EarthquakeProps, EarthquakeFeature } from './Types/types';
import Loading from '../loading';

const Earthquake = ({
  setFooterVisible,
  setEarthquakeVisible,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  setAlert
}: EarthquakeProps) => {

  const [selectedEarthquake, setSelectedEarthquake] = useState<EarthquakeFeature | null>(null);

 
  const formatDate = (date: Date): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return ''; 
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

 
  const parseDateString = (dateString: string): Date => {
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; 
    const day = parseInt(parts[2]);
    return new Date(year, month, day);
  };

  const debouncedStartTime = useDebounce(startTime, 500);
  const debouncedEndTime = useDebounce(endTime, 500);

  const [trigger, { data: earthquakeData, isLoading}] = useLazyGetEarthquakesQuery();
  useEffect(() => {
    if (debouncedStartTime && debouncedEndTime) {
      trigger({ startTime: debouncedStartTime, endTime: debouncedEndTime });
    }
  }, [debouncedStartTime, debouncedEndTime, trigger]);
  
  const formattedStartTime = startTime ? parseDateString(startTime) : null;
  const formattedEndTime = endTime ? parseDateString(endTime) : null;

  const Timestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    date.setMinutes(date.getMinutes() + 330); 
    return date.toISOString().replace('T', ' ').slice(0, 19) + '(UTC+05:30)';
  };

  return (
    <div className="earthquake-wrapper">
      <div className="earthquake-header">
        <button
          onClick={() => {
            setFooterVisible(true);
            setEarthquakeVisible(false);
            setAlert(false);
          }}
        >
          x
        </button>
        <h2>
          <strong>Earthquake</strong>
        </h2>
      </div>
  {isLoading && <Loading/>}
      <div className="earthquake-timer">
        <div className="start">
          <h3>Start Time</h3>
          <DatePicker
            selected={formattedStartTime} 
            onChange={(date: Date | null) => {
             
                setStartTime(date ? formatDate(date) : ''); 
              
            }} 
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
            
          />
        </div>
        <div className="end">
          <h3>End Time</h3>
          <DatePicker
            selected={formattedEndTime} 
            onChange={(date: Date | null) => {
             
              setEndTime(date ? formatDate(date) :'');
              
            }} 
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
          />
        </div>
      </div>

      {earthquakeData && (
        <div className="earthquake-list">
          {earthquakeData?.features?.map((item: EarthquakeFeature) => (
            <div className="items" key={item.properties.place}> {/* Use place as key */}
              <button
                className="earthquake-click-option"
                onClick={() => {
                  setSelectedEarthquake(item);
                  console.log(
                    'SELECTED EARTHQUAKE INSIDE ON BUTTON CLICK',
                    selectedEarthquake
                  );
                }}
              >
                <div className="earthquake-magnitude">
                  <span>{item.properties.mag}</span>
                </div>
                <div className="earthquake-properties">
                  <div className="place-earthquake">
                    <h4>
                      <strong>{item.properties.place}</strong>
                    </h4>
                  </div>
                  <div className="time-earthquake">
                    <h5>{Timestamp(item.properties.time)}</h5>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedEarthquake && (
        <EarthquakeDetails
          setSelectedEarthquake={setSelectedEarthquake}
          place={selectedEarthquake.properties.place}
          time={Timestamp(selectedEarthquake.properties.time)}
          lat={selectedEarthquake.geometry.coordinates[1]}
          lon={selectedEarthquake.geometry.coordinates[0]}
        />
      )}
    </div>
  );
};

export default Earthquake;
