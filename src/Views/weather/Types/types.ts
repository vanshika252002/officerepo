export interface Weatherprops{
   
     setVisible:any;
     setClickedLocation:any;
     setFly:(value:boolean)=>void;
     setFlyToTarget:(value:[number,number]|null)=>void;
     clickedLocation:any
    }