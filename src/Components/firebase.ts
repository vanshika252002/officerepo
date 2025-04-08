import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBjzhZDs5ULytrqADs7KwIDjK3qjgQX3Oc',
  authDomain: 'flightradar-1990b.firebaseapp.com',
  projectId: 'flightradar-1990b',
  storageBucket: 'flightradar-1990b.firebasestorage.app',
  messagingSenderId: '697508313818',
  appId: '1:697508313818:web:f48bb17b114a5031b9c3e3',
  measurementId: 'G-Q12692W10R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
