// import * as L from 'leaflet';

// export const createFlightIcon = (
//   fillColor: string,
//   size = 40,
//   angle = 0
// ) => {
//   const roundedAngle = Math.round(angle); // Avoid float jitter
// //   console.log("chal ja ",L);
  
//   return new L.DivIcon({
//     html: `
//       <svg xmlns="http://www.w3.org/2000/svg"
//            width="${size}" height="${size}"
//            viewBox="0 0 512 512"
//            style="transform: rotate(${roundedAngle}deg);">
//         <path fill="${fillColor}"
//               d="M256 0c17.67 0 32 14.33 32 32v192h64l48-96h32v112h48v32h-48v112h-32l-48-96h-64v192c0 17.67-14.33 32-32 32s-32-14.33-32-32V320h-64l-48 96h-32V304H32v-32h48V160h32l48 96h64V32c0-17.67 14.33-32 32-32z"/>
//       </svg>
//     `,
//     iconSize: [size, size],
//     iconAnchor: [size / 2, size / 2],
//     className: '',
//   });
// };
