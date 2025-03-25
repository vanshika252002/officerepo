import { ReactNode, useState, useRef, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../../Components/firebase';
import { updateAuthTokenRedux } from '../../Store/Common';
import { Button, Input } from '../../Components/Common';
import { ICONS } from '../../assets';
import { DATA } from '..';
import './header.css';
import SearchOptions from '../searchbar/SearchOptions';

type HeaderProps = {
  children?: ReactNode;
};
const Header: React.FC<HeaderProps> = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLDivElement>(null);
  const [searchBar, setSearchBar] = useState<boolean>(false);
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
          onClick={() => setSearchBar(true)}
        >
          <img src={ICONS.searchLogo} alt={DATA.Logo} />
          <Input type={DATA.TypeText as any} />

          {searchBar && <SearchOptions />}
        </div>
      </div>
      <div className="user-profile">
        <Button label="Logout" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
