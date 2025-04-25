import * as Yup from 'yup';

import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../Components/firebase';
import { DATA } from '../Views';

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
export const initialValues = { email: '', password: '', confirmPassword: '' };
export const validationSchema = Yup.object({
  email: Yup.string().email(DATA.InvalidEmail).required(DATA.EmailRequired),
  password: Yup.string()
    .min(6, DATA.PasswordLength)
    .max(10,"Password cannot be more than 10 characters")
    .required(DATA.PasswordRequired),
    
    

  confirmPassword: Yup.string()
    .oneOf([Yup.ref(DATA.Password)], DATA.PasswordMatching)
    .required(DATA.ConfirmPasswordRequired),
});

export const handleSignUpSubmit = async (
  values: SignUpFormValues,
  { resetForm }: FormikHelpers<SignUpFormValues>,
  navigate: (path: string) => void

) => {
 
  try {
  const userCredential=  await createUserWithEmailAndPassword(auth, values.email, values.password);
    const {user}=userCredential;
    await sendEmailVerification(user);
    toast.success('Signup successful. Please verify your email !', {
      position: 'top-right',
    });
    navigate('/login');
  } catch (error: any) {
    console.error(error);
    if (error.code === 'auth/email-already-in-use') {
      toast.error('This email is already registered. Please log in.', {
        position: 'top-right',
      });
    
    } else {
      toast.error('Something went wrong. Please try again.', {
        position: 'top-right',
      });
    }
  }

  resetForm();
};
