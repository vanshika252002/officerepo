import { ICONS } from "../../assets";
import './footer.css'
interface FooterProps {
    setFooterVisible:(value:boolean)=>void;
   
  setEarthquakeVisible:(value:boolean)=>void;
  setAlert:(value:boolean)=>void;
  setFlight:(value:boolean)=>void;
}
const Footer=({setFooterVisible,setEarthquakeVisible,setAlert,setFlight}:FooterProps)=>{
   // const [miniMap,setMiniMap]=useState<boolean>(false);
    
    return (
        <div className="footer" onClick={(e)=>{e.stopPropagation();setFlight(false);}} onMouseDown={(e) => e.stopPropagation()}>
           
            <div className="mini-map-option2" onMouseDown={(e) => e.stopPropagation()}>
                <button onClick={()=>{setEarthquakeVisible(true);setFooterVisible(false);setAlert(true)}}><img src={ICONS.earthquake}/>
                <span>Earthquake</span></button>
            </div>
            
        </div>
    )
}
export default Footer;