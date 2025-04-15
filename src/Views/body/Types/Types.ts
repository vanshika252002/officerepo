export interface EarthquakeFeature {
    geometry: {
      coordinates: [number, number, number];
    };
    properties: {
      alert?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }
export interface Props {
    selectedLocation: {
      id: string;
      lat: number|null;
      lon: number|null;
      
    } | null;
    setSelectedLocation: (location: {
      id: string;
      lat: number|null;
      lon: number|null;

    } | null) => void;
    flight: boolean;
    setFlight: (value: boolean) => void;
    clickedLocation: [number, number] | null;
    setClickedLocation: (location: [number, number] | null) => void;
    alert:boolean;
    setAlert:(value:boolean)=>void;
  }

  export type Details = [
    string,
    string,
    string,
    number,
    number,
    number,
    number,
    number,
    boolean,
    number,
    number,
  ];