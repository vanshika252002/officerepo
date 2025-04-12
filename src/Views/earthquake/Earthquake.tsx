import './earthquake.css';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetEarthquakesQuery } from '../../Services/Api/earthquake';
import { skipToken } from '@reduxjs/toolkit/query';
import EarthquakeDetails from '../earthquakeDetails';
import { EarthquakeProps, EarthquakeFeature } from './Types/types';

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

  // Function to format a Date object to 'yyyy-mm-dd'
  const formatDate = (date: Date): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return ''; // return empty string if date is invalid
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to parse a string 'yyyy-mm-dd' to Date object
  const parseDateString = (dateString: string): Date => {
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // months are 0-based
    const day = parseInt(parts[2]);
    return new Date(year, month, day);
  };

  const { data: earthquakeData } = useGetEarthquakesQuery(
    startTime && endTime
      ? { startTime: startTime, endTime: endTime }
      : skipToken
  );

  // Format start time and end time for use in the datepicker
  const formattedStartTime = startTime ? parseDateString(startTime) : null;
  const formattedEndTime = endTime ? parseDateString(endTime) : null;

  const Timestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    date.setMinutes(date.getMinutes() + 330); // Adjust for UTC+05:30
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
            selected={formattedStartTime} // Date object passed here
            onChange={(date: Date | null) => {
              if (date) {
                setStartTime(formatDate(date)); // Set formatted date string
              }
            }} // Handle null value as well
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
            
          />
        </div>
        <div className="end">
          <h3>End Time</h3>
          <DatePicker
            selected={formattedEndTime} // Date object passed here
            onChange={(date: Date | null) => {
              if (date) {
                setEndTime(formatDate(date)); // Set formatted date string
              }
            }} // Handle null value as well
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
          lat={selectedEarthquake.geometry.coordinates[0]}
          lon={selectedEarthquake.geometry.coordinates[1]}
        />
      )}
    </div>
  );
};

export default Earthquake;
