import { FooterProps } from "./Types/types";
import { ICONS } from "../../assets";
import './footer.css'

const Footer=({setAlert,setFlight,setVisible,setFly}:FooterProps)=>{
    return (
        <div className="footer" onClick={(e)=>{e.stopPropagation();setFlight(false);setFly(false)}} onMouseDown={(e) => e.stopPropagation()}>
           
            <div className="mini-map-option2" onMouseDown={(e) => e.stopPropagation()}>
                <button onClick={()=>{setAlert(true);setVisible("earthquake-list")}}><img src={ICONS.earthquake}/>
                <span>Earthquake</span></button>
            </div>
            
        </div>
    )
}
export default Footer;