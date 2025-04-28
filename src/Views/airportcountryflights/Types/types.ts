export interface AirportCountryFlightsProps {
  origin: string;
  setVisible: (value: string) => void;
  setSelectedLocation: any;
  setFlight: any;
  setFly: (value: boolean) => void;
  setFlyToTarget: (value: [number, number] | null) => void;
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
