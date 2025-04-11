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
}

export const initialValues = { email: '', password: '' };

export const validationSchema = Yup.object({
  email: Yup.string().email(DATA.InvalidEmail).required(DATA.EmailRequired),
  password: Yup.string()
    .min(6, DATA.PasswordLength)
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
    toast.success('Login successful! Welcome back.', { position: 'top-right' });
    resetForm();
  } catch (error: any) {
    console.error('Firebase Auth Error:', error);
    if (error.code === 'auth/wrong-password') {
      toast.error('Incorrect password. Please try again.', {
        position: 'top-right',
      });
    } else {
      toast.error(`Login failed: ${error.message}`, { position: 'top-right' });
    }
  }
};
