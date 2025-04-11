import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../Components/firebase';

export const forgotPassword = async (email: string) => {
  if (!email) {
    toast.error('enter your email before resetting a password');
    return;
  }
  try {
    const data = await sendPasswordResetEmail(auth, email.toLowerCase());
    console.log('data of the sendpassword email is', data);
    toast.success('password reset link sent to your email');
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      toast.error('no account found with this email', {
        position: 'top-right',
      });
    }
    console.log(error);
  }
};
