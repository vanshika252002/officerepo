 export interface FlightDetail {
    icao24: string;
    callSign: string;
    originCountry: string;
    timePosition: number;
    lastContact: number;
    latitude: number;
    longitude: number;
    baroAltitude: number;
    onGround: boolean;
    velocity: number;
    angle:number;
  }
  
   export interface FlightInformationProps {
    chooseOption: {
      flight: {
        origin: { origin: string; setOrigin: (value: string) => void };
      };
  
    };
    setVisible:(value:string)=>void;
        setFlight: (value: boolean) => void;
    setSelectedLocation: (
      location: { lat: number; lon: number; id: string,angle:number } | null
    ) => void;
    setFly:(value:boolean)=>void;
    setFlyToTarget:(value:[number,number]|null)=>void;
   
  }