export interface FlightData {
    icao: string;
    alt: number;
    lon: number;
    lat: number;
  }
  
export interface Props {
  setVisible: (value: string) => void;
  setFlight:(value:boolean)=>void;
  setSelectedLocation: (
    location: { lat: number; lon: number; id: string } | null
  ) => void;
}