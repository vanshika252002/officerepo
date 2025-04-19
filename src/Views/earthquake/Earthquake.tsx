import { useState, useEffect,useRef } from 'react';
import DatePicker from "react-datepicker";

import { useLazyGetEarthquakesQuery } from '../../Services/Api/earthquake';
import { useDebounce } from '../debouncing/useDebounce';

import "react-datepicker/dist/react-datepicker.css";
import './earthquake.css';
//import EarthquakeDetails from '../earthquakeDetails';
//import DraggableWrapper from '../Draggable/Draggable';

import { EarthquakeProps, EarthquakeFeature } from './Types/types';
import Loading from '../loading';

const Earthquake = ({
  setFooterVisible,
  setEarthquakeVisible,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  setAlert, setClickedLocationEarthquake,setVisible,setFly,setFlyToTarget,visible,setClickedLocation
}: EarthquakeProps) => {

  //const [selectedEarthquake, setSelectedEarthquake] = useState<EarthquakeFeature | null>(null);
  const [dateError, setDateError] = useState(''); 

  const inputRef1 = useRef<HTMLDivElement>(null);
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (!inputRef1.current?.contains(event.target as Node) ) {
          setVisible("");
          setFly(false);
          setAlert(false);
          setClickedLocationEarthquake(null);
          
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [visible]);

  const formatDate = (date: Date): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return '';
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

  const [trigger, { data: earthquakeData, isLoading }] = useLazyGetEarthquakesQuery();

  useEffect(() => {
    if (debouncedStartTime && debouncedEndTime) {
      const start = new Date(debouncedStartTime);
      const end = new Date(debouncedEndTime);
     console.log("tell me ",start , end , start>end)
      if (start > end) {
        setClickedLocationEarthquake(null);
        setDateError('Start Time should be before End Time.');
      } else {
        setDateError('');
        trigger({ startTime: debouncedStartTime, endTime: debouncedEndTime });
      }
    }
  }, [debouncedStartTime, debouncedEndTime, trigger]);

  const formattedStartTime = startTime ? parseDateString(startTime) : null;
  const formattedEndTime = endTime ? parseDateString(endTime) : null;

  const Timestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    date.setMinutes(date.getMinutes() + 330);
    return date.toISOString().replace('T', ' ').slice(0, 19) + '(UTC+05:30)';
  };
  const filteredEarthquakes = earthquakeData?.features?.filter((item: EarthquakeFeature) => {
    if (!startTime || !endTime) return true;
    const quakeTime = item.properties.time;
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    return quakeTime >= start && quakeTime <= end;
  });

  return (
    
      <div className="earthquake-wrapper" ref={inputRef1} onClick={(e)=>e.stopPropagation()}>
      <div className="earthquake-header">
        <button
          onClick={() => {
           setVisible("");
            setAlert(false);
            setClickedLocationEarthquake(null);
            setFly(false);
          }}
        >
          x
        </button>
        <h2>
          <strong>Earthquake</strong>
        </h2>
      </div>

      {isLoading && <Loading />}

      <div className="earthquake-timer">
        <div className="start">
          <h3>Start Time</h3>
          <DatePicker
            selected={formattedStartTime}
            onChange={(date: Date | null) => {
              setStartTime(date ? formatDate(date) : '');
            }}
            showMonthDropdown
            showYearDropdown
            scrollableYearDropdown
            scrollableMonthYearDropdown
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
          />
        </div>
        <div className="end">
          <h3>End Time</h3>
          <DatePicker
            selected={formattedEndTime}
            onChange={(date: Date | null) => {
              setEndTime(date ? formatDate(date) : '');
            }}
            showMonthDropdown
            showYearDropdown  
            scrollableYearDropdown
            scrollableMonthYearDropdown
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
          />
        </div>
      </div>

    
      {dateError && (
        <div className="date-error-1">
          {dateError}
        </div>
      )}

{filteredEarthquakes?.length === 0 && !dateError && 
        <div className="no-earthquakes">
          <h4>No Earthquakes Found in the Selected Date Range</h4>
        </div>
}
  <div className="earthquake-list">
    {earthquakeData?.features
      .filter((item: EarthquakeFeature) => {
        if (!startTime || !endTime) return true;
        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();
        const quakeTime = item.properties.time;
        return quakeTime >= start && quakeTime <= end;
      })
      .map((item: EarthquakeFeature) => (
        <div className="items" key={item.id}>
          <button
            className="earthquake-click-option"
            onClick={() => {
              // setSelectedEarthquake(item);
              setFly(true);
              setClickedLocation(null);
              setFlyToTarget([item?.geometry?.coordinates[1],item?.geometry?.coordinates[0]])
              setClickedLocationEarthquake([item?.geometry?.coordinates[1],item?.geometry?.coordinates[0],item.properties.place,item.properties.mag])
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



      {/* {selectedEarthquake && (
        <EarthquakeDetails
          setSelectedEarthquake={setSelectedEarthquake}
          place={selectedEarthquake.properties.place}
          time={Timestamp(selectedEarthquake.properties.time)}
          lat={selectedEarthquake.geometry.coordinates[1]}
          lon={selectedEarthquake.geometry.coordinates[0]}
          depth={selectedEarthquake.geometry.coordinates[2]}
        />
      )} */}
    </div>
  
  );
};

export default Earthquake;
