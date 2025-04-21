// import { useState, useEffect } from 'react';
// import { Marker } from 'react-leaflet';

// export const SmoothMarker = ({ currentPosition, newPosition, animationDuration = 2000 }) => {
//   const [position, setPosition] = useState(currentPosition);
//   const [startTime, setStartTime] = useState<number | null>(null);

//   useEffect(() => {
//     if (newPosition) {
//       setStartTime(Date.now());
//     }
//   }, [newPosition]);

//   useEffect(() => {
//     if (startTime === null) return;

//     const interval = setInterval(() => {
//       const elapsed = Date.now() - startTime;
//       const progress = Math.min(elapsed / animationDuration, 1);

//       // Interpolate between current and new position
//       const lat = position.lat + (newPosition.lat - position.lat) * progress;
//       const lon = position.lon + (newPosition.lon - position.lon) * progress;

//       setPosition({ lat, lon });

//       if (progress === 1) {
//         clearInterval(interval);
//       }
//     }, 16); // 60 FPS

//     return () => clearInterval(interval);
//   }, [startTime, position, newPosition, animationDuration]);

//   return <Marker position={[position.lat, position.lon]} />;
// };
