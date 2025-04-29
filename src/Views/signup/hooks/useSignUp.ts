import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../Components/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAuthTokenRedux } from '../../../Store/Common';

const provider = new GoogleAuthProvider();

const useSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();




  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      dispatch(updateAuthTokenRedux({ token }));
      console.log('Google sign-in successful:', result.user);
      navigate('/home');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return { handleGoogleSignIn };
};

export default useSignUp;
