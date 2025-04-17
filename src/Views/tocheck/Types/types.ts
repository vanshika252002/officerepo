export interface Props{
    setFlight:(value:boolean)=>void;
    selectedLocation:{id:string,lat:number|null,lon:number|null}|null;
    setSelectedLocation:(location:{id:string,lat:number|null,lon:number|null}|null)=>void;
    setClickedLocation: (location: [number, number] | null) => void;
    setAlert:(value:boolean)=>void;
  }