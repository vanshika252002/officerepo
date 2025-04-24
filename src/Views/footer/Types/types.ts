export interface FooterProps {
  setClickedLocation: (location: [number, number] | null) => void;
  setAlert:(value:boolean)=>void;
  setFlight:(value:boolean)=>void;
  setVisible:(value:string)=>void,setFly:(value:boolean)=>void
}