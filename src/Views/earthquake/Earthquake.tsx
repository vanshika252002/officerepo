import './earthquake.css';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { earthquakeApi } from '../../Services/Api/earthquake';
import { useDebounce } from '../debouncing/useDebounce';
import { useGetEarthquakesQuery } from '../../Services/Api/earthquake';
import { skipToken } from '@reduxjs/toolkit/query';
import EarthquakeDetails from '../earthquakeDetails';
import {EarthquakeProps,EarthquakeFeature} from './Types/types';

const Earthquake = ({
  setFooterVisible,
  setEarthquakeVisible,
  setStartTime,
  setEndTime,startTime,endTime,
  setAlert
}: EarthquakeProps) => {

  const [selectedEarthquake, setSelectedEarthquake] =
    useState<EarthquakeFeature | null>(null);
 

   
const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    //console.error("Invalid date passed to formatDate:", date);
    return ''; 
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

    const debounceStartTime = useDebounce(startTime, 600);
    const debouncedEndTime = useDebounce(endTime, 600);
    const startFormatted = debounceStartTime ? formatDate(debounceStartTime) : null;
    const endFormatted = debouncedEndTime ? formatDate(debouncedEndTime) : null;



  const { data: earthquakeData } = useGetEarthquakesQuery(
    startTime && endTime
      ? { startTime: startTime, endTime: endTime}
      : skipToken
  );

  console.log('selected earthquake  start time an de nd time is', startTime,endFormatted);

  earthquakeData?.features?.map((item)=>{
    if(item.properties.mag==5.5)
      {console.log("present in earthquake ",item.properties.place);
        console.log(" in earthquake start time ", startTime ,"and ", endTime);
      }
})


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

      <div className="earthquake-timer">
      <div className="start">
        <h3>Start Time</h3>
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(formatDate(date))} 
          dateFormat="yyyy-MM-dd" 
          placeholderText="YYYY-MM-DD"
        />
      </div>
        <div className="end">
          <h3>End Time</h3>
          <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(formatDate(date))} 
          dateFormat="yyyy-MM-dd" 
          placeholderText="YYYY-MM-DD"
        />
        </div>
      </div>

      {earthquakeData && (
        <div className="earthquake-list">
          {earthquakeData?.features?.map((item: EarthquakeFeature) => (
            <div className="items">
              <button
                className="earthquake-click-option"
                onClick={() => {
                  setSelectedEarthquake(item);
                  console.log(
                    'SELECTED EARTHQUAK INSIDE ON BUTTON CLCIK ',
                    selectedEarthquake
                  );
                }}
              >
                <div className="earthquake-magnitude">
                  <span>{item.properties.mag}</span>
                </div>
                <div className="earthquake-properties">
                  <div className="place-earthquake">
                    {' '}
                    <h4>
                      <strong>{item.properties.place}</strong>
                    </h4>
                  </div>
                  <div className="time-earthquake">
                    {' '}
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
          lat={selectedEarthquake.geometry.coordinates[0]}
          lon={selectedEarthquake.geometry.coordinates[1]}
        />
      )}
    </div>
  );
};
export default Earthquake;
