import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../Components/firebase';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateAuthTokenRedux } from '../../../Store/Common'; // ✅ make sure it's imported

const provider = new GoogleAuthProvider();

const useSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ dispatch

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(); // ✅ get token
      dispatch(updateAuthTokenRedux({ token })); // ✅ update Redux
      console.log('Google sign-in successful:', result.user);
      navigate('/home'); // ✅ navigate after setting auth
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return { handleGoogleSignIn };
};

export default useSignUp;
