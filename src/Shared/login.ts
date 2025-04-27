import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { auth } from '../Components/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { DATA } from '../Views';
import { updateAuthTokenRedux } from '../Store/Common';

interface ValuesLogin {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const initialValues = {
  email: localStorage.getItem('userEmail') || '', // Pre-fill email if stored in localStorage
  password: localStorage.getItem('userPassword') || '', // Pre-fill password if stored in localStorage
  rememberMe: false
};

export const validationSchema = Yup.object({
  email: Yup.string().email(DATA.InvalidEmail).required(DATA.EmailRequired),
  password: Yup.string()
    .matches(/^\S*$/, "Password cannot contain spaces")
    .min(6, DATA.PasswordLength)
    .max(10, "Password cannot be more than 10 characters")
    .required(DATA.PasswordRequired),
});

export const onSubmit = async (
  values: ValuesLogin,
  { resetForm }: FormikHelpers<ValuesLogin>,
  dispatch: any
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const token = await userCredential.user.getIdToken();
    dispatch(updateAuthTokenRedux({ token }));
    toast.success('Login successful! Welcome', { position: 'top-right' });

    // Handle "Remember Me" functionality
    if (values.rememberMe) {
      localStorage.setItem('userEmail', values.email);  // Store email in localStorage
      localStorage.setItem('userPassword', values.password);  // Store password in localStorage
    } else {
      localStorage.removeItem('userEmail');  // Remove email from localStorage if "Remember Me" is unchecked
      localStorage.removeItem('userPassword');  // Remove password from localStorage if "Remember Me" is unchecked
    }

    resetForm();
  } catch (error: any) {
    console.error('Firebase Auth Error:', error);
    if (error.code === 'auth/invalid-credential') {
      toast.error('Incorrect password. Please try again.', { position: 'top-right' });
    } else {
      toast.error(`Login failed: ${error.message}`, { position: 'top-right' });
    }
  }
};
