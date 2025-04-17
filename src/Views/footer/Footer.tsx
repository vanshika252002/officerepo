import { FooterProps } from "./Types/types";
import { ICONS } from "../../assets";
import './footer.css'

const Footer=({setFooterVisible,setEarthquakeVisible,setAlert,setFlight}:FooterProps)=>{
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