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
      lat: number;
      lon: number;
      angle: number;
    } | null;
    setSelectedLocation: (location: {
      id: string;
      lat: number;
      lon: number;
      angle: number;
    } | null) => void;
    flight: boolean;
    setFlight: (value: boolean) => void;
    clickedLocation: [number, number] | null;
    setClickedLocation: (location: [number, number] | null) => void;
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