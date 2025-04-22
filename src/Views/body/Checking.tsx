// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setFlights } from '../../Store/flight';
// import * as L from 'leaflet';
// import { Tooltip } from 'react-leaflet';
// import FlyToTarget from './FlightToTarget';

// import {
//   MapContainer,
//   useMapEvents,
//   TileLayer,
//   Popup,
//   Marker,
// } from 'react-leaflet';

// import MarkerClusterGroup from 'react-leaflet-cluster';
// import { useLazyGetWeatherByCoordsQuery } from '../../Services/Api/weather';
// import MiniMapControl from '../minimapview/MiniMapView';

// import { useGetAllFlightsQuery } from '../../Services/Api/liveflight';
// import { ICONS } from '../../assets';
// import { Icon } from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import './body.css';
// import Footer from '../footer/Footer';
// import 'leaflet-rotatedmarker';

// import { useLazyGetEarthquakesQuery } from '../../Services/Api/earthquake';
// import CustomZoom from '../customZoom/CustomZoom';
// import Earthquake from '../earthquake/Earthquake';

// import { useLazyGetGeolocationByLatLngQuery } from '../../Services/Api/geolocation';
// import { EarthquakeFeature, Props, Details } from './Types/Types';
// import Loading from '../loading';
// import InterpolatedMarker from './InterpolatedMarker';

// const createFlightIcon = (fillColor: string, size = 38) =>
//   new L.DivIcon({
//      html: `
//       <div style="transition: transform 0.3s ease-in-out;">
//         <svg xmlns="http://www.w3.org/2000/svg"
//           width="${size}" height="${size}"
//           viewBox="0 0 24 24">
//           <path fill="${fillColor}" d="M21 16v-2l-8-5V3.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V9L3 14v2l8-1.5v3L9.5 19v1l2.5-.5 2.5.5v-1L13 17.5v-3L21 16z"/>
//         </svg>
//       </div>
//     `,
//     className: '',
//     iconSize: [size, size],
//     iconAnchor: [size / 2, size / 2],
//   });

// const EarthquakeAlert = new Icon({
//   iconUrl: ICONS.earthquakealert,
//   iconAnchor: [20, 20],
//   iconSize: [38, 38],
// });

// const Body = ({
//   selectedLocation,
//   setSelectedLocation,
//   clickedLocation,
//   setClickedLocation,
//   flight,
//   setFlight,alert,setAlert,visible,setVisible,setFlyToTarget,flyToTarget,fly,setFly
// }: Props) => {
 

//   const dispatch = useDispatch();

//   const chooseOption = {
//     flight: { flight, setFlight },
//     earthquake: { alert, setAlert },
//     visibility:{setVisible}
//   };

//   const [startTime, setStartTime] = useState<string|null>('2025-03-01'); //forearthquake
//   const [endTime, setEndTime] = useState<string|null>('2025-04-01');
//   const [clickedLocationEarthquake,setClickedLocationEarthquake]= useState<
//   [number, number,string,number] | null
// >(null);
// const [interpolatedFlights, setInterpolatedFlights] = useState<{
//   [id: string]: { start: [number, number]; end: [number, number] };
// }>({});


  

//   const [triggerWeather, { data: weatherData }] =
//     useLazyGetWeatherByCoordsQuery();
//   const [triggerGeolocation, { data: geolocation }] =
//     useLazyGetGeolocationByLatLngQuery();

//   const { data: liveflight,isLoading:loadingFlights} =
//     useGetAllFlightsQuery(null);

//   const FlightDetails = liveflight?.states || null;

//   const [triggerEarthquakeQuery, { data: earthquakeData }] = useLazyGetEarthquakesQuery();

//   useEffect(() => {
//     if (liveflight?.states) {
//       dispatch(setFlights(liveflight.states));
//     }
//   }, [liveflight]);


//   useEffect(() => {
//     if (startTime && endTime) {
//       if (alert || visible === "earthquake-list") {
//         triggerEarthquakeQuery({ startTime, endTime });
//         setClickedLocationEarthquake(null);
//       }
//     }
//   }, [startTime, endTime, alert, visible, triggerEarthquakeQuery]);
//   //console.log("earthquakeData",earthquakeData);
//   // console.log('selected angle is', selectedLocation?.angle);

  

//   const MapClickHandler = () => {
//     useMapEvents({
//       click(e) {
//         const newLat = e.latlng.lat;
//         const newLon = e.latlng.lng;
//         setClickedLocation([newLat, newLon]);
//         triggerWeather({ lat: newLat, lon: newLon });
//         triggerGeolocation({ lat: newLat, lng: newLon });
//         setSelectedLocation(null);         //flight
//       },
//     });
//     return null;
//   };
//    useEffect(() => {
//     if (clickedLocation) {
//       const [lat, lon] = clickedLocation;
//       triggerWeather({ lat, lon });
//       triggerGeolocation({ lat, lng: lon });
//     }
//   }, [clickedLocation]);

//   // const FlyToTarget = () => {
//   //   const map = useMap();
//   //  console.log("")
//   //   useEffect(() => {
//   //     if (flyToTarget) {
//   //       map.flyTo(flyToTarget, 8, { duration: 1.5 });
//   //     }
//   //   }, [flyToTarget, map]);
  
//   //   return null;
//   // };
  

  

//   useEffect(() => {
//     if (FlightDetails) {
//       setInterpolatedFlights((prev) => {
//         const updated: typeof prev = {};
  
//         FlightDetails.forEach((d: Details) => {
//           const id = d[0];
//           const newEnd: [number, number] = [d[6], d[5]]; // [lat, lon]
  
//           if (!newEnd[0] || !newEnd[1]) return;
  
//           const prevFlight = prev[id];
//           const start = prevFlight ? prevFlight.end : newEnd;
  
//           updated[id] = { start, end: newEnd };
//         });
  
//         return updated;
//       });
//     }
//   }, [FlightDetails]);
  

  
//   // useEffect(() => {
//   //   if (earthquakeData?.length > 0) {
//   //     setClickedLocationEarthquake(null);
//   //   }
//   // }, [earthquakeData]);
  
  
//   return (
//     <div className="linear-gradient-body">
//       <MapContainer
//         className="leaf1"
//         center={[20.5937, 78.9629] as [number, number]}
//         zoom={5}
//         style={{ height: '100%', width: '100%' }}
//         zoomControl={false}
//         minZoom={2}
//         maxBounds={[
//           [85, -180],
//           [-85, 180],
//         ]}
       
//         maxBoundsViscosity={1.0}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

       
//         <MapClickHandler />
//         <CustomZoom chooseOption={chooseOption} />
//         <MarkerClusterGroup showCoverageOnHover={false}>
        
//         {loadingFlights && <Loading/>}
//         {flight &&
//   Object.entries(interpolatedFlights).map(([id, { start, end }]) => {
//     if (selectedLocation?.id === id) return null;
//     const flightInfo = FlightDetails?.find((d: Details) => d[0] === id);
//     if (!flightInfo) return null;

//     const angle = flightInfo[10] || 0;

//     return (
//       <InterpolatedMarker
//         key={id}
//         start={start}
//         end={end}
//         duration={60000}
//         angle={angle}
//         icon={createFlightIcon('green', 42)}
//         isSelected={false}
//         onClick={() => {
//           setSelectedLocation({
//             id,
//             lat: end[0],
//             lon: end[1],
//             angle,
//           });
//           setClickedLocation(null);
//         }}
//         flightid={id}
//       />
//     );
//   })}

//       </MarkerClusterGroup>

//       {flight && selectedLocation?.id && interpolatedFlights[selectedLocation.id] && (
//   <InterpolatedMarker
//     key={selectedLocation.id}
//     start={interpolatedFlights[selectedLocation.id].start}
//     end={interpolatedFlights[selectedLocation.id].end}
//     duration={60000}
//     angle={selectedLocation.angle || 0}
//     icon={createFlightIcon('red', 42)}
//     isSelected={true}
//     flightid={selectedLocation.id}
//   />
// )}


//   {/* <InterpolatedMarker start={[26.9124,75.7873]} end={[19.0760,72.8777]} duration={60000} /> */}

// {alert && earthquakeData?.features && (
//           <>
//             <MarkerClusterGroup showCoverageOnHover={false}>
//               {earthquakeData.features
//                 .filter(
//                   (quake: EarthquakeFeature) =>
//                     !clickedLocationEarthquake ||
//                     (quake.geometry.coordinates[1] !== clickedLocationEarthquake[0] ||
//                       quake.geometry.coordinates[0] !== clickedLocationEarthquake[1])
//                 )
//                 .map((quake: EarthquakeFeature) => (
//                   <Marker
//                     key={quake.id}
//                     position={[
//                       quake.geometry.coordinates[1],
//                       quake.geometry.coordinates[0],
//                     ]}
//                     icon={EarthquakeAlert}
//                   >
//                     <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
//                     <div className='earthquake-tooltip'>
                  
//                   <strong>{quake.properties.place}</strong>
                
//                 <p>Magnitude: {quake.properties.mag}</p>
//                 </div>
//                     </Tooltip>
//                   </Marker>
//                 ))}
//             </MarkerClusterGroup>

       
//             {clickedLocationEarthquake  && (
//               <Marker
//                 position={[clickedLocationEarthquake[0],clickedLocationEarthquake[1]]}
//                 icon={EarthquakeAlert}
//               >
//                 <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
//                 <div className='earthquake-tooltip'>
                  
//                   <strong>{clickedLocationEarthquake[2]}</strong>
                
//                 <p>Magnitude: {clickedLocationEarthquake[3]}</p>
//                 </div>
//                 </Tooltip>
//               </Marker>
//             )}
//           </>
//         )}
//             {fly && flyToTarget &&   <FlyToTarget flyToTarget={flyToTarget} />}




//         {clickedLocation && (
//           <Popup position={clickedLocation}>
//             <div>
//             {/* {clickedLocation && <FlyToSelectedWeather/>} */}
//               {weatherData && (
//                 <div className="popup">
//                  { geolocation?.results[0]?.annotations?.flag && geolocation?.results[0]?.components?.state ? <h2>
//                     {geolocation?.results[0]?.annotations?.flag}{' '}
//                     {geolocation?.results[0]?.components?.state}
//                   </h2>:<h2>{geolocation?.results[0]?.formatted} </h2>}
                
//                   <br />
                 
//                  <span> <strong>Weather:</strong> {weatherData.weather[0].description}</span>
//                   <br />
//                   <span><strong>Temperature:</strong> {weatherData.main.temp}°C</span>
//                   <br />
//                   <span><strong>Humidity:</strong> {weatherData.main.humidity}%</span>
//                   <br />
//                   <span><strong>Wind Speed:</strong> {weatherData.wind.speed}</span>
//                   <br />
//                 </div>
//               )}
//             </div>
//           </Popup>
//         )}
//         <MiniMapControl />
//       </MapContainer>

      
//         <Footer
//           setFly={setFly}
//           setAlert={setAlert}
//           setFlight={setFlight}
//           setVisible={setVisible}
          
//         />
      
//       {visible==="earthquake-list" && (
//         <Earthquake
//         setFly={setFly}
//           setStartTime={setStartTime}
//           setEndTime={setEndTime}
//           startTime={startTime}
//           endTime={endTime}
//           setAlert={setAlert}
//           setClickedLocationEarthquake={setClickedLocationEarthquake}
//           setClickedLocation={setClickedLocation}
//           setVisible={setVisible}
//           setFlyToTarget={setFlyToTarget}
//           visible={visible}
//         />
//       )}
//     </div>
//   );
// };

// export default Body;





// import { useEffect, useRef, useState } from "react";
// import { Marker, Tooltip } from "react-leaflet";
// import L from "leaflet";

// type InterpolatedMarkerProps = {
//   start: [number, number];
//   end: [number, number];
//   duration: number;
//   icon: L.DivIcon;
//   onClick?: () => void;
//   angle?: number;
//   isSelected?: boolean;
//   flightid:string;
// };

// export default function InterpolatedMarker({
//   start,
//   end,
//   duration,
//   icon,
//   onClick,
//   angle = 0,
//   isSelected = false,
//   flightid
// }: InterpolatedMarkerProps) {
//   const [position, setPosition] = useState<[number, number]>(start);
//   const animationRef = useRef<number | null>(null);


//   console.log("start",start, "end", end );
  
//   useEffect(() => {
//     const startTime = performance.now();

//     const animate = (currentTime: number) => {
//       const elapsed = currentTime - startTime;
//       const t = Math.min(elapsed / duration, 1);

//       const lat = start[0] + (end[0] - start[0]) * t;
//       const lng = start[1] + (end[1] - start[1]) * t;

//       setPosition([lat, lng]);

//       if (t < 1) {
//         animationRef.current = requestAnimationFrame(animate);
//       } else {
//         cancelAnimationFrame(animationRef.current!);
//         setPosition(end);
//       }
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (animationRef.current !== null) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [start, end, duration]);

//   return (
//     <Marker
//       position={position}
//       icon={icon}
//       eventHandlers={onClick ? { click: onClick } : undefined}
//       rotationAngle={angle}
//       rotationOrigin="center center"
//     >
//       <Tooltip permanent={isSelected} direction="top" offset={[0, -10]}>
//         <div>
//           <strong>{flightid}</strong>
          
//         </div>
//       </Tooltip>
//     </Marker>
//   );
// }
