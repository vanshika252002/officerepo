export interface FlightData {
    icao: string;
    alt: number;
    lon: number;
    lat: number;
    angle:number
  }
  
export interface Props {
  setVisible: (value: string) => void;
  setFlight:(value:boolean)=>void;
  setSelectedLocation: (
    location: { lat: number; lon: number; id: string,angle:number } | null
  ) => void;
  setFly:(value:boolean)=>void;
  setFlyToTarget:(value:[number,number]|null)=>void;
 
}