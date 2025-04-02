import { ICONS } from "../../assets";
import './footer.css'
const Footer=({setMiniMapVisible,setFooterVisible})=>{
    return (
        <div className="footer" onClick={(e)=>{e.stopPropagation();setMiniMapVisible(true)}} onMouseDown={(e) => e.stopPropagation()}>
            <div className="mini-map-option">
                <button onClick={()=>{setMiniMapVisible(true);setFooterVisible(false)}}><img src={ICONS.map}/>
                <span>Map</span></button>
            </div>
           
            
        </div>
    )
}
export default Footer;