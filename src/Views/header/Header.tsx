import { ReactNode, useState, useRef ,useEffect} from 'react';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../../Components/firebase';
import { updateAuthTokenRedux } from '../../Store/Common';
import { Button, Input } from '../../Components/Common';
import Weather from '../weather/Weather';
import { ICONS } from '../../assets';
import { DATA } from '..';
import './header.css';
import SearchOptions from '../searchbar/SearchOptions';
const API_KEY = import.meta.env.VITE_GEOLOCATION_API_KEY;
type HeaderProps = {
  children?: ReactNode;
};
const Header: React.FC<HeaderProps> = () => {
  console.log("key",API_KEY);
  const dispatch = useDispatch();
  const [weatherVisible,setWeatherVisible]=useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const [searchBar, setSearchBar] = useState<boolean>(false);
  console.log("searchbar",searchBar);
  
  const handleLogout = () => {
    // first approach
    // localStorage.clear();
    // window.location.reload();
    // console.log("localstorage is cleared");

    signOut(auth);
    dispatch(updateAuthTokenRedux({ token: null }));
  };

  useEffect(() => {
    console.log('input refrence ', inputRef.current);
    function handleClickOutside(event: MouseEvent) {
      if (!inputRef.current?.contains(event.target as Node)) {
        console.log('div ', inputRef.current);
        setSearchBar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={DATA.HeaderContainer}>
      <img src={ICONS.headerLogo} alt={DATA.Logo} />
      <div ref={inputRef}>
        <div 
          className={DATA.SearchContainer}
          onClick={() => { console.log("searchcontainer in header");
            
            !weatherVisible && setSearchBar(true)}}
        >
<img src={ICONS.searchLogo} alt={DATA.Logo} />
          <Input type={DATA.TypeText as any} />
          {searchBar && <SearchOptions setSearchBar={setSearchBar} setWeatherVisible={setWeatherVisible} weatherVisible={weatherVisible}/>}
          {weatherVisible && <Weather setSearchBar={setSearchBar} setWeatherVisible={setWeatherVisible} />}
        
        </div>
      </div>
      <div className="user-profile">
        <Button label="Logout" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
