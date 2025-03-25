import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../Components/firebase';

const provider = new GoogleAuthProvider();
const useSignUp = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign-in successful:', result.user);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };
  return { handleGoogleSignIn };
};
export default useSignUp;
