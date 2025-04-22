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


//   useEffect(() => {
//     const startTime = performance.now();

//     const animate = (currentTime: number) => {
//       const elapsed = currentTime - startTime;
//       const t = Math.min(elapsed / duration, 1);

//       const lat = start[0] + (end[0] - start[0]) * t;
//       const lng = start[1] + (end[1] - start[1]) * t;

//       setPosition([lat, lng]);
//       if(isSelected)
//       {
//         console.log("selected flight",lat,lng);
//       }

//       if (t < 1) {
//         animationRef.current = requestAnimationFrame(animate);
//       } else {
//         cancelAnimationFrame(animationRef.current!);
//         setPosition(end);
//       }
//     };
// console.log("interpolation")
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
