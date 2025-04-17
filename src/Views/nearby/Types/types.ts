export interface NearbyFlight {
    id: string;
    lat: number;
    lon: number;
    distance: number;
  }
  
export type   Details = [string, string, string, number, number, number, number, number, boolean, number];

export interface NearbyProps {
  setVisible: (value:string) => void;
  setFlight: (value: boolean) => void;
  setSelectedLocation: (
    location: { lat: number; lon: number; id: string } | null
  ) => void;
  
}
