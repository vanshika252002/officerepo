export interface FlightData {
    icao: string;
    alt: number;
    lon: number;
    lat: number;
    angle:number;
    originCountry:string
  }
  
export interface Props {
  setVisible: (value: string) => void;
  setFlight:(value:boolean)=>void;
  setSelectedLocation: (
    location: { lat: number; lon: number; id: string,angle:number,origin:string } | null
  ) => void;
  setFly:(value:boolean)=>void;
  setFlyToTarget:(value:[number,number]|null)=>void;
  setClickedLocation: (location: [number, number] | null) => void;
 
}