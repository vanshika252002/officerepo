import { useEffect, memo } from 'react';
import { useMap } from 'react-leaflet';
interface Props{
    flyToTarget:[number,number]
}

const FlyToTarget = ({ flyToTarget }:Props) => {
  const map = useMap();
  // const prevTargetPosition = useRef<[number, number] | null>(null);
console.log("fly too ...  ")
    useEffect(() => {
    if (flyToTarget) {
      map.flyTo(flyToTarget, 8, { duration: 1.5 });
    }
  }, [flyToTarget, map]);

  return null;
};


export default memo(FlyToTarget);


// const FlyToTarget = () => {
//   const map = useMap();

//   useEffect(() => {
//     if (flyToTarget) {
//       map.flyTo(flyToTarget, 8, { duration: 1.5 });
//     }
//   }, [flyToTarget, map]);

//   return null;
// };
