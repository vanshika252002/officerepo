import { useState ,useEffect,useRef} from 'react';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux'
import { auth } from '../../Components/firebase';
import { updateAuthTokenRedux } from '../../Store/Common';
import './tocheck.css';
import { ICONS } from '../../assets';
import SearchBar from '../searchbar/SearchOptions';

const ToCheck=()=>{
    const dispatch = useDispatch();
    const [searchBar, setSearchBar] = useState<boolean>(false);
    const [weatherDetails, setWeatherDetails] = useState<boolean>(false);  //weather 
  const [weatherVisible,setWeatherVisible]=useState<boolean>(false);

    const chooseOption={weather:{weatherDetails,setWeatherDetails,weatherVisible,setWeatherVisible}};


const handleLogout = () => {
signOut(auth);
dispatch(updateAuthTokenRedux({ token: null }));

  };

    const inputRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
       // console.log('input refrence ', inputRef.current);
        function handleClickOutside(event: MouseEvent) {
          if (!inputRef.current?.contains(event.target as Node)) {
            setSearchBar(false);
          }
        }
    document.addEventListener('mousedown', handleClickOutside);
    return ()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    }}, []);

   
    return(
        <div  className="h1">
            <div className="h2"><img src={ICONS.headerLogo}/></div>
            <div className='h5'>

            <div className='refrence-to-options' ref={inputRef}>
            <div className="h7" onClick={()=>setSearchBar(true)}>
                <div className='h3'><img src={ICONS.searchLogo}/><input type="text" /></div>
            </div>
                {searchBar && <SearchBar chooseOption={chooseOption} />}
            </div>
            <div className="h4"><button onClick={handleLogout}>Logout</button></div>
            </div>
            
        </div>


    )
}
export default ToCheck;