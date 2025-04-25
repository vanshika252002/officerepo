import { useState, useEffect,useRef } from 'react';
import DatePicker from "react-datepicker";
import React from 'react';
import { useLazyGetEarthquakesQuery } from '../../Services/Api/earthquake';
import { useDebounce } from '../debouncing/useDebounce';

import "react-datepicker/dist/react-datepicker.css";
import './earthquake.css';
//import EarthquakeDetails from '../earthquakeDetails';
//import DraggableWrapper from '../Draggable/Draggable';

import { EarthquakeProps, EarthquakeFeature } from './Types/types';
import Loading from '../loading';
import { useMap } from 'react-leaflet';
const CustomDatePickerInput = React.forwardRef<HTMLDivElement, { value?: string; onClick?: () => void; placeholder?: string }>(
  ({ value, onClick, placeholder }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      className="datepicker-custom-input"
      style={{
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff",
        cursor: "pointer",
        minWidth: "120px"
      }}
    >
      {value || <span style={{ color: '#aaa' }}>{placeholder}</span>}
    </div>
  )
);

const Earthquake = ({
 
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  setAlert, setClickedLocationEarthquake,setVisible,visible,setClickedLocation
}: EarthquakeProps) => {

  //const [selectedEarthquake, setSelectedEarthquake] = useState<EarthquakeFeature | null>(null);
  const [dateError, setDateError] = useState(''); 
const map=useMap();


  const inputRef1 = useRef<HTMLDivElement>(null);
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (!inputRef1.current?.contains(event.target as Node) ) {
          setVisible("");
          
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
    
      <div className="earthquake-wrapper" ref={inputRef1} onClick={(e) => e.stopPropagation()}>
      <div className="earthquake-header">
        <button
          onClick={() => {
           setVisible("");
            setAlert(false);
            setClickedLocationEarthquake(null);
            
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
          <h3>Start Date</h3>
          <DatePicker
            selected={formattedStartTime}
            onChange={(date: Date | null) => {
              if (date) {
                const start = new Date(date);
                const end = new Date(date);
                end.setMonth(end.getMonth() + 1); 
                setStartTime(formatDate(start));
                setEndTime(formatDate(end));
              } else {
                setStartTime('');
                setEndTime('');
              }
            }}
            minDate={new Date('1960-01-01')}
  maxDate={new Date('2030-12-31')}
  showMonthDropdown
  showYearDropdown
  scrollableYearDropdown
  yearDropdownItemNumber={71}  
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
            customInput={<CustomDatePickerInput />}
          />
        </div>
        <div className="end">
          <h3>End Date</h3>
          <DatePicker
            selected={formattedEndTime}
            onChange={(date: Date | null) => {
              setEndTime(date ? formatDate(date) : '');
            }}
        
            minDate={new Date('1960-01-01')}
            maxDate={new Date('2030-12-31')}
            showMonthDropdown
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={71}  
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
            customInput={<CustomDatePickerInput />}
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
              
              setClickedLocation(null);
              map.flyTo([item?.geometry?.coordinates[1],item?.geometry?.coordinates[0]], 8, { duration: 1 });
              
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



    </div>
  
  );
};

export default Earthquake;
