import { signOut } from 'firebase/auth';
import { auth } from '../../Components/firebase';
import { Button } from '../../Components/Common';

function Logout() {
  //console.log('logout');
  const authLogout = async () => {
    alert("want to logout");
    return;
    try {
      await signOut(auth);
    } catch (error) {
      console.log('error during logout', error);
    }
  };
  return (
    <div>
      <Button label="logout" onClick={authLogout} />
    </div>
  );
}
export default Logout;
