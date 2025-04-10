import { ICONS } from "../../assets";
import './footer.css'
interface FooterProps {
    setFooterVisible:(value:boolean)=>void;
    setMiniMapVisible:(value:boolean)=>void;
  setEarthquakeVisible:(value:boolean)=>void;
}
const Footer=({setMiniMapVisible,setFooterVisible,setEarthquakeVisible}:FooterProps)=>{
   // const [miniMap,setMiniMap]=useState<boolean>(false);
    
    return (
        <div className="footer" onClick={(e)=>{e.stopPropagation();}} onMouseDown={(e) => e.stopPropagation()}>
           
            <div className="mini-map-option2" onMouseDown={(e) => e.stopPropagation()}>
                <button onClick={()=>{setEarthquakeVisible(true);setFooterVisible(false)}}><img src={ICONS.earthquake}/>
                <span>Earthquake</span></button>
            </div>
            
        </div>
    )
}
export default Footer;