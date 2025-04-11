export interface EarthquakeProps {
    setFooterVisible: (value: boolean) => void;
    setEarthquakeVisible: (value: boolean) => void;
    setStartTime:(value:string)=>void;
    setEndTime:(value:string)=>void;
    startTime:string;
    endTime:string;
    setAlert:(value:boolean)=>void;
  }
 export  interface EarthquakeFeature {
    properties: {
      mag: number;
      place: string;
      time:number;
    };
    geometry: {
        coordinates: [number, number, number]; 
      };
  }