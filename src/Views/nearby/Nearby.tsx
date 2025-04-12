import { useEffect, useState, useMemo } from 'react';
import {NearbyFlight} from './Types/types';
import './nearby.css';
import { useLazyGetAllFlightsQuery } from '../../Services/Api/liveflight';
import Loading from '../loading';
//import Loading from '../loading/Loading';

type details = [string, string, string, number, number, number, number, number, boolean, number];

interface NearbyProps {
  chooseOption: {
    nearby: { setNearByVisible: (value: boolean) => void };
  };
  setSearchBar: (value: boolean) => void;
  setFlight: (value: boolean) => void;
  setSelectedLocation: (
    location: { lat: number; lon: number; id: string } | null
  ) => void;
  
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const Nearby = ({ chooseOption, setSearchBar, setSelectedLocation, setFlight }: NearbyProps) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [trigger, { data: liveflight ,isLoading :flightLoading}] = useLazyGetAllFlightsQuery();
  const FlightDetails = liveflight?.states || null;

console.log("flight",FlightDetails)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLat(latitude);
          setLon(longitude);
          console.log("geo",latitude,longitude);
        },
        (error) => {
          console.log("error is ",error)
         setErrorMsg('Unable to access your location. Please enable location permission.');
       
        }
      );
    } else {
      setErrorMsg('Geolocation is not supported by your browser.');
    }
    return () => {
      setLat(null);
      setLon(null);
      setErrorMsg('');
    };
  }, []);

 
  useEffect(() => {
    if (lat !== null && lon !== null) {
      trigger(null);
    }
  }, [lat, lon, trigger]);

  const nearbyFlights = useMemo(() => {
    if (!FlightDetails || lat === null || lon === null) return [];
    return FlightDetails
      .map((details: details) => {
        const flightLat = details[6];
        const flightLon = details[5];
        if (!flightLat || !flightLon) return null;
        const distance = getDistanceFromLatLonInKm(lat, lon, flightLat, flightLon);
        return distance <= 500 ? { details, distance } : null;
      })
      .filter(Boolean)
      .sort((a:NearbyFlight, b:NearbyFlight) => a!.distance - b!.distance);
  }, [FlightDetails, lat, lon]);


  if (errorMsg) {
    return (
      <div className='near-by-wrappper'>
        <div className="near-by-header">
          <div className='near-by-f1'>
            <button onClick={() => {
              setSearchBar(true);
              chooseOption.nearby.setNearByVisible(false);
              setFlight(false);
              setSelectedLocation(null);
            }}>x</button>
          </div>
          <div className='near-by-f2'><span>Nearby</span></div>
        </div>

        <div className="geo-error">
          <p>{errorMsg}</p>
         
        </div>
      </div>
    );
  }

  
  // if (isFetching || lat === null || lon === null) {
  //   return <Loading />;
  // }

  return (
    <div className='near-by-wrappper'>
   
      <div className="near-by-header">
         
        {flightLoading && <Loading/>}
        <div className='near-by-f1'>
          <button onClick={() => {
            setSearchBar(true);
            chooseOption.nearby.setNearByVisible(false);
            setFlight(false);
            setSelectedLocation(null);
          }}>x</button>
        </div>
        <div className='near-by-f2'><span>Nearby</span></div>
      </div>
      {!flightLoading && nearbyFlights.length === 0 && lat && lon && (
  <div className="near-by-lit-wrapper">
    <p>No nearby flights found within 500 km.</p>
  </div>
)}
      { nearbyFlights.length>0 &&  <ul className='near-by-list-wrapper'>
   
          {nearbyFlights.map(({ details, distance }: any) => (
            <li key={details[0]} className='nearby' onClick={() => {
              setSelectedLocation({ lat: details[6], lon: details[5], id: details[0] });
              setFlight(true);
            }}>
              <div className='n11'><h2>{details[2]}</h2></div>
              <div className='n1'><div className='n2'>ICAO Code:</div><div className='n3'>{details[0]}</div></div>
              <div className='n1'><div className='n2'>Latitude:</div><div className='n3'>{details[6]}</div></div>
              <div className='n1'><div className='n2'>Longitude:</div><div className='n3'>{details[5]}</div></div>
              <div className='n1'><div className='n2'>Velocity:</div><div className='n3'>{details[9]}</div></div>
              <div className='n1'><div className='n2'>Distance (km):</div><div className='n3'>{distance.toFixed(2)}</div></div>
            </li>
          ))}
        </ul>
}

    
    </div>
  );
};

export default Nearby;
