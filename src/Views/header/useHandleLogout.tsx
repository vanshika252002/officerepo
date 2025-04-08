import { signOut } from 'firebase/auth';
import { auth } from '../../Components/firebase';
import { updateAuthTokenRedux } from '../../Store/Common';

export const useHandleLogout = (dispatch: any) => {
  // first approach
  // localStorage.clear();
  // window.location.reload();

  console.log('localstorage is cleared');
  // second approach
  signOut(auth);
  dispatch(updateAuthTokenRedux({ token: null }));
};
